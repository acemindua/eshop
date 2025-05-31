<template>
    <div class="bg-white p-4 flex flex-col">
        <div class="bg-gray-100 rounded-lg h-56 md:h-64 overflow-hidden">
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
                <StarRating
                    :initial-rating="averageRating"
                    :read-only="true"
                    :show-average="true"
                    class="text-lg"
                />
                <p class="flex items-center space-x-1">
                    <IconMessage :stroke="1" class="w-4 h-4" />
                    <span class="ml-2"> {{ reviewsCount }}</span>
                </p>
            </div>
            <div v-else class="flex items-center space-x-1 py-1">
                <IconMessage :stroke="1" class="w-4 h-4" />
                <span>Залишити відгук</span>
            </div>
        </div>

        <div class="text-2xl h-12 flex w-full items-center justify-start">
            <div class="flex items-center justify-between font-semibold w-full">
                <div :class="{ 'text-gray-400': !isAvailable }">
                    <p class="font-montserrat">
                        {{ formattedPrice }} <span class="text-base">₴</span>
                    </p>
                </div>
                <div v-if="isAvailable">
                    <button
                        type="button"
                        class="rounded-lg p-2 text-green-600 hover:bg-green-50 transition-colors"
                        @click="addToCart"
                        aria-label="Add to cart"
                    >
                        <svg-icon
                            type="mdi"
                            :path="mdiCartOutline"
                            class="w-8 h-8"
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
    </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { useReviewApi } from "@/Composables/useReviewApi";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiCartOutline } from "@mdi/js";

// UI Components
import ImageSwiper from "./UI/ImageSwiper.vue";
import StarRating from "@/Components/Review/StarRating.vue";
import { IconMessage } from "@tabler/icons-vue";
// Assuming 'Link' is globally available or imported elsewhere if not a standard HTML <a> tag

// Utility functions
import { formatPrice } from "@/helpers";

const props = defineProps({
    data: {
        type: Object,
        required: true,
        default: () => ({}),
    },
});

const product = computed(() => props.data);

// Product Link
const productLink = computed(() => {
    const { slug } = product.value;
    // Ensure slug and slug.product exist before concatenating
    return `/${slug?.product || ""}${slug?.variant ? "/" + slug.variant : ""}`;
});

// Images for Swiper
const images = computed(() => product.value.images || []);

// Reviews Logic
const averageRating = ref(null);
const reviewsCount = ref(0);

const hasReviews = computed(
    () => averageRating.value !== null && reviewsCount.value > 0
);

onMounted(async () => {
    if (product.value.id) {
        try {
            const { fetchAverageRating } = useReviewApi();
            const data = await fetchAverageRating("products", product.value.id);
            if (data) {
                averageRating.value = data.average_rating;
                reviewsCount.value = data.reviews_count;
            }
        } catch (error) {
            console.error("Failed to fetch review data:", error);
            // Consider setting default or error state for averageRating/reviewsCount here if the fetch fails
        }
    }
});

// Price Logic
const formattedPrice = computed(() =>
    formatPrice(product.value.price, {
        roundTo: 10,
        decimals: 0,
        rate: 1,
    })
);

// Availability & Add to Cart Logic
const isAvailable = computed(
    () => product.value.status && parseInt(product.value.quantity) > 0
);

// Emits for communication with parent
const emit = defineEmits(["addToCart"]);

const addToCart = () => {
    if (isAvailable.value) {
        emit("addToCart", product.value.id);
        console.log(
            `Adding ${product.value.title} (ID: ${product.value.id}) to cart!`
        );
    } else {
        console.warn(
            `Cannot add ${product.value.title} to cart: Not available.`
        );
    }
};
</script>

<style scoped>
/* Scoped styles specific to this component */
</style>
