<script setup>
import { computed } from "vue";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiCartOutline, mdiCartCheck } from "@mdi/js";
import { IconMessage } from "@tabler/icons-vue";
import ImageSwiper from "./UI/ImageSwiper.vue";
// Utility functions
import { formatPrice } from "@/helpers";

const props = defineProps({
    product: Object,
    ids: {
        type: Array,
        default: () => [],
    },
    reviewsData: {
        // Новий пропс для даних відгуків
        type: Object,
        default: () => ({ average_rating: null, reviews_count: 0 }),
        // Можете додати більш детальну валідацію, якщо потрібно
        validator: (value) =>
            typeof value.average_rating === "number" ||
            (value.average_rating === null &&
                typeof value.reviews_count === "number"),
    },
});

const idToCart = computed(() => {
    const variant_id = props.product.variant_id || "default";
    return props.product.id + "-" + variant_id;
});
// А тут ви вже правильно використовуєте .toString(), якщо product.id може бути числом
const isInCart = computed(() => props.ids.includes(idToCart.value.toString()));
//
const hasReviews = computed(
    () =>
        props.reviewsData.average_rating !== null &&
        props.reviewsData.reviews_count > 0
);

// Emits for communication with parent
const emit = defineEmits(["add-to-cart"]);

// Availability & Add to Cart Logic
const isAvailable = computed(
    () => props.product.status && parseInt(props.product.quantity) > 0
);

// Images for Swiper
const images = computed(() => props.product.images || []);
// Product Link
const productLink = computed(() => {
    const { slug } = props.product;
    // Ensure slug and slug.product exist before concatenating
    return `/${slug?.product || ""}${slug?.variant ? "/" + slug.variant : ""}`;
});
// Price Logic
const formattedPrice = computed(() =>
    formatPrice(props.product.price, {
        roundTo: 10,
        decimals: 0,
        rate: 1,
    })
);

//
const addToCart = async () => {
    emit("add-to-cart", props.product);
};
</script>

<template>
    <div class="bg-white p-4 flex flex-col shadow">
        <div class="bg-gray-50 h-36 xs:48 sm:h-56 md:h-64 overflow-hidden">
            <ImageSwiper
                :images="images"
                :alt="product.title"
                :href="productLink"
            />
        </div>

        <div class="h-10 mt-2 flex w-full items-start justify-start">
            <div class="text-sm line-clamp-2">
                <Link :href="productLink" :alt="product.title">
                    <span
                        class="text-pretty"
                        :class="{ 'text-gray-400': !isAvailable }"
                    >
                        {{ product.title }}
                    </span>
                </Link>
            </div>
        </div>

        <div class="h-8 flex w-full items-center justify-start text-xs">
            <div v-if="hasReviews" class="flex items-center space-x-2">
                <p class="flex items-center space-x-1">
                    <IconMessage :stroke="1" class="w-4 h-4" />
                    <span class="ml-2"> {{ reviewsCount }}</span>
                </p>
            </div>
            <div v-else class="flex items-center space-x-1 py-1">
                <IconMessage :stroke="1" class="w-4 h-4" />
                <Link
                    :href="`${productLink}#reviews`"
                    :alt="product.title"
                    class="hover:underline hover:text-gray-700 duration-200"
                >
                    <span class="text-gray-500">Залишити відгук</span>
                </Link>
            </div>
        </div>

        <div
            class="text-xl md:text-2xl h-12 flex w-full items-center justify-start"
        >
            <div class="flex items-center justify-between font-semibold w-full">
                <div :class="{ 'text-gray-400': !isAvailable }">
                    <p class="font-montserrat">
                        {{ formattedPrice }}
                        <span class="text-base">₴</span>
                    </p>
                </div>

                <div v-if="isAvailable">
                    <button
                        type="button"
                        class="rounded-lg p-2 hover:bg-green-50 transition-colors"
                        @click="addToCart"
                        aria-label="Add to cart"
                    >
                        <svg-icon
                            type="mdi"
                            :path="isInCart ? mdiCartCheck : mdiCartOutline"
                            class="w-8 h-8"
                            :class="
                                isInCart ? 'text-blue-400' : 'text-green-600'
                            "
                        />
                    </button>
                </div>
            </div>
        </div>

        <div class="h-4 flex w-full items-center justify-start">
            <div v-if="isAvailable">
                <span class="text-xs text-green-600">{{
                    $t("Є в наявності")
                }}</span>
            </div>
        </div>
        <!--
        <div class="text-xs text-gray-500">
            <pre>
                {{ product }}
            </pre>
        </div>
        <!---->
    </div>
</template>
