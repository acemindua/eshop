<template>
    <div class="flex flex-col">
        <!-- Tab Navigation: Compact & Scrollable -->
        <div
            v-if="countLanguages > 1"
            class="mb-3 overflow-x-auto no-scrollbar"
        >
            <ul class="flex flex-nowrap gap-2 pb-1">
                <li
                    v-for="(locale, code) in locales"
                    :key="code"
                    class="relative"
                >
                    <button
                        @click.prevent="selected = code"
                        type="button"
                        class="px-3 py-2 rounded-lg border transition-all duration-200 inline-flex items-center gap-2 group"
                        :class="[
                            selected === code
                                ? 'bg-white border-indigo-200 text-indigo-700 ring-4 ring-indigo-50 shadow-sm'
                                : 'bg-gray-50 border-gray-100 text-gray-500 hover:bg-gray-100 hover:text-gray-700',
                            hasError(code) ? 'border-red-200 bg-red-50/50' : '',
                        ]"
                    >
                        <!-- Flag Icon -->
                        <flag
                            v-if="locale.regional"
                            :iso="getCountryCode(locale.regional)"
                            class="rounded-sm text-[14px] shrink-0 shadow-sm opacity-90 group-hover:opacity-100"
                        />

                        <!-- Language Code (Small & Bold) -->
                        <span
                            class="font-bold text-[11px] uppercase tracking-wider md:hidden"
                        >
                            {{ code }}
                        </span>

                        <!-- Native Name (Desktop Only) -->
                        <span
                            class="capitalize text-[12px] hidden md:block font-medium opacity-80 group-hover:opacity-100 transition-opacity"
                        >
                            {{ locale.native }}
                        </span>
                    </button>

                    <!-- Error Indicator: Animated Pulse -->
                    <span
                        v-if="hasError(code)"
                        class="absolute top-1 right-1 flex h-3 w-3 z-50"
                    >
                        <span
                            class="animate-ping absolute h-full w-full rounded-full bg-red-400 opacity-75"
                        ></span>
                        <span
                            class="h-3 w-3 rounded-full bg-red-500 border-2 border-white shadow-sm"
                        ></span>
                    </span>
                </li>
            </ul>
        </div>

        <!-- Content Container -->
        <div class="transition-all duration-300 overflow-hidden">
            <slot />
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { usePage } from "@inertiajs/vue3";

const props = defineProps({
    errors: { type: Object, default: () => ({}) },
    // Додаємо новий пропс для масиву полів поточного таба
    fields: { type: Array, default: () => [] },
});

const selected = defineModel({ type: String });

const page = usePage();
const locales = computed(() => page.props.config.supportedLocales || {});
const countLanguages = computed(() => Object.keys(locales.value).length);

onMounted(() => {
    if (!selected.value && countLanguages.value > 0) {
        selected.value = Object.keys(locales.value)[0];
    }
});

/**
 * Оптимізована перевірка помилок:
 * Перевіряє, чи є помилка для конкретної мови (code)
 * серед полів, які належать до поточного таба (props.fields)
 */
const hasError = (code) => {
    const errorKeys = Object.keys(props.errors || {});

    // Якщо поля не передані, перевіряємо просто наявність будь-якої помилки для цієї мови
    if (props.fields.length === 0) {
        return errorKeys.some((k) => k.startsWith(`${code}.`));
    }

    // Перевіряємо, чи є ключ помилки у форматі "uk.поле", де "поле" є в нашому списку таба
    return errorKeys.some((k) => {
        return props.fields.some((field) => k === `${code}.${field}`);
    });
};

const getCountryCode = (r) =>
    r && r.includes("_") ? r.split("_")[1].toLowerCase() : "uk";
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
    display: none;
}
.no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
