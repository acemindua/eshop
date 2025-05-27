<template>
    <LanguagesTabs v-model="selectedLocale" :errors="errors">
        <TranslationContent
            :code="selectedLocale"
            v-model="form[selectedLocale]"
            :errors="errors"
            :is-editing="isEditing"
        />
    </LanguagesTabs>
</template>

<script setup>
import { ref } from "vue";
import { usePage } from "@inertiajs/vue3";
import LanguagesTabs from "@/Shared/LanguagesTabs.vue";
import TranslationContent from "@/Components/TranslationContent.vue";

const page = usePage();
const selectedLocale = ref(page.props.lang.default);

const props = defineProps({
    form: { type: Object },
    errors: { type: Object },
    isEditing: {
        type: Boolean,
        default: false, // Якщо не передано — вважається "створення"
    },
});
</script>
