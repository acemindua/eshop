<template>
    <pre>
        {{ data }}
    </pre>

    <LanguagesTabs
        v-model="selectedLocale"
        :errors="errors"
        :fields="['title', 'description', 'content']"
    >
        <!-- Adding :key="selectedLocale" forces an explicit component rebuild on tab switch -->
        <TranslationContent
            v-if="
                form[selectedLocale] && typeof form[selectedLocale] === 'object'
            "
            :key="selectedLocale"
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
    data: { type: Object, default: () => ({}) },
    form: { type: Object },
    errors: { type: Object },
    isEditing: { type: Boolean, default: false },
});
</script>
