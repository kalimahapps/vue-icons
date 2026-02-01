import content from '@kalimahapps/vue-icons/content';

const iconsInitials = content.map((item) => {
	return item.group.charAt(0).toUpperCase() + item.group.slice(1);
});

export default {
	type: 'component',
	resolve: (componentName) => {
		if (componentName === undefined) {
			return componentName;
		}

		const iconComponent = iconsInitials.find((initial) => {
			return initial.startsWith(componentName.slice(0, 2));
		});

		if (iconComponent === undefined) {
			return;
		}

		// Letter after initial is capitalized, check for it to prevent false positives
		const thirdChar = componentName.charAt(2);
		const isComponent = thirdChar.toUpperCase() === thirdChar;

		if (isComponent === false) {
			return;
		}

		// Component is an vue-icons component
		return {
			name: componentName,
			from: '@kalimahapps/vue-icons',
		};
	},
};