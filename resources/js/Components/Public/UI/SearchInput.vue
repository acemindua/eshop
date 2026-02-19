<script setup>
import { ref } from "vue";
import { IconSearch } from "@tabler/icons-vue";
import { usePage } from "@inertiajs/vue3";

const query = ref(usePage().props?.filters?.q || "");
const focusInput = ref(false);

const emit = defineEmits(["search", "focus"]);

const onFocus = () => {
    focusInput.value = true;
    emit("focus", true);
};

const onBlur = () => {
    focusInput.value = false;
    emit("focus", false);
};

const handleSearch = () => {
    // Дозволяємо пошук, якщо query порожній (наприклад, для скидання фільтрів)
    // або залиште trim, якщо це критично
    if (!query.value) return;
    emit("search", query.value);
};
</script>

<template>
    <form
        @submit.prevent="handleSearch"
        class="group relative flex w-full items-stretch rounded-lg border-2 border-brand transition-colors focus-within:border-brand-dark overflow-hidden"
    >
        <div
            class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
        >
            <IconSearch
                :stroke="1.5"
                size="20"
                class="transition-colors"
                :class="focusInput ? 'text-brand' : 'text-gray-400'"
            />
        </div>

        <input
            v-model="query"
            type="search"
            name="search"
            autocomplete="off"
            class="block w-full pl-10 pr-3 py-2 border-0 focus:ring-0 placeholder:text-gray-400 text-sm"
            aria-label="Search"
            :placeholder="`${$t('Search')} ...`"
            @focus="onFocus"
            @blur="onBlur"
        />

        <button
            type="submit"
            class="bg-brand hover:bg-brand-dark transition-colors duration-150 text-white px-6 flex items-center justify-center"
        >
            <span class="hidden md:inline font-semibold text-sm">
                {{ $t("Знайти") }}
            </span>
            <IconSearch :size="18" class="md:hidden" />
        </button>
    </form>
</template>
