/* eslint-disable max-lines */
// const path = require('node:path');
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const currentFilePath = fileURLToPath(import.meta.url);
const currentDirectoryPath = path.dirname(currentFilePath);

export default [
	{
		group: 'ad',
		name: 'FontAudio',
		license: 'MIT',
		url: 'https://github.com/fefanto/fontaudio',
		repo: 'https://github.com/fefanto/fontaudio',
		icons: [
			{
				path: path.resolve(currentDirectoryPath, '../packages/fontaudio/svgs/*.svg'),
				formatter: (fileName) => {
					const cleanFileName = fileName.replace(/^fad-/u, '');
					return `ad-${cleanFileName.toLowerCase()}`;
				},
				attributes: {
					fill: 'currentColor',
				},
			},
		],
	},
	{
		group: 'ai',
		name: 'Academicons',
		license: 'SIL OFL 1.1',
		url: 'https://jpswalsh.github.io/academicons/',
		repo: 'https://github.com/jpswalsh/academicons',
		icons: [
			{
				path: path.resolve(currentDirectoryPath, '../packages/academicons/svg/*.svg'),
				formatter: (fileName) => { return `ai-${fileName}`; },
				attributes: {
					fill: 'currentColor',
				},
			},
		],
	},
	{
		group: 'ak',
		name: 'Akar',
		license: 'MIT',
		url: 'https://akaricons.com/',
		repo: 'https://github.com/artcoholic/akar-icons',
		icons: [
			{
				path: path.resolve(currentDirectoryPath, '../packages/akar/src/svg/*.svg'),
				formatter: (fileName) => {
					return `ak-${fileName}`;
				},
				attributes: {
					fill: 'currentColor',
				},
			},
		],
	},
	{
		group: 'an',
		name: 'Ant Design',
		license: 'MIT',
		version: '4.2.1',
		url: 'https://ant.design/components/icon/',
		repo: 'https://github.com/ant-design/ant-design-icons',
		icons: [
			{
				path: path.resolve(currentDirectoryPath, '../packages/ant-design/packages/icons-svg/svg/filled/*.svg'),
				formatter: (fileName) => { return `an-filled-${fileName}`; },
				attributes: {
					fill: 'currentColor',
				},
			},
			{
				path: path.resolve(currentDirectoryPath, '../packages/ant-design/packages/icons-svg/svg/outlined/*.svg'),
				formatter: (fileName) => { return `an-outlined-${fileName}`; },
				attributes: {
					fill: 'currentColor',
				},
			},
			{
				path: path.resolve(currentDirectoryPath, '../packages/ant-design/packages/icons-svg/svg/twotone/*.svg'),
				formatter: (fileName) => { return `an-twotone-${fileName}`; },
				attributes: {
					twotone: true,
				},
			},
		],
	},
	{
		group: 'bs',
		name: 'Bootstrap Icons',
		license: 'MIT',
		url: 'https://icons.getbootstrap.com/',
		repo: 'https://github.com/twbs/icons',
		icons: [
			{
				path: path.resolve(currentDirectoryPath, '../packages/bootstrap-icons/icons/*.svg'),
				formatter: (name) => {
					return `bs-${name}`;
				},
			},
		],
	},
	{
		group: 'bx',
		name: 'Boxicons',
		license: 'CC 4.0',
		url: 'https://boxicons.com/',
		repo: 'https://github.com/atisawd/boxicons',
		version: '2.1.4',
		icons: [
			{
				path: path.resolve(currentDirectoryPath, '../packages/boxicons/svg/logos/*.svg'),
				formatter: (fileName) => { return `bx-${fileName.replace('bxl-', '')}`; },
				attributes: {
					fill: 'currentColor',
				},
			},
			{
				path: path.resolve(currentDirectoryPath, '../packages/boxicons/svg/regular/*.svg'),
				formatter: (fileName) => { return `bx-${fileName.replace('bx-', '')}`; },
				attributes: {
					fill: 'currentColor',
				},
			},
			{
				path: path.resolve(currentDirectoryPath, '../packages/boxicons/svg/solid/*.svg'),
				formatter: (fileName) => { return `bx-solid-${fileName.replace('bxs-', '')}`; },
				attributes: {
					fill: 'currentColor',
				},
			},
		],
	},
	{
		group: 'ca',
		name: 'Carbon',
		license: 'Apache-2.0',
		url: 'https://carbondesignsystem.com/',
		repo: 'https://github.com/carbon-design-system/carbon',
		icons: [
			{
				path: path.resolve(currentDirectoryPath, '../packages/carbon/packages/icons/src/svg/32/*.svg'),
				formatter: (fileName) => {
					// Remove double dashes
					const cleanedFileName = fileName.replaceAll('--', '-');
					return `ca-${cleanedFileName}`;
				},
				attributes: {
					fill: 'currentColor',
				},
			},
		],
	},
	{
		group: 'ch',
		name: 'Charm Icons',
		license: 'MIT',
		url: 'https://codepen.io/jaynewey/full/LYROoGJ',
		repo: 'https://github.com/jaynewey/charm-icons',
		icons: [
			{
				path: path.resolve(currentDirectoryPath, '../packages/charm/icons/*.svg'),
				formatter: (fileName) => {
					return `ch-${fileName.replaceAll('_', '-')}`;
				},
				attributes: {
					fill: 'currentColor',
				},
			},
		],
	},
	{
		group: 'cl',
		name: 'CoolIcons',
		license: 'CC 4.0',
		url: 'https://coolicons.cool/',
		repo: 'https://github.com/krystonschwarze/coolicons',
		icons: [
			{
				path: path.resolve(currentDirectoryPath, '../packages/coolicons/coolicons SVG/**/*.svg'),
				formatter: (fileName) => {
					return `cl-${fileName.toLowerCase()}`;
				},
				attributes: {
					fill: 'currentColor',
				},
			},
		],
	},
	{
		group: 'by',
		name: 'Bytesize',
		license: 'MIT',
		url: 'https://danklammer.com/bytesize-icons/',
		repo: 'https://github.com/danklammer/bytesize-icons',
		icons: [
			{
				path: path.resolve(currentDirectoryPath, '../packages/bytesize/dist/icons/*.svg'),
				formatter: (fileName) => { return `by-${fileName}`; },
			},
		],
	},
	{
		group: 'ci',
		name: 'Circum',
		version: '2.0.0',
		license: 'MPL-2.0',
		url: 'https://circumicons.com/',
		repo: 'https://github.com/Klarr-Agency/Circum-icons',
		icons: [
			{
				path: path.resolve(currentDirectoryPath, '../packages/circum/svg/*.svg'),
				formatter: (fileName) => { return `ci-${fileName.replaceAll('_', '-')}`; },
				attributes: {
					fill: 'currentColor',
				},
			},
		],
	},
	{
		group: 'cd',
		name: 'Codicons',
		license: 'MIT',
		url: 'https://microsoft.github.io/vscode-codicons/dist/codicon.html',
		repo: 'https://github.com/microsoft/vscode-codicons',
		icons: [
			{
				path: path.resolve(currentDirectoryPath, '../packages/codicons/src/icons/*.svg'),
				formatter: (fileName) => { return `cd-${fileName}`; },
			},
		],
	},
	{
		group: 'co',
		name: 'Core UI Icons',
		license: 'CC 4.0',
		url: 'https://coreui.io/icons/',
		repo: 'https://github.com/coreui/coreui-icons',
		icons: [
			{
				path: path.resolve(currentDirectoryPath, '../packages/coreui/svg/brand/*.svg'),
				formatter: (fileName) => { return `co-brand-${fileName.replace('cib-', '')}`; },
				attributes: {
					fill: 'currentColor',
				},
			},
			{
				path: path.resolve(currentDirectoryPath, '../packages/coreui/svg/flag/*.svg'),
				formatter: (fileName) => { return `co-flag-${fileName.replace('cif-', '')}`; },
				attributes: {
					multicolor: true,
				},
			},
			{
				path: path.resolve(currentDirectoryPath, '../packages/coreui/svg/free/*.svg'),
				formatter: (fileName) => { return `co-${fileName.replace('cil-', '')}`; },
				attributes: {
					fill: 'currentColor',
				},
			},
		],
	},
	{
		group: 'cg',
		name: 'css.gg',
		license: 'MIT',
		url: 'https://css.gg/',
		repo: 'https://github.com/astrit/css.gg',
		icons: [
			{
				path: path.resolve(currentDirectoryPath, '../packages/css-gg/icons/svg/*.svg'),
				formatter: (fileName) => { return `cg-${fileName}`; },
				attributes: {
					fill: 'currentColor',
				},
			},
		],
	},
	{
		group: 'de',
		name: 'Devicons',
		license: 'MIT',
		url: 'https://devicon.dev/',
		repo: 'https://github.com/devicons/devicon',
		icons: [
			{
				path: path.resolve(currentDirectoryPath, '../packages/devicons/icons/**/*.svg'),
				formatter: (fileName) => { return `de-${fileName}`; },
				attributes: {
					multicolor: true,
				},
			},
		],
	},
	{
		group: 'fl',
		name: 'FluentUI System',
		license: 'MIT',
		version: '1.1.201',
		repo: 'https://github.com/microsoft/fluentui-system-icons',
		url: 'https://github.com/microsoft/fluentui-system-icons',
		icons: [
			{
				path: path.resolve(currentDirectoryPath, '../packages/fluentui-system/assets/*/SVG/*.svg'),
				formatter: (fileName, filePath) => {
					const folderName = path.basename(path.join(filePath, '..', '..'));

					return fileName.replaceAll(
						/ic_fluent_(.+)_(12|16|20|24|28|32|48)_(.+)/g,
						(match, name, size, type) => {
							// const cleanName = name.replaceAll(/_/g, '-');
							const cleanName = folderName.replaceAll(/\s/g, '-');
							if (type.toLowerCase() === 'regular') {
								return `fl-${cleanName}`;
							}
							return `fl-${type}-${cleanName}`;
						}
					);
				},
				attributes: {
					pathfill: 'currentColor',
				},
				filesFilter: (filesList) => {
					// Filter files list to get the highest resolution from each icon folder

					// Group files based on parent folder name
					const groupedFiles = filesList.reduce((accumulator, filePath) => {
						const fileName = path.basename(filePath);

						// ignore light icons
						if (fileName.includes('_light.svg')) {
							return accumulator;
						}

						const folderName = path.basename(path.join(filePath, '..', '..'));

						// Clean up folder name
						// eslint-disable-next-line no-useless-escape
						const cleanedFolderName = folderName.replace('/\s/g', '-').toLowerCase();
						if (!accumulator[cleanedFolderName]) {
							accumulator[cleanedFolderName] = [];
						}

						accumulator[cleanedFolderName].push(filePath);
						return accumulator;
					}, {});

					const sizes = ['48', '32', '24', '20', '16', '12'];

					// Loop through each group and return the file with the highest resolution
					const finalFilesList = Object.keys(groupedFiles)
						.reduce((accumulator, groupName) => {
							let files = groupedFiles[groupName];

							let sizeFound = 0;

							// Sort files in reverse alphabetically
							files = files.sort((a, b) => {
								return b.localeCompare(a);
							});

							// Find the highest resolution inside the group
							for (const size of sizes) {
								const file = files.find((file) => {
									return file.includes(size);
								});
								if (file) {
									sizeFound = size;
									break;
								}
							}

							// Get the file with the highest resolution
							for (const filePath of files) {
								const fileName = path.basename(filePath);
								if (!fileName.includes(`_${sizeFound}_`)) {
									continue;
								}
								accumulator.push(filePath);
							}
							return accumulator;
						}, []);

					return finalFilesList;
				},
			},
		],
	},
	{
		group: 'fa',
		name: 'Font Awesome',
		url: 'https://fontawesome.com/',
		repo: 'https://github.com/FortAwesome/Font-Awesome',
		license: 'CC BY 4.0',
		icons: [
			{
				path: path.resolve(currentDirectoryPath, '../packages/font-awesome/svgs/regular/*.svg'),
				formatter: (name) => { return `fa-reg-${name}`; },
				attributes: {
					fill: 'currentColor',
				},
			},
			{
				path: path.resolve(currentDirectoryPath, '../packages/font-awesome/svgs/brands/*.svg'),
				formatter: (name) => { return `fa-bands-${name}`; },
				attributes: {
					fill: 'currentColor',
				},
			},
			{
				path: path.resolve(currentDirectoryPath, '../packages/font-awesome/svgs/solid/*.svg'),
				formatter: (name) => { return `fa-${name}`; },
				attributes: {
					fill: 'currentColor',
				},
			},
		],
	},
	{
		group: 'fe',
		name: 'Feather',
		license: 'MIT',
		repo: 'https://github.com/feathericons/feather',
		url: 'https://feathericons.com/',
		icons: [
			{
				path: path.resolve(currentDirectoryPath, '../packages/feather/icons/*.svg'),
				formatter: (name) => {
					return `fe-${name}`;
				},
			},
		],
	},
	{
		group: 'gl',
		name: 'GitLab',
		license: 'MIT',
		version: '3.46.0',
		url: 'http://gitlab-org.gitlab.io/gitlab-svgs/',
		repo: 'https://gitlab.com/gitlab-org/gitlab-svgs/-/tree/main',
		icons: [
			{
				path: path.resolve(currentDirectoryPath, '../packages/gitlab/sprite_icons/*.svg'),
				formatter: (fileName) => {
					return `gl-${fileName.replaceAll('_', '-')}`;
				},
				attributes: {
					fill: 'currentColor',
				},
			},
		],
	},
	{
		group: 'gv',
		name: 'Govicons',
		license: 'SIL OFL 1.1',
		repo: 'https://github.com/540co/govicons',
		url: 'http://govicons.io/',
		icons: [
			{
				path: path.resolve(currentDirectoryPath, '../packages/govicons/raw-svg/*.svg'),
				formatter: (fileName) => { return `gv-${fileName}`; },
				attributes: {
					fill: 'currentColor',
				},
			},
		],
	},
	{
		group: 'he',
		name: 'Healthicons',
		license: 'MIT',
		version: '0.1.0',
		repo: 'https://github.com/resolvetosavelives/healthicons',
		url: 'https://healthicons.org/',
		icons: [
			{
				path: path.resolve(currentDirectoryPath, '../packages/healthicons/public/icons/svg/outline/**/*.svg'),
				formatter: (fileName, filePath) => {
					const folderName = path.basename(path.dirname(filePath));

					if (folderName !== 'blood') {
						return `he-outline-${fileName.replaceAll('_', '-')}`;
					}

					const abbreviationToFull = {
						a_n: 'a-negative',
						a_p: 'a-positive',
						ab_n: 'ab-negative',
						ab_p: 'ab-positive',
						b_n: 'b-negative',
						b_p: 'b-positive',
						o_n: 'o-negative',
						o_p: 'o-positive',
						rh_n: 'rh-negative',
						rh_p: 'rh-positive',
					};

					// Replace blood group abbreviations with full names using an array
					const abbr = Object.keys(abbreviationToFull).find((abbreviation) => {
						return fileName.endsWith(abbreviation);
					});

					if (abbr === undefined) {
						return `he-outline-${fileName.replaceAll('_', '-')}`;
					}

					const full = abbreviationToFull[abbr];
					const newFileName = fileName.replace(abbr, full).replaceAll('_', '-');

					return `he-outline-${newFileName}`;
				},
			},
			{
				path: path.resolve(currentDirectoryPath, '../packages/healthicons/public/icons/svg/filled/**/*.svg'),
				formatter: (fileName, filePath) => {
					const folderName = path.basename(path.dirname(filePath));

					if (folderName !== 'blood') {
						return `he-filled-${fileName.replaceAll('_', '-')}`;
					}

					const abbreviationToFull = {
						a_n: 'a-negative',
						a_p: 'a-positive',
						ab_n: 'ab-negative',
						ab_p: 'ab-positive',
						b_n: 'b-negative',
						b_p: 'b-positive',
						o_n: 'o-negative',
						o_p: 'o-positive',
						rh_n: 'rh-negative',
						rh_p: 'rh-positive',
					};

					// Replace blood group abbreviations with full names using an array
					const abbr = Object.keys(abbreviationToFull).find((abbreviation) => {
						return fileName.endsWith(abbreviation);
					});

					if (abbr === undefined) {
						return `he-filled-${fileName.replaceAll('_', '-')}`;
					}

					const full = abbreviationToFull[abbr];
					const newFileName = fileName.replace(abbr, full).replaceAll('_', '-');

					return `he-filled-${newFileName}`;
				},
				attributes: {
					fill: 'currentColor',
				},
			},
		],
	},
	{
		group: 'hi',
		name: 'Hero',
		license: 'MIT',
		url: 'https://heroicons.com/',
		repo: 'https://github.com/tailwindlabs/heroicons',
		icons: [
			{
				path: path.resolve(currentDirectoryPath, '../packages/hero/src/24/outline/*.svg'),
				formatter: (name) => {
					return `hi-${name}`;
				},
			},
			{
				path: path.resolve(currentDirectoryPath, '../packages/hero/src/24/solid/*.svg'),
				formatter: (name) => {
					return `hi-solid-${name}`;
				},
			},
		],
	},
	{
		group: 'hu',
		name: 'Humble Icons',
		license: 'MIT',
		url: 'https://humbleicons.com/',
		repo: 'https://github.com/zraly/humbleicons',
		icons: [
			{
				path: path.resolve(currentDirectoryPath, '../packages/humble/icons/*.svg'),
				formatter: (fileName) => {
					return `hu-${fileName.replaceAll('_', '-')}`;
				},
				attributes: {
					fill: 'currentColor',
				},
			},
		],
	},
	{
		group: 'ic',
		name: 'Iconoir',
		license: 'MIT',
		repo: 'https://github.com/iconoir-icons/iconoir',
		url: 'https://iconoir.com/',
		icons: [
			{
				path: path.resolve(currentDirectoryPath, '../packages/iconoir/icons/regular/*.svg'),
				formatter: (fileName) => {
					return `ic-${fileName}`;
				},
			},
			{
				path: path.resolve(currentDirectoryPath, '../packages/iconoir/icons/solid/*.svg'),
				formatter: (fileName) => {
					return `ic-solid-${fileName}`;
				},
				attributes: {
					fill: 'currentColor',
				},
			},
		],
	},
	{
		group: 'io',
		name: 'IonIcons',
		repo: 'https://github.com/ionic-team/ionicons',
		url: 'https://ionic.io/ionicons',
		license: 'MIT',
		icons: [
			{
				path: path.resolve(currentDirectoryPath, '../packages/ionicons/src/svg/*-sharp.svg'),
				formatter: (name) => {
					return `io-sharp-${name.replace('-sharp', '')}`;
				},
				attributes: {
					fill: 'currentColor',
				},
			},
			{
				path: path.resolve(currentDirectoryPath, '../packages/ionicons/src/svg/*-outline.svg'),
				formatter: (name) => {
					return `io-outline-${name.replace('-outline', '')}`;
				},
				attributes: {
					fill: 'currentColor',
				},
			},
			{
				path: path.resolve(currentDirectoryPath, '../packages/ionicons/src/svg/!(*-outline|*-sharp).svg'),
				formatter: (name) => {
					return `io-${name}`;
				},
				attributes: {
					fill: 'currentColor',
				},
			},
		],
	},
	{
		group: 'la',
		name: 'Line Awesome',
		license: 'MIT',
		url: 'https://icons8.com/line-awesome',
		repo: 'https://github.com/icons8/line-awesome',
		icons: [
			{
				path: path.resolve(currentDirectoryPath, '../packages/line-awesome/svg/*.svg'),
				formatter: (name) => {
					return `la-${name}`;
				},
				attributes: {
					fill: 'currentColor',
				},
			},
		],
	},
	{
		group: 'li',
		name: 'Linearicons',
		license: 'CC BY-SA 4.0',
		version: '-',
		url: 'https://linearicons.com/free',
		repo: 'https://github.com/cjpatoilo/linearicons',
		icons: [
			{
				path: path.resolve(currentDirectoryPath, '../packages/linearicons/dist/svg/*.svg'),
				formatter: (fileName) => { return `li-${fileName}`; },
				attributes: {
					fill: 'currentColor',
				},
			},
		],
	},
	{
		group: 'lu',
		name: 'Lucide',
		license: 'ISC',
		url: 'https://lucide.dev/',
		repo: 'https://github.com/lucide-icons/lucide',
		icons: [
			{
				path: path.resolve(currentDirectoryPath, '../packages/lucide/icons/*.svg'),
				formatter: (fileName) => {
					return `lu-${fileName}`;
				},
				attributes: {
					fill: 'currentColor',
				},
			},
		],
	},
	{
		group: 'mi',
		name: 'Majesticons',
		license: 'MIT',
		url: 'https://www.majesticons.com/',
		repo: 'https://github.com/halfmage/majesticons',
		icons: [
			{
				path: path.resolve(currentDirectoryPath, '../packages/majesticons/line/*.svg'),
				formatter: (fileName) => { return `mi-${fileName.replace('-line', '')}`; },
			},
			{
				path: path.resolve(currentDirectoryPath, '../packages/majesticons/solid/*.svg'),
				formatter: (fileName) => { return `mi-solid-${fileName}`; },
			},
		],
	},
	{
		group: 'ma',
		name: 'Maki',
		license: 'CC0 1.0 Universal',
		url: 'https://labs.mapbox.com/maki-icons',
		repo: 'https://github.com/mapbox/maki',
		icons: [
			{
				path: path.resolve(currentDirectoryPath, '../packages/maki-icons/icons/*.svg'),
				formatter: (fileName) => { return `ma-${fileName}`; },
				attributes: {
					fill: 'currentColor',
				},
			},
		],
	},
	{
		group: 'md',
		name: 'Material Design',
		license: 'Apache-2.0',
		url: 'https://fonts.google.com/icons',
		repo: 'https://github.com/google/material-design-icons',
		icons: [
			{
				path: path.resolve(currentDirectoryPath, '../packages/material-design-icons/src/**/*.svg'),
				formatter: (fileName, filePath) => {
					// File path consists of {name}/materialicons{type}/{size}px.svg
					const folderName = path.basename(path.dirname(filePath));
					let iconType = folderName.replace('materialicons', '');
					const iconName = path.basename(path.join(filePath, '..', '..'));

					/* Previous versions did not use google material design icon types
					* but rather a git repo where twotone icons where named as two-tone
					* So we need to convert twotone to two-tone to make backward compatible
					*/
					if (iconType === 'twotone') {
						iconType = 'two-tone';
					}

					const finalFileName = iconType === '' ? `md-${iconName}` : `md-${iconType}-${iconName}`;

					return finalFileName;
				},
				attributes: {
					fill: 'currentColor',
				},

				/* eslint complexity:[error, 9] */
				filesFilter: (filesList) => {
					// console.log('filesList:', filesList.slice(0, 10));
					// const newFilesList = filesList.slice(0, 500);

					/* Filter files list to get the highest resolution from each icon folder
					* Group files based on parent folder name
					* The result would be an object with the icon name and type as key, and
					* the value would be an array of file paths
					* {
					* 	'{icon-name}-{icon-type}': ['path/to/file-1.svg', 'path/to/file-2.svg']
					* } */
					const groupedFiles = {};
					for (const filePath of filesList) {
						const iconName = path.basename(path.join(filePath, '..', '..'));
						const iconType = path.basename(path.dirname(filePath)).replace('materialicons', '');

						const key = iconType === '' ? `${iconName}` : `${iconType}-${iconName}`;
						if (!groupedFiles[key]) {
							groupedFiles[key] = [];
						}

						groupedFiles[key].push(filePath);
					};

					// Sizes to look for in the file name
					const sizes = ['24', '20'];

					const finalFilesList = [];

					// Loop through each group and return the file with the highest resolution
					for (const groupName of Object.keys(groupedFiles)) {
						let files = groupedFiles[groupName];

						let sizeFound = 0;

						// Sort files in reverse alphabetically so
						// that the highest resolution is first
						files = files.sort((a, b) => {
							return b.localeCompare(a);
						});

						// Find the highest resolution inside the group
						for (const size of sizes) {
							const file = files.find((file) => {
								return file.includes(size);
							});
							if (file) {
								sizeFound = size;
								break;
							}
						}

						// Get the file with the highest resolution
						for (const filePath of files) {
							const fileName = path.basename(filePath);
							if (!fileName.includes(sizeFound)) {
								continue;
							}
							finalFilesList.push(filePath);
						}
					};

					return finalFilesList;
				},
			},
		],
	},
	{
		group: 'mc',
		name: 'MingCute',
		license: 'Apache-2.0',
		repo: 'https://github.com/Richard9394/MingCute',
		url: 'https://www.mingcute.com/',
		icons: [
			{
				path: path.resolve(currentDirectoryPath, '../packages/mingcute/svg/**/*.svg'),
				formatter: (fileName) => { return `mc-${fileName.replaceAll('_', '-')}`; },
			},
		],
	},
	{
		group: 'oc',
		name: 'Octicons',
		license: 'MIT',
		repo: 'https://github.com/primer/octicons',
		url: 'https://github.com/primer/octicons',
		icons: [
			{
				path: path.resolve(currentDirectoryPath, '../packages/octicons/icons/*-24.svg'),
				formatter: (name) => {
					return `oc-${name.replace('-24', '')}`;
				},
				attributes: {
					fill: 'currentColor',
				},
			},
		],
	},
	{
		group: 'ow',
		name: 'OpenWeb',
		license: 'SIL Open Font License',
		url: 'https://pfefferle.dev/openwebicons/',
		repo: 'https://github.com/pfefferle/openwebicons',
		icons: [
			{
				path: path.resolve(currentDirectoryPath, '../packages/openwebicons/svg/*.svg'),
				formatter: (fileName) => { return `ow-${fileName}`; },
			},
		],
	},
	{
		group: 'ph',
		name: 'Phosphor',
		license: 'MIT',
		url: 'https://phosphoricons.com/',
		repo: 'https://github.com/phosphor-icons/phosphor-icons',
		icons: [
			{
				path: path.resolve(currentDirectoryPath, '../packages/phosphor/assets/regular/*.svg'),
				formatter: (fileName) => { return `ph-${fileName}`; },
				attributes: {
					fill: 'currentColor',
				},
			},
			{
				path: path.resolve(currentDirectoryPath, '../packages/phosphor/assets/bold/*.svg'),
				formatter: (fileName) => { return `ph-bold-${fileName.replace('-bold', '')}`; },
				attributes: {
					fill: 'currentColor',
				},
			},
			{
				path: path.resolve(currentDirectoryPath, '../packages/phosphor/assets/duotone/*.svg'),
				formatter: (fileName) => { return `ph-duotone-${fileName.replace('-duotone', '')}`; },
				attributes: {
					fill: 'currentColor',
				},
			},
			{
				path: path.resolve(currentDirectoryPath, '../packages/phosphor/assets/fill/*.svg'),
				formatter: (fileName) => { return `ph-fill-${fileName.replace('-fill', '')}`; },
				attributes: {
					fill: 'currentColor',
				},
			},
			{
				path: path.resolve(currentDirectoryPath, '../packages/phosphor/assets/light/*.svg'),
				formatter: (fileName) => { return `ph-light-${fileName.replace('-light', '')}`; },
				attributes: {
					fill: 'currentColor',
				},
			},
			{
				path: path.resolve(currentDirectoryPath, '../packages/phosphor/assets/thin/*.svg'),
				formatter: (fileName) => { return `ph-thin-${fileName.replace('-thin', '')}`; },
				attributes: {
					fill: 'currentColor',
				},
			},
		],
	},
	{
		group: 'px',
		name: 'Pixelarticons',
		license: 'MIT',
		url: 'https://pixelarticons.com/',
		repo: 'https://github.com/halfmage/pixelarticons',
		icons: [
			{
				path: path.resolve(currentDirectoryPath, '../packages/pixelarticons/svg/*.svg'),
				formatter: (fileName) => { return `px-${fileName}`; },
			},
		],
	},
	{
		group: 'pr',
		name: 'Prime Icons',
		license: 'MIT',
		url: 'https://github.com/primefaces/primeicons',
		repo: 'https://github.com/primefaces/primeicons',
		icons: [
			{
				path: path.resolve(currentDirectoryPath, '../packages/primeicons/raw-svg/*.svg'),
				formatter: (fileName) => { return `pr-${fileName}`; },
				attributes: {
					fill: 'currentColor',
				},
			},
		],
	},
	{
		group: 'qu',
		name: 'Quill',
		version: '1.0.0',
		license: 'MIT',
		url: 'https://www.figma.com/community/file/1034432054377533052/Quill-Iconset',
		repo: 'https://github.com/yourtempo/tempo-quill-icons',
		icons: [
			{
				path: path.resolve(currentDirectoryPath, '../packages/quill/icons/*.svg'),
				formatter: (fileName) => {
					const cleanFileName = fileName.replaceAll(' ', '-');
					return `qu-${cleanFileName.replaceAll('_', '-')}`;
				},
				attributes: {
					fill: 'currentColor',
				},
			},
		],
	},
	{
		group: 'ra',
		name: 'Radix',
		license: 'MIT',
		version: '1.3.0',
		url: 'https://icons.radix-ui.com/',
		repo: 'https://github.com/radix-ui/icons',
		icons: [
			{
				path: path.resolve(currentDirectoryPath, '../packages/radix-ui/packages/radix-icons/icons/*.svg'),
				formatter: (fileName) => {
					return `ra-${fileName.replaceAll('_', '-')}`;
				},
				attributes: {
					fill: 'currentColor',
				},
			},
		],
	},
	{
		group: 're',
		name: 'Remix',
		license: 'Apache 2.0',
		url: 'https://remixicon.com/',
		repo: 'https://github.com/Remix-Design/RemixIcon',
		icons: [
			{
				path: path.resolve(currentDirectoryPath, '../packages/remix/icons/**/*.svg'),
				formatter: (name) => {
					return `re-${name}`;
				},
				attributes: {
					fill: 'currentColor',
				},
			},
		],
	},
	{
		group: 'si',
		name: 'Simple Icons',
		license: 'CC0 1.0',
		url: 'https://simpleicons.org/',
		repo: 'https://github.com/simple-icons/simple-icons',
		icons: [
			{
				path: path.resolve(currentDirectoryPath, '../packages/simple-icons/icons/*.svg'),
				formatter: (fileName) => { return `si-${fileName}`; },
				attributes: {
					fill: 'currentColor',
				},
			},
		],
	},
	{
		group: 'su',
		name: 'System UIcons',
		license: 'Unlicense',
		version: '-',
		url: 'https://www.systemuicons.com/',
		repo: 'https://github.com/CoreyGinnivan/system-uicons',
		icons: [
			{
				path: path.resolve(currentDirectoryPath, '../packages/system-uicons/src/images/icons/*.svg'),
				formatter: (fileName) => {
					return `su-${fileName.replaceAll('_', '-')}`;
				},
				attributes: {
					fill: 'currentColor',
				},
			},
		],
	},
	{
		group: 'ta',
		name: 'Tabler',
		license: 'MIT',
		url: 'https://tabler-icons.io/',
		repo: 'https://github.com/tabler/tabler-icons',
		icons: [
			{
				path: path.resolve(currentDirectoryPath, '../packages/tabler/icons/filled/*.svg'),
				formatter: (fileName) => { return `ta-filled-${fileName}`; },
				attributes: {
					fill: 'currentColor',
				},
			},
			{
				path: path.resolve(currentDirectoryPath, '../packages/tabler/icons/outline/*.svg'),
				formatter: (fileName) => { return `ta-outline-${fileName}`; },
				attributes: {
					fill: 'currentColor',
				},
			},
		],
	},
	{
		group: 'th',
		name: 'Themify',
		license: 'SIL Open Font License (OFL)',
		version: '1.0.1',
		url: 'https://themify.me/themify-icons',
		repo: 'https://github.com/kalimah-apps/Themify-Icons',
		icons: [
			{
				path: path.resolve(currentDirectoryPath, '../packages/themify/svg/*.svg'),
				formatter: (name) => {
					return `th-${name}`;
				},
				attributes: {
					fill: 'currentColor',
				},
			},
		],
	},
	{
		group: 'ti',
		name: 'Typicons',
		license: 'CC BY-SA 4.0',
		repo: 'https://github.com/stephenhutchings/typicons.font',
		url: 'https://www.s-ings.com/typicons/',
		icons: [
			{
				path: path.resolve(currentDirectoryPath, '../packages/typicons/src/svg/*-outline.svg'),
				formatter: (name) => {
					return `ti-outline-${name.replace('-outline', '')}`;
				},
				attributes: {
					fill: 'currentColor',
				},
			},
			{
				path: path.resolve(currentDirectoryPath, '../packages/typicons/src/svg/!(*-outline).svg'),
				formatter: (name) => {
					return `ti-${name}`;
				},
				attributes: {
					fill: 'currentColor',
				},
			},
		],
	},
	{
		group: 'un',
		name: 'Unicons',
		license: 'IconScout Simple License',
		url: 'https://iconscout.com/unicons/explore/line',
		repo: 'https://github.com/Iconscout/unicons',
		icons: [
			{
				path: path.resolve(currentDirectoryPath, '../packages/unicons/svg/line/*.svg'),
				formatter: (fileName) => { return `un-${fileName}`; },
				attributes: {
					fill: 'currentColor',
				},
			},
		],
	},
	{
		group: 'ui',
		name: 'uiw icons',
		license: 'MIT',
		url: 'https://uiwjs.github.io/icons/',
		repo: 'https://github.com/uiwjs/icons',
		icons: [
			{
				path: path.resolve(currentDirectoryPath, '../packages/uiw-icons/icon/*.svg'),
				formatter: (fileName) => { return `ui-${fileName}`; },
			},
		],
	},
	{
		group: 'vs',
		name: 'VSCode',
		license: 'MIT',
		url: 'https://marketplace.visualstudio.com/items?itemName=vscode-icons-team.vscode-icons',
		repo: 'https://github.com/vscode-icons/vscode-icons',
		icons: [
			{
				path: path.resolve(currentDirectoryPath, '../packages/vscode/icons/*.svg'),
				formatter: (name) => {
					return `vs-${name}`;
				},
				attributes: {
					multicolor: true,
				},
			},
		],
	},
	{
		group: 'wi',
		name: 'Weather Icons',
		license: 'SIL OFL 1.1',
		url: 'https://erikflowers.github.io/weather-icons/',
		repo: 'https://github.com/erikflowers/weather-icons',
		icons: [
			{
				path: path.resolve(currentDirectoryPath, '../packages/weather-icons/svg/*.svg'),
				attributes: {
					fill: 'currentColor',
				},
			},
		],
	},
];
