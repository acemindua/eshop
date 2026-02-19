<template>
    <Head>
        <title>Результати пошуку для: {{ filters.q }}</title>
    </Head>
    <h2 class="font-semibold text-xl">По запиту «{{ filters.q }}» знайшлося</h2>
</template>
<script setup>
import Layout from "@/Layouts/Public/Default/IndexLayout.vue";

defineOptions({
    layout: Layout,
});

defineProps({
    filters: Object,
});
</script>
