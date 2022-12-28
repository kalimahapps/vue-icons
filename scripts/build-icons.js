const fs = require('node:fs');
const path = require('node:path');
const fg = require('fast-glob');
const fse = require('fs-extra');
const changeCase = require('change-case');
const { pascalCase, pascalCaseTransformMerge } = changeCase;
const cliProgress = require('cli-progress');
const colors = require('ansi-colors');
const { Octokit } = require('octokit');
const svgo = require('svgo');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const config = require('../config.js');
const manifest = require('./manifest.js');
const svgoSettings = require('./svgo-settings.js');

// create progress bar defaults
const progressBar = new cliProgress.SingleBar({
	format: `${colors.cyanBright('{bar}')}    ${colors.magenta('{percentage}%')}    ({value}/{total})`,
	barCompleteChar: '>',
	barIncompleteChar: '-',
	hideCursor: true,
});

const svgTemplate = function (fileName, content) {
	return `export const ${fileName}=props=>iconBase(props,\`${content}\`)\n`;
};

const iconStatToString = function (data) {
	return `[${data.name}](${data.url})|${data.prefix}|${data.license}|${data.version}|${data.count}`;
};

/**
 * Generate a JSON file with the latest version of each icon
 *
 * @param {Array} data Array of objects with icon stats
 */
const generateVersionLog = function (data) {
	const versionsData = {};
	data.forEach((iconStat) => {
		versionsData[iconStat.name] = iconStat.version;
	});

	fse.outputJSONSync(path.resolve(__dirname, './versions.json'), versionsData);
};

/**
 * Generate a readme file from a template
 *
 * @param {Array} data Array of objects with icon stats
 */
const generateReadmeFile = function (data) {
	let readmeTemplate = fs.readFileSync(path.resolve(__dirname, './readme-template.txt'), 'utf8');

	// create string
	const dataStrings = data.map((iconStat) => {
		return iconStatToString(iconStat);
	});

	readmeTemplate = readmeTemplate.replace('[[:icons-list:]]', dataStrings.join('\n'));

	fse.outputFileSync(path.resolve(__dirname, '../README.md'), readmeTemplate);
};

/**
 * Hold an object with all icons and their occurrences
 * to ensure that we don't have duplicate icons
 */
let uniqueFileNames = {};

const getFilesContent = function (iconsInfo, group) {
	let { path: iconsPath, formatter, options = {}, filesFilter, attributes = {} } = iconsInfo;
	iconsPath = iconsPath.split(path.sep).join('/');

	let fileContent = '';
	const csvArray = [];

	// Get files list
	let files = fg.sync([iconsPath], options);

	// Do postprocessing on files
	if (filesFilter) {
		files = filesFilter(files);
	}

	// Show progress bar
	progressBar.start(files.length, 0);

	files.forEach((filePath) => {
		// update progress bar
		progressBar.increment();

		// Ignore files that are bigger than 80kb
		const fileSize = fs.statSync(filePath).size / 1024;
		if (fileSize > 80) {
			return;
		}

		const fileName = path.basename(filePath, path.extname(filePath));
		const formattedFileName = (formatter) ? formatter(fileName, filePath) : fileName;
		const variableName = pascalCase(formattedFileName, { transform: pascalCaseTransformMerge });
		let variableNameKey = variableName;
		let occurrence = 0;

		if (Object.keys(uniqueFileNames).includes(variableName)) {
			occurrence = uniqueFileNames[variableName] + 1;
			variableNameKey = `${variableName}${occurrence}`;
		}

		let svgString = fs.readFileSync(filePath, 'utf8');
		svgString = svgo.optimize(svgString, svgoSettings(attributes));

		// Add name and data
		uniqueFileNames[variableName] = occurrence;

		const getTemplate = svgTemplate(variableNameKey, svgString.data);
		fileContent += getTemplate;

		// Write to csv
		csvArray.push({
			name: variableNameKey,
			set: group,
			svg: svgString.data,
		});
	});

	// Stop progress bar
	progressBar.stop();

	return {
		content: fileContent,
		csv: csvArray,
	};
};

/**
 * Entry function to build icons.
 * At first it will empty icons folder.
 * Then it will loop through all icons directories
 * and extract svg files, then write it to icons directory.
 */
const buildIcons = async function () {
	// Empty directory first
	await fse.emptyDir(path.resolve(__dirname, '../icons'));
	await fse.emptyDir(path.resolve(__dirname, '../csv'));

	// Hold all icons info in this array
	const fullContent = [];

	// Hold export content
	let allIconsExport = '';

	// Hold icon set version, prefix, count, license ..etc
	const iconsStat = [];

	await manifest.reduce(async (previousPromise, iconsGroup) => {
		await previousPromise;

		const { name, group, url, version, license, repo: repoUrl, icons } = iconsGroup;
		const iconSetData = {
			name,
			url,
			prefix: group,
			license,
			version,
			count: 0,
		};

		console.log('\n\n\n', `Processing ${name} ...`);
		if (version === undefined) {
			try {
				const repoLinkData = repoUrl.split('/');

				// Get owner
				const owner = repoLinkData.at(-2);

				// Get repo name
				const repo = repoLinkData.at(-1);
				const octokit = new Octokit({
					auth: config.access_token,
				});

				const versionDetails = await octokit.request('GET /repos/{owner}/{repo}/releases/latest', {
					owner,
					repo,
				});

				iconSetData.version = versionDetails.data.tag_name.replace('v', '');
			} catch (error) {
				console.log(`Unable to get version for ${name}`, error.message);
			}
		}

		// Create csv write
		const csvWriter = createCsvWriter({
			path: path.resolve(__dirname, `../csv/${group}.csv`),
			header: ['name', 'set', 'svg'],
		});

		uniqueFileNames = {};
		const iconsContent = {
			name,
			count: 0,
		};
		let fileContent = 'import iconBase from \'../../scripts/icon-base\';\n';
		await icons.reduce(async (previousPromise, iconsInfo) => {
			await previousPromise;
			const { content, csv } = getFilesContent(iconsInfo, group);

			fileContent += content;

			await csvWriter.writeRecords(csv);
		}, Promise.resolve());

		fse.outputFileSync(
			path.resolve(__dirname, `../icons/${group}/index.js`),
			fileContent
		);

		iconsContent.count += Object.keys(uniqueFileNames).length;
		iconsContent.group = group;

		fullContent.push(iconsContent);

		iconSetData.count += iconsContent.count;
		iconsStat.push(iconSetData);

		allIconsExport += `export * from './${group}/index';\n`;
	}, Promise.resolve([]));

	// Create icon data file
	fse.outputFileSync(
		path.resolve(__dirname, '../icons/content.js'),
		`export default ${JSON.stringify(fullContent)}`
	);

	// Create all icons file
	fse.outputFileSync(path.resolve(__dirname, '../icons/all.js'), allIconsExport);

	generateReadmeFile(iconsStat);
	generateVersionLog(iconsStat);
};
buildIcons();
