const manifst = require('./manifst.js');
const fs = require('fs');
const fse = require('fs-extra');
const fg = require('fast-glob');
const path = require('path');
const changeCase = require('change-case');
const { pascalCase, pascalCaseTransformMerge } = changeCase;
const { parseSync } = require('svgson');

const svgTemplate = function (fileName, content) {
	return `export const ${fileName}=props=>iconBase(props,${content})\n`;
};

const isObject = function (obj) {
	return obj != null && obj.constructor.name === 'Object';
};

const getFilesContent = function (iconsInfo) {
	let { path: iconsPath, formatter, options = {}, attributes = {} } = iconsInfo;
	iconsPath = iconsPath.split(path.sep).join('/');

	let fileContent = '';

	// Hold file names to get prevent duplicate names
	const uniqueFileNames = [];

	// Get files list
	const files = fg.sync([iconsPath], options);

	files.forEach(async filePath => {
		const fileName = path.basename(filePath, path.extname(filePath));
		const formattedFileName = formatter(fileName);
		const varName = pascalCase(formattedFileName, { transform: pascalCaseTransformMerge });

		if (uniqueFileNames.includes(varName)) {
			return;
		}
		uniqueFileNames.push(varName);

		const svgString = fs.readFileSync(filePath, 'utf8');
		const fileData = parseSync(svgString);
		delete fileData.attributes.xmlns;
		fileData.attributes = { ...fileData.attributes, ...attributes };

		const getTemplate = svgTemplate(varName, JSON.stringify(fileData));
		fileContent += getTemplate;
	});

	return { content: fileContent, names: uniqueFileNames };
};

/**
 * Entry function to build icons.
 * At first it will empty icons folder.
 * Then it will loop through all icons directories
 * and extract svg files, then write it to icons directory.
 */
const buildIcons = async function () {
	// Empty directy first
	await fse.emptyDir(path.resolve(__dirname, '../icons'));

	// Hold all icons info in this array
	let fullContent = [];

	// Hold export content
	let allIconsExport = '';

	manifst.forEach(iconsGroup => {
		const { name, group } = iconsGroup;
		const iconsContent = { name, icons: [] };
		let fileContent = `import iconBase from '../../scripts/icon-base';\n`;
		iconsGroup.icons.forEach(iconsInfo => {
			const { names, content } = getFilesContent(iconsInfo);
			iconsContent.icons = [...iconsContent.icons, ...names];
			fileContent += content;
		});

		fse.outputFileSync(
			path.resolve(__dirname, `../icons/${iconsGroup.group}/index.js`),
			fileContent
		);

		// Sort icons alphabitcally
		iconsContent.icons.sort((a, b) => a.localeCompare(b));
		iconsContent.group = group;

		fullContent.push(iconsContent);

		allIconsExport += `export * from './${group}/index';\n`;
	});

	// Create icon data file
	fse.outputFileSync(
		path.resolve(__dirname, `../icons/content.js`),
		`export default ${JSON.stringify(fullContent)}`
	);

	// Create all icons file
	fse.outputFileSync(path.resolve(__dirname, `../icons/all.js`), allIconsExport);
};
buildIcons();
