<template>
    <div
        class="product-details-page max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-xl my-8"
    >
        <div v-if="loadingProduct" class="text-center text-gray-600 py-8">
            Завантаження інформації про товар...
        </div>
        <div v-else>
            <h1 class="text-3xl font-bold text-gray-900 mb-4">
                {{ product.name }}
            </h1>
            <p class="text-gray-700 mb-4">{{ product.description }}</p>
            <p class="text-2xl font-semibold text-blue-600 mb-6">
                Ціна: {{ product.price }} грн.
            </p>

            <div v-if="averageRating !== null" class="flex items-center mb-6">
                <h3 class="text-xl font-semibold text-gray-800 mr-3">
                    Середній рейтинг:
                </h3>
                <StarRating
                    :initial-rating="averageRating"
                    :read-only="true"
                    :show-average="true"
                    :average-rating="averageRating"
                />
                <span class="ml-2 text-gray-600"
                    >({{ reviewsCount }} відгуків)</span
                >
            </div>

            <hr class="my-8 border-t-2 border-gray-200" />

            <div v-if="isLoggedIn">
                <ReviewForm
                    :reviewable-type="'products'"
                    :reviewable-id="product.id"
                    @review-added="handleReviewAdded"
                />
            </div>
            <div
                v-else
                class="not-logged-in-message bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative text-center"
            >
                Будь ласка,
                <a href="/login" class="text-blue-600 hover:underline"
                    >увійдіть</a
                >
                або
                <a href="/register" class="text-blue-600 hover:underline"
                    >зареєструйтесь</a
                >, щоб залишити відгук.
            </div>

            <hr class="my-8 border-t-2 border-gray-200" />

            <ReviewList
                ref="reviewListRef"
                :reviewable-type="'products'"
                :reviewable-id="product.id"
                :current-user="currentUser"
                @review-deleted="handleReviewDeleted"
                @edit-review="openEditReviewModal"
            />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios"; // Для отримання інформації про продукт
import ReviewForm from "./ReviewForm.vue";
import ReviewList from "./ReviewList.vue";
import StarRating from "./StarRating.vue";
import { useReviewApi } from "../Composables/useReviewApi"; // Імпорт composable

const props = defineProps({
    productId: {
        type: Number,
        required: true,
    },
    currentUser: {
        type: Object,
        default: null,
    },
    isLoggedIn: {
        type: Boolean,
        default: false,
    },
});

const reviewApi = useReviewApi(); // Використання composable

const product = ref({});
const averageRating = ref(null);
const reviewsCount = ref(0);
const loadingProduct = ref(true);

// Референція до компонента ReviewList, щоб викликати його методи
const reviewListRef = ref(null);

const fetchProduct = async () => {
    loadingProduct.value = true;
    try {
        const response = await axios.get(`/api/products/${props.productId}`);
        product.value = response.data;
    } catch (error) {
        console.error("Error fetching product:", error);
    } finally {
        loadingProduct.value = false;
    }
};

const fetchAverageRating = async () => {
    const data = await reviewApi.fetchAverageRating(
        "products",
        props.productId
    );
    if (data) {
        averageRating.value = data.average_rating;
        reviewsCount.value = data.reviews_count;
    }
};

const handleReviewAdded = async () => {
    // Після додавання відгуку, оновлюємо список відгуків та середній рейтинг
    if (reviewListRef.value) {
        reviewListRef.value.currentPage = 1; // Скидаємо пагінацію до першої сторінки
        reviewListRef.value.reviews = []; // Очищаємо попередні відгуки
        await reviewListRef.value.fetchReviews(); // Перезавантажуємо відгуки
    }
    await fetchAverageRating(); // Оновлюємо середній рейтинг
};

const handleReviewDeleted = async () => {
    // Після видалення відгуку, оновлюємо середній рейтинг
    await fetchAverageRating();
};

const openEditReviewModal = (review) => {
    console.log("Редагувати відгук:", review);
    alert(
        "Функціонал редагування відгуку буде реалізовано пізніше. Деталі у консолі."
    );
};

onMounted(async () => {
    await fetchProduct();
    await fetchAverageRating();
});
</script>

<style scoped>
/* Tailwind CSS класи вже в шаблоні, тут можуть бути лише специфічні обгортки або складніші стилі, якщо потрібно */
</style>
