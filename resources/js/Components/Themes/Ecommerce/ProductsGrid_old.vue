<script setup>
import { computed, inject, onMounted } from "vue";
import ProductCard from "./ProductCard.vue";

const props = defineProps({
    // 'items' - це масив товарів для поточної сторінки
    items: {
        type: Array, // Змінено з Object на Array
        default: () => [],
    },
    loading: Boolean,
    error: String,
    // Додаємо пропси для метаданих пагінації
    paginationMeta: {
        type: Object,
        default: () => ({
            current_page: 1,
            last_page: 1,
            from: 0,
            to: 0,
            total: 0,
            per_page: 12, // Дефолтне значення, якщо потрібно
        }),
    },
    // Додаємо пропси для посилань пагінації (prev, next, first, last)
    paginationLinks: {
        type: Object,
        default: () => ({
            first: null,
            last: null,
            prev: null,
            next: null,
        }),
    },
});

// Додаємо defineEmits, щоб компонент міг "сказати" батьківському про зміну сторінки
const emit = defineEmits(["go-to-page"]);

const cartStore = inject("cartStore");

const ids = computed(() =>
    cartStore.state.items.map((item) => item.id.toString())
);

const addToCart = async (product) => {
    cartStore.addToCart(product);
};

onMounted(() => {
    cartStore.fetchCart();
});

// --- Логіка пагінації ---
// Функція для переходу на попередню сторінку
const goToPrevPage = () => {
    if (props.paginationLinks.prev) {
        // Ми емітуємо подію з номером сторінки (current_page - 1)
        emit("go-to-page", props.paginationMeta.current_page - 1);
    }
};

// Функція для переходу на наступну сторінку
const goToNextPage = () => {
    if (props.paginationLinks.next) {
        // Ми емітуємо подію з номером сторінки (current_page + 1)
        emit("go-to-page", props.paginationMeta.current_page + 1);
    }
};

// Функція для переходу на конкретну сторінку
const goToPage = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= props.paginationMeta.last_page) {
        emit("go-to-page", pageNumber);
    }
};

// Генеруємо масив номерів сторінок для навігації
const pageNumbers = computed(() => {
    const pages = [];
    const { current_page, last_page } = props.paginationMeta;
    // Показуємо кілька сторінок навколо поточної
    const range = 2; // Наприклад, 2 сторінки до і 2 після поточної

    for (
        let i = Math.max(1, current_page - range);
        i <= Math.min(last_page, current_page + range);
        i++
    ) {
        pages.push(i);
    }

    // Додаємо першу сторінку, якщо вона далеко
    if (pages[0] > 1) {
        if (pages[0] > 2) {
            pages.unshift("..."); // Додаємо еліпсис
        }
        pages.unshift(1);
    }

    // Додаємо останню сторінку, якщо вона далеко
    if (pages[pages.length - 1] < last_page) {
        if (pages[pages.length - 1] < last_page - 1) {
            pages.push("..."); // Додаємо еліпсис
        }
        pages.push(last_page);
    }

    return pages;
});
</script>

<template>
    <div class="py-6">
        <div v-if="loading">Loading products...</div>
        <div v-else-if="error" class="error-message">{{ error }}</div>
        <ul v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            <li v-for="product in items" :key="product.id">
                <ProductCard
                    :product="product"
                    :ids-in-cart="ids"
                    :reviews-data="product.reviews"
                    @add-to-cart="addToCart"
                />
            </li>
        </ul>

        ---

        <div
            v-if="paginationMeta.last_page > 1"
            class="mt-8 flex justify-center items-center space-x-2"
        >
            <button
                @click="goToPrevPage"
                :disabled="!paginationLinks.prev || loading"
                class="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                Попередня
            </button>

            <button
                v-for="page in pageNumbers"
                :key="
                    typeof page === 'number'
                        ? page
                        : 'ellipsis-' + Math.random()
                "
                @click="typeof page === 'number' && goToPage(page)"
                :disabled="
                    page === '...' ||
                    page === paginationMeta.current_page ||
                    loading
                "
                :class="{
                    'px-4 py-2 border rounded-md transition-colors': true,
                    'bg-green-500 text-white hover:bg-green-600':
                        page === paginationMeta.current_page,
                    'text-gray-700 hover:bg-gray-100':
                        page !== paginationMeta.current_page &&
                        typeof page === 'number',
                    'opacity-50 cursor-not-allowed': page === '...',
                }"
            >
                {{ page }}
            </button>

            <button
                @click="goToNextPage"
                :disabled="!paginationLinks.next || loading"
                class="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                Наступна
            </button>
        </div>
    </div>
</template>

<style scoped>
.error-message {
    color: red;
    font-weight: bold;
}
/* Додаткові стилі для кнопок пагінації, якщо потрібно */
</style>
