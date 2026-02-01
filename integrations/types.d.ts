// These types are provided to silence TypeScript errors
declare module '@kalimahapps/vue-icons/icons-list-kebab-case' {
	const value: unknown[];
	export default value;
}

declare module '@kalimahapps/vue-icons/icons-list-pascal-case' {
	const value: string[];
	export default value;
}

declare module '@kalimahapps/vue-icons/vite' {
	import type { Plugin } from 'vite';
	const vitePluginVueIcons: () => Plugin;
	export default vitePluginVueIcons;
}
