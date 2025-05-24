<template>
    <div v-if="!loading">
        <h3 class="uppercase font-semibold">
            {{ $t("The best products") }}
        </h3>

        <div class="grid grid-cols-4 gap-4">
            <ProductCard v-for="item in items" :key="item.id" :data="item" />
        </div>
    </div>

    <div v-else>
        <div class="bg-white/50 absolute top-0 left-0 w-full h-screen"></div>
    </div>
</template>

<script setup>
import useApiResourceService from "@/Composables/useApiResourceService";
import { ref, onBeforeMount } from "vue";
import ProductCard from "./ProductCard.vue";

const items = ref([]);

onBeforeMount(() => {
    getItems();
});

// API-сервіс
const { loading, errorsRequests, fetchData } = useApiResourceService();

const getItems = async () => {
    const url = new URL(route("products.index"));
    // url.searchParams.append("attribute_id", props.attributeId);
    const response = await fetchData(url.toString());
    items.value = response.data;
};
</script>
