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
        case "add":
            return "bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700";
        case "save":
            return "bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700";
        case "delete":
            return "bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700";
        default:
            return "bg-slate-700 text-white";
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
