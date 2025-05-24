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

        <section v-if="$page.props.app.env === 'local'">
            <VarDump :data="data" />
        </section>
    </MainLayout>
</template>
<script setup>
import MainLayout from "@/Layouts/MainLayout.vue";
import TopProducts from "@/Components/Themes/Ecommerce/TopProducts.vue";
import VarDump from "@/Shared/VarDump.vue";

const props = defineProps({
    data: {
        type: Object,
    },
});
</script>
