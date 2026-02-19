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
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, reactive } from "vue";
import { usePage } from "@inertiajs/vue3"; // Додано для доступу до auth
import StarRating from "./StarRating.vue";
import useApiResourceService from "@/Composables/useApiResourceService";

const props = defineProps({
    modelType: { type: String, required: true },
    modelId: { type: Number, required: true },
    currentUser: { type: Object, default: null },
});

const emit = defineEmits(["review-deleted", "edit-review"]);
const page = usePage();
const api = useApiResourceService();

const reviews = ref([]);
const currentPage = ref(1);
const lastPage = ref(1);
const hasMoreReviews = ref(false);

// Отримуємо поточного користувача з Inertia props
const authUser = computed(() => page.props.auth?.user);

// Функція для отримання відгуків
const fetchReviews = async () => {
    // Формуємо URL з query-параметрами, оскільки fetchData робить GET запит
    const url = `/api/reviews?model=${props.modelType}&model_id=${props.modelId}&page=${currentPage.value}`;

    try {
        const response = await api.fetchData(url);
        // Зверніть увагу: зазвичай axios повертає дані в response.data
        const result = response.data;
        if (result) {
            console.log(result);
            if (currentPage.value === 1) {
                reviews.value = result; // Припускаємо, що Laravel повертає { data: [...] }
            } else {
                reviews.value = [...reviews.value, ...result];
            }

            currentPage.value = result.current_page;
            lastPage.value = result.last_page;
            hasMoreReviews.value = currentPage.value < lastPage.value;
        }
    } catch (e) {
        console.error("Помилка при завантаженні відгуків:", e);
    }
};

const loadMoreReviews = () => {
    if (currentPage.value < lastPage.value) {
        currentPage.value++;
        fetchReviews();
    }
};

const confirmDelete = async (reviewId) => {
    if (confirm("Ви впевнені, що хочете видалити цей відгук?")) {
        try {
            // Використовуємо метод deleteData з вашого сервісу
            // У вашому сервісі він очікує масив ID: { data: { ids: [id] } }
            await api.deleteData(`/api/reviews/${reviewId}`, [reviewId]);

            reviews.value = reviews.value.filter((r) => r.id !== reviewId);
            emit("review-deleted");
        } catch (e) {
            alert("Не вдалося видалити відгук.");
        }
    }
};

const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("uk-UA", options);
};

const editReview = (review) => {
    emit("edit-review", review);
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
