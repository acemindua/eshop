<template>
    <div class="relative">
        <!-- Кнопка корзини -->
        <button
            @click="open = !open"
            class="inline-flex items-center bg-gray-100 py-2 rounded-lg relative px-3"
            aria-label="Відкрити корзину"
        >
            <svg-icon type="mdi" :path="mdiCartOutline" class="w-6 h-6" />
            <span class="font-semibold hidden md:block px-4">
                <span v-if="total && total > 0">
                    {{ total }} <span class="text-sm">₴</span>
                </span>
                <span v-else>{{ $t("Cart") }}</span>
            </span>
            <span
                v-if="cartItemCount && cartItemCount > 0"
                class="absolute -top-1 right-1 rounded-full bg-orange-500 text-xs border-2 border-white text-white w-5 h-5 inline-flex justify-center items-center"
            >
                {{ cartItemCount }}
            </span>
        </button>

        <!-- Aside корзина -->
        <aside
            v-show="open"
            class="fixed top-0 right-0 w-80 max-w-full h-full bg-white shadow-lg border-l z-50 transition-transform duration-300"
        >
            <div class="flex justify-between items-center p-4 border-b">
                <h2 class="text-lg font-bold">Корзина</h2>
                <button @click="open = false" aria-label="Закрити">✕</button>
            </div>

            <div class="p-4 overflow-y-auto h-[calc(100%-4rem)]">
                <div v-if="cartItems && cartItems.length > 0">
                    <div
                        v-for="(item, index) in cartItems"
                        :key="index"
                        class="flex justify-between items-center mb-4"
                    >
                        <div>
                            <p class="font-semibold">{{ item.name }}</p>
                            <p class="text-sm text-gray-500">
                                {{ item.price }} ₴ × {{ item.quantity }}
                            </p>
                        </div>
                        <p class="font-bold">
                            {{ item.price * item.quantity }} ₴
                        </p>
                    </div>

                    <div class="mt-6 border-t pt-4 text-right font-semibold">
                        Загалом: {{ total }} ₴
                    </div>
                </div>
                <div v-else class="text-center text-gray-500 mt-10">
                    Корзина порожня
                </div>
            </div>
        </aside>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, inject } from "vue";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiCartOutline } from "@mdi/js";
import { formatPrice } from "@/helpers";

// Стан відкриття aside
const open = ref(false);

// Підключення cartStore
const cartStore = inject("cartStore");

// Отримання даних з cartStore
const cartItems = computed(() => cartStore?.state?.items || []);
const cartItemCount = computed(() => cartStore?.state?.itemCount || 0);

const total = computed(() =>
    formatPrice(cartStore?.state?.total || 0, {
        roundTo: 10,
        decimals: 0,
        rate: 1,
    })
);

// Завантажити дані при монтуванні
onMounted(() => {
    cartStore?.fetchCart?.();
});
</script>

<style scoped>
/* За бажанням: додайте backdrop */
</style>
