<script setup>
import { Link } from "@inertiajs/vue3";
import { computed } from "vue";

const props = defineProps({
    as: {
        type: String,
        default: "button", // можна 'button' або 'Link'
    },
    action: {
        type: String,
    },
});

const classes = computed(() => {
    switch (props.action) {
        default:
            return "bg-white border";
    }
});
</script>

<template>
    <component
        :is="as === 'Link' ? Link : 'button'"
        v-bind="$attrs"
        :class="classes"
        class="inline-flex items-center gap-2 rounded-md px-4 py-1 text-xs font-semibold uppercase tracking-widest text-gray-700 shadow-sm transition duration-150 ease-in-out"
    >
        <span>
            <slot name="icon" />
        </span>
        <span>
            <slot />
        </span>
    </component>
</template>
