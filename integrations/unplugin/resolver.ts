import iconsListPascalCase from '@kalimahapps/vue-icons/icons-list-pascal-case' with { type: 'json' };
import type { ComponentResolver } from 'unplugin-vue-components';

const resolver: ComponentResolver = {
	type: 'component',
	resolve: (componentName) => {
		if (componentName === undefined) {
			return componentName;
		}

		if (!iconsListPascalCase.includes(componentName)) {
			return;
		}

		return {
			name: componentName,
			from: '@kalimahapps/vue-icons',
		};
	},
};

export default resolver;