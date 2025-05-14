<!-- Shared/Themes/App/Components/Buttons/SecondaryButton -->
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
        v-bind="$attrs"
        :is="as === 'Link' ? Link : 'button'"
        class="bg-white hover:bg-slate-50 text-gray-700 border text-sm font-semibold px-4 py-2 rounded-lg inline-flex items-center space-x-2 transition duration-150 ease-in-out"
    >
        <span>
            <slot name="icon" />
        </span>
        <span>
            <slot />
        </span>
    </component>
</template>
