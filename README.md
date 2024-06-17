<p align="center">
<img src="https://raw.githubusercontent.com/kalimah-apps/vue-icons/master/logo.svg" width="120" alt="Vue Icons">

<a href="https://vue-icons.kalimah-apps.com">
<h2 align="center">VueIcons</h2>
</a>
</p>

<p align="center">
60,000+ SVG icons from popular icon sets that you can add seamlessly to your vue projects
</p>

<p align="center">
<a target="_blank" href="https://www.npmjs.com/package/@kalimahapps/eslint-config">
  <img src="https://img.shields.io/badge/ESLint%20Config-kalimahapps-blue">
</a>
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
- 60,000+ icons from popular icon sets
- Stylable. You can change color and size of the icons
- Built for vue3
- Optimized with SVGO

<br>
<br>

<h2 align="center">
<a href="https://vue-icons.kalimah-apps.com/">Icons Demo</a>
</h2>
<br>
<br>

## 💽 Installation
### PNPM
```bash
pnpm add @kalimahapps/vue-icons
```

### NPM
```bash
npm install @kalimahapps/vue-icons
```

## 🔧 Usage

```vue
<template>
	<div class="button">
    <BsCalendar4Range /> Select Date
  </div>
</template>

<script setup>
import { BsCalendar4Range } from '@kalimahapps/vue-icons';
</script>
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

## Styling
You can change the color and size of the icons by adding style or class to the icon component.

```vue
<template>
	<div class="button">
		<BsCalendar4Range class="icon" />

		<span>Select Date</span>
	</div>
</template>

<script setup>
import { BsCalendar4Range } from '@kalimahapps/vue-icons';
</script>

<style scoped lang="scss">
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  background-color: #fff;
  color: #000000;
  cursor: pointer;

  /* Change color and size of the icon */
  .icon {
    color: #c9330a;
    font-size: 1.3em;
    margin-right: 0.5em;
  }

  &:hover {
    background-color: #eee;
  }
}
</style>
```

<br><br>

## 📚 Demo
To view the full list of icons, search and copy the import statement, check the demo: https://vue-icons.kalimah-apps.com/

<br>
<br>

## 📦 Icon Sets

Icon Set|Prefix|License|Version|Count
---|---|---|---|---
[FontAudio](https://github.com/fefanto/fontaudio)|ad|MIT|1.1|155
[Academicons](https://jpswalsh.github.io/academicons/)|ai|SIL OFL 1.1|1.9.4|157
[Akar](https://akaricons.com/)|ak|MIT|1.9.14|454
[Ant Design](https://ant.design/components/icon/)|an|MIT|4.2.1|831
[Bootstrap Icons](https://icons.getbootstrap.com/)|bs|MIT|1.11.3|2050
[Boxicons](https://boxicons.com/)|bx|CC 4.0|2.1.4|1632
[Carbon](https://carbondesignsystem.com/)|ca|Apache-2.0|11.59.0|2102
[Charm Icons](https://codepen.io/jaynewey/full/LYROoGJ)|ch|MIT|0.18.0|261
[CoolIcons](https://coolicons.cool/)|cl|CC 4.0|4.1|442
[Bytesize](https://danklammer.com/bytesize-icons/)|by|MIT|1.4|101
[Circum](https://circumicons.com/)|ci|MPL-2.0|2.0.0|288
[Codicons](https://microsoft.github.io/vscode-codicons/dist/codicon.html)|cd|MIT|0.0.36|461
[Core UI Icons](https://coreui.io/icons/)|co|CC 4.0|3.0.1|1569
[css.gg](https://css.gg/)|cg|MIT|2.1.1|704
[Devicons](https://devicon.dev/)|de|MIT|2.16.0|1516
[FluentUI System](https://github.com/microsoft/fluentui-system-icons)|fl|MIT|1.1.201|5240
[Font Awesome](https://fontawesome.com/)|fa|CC BY 4.0|6.5.2|2045
[Feather](https://feathericons.com/)|fe|MIT|4.29.2|287
[GitLab](http://gitlab-org.gitlab.io/gitlab-svgs/)|gl|MIT|3.46.0|405
[Govicons](http://govicons.io/)|gv|SIL OFL 1.1|1.6.0|136
[Healthicons](https://healthicons.org/)|he|MIT|0.1.0|1278
[Hero](https://heroicons.com/)|hi|MIT|2.1.3|592
[Humble Icons](https://humbleicons.com/)|hu|MIT|1.10.0|247
[Jamicons](https://jam-icons.com/)|ja|MIT|3.1.0|940
[Iconoir](https://iconoir.com/)|ic|MIT|7.7.0|1573
[IonIcons](https://ionic.io/ionicons)|io|MIT|7.4.0|1355
[Line Awesome](https://icons8.com/line-awesome)|la|MIT|1.2.1|1544
[Linearicons](https://linearicons.com/free)|li|CC BY-SA 4.0|-|170
[Lucide](https://lucide.dev/)|lu|ISC|0.395.0|1456
[Majesticons](https://www.majesticons.com/)|mi|MIT|2.1.2|760
[Maki](https://labs.mapbox.com/maki-icons)|ma|CC0 1.0 Universal|8.0.0|213
[Material Design](https://fonts.google.com/icons)|md|Apache-2.0|4.0.0|10609
[MingCute](https://www.mingcute.com/)|mc|Apache-2.0|2.94|2926
[Octicons](https://github.com/primer/octicons)|oc|MIT|19.9.0|304
[OpenWeb](https://pfefferle.dev/openwebicons/)|ow|SIL Open Font License|1.6.3|115
[Phosphor](https://phosphoricons.com/)|ph|MIT|2.0.2|9072
[Pixelarticons](https://pixelarticons.com/)|px|MIT|1.8.1|486
[Prime Icons](https://github.com/primefaces/primeicons)|pr|MIT|7.0.0|313
[Quill](https://www.figma.com/community/file/1034432054377533052/Quill-Iconset)|qu|MIT|1.0.0|133
[Radix](https://icons.radix-ui.com/)|ra|MIT|1.3.0|318
[Remix](https://remixicon.com/)|re|Apache 2.0|4.3.0|2860
[Simple Icons](https://simpleicons.org/)|si|CC0 1.0|12.3.0|3122
[System UIcons](https://www.systemuicons.com/)|su|Unlicense|-|430
[Tabler](https://tabler-icons.io/)|ta|MIT|3.6.0|4158
[Themify](https://themify.me/themify-icons)|th|SIL Open Font License (OFL)|1.0.1|352
[Typicons](https://www.s-ings.com/typicons/)|ti|CC BY-SA 4.0|2.1.2|336
[Unicons](https://iconscout.com/unicons/explore/line)|un|IconScout Simple License|3.0.0|1206
[uiw icons](https://uiwjs.github.io/icons/)|ui|MIT|2.6.10|214
[VSCode](https://marketplace.visualstudio.com/items?itemName=vscode-icons-team.vscode-icons)|vs|MIT|12.8.0|1254
[Weather Icons](https://erikflowers.github.io/weather-icons/)|wi|SIL OFL 1.1|2.0.10|219
Total| | | | 69391

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