<template>
    <LanguagesTabs v-model="selectedLocale" :errors="errors">
        <TranslationSEOContent
            :code="selectedLocale"
            v-model="form[selectedLocale]"
            :errors="errors"
            :is-editing="isEditing"
        />
    </LanguagesTabs>
</template>

<script setup>
import LanguagesTabs from "@/Components/LanguagesTabs.vue";
import TranslationSEOContent from "@/Components/TranslationSEOContent.vue";
import { usePage } from "@inertiajs/vue3";
import { ref } from "vue";

const selectedLocale = ref(usePage().props.config.locale);

const props = defineProps({
    form: { type: Object },
    errors: { type: Object },
    isEditing: {
        type: Boolean,
        default: false, // Якщо не передано — вважається "створення"
    },
});
</script>
