<template>
    <!-- Контейнер Інспектора Даних -->
    <div class="bg-slate-200 dark:bg-slate-800 rounded-lg">
        <!-- Область Контенту -->
        <div class="relative overflow-auto max-h-[80vh]">
            <pre
                class="p-8 border dark:border-slate-700 rounded-lg border-slate-200 text-left font-mono text-xs leading-relaxed text-slate-600 dark:text-slate-500 whitespace-pre-wrap"
                >{{ formattedData }}
                </pre
            >
        </div>
    </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
    data: {
        type: [Object, Array, String, Number, null],
        default: () => ({}),
    },
});

const emit = defineEmits(["close"]);

/**
 * Обчислювана властивість для гарного форматування об'єкта в JSON-рядок.
 */
const formattedData = computed(() => {
    if (props.data === null || props.data === undefined) {
        return "null";
    }

    // Якщо дані є об'єктом/масивом, форматуємо їх
    if (typeof props.data === "object") {
        try {
            return JSON.stringify(props.data, null, 2);
        } catch (e) {
            return `[Помилка: Неможливо серіалізувати дані в JSON]`;
        }
    }

    // Якщо дані є примітивним типом або вже рядком
    return String(props.data);
});
</script>
