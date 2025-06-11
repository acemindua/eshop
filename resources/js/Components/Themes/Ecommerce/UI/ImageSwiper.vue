<template>
    <div class="h-full w-full">
        <div
            v-if="hasImages"
            class="slider group h-full w-full relative overflow-hidden rounded-lg"
            @touchstart="handleTouchStart"
            @touchend="handleTouchEnd"
            @mouseenter="handleMouseEnter"
            @mouseleave="handleMouseLeave"
        >
            <div class="slider-wrapper h-full w-full relative">
                <Link :href="href" :alt="alt" class="block h-full w-full">
                    <transition :name="transitionName" mode="out-in">
                        <div
                            v-if="currentImage"
                            :key="currentImage.id || currentIndex"
                            class="image-zoom-container"
                            :class="{ 'is-zoomed': isZoomed }"
                        >
                            <img
                                :src="currentImage.preview"
                                loading="lazy"
                                class="slide"
                                :alt="`${alt} - Image ${currentIndex + 1}`"
                            />
                        </div>
                        <div v-else class="slide placeholder-image">
                            <IconPhoto
                                :stroke="1"
                                :size="48"
                                class="text-gray-400"
                            />
                        </div>
                    </transition>
                </Link>
            </div>

            <button
                v-if="hasMultipleImages"
                class="nav-btn left-2"
                @click.stop.prevent="prevSlide"
                aria-label="Previous image"
            >
                ‹
            </button>

            <button
                v-if="hasMultipleImages"
                class="nav-btn right-2"
                @click.stop.prevent="nextSlide"
                aria-label="Next image"
            >
                ›
            </button>

            <div v-if="hasMultipleImages" class="slider-dots">
                <span
                    v-for="(image, index) in images"
                    :key="image.id || index"
                    class="dot"
                    :class="{ active: index === currentIndex }"
                    @click.stop.prevent="goToSlide(index)"
                    :aria-label="`Go to image ${index + 1}`"
                ></span>
            </div>
        </div>

        <Link
            v-else
            :href="href"
            :alt="alt"
            class="bg-gray-100 text-gray-400 rounded-lg flex flax-col items-center justify-center h-36 xs:48 sm:h-56 md:h-64 w-full"
        >
            <div class="flex flex-col items-center justify-center space-y-4">
                <IconPhoto :stroke="1" :size="48" />
                <span class="ml-2 text-sm">{{ $t("Немає зображень") }}</span>
            </div>
        </Link>
    </div>
</template>

<script setup>
import { IconPhoto } from "@tabler/icons-vue";
import { ref, computed, onBeforeUnmount } from "vue";
import { Link } from "@inertiajs/vue3";

const props = defineProps({
    images: {
        type: Array,
        required: true,
        default: () => [],
    },
    href: {
        type: String,
        default: "#",
        validator: (value) => value.startsWith("/") || value.startsWith("http"),
    },
    alt: {
        type: String,
        default: "Product image",
    },
    autoSlide: {
        type: Boolean,
        default: false,
    },
    autoSlideInterval: {
        type: Number,
        default: 3000,
    },
});

const currentIndex = ref(0);
const touchStartX = ref(0);
const touchEndX = ref(0);
const transitionName = ref("slide-next");
let autoSlideTimer = null;

// New: State for zoom
const isZoomed = ref(false);

// --- Computed Properties ---
const hasImages = computed(() => props.images.length > 0);
const hasMultipleImages = computed(() => props.images.length > 1);

const currentImage = computed(() => {
    return hasImages.value ? props.images[currentIndex.value] : null;
});

// --- Navigation & Interaction Functions ---

const triggerSlide = (direction) => {
    if (!hasMultipleImages.value) return;

    const totalImages = props.images.length;

    if (direction === "next") {
        transitionName.value = "slide-next";
        currentIndex.value = (currentIndex.value + 1) % totalImages;
    } else if (direction === "prev") {
        transitionName.value =
            currentIndex.value === 0 && totalImages > 1
                ? "slide-next"
                : "slide-prev";
        currentIndex.value =
            (currentIndex.value - 1 + totalImages) % totalImages;
    }
};

const nextSlide = () => triggerSlide("next");
const prevSlide = () => triggerSlide("prev");

const goToSlide = (index) => {
    if (index === currentIndex.value || !hasMultipleImages.value) return;

    if (index > currentIndex.value) {
        transitionName.value = "slide-next";
    } else {
        transitionName.value = "slide-prev";
    }
    currentIndex.value = index;
    resetAutoSlideTimer();
};

// --- Auto-sliding Logic ---
const startAutoSlide = () => {
    if (!props.autoSlide || !hasMultipleImages.value || autoSlideTimer) return;

    autoSlideTimer = setInterval(() => {
        nextSlide();
    }, props.autoSlideInterval);
};

const stopAutoSlide = () => {
    if (autoSlideTimer) {
        clearInterval(autoSlideTimer);
        autoSlideTimer = null;
    }
};

const resetAutoSlideTimer = () => {
    stopAutoSlide();
    startAutoSlide();
};

// --- Mouse Events for Hover Zoom and Auto-Slide Control ---
const handleMouseEnter = () => {
    // If auto-slide is enabled, stop it on hover
    if (props.autoSlide) {
        stopAutoSlide();
    }
    // Activate zoom
    isZoomed.value = true;
};

const handleMouseLeave = () => {
    // If auto-slide is enabled, resume it on mouse leave
    if (props.autoSlide) {
        startAutoSlide();
    }
    // Deactivate zoom
    isZoomed.value = false;
};

// --- Touch Events (unrelated to zoom, but for completeness) ---
const handleTouchStart = (event) => {
    if (!hasMultipleImages.value) return;
    stopAutoSlide(); // Stop auto-slide on touch interaction
    touchStartX.value = event.touches[0].clientX;
};

const handleTouchEnd = (event) => {
    if (!hasMultipleImages.value) return;
    touchEndX.value = event.changedTouches[0].clientX;
    handleSwipe();
    startAutoSlide(); // Resume auto-slide after interaction
};

const handleSwipe = () => {
    const distance = touchEndX.value - touchStartX.value;
    const SWIPE_THRESHOLD = 50;

    if (Math.abs(distance) > SWIPE_THRESHOLD) {
        if (distance < 0) {
            nextSlide();
        } else {
            prevSlide();
        }
    }
};

// --- Lifecycle Hook ---
onBeforeUnmount(() => {
    stopAutoSlide(); // Clear any active timers
});

// Optionally start auto-slide on mount if enabled
// onMounted(() => {
//     startAutoSlide();
// });
</script>

<style scoped>
.slider {
    position: relative;
    /* height and width inherited from parent */
}

.slider-wrapper {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
}

/* New: Styles for the zoom container */
.image-zoom-container {
    width: 100%;
    height: 100%;
    position: absolute; /* Ensures it's positioned within its parent */
    top: 0;
    left: 0;
    transition: transform 0.3s ease-in-out; /* Smooth zoom transition */
    transform-origin: center center; /* Zoom from the center */
    display: flex; /* Helps ensure the image inside fills */
    justify-content: center;
    align-items: center;
}

.image-zoom-container.is-zoomed {
    transform: scale(1.15); /* Adjust zoom level as needed (e.g., 1.1 to 1.3) */
}

.slide {
    display: block; /* Ensure no extra space below img */
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
}

.placeholder-image {
    background-color: #f0f0f0;
    color: #888;
    font-size: 1.2em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

/* --- Vue Slide Animations (Unchanged) --- */
.slide-next-enter-active,
.slide-next-leave-active,
.slide-prev-enter-active,
.slide-prev-leave-active {
    transition: transform 0.3s ease-in-out;
    position: absolute;
    width: 100%;
    height: 100%;
}

.slide-next-enter-from {
    transform: translateX(100%);
}
.slide-next-leave-to {
    transform: translateX(-100%);
}

.slide-prev-enter-from {
    transform: translateX(-100%);
}
.slide-prev-leave-to {
    transform: translateX(100%);
}

/* Navigation Buttons (Unchanged, but ensure z-index is high enough for new elements) */
.nav-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    background-color: rgba(255, 255, 255, 0.7);
    border: none;
    border-radius: 50%;
    text-align: center;
    font-size: 1.5rem;
    cursor: pointer;
    transition: background-color 0.3s ease, opacity 0.3s ease;
    opacity: 0;
    color: #333;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.slider:hover .nav-btn {
    opacity: 1;
}
.nav-btn:hover {
    background-color: rgb(255, 255, 255);
    color: #000;
}
.left-2 {
    left: 0.5rem;
}
.right-2 {
    right: 0.5rem;
}

/* Navigation Dots (Unchanged) */
.slider-dots {
    position: absolute;
    bottom: 0.5rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 5;
    display: flex;
    gap: 0.5rem;
}

.dot {
    width: 8px;
    height: 8px;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 50%;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
}

.dot.active {
    background-color: #368d02;
    transform: scale(1.2);
}
</style>
