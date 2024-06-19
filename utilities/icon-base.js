import { h } from 'vue';
import { parse } from 'svg-parser';

/**
 * Convert a style string to an object. Also, replace
 * stroke and fill color with currentColor if they are
 * set
 *
 * @param  {string} styleString Style string to convert to an object
 * @return {object}             Style object
 */
const styleToObject = function (styleString) {
	return styleString.split(';').reduce((accumulator, item) => {
		let [key, value] = item.split(':');

		if (key === 'fill' && value !== 'none') {
			value = 'currentColor';
		}

		if (key === 'stroke' && value !== 'none') {
			value = 'currentColor';
		}

		accumulator[key] = value;
		return accumulator;
	}, {});
};

/**
 * Create an icon component
 *
 * @param  {Array}  props Element props
 * @param  {string} svg   svg string
 * @return {object}       The icon component
 */
export default function (iconProperties, svg) {
	const svgJsonParsed = parse(svg);
	const svgElement = svgJsonParsed.children[0];

	const { multicolor, pathfill, twotone, width, height, viewBox } = svgElement.properties;

	svgElement.properties.width = '1em';
	svgElement.properties.height = '1em';
	svgElement.properties.xmlns = 'http://www.w3.org/2000/svg';

	// If viewbox is not set, set it to the width and height of the svg
	if (viewBox === undefined) {
		// Make sure that width and height are set
		if (width === undefined || height === undefined) {
			throw new Error('Width and height must be set if viewBox is not set');
		}

		svgElement.properties.viewBox = `0 0 ${width} ${height}`;
	}

	/* eslint {complexity: [error, 12]} */
	const updateStyle = function (properties) {
		const { fill, stroke, style } = properties;

		const canFill = !twotone && fill && ['none', 'white', '#fff'].includes(fill) === false;

		if (twotone === 'true' && fill === undefined) {
			properties.fill = 'currentColor';
		} else if (canFill || pathfill !== undefined) {
			properties.fill = iconProperties.color === undefined ? 'currentColor' : iconProperties.color;
		}

		if (stroke !== undefined && stroke !== 'none') {
			properties.stroke = iconProperties.color === undefined ? 'currentColor' : iconProperties.color;
		}

		if (style !== undefined) {
			const styleObject = styleToObject(style);
			properties = {
				...properties,
				...styleObject,
			};
			properties.style = '';
		}

		return properties;
	};

	/**
	 * Render a Vue component recursively
	 *
	 * @param  {object} element Element object including attributes, children .. etc
	 * @return {string}         svg string
	 */
	const createElement = function (element) {
		const { tagName, properties, children } = element;

		if (multicolor !== 'true') {
			element.properties = updateStyle(properties);
		}

		if (children.length > 0) {
			const { properties } = element;

			// If node name is title then skip looping over children
			// as this will cause to display invalid vnode error
			if (tagName === 'title') {
				return h(tagName, properties);
			}

			return h(tagName, properties, children.map(createElement));
		}
		return h(tagName, element.properties);
	};

	// use an array to return multiple root nodes
	return createElement(svgElement);
}
