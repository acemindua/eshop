<template>
    <LanguagesTabs
        v-model="selectedLocale"
        :errors="errors"
        :fields="['title', 'description', 'content']"
    >
        <!-- Додаємо v-if, щоб не рендерити контент, поки об'єкт не готовий -->
        <TranslationContent
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
import TranslationContent from "@/Components/TranslationContent.vue";
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
