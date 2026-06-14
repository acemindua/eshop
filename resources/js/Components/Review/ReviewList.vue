<script setup>
import { computed } from "vue";
import StarRating from "./StarRating.vue";

const props = defineProps({
    loading: { type: Boolean, default: false },
    reviews: { type: Array, default: () => [] },
});

// 📊 стани
const isEmpty = computed(() => !props.loading && props.reviews.length === 0);

const hasReviews = computed(() => !props.loading && props.reviews.length > 0);

// 📅 формат дати
const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString();
};
</script>

<template>
    <div class="space-y-8">
        <!-- ⏳ Loading -->
        <div v-if="loading" class="flex justify-center py-10">
            <svg
                class="animate-spin h-5 w-5 text-blue-600"
                viewBox="0 0 24 24"
            ></svg>
        </div>

        <!-- 📭 Empty -->
        <div v-else-if="isEmpty" class="text-center py-12 text-gray-400 italic">
            {{
                $t(
                    "There are no reviews yet. Be the first to share your thoughts.",
                )
            }}
        </div>

        <!-- 📋 Reviews -->
        <div v-else class="space-y-4">
            <div
                v-for="review in reviews"
                :key="review.id"
                class="flex items-start gap-x-12"
            >
                <div class="py-2 shrink-0 flex flex-col">
                    <StarRating
                        :model-value="review.rating"
                        read-only
                        :show-average="false"
                        :size="18"
                    />
                    <span class="text-xs text-gray-500 mt-1">
                        {{ $formatDate(review.created_at) }}
                    </span>
                </div>
                <div class="flex-1">
                    <p
                        class="text-gray-800 leading-relaxed bg-gray-50 rounded-lg"
                    >
                        {{ review.review }}
                    </p>

                    <p class="mt-4 text-sm font-medium text-gray-600">
                        — {{ review.user_name }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
