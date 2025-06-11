<template>
    <div class="flex gap-2 p-2">
        <div class="size-24 shrink-0 overflow-hidden border rounded-md">
            <ImageView
                :image="product.attributes.image"
                :config="{ width: 96, height: 96 }"
                class="object-cover w-full h-full"
            />
        </div>

        <div class="flex-grow flex flex-col justify-between">
            <div>
                <Link
                    :href="productLink(product.attributes.slug)"
                    class="block text-base font-medium text-gray-800 hover:underline transition-colors duration-200"
                >
                    <h3>{{ product.name }}</h3>
                </Link>
                <p
                    v-if="product.attributes.sku"
                    class="text-gray-500 text-sm mt-0.5"
                >
                    {{ `${$t("Код товара")}: ${product.attributes.sku}` }}
                </p>
                <p class="text-gray-500 text-sm mt-0.5">
                    {{ `${$t("Price")}: ${formattedPrice(product.price)}` }}
                    <span class="text-sm">₴</span>
                </p>
            </div>

            <div class="flex items-center space-x-3 mt-4">
                <button
                    @click="emitDecreaseQuantity"
                    :disabled="product.quantity <= 1"
                    class="p-1 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    aria-label="Decrease quantity"
                >
                    <svg
                        class="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M20 12H4"
                        />
                    </svg>
                </button>
                <span class="text-lg font-medium">{{ product.quantity }}</span>
                <button
                    @click="emitIncreaseQuantity"
                    class="p-1 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
                    aria-label="Increase quantity"
                >
                    <svg
                        class="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 4v16m8-8H4"
                        />
                    </svg>
                </button>
            </div>
        </div>

        <div class="flex flex-col items-end justify-between pl-2">
            <div class="font-semibold text-gray-900 text-lg whitespace-nowrap">
                {{ formattedPrice(product.subtotal) }}
                <span class="text-sm">₴</span>
            </div>
            <button
                @click="emit('remove-item')"
                class="text-red-500 hover:text-red-700 transition-colors duration-200 p-1 -mr-1"
                aria-label="Remove item from cart"
            >
                <IconTrash :stroke="1" :size="20" />
            </button>
        </div>
    </div>
</template>

<script setup>
import { Link } from "@inertiajs/vue3";
import ImageView from "@/Components/Themes/Admin/UI/ImageView.vue";
import { formatPrice } from "@/helpers";
import { IconTrash } from "@tabler/icons-vue";

const props = defineProps({
    product: {
        type: Object,
        required: true,
    },
});

const emit = defineEmits(["update-quantity", "remove-item"]);

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

/**
 * Generates the product link based on its slug.
 * @param {object} slug - The slug object containing product and optional variant.
 * @returns {string} The complete product URL.
 */
const productLink = (slug) => {
    return `/${slug.product}${slug.variant ? "/" + slug.variant : ""}`;
};

/**
 * Emits an event to decrease the product quantity.
 * The parent component will handle the actual cart update and confirmation if quantity becomes 0.
 */
const emitDecreaseQuantity = () => {
    if (props.product.quantity > 1) {
        emit("update-quantity", props.product.id, props.product.quantity - 1);
    } else {
        // If quantity is 1 and user tries to decrease, suggest removal to parent
        emit("remove-item");
    }
};

/**
 * Emits an event to increase the product quantity.
 */
const emitIncreaseQuantity = () => {
    emit("update-quantity", props.product.id, props.product.quantity + 1);
};
</script>

<style scoped>
/* No specific styles needed for this component, Tailwind should handle most. */
</style>
