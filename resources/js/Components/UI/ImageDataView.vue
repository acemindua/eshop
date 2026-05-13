<script setup>
import { IconPhotoScan } from "@tabler/icons-vue";

/**
 * Component Props
 * @property {String} src - URL of the image
 * @property {Object} configs - CSS dimensions (width, height)
 */
const props = defineProps({
    src: {
        type: String,
        default: null
    },
    configs: {
        type: Object,
        default: () => ({
            width: "50px",
            height: "50px",
        }),
    },
});
</script>

<template>
    <!-- Render Image as Background for better 'cover' control -->
    <div
        v-if="src"
        class="rounded-lg mx-auto bg-slate-200 dark:bg-slate-800 shadow-sm overflow-hidden"
        :style="{
            width: configs.width,
            height: configs.height,
            backgroundImage: `url('${src}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        }"
    ></div>

    <!-- Placeholder when no source is provided -->
    <div
        v-else
        class="flex items-center justify-center rounded-lg mx-auto text-slate-400 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm"
        :style="{ width: configs.width, height: configs.height }"
    >
        <IconPhotoScan :stroke="1.5" size="20" />
    </div>
</template>

<style scoped>
/* Додаткові стилі не потрібні, використовуємо Tailwind */
</style>