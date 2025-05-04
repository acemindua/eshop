<template>
    <Swiper
        :slides-per-view="1"
        :space-between="50"
        :modules="[Navigation]"
        :loop="true"
        navigation
        ref="swiperRef"
    >
        <SwiperSlide
            v-if="images.length"
            v-for="image in images"
            :key="image.id"
            class="swiper-button-hidden"
        >
            <Link class="w-full h-64 p-4 block" :href="url">
                <img :src="image.url" alt="" class="h-full w-auto mx-auto" />
            </Link>
        </SwiperSlide>
    </Swiper>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper/modules";

// Імпорт стилів Swiper
import "swiper/css";
import "swiper/css/navigation";

const props = defineProps({
    images: {
        type: Array,
        required: true,
        default: () => [],
    },
    url: {
        type: String,
        default: () => "",
    },
});
</script>

<style scoped>
.swiper {
    width: 100%;
    height: 100%;
    display: block;
}
.swiper-button-next,
.swiper-button-next::after,
.swiper-button-next::before,
.swiper-button-prev,
.swiper-button-prev::after,
.swiper-button-prev::before {
    background-color: red !important;
    width: 40px;
    height: 40px;
}
</style>
