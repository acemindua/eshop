<template>
  
   
        <!-- Контейнер Інспектора Даних -->
        <div
            class="w-full max-w-xl mx-auto rounded-xl shadow-2xl transition-all duration-300 bg-gray-900 overflow-hidden border border-gray-700 transform scale-100"
        >
            <!-- Хедер / Панель із кнопкою закриття -->
            <div class="p-3 bg-gray-800 flex items-center justify-between">
                <h3
                    class="text-xs font-semibold uppercase tracking-wider text-indigo-400"
                >
                    Інспектор Даних (JSON)
                </h3>

                <!-- Кнопка закриття -->
                <button
                    @click="emit('close')"
                    class="p-1 rounded-full text-gray-400 hover:text-white hover:bg-red-500 transition"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>

            <!-- Область Контенту -->
            <div class="relative overflow-auto max-h-[80vh]">
                <pre
                    class="p-4 text-left font-mono text-sm leading-relaxed text-green-300 whitespace-pre-wrap"
                    >{{ formattedData }}
                </pre>
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
