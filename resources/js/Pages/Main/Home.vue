<template>
    <MainLayout>
        <h1 class="text-3xl font-extrabold sr-only">
            {{ title }}
        </h1>
        <!-- section -->
        <section>
            <div class="container mx-auto px-4">
                <ProductsGrid :category-id="null" />
            </div>
        </section>
        <!-- About -->
        <section></section>
        <section v-if="$page.props.app.env === 'local'">
            <VarDump :data="data" />
        </section>
    </MainLayout>
</template>
<script setup>
import { computed } from "vue";
import { useHead } from "@vueuse/head";
import { generateHeadMeta } from "@/helpers";
import MainLayout from "@/Layouts/MainLayout.vue";
import { usePage } from "@inertiajs/vue3";
import VarDump from "@/Shared/VarDump.vue";
import ProductsGrid from "@/Components/Themes/Ecommerce/ProductsGrid.vue";

const props = defineProps({
    data: Object,
});

const title = props.data.seo.meta_title ?? props.data.seo.title;

const headMeta = computed(() =>
    generateHeadMeta(props.data.seo, usePage().props.app.name)
);
//
useHead(headMeta);
</script>
