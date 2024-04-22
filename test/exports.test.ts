import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { expect, test } from 'vitest';
import packageJson from '../package.json';

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

	icons.forEach((icon) => {
		// Ignore .d.ts files
		if (icon.includes('.d.ts')) {
			return;
		}
		expect(exportsKeys, `Missing ${icon} in package.json exports`).to.include(icon);
	});
});