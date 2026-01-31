import iconsListKebabCase from '@kalimahapps/vue-icons/icons-list-kebab-case' with { type: 'json' };
import iconsListPascalCase from '@kalimahapps/vue-icons/icons-list-pascal-case' with { type: 'json' };

const ICONS_PACKAGE_IMPORT_PATH = '@kalimahapps/vue-icons';
const PASCAL_ICON_REGEX = /^[A-Z][a-z][A-Z]/u;

const isPascalIconName = function(name: string): boolean {
	if (!PASCAL_ICON_REGEX.test(name)) {
		return false;
	}

	return iconsListPascalCase.includes(name);
};

const isKebabIconName = function(name: string): boolean {
	return iconsListKebabCase.includes(name);
};

const isIconName = function(name: string): boolean {
	return isPascalIconName(name) || isKebabIconName(name);
};

export {
	ICONS_PACKAGE_IMPORT_PATH,
	isIconName
};