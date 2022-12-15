module.exports = (attributes) => {
	const plugins = [
		{
			name: 'preset-default',
			params: {
				overrides: {
					removeViewBox: false,
					inlineStyles: {
						onlyMatchedOnce: false,
					},
				},
			},
		},
		{
			name: 'removeXMLNS',
			active: false,
		},
		{
			name: 'removeAttrs',
			params: {
				attrs: '(data-.*|svg^class|svg^id)',
			},
		},
		{
			name: 'removeInkscapeData',
			type: 'perItem',
			fn: (ast, parameters, info) => {
				return {
					element: {
						enter: (node) => {
							if (node.attributes?.style === undefined) {
								return node;
							}

							const hasInkscape = node.attributes.style.includes('inkscape');
							if (!hasInkscape) {
								return node;
							}

							// Split and remove inkscape styles
							const styles = node.attributes.style.split(';');
							const filteredStyles = styles.filter((style) => {
								return !style.includes('inkscape');
							});
							node.attributes.style = filteredStyles.join(';');
							return node;
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