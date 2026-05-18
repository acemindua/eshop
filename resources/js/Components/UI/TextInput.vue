<script setup>
import { ref, onMounted, useTemplateRef } from "vue";

const props = defineProps({
    disabled: {
        type: Boolean,
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
        class="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-800 placeholder-slate-400 shadow-sm transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-50"
    />
</template>