<script setup>
import { IconPhotoScan } from "@tabler/icons-vue";

const props = defineProps({
    src: {
        type: String,
    },
    configs: {
        type: Object,
        default: {
            width: "50px",
            height: "50px",
        },
    },
});
</script>

<template>
    <div
        v-if="src"
        class="rounded-lg mx-auto bg-white shadow"
        :style="{
            // Правильне об'єднання властивостей розмірів
            width: configs.width,
            height: configs.height,

            // Правильне формування CSS-функції url()
            backgroundImage: `url('${src}')`,

            // Додаткові стилі для відображення фонового зображення
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        }"
    ></div>

    <div
        v-else
        class="flex items-center justify-center rounded-lg mx-auto text-gray-400 bg-white shadow"
        :style="{ width: configs.width, height: configs.height }"
    >
        <IconPhotoScan stroke="{2}" />
    </div>
</template>
