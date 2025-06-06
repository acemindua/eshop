<template>
    <div>
        <ul class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            <li v-if="isLoading" v-for="n in 8" :key="n">
                <ProductCartPlaceholder />
            </li>
            <li v-else v-for="product in items" :key="product.id">
                <ProductCard
                    :product="product"
                    :ids="itemsIds"
                    :reviews-data="product.reviews"
                    @add-to-cart="storeCart"
                />
            </li>
        </ul>
    </div>

    <div>
        <PaginationControls
            :pagination-meta="pagination.meta"
            :pagination-links="pagination.links"
            :loading="isLoading"
            @go-to-page="handleGoToPage"
        />
    </div>

    <section v-if="$page.props.app.env === 'local'">
        <VarDump :data="cartStore.state.itemsIds" />
    </section>
</template>

<script setup>
import { onMounted, ref, watch, inject, computed } from "vue";
import { router } from "@inertiajs/vue3";
import { productStore } from "@/Stores/productStore";
import VarDump from "@/Shared/VarDump.vue";
import ProductCard from "./ProductCard.vue";
import PaginationControls from "../PaginationControls.vue";
import ProductCartPlaceholder from "./ProductCartPlaceholder.vue";

const props = defineProps({
    categoryId: Number,
});

const cartStore = inject("cartStore");

const currentPage = ref(
    parseInt(new URLSearchParams(window.location.search).get("page")) || 1
);

const items = computed(() => productStore.state.items || []);
const pagination = computed(() => productStore.state.pagination || {});
const isLoading = computed(() => productStore.state.isLoading || false);
const itemsIds = computed(() => cartStore.state.itemsIds || []);

const loadProducts = () => {
    const params = {
        page: currentPage.value,
        per_page: pagination.value.perPage || 12,
    };

    if (props.categoryId) params.category_id = props.categoryId;
    productStore.fetchItems(params);
};

onMounted(() => {
    loadProducts();
    cartStore.fetchCart(); // або fetchItemsIds()
});
watch(currentPage, loadProducts);

const handleGoToPage = (pageNumber) => {
    currentPage.value = pageNumber;
    router.get(
        window.location.pathname,
        currentPage.value > 1 ? { page: currentPage.value } : {},
        {
            preserveScroll: false,
            preserveState: true,
            replace: true,
        }
    );
};

const storeCart = (product) => {
    cartStore.addToCart(product);
};
</script>
