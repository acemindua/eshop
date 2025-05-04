<!-- Commerce/Products/Partials/GeneralProductForm -->
<template>
    <LanguagesTabs v-model="selectedLocale" :errors="errors">
        <div class="bg-gray-50 border rounded-lg p-4 md:p-8">
            <TanslationContent
                :code="selectedLocale"
                v-model="form[selectedLocale]"
                :errors="errors"
                :is-editing="isEditing"
            />
        </div>
    </LanguagesTabs>
</template>

<script setup>
// Core Vue & Inertia
import { ref } from "vue";
import { usePage } from "@inertiajs/vue3";

// Shared Components
import LanguagesTabs from "@/Shared/LanguagesTabs.vue";

import TanslationContent from "./TanslationContent.vue";

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
