import { expect, test, describe } from 'vitest';
import * as ChangeCase from 'change-case';
import * as VueIcons from '@kalimahapps/vue-icons';
import iconsList from '../icons/icons-list.json' with { type: 'json' };

const { pascalCase, splitSeparateNumbers } = ChangeCase;

describe('Exports', () => {
	test('That icons are transformed to the correct pascal case', () => {
		const iconsListPascal = new Set(iconsList.map((icon) => {
			const name = icon.replace(':', '-');
			return pascalCase(name, {
				mergeAmbiguousCharacters: true,
				split: splitSeparateNumbers,
			});
		}));

		const iconKeys = Object.keys(VueIcons);
		const diff = iconKeys.filter((key) => {
			return !iconsListPascal.has(key);
		});

		expect(diff.length === 0, `The following icons are not in the VueIcons exports: ${diff.join(', ')}`).toBeTruthy();

		for (const iconName of iconsList) {
			const pascalName = pascalCase(iconName, {
				mergeAmbiguousCharacters: true,
				split: splitSeparateNumbers,
			});
			expect(iconKeys.includes(pascalName), `Icon "${iconName}" (${pascalName}) is not in the VueIcons exports`).toBeTruthy();
		}
	}, 10_000);
});