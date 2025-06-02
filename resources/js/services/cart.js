// services/cartService.js
import axios from "axios";

const cartService = axios.create({
    baseURL: "",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    withCredentials: true, // Important for handling sessions/cookies with Laravel Sanctum
});

// Optional: Add an interceptor to handle common errors or refresh tokens
cartService.interceptors.response.use(
    (response) => response,
    (error) => {
        // Example: if (error.response.status === 401 && !error.config._isRetry) { ... }
        return Promise.reject(error);
    }
);

export default {
    getProducts() {
        return cartService.get("/products");
    },
    getCart() {
        return cartService.get("/cart");
    },
    addToCart(item) {
        // Darryldecode/cart expects id, name, price, quantity, and optional attributes
        // Ensure your product object passed here has these keys
        return cartService.post("/cart", item);
    },
    updateCartItem(item) {
        // Expects { row_id, quantity }
        return cartService.post("/cart/update", item);
    },
    removeCartItem(rowId) {
        // Expects { row_id }
        return cartService.post("/cart/remove", { row_id: rowId });
    },
    clearCart() {
        return cartService.post("/cart/clear");
    },
};
