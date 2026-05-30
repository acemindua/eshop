<template>
    <Link
        :href="href"
        :class="[
            'inline-block p-2 rounded-lg transition-all duration-200',
            active
                ? 'text-brand bg-slate-900/50 dark:bg-slate-800 shadow-inner'
                : 'text-gray-100 dark:text-slate-400 hover:bg-slate-900 dark:hover:bg-slate-800/50',
        ]"
    >
        <slot />
    </Link>
</template>

<script setup>
import { Link } from "@inertiajs/vue3";

defineProps({
    href: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        default: false,
    },
});
</script>
