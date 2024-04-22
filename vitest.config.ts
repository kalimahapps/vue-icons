import { configDefaults, defineConfig } from 'vitest/config';

const updatedConfig = defineConfig({
	root: './test',
	test: {
		exclude: [
			...configDefaults.exclude,
			'packages',
		],
	},
});

export default updatedConfig;