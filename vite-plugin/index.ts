/* eslint complexity: ["warn", 10] */
import type { Plugin } from 'vite';
import parseVueFiles from './parse-vue-files.js';
import parseTsFiles from './parse-ts-files.js';
const vitePluginVueIcons = function(): Plugin {
	return {
		name: 'vite-plugin-vue-icons',
		enforce: 'pre',
		transform(code, id) {
			if (id.endsWith('.vue')) {
				const magicString = parseVueFiles(code);
				return {
					code: magicString.toString(),
					map: magicString.generateMap({ hires: true }),
				};
			}

			if (id.endsWith('.ts') || id.endsWith('.js')) {
				const magicString = parseTsFiles(code);
				return {
					code: magicString.toString(),
					map: magicString.generateMap({ hires: true }),
				};
			}
		},
	};
};

export default vitePluginVueIcons;
