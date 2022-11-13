<img src="https://raw.githubusercontent.com/kalimah-apps/vue-icons/master/logo.svg" width="120" alt="Vue Icons">

# [Vue Icons](https://vue-icons.kalimah-apps.com/)
[![npm](https://img.shields.io/npm/v/@kalimahapps/vue-icons.svg)](https://www.npmjs.com/package/@kalimahapps/vue-icons) 
[![npm](https://img.shields.io/npm/dt/@kalimahapps/vue-icons.svg)](https://www.npmjs.com/package/@kalimahapps/vue-icons)
![vue-3](https://img.shields.io/badge/vue-3-%2342b883)

[![Twitter Follow](https://img.shields.io/twitter/follow/KalimahApps?style=for-the-badge)](https://twitter.com/KalimahApps)

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
        VueIconsResolver(),
      ],
    })
  ],
});
```

## Demo

To view the full list of icons, search and copy the import statement, check the demo: https://kalimah-apps.github.io/vue-icons/

## Icons

| Icon Set                                                                                     | Prefix | License                     | Version | Count |
| -------------------------------------------------------------------------------------------- | ------ | --------------------------- | ------- | ----- |
| [Academicons](https://jpswalsh.github.io/academicons/)                                       | ai     | SIL OFL 1.1                 | 1.9.2   | 149   |
| [Ant Design](https://ant.design/components/icon/)                                            | an     | MIT                         | 4.2.1   | 789   |
| [Bootstrap Icons](https://icons.getbootstrap.com/)                                           | bs     | MIT                         | 1.10.1  | 1851  |
| [Boxicons](https://boxicons.com/)                                                            | bx     | CC 4.0                      | 2.1.4   | 1634  |
| [Carbon](https://carbondesignsystem.com/)                                                    | ca     | Apache-2.0                  | 11.17.0 | 1849  |
| [Circum](https://circumicons.com/)                                                           | ci     | MPL-2.0                     | 2.0.0   | 285   |
| [Core UI Icons](https://coreui.io/icons/)                                                    | co     | CC 4.0                      | 2.0.1   | 1569  |
| [css.gg](https://css.gg/)                                                                    | cg     | MIT                         | 2.0.0   | 704   |
| [Devicons](https://devicon.dev/)                                                             | de     | MIT                         | 2.15.1  | 784   |
| [FluentUI System](https://github.com/microsoft/fluentui-system-icons)                        | fl     | MIT                         | 1.1.186 | 4235  |
| [Font Awesome](https://fontawesome.com/)                                                     | fa     | CC BY 4.0                   | 6.2.0   | 2016  |
| [Feather](https://feathericons.com/)                                                         | fe     | MIT                         | 4.29.0  | 287   |
| [Govicons](http://govicons.io/)                                                              | gv     | SIL OFL 1.1                 | 1.6.0   | 136   |
| [Healthicons](https://healthicons.org/)                                                      | he     | MIT                         | 0.1.0   | 1154  |
| [Hero](https://heroicons.com/)                                                               | hi     | MIT                         | 2.0.13  | 584   |
| [Jamicons](https://jam-icons.com/)                                                           | ja     | MIT                         | 3.1.0   | 940   |
| [Iconoir](https://iconoir.com/)                                                              | ic     | MIT                         | 5.4     | 1209  |
| [IonIcons](https://ionic.io/ionicons)                                                        | io     | MIT                         | 6.0.4   | 1332  |
| [Line Awesome](https://icons8.com/line-awesome)                                              | la     | MIT                         | 1.2.1   | 1544  |
| [Linearicons](https://linearicons.com/free)                                                  | li     | CC BY-SA 4.0                | -       | 170   |
| [Maki](https://labs.mapbox.com/maki-icons)                                                   | ma     | CC0 1.0 Universal           | 8.0.0   | 211   |
| [Material Design](https://fonts.google.com/icons)                                            | md     | Apache-2.0                  | 4.0.0   | 10750 |
| [MingCute](https://www.mingcute.com/)                                                        | mc     | Apache-2.0                  | 2.4     | 1346  |
| [Octicons](https://github.com/primer/octicons)                                               | oc     | MIT                         | 17.9.0  | 241   |
| [OpenWeb](https://pfefferle.dev/openwebicons/)                                               | ow     | SIL Open Font License       | 1.6.3   | 115   |
| [Phosphor](https://phosphoricons.com/)                                                       | ph     | MIT                         | 1.4.1   | 6282  |
| [Pixelarticons](https://pixelarticons.com/)                                                  | px     | MIT                         | 1.7.0   | 480   |
| [Prime Icons](https://github.com/primefaces/primeicons)                                      | pr     | MIT                         | 6.0.1   | 260   |
| [Remix](https://remixicon.com/)                                                              | re     | Apache 2.0                  | 2.5.0   | 2271  |
| [Simple Icons](https://simpleicons.org/)                                                     | si     | CC0 1.0                     | 7.19.0  | 2402  |
| [Tabler](https://tabler-icons.io/)                                                           | ta     | MIT                         | 1.111.0 | 2907  |
| [Themify](https://themify.me/themify-icons)                                                  | th     | SIL Open Font License (OFL) | 1.0.1   | 352   |
| [Typicons](https://www.s-ings.com/typicons/)                                                 | ti     | CC BY-SA 4.0                | 2.1.2   | 336   |
| [Unicons](https://iconscout.com/unicons/explore/line)                                        | un     | IconScout Simple License    | 3.0.0   | 1206  |
| [uiw icons](https://uiwjs.github.io/icons/)                                                  | ui     | MIT                         | 2.6.7   | 214   |
| [VSCode](https://marketplace.visualstudio.com/items?itemName=vscode-icons-team.vscode-icons) | vs     | MIT                         | 12.0.1  | 1180  |
| [Weather Icons](https://erikflowers.github.io/weather-icons/)                                | wi     | SIL OFL 1.1                 | 2.0.10  | 219   |

## Version History
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
