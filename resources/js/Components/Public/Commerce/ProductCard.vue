<template>
    <div
        class="flex flex-col group relative p-2 w-full h-full transition-shadow hover:shadow-md rounded-xl"
    >
        <div class="bg-gray-100 w-full h-64 rounded-lg overflow-hidden">
            <img
                v-if="data.images?.length"
                :src="data.images[0].url"
                alt=""
                class="w-full h-full object-contain transition-all duration-500 group-hover:scale-105"
            />
        </div>

        <div class="p-2">
            <h3
                class="font-semibold text-gray-800 transition-colors group-hover:text-brand"
            >
                {{ data.title }}
            </h3>
        </div>
        <div class="h-8 flex w-full items-center justify-start text-xs">
            <div>
                <StarRating
                    :read-only="true"
                    :show-average="false"
                    :initial-rating="Number(reviewsRating)"
                    :average-rating="Number(reviewsRating)"
                />
            </div>
            <div v-if="hasReviews" class="flex items-center space-x-2">
                <p class="flex items-center space-x-1">
                    <IconMessage :stroke="1" class="w-4 h-4" />
                    <span class="ml-2"> {{ reviewsCount }}</span>
                </p>
            </div>
            <div v-else class="flex items-center space-x-1 py-1">
                <IconMessage :stroke="1" class="w-4 h-4" />
                <Link
                    :href="`${productLink}#reviews`"
                    :alt="data.title"
                    class="hover:underline hover:text-gray-700 duration-200"
                >
                    <span class="text-gray-500">Залишити відгук</span>
                </Link>
            </div>
        </div>

        <Link
            :href="route('page.show', data.slug)"
            class="absolute inset-0 z-10"
            aria-label="Читати детальніше"
        ></Link>
    </div>
</template>

<script setup>
import StarRating from "@/Components/Review/StarRating.vue";
import { Link } from "@inertiajs/vue3"; // Ensure Link is imported
import { IconMessage } from "@tabler/icons-vue";
import { computed } from "vue";

const props = defineProps({
    data: Object,
});

const hasReviews = computed(
    () =>
        props.data?.reviews?.rating !== null && props.data?.reviews?.count > 0,
);
const reviewsCount = computed(() => props.data?.average_reviews?.count || 0);
const reviewsRating = computed(() => props.data?.average_reviews?.rating || 0);
</script>
