<template>
    <div
        v-show="isActive"
        class="fixed inset-0 bg-gray-800/10"
        @click="close"
    />
    <div class="w-full relative">
        <div
            class="bg-white flex items-center z-50 rounded-lg border-2 border-green-600 overflow-hidden"
        >
            <label for="search" class="sr-only">Search</label>
            <input
                ref="input"
                id="search"
                name="search"
                v-model="query"
                @focus="onFocus"
                @blur=""
                @keyup.enter="goToResults"
                :placeholder="!query ? displayedText : ''"
                class="border-0 focus:rounded-lg focus:outline-none focus:border-0 focus:ring-0 rounded-lg w-full"
                autocomplete="off"
                autocorrect="off"
                autocapitalize="off"
                spellcheck="false"
            />
            <button
                v-if="query && query.length > 0"
                type="button"
                @click="clear"
                class="text-gray-600 p-2 duration-300 border-l"
            >
                <IconX :stroke="1" class="w-6 h-6" />
            </button>
            <button
                type="button"
                @click="goToResults"
                class="p-2 lg:pl-3 text-white duration-300 flex items-center text-sm lg:space-x-2"
                :class="isActive ? 'bg-green-600 ' : 'bg-green-600 '"
            >
                <span class="hidden lg:block">{{ $t("Знайти") }}</span>
                <IconSearch :stroke="2" />
            </button>
        </div>

        <div
            v-show="isActive"
            class="bg-white p-4 px-6 w-full border absolute top-14 left-0 z-50 rounded-xl"
        >
            <p v-if="top_queries.length" class="font-semibold mb-2">
                Топ запитів:
            </p>
            <ul v-if="top_queries.length">
                <li
                    v-for="top in top_queries"
                    :key="top.query"
                    class="py-1 text-sm text-gray-700"
                >
                    <Link
                        :href="`/search?q=${encodeURIComponent(top.query)}`"
                        class="hover:underline hover:text-green-700 transition-colors duration-200"
                    >
                        {{ top.query }}
                    </Link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { usePage, router, Link } from "@inertiajs/vue3";
import { IconSearch, IconX } from "@tabler/icons-vue";
import { ref, onMounted, onUnmounted } from "vue";

import searchHistory from "@/services/history";

// Початковий запит з параметрів сторінки
const page = usePage();
const query = ref(page.props.filters?.q ?? "");
const top_queries = ref([]);

const emit = defineEmits(["focusin"]);

const onFocus = () => {
    if (top_queries.value.length) {
        isActive.value = true;
    }

    emit("focusin");
};
// Стан
const isActive = ref(false);
const displayedText = ref(`Знайти ...`);

const close = () => {
    isActive.value = false;
};

const handleBlur = () => {
    setTimeout(() => (isActive.value = false), 150);
};

const input = ref(null);
const clear = () => {
    query.value = "";
    onFocus();
    input.value.focus();
};

const goToResults = () => {
    if (!query.value.trim()) return;
    router.get("/search", { q: query.value });
};

//
let currentIndex = 0;
let charIndex = 0;
let typingInterval;
const phrases = [
    "сульфат магнію",
    "селітра",
    "підкислювач грунту",
    "NPK",
    "добрива під сою",
];

/**
 *
 */

onMounted(async () => {
    typingInterval = setInterval(startTyping, 100);
    top_queries.value = await searchHistory.getTop();
});

// Анімація друкування
const startTyping = () => {
    let phrase = "";

    if (top_queries.value.length > 0) {
        phrase = top_queries.value[currentIndex]?.query ?? "";
    } else {
        phrase = phrases[currentIndex];
    }

    displayedText.value = phrase.slice(0, charIndex++);

    if (charIndex > phrase.length) {
        clearInterval(typingInterval);
        setTimeout(() => {
            currentIndex =
                (currentIndex + 1) %
                (top_queries.value.length > 0
                    ? top_queries.value.length
                    : phrases.length);
            charIndex = 0;
            typingInterval = setInterval(startTyping, 100);
        }, 1500);
    }
};

onUnmounted(() => {
    clearInterval(typingInterval);
});
</script>
