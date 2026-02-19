<script setup>
import { Head, usePage } from "@inertiajs/vue3";
import { computed } from "vue";

const page = usePage();

const schemas = computed(() => {
    const data = page.props.seo?.schema || [];
    // Повертаємо масив JSON-рядків
    return (Array.isArray(data) ? data : [data]).map((s) => JSON.stringify(s));
});
</script>

<template>
    <Head>
        <component
            is="script"
            v-for="(jsonStr, index) in schemas"
            :key="index"
            type="application/ld+json"
            v-html="jsonStr"
        />
    </Head>
</template>
