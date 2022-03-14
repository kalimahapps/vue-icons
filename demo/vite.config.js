import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';

export default defineConfig({
	resolve: {
		alias: [
			{
				find: /^~.+/,
				replacement: val => {
					return val.replace(/^~/, '');
				}
			}
		]
	},
	base: '/vue-icons/',
	plugins: [vue(), svgLoader()]
});
