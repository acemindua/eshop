<template>
    <div v-if="products.data?.length">
        <div class="grid grid-cols-2 md:grid-cols-10 gap-2">
            <div class="col-span-full bg-white p-12">
                <h1 class="font-semibold text-2xl">Товари</h1>
            </div>
            <div
                v-for="product in products.data"
                :key="product.id"
                class="col-span-2 md:col-span-2 bg-white"
            >
                <ProductCard :data="product" />
            </div>

            <div
                class="bg-gray-100 rounded-lg p-12 overflow-hidden col-span-full"
            >
                <pre>
            {{ products }}
        </pre
                >
            </div>
        </div>
    </div>
</template>

<script setup>
import ProductCard from "@/Components/Public/Commerce/ProductCard.vue";
import Layout from "@/Layouts/Public/DefaultLayout.vue";

defineOptions({ layout: Layout });
defineProps({
    products: Object,
});
</script>
