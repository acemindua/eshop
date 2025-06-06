<script setup>
import { onMounted, ref, watch } from "vue";
import { productStore } from "@/Stores/productStore"; // Path to your productStore
import ProductsGrid from "@/Components/Themes/Ecommerce/ProductsGrid.vue"; // Path to ProductsGrid
import MainLayout from "@/Layouts/MainLayout.vue";

const props = defineProps({
    // It's good practice to define the expected structure of 'data' prop
    data: {
        type: Object,
        required: true,
        default: () => ({
            item: {
                data: {
                    id: null,
                },
            },
        }),
    },
});

// Destructure reactive state from the store directly
const { items, isLoading, error, pagination } = productStore.state;

// Create a reactive variable for the current page
// Initialize with pagination.currentPage from the store for consistency
const currentPage = ref(pagination.currentPage);

/**
 * Fetches products from the productStore based on current pagination and category.
 */
const loadProducts = () => {
    // Ensure category_id is always available and valid
    const categoryId = props.data?.item?.data?.id;

    if (categoryId) {
        // Only load if categoryId is available
        productStore.fetchItems({
            page: currentPage.value,
            per_page: pagination.perPage, // Use per_page from store, or a fixed value like 12
            category_id: categoryId, // Pass the category ID from props
        });
    } else {
        // Handle case where categoryId might be null or undefined, e.g., for a "all products" page
        // You might want to fetch all products without a category filter here
        productStore.fetchItems({
            page: currentPage.value,
            per_page: pagination.perPage,
        });
    }
};

// Load products when the component is mounted
onMounted(() => {
    loadProducts();
});

// Watch for changes in currentPage and reload products accordingly
watch(currentPage, (newPage) => {
    // console.log(`Navigating to page: ${newPage}`); // Keep for debugging if needed
    loadProducts();
});

/**
 * Handler for the 'go-to-page' event emitted from ProductsGrid.
 * Updates the currentPage, which triggers the watch effect.
 * @param {number} pageNumber - The page number to navigate to.
 */
const handleGoToPage = (pageNumber) => {
    currentPage.value = pageNumber;
};
</script>

<template>
    <MainLayout>
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ProductsGrid
                :items="items"
                :loading="isLoading"
                :error="error"
                :pagination-meta="pagination.meta"
                :pagination-links="pagination.links"
                @go-to-page="handleGoToPage"
            />
        </section>
    </MainLayout>
</template>
