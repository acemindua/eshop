<template>
    <MainLayout>
        <!-- section -->
        <section>
            <h1 class="hidden">{{ title }}</h1>
            <div class="w-full flex flex-col py-8 space-y-4">
                <div class="mx-auto w-full max-w-7xl flex flex-col">
                    <!-- top products -->
                    <TopProducts />
                </div>
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
import TopProducts from "@/Components/Themes/Ecommerce/TopProducts.vue";
import { usePage } from "@inertiajs/vue3";
import VarDump from "@/Shared/VarDump.vue";

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
