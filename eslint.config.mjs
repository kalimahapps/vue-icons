import eslintConfig from '@kalimahapps/eslint-config';
export default [
	{
		ignores: ['packages', 'icons', 'csv'],
	},
	...eslintConfig,
	{
		rules: {
			// This rule is causing an error:
			// `Cannot read properties of undefined (reading 'decoration')` error
			// Disable it until it's fixed
			'unicorn/expiring-todo-comments': 'off',

			// this rule is causing an error:
			// Cannot read properties of undefined (reading 'allowRegexCharacters')
			'jsonc/no-useless-escape': 'off',
		},
	},
];