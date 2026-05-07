<template>
    <div
        class="flex flex-col group relative p-2 w-full h-full transition-shadow hover:shadow-md rounded-xl bg-white border border-transparent hover:border-gray-100"
    >
        <div
            class="bg-gray-50 w-full h-64 rounded-lg overflow-hidden flex items-center justify-center"
        >
            <img
                v-if="data.images?.length"
                :src="data.images[0].url"
                :alt="data.title"
                class="w-full h-full object-contain transition-all duration-500 group-hover:scale-105"
            />
        </div>

        <div class="p-2 flex flex-col flex-grow">
            <h3
                class="font-semibold text-gray-800 transition-colors group-hover:text-brand line-clamp-2 h-12"
            >
                {{ data.title }}
            </h3>

            <div
                class="h-8 flex w-full items-center justify-start text-xs mt-2"
            >
                <StarRating
                    :read-only="true"
                    :show-average="false"
                    :initial-rating="Number(reviewsRating)"
                    :average-rating="Number(reviewsRating)"
                />
                <div
                    v-if="reviewsCount > 0"
                    class="flex items-center ml-2 text-gray-400"
                >
                    <IconMessage :stroke="1.5" class="w-3.5 h-3.5 mr-1" />
                    <span>{{ reviewsCount }}</span>
                </div>
            </div>

            <div
                class="mt-auto pt-4 flex items-center justify-between relative z-20"
            >
                <div class="flex flex-col">
                    <span
                        v-if="data.old_price"
                        class="text-xs text-gray-400 line-through"
                    >
                        {{ data.old_price }} ₴
                    </span>
                    <span class="text-lg font-bold text-black font-['Exo_2']">
                        {{ data.price }} ₴
                    </span>
                </div>

                <ButtonBuy
                    :id="data.id"
                    :title="data.title"
                    :price="data.price"
                    class="scale-90 origin-right"
                />
            </div>
        </div>

        <Link
            :href="route('page.show', data.slug)"
            class="absolute inset-0 z-10"
            aria-label="Переглянути товар"
        ></Link>
    </div>
</template>

<script setup>
import StarRating from "@/Components/Review/StarRating.vue";
import { Link } from "@inertiajs/vue3"; // Ensure Link is imported
import { IconMessage } from "@tabler/icons-vue";
import { computed } from "vue";
import ButtonBuy from "./ButtonBuy.vue";

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
