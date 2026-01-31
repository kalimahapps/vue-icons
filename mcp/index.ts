import Fuse from 'fuse.js';
import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import iconsList from '@kalimahapps/vue-icons/icons-list-kebab-case' with { type: 'json' };

const server = new McpServer({
	name: 'vue-icons',
	version: '1.0.0',
	capabilities: {
		resources: {},
		tools: {},
		prompts: {},
	},
});

server.registerTool('find-icon', {
	description: 'Find an icon by name or keyword',
	inputSchema: {
		query: z.string().describe('Search term for icon name'),
		limit: z.number().optional()
			.describe('Maximum number of results to return')
			.default(5),
	},
}, ({ query, limit }) => {
	const fuse = new Fuse(iconsList, {
		includeScore: true,
		isCaseSensitive: false,
		shouldSort: true,
	});

	const results = fuse.search(query).slice(0, limit);

	return {
		content: [
			{
				type: 'text',
				text: JSON.stringify(results, undefined, 2),
			},
		],
	};
});

server.registerTool('get-icon-useage-example', {
	description: 'Get a code example for using an icon',
	inputSchema: {
		iconName: z.string().describe('Name of the icon to get usage example for'),
	},
}, ({ iconName }) => {
	const importLine = 'import VueIcon from \'@kalimahapps/vue-icons/VueIcon\';';
	const basicExample = `<VueIcon name="${iconName}" />`;
	const classExample = `<VueIcon name="${iconName}" class="icon-class" />`;
	const tailwindExample = `<VueIcon name="${iconName}" class="w-6 h-6 text-blue-500" />`;

	let example = '';
	example += '<template>\n';
	example += '  <div>\n';
	example += `    ${basicExample}\n`;
	example += `    ${classExample}\n`;
	example += `    ${tailwindExample}\n`;
	example += '  </div>\n';
	example += '</template>\n\n';
	example += '<script setup lang="ts">\n';
	example += `${importLine}\n`;
	example += '</script>\n';
	return {
		content: [
			{
				type: 'text',
				text: example,
			},
		],
	};
});

export { server as mcpServer };