<!-- resources/js/Components/UI/TextEditor.vue -->
<template>
    <ckeditor
        v-model="editorHtml"
        :editor="ClassicEditor"
        :config="ckeditorConfig"
    />
</template>

<script setup>
import { computed } from "vue";

// 1. Імпортуємо ядро редактора та Vue-обгортку
import { ClassicEditor } from "ckeditor5";
import { Ckeditor } from "@ckeditor/ckeditor5-vue";

// 2. Імпортуємо наш новий конфіг (відкоригуй шлях, якщо твій файл в іншому місці)
import { ckeditorConfig } from "../../../plugins/ckeditor.js";

// 3. Стилі залишаємо в компоненті, щоб вони застосовувалися до UI
import "ckeditor5/ckeditor5.css";
import "../../../css/ckeditor-custom.css";

const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const editorHtml = computed({
    get: () => props.modelValue,
    set: (value) => emit("update:modelValue", value),
});
</script>
