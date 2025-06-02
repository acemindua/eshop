<script setup>
import { ref, onMounted, handleError } from "vue";
import { useReviewApi } from "@/Composables/useReviewApi"; // Імпорт composable
import ReviewForm from "./ReviewForm.vue";
import StarRating from "./StarRating.vue";
import ReviewList from "./ReviewList.vue";

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
const api = useReviewApi();
const averageRating = ref(null);
const reviewsCount = ref(0);

const fetchAverageRating = async () => {
    const data = await api.fetchAverageRating(props.modelType, props.modelId);
    if (data) {
        averageRating.value = data.average_rating;
        reviewsCount.value = data.reviews_count;
    }
};

onMounted(async () => {
    await fetchAverageRating();
});

const handleAddedReviews = async () => {
    console.log("handleAddedReviews");
};
</script>

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

        <ReviewForm
            :model-type="modelType"
            :model-id="modelId"
            @review-added="handleAddedReviews"
        />

        <hr class="my-8 border-t-2 border-gray-200" />

        <ReviewList :model-type="modelType" :model-id="modelId" />
    </div>
</template>
