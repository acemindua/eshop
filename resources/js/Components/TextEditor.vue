<template>
    <ckeditor v-model="editorHtml" :editor="CKEditor" />
</template>

<script setup>
import { computed } from "vue";
import { Ckeditor } from "@ckeditor/ckeditor5-vue";
import CKEditor from "../../plugins/ckeditor";

const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const editorHtml = computed({
    get: () => props.modelValue,
    set: (value) => emit("update:modelValue", value),
});
</script>

<style scope>
.ck {
    border: 0px solid rgb(209 213 219 / var(--tw-border-opacity, 1)) !important; /* #d1d5db */
}
.ck-rounded-corners {
    border-radius: 0.375rem; /* 6px */
}

/* Основний контейнер редактора */
.ck-editor {
    overflow: hidden;
    border: 1px solid rgb(209 213 219 / var(--tw-border-opacity, 1)) !important; /* #d1d5db */
    /* Запобігає виходу контенту за межі */
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
        var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
    width: 100%;
}
/* Область редагування */
.ck-editor__editable {
    height: 100%;
    overflow-y: auto;
    border-top: 1px solid rgb(209 213 219 / var(--tw-border-opacity, 1)) !important; /* #d1d5db */
    box-shadow: none !important;
}

/* Встановлення висоти через динамічні властивості */
.ck-editor__editable {
    height: var(
        --editor-height,
        400px
    ); /* Використовуємо змінну або висоту за замовчуванням */
}
</style>
