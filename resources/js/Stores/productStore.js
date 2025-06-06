import { reactive, readonly } from "vue";
import api from "@/services/api"; // Assuming this is your Axios instance or similar

const state = reactive({
    items: [],
    // Add pagination metadata
    pagination: {
        currentPage: 1,
        lastPage: 1,
        perPage: 12,
        total: 0,
        from: 0,
        to: 0,
        links: {}, // Contains 'first', 'last', 'prev', 'next' URLs
        meta: {}, // Contains all the meta data from Laravel
    },
    isLoading: false,
    error: null,
});

const actions = {
    /**
     * Fetches products from the API with pagination support.
     * @param {Object} options - Query parameters like { page: 1, per_page: 12, category_id: 1 }.
     */
    async fetchItems(options = {}) {
        state.isLoading = true;
        state.error = null;
        try {
            const url = "/products";
            // Send options as query parameters
            const response = await api.get(url, { params: options });

            //console.log("API response for products:", response.data); // For debugging

            // Update state with product data
            state.items = response.data.data; // Access the 'data' key for the actual product items

            // Update pagination metadata
            state.pagination.currentPage = response.data.meta.current_page;
            state.pagination.lastPage = response.data.meta.last_page;
            state.pagination.perPage = response.data.meta.per_page;
            state.pagination.total = response.data.meta.total;
            state.pagination.from = response.data.meta.from;
            state.pagination.to = response.data.meta.to;
            state.pagination.links = response.data.links; // Store the direct links
            state.pagination.meta = response.data.meta; // Store the full meta object if needed

            // itemCount is now redundant as it's part of pagination.total, but keeping it for backward compatibility
            state.itemCount = response.data.meta.total;
        } catch (error) {
            console.error("Error fetching products:", error);
            state.error = "Failed to load products. Please try again.";
            // Reset items and pagination on error
            state.items = [];
            state.pagination = {
                currentPage: 1,
                lastPage: 1,
                perPage: 12,
                total: 0,
                from: 0,
                to: 0,
                links: {},
                meta: {},
            };
            state.itemCount = 0;
        } finally {
            state.isLoading = false;
        }
    },
};

export const productStore = {
    state: readonly(state), // Make state read-only for direct access
    ...actions, // Expose actions
};
