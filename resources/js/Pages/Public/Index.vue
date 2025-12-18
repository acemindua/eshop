<template>
    <Head :title="$t('Home')" />
    <div class="flex flex-col space-y-2 py-4">
        <section>
            <VarDump :data="data" />
        </section>
    </div>
</template>

<script setup>
import Layout from "@/Layouts/Public/DefaultLayout.vue";
import VarDump from "@/Shared/VarDump.vue";

defineOptions({
    layout: Layout,
});
defineProps({
    data: {
        type: Object,
    },
});
</script>
