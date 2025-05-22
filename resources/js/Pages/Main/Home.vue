<template>
    <MainLayout>
        <Head>
            <title>{{ $t("Home") }}</title>
        </Head>
        <div class="w-full flex flex-col py-8 space-y-4">
            <div class="mx-auto w-full max-w-7xl flex flex-col">
                <!-- top products -->
                <TopProducts />
            </div>
        </div>
    </MainLayout>
</template>
<script setup>
import MainLayout from "@/Layouts/MainLayout.vue";
import TopProducts from "@/Components/Themes/Ecommerce/TopProducts.vue";

const props = defineProps({
    data: {
        type: Object,
    },
});
</script>
