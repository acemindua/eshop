<template>
    <div
        class="overflow-hidden rounded-lg shadow-sm bg-white flex items-center justify-center"
        :style="containerStyles"
    >
        <img
            v-if="displayImageUrl"
            :src="displayImageUrl"
            :alt="imageAltText"
            class="w-[80%] h-auto mx-auto object-cover"
        />
        <div v-else class="text-gray-400 text-sm text-center">
            <IconPhoto :stroke="2" :size="iconSize" />
        </div>
    </div>
</template>

<script setup>
import { IconPhoto } from "@tabler/icons-vue";
import { ref, computed, watch } from "vue";

const props = defineProps({
    config: {
        type: Object,
        default: () => ({ width: 44, height: 44 }),
    },
    /**
     * Image object containing 'url' and 'preview' properties.
     * Renamed from 'images' to 'image' as per your data structure.
     * @type {Object}
     * @property {string} url - The full URL of the image.
     * @property {string} preview - The URL of the preview image (preferable for smaller sizes).
     */
    image: {
        type: Object,
        default: null, // Default to null for no image
    },
    // Optional: if product data is needed for alt text or other purposes
    product: {
        type: Object,
        default: null,
    },
});

// --- Computed Properties ---

const containerStyles = computed(() => ({
    width: `${props.config.width}px`,
    height: `${props.config.height}px`,
}));

const iconSize = computed(() => props.config.width / 2);

const imageAltText = computed(() => {
    // Use product name first if available, otherwise image name, or a generic text
    return props.product?.name || props.image?.name || "Product image";
});

// --- Reactive State ---

const displayImageUrl = ref(null);

// --- Watcher to update displayImageUrl when props.image changes ---
watch(
    () => props.image,
    (newImage) => {
        if (newImage && newImage.preview) {
            displayImageUrl.value = newImage.preview;
        } else if (newImage && newImage.url) {
            displayImageUrl.value = newImage.url;
        } else {
            displayImageUrl.value = null; // No image available
        }
    },
    { immediate: true }
); // Run immediately on component mount
</script>

<style scoped>
/* Add any specific styles if needed */
</style>
