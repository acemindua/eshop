<template>
    <div class="space-y-4">
        <div class="flex items-center space-x-2 text-slate-400 mb-4">
            <IconLanguage size="18" stroke="1.5" />
            <span class="text-[10px] uppercase font-bold tracking-widest">
                {{ $t("Localized Content") }}
            </span>
        </div>

        <LanguagesTabs v-model="selectedLocale" :errors="errors">
            <TranslationContent
                :code="selectedLocale"
                v-model="form[selectedLocale]"
                :errors="errors"
                :is-editing="isEditing"
                :model="'payment-methods'"
            />
        </LanguagesTabs>
    </div>
</template>

<script setup>
import LanguagesTabs from "@/Components/LanguagesTabs.vue";
import TranslationContent from "@/Components/TranslationContent.vue";
import { IconLanguage } from "@tabler/icons-vue";
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
