import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { expect, test, describe } from 'vitest';
import packageJson from '../package.json';
import * as VueIcons from '@kalimahapps/vue-icons';

describe('Exports', () => {
	test('That package.json contains all the exports from icons folder', () => {
		const filePath = fileURLToPath(import.meta.url);
		const directoryPath = path.dirname(filePath);

		// Get icons folder path
		const iconsPath = path.join(directoryPath, '../icons');

		let icons = fs.readdirSync(iconsPath);
		const { exports } = packageJson;

		icons = icons.map((icon) => {
			return icon.replace('.js', '');
		});

		const exportsKeys = Object.keys(exports).map((key) => {
			return key.replace('./', '');
		});

		for (const icon of icons) {
		// Ignore .d.ts files
			if (icon.includes('.d.ts')) {
				return;
			}
			expect(exportsKeys, `Missing ${icon} in package.json exports`).to.include(icon);
		}
	});

	test('That exported icons are correct', () => {
		// import icons-list.json file from test folder
		const filePath = fileURLToPath(import.meta.url);
		const directoryPath = path.dirname(filePath);

		// Get icons-list.json path
		const iconsListPath = path.join(directoryPath, 'icons-list.json');

		// if the file exists, check against the exported icons
		if (fs.existsSync(iconsListPath)) {
			const iconsList = JSON.parse(fs.readFileSync(iconsListPath, 'utf8'));
			const icons = Object.keys(VueIcons);

			// find the difference between the exported icons and the icons-list.json
			const diff = icons.filter((icon) => {
				return !iconsList.includes(icon);
			});

			const diff2 = iconsList.filter((icon) => {
				return !icons.includes(icon);
			});

			if (diff.length > 0) {
				console.log('The following icons are missing from icons-list.json:');
				console.table(diff);
			}

			if (diff2.length > 0) {
				console.log('The following icons are missing from the exported icons:');
				console.table(diff2);
			}
			expect(diff, `The exported icons are not correct. Found ${diff.length} missing icons in icons-list.json`)
				.to.be.empty;
			expect(diff2, `The exported icons are not correct. Found ${diff2.length} missing icons in the exported icons`).to.be.empty;
		} else {
			// if the file does not exist, create it
			const icons = Object.keys(VueIcons);
			fs.writeFileSync(iconsListPath, JSON.stringify(icons));
		}
	}, 10_000);
});