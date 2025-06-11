// services/cartService.js
import axios from "axios";

// --- Configuration ---
// IMPORTANT: Set your Laravel API base URL here.
// Example: "https://your-laravel-app.com/api"
const API_BASE_URL = "/";

const cartService = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    withCredentials: true, // Crucial for handling sessions/cookies, especially with Laravel Sanctum
});

// --- Interceptors (Optional but Recommended) ---
// Add an interceptor to handle common errors, like network issues or authentication failures.
cartService.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error("API Error Response:", error.response.data);
            console.error("API Error Status:", error.response.status);
            console.error("API Error Headers:", error.response.headers);

            // You might want to handle specific status codes
            if (error.response.status === 401) {
                // Unauthorized: e.g., redirect to login
                // router.push('/login');
            } else if (error.response.status === 404) {
                // Not Found: handle gracefully, e.g., show a user-friendly message
            }
        } else if (error.request) {
            // The request was made but no response was received
            console.error("API Error Request:", error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error("API Error Message:", error.message);
        }
        return Promise.reject(error);
    }
);

// --- Cart API Methods ---
export default {
    /**
     * Fetches the current state of the cart.
     * Corresponds to: GET /api/cart
     * @returns {Promise<AxiosResponse>} A promise that resolves with cart data.
     */
    getCart() {
        return cartService.get("/cart");
    },

    /**
     * Adds an item to the cart.
     * Corresponds to: POST /api/cart
     * @param {object} item - The product item to add, including id, title, price, quantity, variant_id, image, slug.
     * @returns {Promise<AxiosResponse>} A promise that resolves with updated cart data.
     */
    addToCart(item) {
        return cartService.post("/cart", item);
    },

    /**
     * Updates the quantity of a specific item in the cart.
     * This method can also remove an item by setting quantity to 0 or less.
     * Corresponds to: PUT /api/cart/{cartItemId}
     * @param {string} cartItemId - The unique ID of the item in the cart (e.g., 'product_id-variant_id').
     * @param {number} quantity - The new quantity for the item.
     * @returns {Promise<AxiosResponse>} A promise that resolves with updated cart data.
     */
    updateCartItem(cartItemId, quantity) {
        // Ensure cartItemId is a string for the URL
        const id = String(cartItemId);
        // The Laravel controller expects 'quantity' in the request body
        return cartService.put(`/cart/${id}`, { quantity });
    },

    /**
     * Removes a specific item from the cart.
     * Corresponds to: DELETE /api/cart/{cartItemId}
     * @param {string} cartItemId - The unique ID of the item in the cart to remove.
     * @returns {Promise<AxiosResponse>} A promise that resolves with updated cart data.
     */
    removeCartItem(cartItemId) {
        // Ensure cartItemId is a string for the URL
        const id = String(cartItemId);
        // No request body is typically needed for DELETE by ID
        return cartService.delete(`/cart/${id}`);
    },

    /**
     * Clears all items from the cart.
     * Corresponds to: POST /api/cart/clear
     * @returns {Promise<AxiosResponse>} A promise that resolves with an empty cart data.
     */
    clearCart() {
        // Using POST as it's an action that changes server state
        return cartService.post("/cart/clear");
    },
};
