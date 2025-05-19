<script setup>
import { computed, ref, watch, onMounted } from "vue";
import { IconPhoto } from "@tabler/icons-vue";

// Props
const props = defineProps({
    preview: {
        type: String,
        default: "",
    },
    config: {
        type: Object,
        default: () => ({ width: 44, height: 44 }),
    },
    data: {
        type: Object,
        default: () => ({ images: [], variants: [] }),
    },
});

// Styles for image container
const styles = computed(() => ({
    width: `${props.config.width}px`,
    height: `${props.config.height}px`,
}));

// Об'єднані зображення: продукт + всі варіанти
const allImages = computed(() => {
    const main = props.data.images || [];
    const variants = props.data.variants || [];

    const variantImages = variants.flatMap((v) => v.images || []);
    return [...main, ...variantImages];
});

// Preview (reactive)
const previewRef = ref("");

// Update previewRef від props.preview
watch(
    () => props.preview,
    (newVal) => {
        previewRef.value = newVal || "";
    },
    { immediate: true }
);

// Якщо preview не задано — беремо перший із зображень
onMounted(() => {
    if (!previewRef.value && allImages.value.length > 0) {
        previewRef.value =
            allImages.value[0].preview || allImages.value[0].url || "";
    }
});

const iconSize = computed(() => props.config.width / 2);
</script>

<template>
    <div
        class="overflow-hidden rounded-lg shadow-sm bg-white flex items-center justify-center"
        :style="styles"
    >
        <img
            v-if="previewRef"
            :src="previewRef"
            alt="Preview image"
            class="w-[80%] h-auto mx-auto object-cover"
        />
        <div v-else class="text-gray-400 text-sm text-center">
            <IconPhoto :stroke="2" :size="iconSize" />
        </div>
    </div>
</template>
