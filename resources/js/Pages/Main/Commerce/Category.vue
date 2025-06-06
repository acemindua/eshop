<template>
    <MainLayout>
        <h1 class="text-3xl font-extrabold text-gray-900 mb-6 sr-only">
            {{ title }}
        </h1>
        <div class="w-full max-w-7xl mx-auto">
            <section>
                <div class="w-full max-w-7xl mx-auto py-4">
                    <ProductsGrid :category-id="category.id" />
                </div>
            </section>
            <section>
                <div v-html="category.content" />
            </section>
            <section v-if="$page.props.app.env === 'local'">
                <VarDump :data="category" />
            </section>
        </div>
    </MainLayout>
</template>

<script setup>
import { computed } from "vue";
import { usePage } from "@inertiajs/vue3";
import { useHead } from "@vueuse/head";
import { generateHeadMeta } from "@/helpers";
import MainLayout from "@/Layouts/MainLayout.vue";
import VarDump from "@/Shared/VarDump.vue";
import ProductsGrid from "@/Components/Themes/Ecommerce/ProductsGrid.vue";

const { props } = usePage();
const category = computed(() => props?.category || {});

const title = category.value.meta_title || category.value.title;
const headMeta = computed(() =>
    generateHeadMeta(category.value, props.app.name)
);
//
useHead(headMeta);
</script>
