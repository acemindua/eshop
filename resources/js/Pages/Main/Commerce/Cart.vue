<template>
    <CommerceLayout>
        <section class="container mx-auto py-4 px-2 sm:px-6 lg:px-8">
            <h1 class="text-xl md:text-2xl font-semibold mb-4">
                {{ $t("Корзина") }}
            </h1>

            <div v-if="cartStore.state.isLoading">
                <LoadingOverlay :show="cartStore.state.isLoading" />
            </div>

            <div
                v-else-if="items.length"
                class="flex flex-col md:flex-row gap-8"
            >
                <div class="md:w-2/3">
                    <ul role="list" class="space-y-2">
                        <li>
                            <div
                                class="bg-white rounded-md p-4 flex items-center justify-between"
                            >
                                <div class="flex items-center space-x-2">
                                    <button
                                        @click="showClearCartConfirm"
                                        class="inline-flex space-x-2 items-center text-red-600 hover:text-red-800 transition-colors duration-200"
                                        aria-label="{{ $t('Delete all items from cart') }}"
                                    >
                                        <IconTrash :stroke="1" :size="20" />
                                        <span>{{ $t("Delete all") }}</span>
                                    </button>
                                </div>
                                <div class="text-sm text-gray-500">
                                    <span>
                                        {{
                                            pluralizeUk(
                                                cartStore.state.itemCount,
                                                ["товар", "товари", "товарів"]
                                            )
                                        }}
                                    </span>
                                </div>
                            </div>
                        </li>
                        <li
                            v-for="product in items"
                            :key="product.id"
                            class="p-2 bg-white rounded-md"
                        >
                            <CartItem
                                :product="product"
                                @update-quantity="handleUpdateQuantity"
                                @remove-item="showRemoveItemConfirm(product)"
                            />
                        </li>
                    </ul>
                </div>

                <div
                    class="md:w-1/3 bg-white p-6 shadow-sm rounded-lg h-fit sticky top-4"
                >
                    <h2 class="sr-only">{{ $t("Order Summary") }}</h2>
                    <div
                        class="flex justify-between text-base font-medium text-gray-900 mb-2"
                    >
                        <p>{{ $t("Total amount") }}:</p>
                        <p>
                            {{ formattedPrice(cartStore.state.total) }}
                            <span class="text-base">₴</span>
                        </p>
                    </div>
                    <p class="mt-0.5 text-sm text-gray-500">
                        {{
                            $t(
                                'For quantity changes and other parameters, please proceed to "Checkout".'
                            )
                        }}
                    </p>
                    <div class="mt-6">
                        <Link
                            href="/check-out/cart"
                            class="flex items-center justify-center rounded-md border border-transparent bg-green-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-green-700 transition-colors duration-200"
                        >
                            {{ $t("Proceed to checkout") }}
                        </Link>
                    </div>
                </div>
            </div>

            <div v-else class="flex items-center justify-center">
                <div class="flex flex-col space-y-4 p-4 text-center">
                    <h2 class="text-2xl font-bold text-gray-700">
                        Ваша корзина порожня!
                    </h2>
                    <Link
                        href="/"
                        class="bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition-colors duration-200"
                    >
                        Перейти до покупок
                    </Link>
                </div>
            </div>
        </section>

        <ConfirmDialog
            :show="showConfirmModal"
            :title="confirmDialogState.title"
            :message="confirmDialogState.message"
            confirmText="Так, видалити!"
            cancelText="Скасувати"
            @confirm="handleConfirmAction"
            @cancel="resetConfirmDialog"
            @close="resetConfirmDialog"
        />

        <section
            v-if="$page.props.app.env === 'local'"
            class="container mx-auto py-4"
        >
            <VarDump :data="cartStore" />
        </section>
    </CommerceLayout>
</template>

<script setup>
import { pluralizeUk } from "@/utils/helpers";
import { computed, inject, ref, reactive } from "vue";
import { Link } from "@inertiajs/vue3";
import CommerceLayout from "@/Layouts/CommerceLayout.vue";
import VarDump from "@/Shared/VarDump.vue";
import { formatPrice } from "@/helpers";

import LoadingOverlay from "@/Components/UI/LoadingOverlay.vue";
import { IconTrash } from "@tabler/icons-vue";
import CartItem from "@/Components/Themes/Ecommerce/Layout/CartItem.vue";
import ConfirmDialog from "@/Components/UI/ConfirmDialog.vue";

const cartStore = inject("cartStore"); // Ensure cartStore is provided by an ancestor

const items = computed(() => cartStore?.state?.items || []);

/**
 * Formats a given price using a helper function.
 * @param {number} price - The price to format.
 * @returns {string} The formatted price string.
 */
const formattedPrice = (price) => {
    return formatPrice(price, {
        roundTo: 10,
        decimals: 0,
        rate: 1,
    });
};

// --- Confirmation Dialog Logic ---
const showConfirmModal = ref(false);
const confirmDialogState = reactive({
    title: "",
    message: "",
    actionType: null, // 'clearCart' or 'removeItem'
    itemData: null, // For 'removeItem' action, store the item to remove
});

/**
 * Prepares and shows the confirmation dialog for clearing the entire cart.
 */
const showClearCartConfirm = () => {
    confirmDialogState.title = "Очистити корзину?";
    confirmDialogState.message =
        "Ви впевнені, що хочете видалити всі товари з кошика?";
    confirmDialogState.actionType = "clearCart";
    showConfirmModal.value = true;
};

/**
 * Prepares and shows the confirmation dialog for removing a specific item.
 * @param {object} product - The product object to be removed.
 */
const showRemoveItemConfirm = (product) => {
    confirmDialogState.title = "Видалити товар?";
    confirmDialogState.message = `Ви впевнені, що хочете видалити "${product.name}" з кошика?`;
    confirmDialogState.actionType = "removeItem";
    confirmDialogState.itemData = product;
    showConfirmModal.value = true;
};

/**
 * Handles the confirmation action based on the `actionType` in `confirmDialogState`.
 */
const handleConfirmAction = () => {
    if (confirmDialogState.actionType === "clearCart") {
        cartStore.clearCart();
    } else if (
        confirmDialogState.actionType === "removeItem" &&
        confirmDialogState.itemData
    ) {
        cartStore.removeCartItem(confirmDialogState.itemData.id);
    }
    resetConfirmDialog();
};

/**
 * Resets the confirmation dialog state and hides it.
 */
const resetConfirmDialog = () => {
    showConfirmModal.value = false;
    confirmDialogState.title = "";
    confirmDialogState.message = "";
    confirmDialogState.actionType = null;
    confirmDialogState.itemData = null;
};

// --- Cart Item Interaction Handlers ---

/**
 * Handles quantity updates emitted by CartItem.
 * @param {string|number} productId - The ID of the product to update.
 * @param {number} newQuantity - The new quantity for the product.
 */
const handleUpdateQuantity = (productId, newQuantity) => {
    console.log(productId, newQuantity);
    // Assuming your cartStore has an updateItemQuantity method
    cartStore.updateCartItemQuantity(productId, newQuantity);
};
</script>

<style scoped>
/* Scoped styles specific to CartPage, if any.
   The provided spinner styles are generic and could be moved to a global stylesheet or the LoadingOverlay component itself.
   For now, I'm keeping them as is, assuming they are indeed only used here.
*/
.spinner-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    backdrop-filter: blur(2px);
}

.spinner {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
