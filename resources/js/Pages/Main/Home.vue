<template>
    <div>
        <section class="w-full flex flex-col py-8 space-y-4">
            <div class="mx-auto w-full max-w-7xl flex flex-col">
                <!-- top products -->
                <TopProducts />
            </div>
        </section>

        <section v-if="$page.props.app.env === 'local'">
            <VarDump :data="data" />
        </section>
    </div>
</template>
<script setup>
import { computed } from "vue";
import { usePage } from "@inertiajs/vue3";
import { useHead } from "@vueuse/head";
import { generateHeadMeta } from "@/helpers";
import MainLayout from "@/Layouts/MainLayout.vue";
import TopProducts from "@/Components/Themes/Ecommerce/TopProducts.vue";
import VarDump from "@/Shared/VarDump.vue";

defineOptions({ layout: MainLayout });

const props = defineProps({
    data: {
        type: Object,
    },
});

const page = usePage();

const headMeta = computed(() =>
    generateHeadMeta(page.props.seo, page.props.app.name, page.props.lang.keys)
);
//
useHead(headMeta);
</script>
