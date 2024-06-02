import { configDefaults, defineConfig } from 'vitest/config';

const updatedConfig = defineConfig({
	root: './test',
	test: {
		environment: 'happy-dom',
		exclude: [
			...configDefaults.exclude,
			'packages',
		],
	},
});

export default updatedConfig;