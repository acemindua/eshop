<script setup>
import { IconSearch } from "@tabler/icons-vue";
import { ref, onMounted, onUnmounted } from "vue";
import { router, usePage } from "@inertiajs/vue3";

// Props from server (for restoring query if page was reloaded)
const page = usePage();
const query = ref(page.props.filters?.q ?? "");

// State
const isActive = ref(false);
const displayedText = ref("Search for products...");
const suggestions = ref([]); // Future: dynamic data via API

// Placeholder phrases for typing animation
const phrases = [
    "soil acidifier",
    "magnesium sulfate",
    "ammonium nitrate",
    "NPK fertilizer",
    "nitroammophoska",
];

// Typing animation logic
let currentIndex = 0;
let charIndex = 0;
let typingInterval;

const startTyping = () => {
    const phrase = phrases[currentIndex];
    displayedText.value = phrase.slice(0, charIndex++);
    if (charIndex > phrase.length) {
        clearInterval(typingInterval);
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % phrases.length;
            charIndex = 0;
            typingInterval = setInterval(startTyping, 100);
        }, 1500);
    }
};

onMounted(() => {
    typingInterval = setInterval(startTyping, 100);
});

onUnmounted(() => {
    clearInterval(typingInterval);
});

// Search action
const goToResults = () => {
    if (!query.value.trim()) return;
    router.get("/search", { q: query.value });
};

// UI events
const close = () => {
    isActive.value = false;
};

const handleBlur = () => {
    setTimeout(() => (isActive.value = false), 150);
};
</script>

<template>
    <div class="relative w-full">
        <label for="search" class="sr-only">Search</label>

        <!-- Search input and button -->
        <div class="flex w-full relative z-50">
            <input
                id="search"
                name="search"
                type="search"
                v-model="query"
                @focus="isActive = true"
                @blur="handleBlur"
                @keyup.enter="goToResults"
                :placeholder="!query ? displayedText : ''"
                class="flex-grow border border-gray-300 border-r-0 p-2 px-4 rounded-l-md focus:outline-none focus:ring-0 focus:border-0"
                autocomplete="off"
                autocorrect="off"
                autocapitalize="off"
                spellcheck="false"
            />

            <button
                type="button"
                @click="goToResults"
                class="bg-white border border-l-0 border-gray-300 text-gray-500 px-4 py-2 rounded-r-md flex items-center space-x-2"
            >
                <IconSearch :stroke="2" />
            </button>
        </div>

        <!-- Transparent overlay -->
        <Transition
            enter-active-class="transition-opacity duration-300 ease-out"
            enter-from-class="opacity-0"
            enter-to-class="opacity-40"
            leave-from-class="opacity-40"
            leave-to-class="opacity-0"
        >
            <div
                v-if="isActive"
                class="fixed inset-0 bg-black z-40 opacity-30"
                @click="close"
            ></div>
        </Transition>

        <!-- Dropdown suggestion list -->
        <Transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="opacity-0 translate-y-2"
            enter-to-class="opacity-100 translate-y-0"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 translate-y-2"
        >
            <ul
                v-if="isActive"
                class="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto z-50"
            >
                <li
                    v-for="(item, i) in phrases"
                    :key="i"
                    class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    @mousedown.prevent="
                        () => {
                            query = item;
                            goToResults();
                        }
                    "
                >
                    {{ item }}
                </li>
            </ul>
        </Transition>
    </div>
</template>
