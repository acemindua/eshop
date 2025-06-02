<template>
    <div>
        <div
            class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 w-full"
        >
            <ProductCard
                v-for="item in items"
                :key="item.id"
                :data="item"
                @add-to-cart="handleAddToCart"
            />
        </div>
    </div>
</template>
<script setup>
import { ref, onBeforeMount } from "vue";
import useApiResourceService from "@/Composables/useApiResourceService";
import ProductCard from "./ProductCard.vue";
import { cartStore } from "@/Stores/cart";
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

const handleAddToCart = async (id) => {
    cartStore.addToCart({
        id: id,
        quantity: 1,
    });
};
</script>
