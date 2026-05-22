<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import ButtonsGroup from "@/Components/UI/Buttons/Admin/ButtonsGroup.vue";
import { IconArrowLeft } from "@tabler/icons-vue";
import { router } from "@inertiajs/vue3";

const props = defineProps({
    title: { type: String },
    description: { type: String },
    buttons: { type: Array, required: true },
    // Дозволяємо передавати селектор контейнера, якщо він інший
    scrollSelector: { type: String, default: ".flex-grow.overflow-y-auto" },
    routePrefix: { type: String, required: true },
});

const isScrolled = ref(false);
const scrollAnchor = ref(null);
let observer = null;

onMounted(() => {
    const scrollContainer = document.querySelector(props.scrollSelector);

    observer = new IntersectionObserver(
        ([entry]) => {
            isScrolled.value = !entry.isIntersecting;
        },
        {
            root: scrollContainer,
            rootMargin: "0px",
            threshold: 0,
        },
    );

    if (scrollAnchor.value) {
        observer.observe(scrollAnchor.value);
    }
});

onUnmounted(() => {
    if (observer) observer.disconnect();
});
</script>
<template>
    <div
        ref="scrollAnchor"
        class="flex items-center justify-between border bg-gray-50 p-4 rounded-xl relative"
    >
        <div class="flex items-center space-x-3">
            <button
                type="button"
                @click="router.visit(route(`${props.routePrefix}.index`))"
                class="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:shadow-sm transition-all"
            >
                <IconArrowLeft size="18" class="text-brand" />
            </button>
            <div class="flex flex-col">
                <h1
                    class="text-base font-semibold tracking-tight dark:text-slate-200"
                >
                    {{ props.title }}
                </h1>
                <p class="text-xs text-slate-400 font-medium">
                    {{ props.description }}
                </p>
            </div>
        </div>
        <ButtonsGroup :buttons="buttons" />
    </div>

    <slot />

    <!-- Плаваюча копія -->
    <transition
        enter-active-class="transition ease-out duration-300"
        enter-from-class="transform translate-y-20 opacity-0"
        enter-to-class="transform translate-y-0 opacity-100"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="transform translate-y-0 opacity-100"
        leave-to-class="transform translate-y-20 opacity-0"
    >
        <div
            v-if="isScrolled"
            class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 shadow-lg bg-white p-2 rounded-xl border"
        >
            <ButtonsGroup :buttons="buttons" />
        </div>
    </transition>
</template>
