<script setup>
import { computed } from "vue";
import { IconStarFilled } from "@tabler/icons-vue";
import StarRating from "./StarRating.vue";
import { wTransChoice } from "laravel-vue-i18n";

const props = defineProps({
    stats: { type: Object, required: true },
});
const emit = defineEmits(["filter-change"]);

const selectFilter = (star) => {
    emit("filter-change", star);
};
// 📊 загальна кількість
const total = computed(() => props.stats.total || 0);

// 📊 підготовка даних 5 → 1
const breakdownList = computed(() => {
    return [5, 4, 3, 2, 1].map((star) => {
        const count = props.stats.breakdown?.[star] || 0;

        return {
            star,
            count,
            percent: total.value ? Math.round((count / total.value) * 100) : 0,
        };
    });
});
</script>

<template>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <!-- ⭐ Summary -->
        <div class="flex flex-col items-center justify-center space-y-2">
            <p class="text-3xl font-semibold">
                {{ $formatNumber(stats.rating) }}

                <span class="text-base font-normal">
                    ({{
                        wTransChoice("reviews", stats.total, {
                            count: stats.total,
                        })
                    }})
                </span>
            </p>

            <StarRating
                :model-value="stats.rating"
                read-only
                :show-average="false"
            />
        </div>

        <!-- 📊 Breakdown -->
        <div class="md:col-span-2 space-y-2">
            <div
                v-for="item in breakdownList"
                :key="item.star"
                @click="selectFilter(item.star)"
                @keydown.enter="selectFilter(item.star)"
                role="button"
                tabindex="0"
                :aria-label="`Filter by ${item.star} stars, ${item.count} reviews`"
                class="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
            >
                <!-- ⭐ label -->
                <div class="flex items-center gap-1 w-12">
                    <span class="text-sm">{{ item.star }}</span>
                    <IconStarFilled class="text-orange-500 w-4 h-4" />
                </div>

                <!-- 📊 bar -->
                <div class="flex-1 h-2 bg-gray-200 rounded overflow-hidden">
                    <div
                        class="h-full bg-orange-500 transition-all duration-500"
                        :style="{ width: item.percent + '%' }"
                    />
                </div>

                <!-- 🔢 count -->
                <div class="w-10 text-sm text-gray-600 text-right">
                    {{ item.count }}
                </div>
            </div>
        </div>
    </div>
</template>
