import fs from 'node:fs';
import path from 'node:path';
import fg from 'fast-glob';
import fse from 'fs-extra';
import { Octokit } from 'octokit';
import svgo from 'svgo';
import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';
import config from '../config.js';
import manifest from './manifest.js';
import svgoSettings from './svgo-settings.js';
import changeCase from 'change-case';
import { fileURLToPath } from 'node:url';
import { createProgressBar, createHeader } from '@kalimahapps/cli-progress';
const currentFilePath = fileURLToPath(import.meta.url);
const currentDirectoryPath = path.dirname(currentFilePath);

const { pascalCase, pascalCaseTransformMerge } = changeCase;

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
	for (const iconStat of data) {
		versionsData[iconStat.name] = iconStat.version;
	}

	fse.outputJSONSync(path.resolve(currentDirectoryPath, './versions.json'), versionsData, {
		spaces: '\t',
	});
};

/**
 * Hold an object with all icons and their occurrences
 * to ensure that we don't have duplicate icons
 */
let uniqueFileNames = {};

/* eslint complexity: ["error", 9] */
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
	const progressBar = createProgressBar();
	progressBar.setTotal(files.length);

	for (const filePath of files) {
		// update progress bar
		progressBar.increment();

		// Ignore files that are bigger than 80kb
		const fileSize = fs.statSync(filePath).size / 1024;
		if (fileSize > 80) {
			continue;
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
	}

	// Stop progress bar
	progressBar.stop();

	return {
		content: fileContent,
		csv: csvArray,
	};
};

const createTypeFile = function (group, uniqueFileNames) {
	const content = [
		'import { Component } from "vue";',
		`declare module '@kalimahapps/vue-icons/${group}' {`,
	];
	const keys = Object.keys(uniqueFileNames);

	const components = [];
	for (const key of keys) {
		components.push(`export const ${key}: Component;`);
	}

	content.push(components.join('\n'), '}');
	fse.outputFileSync(
		path.resolve(currentDirectoryPath, `../icons/${group}/index.d.ts`),
		content.join('\n')
	);
};

/**
 * Entry function to build icons.
 * At first it will empty icons folder.
 * Then it will loop through all icons directories
 * and extract svg files, then write it to icons directory.
 */
// eslint-disable-next-line max-lines-per-function
const buildIcons = async function () {
	// Empty directory first
	await fse.emptyDir(path.resolve(currentDirectoryPath, '../icons'));
	await fse.emptyDir(path.resolve(currentDirectoryPath, '../csv'));

	// Hold export content
	const allIconsExport = [];

	// Hold types for all icons
	const allIconsTypes = [];

	// Hold icon set version, prefix, count, license ..etc
	const iconsStat = [];

	const startTime = Date.now();

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

		createHeader(`Processing ${name}`);
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
			path: path.resolve(currentDirectoryPath, `../csv/${group}.csv`),
			header: ['name', 'set', 'svg'],
		});

		uniqueFileNames = {};

		let fileContent = 'import iconBase from \'@kalimahapps/vue-icons/icon-base\';\n';
		await icons.reduce(async (previousPromise, iconsInfo) => {
			await previousPromise;
			const { content, csv } = getFilesContent(iconsInfo, group);

			fileContent += content;

			await csvWriter.writeRecords(csv);
		}, Promise.resolve());

		// Output file
		fse.outputFileSync(
			path.resolve(currentDirectoryPath, `../icons/${group}/index.js`),
			fileContent
		);

		// Output file type
		createTypeFile(group, uniqueFileNames);

		iconSetData.count += Object.keys(uniqueFileNames).length;
		iconSetData.group = group;

		iconsStat.push(iconSetData);

		allIconsExport.push(`export * from './${group}/index.js';`);
		allIconsTypes.push(`export * from '@kalimahapps/vue-icons/${group}';`);
	}, Promise.resolve([]));

	// Create icon data file
	fse.outputFileSync(
		path.resolve(currentDirectoryPath, '../icons/content.js'),
		`export default ${JSON.stringify(iconsStat)}`
	);

	// Create all icons file
	fse.outputFileSync(
		path.resolve(currentDirectoryPath, '../icons/all.js'),
		allIconsExport.join('\n')
	);

	// Create type file for all icons file
	fse.outputFileSync(
		path.resolve(currentDirectoryPath, '../icons/all.d.ts'),
		allIconsTypes.join('\n')
	);

	generateVersionLog(iconsStat);

	const endTime = Date.now();
	const timeTaken = endTime - startTime;

	console.log(`\n\n\nTime taken: ${formatTimeTaken(timeTaken / 1000)}`);
};

/**
 * Format time taken to process icons
 *
 * @param  {string} time Time taken to process icons in milliseconds
 * @return {string}      Formatted time taken
 */
const formatTimeTaken = (time) => {
	const minutes = Math.floor((time % 3600) / 60);
	const seconds = Math.floor(time % 60);

	return `${minutes}m ${seconds}s`;
};
buildIcons();
