<template>
    <Layout>
        <div class="grid grid-cols-4 w-full gap-1">
            <div v-for="item in items" :key="item.id" class="relative">
                <CardProduct :product="item" />
            </div>
        </div>

        <section
            v-if="$page.props.app.env === 'local'"
            class="mx-auto max-w-7xl"
        >
            <VarDump :data="data" />
        </section>
    </Layout>
</template>

<script setup>
import { computed, ref } from "vue";
import Layout from "@/Layouts/MainLayout.vue";
import CardProduct from "@/Shared/Commerce/CardProduct.vue";
import VarDump from "@/Shared/VarDump.vue";

const props = defineProps({
    data: {
        type: Object,
    },
});

const items = computed(() => {
    return props.data.items || [];
});
</script>
