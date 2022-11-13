import { h } from 'vue';
import { parseSync as svgToJson } from 'svgson';

export default function (props, svg) {
	const svgJsonParsed = svgToJson(svg);

	svgJsonParsed.attributes.width = '1em';
	svgJsonParsed.attributes.height = '1em';
	svgJsonParsed.attributes.xmlns = 'http://www.w3.org/2000/svg';

	const { multicolor, pathfill, twotone } = svgJsonParsed.attributes;
	/**
	 * Convert a style string to an object. Also, replace
	 * stroke and fill color with currentColor if they are
	 * set
	 *
	 * @param {string} styleString Style string to convert to an object
	 * @returns
	 */
	const styleToObject = function (styleString) {
		return styleString.split(';').reduce((acc, item) => {
			let [key, value] = item.split(':');

			if (key === 'fill' && value !== 'none') {
				value = 'currentColor';
			}

			if (key === 'stroke' && value !== 'none') {
				value = 'currentColor';
			}

			acc[key] = value;
			return acc;
		}, {});
	};

	const updateStyle = function (attributes) {
		const { fill, stroke } = attributes;

		const canFill = !twotone && fill && ['none', 'white', '#fff'].includes(fill) === false;

		if (twotone === 'true' && fill === undefined) {
			attributes.fill = 'currentColor';
		}
		else if (canFill || pathfill !== undefined) {
			attributes.fill = typeof props.color !== 'undefined' ? props.color : 'currentColor';
		}

		if (typeof stroke !== 'undefined' && stroke !== 'none') {
			attributes.stroke = typeof props.color !== 'undefined' ? props.color : 'currentColor';
		}

		if (typeof attributes.style !== 'undefined') {
			const style = styleToObject(attributes.style);
			attributes = { ...attributes, ...style };
			attributes.style = '';
		}

		return attributes;
	};
	/**
	 * Render a Vue component recursively
	 *
	 * @param {object} element Element object including attributes, children .. etc
	 * @returns {string} svg string
	 */
	const createElement = function (element) {
		const { name, attributes, children } = element;

		if (multicolor !== 'true') {
			element.attributes = updateStyle(attributes);
		}

		if (Array.isArray(children)) {
			// If node name is title then skip looping over children
			// as this will cause to display invalid vnode error
			if (name === 'title') {
				return h(name, element.attributes);
			}

			return h(name, element.attributes, children.map(createElement));
		}
		return h(name, element.attributes);
	};

	// use an array to return multiple root nodes
	return createElement(svgJsonParsed);
}
