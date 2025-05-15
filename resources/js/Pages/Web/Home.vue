<template>
    <Head>
        <title>{{ $t("Home") }}</title>
    </Head>
    <div class="w-full flex flex-col py-8 space-y-4">
        <div class="mx-auto w-full max-w-7xl flex flex-col">
            <!-- top products -->
            <TopProducts />
        </div>
        <div
            v-if="$page.props.app.env === 'local'"
            class="mx-auto w-full max-w-7xl"
        >
            <VarDump :data="data" />
        </div>
    </div>
</template>
<script setup>
import TopProducts from "@/Components/Ecommerce/TopProducts.vue";
import VarDump from "@/Shared/VarDump.vue";

const props = defineProps({
    data: {
        type: Object,
    },
});
</script>
