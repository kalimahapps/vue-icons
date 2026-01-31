/* eslint complexity:['warn', 13] */
import tsParser from '@typescript-eslint/parser';
import type { Modification } from './types.ts';
import * as changeCase from 'change-case';
import { AST_NODE_TYPES } from '@typescript-eslint/utils';
import type { TSESTree } from '@typescript-eslint/utils';
const { pascalCase } = changeCase;
import MagicString from 'magic-string';
import { ICONS_PACKAGE_IMPORT_PATH, isIconName } from './helpers.js';

const detectAndReplaceIcons = function(
	ast: TSESTree.Node,
	modifications: Modification[]
) {
	// Simple recursive traversal
	const traverse = (node: TSESTree.Node) => {
		// Process current node
		if (node.type === AST_NODE_TYPES.Literal &&
            typeof node.value === 'string' &&
            isIconName(node.value)) {
			const colonToHyphen = node.value.replace(':', '-');
			const pascalName = pascalCase(colonToHyphen, {
				mergeAmbiguousCharacters: true,
			});

			modifications.push({
				start: node.range[0],
				end: node.range[1],
				replacement: pascalName,
				type: 'icon',
			});
		}

		// Traverse child nodes
		for (const key of Object.keys(node)) {
			const child = (node as any)[key];
			if (Array.isArray(child)) {
				for (const item of child) {
					if (item && typeof item === 'object' && item.type) {
						traverse(item);
					}
				}
			} else if (child && typeof child === 'object' && child.type) {
				traverse(child);
			}
		}
	};

	traverse(ast);
};

const parseTSFiles = (code: string) => {
	const usedIcons = new Set<string>();
	const modifications: Modification[] = [];
	const ast = tsParser.parse(code, {
		sourceType: 'module',
		ecmaVersion: 'latest',
		range: true,
	});

	for (const node of ast.body) {
		detectAndReplaceIcons(node, modifications);
	}

	// Apply modifications in reverse order
	modifications.sort((a, b) => {
		return b.start - a.start;
	});

	const magicString = new MagicString(code);
	for (const modification of modifications) {
		const { start, end, replacement } = modification;
		magicString.overwrite(start, end, replacement);
		if (modification.type === 'icon') {
			usedIcons.add(replacement);
		}
	}

	if (usedIcons.size > 0) {
		const importStatement = `import { ${[...usedIcons].join(', ')} } from '${ICONS_PACKAGE_IMPORT_PATH}';\n`;
		const [start, end] = ast.range;
		magicString.prependLeft(start, importStatement);
	}

	return magicString;
};

export default parseTSFiles;
