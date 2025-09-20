import { defineNuxtModule, addComponent, addVitePlugin } from '@nuxt/kit';
import vueIconsPlugin from '@kalimahapps/vue-icons/vite';
export default defineNuxtModule({
    meta: {
        name: '@kalimahapps/vue-icons',
        configKey: 'vue-icons',
    },
    setup(options, nuxt) {
        addComponent({
            name: 'VueIcon',
            filePath: '@kalimahapps/vue-icons/VueIcon',
        });
        addVitePlugin(vueIconsPlugin());
    },
});
