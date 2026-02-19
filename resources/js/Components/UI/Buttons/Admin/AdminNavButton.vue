<template>
    <Link
        :href="href"
        class="inline-block text-gray-600 dark:text-slate-400 rounded-lg p-2"
        :class="
            active
                ? 'text-white dark:text-slate-50 bg-brand rounded-lg shadow-inner'
                : ''
        "
    >
        <slot
    /></Link>
</template>

<script setup>
defineProps({
    href: {
        type: String,
        required: true, // Href should typically be required for a Link
    },
    active: {
        type: Boolean,
        default: false,
    },
});
</script>
