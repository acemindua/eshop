<template>
    <MainLayout>
        <div class="px-4 md:p-0">
            <h1 class="font-semibold text-xl">{{ item.title }}</h1>
            <div class="flex items-center justify-between">
                <div class="my-2 flex items-center space-x-4 text-xs">
                    <p
                        v-if="item.quantity"
                        class="flex items-center space-x-2 text-green-500 border border-green-200 rounded p-1 bg-green-50"
                    >
                        <IconCircleCheckFilled class="w-5 h-5" />
                        <span>{{ $t("В наявності") }}</span>
                    </p>

                    <StarRating
                        :initial-rating="averageRating"
                        :read-only="true"
                        :show-average="false"
                        :average-rating="averageRating"
                    />

                    <div class="flex items-center space-x-2">
                        <IconMessage :stroke="1" class="w-4 h-4" />
                        <p v-if="reviewsCount > 0" class="ml-2 text-gray-600">
                            {{ reviewsCount }}
                        </p>
                        <p v-else>
                            <Link
                                :href="`${productLink}#reviews`"
                                :alt="item.title"
                                class="hover:underline hover:text-gray-700 duration-200"
                            >
                                <span class="text-gray-500">{{
                                    $t("Залишити відгук")
                                }}</span>
                            </Link>
                        </p>
                    </div>
                </div>

                <div>
                    <span class="text-slate-500">Код: {{ item.sku }}</span>
                </div>
            </div>

            <div class="flex gap-x-4">
                <div class="w-full md:w-1/2 border">
                    <div
                        class="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-8 lg:px-8"
                    >
                        <img
                            v-for="image in images"
                            :src="image.url"
                            alt=""
                            class="row-span-2 aspect-3/4 size-full rounded-lg object-cover max-lg:hidden"
                        />
                    </div>
                </div>
                <div class="w-full md:w-1/2 border">w-full border</div>
            </div>
            <!--
        <section>
            <ReviewRatingDisplay
                :model-type="'products'"
                :model-id="item.id"
                @review-added="handleReviewAdded"
            />
        </section>
        -->
            <section v-if="$page.props.app.env === 'local'">
                <VarDump :data="data" />
            </section>
        </div>
    </MainLayout>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { usePage } from "@inertiajs/vue3";
import { useHead } from "@vueuse/head";
import { generateHeadMeta } from "@/helpers";

import ReviewRatingDisplay from "@/Components/Review/ReviewRatingDisplay.vue";
import MainLayout from "@/Layouts/MainLayout.vue";
import VarDump from "@/Shared/VarDump.vue";
import { IconCircleCheckFilled, IconMessage } from "@tabler/icons-vue";

import { useReviewApi } from "@/Composables/useReviewApi";
import StarRating from "@/Components/Review/StarRating.vue";

import { pluralizeUk } from "@/utils/helpers";

const props = defineProps({
    data: Object,
});

const item = computed(() => props.data.item.data || {});
//
const images = computed(() => props.data.images || null);
const handleReviewAdded = () => {
    console.log("handleReviewAdded");
};

const page = usePage();
const headMeta = computed(() =>
    generateHeadMeta(item.value, page.props.app.name)
);
//
useHead(headMeta);

//
const reviewApi = useReviewApi(); // Використання composable
const averageRating = ref(null);
const reviewsCount = ref(0);

onMounted(async () => {
    // Переконайтеся, що item.value.id доступний перед викликом fetchProduct
    // Якщо дані товару вже приходять через пропси Inertia, цей fetchProduct може бути не потрібним
    // або його логіку потрібно переглянути, щоб уникнути зайвих запитів.
    // Зазвичай, Inertia вже надає всі необхідні дані товару через props.data.item.
    // Якщо fetchProduct потрібен для оновлення/додаткових даних, його варто тримати.
    if (displayItem.value.id) {
        // await fetchProduct(); // Розкоментуйте, якщо вам дійсно потрібен цей додатковий запит
        await fetchAverageRating();
    }
});

//
const variant = computed(() => props.data.variant?.data || null);
// Дані до відображення (якщо є варіант — він в пріоритеті)
const displayItem = computed(() => {
    if (variant.value) {
        return {
            ...item.value,
            ...variant.value,
            title: item.value.title,
            description: item.value.description,
            slug: item.value.slug,
            attributes: item.value.attributes,
        };
    }
    return item.value;
});

const fetchAverageRating = async () => {
    if (!displayItem.value.id) {
        console.warn(
            "displayItem.id is not available for fetching average rating."
        );
        return;
    }
    const data = await reviewApi.fetchAverageRating(
        "products",
        displayItem.value.id
    );
    if (data) {
        averageRating.value = data.average_rating;
        reviewsCount.value = data.reviews_count;
    }
};

// Product Link
const productLink = computed(() => {
    const { slug } = item.value;
    // Ensure slug and slug.product exist before concatenating
    return `/${slug?.product || ""}${slug?.variant ? "/" + slug.variant : ""}`;
});
</script>
