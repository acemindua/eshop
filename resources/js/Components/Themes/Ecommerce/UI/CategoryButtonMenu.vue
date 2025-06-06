<template>
    <button
        type="button"
        class="bg-green-600 w-full text-white border-2 border-green-600 font-semibold text-sm px-4 py-2 rounded-lg inline-flex items-center space-x-2"
    >
        <component
            :is="open ? IconX : IconLayoutGrid"
            :stroke="2"
            class="duration-200"
        />
        <span>{{ $t("Каталог") }}</span>
    </button>
</template>

<script setup>
import { IconLayoutGrid, IconX } from "@tabler/icons-vue";
import { defineProps } from "vue"; // Явно імпортуємо defineProps

defineProps({
    open: {
        type: Boolean,
        default: false, // Змінено на false, оскільки IconLayoutGrid відображається за замовчуванням
    },
});
</script>
