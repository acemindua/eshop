<script setup>
/**
 * =========================================
 * 1. IMPORTS / ІМПОРТИ
 * =========================================
 * EN: Vue, composables and components imports
 * UA: Імпорт Vue, composables та компонентів
 */
import { ref, onMounted, computed, reactive, watch } from "vue";
import AuthModal from "../Public/Auth/AuthModal.vue";
import ReviewForm from "./ReviewForm.vue";
import ReviewList from "./ReviewList.vue";
import RatingStats from "./RatingStats.vue";
import { usePage } from "@inertiajs/vue3";
import useApiResourceService from "@/Composables/useApiResourceService.js";

/**
 * =========================================
 * 2. PROPS / ВХІДНІ ДАНІ
 * =========================================
 * EN: Component props definition
 * UA: Вхідні параметри компонента
 */
const props = defineProps({
    modelType: { type: String, required: true },
    modelId: { type: Number, required: true },
    modelTitle: { type: String, required: true, default: () => "" },
    averageReviews: { type: Object },
});

/**
 * =========================================
 * 3. STATE / СТАН КОМПОНЕНТА
 * =========================================
 * EN: Reactive state variables
 * UA: Реактивні змінні стану
 */
const isAuthModalOpen = ref(false);
const reviews = ref([]);
const currentPage = ref(1);
const lastPage = ref(1);
const activeFilter = ref(null);

const stats = reactive({
    total: 0,
    rating: 0,
    breakdown: {},
});

/**
 * =========================================
 * 4. SERVICES / СЕРВІСИ
 * =========================================
 * EN: API service initialization
 * UA: Ініціалізація API сервісу
 */
const api = useApiResourceService();
const page = usePage();

/**
 * =========================================
 * 5. AUTH / АВТОРИЗАЦІЯ
 * =========================================
 * EN: Current authenticated user
 * UA: Поточний авторизований користувач
 */
const auth = computed(() => page.props.auth?.user);

/**
 * =========================================
 * 6. FORM STATE / СТАН ФОРМИ
 * =========================================
 * EN: Review form data
 * UA: Дані форми відгуку
 */
const form = reactive({
    title: props.modelTitle,
    review: "",
    rating: 0,
    model: props.modelType,
    model_id: props.modelId,
    user_id: auth.value?.data?.id || null,
});

/**
 * =========================================
 * 7. WATCHERS / СПОСТЕРІГАЧІ
 * =========================================
 * EN: Sync auth user to form
 * UA: Синхронізація користувача з формою
 */
watch(
    auth,
    (val) => {
        form.user_id = val?.data?.id || null;
    },
    { immediate: true },
);

watch(activeFilter, () => {
    currentPage.value = 1;
    fetchReviews();
});

/**
 * =========================================
 * 8. COMPUTED / ОБЧИСЛЮВАНІ ВЛАСТИВОСТІ
 * =========================================
 * EN: Check if user already reviewed
 * UA: Перевірка чи користувач вже залишив відгук
 */
const hasUserAlreadyReviewed = computed(() => {
    return reviews.value.some(
        (review) => review.user_id === auth.value?.data?.id || null,
    );
});

/**
 * =========================================
 * 9. API: FETCH REVIEWS / ОТРИМАННЯ ВІДГУКІВ
 * =========================================
 * EN: Load reviews from API with filters & pagination
 * UA: Завантаження відгуків з API з фільтрами та пагінацією
 */
const fetchReviews = async () => {
    try {
        const url = `/api/reviews?model=${props.modelType}&model_id=${props.modelId}&page=${currentPage.value}${
            activeFilter.value ? "&rating=" + activeFilter.value : ""
        }`;

        const { data: result } = await api.fetchData(url);

        // STATS / СТАТИСТИКА
        stats.total = result.total ?? 0;
        stats.rating = result.rating ?? 0;
        stats.breakdown = result.breakdown ?? {};

        // REVIEWS / ВІДГУКИ
        const newReviews = result.reviews?.data ?? result.reviews ?? [];

        if (currentPage.value === 1) {
            reviews.value = newReviews;
        } else {
            reviews.value.push(...newReviews);
        }

        currentPage.value = result.current_page ?? 1;
        lastPage.value = result.last_page ?? 1;
    } catch (e) {
        console.error("Error fetching reviews:", e);
    }
};

/**
 * =========================================
 * 10. PAGINATION / ПАГІНАЦІЯ
 * =========================================
 * EN: Load next page of reviews
 * UA: Завантаження наступної сторінки
 */
const loadMoreReviews = () => {
    if (currentPage.value < lastPage.value) {
        currentPage.value++;
        fetchReviews();
    }
};

/**
 * =========================================
 * 11. SUBMIT REVIEW / ВІДПРАВКА ВІДГУКУ
 * =========================================
 * EN: Submit new review
 * UA: Відправка нового відгуку
 */
const handleSubmit = async () => {
    if (form.rating === 0) return;

    const success = await api.storeData("/api/reviews", form);

    if (success) {
        form.review = "";
        form.rating = 0;
        currentPage.value = 1;
        await fetchReviews();
    }
};

/**
 * =========================================
 * 12. LIFECYCLE / ЖИТТЄВИЙ ЦИКЛ
 * =========================================
 * EN: Load reviews on mount
 * UA: Завантаження відгуків при ініціалізації
 */
onMounted(fetchReviews);
</script>

<template>
    <div class="flex flex-col gap-2">
        <div v-if="stats.total != 0" class="">
            <RatingStats
                :stats="stats"
                @filter-change="activeFilter = $event"
            />
        </div>
        <div class="">
            <div
                v-if="hasUserAlreadyReviewed"
                class="text-center p-6 bg-green-50 border border-green-100 rounded-xl"
            >
                <p class="text-green-800 font-medium">
                    {{ $t("Thank you for your feedback!") }}
                </p>
                <p class="text-green-600 text-sm mt-1">
                    {{
                        $t(
                            "Your opinion is important to us and helps us improve.",
                        )
                    }}
                </p>
            </div>

            <ReviewForm
                v-else
                :form="form"
                :is-authenticated="auth"
                @open-auth="isAuthModalOpen = true"
                @submit="handleSubmit"
                :loading="api.loading.value"
            />
        </div>

        <div class="">
            <ReviewList :loading="api.loading.value" :reviews="reviews" />
        </div>
    </div>

    <AuthModal :isOpen="isAuthModalOpen" @close="isAuthModalOpen = false" />
</template>
