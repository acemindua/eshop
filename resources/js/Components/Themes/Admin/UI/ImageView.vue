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
import { ref, computed, watch } from "vue"; // Use 'watch' instead of 'watchEffect' for specific dependencies

// Props
const props = defineProps({
    /**
     * Configuration for the image container size.
     * @type {Object}
     * @property {number} width - Width in pixels.
     * @property {number} height - Height in pixels.
     */
    config: {
        type: Object,
        default: () => ({ width: 44, height: 44 }),
    },
    /**
     * The main product data object, expected to contain 'images' array.
     * @type {Object}
     * @property {Object} data - Contains product details, including 'images' array.
     * @property {Array<Object>} data.images - Array of image objects.
     */
    productData: {
        // Renamed from 'item' for clarity
        type: Object,
        required: true,
    },
    /**
     * Optional product variant data object, expected to contain 'images' array.
     * If provided, variant images take precedence.
     * @type {Object}
     * @property {Object} data - Contains variant details, including 'images' array.
     * @property {Array<Object>} [data.images] - Optional array of image objects specific to the variant.
     */
    variantData: {
        // Renamed from 'variant' for clarity
        type: Object,
        default: () => ({}),
    },
});

// --- Computed Properties ---

// Styles for the image container based on config prop
const containerStyles = computed(() => ({
    width: `${props.config.width}px`,
    height: `${props.config.height}px`,
}));

// Size for the placeholder icon, half of the container width
const iconSize = computed(() => props.config.width / 2);

// Image alt text for accessibility and SEO.
// Uses product title, falling back to a generic description.
const imageAltText = computed(() => {
    return props.productData?.title || "Product image";
});

// --- Reactive State ---

// The URL of the image that will actually be displayed
const displayImageUrl = ref(null);

// --- Functions ---

/**
 * Selects the most appropriate image URL based on variant preference and order.
 * Prioritizes variant images, then main product images. Prefers 'preview' URL, then 'url'.
 *
 * @param {Array<Object>} variantImages - Array of image objects specific to the variant.
 * @param {Array<Object>} mainProductImages - Array of image objects for the main product.
 * @returns {string|null} The URL of the selected image, or null if no images are available.
 */
const getPrioritizedImageUrl = (variantImages = [], mainProductImages = []) => {
    // Combine and sort images. Prioritize variant images if they exist.
    // Assuming 'order_column' for sorting; 1 is typically the primary image.
    const sortedVariantImages = [...variantImages].sort(
        (a, b) => a.order_column - b.order_column
    );
    const sortedMainProductImages = [...mainProductImages].sort(
        (a, b) => a.order_column - b.order_column
    );

    // Prioritize variant images first
    if (sortedVariantImages.length > 0) {
        return sortedVariantImages[0]?.preview || sortedVariantImages[0]?.url;
    }

    // Fallback to main product images
    if (sortedMainProductImages.length > 0) {
        return (
            sortedMainProductImages[0]?.preview ||
            sortedMainProductImages[0]?.url
        );
    }

    return null; // No images found
};

// --- Watchers ---

// Watch for changes in productData or variantData to update the displayed image
watch(
    [() => props.productData, () => props.variantData],
    ([newProductData, newVariantData]) => {
        const variantImages = newVariantData?.data?.images || [];
        const mainProductImages = newProductData?.data?.images || [];

        displayImageUrl.value = getPrioritizedImageUrl(
            variantImages,
            mainProductImages
        );
    },
    { immediate: true, deep: true } // Run immediately on component mount, and deep watch nested objects
);
</script>

<style scoped>
/* Add any specific styles if needed */
/* .w-\[80\%\] and .h-auto are Tailwind classes, assuming you have Tailwind setup */
</style>
