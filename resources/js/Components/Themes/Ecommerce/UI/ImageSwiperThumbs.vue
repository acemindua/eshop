<template>
    <div class="gallery">
        <div
            class="main-image-wrapper relative"
            @touchstart="handleTouchStartMain"
            @touchmove="handleTouchMoveMain"
            @touchend="handleTouchEndMain"
        >
            <button
                class="nav-button nav-prev"
                @click="navigate(-1)"
                v-if="images.length > 1"
            >
                ‹
            </button>

            <transition :name="transitionName" mode="out-in">
                <img
                    v-if="currentImage"
                    :src="currentImage.url"
                    :key="currentImage.id"
                    class="main-image"
                    alt="Main image"
                />
                <div v-else class="main-image placeholder-image">
                    Немає зображень для відображення
                </div>
            </transition>

            <button
                class="nav-button nav-next"
                @click="navigate(1)"
                v-if="images.length > 1"
            >
                ›
            </button>
        </div>

        <div class="mt-4 thumbnails-wrapper" v-if="images.length > 0">
            <button
                v-if="showThumbsPrev"
                class="nav-button nav-button-thumbs nav-prev-thumbs"
                @click="scrollThumbs(-1)"
            >
                ‹
            </button>
            <div
                ref="thumbsContainer"
                class="thumbs-grid-container"
                @touchstart="handleTouchStartThumbs"
                @touchmove="handleTouchMoveThumbs"
                @touchend="handleTouchEndThumbs"
            >
                <div class="thumbs-grid">
                    <img
                        v-for="(image, index) in images"
                        :key="image.id"
                        :src="image.url"
                        :class="{ active: index === currentIndex }"
                        @click="setCurrent(index)"
                        :ref="
                            (el) => {
                                if (index === currentIndex)
                                    activeThumbnailRef = el;
                            }
                        "
                    />
                </div>
            </div>
            <button
                v-if="showThumbsNext"
                class="nav-button nav-button-thumbs nav-next-thumbs"
                @click="scrollThumbs(1)"
            >
                ›
            </button>
        </div>
    </div>
</template>

<script setup>
import {
    ref,
    computed,
    watch,
    nextTick,
    onMounted,
    onBeforeUnmount,
} from "vue";

const props = defineProps({
    images: {
        type: Array,
        required: true,
    },
});

const currentIndex = ref(0);
const thumbsContainer = ref(null);
const activeThumbnailRef = ref(null);

const showThumbsPrev = ref(false);
const showThumbsNext = ref(false);

const transitionName = ref("slide-next");
let lastIndex = 0;

// Touch variables for main image
let touchStartXMain = 0;
let touchEndXMain = 0;
const SWIPE_THRESHOLD_MAIN = 50;

// Touch variables for thumbnails
let touchStartXThumbs = 0;
let touchEndXThumbs = 0;
const SWIPE_THRESHOLD_THUMBS = 30;

const setCurrent = (index) => {
    if (props.images.length === 0) return;

    if (index > currentIndex.value) {
        transitionName.value = "slide-next";
    } else if (index < currentIndex.value) {
        transitionName.value = "slide-prev";
    }
    currentIndex.value = index;
};

const navigate = (direction) => {
    if (props.images.length === 0) return;

    const total = props.images.length;
    const newIndex = (currentIndex.value + direction + total) % total;

    if (direction > 0) {
        transitionName.value = "slide-next";
    } else {
        transitionName.value = "slide-prev";
    }

    currentIndex.value = newIndex;
};

const currentImage = computed(() => {
    if (
        props.images.length > 0 &&
        currentIndex.value >= 0 &&
        currentIndex.value < props.images.length
    ) {
        return props.images[currentIndex.value];
    }
    return null;
});

const checkThumbButtons = () => {
    if (thumbsContainer.value && props.images.length > 0) {
        const { scrollWidth, clientWidth, scrollLeft } = thumbsContainer.value;
        showThumbsPrev.value = scrollLeft > 0;
        showThumbsNext.value =
            Math.ceil(scrollLeft + clientWidth) < scrollWidth - 1;
    } else {
        showThumbsPrev.value = false;
        showThumbsNext.value = false;
    }
};

const scrollThumbs = (direction) => {
    if (thumbsContainer.value && props.images.length > 0) {
        const scrollAmount = thumbsContainer.value.clientWidth * 0.8;
        thumbsContainer.value.scrollBy({
            left: direction * scrollAmount,
            behavior: "smooth",
        });
    }
};

// --- Swipe handlers for Main Image ---
const handleTouchStartMain = (e) => {
    if (props.images.length === 0) return;
    touchStartXMain = e.changedTouches[0].screenX;
};

const handleTouchMoveMain = (e) => {
    // ...
};

const handleTouchEndMain = (e) => {
    if (props.images.length === 0) return;
    touchEndXMain = e.changedTouches[0].screenX;
    const deltaX = touchEndXMain - touchStartXMain;

    if (Math.abs(deltaX) > SWIPE_THRESHOLD_MAIN) {
        if (deltaX > 0) {
            transitionName.value = "slide-prev";
            navigate(-1);
        } else {
            transitionName.value = "slide-next";
            navigate(1);
        }
    }
};

// --- Swipe handlers for Thumbnails ---
const handleTouchStartThumbs = (e) => {
    if (props.images.length === 0) return;
    touchStartXThumbs = e.changedTouches[0].screenX;
};

const handleTouchMoveThumbs = (e) => {
    // ...
};

const handleTouchEndThumbs = (e) => {
    if (props.images.length === 0) return;
    touchEndXThumbs = e.changedTouches[0].screenX;
    const deltaX = touchEndXThumbs - touchStartXThumbs;

    if (Math.abs(deltaX) > SWIPE_THRESHOLD_THUMBS) {
        if (deltaX > 0) {
            scrollThumbs(-1);
        } else {
            scrollThumbs(1);
        }
    }
};

watch(
    currentIndex,
    async (newIndex, oldIndex) => {
        if (props.images.length === 0) {
            currentIndex.value = 0;
            return;
        }

        if (oldIndex !== undefined) {
            if (newIndex > oldIndex) {
                transitionName.value = "slide-next";
            } else {
                transitionName.value = "slide-prev";
            }
        } else {
            transitionName.value = "fade";
        }

        await nextTick();
        if (activeThumbnailRef.value && thumbsContainer.value) {
            const thumbnailEl = activeThumbnailRef.value;
            const containerEl = thumbsContainer.value;

            const thumbnailOffsetLeft = thumbnailEl.offsetLeft;
            const thumbnailWidth = thumbnailEl.offsetWidth;
            const containerScrollLeft = containerEl.scrollLeft;
            const containerWidth = containerEl.offsetWidth;

            let targetScrollLeft = containerScrollLeft;

            if (thumbnailOffsetLeft < containerScrollLeft) {
                targetScrollLeft = thumbnailOffsetLeft;
            } else if (
                thumbnailOffsetLeft + thumbnailWidth >
                containerScrollLeft + containerWidth
            ) {
                targetScrollLeft =
                    thumbnailOffsetLeft + thumbnailWidth - containerWidth;
            }

            if (targetScrollLeft !== containerScrollLeft) {
                thumbsContainer.value.scrollTo({
                    left: targetScrollLeft,
                    behavior: "smooth",
                });
            }
        }
        checkThumbButtons();
    },
    { immediate: true }
);

watch(
    () => props.images.length,
    (newLength) => {
        if (newLength === 0) {
            currentIndex.value = 0;
            checkThumbButtons();
        } else if (currentIndex.value >= newLength) {
            currentIndex.value = newLength - 1;
        }
    },
    { immediate: true }
);

onMounted(() => {
    if (thumbsContainer.value) {
        thumbsContainer.value.addEventListener("scroll", checkThumbButtons);
        checkThumbButtons();
    }
});

onBeforeUnmount(() => {
    if (thumbsContainer.value) {
        thumbsContainer.value.removeEventListener("scroll", checkThumbButtons);
    }
});
</script>

<style scoped>
.gallery {
    width: 100%;
    height: auto;
    margin: auto;
}

.main-image-wrapper {
    background: #fff;
    position: relative;
    touch-action: pan-y;
    overflow: hidden;
    /* >>> ВИПРАВЛЕНО: Додаємо min-height або padding-bottom для встановлення висоти */
    /* Варіант 1: Фіксована висота (або min-height) */
    min-height: 400px; /* Приклад: встановіть бажану висоту для вашої галереї */
    /* Варіант 2: Зберігання співвідношення сторін (більш гнучкий) */
    /*
    padding-bottom: 56.25%; /* 16:9 співвідношення сторін (висота = 56.25% від ширини) */
    /* height: 0; */ /* Потрібно при використанні padding-bottom для висоти */
    /* */
}

.main-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}

.placeholder-image {
    background-color: #f0f0f0;
    color: #888;
    font-size: 1.2em;
}

@media only screen and (max-width: 600px) {
    .main-image-wrapper {
        min-height: 300px;
    }
    .placeholder-image {
        padding: 0 10px;
    }
}

/* Base styles for slide transitions */
.slide-next-enter-active,
.slide-next-leave-active,
.slide-prev-enter-active,
.slide-prev-leave-active {
    transition: transform 0.3s ease-in-out;
    position: absolute;
    width: 100%;
    height: 100%;
}

/* slide-next: Нове зображення в'їжджає справа, старе виїжджає зліва */
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

/* slide-prev: Нове зображення в'їжджає зліва, старе виїжджає справа */
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

/* Додаткові стилі з попередньої версії (без змін) */
.thumbnails-wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
}

.thumbs-grid-container {
    flex-grow: 1;
    overflow-x: hidden;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
    padding: 5px 0;
    touch-action: pan-y;
    scroll-behavior: smooth;
}

.thumbs-grid {
    display: inline-flex;
    gap: 10px;
}

.thumbs-grid img {
    flex-shrink: 0;
    border: 1px solid #ccc;
    border-radius: 0.3rem;
    height: 64px;
    width: auto;
    cursor: pointer;
    transition: border-color 0.3s ease;
}

.thumbs-grid img.active,
.thumbs-grid img:hover {
    border-color: #333;
}

.nav-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 40px;
    height: 40px;
    background: white;
    border: 1px solid #ccc;
    border-radius: 50%;
    cursor: pointer;
    z-index: 1;
    font-size: 18px;
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.main-image-wrapper .nav-prev {
    left: 10px;
}
.main-image-wrapper .nav-next {
    right: 10px;
}

.nav-button-thumbs {
    position: static;
    transform: none;
    height: 30px;
    width: 30px;
    font-size: 16px;
    flex-shrink: 0;
    transition: opacity 0.3s ease, transform 0.3s ease;
}
</style>
