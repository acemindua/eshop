<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import ButtonsGroup from "@/Components/UI/Buttons/Admin/ButtonsGroup.vue";

const props = defineProps({
    buttons: { type: Array, required: true },
    // Дозволяємо передавати селектор контейнера, якщо він інший
    scrollSelector: { type: String, default: ".flex-grow.overflow-y-auto" },
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
    <!-- Якір, який залишається в потоці документа -->
    <div ref="scrollAnchor" class="flex justify-end">
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
