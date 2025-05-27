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

<script setup>
import { IconPhoto } from "@tabler/icons-vue";
import { ref, computed } from "vue";

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

// Preview (reactive)
const previewRef = ref("");
const iconSize = computed(() => props.config.width / 2);
</script>
