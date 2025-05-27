<template>
    <button
        type="button"
        class="text-sm font-medium focus:outline-none p-2 mr-2 px-2"
        :class="[
            selected
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600',
            hasError && !selected
                ? 'border-b-2 border-red-500 text-red-600'
                : '',
        ]"
    >
        <slot />
    </button>
</template>

<script setup>
defineProps({
    selected: Boolean,
    hasError: Boolean,
});
</script>
