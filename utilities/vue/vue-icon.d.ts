import type { Component, DefineComponent } from 'vue';
export interface VueIconProperties {
	name: String | Component;
}

declare const VueIcon: DefineComponent<VueIconProperties>;
export default VueIcon;