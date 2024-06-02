import { expect, test, describe } from 'vitest';
import { defineComponent } from 'vue';
import { mount } from '@vue/test-utils';
import {
	CaAccessibilityColorFilled,
	AdArpdownandup,
	AdHardclip,
	AdPresetAb,
	AdUsb,
	AiAcclaim,
	AiOrcid,
	AiScirateSquare,
	AkAirplayAudio,
	AkBackspace,
	AkBootstrapFill,
	AkDribbbleFill,
	AkMoon,
	AkRibbon,
	AkWallet
} from '@kalimahapps/vue-icons';

const imports = {
	CaAccessibilityColorFilled,
	AdArpdownandup,
	AdHardclip,
	AdPresetAb,
	AdUsb,
	AiAcclaim,
	AiOrcid,
	AiScirateSquare,
	AkAirplayAudio,
	AkBackspace,
	AkBootstrapFill,
	AkDribbbleFill,
	AkMoon,
	AkRibbon,
	AkWallet,
};

describe('Test sample icons from each package', () => {
	test.each(Object.entries(imports))('test %s snapshot', (name, icon) => {
		// Mount an instance and inspect the render output
		// eslint-disable-next-line vue/require-expose
		const wrapper = mount(defineComponent({
			props: {
				color: String,
			},

			setup() {
				return icon;
			},
		}));

		expect(wrapper.html()).toMatchSnapshot();
	});
});