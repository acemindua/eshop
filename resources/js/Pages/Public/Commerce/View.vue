<script setup>
import MediaSlider from "@/Components/Public/Commerce/MediaSlider.vue";
import Reviews from "@/Components/Review/Reviews.vue";
import StarRating from "@/Components/Review/StarRating.vue";
import SeoMeta from "@/Components/SeoMeta.vue";
import Layout from "@/Layouts/Public/DefaultLayout.vue";
import { Link } from "@inertiajs/vue3";
import { IconMinus, IconPlus } from "@tabler/icons-vue";

import { computed, ref } from "vue";
import QuantityStatus from "./Components/View/QuantityStatus.vue";
import StatsRating from "./Components/View/StatsRating.vue";
import ProductPrice from "./Components/View/ProductPrice.vue";
import BuyButton from "./Components/BuyButton.vue";
import QuantitySelector from "./Components/View/QuantitySelector.vue";

defineOptions({
    layout: Layout,
});

const props = defineProps({
    data: Object,
});

const quantity = ref(1);
const increment = () => quantity.value++;
const decrement = () => {
    if (quantity.value > 1) quantity.value--;
};

const item = computed(() => props.data?.item?.data || {});

// Оптимізована логіка цін
const hasDiscount = computed(() => {
    const old = Number(item.value?.old_price);
    const curr = Number(item.value?.price);
    return old > curr;
});

const discountPercentage = computed(() => {
    if (!hasDiscount.value) return 0;
    return Math.round(
        ((item.value.old_price - item.value.price) / item.value.old_price) *
            100,
    );
});
</script>

<template>
    <div class="w-full p-[1px]">
        <div class="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-2">
            <div class="bg-gray-200 h-full">
                <MediaSlider :images="item.images" />
            </div>
            <div class="h-full flex flex-col divide-y gap-2">
                <div
                    class="bg-white p-2 md:p-4 rounded-md flex flex-col space-y-2"
                >
                    <h1 class="font-semibold text-xl">
                        {{ item.title }}
                    </h1>

                    <StatsRating
                        :average-reviews="item.average_reviews || {}"
                    />
                </div>

                <div class="bg-white p-4"></div>
                <div class="bg-white p-4">
                    <QuantityStatus :q="item.quantity || 0" />
                </div>
                <div v-if="hasDiscount" class="bg-white p-4">
                    <div class="flex items-center">
                        <div
                            class="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded"
                        >
                            -{{ discountPercentage }}%
                        </div>
                    </div>
                </div>
                <div class="bg-white p-4 flex items-center gap-4">
                    <ProductPrice
                        :q="item.quantity || 0"
                        :has-discount="hasDiscount"
                        :price="{
                            price: item.price,
                            old_price: item.old_price,
                        }"
                    />
                    <QuantitySelector
                        v-model="quantity"
                        :max="item.quantity || 0"
                    />
                    <BuyButton
                        v-if="item.quantity > 0"
                        :data="item"
                        class="scale-90 origin-right relative z-30"
                    />
                </div>
                <div class="bg-white p-4 grow"></div>
            </div>
        </div>
    </div>
    <div class="h-screen"></div>
    <!--  <div class="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-gray-200 p-4 h-full border">
            <MediaSlider :images="item.images" />
        </div>
        <div class="bg-white p-4 h-full border">
            <nav v-if="item.category" aria-label="Breadcrumb">
                <Link
                    :href="item.category.url"
                    class="text-sm text-gray-700 hover:text-blue-600 underline-offset-2 hover:underline"
                >
                    {{ item.category.title }}
                </Link>
            </nav>

            <h1 class="font-semibold text-2xl mt-2 mb-4">{{ item.title }}</h1>

            <div
                class="flex items-center space-x-2 mb-4"
                role="img"
                :aria-label="
                    'Рейтинг товару: ' + item.average_reviews.rating + ' з 5'
                "
            >
                <StatsRating :average-reviews="item.average_reviews || {}" />
            </div>

            <div>
                <QuantityStatus :q="item.quantity || 0" />
            </div>

            <div class="flex items-center">
                <div
                    v-if="hasDiscount"
                    class="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded"
                >
                    -{{ discountPercentage }}%
                </div>
            </div>

            <div class="flex items-center gap-4 mb-6">
               
                <div class="grid grid-cols-2 h-12">
                    <div class="flex items-center">
                        <ProductPrice
                            :q="item.quantity || 0"
                            :has-discount="hasDiscount"
                            :price="{
                                price: item.price,
                                old_price: item.old_price,
                            }"
                        />
                    </div>

                    <div>
                        <QuantitySelector
                            v-model="quantity"
                            :max="item.quantity || 0"
                        />
                    </div>
                    <div class="flex items-center justify-end">
                        <BuyButton
                            v-if="item.quantity > 0"
                            :data="item"
                            class="scale-90 origin-right relative z-30"
                        />
                    </div>
                </div>
            </div>
        </div>
        <div class="border p-4 bg-white col-span-2">
            <Reviews
                model-type="Item"
                :model-id="item.id"
                :model-title="item.title"
            />
        </div>
    </div> -->

    <SeoMeta />
</template>
