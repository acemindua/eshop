<script setup>
import { Link } from "@inertiajs/vue3";
import { computed } from "vue";

const props = defineProps({
    as: {
        type: String,
        default: "button",
    },
    action: {
        type: String,
    },
});

const actionClasses = computed(() => {
    switch (props.action) {
        case "add":
            return "bg-green-50 text-green-700 border-green-200 hover:bg-green-600 hover:text-white hover:border-green-600";
        case "save":
            return "bg-blue-50 text-blue-700 border-blue-200 hover:bg-indigo-600 hover:text-white hover:border-indigo-600";
        case "delete":
            return "bg-red-50 text-red-700 border-red-200 hover:bg-red-600 hover:text-white hover:border-red-600";
        case "cancel":
            return "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100 hover:text-gray-800";
        default:
            return "bg-white text-gray-700 border-gray-300 hover:bg-gray-50";
    }
});
</script>

<template>
    <component
        :is="as === 'Link' ? Link : 'button'"
        v-bind="$attrs"
        :class="actionClasses"
        class="inline-flex items-center justify-center gap-1.5 rounded-lg border px-3 py-1.5 text-[11px] font-bold uppercase tracking-tight shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed"
    >
        <!-- Іконка -->
        <div
            v-if="$slots.icon"
            class="shrink-0 opacity-90 transition-transform group-hover:scale-110"
        >
            <slot name="icon" />
        </div>

        <!-- Текст -->
        <span class="leading-none">
            <slot />
        </span>
    </component>
</template>

<style scoped>
/* Додаткова плавність для ховер-ефектів */
component {
    -webkit-font-smoothing: antialiased;
}
</style>
