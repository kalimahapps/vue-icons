const manifest = require('./manifest.js');
const fs = require('fs');
const fse = require('fs-extra');
const fg = require('fast-glob');
const path = require('path');
const changeCase = require('change-case');
const { pascalCase, pascalCaseTransformMerge } = changeCase;
const { parseSync } = require('svgson');
const { Octokit } = require("octokit");
const config = require('../config.js');

const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const svgTemplate = function (fileName, content) {
	return `export const ${fileName}=props=>iconBase(props,${content})\n`;
};

const iconStatToString = function (data) {
	return `[${data.name}](${data.url})|${data.prefix}|${data.license}|${data.version}|${data.count}`;
};

const generateReadmeFile = function (data) {
	let readmeTemplate = fs.readFileSync(path.resolve(__dirname, `./readme-template.txt`), 'utf8');
	readmeTemplate = readmeTemplate.replace('[[:icons-list:]]', data.join('\n'));

	fse.outputFileSync(path.resolve(__dirname, `../README.md`), readmeTemplate);
};

const getFilesContent = function (iconsInfo, group) {
	let { path: iconsPath, formatter, options = {}, attributes = {} } = iconsInfo;
	iconsPath = iconsPath.split(path.sep).join('/');

	let fileContent = '';
	let csvArray = [];

	// Hold a list of icons name
	const uniqueFileNames = [];

	// Get files list
	const files = fg.sync([iconsPath], options);

	files.forEach(filePath => {
		const fileName = path.basename(filePath, path.extname(filePath));
		const formattedFileName = formatter(fileName);
		const varName = pascalCase(formattedFileName, { transform: pascalCaseTransformMerge });

		if (uniqueFileNames.includes(varName)) {
			return;
		}

		const svgString = fs.readFileSync(filePath, 'utf8');
		let fileData = parseSync(svgString);
		delete fileData.attributes.xmlns;

		// Check for empty children array and remove it
		fileData = cleanUpSvg(fileData);

		fileData.attributes = { ...fileData.attributes, ...attributes };

		// Add name and data
		uniqueFileNames.push(varName);

		const getTemplate = svgTemplate(varName, JSON.stringify(fileData));
		fileContent += getTemplate;

		// Write to csv
		csvArray.push({
			name: varName,
			set: group,
			svg: JSON.stringify(fileData)
		});
	});


	return { content: fileContent, uniqueFileNames, csv: csvArray };
};

/**
 * This function removes empty children array and empty attributes.
 * It also removes common properties like element which will be
 * later added by iconBase component
 * 
 * @param {object|array} data SVG data to clean
 * @returns {object|array} Cleaned SVG data
 */
const cleanUpSvg = function (data) {

	// Handle array data
	if (Array.isArray(data)) {
		return data.reduce((acc, item) => {
			const cleanedItem = cleanUpSvg(item);
			acc.push(cleanedItem);
			return acc;
		}, []);
	}


	// Handle object data
	return Object.keys(data).reduce((acc, key) => {

		// Delete empty children array
		if (key === 'children' && data[key].length === 0) {
			delete data[key];
		}

		// Delete empty value attribute
		if (key === "value" && data[key] === "") {
			delete data[key];
		}

		// Delete type attributes
		if (key === "name" && (data.name === "svg" || data.name === 'path')) {
			delete data.type;
		}


		// Push to accumulator
		acc[key] = (key === 'children' && data[key] !== undefined) ? cleanUpSvg(data[key]) : data[key];

		return acc;
	}, {});
}

/**
 * Entry function to build icons.
 * At first it will empty icons folder.
 * Then it will loop through all icons directories
 * and extract svg files, then write it to icons directory.
 */
const buildIcons = async function () {
	// Empty directory first
	await fse.emptyDir(path.resolve(__dirname, '../icons'));

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

		console.log(`-- Processing ${name}...`);
		if (version === undefined) {
			try {
				console.log(`Getting version number...`);
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
				console.log("Error getting the details", e.message);
			}
		}

		const csvWriter = createCsvWriter({
			path: path.resolve(__dirname, `../csv/${iconsGroup.group}.csv`),
			header: ['name', 'set', 'svg']
		});


		const iconsContent = { name, icons: [] };
		let fileContent = `import iconBase from '../../scripts/icon-base';\n`;
		await iconsGroup.icons.reduce(async (prevPromise, iconsInfo) => {
			await prevPromise;

			const { uniqueFileNames, content, csv } = getFilesContent(iconsInfo, iconsGroup.group);

			iconsContent.icons = [...iconsContent.icons, ...uniqueFileNames];
			fileContent += content;

			// await csvWriter.writeRecords(csv);

		}, Promise.resolve());

		fse.outputFileSync(
			path.resolve(__dirname, `../icons/${iconsGroup.group}/index.js`),
			fileContent
		);

		// Sort icons alphabetically
		iconsContent.icons.sort((a, b) => a.localeCompare(b));
		iconsContent.group = group;

		fullContent.push(iconsContent);

		iconSetData.count += iconsContent.icons.length;
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
