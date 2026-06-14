<script setup>
import useApiResourceService from "@/Composables/useApiResourceService.js";
import ProductCard from "./ProductCard.vue";
import { ref, watch, computed, onMounted } from "vue";
import { Head, usePage } from "@inertiajs/vue3";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-vue";
import SkeletonProductCard from "./SkeletonProductCard.vue";

// Імпортуємо функцію реєстрації Swiper Custom Elements
import { register } from "swiper/element/bundle";

const { loading, fetchData } = useApiResourceService();
const items = ref([]);
const page = usePage();

const currentLocale = computed(() => {
    return page.props.config.locale || "en";
});

const getData = async () => {
    try {
        const response = await fetchData(
            route("api.commerce.popular", { locale: currentLocale.value }),
        );
        items.value = response.data?.items || response.data || [];
    } catch (error) {
        console.error("Error fetching popular products:", error);
    }
};

onMounted(() => {
    register();
});

watch(
    currentLocale,
    () => {
        getData();
    },
    { immediate: true },
);

/* const schemaMarkup = computed(() => {
    if (items.value.length === 0) return null;

    return JSON.stringify({
        "@context": "https://schema.org/",
        "@type": "ItemList",
        itemListElement: items.value.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
                "@type": "Product",
                name: item.title,
                url: route("page.show", item.slug),
                image: item.images?.[0]?.url,
                offers: {
                    "@type": "Offer",
                    priceCurrency: "UAH",
                    price: item.price,
                    availability: "https://schema.org/InStock",
                },
            },
        })),
    });
}); */
</script>

<template>
    <section
        v-if="loading || items.length > 0"
        class="flex flex-col space-y-4 w-full overflow-hidden"
    >
        <!-- <Head v-if="schemaMarkup">
            <component
                is="script"
                type="application/ld+json"
                v-html="schemaMarkup"
            />
        </Head> -->
        <h2 class="text-2xl font-semibold text-gray-800">
            {{ $t("Popular products") }}
        </h2>

        <div
            v-if="loading"
            class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 border-t border-l"
        >
            <SkeletonProductCard v-for="n in 5" :key="'skeleton-' + n" />
        </div>

        <div v-else class="relative border-t border-l w-full group/slider">
            <button
                class="swiper-prev-btn absolute left-2 top-1/2 -translate-y-1/2 z-40 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-xl transition-all border opacity-0 group-hover/slider:opacity-100 flex items-center justify-center w-10 h-10"
                aria-label="Previous slide"
            >
                <IconChevronLeft class="w-6 h-6 stroke-[2]" />
            </button>

            <button
                class="swiper-next-btn absolute right-2 top-1/2 -translate-y-1/2 z-40 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-xl transition-all border opacity-0 group-hover/slider:opacity-100 flex items-center justify-center w-10 h-10"
                aria-label="Next slide"
            >
                <IconChevronRight class="w-6 h-6 stroke-[2]" />
            </button>

            <swiper-container
                slides-per-view="2"
                :space-between="0"
                :navigation="{
                    prevEl: '.swiper-prev-btn',
                    nextEl: '.swiper-next-btn',
                }"
                :breakpoints="{
                    '640': { slidesPerView: 2 },
                    '768': { slidesPerView: 4 },
                    '1024': { slidesPerView: 5 },
                }"
                class="popular-swiper"
            >
                <swiper-slide
                    v-for="item in items"
                    :key="item.id"
                    class="h-auto"
                >
                    <div class="relative z-10">
                        <ProductCard :data="item" />
                    </div>
                </swiper-slide>
            </swiper-container>
        </div>
    </section>

    <section v-else class="w-full">
        <div
            class="text-gray-500 py-12 text-center border border-dashed border-gray-200 rounded-xl bg-gray-50/50"
        >
            <p class="text-sm">{{ $t("No popular products found.") }}</p>
        </div>
    </section>
</template>

<style scoped>
.popular-swiper {
    width: 100%;
    height: 100%;
}

/* Робимо так, щоб кнопки ставали повністю неактивними візуально, якщо гортати нікуди */
.swiper-prev-btn[disabled],
.swiper-next-btn[disabled] {
    opacity: 0.3 !important;
    cursor: not-allowed;
    pointer-events: none;
}
</style>
