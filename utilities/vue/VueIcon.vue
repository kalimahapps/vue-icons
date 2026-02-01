<template>
	<component :is="name" />
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import { defineProps } from 'vue';

defineProps({
	/**
	 * The name of the icon to render.
	 */
	name: {
		type: [String, Function] as PropType<string | Function>,
		required: true,
	},
});
</script>
