<script setup>
import { onMounted, ref, watch, inject, computed } from "vue";
import { router } from "@inertiajs/vue3";
import { productStore } from "@/Stores/productStore"; // Correct path to your product store
import VarDump from "@/Shared/VarDump.vue"; // Debugging component
import ProductCard from "./ProductCard.vue"; // Product card component
import PaginationControls from "../PaginationControls.vue"; // Pagination component
import ProductCartPlaceholder from "./ProductCartPlaceholder.vue"; // Loading placeholder

const props = defineProps({
    categoryId: Number,
});

// Inject the cartStore to access its state and actions
const cartStore = inject("cartStore");

// Reactive variable to keep track of the current page, initialized from URL or defaults to 1
const currentPage = ref(
    parseInt(new URLSearchParams(window.location.search).get("page")) || 1
);

// Computed properties to access state from productStore and cartStore
const items = computed(() => productStore.state.items || []);
const pagination = computed(() => productStore.state.pagination || {});
const isLoading = computed(() => productStore.state.isLoading || false);
const itemsIds = computed(() => cartStore.state.itemsIds || []); // Cart item IDs for checking if product is in cart

/**
 * Loads products based on current page and category.
 */
const loadProducts = () => {
    const params = {
        page: currentPage.value,
        per_page: pagination.value.per_page || 12, // Use `per_page` as per Laravel's default pagination meta
    };

    if (props.categoryId) {
        params.category_id = props.categoryId;
    }
    productStore.fetchItems(params);
};

// --- Lifecycle Hooks ---
onMounted(() => {
    loadProducts(); // Load products when component is mounted
    cartStore.fetchCart(); // Fetch cart items to update `itemsIds`
});

// --- Watchers ---
// Watch for changes in currentPage to re-load products
watch(currentPage, loadProducts);

/**
 * Handles pagination page changes.
 * Updates the current page and updates the URL via Inertia.
 * @param {number} pageNumber - The page number to navigate to.
 */
const handleGoToPage = (pageNumber) => {
    currentPage.value = pageNumber;
    // Update URL without full page reload, preserving state and allowing browser history
    router.get(
        window.location.pathname,
        currentPage.value > 1 ? { page: currentPage.value } : {},
        {
            preserveScroll: false,
            preserveState: true, // Keep Vue component state
            replace: true, // Replace history entry instead of pushing a new one
        }
    );
};

/**
 * Handles the 'add-to-cart' event emitted by ProductCard.
 * Prepares product data and dispatches to cartStore.
 * @param {object} product - The product object to add to cart.
 */
const storeCart = (product) => {
    // Correctly extract the image preview URL
    const imagePreviewUrl = product?.images[0]?.preview || null;

    const cartItemData = {
        // Create unique ID for the cart item, aligning with CartController logic
        id: `${product.id}-${product.variant_id || "default"}`,
        title: product.title,
        price: parseInt(product.price), // Ensure price is an integer
        quantity: 1, // Default quantity when adding to cart
        variant_id: product.variant_id || null, // Ensure variant_id is null if not present
        image: imagePreviewUrl, // Assign the extracted preview URL
        slug: product.slug, // Ensure slug is passed as an object as expected by backend
    };
    //console.log("Adding to cart:", cartItemData); // For debugging
    cartStore.addToCart(cartItemData);
};
</script>

<template>
    <ul
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[1px] p-[1px]"
    >
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

    <PaginationControls
        :pagination-meta="pagination.meta"
        :pagination-links="pagination.links"
        :loading="isLoading"
        @go-to-page="handleGoToPage"
    />

    <section v-if="$page.props.app.env !== 'local'">
        <VarDump :data="cartStore.state.itemsIds" />
    </section>
</template>
