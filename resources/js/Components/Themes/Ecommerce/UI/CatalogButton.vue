<template>
    <button
        type="button"
        class="inline-flex w-full items-center space-x-3 text-white bg-green-500 hover:bg-gray-800 border-0 rounded-md py-2 px-4 transition-colors duration-200"
    >
        <component
            :is="open ? IconX : IconCategory"
            :stroke="2"
            class="duration-200 text-white"
        />
        <span> {{ $t("system.catalog") }}</span>
    </button>
</template>

<script setup>
import { IconCategory, IconX } from "@tabler/icons-vue";
defineProps({
    open: {
        type: Boolean,
        default: false, // Змінено на false, оскільки IconLayoutGrid відображається за замовчуванням
    },
});
</script>
