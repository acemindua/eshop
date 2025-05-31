<template>
    <div class="bg-gray-50 p-6 rounded-lg shadow-md mt-6">
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

        <h3 class="text-xl mb-4 text-gray-800">
            {{ $t("Leave a review") }}
        </h3>
        <div v-if="auth">
            <form @submit.prevent="handleSubmit">
                <div class="mb-4">
                    <label
                        for="rating"
                        class="block text-sm font-medium text-gray-700 mb-1"
                        >Рейтинг:</label
                    >
                    <StarRating
                        v-model="form.rating"
                        @rating-selected="form.rating = $event"
                    />
                    <p
                        v-if="api.errors.value.rating"
                        class="mt-1 text-sm text-red-600"
                    >
                        {{ api.errors.value.rating[0] }}
                    </p>
                </div>
                <div class="mb-6">
                    <label
                        for="review"
                        class="block text-sm font-medium text-gray-700 mb-1"
                        >Відгук:</label
                    >
                    <textarea
                        id="review"
                        v-model="form.review"
                        rows="5"
                        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 sm:text-sm"
                        placeholder="Напишіть свій відгук тут..."
                    ></textarea>
                    <p
                        v-if="api.errors.value.review"
                        class="mt-1 text-sm text-red-600"
                    >
                        {{ api.errors.value.review[0] }}
                    </p>
                </div>

                <button
                    type="submit"
                    :disabled="api.loading.value || form.rating === 0"
                    class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <span v-if="api.loading.value">Відправка...</span>
                    <span v-else>Надіслати відгук</span>
                </button>
                <div
                    v-if="api.successMessage.value"
                    class="mt-3 text-sm text-green-600"
                >
                    {{ api.successMessage.value }}
                </div>
                <div
                    v-if="api.errorMessage.value"
                    class="mt-3 text-sm text-red-600"
                >
                    {{ api.errorMessage.value }}
                </div>
            </form>
        </div>
        <div
            v-else
            class="not-logged-in-message bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative text-center"
        >
            Будь ласка,
            <a href="/login" class="text-blue-600 hover:underline">увійдіть</a>
            або
            <a href="/register" class="text-blue-600 hover:underline"
                >зареєструйтесь</a
            >, щоб залишити відгук.
        </div>

        <hr class="my-8 border-t-2 border-gray-200" />
    </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { usePage } from "@inertiajs/vue3";
import { useReviewApi } from "@/Composables/useReviewApi"; // Імпорт composable
import StarRating from "./StarRating.vue";
import { computed } from "vue";

const props = defineProps({
    modelType: {
        type: String,
        required: true,
    },
    modelId: {
        type: Number,
        required: true,
    },
});

const emit = defineEmits(["review-added"]);

// Використання composable
const api = useReviewApi();
const auth = computed(() => usePage().props.auth.user || null);
const form = reactive({
    title: "",
    review: "",
    rating: 0,
    model: props.modelType,
    model_id: props.modelId,
    user_id: auth.value.id,
});

const averageRating = ref(null);
const reviewsCount = ref(0);

const handleSubmit = async () => {
    if (form.rating === 0) {
        api.errors.value.rating = ["Будь ласка, оберіть рейтинг."];
        return;
    }
    const success = await api.submitReview(form);
    if (success) {
        // Очистити форму після успішного надсилання
        form.title = "";
        form.review = "";
        form.rating = 0;
        emit("review-added"); // Повідомити батьківський компонент
    }
};

const fetchAverageRating = async () => {
    const data = await api.fetchAverageRating("products", props.productId);
    if (data) {
        averageRating.value = data.average_rating;
        reviewsCount.value = data.reviews_count;
    }
};

onMounted(async () => {
    await fetchAverageRating();
});
</script>
