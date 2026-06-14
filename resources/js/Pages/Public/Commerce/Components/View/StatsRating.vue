<script setup>
import { wTransChoice } from "laravel-vue-i18n";
import StarRating from "@/Components/Review/StarRating.vue";
import { IconMessage } from "@tabler/icons-vue";

defineProps({
    averageReviews: Object,
});
</script>

<template>
    <div class="text-sm">
        <div
            v-if="averageReviews.rating"
            class="flex items-center gap-1 group cursor-pointer"
        >
            <StarRating
                class="md:hidden"
                :model-value="averageReviews.rating"
                :size="14"
                read-only
                :max-stars="1"
            />

            <StarRating
                class="hidden md:flex"
                :model-value="averageReviews.rating"
                :size="14"
                read-only
                :max-stars="5"
            />

            <span class="md:hidden font-medium text-gray-800">
                {{ averageReviews.rating }}
            </span>

            <span class="text-gray-300">•</span>

            <div class="flex items-center gap-1 text-gray-600 transition">
                <IconMessage :stroke="1" class="w-4 h-4" />
                <span class="hidden md:block">
                    {{
                        wTransChoice("reviews", averageReviews.total, {
                            count: averageReviews.total,
                        })
                    }}
                </span>
                <span class="md:hidden">{{ averageReviews.total }}</span>
            </div>
        </div>

        <div v-else class="text-gray-400">
            {{ $t("Be the first to review") }}
        </div>
    </div>
</template>
