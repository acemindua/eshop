<script setup>
import { router, usePage } from "@inertiajs/vue3";
import { IconSearch, IconX } from "@tabler/icons-vue";
import { ref, watch } from "vue";

const emit = defineEmits(["focusin"]);

const page = usePage();
const query = ref(page.props.filters?.q ?? "");
const isInputFocused = ref(false);

const goToResults = () => {
    const trimmedQuery = query.value.trim();
    if (!trimmedQuery) {
        return;
    }
    router.get("/search", { q: trimmedQuery });
};

const clearFilter = () => {
    query.value = "";
    // Optionally: Automatically perform a search to clear results if 'q' was in URL
    // router.get("/search", {}, { preserveState: true, replace: true });
};

const onFocus = () => {
    isInputFocused.value = true;
    emit("focusin"); // This tells the parent component to show the results
};

const onBlur = () => {
    // A small delay helps prevent immediate closing if clicking on a result
    setTimeout(() => {
        isInputFocused.value = false;
    }, 150); // Adjust delay as needed
};

watch(query, (newValue) => {
    if (newValue === "" && page.props.filters?.q) {
        // Example: router.get("/search", {}, { preserveState: true, replace: true });
    }
});
</script>

<template>
    <form @submit.prevent="goToResults">
        <div
            class="inline-flex w-full items-center rounded-md border bg-white z-50 relative"
            :class="{ 'border-green-500': isInputFocused }"
        >
            <label for="search" class="sr-only">Search</label>
            <input
                v-model="query"
                @focus="onFocus"
                @blur="onBlur"
                type="text"
                ref="input"
                id="input-search"
                class="m-0 block w-full rounded-md border-0 bg-white px-4 text-sm text-gray-800 focus:rounded-md focus:border-0 focus:outline-none focus:ring-0"
                autocomplete="off"
                autocorrect="off"
                autocapitalize="off"
                spellcheck="false"
                :placeholder="`${$t('Search')}...`"
            />

            <button
                v-if="query"
                @click="clearFilter"
                type="button"
                ref="button-clear"
                id="button-clear"
                class="transition-all duration-200"
                :class="{ 'border-l px-2': query }"
                aria-label="Clear search"
            >
                <IconX
                    :stroke="2"
                    class="size-4 transition-colors duration-200 text-gray-500 hover:text-red-500"
                />
            </button>

            <button
                type="submit"
                ref="button-search"
                id="button-search"
                class="rounded-md px-3 py-2 transition-colors duration-200"
                aria-label="Search"
            >
                <IconSearch
                    :stroke="2"
                    class="size-6 transition-colors duration-200"
                    :class="{
                        'text-green-500': isInputFocused,
                        'text-gray-500': !isInputFocused,
                    }"
                />
            </button>
        </div>
    </form>
</template>
