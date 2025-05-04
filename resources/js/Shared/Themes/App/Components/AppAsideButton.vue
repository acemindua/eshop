<template>
    <Link :href="href" :class="classes">
        <slot />
    </Link>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
    href: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
    },
});

const classes = computed(() =>
    props.active
        ? "bg-blue-50 text-blue-700 hover:bg-blue-50 p-2 rounded-lg inline-flex items-center transition duration-150 ease-in-out"
        : "bg-white text-gray-500 hover:bg-gray-50 p-2 rounded-lg inline-flex items-center transition duration-150 ease-in-out"
);
</script>
