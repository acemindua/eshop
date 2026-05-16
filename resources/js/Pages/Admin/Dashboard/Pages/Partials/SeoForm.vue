<template>
    <LanguagesTabs
        v-model="selectedLocale"
        :errors="errors"
        :fields="['slug', 'meta_title', 'meta_description', 'meta_keywords']"
    >
        <!-- Додаємо v-if, щоб не рендерити контент, поки об'єкт не готовий -->
        <TranslationSEOContent
            v-if="
                form[selectedLocale] && typeof form[selectedLocale] === 'object'
            "
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
    data: {
        type: Object,
        default: () => ({}),
    },
    form: { type: Object },
    errors: { type: Object },
    isEditing: {
        type: Boolean,
        default: false, // Якщо не передано — вважається "створення"
    },
});
</script>
