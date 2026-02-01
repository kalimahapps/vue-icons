#!/usr/bin/env node
import { mcpServer } from './index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
const transport = new StdioServerTransport();
await mcpServer.connect(transport);