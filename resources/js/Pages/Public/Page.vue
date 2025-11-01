<template>
    <Layout>
        <h1 class="text-xl text-gray-800 font-semibold">{{ $t("Home") }}</h1>

        <section>
            <VarDump :data="data" />
        </section>
    </Layout>
</template>

<script setup>
import Layout from "@/Layouts/Public/DefaultLayout.vue";
import VarDump from "@/Shared/VarDump.vue";

defineProps({
    data: {
        type: Object,
    },
});
</script>
