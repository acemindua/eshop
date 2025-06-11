<template>
    <button
        class="md:border-2 border-gray-100 rounded-lg md:flex items-center justify-center md:space-x-2 md:py-2 relative md:px-3 md:bg-gray-100"
        aria-label="Відкрити корзину"
        @click="$emit('toggleCart')"
    >
        <svg-icon type="mdi" :path="mdiCartOutline" class="size-6 mx-auto" />

        <p class="font-semibold hidden md:block px-4 text-sm">
            <span v-if="total && parseInt(total) > 0">
                {{ total }} <span>₴</span>
            </span>
            <span v-else>{{ $t("Корзина") }}</span>
        </p>

        <p class="text-xs text-gray-500 md:hidden pt-1">
            {{ $t("Корзина") }}
        </p>

        <p
            v-if="cartItemCount && cartItemCount > 0"
            class="absolute md:-top-1 md:-right-1 -top-1 right-1 rounded-full bg-orange-500 text-xs border-2 border-white text-white w-3 md:w-5 h-3 md:h-5 inline-flex justify-center items-center"
        >
            <span class="hidden md:block">{{ cartItemCount }}</span>
        </p>
    </button>
</template>

<script setup>
import { computed } from "vue";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiCartOutline } from "@mdi/js";
import { formatPrice } from "@/helpers";

const props = defineProps({
    cart: Object, // This prop should ideally be cartStore.state or cartStore itself as previously.
});

// Define the emits for this component
const emit = defineEmits(["toggleCart"]); // ADDED 'openEmptyCartModal'

// Отримання даних з cartStore
const cartItemCount = computed(() => props.cart?.itemCount || 0);

const total = computed(() =>
    formatPrice(props.cart?.total || 0, {
        roundTo: 10,
        decimals: 0,
        rate: 1,
    })
);
</script>

<style scoped>
/* Your existing styles */
</style>
