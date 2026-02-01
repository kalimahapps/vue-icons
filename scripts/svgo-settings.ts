import type { Config, PluginConfig } from 'svgo';
const svgoSettings = (attributes: Attributes): Config => {
	const plugins: PluginConfig[] = [
		{
			name: 'preset-default',
			params: {
				overrides: {
					removeViewBox: false,
					inlineStyles: {
						onlyMatchedOnce: false,
					},
					convertPathData: {
						removeUseless: false,
					},
				},
			},
		},
		{
			name: 'removeXMLNS',
		},
		{
			name: 'removeAttrs',
			params: {
				attrs: '(data-.*|svg^class|svg^id)',
			},
		},
		{
			name: 'removeInkscapeData',
			fn: (ast, parameters, info) => {
				return {
					element: {
						enter: (node) => {
							if (node.attributes?.style === undefined) {
								return;
							}

							const hasInkscape = node.attributes.style.includes('inkscape');
							if (!hasInkscape) {
								return;
							}

							// Split and remove inkscape styles
							const styles = node.attributes.style.split(';');
							const filteredStyles = styles.filter((style) => {
								return !style.includes('inkscape');
							});
							node.attributes.style = filteredStyles.join(';');
						},
					},
				};
			},
		},
	];

	if (attributes) {
		plugins.push({
			name: 'addAttributesToSVGElement',
			params: {
				attributes: [attributes],
			},
		});
	}

	return {
		plugins,
	};
};

export default svgoSettings;