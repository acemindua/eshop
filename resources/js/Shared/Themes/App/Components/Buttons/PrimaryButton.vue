<script setup>
import { Link } from "@inertiajs/vue3";

const props = defineProps({
    as: {
        type: String,
        default: "button", // можна 'button' або 'Link'
    },
});
</script>

<template>
    <component
        :is="as === 'Link' ? Link : 'button'"
        v-bind="$attrs"
        class="bg-blue-600 hover:bg-blue-500 text-slate-50 font-semibold text-sm px-6 py-2 rounded-lg inline-flex items-center space-x-2 transition duration-150 ease-in-out"
    >
        <span>
            <slot name="icon" />
        </span>
        <span>
            <slot />
        </span>
    </component>
</template>
