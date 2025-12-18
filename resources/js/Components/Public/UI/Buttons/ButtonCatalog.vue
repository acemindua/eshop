<script setup>
import { IconCategory, IconX } from "@tabler/icons-vue";

defineProps({
    open: {
        type: Boolean,
        default: false,
    },
});
</script>

<template>
    <button
        type="button"
        class="border p-2 px-4 flex items-center space-x-2 rounded-lg hover:bg-gray-50 duration-150 transition-colors"
    >
        <component
            :is="open ? IconX : IconCategory"
            :stroke="2"
            class="duration-200"
        />
        <span class="font-semibold">{{ $t("Catalog") }}</span>
    </button>
</template>
