<template>
    <div>
        <h3 class="uppercase font-semibold">
            {{ $t("The best products") }}
        </h3>

        <div
            class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 relative"
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
