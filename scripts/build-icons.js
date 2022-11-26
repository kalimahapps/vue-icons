const manifest = require('./manifest.js');
const fs = require('fs');
const fse = require('fs-extra');
const fg = require('fast-glob');
const path = require('path');
const changeCase = require('change-case');
const { pascalCase, pascalCaseTransformMerge } = changeCase;
const cliProgress = require('cli-progress');
const colors = require('ansi-colors');
const { Octokit } = require("octokit");
const config = require('../config.js');
const svgo = require('svgo');
const svgoSettings = require('./svgo-settings.js');

const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// create progress bar defaults
const progressBar = new cliProgress.SingleBar({
	format: `${colors.cyanBright('{bar}')}    ${colors.magenta('{percentage}%')}    ({value}/{total})`,
	barCompleteChar: '>',
	barIncompleteChar: '-',
	hideCursor: true
});

const svgTemplate = function (fileName, content) {
	return `export const ${fileName}=props=>iconBase(props,\`${content}\`)\n`;
};

const iconStatToString = function (data) {
	return `[${data.name}](${data.url})|${data.prefix}|${data.license}|${data.version}|${data.count}`;
};

const generateReadmeFile = function (data) {
	let readmeTemplate = fs.readFileSync(path.resolve(__dirname, `./readme-template.txt`), 'utf8');
	readmeTemplate = readmeTemplate.replace('[[:icons-list:]]', data.join('\n'));

	fse.outputFileSync(path.resolve(__dirname, `../README.md`), readmeTemplate);
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
	let csvArray = [];

	// Get files list
	let files = fg.sync([iconsPath], options);

	// Do postprocessing on files
	if (filesFilter) {
		files = filesFilter(files);
	}

	// Show progress bar
	progressBar.start(files.length, 0);


	files.forEach(filePath => {

		// update progress bar
		progressBar.increment();

		// Ignore files that are bigger than 80kb
		const fileSize = fs.statSync(filePath).size / 1024;
		if (fileSize > 80) {
			return;
		}

		const fileName = path.basename(filePath, path.extname(filePath));
		const formattedFileName = (formatter) ? formatter(fileName, filePath) : fileName;
		let varName = pascalCase(formattedFileName, { transform: pascalCaseTransformMerge });
		let occurrence = 0;

		if (Object.keys(uniqueFileNames).includes(varName)) {
			occurrence = uniqueFileNames[varName] + 1;
			varName = `${varName}${occurrence}`;
		}

		const svgString = fs.readFileSync(filePath, 'utf8');
		const svgStr = svgo.optimize(svgString, svgoSettings(attributes));

		// Add name and data
		uniqueFileNames[varName] = occurrence;

		const getTemplate = svgTemplate(varName, svgStr.data);
		fileContent += getTemplate;

		// Write to csv
		csvArray.push({
			name: varName,
			set: group,
			svg: svgStr.data
		});
	});

	// Stop progress bar
	progressBar.stop();

	return { content: fileContent, csv: csvArray };
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
	let fullContent = [];

	// Hold export content
	let allIconsExport = '';

	// Hold icon set version, prefix, count, license ..etc
	let iconsStat = [];

	await manifest.reduce(async (prevPromise, iconsGroup) => {
		await prevPromise;

		const { name, group, url, version, license, repo: repoUrl } = iconsGroup;
		const iconSetData = {
			name,
			url,
			prefix: group,
			license,
			version,
			count: 0
		};

		console.log('\n\n\n', `Processing ${name} ...`);
		if (version === undefined) {
			try {
				const repoLinkData = repoUrl.split('/');

				// Get owner
				const owner = repoLinkData.slice(-2)[0];

				// Get repo name
				const repo = repoLinkData.slice(-1)[0];
				const octokit = new Octokit({
					auth: config.access_token
				});

				const versionDetails = await octokit.request("GET /repos/{owner}/{repo}/releases/latest", {
					owner,
					repo,
				});

				iconSetData.version = versionDetails.data.tag_name.replace('v', '');
			} catch (e) {
				console.log(`Unable to get version for ${name}`, e.message);
			}
		}

		// Create csv write
		const csvWriter = createCsvWriter({
			path: path.resolve(__dirname, `../csv/${iconsGroup.group}.csv`),
			header: ['name', 'set', 'svg']
		});


		uniqueFileNames = {};
		const iconsContent = { name, count: 0 };
		let fileContent = `import iconBase from '../../scripts/icon-base';\n`;
		await iconsGroup.icons.reduce(async (prevPromise, iconsInfo) => {
			await prevPromise;
			const { content, csv } = getFilesContent(iconsInfo, iconsGroup.group);


			fileContent += content;

			await csvWriter.writeRecords(csv);

		}, Promise.resolve());

		fse.outputFileSync(
			path.resolve(__dirname, `../icons/${iconsGroup.group}/index.js`),
			fileContent
		);

		iconsContent.count += Object.keys(uniqueFileNames).length;
		iconsContent.group = group;

		fullContent.push(iconsContent);

		iconSetData.count += iconsContent.count;
		iconsStat.push(iconStatToString(iconSetData));

		allIconsExport += `export * from './${group}/index';\n`;

	}, Promise.resolve([]));

	// Create icon data file
	fse.outputFileSync(
		path.resolve(__dirname, `../icons/content.js`),
		`export default ${JSON.stringify(fullContent)}`
	);

	// Create all icons file
	fse.outputFileSync(path.resolve(__dirname, `../icons/all.js`), allIconsExport);

	generateReadmeFile(iconsStat);
};
buildIcons();
