import iconsList from '@kalimahapps/vue-icons/icons-list' with { type: 'json' };
import content from '@kalimahapps/vue-icons/content' with { type: 'json' };

const ICONS_PACKAGE_IMPORT_PATH = '@kalimahapps/vue-icons';
const PASCAL_ICON_REGEX = /^[A-Z][a-z][A-Z]/u;

const iconsPrefixes = new Set(content.map((item) => {
	return item.prefix;
}));

const isPascalIconName = function(name: string): boolean {
	if (!PASCAL_ICON_REGEX.test(name)) {
		return false;
	}

	const prefix = name.slice(0, 2).toLowerCase();
	return iconsPrefixes.has(prefix);
};

const isKebabIconName = function(name: string): boolean {
	return iconsList.includes(name);
};

const isIconName = function(name: string): boolean {
	return isPascalIconName(name) || isKebabIconName(name);
};

export {
	ICONS_PACKAGE_IMPORT_PATH,
	isIconName
};