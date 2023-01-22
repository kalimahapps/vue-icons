<p align="center">
<img src="https://raw.githubusercontent.com/kalimah-apps/vue-icons/master/logo.svg" width="120" alt="Vue Icons">

<a href="https://vue-icons.kalimah-apps.com">
<h2 align="center">VueIcons</h2>
</a>
</p>

<p align="center">
55,000+ SVG icons from popular icon sets that you can add seamlessly to your vue projects
</p>

<p align="center">
<a target="_blank" href="https://www.npmjs.com/package/@kalimahapps/vue-icons">
  <img src="https://img.shields.io/npm/v/@kalimahapps/vue-icons.svg">
</a>
<a target="_blank" href="https://www.npmjs.com/package/@kalimahapps/vue-icons">
  <img src="https://img.shields.io/npm/dt/@kalimahapps/vue-icons.svg">
</a>
<img src="https://img.shields.io/badge/vue-3-%2342b883">
</p>
<p align="center">
<a target=_blank href="https://twitter.com/KalimahApps">
  <img src="https://img.shields.io/twitter/follow/KalimahApps?style=for-the-badge">
</a>
</p>
<br>


## ✨ Features
- Tree-shaking. Only the icons you use will be included in your bundle
- Easy to use. No need for import statement if used through resolvers with vite.
- 55,000+ icons from popular icon sets
- Stylable. You can change color and size of the icons
- Built for vue3
- Optimized with SVGO

<br>
<br>

## 💽 Installation
### NPM
```bash
npm install @kalimahapps/vue-icons
```
### PNPM
```bash
pnpm add @kalimahapps/vue-icons
```

## 🔧 Usage

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

<br>
<br>

## Using resolvers with [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components)
vue-icons provides a resolver that can be used with unplugin-vue-components so you don't have to add `import IconName from '@kalimahapps/vue-icons/iconSet'` for every icon you want to use.

```js
// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueIconsResolver from '@kalimahapps/vue-icons/resolver';

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        VueIconsResolver,
      ],
    })
  ],
});
```
<br>
<br>

## 📚 Demo
To view the full list of icons, search and copy the import statement, check the demo: https://vue-icons.kalimah-apps.com/

<br>
<br>

## 📦 Icon Sets

Icon Set|Prefix|License|Version|Count
---|---|---|---|---
[[:icons-list:]]

<br>
<br>

## 🧮 Version History
- 1.1.5
  - Add missing export "he" to package.json

- 1.1.3
  - Updated icon packages
  - Updated dev dependencies

- 1.0.6
  - Fixed bugs
  - Add 2 icon sets (bytesize, codicons)

- 1.0.5
  - Fixed bugs
  - Added a new icon set (majesticons)

- 1.0.3
  - Added three icon sets
  - Updated icon packages
  - Fixed minor bugs

- 1.0.1
  - Added icons resolver

- 1.0.0
  - Added 23 icon sets
  - Export format is changed to SVG to decrease package size
  - Updated demo UI and search

- 0.0.7
  - Update icons set

- 0.0.2
  - Initial Release

<br>
<br>

## 🏗️ Other projects
### [Vue Popper](https://www.npmjs.com/package/@kalimahapps/vue-popper)
A Vue 3 tooltip component using popper.js

### [Vite inherit attrs](https://www.npmjs.com/package/vite-plugin-vue-setup-inherit-attrs)
A vite plugin that adds support for inheritAttrs in vue-setup


### [KalimahApps Eslint Config](https://www.npmjs.com/package/@kalimahapps/eslint-config)
Comprehensive eslint rules for vue projects with typescript

<br>
<br>

## ⚖️ License

This project is licensed under the MIT License
For each icons set, please check the icon project licenses accordingly.

<br>
<br>

## 🙏 Acknowledgement


This project was inspired by the [React Icons](https://react-icons.github.io/react-icons/) package.