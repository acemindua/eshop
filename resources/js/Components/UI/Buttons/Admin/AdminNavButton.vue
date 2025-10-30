<template>
    <Link
        :href="href"
        class="inline-block border rounded-lg p-1"
        :class="active ? 'border-slate-400' : ''"
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
