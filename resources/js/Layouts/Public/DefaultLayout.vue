<template>
    <component :is="layout">
        <slot />
    </component>
</template>

<script setup>
import { computed } from "vue";
import Layout from "@/Layouts/Public/Landing/Layout.vue";

const layout = computed(() => {
    return Layout;
});
</script>
