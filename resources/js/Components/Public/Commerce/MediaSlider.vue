<template>
    <div class="flex flex-col md:flex-row w-full h-full gap-[1px]">
        <aside v-if="images.length > 1" class="order-2 md:order-1 bg-white">
            <div class="flex md:flex-col gap-[1px] w-32 bg-gray-200">
                <button
                    v-for="(img, index) in images"
                    :key="img.id || index"
                    @click="activeIndex = index"
                    class="bg-white w-full h-full aspect-square flex items-center justify-center p-3 relative group transition-colors"
                    :aria-current="activeIndex === index"
                >
                    <div
                        v-if="activeIndex === index"
                        class="absolute inset-0 z-10"
                    ></div>

                    <img
                        :src="img.preview || img.url"
                        class="w-full h-full object-contain transition-all duration-500"
                        :class="
                            activeIndex === index
                                ? 'opacity-100 grayscale-0'
                                : 'opacity-30 grayscale group-hover:opacity-60'
                        "
                        loading="lazy"
                    />
                </button>
            </div>
        </aside>
        <div
            class="bg-white order-1 md:order-2 flex-1 p-4 flex items-center justify-center relative"
        >
            <transition name="fade" mode="out-in">
                <img
                    :key="activeIndex"
                    :src="currentImage?.url"
                    class="max-w-full max-h-full object-contain mix-blend-multiply gap-[1px]"
                    :alt="productTitle || 'Product image'"
                />
            </transition>
            <div
                class="absolute bottom-4 right-4 text-[9px] font-mono text-gray-400 rounded-full tracking-widest select-none"
            >
                {{ activeIndex + 1 }} / {{ images.length }}
            </div>
        </div>
    </div>
    <!--    <div
        class="flex flex-col md:flex-row w-full h-auto md:h-[75vh] gap-[1px] bg-gray-200 border-y border-gray-200"
    >
        <div
            class="relative order-1 md:order-2 flex-1 bg-white flex items-center justify-center p-6 md:p-12 min-h-[350px] max-h-[500px] md:max-h-none overflow-hidden"
        >
            <transition name="fade" mode="out-in">
                <img
                    :key="activeIndex"
                    :src="currentImage?.url"
                    class="max-w-full max-h-full object-contain mix-blend-multiply gap-[1px]"
                    :alt="productTitle || 'Product image'"
                />
            </transition>

            <div
                class="absolute bottom-4 right-4 text-[9px] font-mono text-gray-400 tracking-widest select-none"
            >
                {{ activeIndex + 1 }} / {{ images.length }}
            </div>

            <div
                v-if="images.length > 1"
                class="hidden md:flex absolute inset-x-0 top-1/2 -translate-y-1/2 justify-between px-2 pointer-events-none"
            >
                <NavButton @click="prev" is-left />
                <NavButton @click="next" />
            </div>
        </div>

        <aside
            v-if="images.length > 1"
            class="order-2 md:order-1 w-full md:w-[120px] lg:w-[160px] overflow-x-auto md:overflow-y-auto no-scrollbar bg-gray-200"
        >
         
        </aside>
    </div> -->
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-vue";

const props = defineProps({
    images: { type: Array, required: true, default: () => [] },
    productTitle: { type: String, default: "" },
});

const activeIndex = ref(0);

// Computed property для уникнення зайвих перевірок у шаблоні
const currentImage = computed(() => props.images[activeIndex.value] || null);

// Оптимізований скид індексу
watch(
    () => props.images.length,
    () => {
        activeIndex.value = 0;
    },
);

const navigate = (step) => {
    const len = props.images.length;
    if (len <= 1) return;
    activeIndex.value = (activeIndex.value + step + len) % len;
};

const next = () => navigate(1);
const prev = () => navigate(-1);

// Внутрішній функціональний компонент для кнопок навігації
const NavButton = ({ isLeft }, { emit }) => ({
    render: () =>
        h(
            "button",
            {
                onClick: () => emit("click"),
                class: "pointer-events-auto w-10 h-10 flex items-center justify-center border border-transparent hover:border-gray-200 transition-all bg-white/50 backdrop-blur-sm md:bg-transparent",
            },
            [
                h(isLeft ? IconChevronLeft : IconChevronRight, {
                    size: 20,
                    strokeWidth: 1,
                }),
            ],
        ),
});
</script>

<style scoped>
.no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
.no-scrollbar::-webkit-scrollbar {
    display: none;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.15s ease-out;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
