const path = require('path');

module.exports = [
	{
		group: 'bs',
		name: 'Bootstrap Icons',
		license: 'MIT',
		url: 'https://icons.getbootstrap.com/',
		repo: 'https://github.com/twbs/icons',
		icons: [
			{
				path: path.resolve(__dirname, '../packages/bootstrap-icons/icons/*.svg'),
				formatter: name => {
					return `bs-${name}`;
				}
			}
		]
	},
	{
		group: 'fa',
		name: 'Font Awesome',
		url: 'https://fontawesome.com/',
		repo: 'https://github.com/FortAwesome/Font-Awesome',
		license: 'CC BY 4.0 License',
		icons: [
			{
				path: path.resolve(__dirname, '../packages/font-awesome/svgs/regular/*.svg'),
				formatter: name => `fa-reg-${name}`,
				attributes: {
					fill: 'currentColor'
				}
			},
			{
				path: path.resolve(__dirname, '../packages/font-awesome/svgs/brands/*.svg'),
				formatter: name => `fa-bands-${name}`,
				attributes: {
					fill: 'currentColor'
				}
			},
			{
				path: path.resolve(__dirname, '../packages/font-awesome/svgs/solid/*.svg'),
				formatter: name => `fa-${name}`,
				attributes: {
					fill: 'currentColor'
				}
			}
		]
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
				formatter: name => {
					return `fe-${name}`;
				}
			}
		]
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
				formatter: name => {
					return `hi-${name}`;
				}
			},
			{
				path: path.resolve(__dirname, '../packages/hero/src/24/solid/*.svg'),
				formatter: name => {
					return `hi-solid-${name}`;
				}
			}
		]
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
				formatter: name => {
					return 'io-sharp-' + name.replace('-sharp', '');
				},
				attributes: {
					fill: 'currentColor'
				}
			},
			{
				path: path.resolve(__dirname, '../packages/ionicons/src/svg/*-outline.svg'),
				formatter: name => {
					return 'io-outline-' + name.replace('-outline', '');
				},
				attributes: {
					fill: 'currentColor'
				}
			},
			{
				path: path.resolve(__dirname, '../packages/ionicons/src/svg/!(*-outline|*-sharp).svg'),
				formatter: name => {
					return `io-${name}`;
				},
				attributes: {
					fill: 'currentColor'
				}
			}
		]
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
				formatter: name => {
					return `la-${name}`;
				},
				attributes: {
					fill: 'currentColor'
				}
			}
		]
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
				formatter: name => {
					return `oc-${name.replace('-24', '')}`;
				},
				attributes: {
					fill: 'currentColor'
				}
			}
		]
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
				formatter: name => {
					return `re-${name}`;
				},
				attributes: {
					fill: 'currentColor'
				}
			}
		]
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
				formatter: name => {
					return `th-${name}`;
				},
				attributes: {
					fill: 'currentColor'
				}
			}
		]
	},
	{
		group: 'ti',
		name: 'Typeicons',
		license: 'CC BY-SA 4.0',
		repo: 'https://github.com/stephenhutchings/typicons.font',
		url: 'https://www.s-ings.com/typicons/',
		icons: [
			{
				path: path.resolve(__dirname, '../packages/typicons/src/svg/*-outline.svg'),
				formatter: name => {
					return `ti-outline-${name.replace('-outline', '')}`;
				},
				attributes: {
					fill: 'currentColor'
				}
			},
			{
				path: path.resolve(__dirname, '../packages/typicons/src/svg/!(*-outline).svg'),
				formatter: name => {
					return `ti-${name}`;
				},
				attributes: {
					fill: 'currentColor'
				}
			}
		]
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
				formatter: name => {
					return `vs-${name}`;
				},
				attributes: {
					multicolor: true
				}
			}
		]
	}
];
