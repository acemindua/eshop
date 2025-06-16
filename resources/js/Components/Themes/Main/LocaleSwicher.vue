<template>
    <ul class="inline-flex items-center divide-x">
        <li v-for="(label, code) in keys" :key="code">
            <Link
                :href="route('lang.swicher', code)"
                @click.prevent="switchLanguage(code)"
                :aria-label="`Switch to ${label}`"
                class="px-2"
                :class="label === currentLocale ? 'text-green-500 ' : ''"
            >
                <span class="uppercase">{{ label }}</span>
            </Link>
        </li>
    </ul>
</template>

<script setup>
import { loadLanguageAsync } from "laravel-vue-i18n";
// Assuming 'Link' is globally available or imported from Inertia.js
// import { Link } from '@inertiajs/vue3'; // Example if not globally registered

const props = defineProps({
    currentLocale: {
        // Renamed from 'curent' for clarity
        type: String,
        required: true, // Corrected typo from 'requared'
        default: "en",
    },
    keys: {
        type: Object,
        required: true, // Assuming keys is always provided
    },
});

// A wrapper function to handle the async loading and potentially error states
const switchLanguage = async (code) => {
    try {
        await loadLanguageAsync(code);
        // Optionally, you might want to emit an event or show a success message here
        // console.log(`Language switched to: ${code}`);
    } catch (error) {
        console.error(`Failed to load language ${code}:`, error);
        // Handle error, e.g., show a notification to the user
    }
};
</script>
