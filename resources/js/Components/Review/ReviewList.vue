<template>
    <div class="review-list">
        <h2 class="text-2xl font-semibold mb-4 text-gray-800">
            Відгуки користувачів
        </h2>
        <div v-if="api.loading.value" class="text-center text-gray-600 py-4">
            Завантаження відгуків...
        </div>
        <div
            v-else-if="reviews.length === 0"
            class="text-center text-gray-600 py-4"
        >
            Ще немає відгуків. Будьте першим!
        </div>
        <div v-else>
            <div
                v-for="review in reviews"
                :key="review.id"
                class="bg-white p-4 rounded-lg shadow-sm mb-4 border border-gray-200"
            >
                <div class="flex items-center justify-between mb-2">
                    <div class="flex items-center">
                        <StarRating
                            :initial-rating="review.overall_rating"
                            :read-only="true"
                            class="text-lg"
                        />
                        <span class="ml-3 text-sm text-gray-600">
                            від
                            {{ review.user ? review.user.name : "Анонім" }} на
                            {{ formatDate(review.created_at) }}
                        </span>
                    </div>
                    <div
                        v-if="currentUser && review.user_id === currentUser.id"
                        class="flex space-x-2"
                    >
                        <button
                            @click="editReview(review)"
                            class="text-blue-500 hover:text-blue-700 text-sm font-medium"
                        >
                            Редагувати
                        </button>
                        <button
                            @click="confirmDelete(review.id)"
                            class="text-red-500 hover:text-red-700 text-sm font-medium"
                        >
                            Видалити
                        </button>
                    </div>
                </div>
                <h4
                    v-if="review.title"
                    class="text-lg font-semibold text-gray-700 mb-1"
                >
                    {{ review.title }}
                </h4>
                <p class="text-gray-600 leading-relaxed">{{ review.review }}</p>
            </div>

            <button
                v-if="hasMoreReviews"
                @click="loadMoreReviews"
                :disabled="api.loading.value"
                class="mt-4 w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <span v-if="api.loading.value">Завантаження...</span>
                <span v-else>Завантажити більше</span>
            </button>
            <div
                v-if="api.errorMessage.value"
                class="mt-3 text-sm text-red-600 text-center"
            >
                {{ api.errorMessage.value }}
            </div>
            <div
                v-if="api.successMessage.value"
                class="mt-3 text-sm text-green-600 text-center"
            >
                {{ api.successMessage.value }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import StarRating from "./StarRating.vue";
import { useReviewApi } from "@/Composables/useReviewApi"; // Імпорт composable

const props = defineProps({
    modelType: {
        type: String,
        required: true,
    },
    modelId: {
        type: Number,
        required: true,
    },
    currentUser: {
        type: Object,
        default: null,
    },
});

const emit = defineEmits(["review-deleted", "edit-review"]);

const api = useReviewApi(); // Використання composable

const reviews = ref([]);
const currentPage = ref(1);
const lastPage = ref(1);
const hasMoreReviews = ref(false);

// Функція для отримання відгуків
const fetchReviews = async () => {
    const data = await api.fetchReviews(
        props.modelType,
        props.modelId,
        currentPage.value
    );
    if (data) {
        if (currentPage.value === 1) {
            console.log("currentPage", currentPage.value === 1);
            console.log("currentPage", currentPage.value);
            console.log("reviews", data.reviews.data);
            reviews.value = data.reviews.data;
        } else {
            reviews.value = [...reviews.value, ...data];
        }
        currentPage.value = data.current_page;
        lastPage.value = data.last_page;
        hasMoreReviews.value = currentPage.value < lastPage.value;
    }
};

const loadMoreReviews = () => {
    if (currentPage.value < lastPage.value) {
        currentPage.value++;
        fetchReviews();
    }
};

const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("uk-UA", options);
};

const editReview = (review) => {
    emit("edit-review", review);
};

const confirmDelete = async (reviewId) => {
    if (confirm("Ви впевнені, що хочете видалити цей відгук?")) {
        const success = await api.deleteReview(
            props.modelType,
            props.modelId,
            reviewId
        );
        if (success) {
            reviews.value = reviews.value.filter(
                (review) => review.id !== reviewId
            );
            emit("review-deleted"); // Повідомити батьківський компонент
        }
    }
};

// Завантаження відгуків при монтуванні компонента
onMounted(fetchReviews);

// Експортуємо fetchReviews, щоб батьківський компонент міг її викликати
defineExpose({
    fetchReviews,
    currentPage, // Експортуємо для зовнішнього управління (наприклад, для скидання пагінації)
    reviews,
});
</script>

<style scoped>
/* Tailwind CSS стилі вже включені через класи, тому тут може бути дуже мало або зовсім немає кастомних стилів */
</style>
