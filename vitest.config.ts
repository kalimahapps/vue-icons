import { configDefaults, defineConfig } from 'vitest/config';

const updatedConfig = defineConfig({
	test: {
		exclude: [
			...configDefaults.exclude,
			'packages',
		],
		dir: 'test',
	},
});

export default updatedConfig;