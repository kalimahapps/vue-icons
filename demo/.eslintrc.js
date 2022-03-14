module.exports = {
	root: true,
	env: {
		browser: true,
		node: true
	},
	parserOptions: {
		parser: '@typescript-eslint/parser',
		sourceType: 'module',
		tsconfigRootDir: __dirname
	},
	extends: [
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:vue/vue3-recommended',
		// 'plugin:vuejs-accessibility/recommended',
		'prettier'
	],
	plugins: ['@typescript-eslint', 'prettier-vue'],
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': ['error']
	},
	overrides: [
		{
			files: ['*.md'],
			parser: 'markdown-eslint-parser',
			extends: ['plugin:md/recommended', 'prettier']
		},
		{
			files: ['*.vue'],
			extends: [
				'plugin:@typescript-eslint/eslint-recommended',
				'plugin:vue/vue3-recommended',
				// 'plugin:vuejs-accessibility/recommended',
				'plugin:prettier-vue/recommended',
				'prettier'
			],
			rules: {
				'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
				'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
				'vue/script-setup-uses-vars': 'error',
				'vue/multi-word-component-names': 'off',
				'no-unused-vars': 'off',
				'@typescript-eslint/no-unused-vars': ['error'],

				'vuejs-accessibility/form-control-has-label': 'off',
				'vuejs-accessibility/label-has-for': 'off',
				'vuejs-accessibility/anchor-has-content': 'off',
				'vuejs-accessibility/*': 'off'
			}
		}
	]
};
