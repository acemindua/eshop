<template>
    <div class="bg-white flex flex-col rounded-md border">
        <div class="grow flex flex-row">
            <div class="grow flex flex-col p-4 space-y-2">
                <h4 class="uppercase font-semibold text-xs text-gray-400">
                    Total Users
                </h4>
                <p class="text-xl font-semibold">{{ total }}</p>
            </div>
            <div class="flex items-center justify-center px-3 text-blue-500">
                <IconUserCircle stroke="{2}" :size="40" />
            </div>
        </div>
        <div
            class="border-t border-slate-200 px-4 py-2 rounded-b-md bg-slate-50 text-xs flex space-x-2"
        >
            <!-- Відсоткове зростання/спад -->
            <span
                :class="procent > 0 ? 'text-green-500' : 'text-red-500'"
                class="flex items-center space-x-1"
            >
                <span>{{ procent > 0 ? "+" : "" }}{{ procent }} %</span>
                <!-- Умовне відображення іконки зростання або спаду -->
                <component
                    :is="procent > 0 ? IconTrendingUp3 : IconTrendingDown3"
                    stroke="2"
                    :size="18"
                />
            </span>
            <!-- Текст про попередній місяць -->
            <span class="text-slate-500">than last month</span>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import ApiStats from "@/Composables/Api/get_stats";
import {
    IconUserCircle,
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

// Обчислювана властивість для кількості нових користувачів цього місяця
const new_users = computed(() => data.value.new || 0);

// Обчислювана властивість для відсоткового зростання відносно попереднього місяця
const procent = computed(() => {
    // Перевірка, що є дані про попередній місяць і вони більше 0
    if (data.value.previous > 0) {
        return (
            ((new_users.value - data.value.previous) / data.value.previous) *
            100
        ).toFixed(1);
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
