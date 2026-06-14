<script setup>
import { computed } from "vue";
import { Link } from "@inertiajs/vue3";
import BuyButton from "./BuyButton.vue";

import QuantityStatus from "./View/QuantityStatus.vue";
import StatsRating from "./View/StatsRating.vue";
import ProductPrice from "./View/ProductPrice.vue";

const props = defineProps({
    data: { type: Object, required: true },
});

const imagesCount = computed(() => props.data?.images?.length || 0);

const hasDiscount = computed(() => {
    const old = parseFloat(props.data?.old_price || 0);
    const curr = parseFloat(props.data?.price || 0);
    return old > curr && curr > 0;
});

const discountPercentage = computed(() => {
    if (!hasDiscount.value) return 0;
    const old = parseFloat(props.data.old_price);
    const curr = parseFloat(props.data.price);
    return Math.round(((old - curr) / old) * 100);
});
</script>

<template>
    <div
        class="relative group h-full w-full overflow-hidden border-b border-r p-4 bg-white"
    >
        <div
            v-if="hasDiscount && data.quantity > 0"
            class="absolute top-4 left-4 z-30 bg-red-500 text-white text-[10px] uppercase font-bold px-2 py-1 rounded-sm shadow-sm"
        >
            <span>-{{ discountPercentage }}%</span>
        </div>
        <div class="flex flex-col">
            <!--images-->
            <div
                class=" text-gray-300 flex items-center justify-center h-32 md:h-64 relative z-10 w-full"
            >
                <template v-if="imagesCount > 0">
                    <img
                        :src="data.images[0].url"
                        :alt="data.title"
                        class="w-full h-full object-contain absolute inset-0 z-10 transition-all duration-700 ease-in-out"
                        :class="[
                            imagesCount === 1
                                ? 'relative'
                                : 'group-hover:opacity-0',
                        ]"
                    />
                    <img
                        v-if="imagesCount > 1"
                        :src="data.images[1].url"
                        :alt="data.title"
                        class="w-full h-full object-contain absolute inset-0 opacity-0 z-0 transition-all duration-700 ease-in-out group-hover:opacity-100 group-hover:z-10"
                    />
                </template>
            </div>
            <!--title-->
            <h3
                class="mt-4 text-sm font-medium text-gray-800 group-hover:underline line-clamp-2 leading-5 h-10"
            >
                {{ data.title }}
            </h3>

            <!--rating-->
            <div class="h-8 flex items-center">
                <StatsRating :average-reviews="data.average_reviews || {}" />
            </div>

            <!--price&buy-->
            <div class="grid grid-cols-2 h-12">
                <div class="flex items-center">
                    <ProductPrice
                        :q="data.quantity || 0"
                        :has-discount="hasDiscount"
                        :price="{
                            price: data.price,
                            old_price: data.old_price,
                        }"
                    />
                </div>
                <div class="flex items-center justify-end">
                    <BuyButton
                        v-if="data.quantity > 0"
                        :data="data"
                        class="scale-90 origin-right relative z-30"
                    />
                </div>
            </div>

            <!--stock-->
            <QuantityStatus :q="data.quantity || 0" />
        </div>

        <Link
            v-if="data.url"
            :href="data.url"
            class="absolute inset-0 z-20"
            aria-label="View product"
        />
    </div>
</template>
