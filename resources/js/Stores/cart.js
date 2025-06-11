// src/cartStore.js
import { reactive, readonly } from "vue";
import cartService from "@/services/cart"; // Ensure the path is correct

const state = reactive({
    items: [],
    itemsIds: [], // Stores unique cart item IDs (e.g., "product_id-variant_id")
    total: 0,
    itemCount: 0,
    isLoading: false,
    error: null,
    isCartOpen: false, // State for controlling mini-cart UI visibility
});

const actions = {
    /**
     * Fetches the current cart data from the backend and updates the store state.
     */
    async fetchCart() {
        state.isLoading = true;
        state.error = null;
        try {
            const response = await cartService.getCart();
            // The Laravel CartController's index method returns the cart data directly.
            // If other methods (store, update, remove, clear) return a 'cart' key inside data,
            // you might adjust `response.data` to `response.data.cart` accordingly if needed elsewhere.
            state.items = response.data.items || [];
            state.total = response.data.total || 0;
            state.itemCount = response.data.itemCount || 0;
            // Map over items to get their unique cart IDs
            state.itemsIds = state.items.map(
                (item) => item.id?.toString() || ""
            );
        } catch (error) {
            console.error("Error fetching cart:", error);
            // Use backend message if available, otherwise a generic one
            state.error =
                error.response?.data?.message ||
                "Не вдалося завантажити кошик. Будь ласка, спробуйте ще раз.";
        } finally {
            state.isLoading = false;
        }
    },

    /**
     * Adds a product to the cart.
     * @param {object} product - The product object to add.
     * Expected properties: id, title, price, quantity, variant_id (nullable), image, slug (object).
     */
    async addToCart(product) {
        state.isLoading = true;
        state.error = null;
        try {
            // The cartService.addToCart expects the full product object.
            await cartService.addToCart(product);
            // Re-fetch to ensure the store state is consistent with the backend after modification.
            await actions.fetchCart();
            state.isCartOpen = true; // Open the mini-cart after adding an item
        } catch (error) {
            console.error("Error adding to cart:", error);
            state.error =
                error.response?.data?.message ||
                "Не вдалося додати товар до кошика.";
        } finally {
            state.isLoading = false;
        }
    },

    /**
     * Updates the quantity of a specific item in the cart.
     * This method also handles item removal if the new quantity is 0 or less (backend logic).
     *
     * @param {string} cartItemId - The unique ID of the item in the cart (e.g., 'product_id-variant_id').
     * @param {number} quantity - The new quantity for the item. Must be an integer.
     */
    async updateCartItemQuantity(cartItemId, quantity) {
        state.isLoading = true;
        state.error = null;
        try {
            // Call the service method with the item's unique cart ID and the new quantity.
            await cartService.updateCartItem(cartItemId, quantity);
            // Re-fetch to ensure the store state is consistent with the backend after modification.
            await actions.fetchCart();
        } catch (error) {
            console.error("Error updating cart item quantity:", error);
            state.error =
                error.response?.data?.message ||
                "Не вдалося оновити кількість товару.";
        } finally {
            state.isLoading = false;
        }
    },

    /**
     * Removes a specific item from the cart.
     * This action is typically triggered after user confirmation (handled by CartPage).
     *
     * @param {string} cartItemId - The unique ID of the item in the cart to remove.
     */
    async removeCartItem(cartItemId) {
        state.isLoading = true;
        state.error = null;
        try {
            await cartService.removeCartItem(cartItemId);
            // Re-fetch to ensure the store state is consistent with the backend after modification.
            await actions.fetchCart();
        } catch (error) {
            console.error("Error removing cart item:", error);
            state.error =
                error.response?.data?.message ||
                "Не вдалося видалити товар з кошика.";
        } finally {
            state.isLoading = false;
        }
    },

    /**
     * Clears all items from the cart.
     * This action is typically triggered after user confirmation (handled by CartPage).
     */
    async clearCart() {
        state.isLoading = true;
        state.error = null;
        try {
            // Optimistic update: clear local state immediately for a snappier UI
            state.items = [];
            state.total = 0;
            state.itemCount = 0;
            state.itemsIds = [];

            await cartService.clearCart();
            // Re-fetch after backend confirmation to ensure actual state consistency.
            await actions.fetchCart();
        } catch (error) {
            console.error("Error clearing cart:", error);
            state.error =
                error.response?.data?.message || "Не вдалося очистити кошик.";
        } finally {
            state.isLoading = false;
        }
    },

    /**
     * Toggles the visibility state of the cart UI (e.g., for a mini-cart sidebar).
     */
    toggleCart() {
        state.isCartOpen = !state.isCartOpen;
    },

    /**
     * Explicitly closes the cart UI.
     */
    closeCart() {
        state.isCartOpen = false;
    },
};

// Export the store with a readonly state to prevent direct mutations from components,
// ensuring all state changes go through defined actions.
export const cartStore = {
    state: readonly(state), // Make state read-only for direct access
    ...actions, // Expose all defined actions
};
