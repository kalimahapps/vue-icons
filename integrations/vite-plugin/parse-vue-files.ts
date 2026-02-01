/* eslint complexity:['warn', 10] */
import type { Modification } from './types.ts';
import type { Node, VAttribute, VDirective, VElement } from 'vue-eslint-parser/ast/nodes';
import * as vueParser from 'vue-eslint-parser';
import * as changeCase from 'change-case';
import MagicString from 'magic-string';
import { ICONS_PACKAGE_IMPORT_PATH, isIconName } from './helpers.js';
const { pascalCase } = changeCase;

/**
 * Find icons in template Like <AnOutlinedSearch/>
 *
 * @param  {Node}        node      Node to search
 * @param  {Set<string>} usedIcons Set of used icon names
 * @return
 */
const findIconTagInTemplate = function(
	node: Node,
	usedIcons: Set<string>
){
	if (node.type !== 'VElement' || !isIconName(node.rawName)) {
		return;
	}
	const pascalName = pascalCase(node.rawName, {
		mergeAmbiguousCharacters: true,
	});
	usedIcons.add(pascalName);
};

/**
 * Handle literal attributes cases like:
 * <ComponentName icon='icon-name'></ComponentName>
 *
 * @param  {VAttribute | VDirective} attribute Attribute to process
 * @return {Modification[]}                    List of modifications
 */
const processLiteralAttributes = function(
	attribute: VAttribute | VDirective
): Modification[] {
	if (
		attribute.type !== 'VAttribute'
		|| attribute.key.type !== 'VIdentifier'
		|| !attribute.value
		|| attribute.value.type !== 'VLiteral'
		|| !isIconName(attribute.value.value)
	) {
		return [];
	}

	const modifications: Modification[] = [];
	const colonToHyphen = attribute.value.value.replace(':', '-');
	const pascalName = pascalCase(colonToHyphen, {
		mergeAmbiguousCharacters: true,
	});

	const [valueStart, valueEnd] = attribute.value.range;

	// Skip the quotes around the value
	const startWithoutQuotes = valueStart + 1;
	const endWithoutQuotes = valueEnd - 1;

	modifications.push({
		start: startWithoutQuotes,
		end: endWithoutQuotes,
		replacement: pascalName,
		type: 'icon',
	});

	// Add : to attribute name
	const [keyStart, keyEnd] = attribute.key.range;
	const replacement = `:${attribute.key.name}`;
	modifications.push({
		start: keyStart,
		end: keyEnd,
		replacement,
		type: 'attribute',
	});

	return modifications;
};

/**
 * Handle dynamic attributes cases like:
 * <ComponentName :icon="test ? 'icon-if-true' : 'icon-if-false'"></ComponentName>
 *
 * @param  {VAttribute | VDirective} attribute Attribute to process
 * @return {Modification[]}                    List of modifications
 */
const processDynamicAttributes = function(
	attribute: VAttribute | VDirective
): Modification[] {
	if (
		attribute.key.type !== 'VDirectiveKey'
		|| !attribute.value
		|| attribute.value.type !== 'VExpressionContainer'
		|| attribute.value.expression?.type !== 'ConditionalExpression'
	) {
		return [];
	}
	const modifications: Modification[] = [];
	const { consequent, alternate } = attribute.value.expression;
	for (const node of [consequent, alternate]) {
		if (node.type === 'Literal' && typeof node.value === 'string' && isIconName(node.value)) {
			const colonToHyphen = node.value.replace(':', '-');
			const pascalName = pascalCase(colonToHyphen, {
				mergeAmbiguousCharacters: true,
			});

			const [valueStart, valueEnd] = node.range;

			modifications.push({
				start: valueStart,
				end: valueEnd,
				replacement: pascalName,
				type: 'icon',
			});
		}
	}

	return modifications;
};

/**
 * Find <VueIcon> components in the template
 *
 * @param {Node}           node          Node to search
 * @param {Modification[]} modifications Array to store modifications
 */
const findVueIconComponentInTemplate = function(
	node: Node,
	modifications: Modification[]
) {
	if (node.type !== 'VElement') {
		return;
	}

	for (const attribute of node.startTag.attributes) {
		const literals = processLiteralAttributes(attribute);
		if (literals.length > 0) {
			modifications.push(...literals);
		}

		const dynamic = processDynamicAttributes(attribute);
		if (dynamic.length > 0) {
			modifications.push(...dynamic);
		}
	}
};

const detectAndReplaceTemplateIcons = function(
	templateAst: VElement,
	usedIcons: Set<string>,
	modifications: Modification[]
) {
	vueParser.AST.traverseNodes(templateAst, {
		enterNode: function(node) {
			findVueIconComponentInTemplate(node, modifications);
			findIconTagInTemplate(node, usedIcons);
		},
		leaveNode: function(node) {
			// No specific leave logic needed for now
		},
	});
};

const detectAndReplaceScriptIcons = function(
	scriptAst: Node,
	modifications: Modification[]
) {
	vueParser.AST.traverseNodes(scriptAst, {
		enterNode: function(node) {
			if (node.type !== 'Literal' || typeof node.value !== 'string' || !isIconName(node.value)) {
				return;
			}

			const colonToHyphen = node.value.replace(':', '-');
			const pascalName = pascalCase(colonToHyphen, {
				mergeAmbiguousCharacters: true,
			});

			const [start, end] = node.range;
			modifications.push({
				start,
				end,
				replacement: pascalName,
				type: 'icon',
			});
		},
		leaveNode: function(node) {
			// No specific leave logic needed for now
		},
	});
};

const parseVueFiles = function(code: string){
	const usedIcons = new Set<string>();
	const modifications: Modification[] = [];
	const { ast } = vueParser.parseForESLint(code, {
		ecmaVersion: 'latest',
		sourceType: 'module',
		parser: {
			ts: '@typescript-eslint/parser',
		},
	});

	const magicString = new MagicString(code);

	if (ast.templateBody) {
		detectAndReplaceTemplateIcons(ast.templateBody, usedIcons, modifications);
	}

	if (ast.body) {
		for (const node of ast.body) {
			detectAndReplaceScriptIcons(node, modifications);
		}
	}

	// Apply modifications in reverse order
	modifications.sort((a, b) => {
		return b.start - a.start;
	});

	for (const modification of modifications) {
		const { start, end, replacement } = modification;
		magicString.overwrite(start, end, replacement);
		if (modification.type === 'icon') {
			usedIcons.add(replacement);
		}
	}

	if (usedIcons.size > 0) {
		let importStatement = `import { ${[...usedIcons].join(', ')} } from '${ICONS_PACKAGE_IMPORT_PATH}';\n`;
		const [start, end] = ast.range;

		// there is no script tag in the file, so create one
		if (start === end && start === 0) {
			importStatement = `<script setup>\n${importStatement}</script>\n`;
		}
		magicString.prependLeft(start, importStatement);
	}

	return magicString;
};

export default parseVueFiles;