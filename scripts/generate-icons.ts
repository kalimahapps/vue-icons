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
import { fileURLToPath } from 'node:url';
import { createProgressBar, createHeader } from '@kalimahapps/cli-progress';
import * as changeCase from 'change-case';

type IconSet = {
	name: string;
	url: string;
	prefix: string;
	license: string;
	repo: string;
	version?: string;
	count: number;
	group: string;
};

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirectoryPath = path.dirname(currentFilePath);
const { pascalCase, kebabCase, splitSeparateNumbers } = changeCase;

// Used to iterate over the initial split result and separate numbers.
const SPLIT_SEPARATE_NUMBER_RE = /(?<digit>\d)\p{Ll}|(?<letter>\p{L})\d/u;

/**
 * ChangeCase split function does not split certain words correctly.
 * for example: 'an-outlined-open-a-i', 'an-outlined-harmony-o-s', 'bx-sort-a-z', 'a-b-off'
 * would be correct when converting to PascalCase:
 * 'AnOutlinedOpenAI', 'AnOutlinedHarmonyOS', 'BxSortAZ', 'ABOff'
 * but then when converted back they are incorrect:
 * 'an-outlined-open-ai', 'an-outlined-harmony-os', 'bx-sort-az', 'a-boff'
 * This custom function fixes these issues. It uses character by character
 * approach instead of regex.
 *
 * @see https://github.com/blakeembrey/change-case/issues/362
 *
 * @param  {string}   value The string to process
 * @return {string[]}       The split words
 */
const splitCustom = function (value: string): string[] {
	const chars = value.trim();
	if (!chars) {
		return [];
	}

	const result = [];
	let currentWord = '';

	for (const char of chars) {
		const isUppercase = char >= 'A' && char <= 'Z';

		if (!isUppercase) {
			// Add non-uppercase character to current word
			currentWord += char;
			continue;
		}

		// Handle uppercase character - start a new word
		if (currentWord) {
			result.push(currentWord);
		}
		currentWord = char;
	}

	// Don't forget the last word
	if (currentWord) {
		result.push(currentWord);
	}

	return result;
};

const splitSeparateNumbersCustom = function (value: string): string[] {
	const words = splitCustom(value);
	for (let index = 0; index < words.length; index++) {
		const word = words[index];
		const match = SPLIT_SEPARATE_NUMBER_RE.exec(word);
		if (match) {
			const offset = match.index + (match[1] ?? match[2]).length;
			words.splice(index, 1, word.slice(0, offset), word.slice(offset));
		}
	}

	return words;
};

const svgTemplate = function (fileName: string, content: string): string {
	return `export const ${fileName}=props=>iconBase(props,\`${content}\`)\n`;
};

/**
 * Generate a JSON file with the latest version of each icon
 *
 * @param {IconSet[]} data Array of objects with icon stats
 */
const generateVersionLog = function (data: IconSet[]) {
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
const allIconsNamesKebabCase: string[] = [];
const allIconsNamesPascalCase: string[] = [];

/* eslint complexity: ["warn", 10] */
const getFilesContent = function (iconsInfo: IconGroup, group: string) {
	let { path: iconsPath, formatter, filesFilter, attributes = {} } = iconsInfo;
	iconsPath = iconsPath.split(path.sep).join('/');

	let fileContent = '';
	const csvArray = [];

	// Get files list
	let files = fg.sync([iconsPath]);

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
		const variableName = pascalCase(formattedFileName, {
			mergeAmbiguousCharacters: true,
			split: splitSeparateNumbers,
		});

		let variableNameKey = variableName;
		let occurrence = 0;

		if (Object.keys(uniqueFileNames).includes(variableName)) {
			occurrence = uniqueFileNames[variableName] + 1;
			variableNameKey = `${variableName}${occurrence}`;
		}

		const svgString = fs.readFileSync(filePath, 'utf8');
		const svgOutput = svgo.optimize(svgString, svgoSettings(attributes));

		// Add name and data
		uniqueFileNames[variableName] = occurrence;

		// Add to all icons names
		// replace the first dash with colon since it is the group name
		const replacedFirstDash = kebabCase(variableNameKey, {
			split: splitSeparateNumbersCustom,
		}).replace('-', ':');
		allIconsNamesKebabCase.push(replacedFirstDash);
		allIconsNamesPascalCase.push(variableNameKey);

		const getTemplate = svgTemplate(variableNameKey, svgOutput.data);
		fileContent += getTemplate;

		// Write to csv
		csvArray.push({
			name: replacedFirstDash,
			set: group,
			svg: svgOutput.data,
		});
	}

	// Stop progress bar
	progressBar.stop();

	return {
		content: fileContent,
		csv: csvArray,
	};
};

const createTypeFile = function (group: string, uniqueFileNames: Record<string, number>) {
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
 * Format time taken to process icons
 *
 * @param  {number} time Time taken to process icons in milliseconds
 * @return {string}      Formatted time taken
 */
const formatTimeTaken = (time: number): string => {
	const minutes = Math.floor((time % 3600) / 60);
	const seconds = Math.floor(time % 60);

	return `${minutes}m ${seconds}s`;
};

/**
 * Entry function to build icons.
 * At first it will empty icons folder.
 * Then it will loop through all icons directories
 * and extract svg files, then write it to icons directory.
 */
// eslint-disable-next-line max-lines-per-function
const buildIcons = async function (): Promise<void> {
	// Empty directory first
	await fse.emptyDir(path.resolve(currentDirectoryPath, '../icons'));
	await fse.emptyDir(path.resolve(currentDirectoryPath, '../csv'));

	// Hold export content
	const allIconsExport = [];

	// Hold types for all icons
	const allIconsTypes = [];

	// Hold icon set version, prefix, count, license ..etc
	const iconsStat: IconSet[] = [];

	const startTime = Date.now();

	// await manifest.reduce(async (previousPromise, iconsGroup) => {
	// await previousPromise;
	for (const iconsGroup of manifest) {
		const { name, group, url, version, license, repo: repoUrl, icons } = iconsGroup;

		const iconSetData: IconSet = {
			name,
			url,
			prefix: group,
			license,
			repo: repoUrl,
			version,
			count: 0,
			group,
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
		for (const iconsInfo of icons) {
			const { content, csv } = getFilesContent(iconsInfo, group);

			fileContent += content;

			await csvWriter.writeRecords(csv);
		}

		// Output file
		fse.outputFileSync(
			path.resolve(currentDirectoryPath, `../icons/${group}/index.js`),
			fileContent
		);

		// Output file type
		createTypeFile(group, uniqueFileNames);

		iconSetData.count += Object.keys(uniqueFileNames).length;

		iconsStat.push(iconSetData);

		allIconsExport.push(`export * from './${group}/index.js';`);
		allIconsTypes.push(`export * from '@kalimahapps/vue-icons/${group}';`);
	}

	// Create icon data file
	fse.outputFileSync(
		path.resolve(currentDirectoryPath, '../icons/content.json'),
		JSON.stringify(iconsStat)
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

	// Create all icons kebab case names file
	fse.outputFileSync(
		path.resolve(currentDirectoryPath, '../icons/icons-list-kebab-case.json'),
		JSON.stringify(allIconsNamesKebabCase)
	);

	// Create all icons pascal case names file
	fse.outputFileSync(
		path.resolve(currentDirectoryPath, '../icons/icons-list-pascal-case.json'),
		JSON.stringify(allIconsNamesPascalCase)
	);

	generateVersionLog(iconsStat);

	const endTime = Date.now();
	const timeTaken = endTime - startTime;

	console.log(`\n\n\nTime taken: ${formatTimeTaken(timeTaken / 1000)}`);
};

await buildIcons();
