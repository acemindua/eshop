<script setup>
import { onMounted, useTemplateRef } from "vue";

const props = defineProps({
    disabled: {
        type: Boolean,
        default: false,
    },
    // Додаємо пропс для відстеження помилки валідації
    error: {
        type: [String, Boolean],
        default: false,
    },
});

// Автоматично створює двостороннє зв'язування (v-model)
const model = defineModel({ type: [String, Number, null], required: true });

// Сучасний спосіб отримання посилань на DOM-елементи у Vue 3
const inputRef = useTemplateRef("input");

onMounted(() => {
    if (inputRef.value?.hasAttribute("autofocus") && !props.disabled) {
        inputRef.value.focus();
    }
});

defineExpose({
    focus: () => {
        if (!props.disabled) inputRef.value?.focus();
    },
});
</script>

<template>
    <input
        ref="input"
        v-model="model"
        :disabled="disabled"
        type="text"
        class="block w-full rounded-lg border px-3 py-2 text-sm shadow-sm transition-colors duration-200 outline-none focus:ring-4 disabled:cursor-not-allowed disabled:opacity-60"
        :class="[
            // Базові стилі тексту та фону (світла + темна тема)
            'bg-white text-slate-900 placeholder-slate-400 dark:bg-slate-900 dark:text-slate-100 dark:placeholder-slate-500',

            // Динамічні стилі залежно від наявності помилки
            error
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10 dark:border-red-500/80 dark:focus:border-red-500'
                : 'border-slate-200 hover:border-slate-300 focus:border-indigo-500 focus:ring-indigo-500/10 dark:border-slate-700 dark:hover:border-slate-600 dark:focus:border-indigo-500',
        ]"
    />
</template>
