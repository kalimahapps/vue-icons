<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { onClickOutside } from '@vueuse/core';
import copyText from 'copy-text-to-clipboard';

import { FaMagnifyingGlass } from '@kalimahapps/vue-icons/fa';
import { IoOutlineEyedrop } from '@kalimahapps/vue-icons/io';

import * as AllIcons from '@kalimahapps/vue-icons/all';
import iconsData from '~@kalimahapps/vue-icons/content';
import logo from './assets/logo.svg';

const keywords = ref('');
const currentCollection = ref([]);
const currentIconIndex = ref(-1);
const currentIcon = computed(() => currentIconsSet.value[currentIconIndex.value]);
const isCopied = ref(false);
const showColorPicker = ref(false);
const colorPickerElement = ref(null);
const currentIconElement = ref(null);
const iconElement = ref(null);

const colors = [
	'#2ecc71',
	'#27ae60',
	'#1abc9c',
	'#16a085',
	'#3498db',
	'#2980b9',
	'#9b59b6',
	'#8e44ad',
	'#34495e',
	'#2c3e50',
	'#f1c40f',
	'#e67e22',
	'#f39c12',
	'#d35400',
	'#e74c3c',
	'#c0392b',
	'#ecf0f1',
	'#bdc3c7',
	'#95a5a6',
	'#7f8c8d'
];
const currentIconColor = ref('#34495e');

// Pagination
const perPage = 22 * 7;
const currentPage = ref(1);
const totalResults = ref(0);
const totalPages = computed(() => {
	return Math.ceil(totalResults.value / perPage);
});

// onClickOutside(currentIconElement, event => (currentIconIndex.value = -1), {
// 	ignore: [currentIconElement]
// });
onClickOutside(colorPickerElement, event => (showColorPicker.value = false));

const searchWrapper = ref(null);
const isSticky = ref(false);

const setIconColor = function (colorIndex) {
	currentIconColor.value = colors[colorIndex];
};

/**
 * Toggle displayed collections
 *
 * @param collectionName Name of icon collection
 */
const setIconCollection = function (collectionName) {
	// Always reset pagination
	currentPage.value = 1;

	// Reset current icon
	currentIconIndex.value = -1;

	if (collectionName === 'all') {
		currentCollection.value = [];
		return;
	}

	const collectionIndex = currentCollection.value.indexOf(collectionName);
	if (collectionIndex === -1) {
		currentCollection.value.push(collectionName);
		return;
	}

	currentCollection.value.splice(collectionIndex, 1);
};

/**
 * Get current icons set based on current collection and keywords.
 * Use pagination to lazyload icons.
 */
const currentIconsSet = computed(() => {
	let iconSet = [];
	iconsData.forEach(collection => {
		const { icons, group } = collection;

		if (currentCollection.value.length === 0) {
			iconSet = [...iconSet, ...icons];
			return;
		}

		if (currentCollection.value.includes(group)) {
			iconSet = [...iconSet, ...icons];
		}
	});

	// Sort alphabetically
	iconSet = iconSet.sort((a, b) => {
		return a.localeCompare(b);
	});

	// Perform search if set
	if (keywords.value.length > 0) {
		iconSet = iconSet.filter(icon => {
			return icon.toLowerCase().includes(keywords.value.toLowerCase());
		});
	}

	totalResults.value = iconSet.length;

	// Show current page
	iconSet = iconSet.slice(0, perPage * currentPage.value);

	return iconSet;
});

/**
 * Get icon collection group and names to display as tags
 */
const iconsCollectionsTags = computed(() => {
	return iconsData.map(collection => {
		const { group, name } = collection;
		return { name, group };
	});
});

const displayIcon = function (iconIndex) {
	isCopied.value = false;

	currentIconIndex.value = iconIndex;
};

const getImportMessage = computed(() => {
	const collection = currentIcon.value.slice(0, 2).toLowerCase();
	return `import { ${currentIcon.value} } from "@kalimahapps/vue-icons/${collection}";`;
});

const copyImport = function () {
	isCopied.value = true;
	copyText(getImportMessage.value);
};

onMounted(() => {
	const stickyTop = searchWrapper.value.getBoundingClientRect().top;

	/* Bind the scroll Event */
	window.addEventListener('scroll', e => {
		isSticky.value = window.scrollY >= stickyTop;
	});
});
</script>

<template>
	<section class="hero is-primary is-medium">
		<div class="hero-head">
			<nav class="navbar" id="navmenu">
				<div class="container">
					<div class="navbar-brand mr-5">
						<a class="navbar-item">
							<logo class="logo" />
						</a>
						<span class="navbar-burger" data-target="navmenu">
							<span></span>
							<span></span>
							<span></span>
						</span>
					</div>
					<div class="navbar-menu">
						<a class="navbar-item is-active">Icons</a>
						<a class="navbar-item"> Getting Started </a>
						<div class="navbar-end">
							<a class="navbar-item is-flex">
								<span class="icon">
									<component :is="AllIcons['BsGithub']" />
								</span>
								<span>GitHub</span>
							</a>
							<span class="navbar-item">
								<div
									class="dropdown"
									:class="{ 'is-active': showColorPicker === true }"
									ref="colorPickerElement"
								>
									<div class="dropdown-trigger" @click="showColorPicker = !showColorPicker">
										<button class="button" aria-haspopup="true" aria-controls="dropdown-menu2">
											<span class="icon is-small">
												<IoOutlineEyedrop :color="currentIconColor" />
											</span>
										</button>
									</div>
									<div class="dropdown-menu" id="dropdown-menu2" role="menu">
										<div class="dropdown-content">
											<div class="dropdown-item color-boxes-container">
												<span
													class="color-box"
													v-for="(color, colorIndex) in colors"
													:style="{ 'background-color': color }"
													@click="setIconColor(colorIndex)"
												></span>
											</div>
										</div>
									</div>
								</div>
							</span>
						</div>
					</div>
				</div>
			</nav>
		</div>

		<div class="hero-body">
			<div class="container has-text-centered">
				<p class="title">Better icon system for vue!</p>
				<p class="subtitle">
					A collection of popular icon fonts in svg format to include in your next vue project
					easily
				</p>
			</div>
		</div>

		<div class="hero-foot" :class="{ fixed: isSticky }" ref="searchWrapper">
			<div class="container">
				<div class="search-box-container columns">
					<div class="field m-0 column is-half">
						<div class="search-input-wrapper control has-icons-left">
							<input
								class="input"
								type="email"
								:placeholder="`Search ${totalResults} Icons ...`"
								v-model="keywords"
							/>
							<span class="icon is-small is-left">
								<FaMagnifyingGlass />
							</span>
						</div>
					</div>
					<div class="divider is-vertical is-left column is-flex-grow-0"></div>
					<div class="collection-tags tags column">
						<span
							class="collection tag"
							@click="setIconCollection('all')"
							:class="{ 'is-link': currentCollection.length === 0 }"
							>All</span
						>
						<span
							class="collection tag"
							:class="{
								'is-link':
									currentCollection.includes(collection.group) || currentCollection.length === 0
							}"
							v-for="(collection, collectionIndex) in iconsCollectionsTags"
							@click="setIconCollection(collection.group)"
						>
							{{ collection.name }}
						</span>
					</div>
				</div>
			</div>
		</div>
	</section>

	<div
		class="icons-container container my-6 py-4"
		ref="currentIconElement"
		:style="{ color: currentIconColor }"
	>
		<div
			class="icon-wrapper p-2"
			v-for="(icon, iconIndex) in currentIconsSet"
			:key="`icon-${iconIndex}`"
			@click="displayIcon(iconIndex)"
			ref="iconElement"
		>
			<component :is="AllIcons[icon]" :key="`icon-${iconIndex}`" />
		</div>
	</div>
	<div class="container my-6 is-flex is-justify-content-center">
		<button class="button is-info" v-if="totalPages > currentPage" @click="currentPage += 1">
			<span v-if="currentPage + 1 === totalPages">Load Last Page</span>
			<span v-else>Load page {{ currentPage + 1 }} of {{ totalPages }}</span>
		</button>
	</div>
	<div id="current-icon-container" v-if="currentIconIndex !== -1">
		<section class="container p-5">
			<div class="columns">
				<div class="icon-copy column is-half">
					<div class="block has-text-weight-bold">{{ currentIcon }}</div>
					<div class="icon-import p-2 is-flex is-align-items-center">
						{{ getImportMessage }}
						<button
							class="button ml-auto"
							:class="{
								'is-info': isCopied === false,
								'is-success': isCopied === true
							}"
							@click="copyImport"
						>
							<span v-if="isCopied === true">Copied!</span>
							<span v-else>Copy</span>
						</button>
					</div>
				</div>
				<div class="divider is-vertical is-left column is-flex-grow-0"></div>
				<div class="icon-sizes is-flex is-justify-content-center column">
					<div
						v-for="(size, sizeIndex) in [5, 4, 3, 2, 1]"
						class="icon-size-single mx-4 is-flex is-align-items-flex-end p-3"
					>
						<component
							:is="AllIcons[currentIcon]"
							:height="`${size}em`"
							:width="`${size}em`"
							:key="`size-${sizeIndex}`"
							:color="currentIconColor"
						/>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<style lang="scss">
@import './style/bulma-variables';
@import '~bulma/sass/utilities/_all.sass';
@import '~bulma/bulma';
@import '~@creativebulma/bulma-divider';
#app {
	padding-bottom: 12rem;
	background-color: #f1f1f1;
}

.navbar-menu {
	.navbar-item {
		transition: all 0.2s;
	}
	.divider.is-vertical::after {
		margin-bottom: 10px;
		margin-top: 10px;
	}

	.dropdown-menu {
		left: initial;
		right: 0;
	}
}

.logo {
	height: 50px;
	width: 50px;

	.side {
		fill: white;
	}
	.dot {
		fill: white;
	}
}
.fixed {
	position: fixed;
	top: 0;
	width: 100%;
	z-index: 5;
	transform: translateY(0) !important;

	.container {
		background-color: white;
	}

	.search-box-container {
		margin: 0;
	}
}

.color-boxes-container {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-gap: 1em;

	.color-box {
		border-radius: 5px;
		height: 2em;
		cursor: pointer;
	}
}
.hero-foot {
	transform: translateY(50%);

	.search-box-container {
		background-color: white;
		box-shadow: 0 6px 18px 0 rgba(0, 35, 90, 0.08), 0 0 2px 0 rgba(0, 35, 90, 0.06);

		.search-input-wrapper {
			height: 100%;

			.icon {
				top: 50%;
				transform: translateY(-50%);
				transition: all 0.3s;
			}
			input {
				border: 0px solid;
				border-radius: 0;
				box-shadow: unset;
				height: 100%;

				&:focus {
					border: 0px solid;
				}
			}
		}
	}

	.collection-tags {
		.tag {
			cursor: pointer;
			transition: all 0.2s;
		}
	}
}

.group-title {
	border-bottom: 3px solid;
	font-size: 2em;
}

.icons-container {
	font-size: 1.7rem;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(3em, 1fr));
	grid-gap: 0.2em;

	.icon-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		transition: all 0.2s;
		border-radius: 3px;
		cursor: pointer;
		height: 3em;
		svg {
			transition: all 0.2s;
		}

		&:hover {
			background-color: rgba(0, 35, 90, 0.06);
			svg {
				transform: scale(1.5);
			}
		}
	}
}

#current-icon-container {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;

	.container {
		box-shadow: 0 6px 18px 0 rgba(0, 35, 90, 0.08), 0 0 2px 0 rgba(0, 35, 90, 0.06);
		border-radius: 2px;
		background-color: white;

		.icon-sizes {
			.icon-size-single {
				border-radius: 2px;
			}
		}
		.icon-import {
			background-color: rgba(0, 35, 90, 0.08);
			border-radius: 4px;
		}
	}
}
</style>
