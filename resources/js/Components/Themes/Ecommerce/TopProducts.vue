<template>
    <div>
        <div
            class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[1px] border w-full bg-gray-200"
        >
            <ProductCard v-for="item in items" :key="item.id" :data="item" />
        </div>
    </div>
</template>
<script setup>
import { ref, onBeforeMount } from "vue";
import useApiResourceService from "@/Composables/useApiResourceService";
import ProductCard from "./ProductCard.vue";

const items = ref([]);

onBeforeMount(() => {
    getItems();
});

// API-сервіс
const { fetchData } = useApiResourceService();

const getItems = async () => {
    const url = new URL(route("products.index"));
    // url.searchParams.append("attribute_id", props.attributeId);
    const response = await fetchData(url.toString());
    items.value = response.data;
};
</script>
