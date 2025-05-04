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
        default: () => ({ images: [] }),
    },
});

// Preview state (decoupled from readonly prop)
const previewRef = ref(props.preview);

// Styles for image container
const styles = computed(() => ({
    width: `${props.config.width}px`,
    height: `${props.config.height}px`,
}));

// Extracted image array
const images = computed(() => props.data.images || []);

// Auto-update preview from data if no external preview passed
watch(
    () => props.preview,
    () => {
        previewRef.value = props.preview;
    },
    { immediate: true }
);

onMounted(() => {
    if (!previewRef.value && images.value.length > 0) {
        previewRef.value = images.value[0]?.url || "";
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
            <IconPhoto stroke="{2}" :size="iconSize" />
        </div>
    </div>
</template>
