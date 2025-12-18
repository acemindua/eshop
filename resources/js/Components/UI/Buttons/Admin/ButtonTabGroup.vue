<template>
    <button
        type="button"
        class="text-sm relative font-medium focus:outline-none p-2 mr-2 px-2 border-b-2 duration-150 transition -bottom-[1px]"
        :class="[
            selected
                ? 'text-indigo-600 border-indigo-600'
                : 'text-gray-500  border-transparent hover:border-gray-300 hover:text-gray-800',
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
