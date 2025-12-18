<template>
    <ckeditor v-model="editorHtml" :editor="CKEditor" />
</template>

<script setup>
import { computed } from "vue";
import { Ckeditor } from "@ckeditor/ckeditor5-vue";
import CKEditor from "../../../plugins/ckeditor";

const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const editorHtml = computed({
    get: () => props.modelValue,
    set: (value) => emit("update:modelValue", value),
});
</script>

<style scope>
.ck {
}
.ck a {
    text-decoration: underline;
    color: blueviolet;
}
.ck-rounded-corners {
    border-radius: 0.375rem; /* 6px */
}
/* Для вмісту редактора */
.ck-content .editor-tooltip-target {
}

/* Основний контейнер редактора */
.ck-editor {
}
/* Область редагування */
.ck-editor__editable {
    height: 500px;
}
</style>
