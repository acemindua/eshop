<template>
    <Layout>
        <div>{{ $t("Home") }}</div>

        <div class="text-xs text-gray-800 bg-slate-100 border p-4 rounded-lg">
            <pre>
                {{ data }}
            </pre>
        </div>
    </Layout>
</template>

<script setup>
import Layout from "@/Layouts/Public/DefaultLayout.vue";

defineProps({
    data: {
        type: Object,
    },
});
</script>
