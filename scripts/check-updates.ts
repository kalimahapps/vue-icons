import { compareVersions } from 'compare-versions';
import { Octokit } from 'octokit';
import config from '../config.js';
import manifest from './manifest.js';
import { createProgressBar } from '@kalimahapps/cli-progress';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const currentFilePath = fileURLToPath(import.meta.url);
const currentDirectoryPath = path.dirname(currentFilePath);
const currentVersionsPath = path.resolve(currentDirectoryPath, './versions.json');
const currentVersions = JSON.parse(fs.readFileSync(currentVersionsPath, 'utf8'));

const progressBar = createProgressBar();
progressBar.setTotal(manifest.length);

const startCheck = async function () {
	const updates = [];

	for await (const iconsGroup of manifest) {
		// update progress bar
		progressBar.increment();

		const { name, version, repo: repoUrl } = iconsGroup;

		// console.log('\n', `Processing ${name} ...`);
		if (version !== undefined) {
			continue;
		}

		try {
			const repoLinkData = repoUrl.split('/');

			// Get owner
			const owner = repoLinkData.at(-2);

			// Get repo name
			const repo = repoLinkData.at(-1);
			const octokit = new Octokit({
				auth: config.access_token,
			});

			const versionDetails = await octokit.request('GET /repos/{owner}/{repo}/releases/latest', {
				owner,
				repo,
			});

			const latestVersion = versionDetails.data.tag_name.replace('v', '');
			const currentVersion = currentVersions[name];

			if (compareVersions(latestVersion, currentVersion) === 1) {
				// console.log(`New version available for ${name}!`);
				updates.push({
					name,
					currentVersion,
					latestVersion,
				});
			}
		} catch (error) {
			console.error(`Unable to get version for ${name}\n`, error.message, error);
		}
	}

	if (updates.length > 0) {
		console.log(`\n${updates.length} updates available!`);
		console.table(updates);
	} else {
		console.log('\nNo updates available!');
	}

	// Stop progress bar
	progressBar.stop();
};

startCheck();