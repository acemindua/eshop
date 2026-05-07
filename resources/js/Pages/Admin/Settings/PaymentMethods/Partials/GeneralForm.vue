<template>
    <div class="space-y-4">
        <LanguagesTabs v-model="selectedLocale" :errors="errors">
            <TranslationContent
                :code="selectedLocale"
                v-model="form[selectedLocale]"
                :errors="errors"
                :is-editing="isEditing"
                entity-type="payment-methods"
            />
        </LanguagesTabs>
    </div>
</template>

<script setup>
import LanguagesTabs from "@/Components/LanguagesTabs.vue";
import TranslationContent from "./TranslationContent.vue";
import { usePage } from "@inertiajs/vue3";
import { ref } from "vue";

const selectedLocale = ref(usePage().props.config.locale);

const props = defineProps({
    form: { type: Object },
    errors: { type: Object },
    isEditing: {
        type: Boolean,
        default: false,
    },
});
</script>
