const manifest = require('../scripts/manifest.js');

const iconsInitials = manifest.map((item) => {
	return item.group.charAt(0).toUpperCase() + item.group.slice(1);
});

module.exports = {
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
			from: `@kalimahapps/vue-icons/${iconComponent.toLowerCase()}`,
		};
	},
};