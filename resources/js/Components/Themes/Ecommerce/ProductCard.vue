<template>
    <div class="rounded w-full h-full p-4 bg-white border">
        <div class="flex flex-col relative space-y-4 h-full">
            <div class="media grow rounded-lg h-full relative overflow-hidden">
                <div class="h-full min-h-64">
                    <ImageSwiper
                        :images="images"
                        :alt="data.title"
                        :href="`/${data.slug.product}${
                            data.slug.variant ? '/' + data.slug.variant : ''
                        }`"
                    />
                </div>
            </div>
            <div class="info">
                <div class="info__header flex flex-col space-y-2">
                    <div class="title">
                        <Link
                            :href="`/${data.slug.product}${
                                data.slug.variant ? '/' + data.slug.variant : ''
                            }`"
                            :alt="data.title"
                        >
                            {{ data.title }}
                        </Link>
                    </div>
                </div>
            </div>
            <div class="flex items-center justify-between">
                <div
                    class="price flex flex-col"
                    :class="data.status ? 'text-2xl' : ' text-gray-400 text-xl'"
                >
                    <p
                        class="price__curent font-montserrat font-semibold bg-slate-200"
                    >
                        {{ formattedPrice }} <span class="text-base">₴</span>
                    </p>
                    <p v-if="data.status">
                        <span
                            v-if="parseInt(data.quantity) > 0"
                            class="text-xs text-green-600 bg-slate-200"
                            >{{ $t("Є в наявності") }}</span
                        >
                    </p>
                </div>
                <div v-if="data.status" class="buy">
                    <button
                        type="button"
                        :disabled="!data.status"
                        class="rounded-lg p-2"
                        :class="
                            data.status
                                ? 'text-green-600 '
                                : 'text-gray-500 border-gray-400'
                        "
                    >
                        <svg-icon
                            type="mdi"
                            :path="mdiCartOutline"
                            class="w-7 h-7"
                        ></svg-icon>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiCartOutline } from "@mdi/js";
import ImageSwiper from "./UI/ImageSwiper.vue";
import { computed } from "vue";
import { formatPrice } from "@/helpers";

const props = defineProps({
    data: {
        type: Object,
        requared: true,
        default: {},
    },
});

//
const images = computed(() => {
    return props.data.images || [];
});

// Форматована ціна
const formattedPrice = computed(() =>
    formatPrice(props.data.price, {
        roundTo: 10,
        decimals: 0,
        rate: 1,
    })
);
</script>
