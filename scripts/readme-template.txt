<img src="https://raw.githubusercontent.com/kalimah-apps/vue-icons/master/logo.svg" width="120" alt="Vue Icons">

# [Vue Icons](https://vue-icons.kalimah-apps.com/)
[![npm](https://img.shields.io/npm/v/@kalimahapps/vue-icons.svg)](https://www.npmjs.com/package/@kalimahapps/vue-icons) 
[![npm](https://img.shields.io/npm/dt/@kalimahapps/vue-icons.svg)](https://www.npmjs.com/package/@kalimahapps/vue-icons)
![vue-3](https://img.shields.io/badge/vue-3-%2342b883)

![Twitter Follow](https://img.shields.io/twitter/follow/KalimahApps?style=for-the-badge)

50,000+ SVG icons from popular icon sets that you can add seamlessly to your vue projects

### Installing

```bash
npm install @kalimahapps/vue-icons
```

### Example

```vue
<template>
	<div class="button"><BsCalendar4Range /> Select Date</div>
</template>
<script>
import { BsCalendar4Range } from '@kalimahapps/vue-icons/bs';
export default {
	components: {
		BsCalendar4Range 
	}
};
</script>
<style></style>
```

## Demo

To view the full list of icons, search and copy the import statement, check the demo: https://kalimah-apps.github.io/vue-icons/

## Icons

Icon Set|Prefix|License|Version|Count
---|---|---|---|---
[[:icons-list:]]

## Version History
- 1.0.0
  - Added 23 icon sets
  - Export format is changed to SVG to decrease package size
  - Updated demo UI and search

- 0.0.7
  - Update icons set
  
- 0.0.2
  - Initial Release

## Other projects
### [Vue Popper](https://www.npmjs.com/package/@kalimahapps/vue-popper)
A Vue 3 component that uses popper.js to position elements

### [Vite inherit attrs](https://www.npmjs.com/package/vite-plugin-vue-setup-inherit-attrs)
A vite plugin that adds support for inheritAttrs in vue-setup


## License

This project is licensed under the MIT License
For each icons set, please check the icon project licenses accordingly.

## Acknowledgments

This project was inspired by the [React Icons](https://react-icons.github.io/react-icons/) package.
