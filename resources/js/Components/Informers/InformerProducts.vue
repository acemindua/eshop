<template>
    <div class="bg-white flex flex-col rounded-md border">
        <div class="grow flex flex-row">
            <div class="grow flex flex-col p-4 space-y-2">
                <h4 class="uppercase font-semibold text-xs text-gray-400">
                    Total Products
                </h4>
                <p class="text-xl font-semibold">{{ total }}</p>
            </div>
            <div class="flex items-center justify-center px-3 text-purple-500">
                <IconCheese stroke="{2}" :size="40" />
            </div>
        </div>
        <div
            class="border-t border-slate-200 px-4 py-2 rounded-b-md bg-slate-50 text-xs flex space-x-2"
        >
            <!-- Відсоткове зростання/спад -->
            <span class="text-orange-500">{{ procent }} %</span>
            <!-- Текст про попередній місяць -->
            <span class="text-slate-500">active items</span>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import ApiStats from "@/Composables/Api/get_stats";
import {
    IconCheese,
    IconTrendingUp3,
    IconTrendingDown3,
} from "@tabler/icons-vue";

// Оголошення пропсів компонента
const props = defineProps({
    url: {
        type: String,
        required: true,
    },
});

// Використання кастомного хука для отримання статистики користувачів
const { data, getResponse } = ApiStats();

// Обчислювана властивість для загальної кількості користувачів
const total = computed(() => data.value.total || 0);

// Обчислювана властивість для відсоткового зростання відносно попереднього місяця
const procent = computed(() => {
    // Перевірка, що є дані про попередній місяць і вони більше 0
    if (data.value.total > 0) {
        return ((data.value.active / data.value.total) * 100).toFixed(1);
    } else {
        // Якщо немає даних про попередній місяць, повертаємо 100% зниження
        return 100;
    }
});

// Запит на отримання даних після монтування компонента
onMounted(() => {
    getResponse(props.url);
});
</script>
