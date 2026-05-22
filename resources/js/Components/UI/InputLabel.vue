<script setup>
defineProps({
    value: {
        type: String,
    },
    required: {
        type: Boolean,
        default: false,
    },
});
</script>

<template>
    <label class="block text-xs font-semibold text-gray-600 mb-1.5">
        <span v-if="value">{{ value }}</span>
        <span v-else><slot /></span>
        <span
            v-if="required"
            class="text-red-500 font-bold ml-0.5"
            title="Required field"
            >*</span
        >
    </label>
</template>
