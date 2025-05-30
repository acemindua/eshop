<template>
    <div v-if="hasImages">
        <div
            class="slider group"
            @touchstart="handleTouchStart"
            @touchend="handleTouchEnd"
            @mouseenter="handleMouseEnter"
            @mouseleave="handleMouseLeave"
        >
            <div class="slider-wrapper">
                <Link :href="href" :alt="alt">
                    <transition :name="transitionName" mode="out-in">
                        <img
                            v-if="currentImage"
                            :src="currentImage.preview"
                            :key="currentImage.id || currentIndex"
                            loading="lazy"
                            class="slide"
                            :alt="`${alt}_${currentIndex + 1}`"
                        />
                        <div v-else class="slide placeholder-image">
                            Немає зображень
                        </div>
                    </transition>
                </Link>
            </div>

            <button
                v-if="hasMultipleImages"
                class="nav-btn left-2"
                @click.stop="prevSlide"
            >
                ‹
            </button>

            <button
                v-if="hasMultipleImages"
                class="nav-btn right-2"
                @click.stop="nextSlide"
            >
                ›
            </button>
        </div>
    </div>

    <Link
        v-else
        :href="href"
        :alt="alt"
        class="bg-gray-50 text-gray-300 rounded-lg h-full w-full flex items-center justify-center"
    >
        <IconPhoto :stroke="1" :size="48" />
    </Link>
</template>

<script setup>
import { IconPhoto } from "@tabler/icons-vue";
import { ref, computed } from "vue";
import { Link } from "@inertiajs/vue3";

const props = defineProps({
    images: {
        type: Array,
        required: true,
    },
    href: { type: String, default: "#" },
    alt: { type: String, default: "Image" },
});

const currentIndex = ref(0);
const touchStartX = ref(0);
const touchEndX = ref(0);
const transitionName = ref("slide-next");

// --- Computed Properties for better readability and logic ---
const hasImages = computed(() => props.images && props.images.length > 0);
const hasMultipleImages = computed(
    () => props.images && props.images.length > 1
);

const currentImage = computed(() => {
    if (hasImages.value) {
        return props.images[currentIndex.value];
    }
    return null;
});

// --- Navigation & Interaction Functions ---
function triggerSlide(direction) {
    if (!hasImages.value) return;

    if (direction === "next") {
        transitionName.value = "slide-next";
        currentIndex.value = (currentIndex.value + 1) % props.images.length;
    } else if (direction === "prev") {
        transitionName.value = "slide-prev";
        currentIndex.value =
            (currentIndex.value - 1 + props.images.length) %
            props.images.length;
    } else if (direction === "reset") {
        // For reset to first image
        transitionName.value = "slide-prev"; // Animation direction for reset
        currentIndex.value = 0;
    }
}

// Public methods for navigation
function nextSlide() {
    triggerSlide("next");
}

function prevSlide() {
    triggerSlide("prev");
}

// Mouse events
function handleMouseEnter() {
    if (!hasImages.value) return;

    // Якщо ми не на останньому зображенні, переходимо до наступного
    // Ми використовуємо `currentIndex.value < props.images.length - 1` для наведення,
    // щоб уникнути циклічності при першому наведенні, якщо зображень багато
    if (currentIndex.value < props.images.length - 1) {
        triggerSlide("next");
    }
}

function handleMouseLeave() {
    if (!hasImages.value) return;

    if (currentIndex.value !== 0) {
        triggerSlide("reset"); // Use 'reset' for a specific reset animation
    }
}

// Touch events
function handleTouchStart(event) {
    if (!hasImages.value) return;
    touchStartX.value = event.changedTouches[0].screenX;
}

function handleTouchEnd(event) {
    if (!hasImages.value) return;
    touchEndX.value = event.changedTouches[0].screenX;
    handleSwipe();
}

function handleSwipe() {
    const distance = touchEndX.value - touchStartX.value;
    const SWIPE_THRESHOLD = 50;

    if (Math.abs(distance) > SWIPE_THRESHOLD) {
        if (distance < 0) {
            nextSlide();
        } else {
            prevSlide();
        }
    }
}
</script>

<style scoped>
.slider {
    position: relative;
    width: 100%;
    aspect-ratio: 1;
    overflow: hidden;
}
.slider-wrapper {
    width: 100%;
    height: 100%;
    position: relative;
}
.slide {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.placeholder-image {
    background-color: #f0f0f0;
    color: #888;
    font-size: 1.2em;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* --- Vue Slide Animations --- */
.slide-next-enter-active,
.slide-next-leave-active,
.slide-prev-enter-active,
.slide-prev-leave-active {
    transition: transform 0.2s ease-in-out; /* Adjusted animation time for smoother feel */
    position: absolute;
    width: 100%;
    height: 100%;
}

/* slide-next: New image slides in from right, old image slides out to left */
.slide-next-enter-from {
    transform: translateX(100%);
}
.slide-next-enter-to {
    transform: translateX(0);
}
.slide-next-leave-from {
    transform: translateX(0);
}
.slide-next-leave-to {
    transform: translateX(-100%);
}

/* slide-prev: New image slides in from left, old image slides out to right */
.slide-prev-enter-from {
    transform: translateX(-100%);
}
.slide-prev-enter-to {
    transform: translateX(0);
}
.slide-prev-leave-from {
    transform: translateX(0);
}
.slide-prev-leave-to {
    transform: translateX(100%);
}

.nav-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
    background-color: rgba(255, 255, 255, 0.8);
    border: 1px solid #ccc;
    border-radius: 50%;
    text-align: center;
    font-size: 1.2rem;
    cursor: pointer;
    transition: background-color 0.3s ease, opacity 0.3s ease;
    opacity: 0;
    color: gray;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
}
.slider:hover .nav-btn {
    opacity: 0.9;
}
.nav-btn:hover {
    opacity: 1;
    background-color: rgb(255, 255, 255);
}
.left-2 {
    left: 0.5rem;
}
.right-2 {
    right: 0.5rem;
}
</style>
