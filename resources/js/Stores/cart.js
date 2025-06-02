// src/cartStore.js (a simple reactive store)
import { reactive, readonly } from "vue";
import cartService from "@/services/cart";

const state = reactive({
    items: [],
    total: 0,
    itemCount: 0,
    isLoading: false,
    error: null,
});

const actions = {
    async fetchCart() {
        state.isLoading = true;
        state.error = null;
        console.log("actions - fetchCart", state.itemCount);
        try {
            const response = await cartService.getCart();
            state.items = response.data.items;
            state.total = response.data.total;
            state.itemCount = response.data.itemCount;
        } catch (error) {
            console.error("Error fetching cart:", error);
            state.error = "Failed to load cart. Please try again.";
        } finally {
            state.isLoading = false;
        }
    },
    async addToCart(product) {
        state.isLoading = true;
        state.error = null;
        try {
            // Send product_id and quantity to the backend
            await cartService.addToCart({
                id: product.id,
                quantity: product.quantity || 1,
            });
            const q = actions.fetchCart(); // Re-fetch cart after adding
            console.log("actions.fetchCart", q);
            await q;
        } catch (error) {
            console.error("Error adding to cart:", error);
            state.error = "Failed to add item to cart.";
        } finally {
            state.isLoading = false;
        }
    },
    async updateCartItem({ rowId, quantity }) {
        state.isLoading = true;
        state.error = null;
        try {
            // Send darryldecode/cart's row_id and quantity to the backend
            await cartService.updateCartItem({ row_id: rowId, quantity });
            await actions.fetchCart();
        } catch (error) {
            console.error("Error updating cart item:", error);
            state.error = "Failed to update item quantity.";
        } finally {
            state.isLoading = false;
        }
    },
    async removeCartItem(rowId) {
        state.isLoading = true;
        state.error = null;
        try {
            // Send darryldecode/cart's row_id to the backend
            await cartService.removeCartItem(rowId);
            await actions.fetchCart();
        } catch (error) {
            console.error("Error removing cart item:", error);
            state.error = "Failed to remove item from cart.";
        } finally {
            state.isLoading = false;
        }
    },
    async clearCart() {
        state.isLoading = true;
        state.error = null;
        try {
            await cartService.clearCart();
            state.items = []; // Optimistic update
            state.total = 0;
            state.itemCount = 0;
            await actions.fetchCart(); // Re-fetch to ensure server consistency
        } catch (error) {
            console.error("Error clearing cart:", error);
            state.error = "Failed to clear cart.";
        } finally {
            state.isLoading = false;
        }
    },
};

export const cartStore = {
    state: readonly(state), // Make state read-only for direct access
    ...actions, // Expose actions
};
