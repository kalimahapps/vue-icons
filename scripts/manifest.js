/* eslint-disable max-lines */
const path = require('node:path');

module.exports = [
	{
		group: 'ai',
		name: 'Academicons',
		license: 'SIL OFL 1.1',
		url: 'https://jpswalsh.github.io/academicons/',
		repo: 'https://github.com/jpswalsh/academicons',
		icons: [
			{
				path: path.resolve(__dirname, '../packages/academicons/svg/*.svg'),
				formatter: (fileName) => { return `ai-${fileName}`; },
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
				path: path.resolve(__dirname, '../packages/ant-design/packages/icons-svg/svg/filled/*.svg'),
				formatter: (fileName) => { return `an-filled-${fileName}`; },
				attributes: {
					fill: 'currentColor',
				},
			},
			{
				path: path.resolve(__dirname, '../packages/ant-design/packages/icons-svg/svg/outlined/*.svg'),
				formatter: (fileName) => { return `an-outlined-${fileName}`; },
				attributes: {
					fill: 'currentColor',
				},
			},
			{
				path: path.resolve(__dirname, '../packages/ant-design/packages/icons-svg/svg/twotone/*.svg'),
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
				path: path.resolve(__dirname, '../packages/bootstrap-icons/icons/*.svg'),
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
				path: path.resolve(__dirname, '../packages/boxicons/svg/logos/*.svg'),
				formatter: (fileName) => { return `bx-${fileName.replace('bxl-', '')}`; },
				attributes: {
					fill: 'currentColor',
				},
			},
			{
				path: path.resolve(__dirname, '../packages/boxicons/svg/regular/*.svg'),
				formatter: (fileName) => { return `bx-${fileName.replace('bx-', '')}`; },
				attributes: {
					fill: 'currentColor',
				},
			},
			{
				path: path.resolve(__dirname, '../packages/boxicons/svg/solid/*.svg'),
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
				path: path.resolve(__dirname, '../packages/carbon/packages/icons/src/svg/32/*.svg'),
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
		group: 'by',
		name: 'Bytesize',
		license: 'MIT',
		url: 'https://danklammer.com/bytesize-icons/',
		repo: 'https://github.com/danklammer/bytesize-icons',
		icons: [
			{
				path: path.resolve(__dirname, '../packages/bytesize/dist/icons/*.svg'),
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
				path: path.resolve(__dirname, '../packages/circum/svg/*.svg'),
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
				path: path.resolve(__dirname, '../packages/codicons/src/icons/*.svg'),
				formatter: (fileName) => { return `co-${fileName}`; },
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
				path: path.resolve(__dirname, '../packages/coreui/svg/brand/*.svg'),
				formatter: (fileName) => { return `co-brand-${fileName.replace('cib-', '')}`; },
				attributes: {
					fill: 'currentColor',
				},
			},
			{
				path: path.resolve(__dirname, '../packages/coreui/svg/flag/*.svg'),
				formatter: (fileName) => { return `co-flag-${fileName.replace('cif-', '')}`; },
				attributes: {
					multicolor: true,
				},
			},
			{
				path: path.resolve(__dirname, '../packages/coreui/svg/free/*.svg'),
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
				path: path.resolve(__dirname, '../packages/css-gg/icons/svg/*.svg'),
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
				path: path.resolve(__dirname, '../packages/devicons/icons/**/*.svg'),
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
		version: '1.1.186',
		repo: 'https://github.com/microsoft/fluentui-system-icons',
		url: 'https://github.com/microsoft/fluentui-system-icons',
		icons: [
			{
				path: path.resolve(__dirname, '../packages/fluentui-system/assets/*/SVG/*.svg'),
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
							files.forEach((filePath) => {
								const fileName = path.basename(filePath);
								if (!fileName.includes(`_${sizeFound}_`)) {
									return;
								}
								accumulator.push(filePath);
							});
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
				path: path.resolve(__dirname, '../packages/font-awesome/svgs/regular/*.svg'),
				formatter: (name) => { return `fa-reg-${name}`; },
				attributes: {
					fill: 'currentColor',
				},
			},
			{
				path: path.resolve(__dirname, '../packages/font-awesome/svgs/brands/*.svg'),
				formatter: (name) => { return `fa-bands-${name}`; },
				attributes: {
					fill: 'currentColor',
				},
			},
			{
				path: path.resolve(__dirname, '../packages/font-awesome/svgs/solid/*.svg'),
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
				path: path.resolve(__dirname, '../packages/feather/icons/*.svg'),
				formatter: (name) => {
					return `fe-${name}`;
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
				path: path.resolve(__dirname, '../packages/govicons/raw-svg/*.svg'),
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
				path: path.resolve(__dirname, '../packages/healthicons/public/icons/svg/outline/**/*.svg'),
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
				path: path.resolve(__dirname, '../packages/healthicons/public/icons/svg/filled/**/*.svg'),
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
				path: path.resolve(__dirname, '../packages/hero/src/24/outline/*.svg'),
				formatter: (name) => {
					return `hi-${name}`;
				},
			},
			{
				path: path.resolve(__dirname, '../packages/hero/src/24/solid/*.svg'),
				formatter: (name) => {
					return `hi-solid-${name}`;
				},
			},
		],
	},
	{
		group: 'ja',
		name: 'Jamicons',
		license: 'MIT',
		url: 'https://jam-icons.com/',
		repo: 'https://github.com/michaelampr/jam',
		icons: [
			{
				path: path.resolve(__dirname, '../packages/jamicons/icons/*-f.svg'),
				formatter: (fileName) => { return `ja-fill-${fileName.replace('-f', '')}`; },
				attributes: {
					fill: 'currentColor',
				},
			},
			{
				path: path.resolve(__dirname, '../packages/jamicons/icons/!(*-f).svg'),
				formatter: (fileName) => { return `ja-${fileName}`; },
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
				path: path.resolve(__dirname, '../packages/iconoir/icons/*.svg'),
				formatter: (fileName) => { return `ic-${fileName}`; },
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
				path: path.resolve(__dirname, '../packages/ionicons/src/svg/*-sharp.svg'),
				formatter: (name) => {
					return `io-sharp-${name.replace('-sharp', '')}`;
				},
				attributes: {
					fill: 'currentColor',
				},
			},
			{
				path: path.resolve(__dirname, '../packages/ionicons/src/svg/*-outline.svg'),
				formatter: (name) => {
					return `io-outline-${name.replace('-outline', '')}`;
				},
				attributes: {
					fill: 'currentColor',
				},
			},
			{
				path: path.resolve(__dirname, '../packages/ionicons/src/svg/!(*-outline|*-sharp).svg'),
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
				path: path.resolve(__dirname, '../packages/line-awesome/svg/*.svg'),
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
				path: path.resolve(__dirname, '../packages/linearicons/dist/svg/*.svg'),
				formatter: (fileName) => { return `li-${fileName}`; },
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
				path: path.resolve(__dirname, '../packages/majesticons/line/*.svg'),
				formatter: (fileName) => { return `mi-${fileName.replace('-line', '')}`; },
			},
			{
				path: path.resolve(__dirname, '../packages/majesticons/solid/*.svg'),
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
				path: path.resolve(__dirname, '../packages/maki-icons/icons/*.svg'),
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
				path: path.resolve(__dirname, '../packages/material-design/src/**/**/24px.svg'),
				formatter: (fileName, filePath) => {
					// Get two levels up from the file path using node
					const twoLevelsUp = path.basename(path.join(filePath, '..', '..'));
					const iconTypeFolder = path.basename(path.dirname(filePath));

					// Replace underscore to dash
					const iconName = twoLevelsUp.replaceAll('_', '-');
					const iconType = iconTypeFolder.replace('materialicons', '');

					if (iconType.length === 0) {
						return `md-${iconName}`;
					}
					return `md-${iconType}-${iconName}`;
				},
				attributes: {
					fill: 'currentColor',
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
				path: path.resolve(__dirname, '../packages/mingcute/svg/**/*.svg'),
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
				path: path.resolve(__dirname, '../packages/octicons/icons/*-24.svg'),
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
				path: path.resolve(__dirname, '../packages/openwebicons/svg/*.svg'),
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
				path: path.resolve(__dirname, '../packages/phosphor/assets/regular/*.svg'),
				formatter: (fileName) => { return `ph-${fileName}`; },
				attributes: {
					fill: 'currentColor',
				},
			},
			{
				path: path.resolve(__dirname, '../packages/phosphor/assets/bold/*.svg'),
				formatter: (fileName) => { return `ph-bold-${fileName.replace('-bold', '')}`; },
				attributes: {
					fill: 'currentColor',
				},
			},
			{
				path: path.resolve(__dirname, '../packages/phosphor/assets/duotone/*.svg'),
				formatter: (fileName) => { return `ph-duotone-${fileName.replace('-duotone', '')}`; },
				attributes: {
					fill: 'currentColor',
				},
			},
			{
				path: path.resolve(__dirname, '../packages/phosphor/assets/fill/*.svg'),
				formatter: (fileName) => { return `ph-fill-${fileName.replace('-fill', '')}`; },
				attributes: {
					fill: 'currentColor',
				},
			},
			{
				path: path.resolve(__dirname, '../packages/phosphor/assets/light/*.svg'),
				formatter: (fileName) => { return `ph-light-${fileName.replace('-light', '')}`; },
				attributes: {
					fill: 'currentColor',
				},
			},
			{
				path: path.resolve(__dirname, '../packages/phosphor/assets/thin/*.svg'),
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
				path: path.resolve(__dirname, '../packages/pixelarticons/svg/*.svg'),
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
				path: path.resolve(__dirname, '../packages/primeicons/raw-svg/*.svg'),
				formatter: (fileName) => { return `pr-${fileName}`; },
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
				path: path.resolve(__dirname, '../packages/remix/icons/**/*.svg'),
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
				path: path.resolve(__dirname, '../packages/simple-icons/icons/*.svg'),
				formatter: (fileName) => { return `si-${fileName}`; },
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
				path: path.resolve(__dirname, '../packages/tabler/icons/*.svg'),
				formatter: (fileName) => {
					return `ta-${fileName}`;
				},
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
				path: path.resolve(__dirname, '../packages/themify/svg/*.svg'),
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
				path: path.resolve(__dirname, '../packages/typicons/src/svg/*-outline.svg'),
				formatter: (name) => {
					return `ti-outline-${name.replace('-outline', '')}`;
				},
				attributes: {
					fill: 'currentColor',
				},
			},
			{
				path: path.resolve(__dirname, '../packages/typicons/src/svg/!(*-outline).svg'),
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
				path: path.resolve(__dirname, '../packages/unicons/svg/line/*.svg'),
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
				path: path.resolve(__dirname, '../packages/uiw-icons/icon/*.svg'),
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
				path: path.resolve(__dirname, '../packages/vscode/icons/*.svg'),
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
				path: path.resolve(__dirname, '../packages/weather-icons/svg/*.svg'),
				attributes: {
					fill: 'currentColor',
				},
			},
		],
	},
];
