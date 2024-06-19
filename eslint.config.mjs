import eslintConfig from '@kalimahapps/eslint-config';
export default [
	{
		ignores: ['packages', 'icons', 'csv'],
	},
	...eslintConfig,
];