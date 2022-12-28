const { compareVersions } = require('compare-versions');
const { Octokit } = require('octokit');
const cliProgress = require('cli-progress');
const colors = require('ansi-colors');
const config = require('../config.js');
const currentVersions = require('./versions.json');
const manifest = require('./manifest.js');

// create progress bar defaults
const progressBar = new cliProgress.SingleBar({
	format: `${colors.cyanBright('{bar}')}    ${colors.magenta('{percentage}%')}    ({value}/{total})`,
	barCompleteChar: '>',
	barIncompleteChar: '-',
	hideCursor: true,
});

// Show progress bar
progressBar.start(manifest.length, 0);

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

			/* 	console.log(`Current version: ${currentVersion}`);
		console.log(`Latest version: ${latestVersion}`); */
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

	/* await manifest.reduce(async (previousPromise, iconsGroup) => {
		await previousPromise;

	}, Promise.resolve([])); */

	// Stop progress bar
	progressBar.stop();
};

startCheck();