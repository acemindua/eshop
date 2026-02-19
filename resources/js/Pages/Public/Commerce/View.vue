<script setup>
import ButtonBuy from "@/Components/Public/Commerce/ButtonBuy.vue";
import MediaSlider from "@/Components/Public/Commerce/MediaSlider.vue";
import ReviewForm from "@/Components/Review/ReviewForm.vue";
import ReviewList from "@/Components/Review/ReviewList.vue";
import StarRating from "@/Components/Review/StarRating.vue";
import SeoMeta from "@/Components/SeoMeta.vue";
import Layout from "@/Layouts/Public/DefaultLayout.vue";
import { computed, ref } from "vue";

defineOptions({
    layout: Layout,
});

const props = defineProps({
    data: Object,
});

// Безпечне отримання даних товару
const product = computed(() => props?.data?.item?.data || {});

const reviewsCount = computed(
    () => product?.value?.average_reviews?.count || 0,
);
const reviewsRating = computed(
    () => product?.value?.average_reviews?.rating || 0,
);
</script>
<template>
    <div class="grid grid-cols-2 md:grid-cols-12 w-full h-full gap-2">
        <div class="col-span-5 h-[75vh]">
            <MediaSlider :images="product.images" />
        </div>
        <div class="col-span-5 h-full flex flex-col bg-gray-200 gap-[1px]">
            <div class="p-12 flex flex-col bg-white">
                <h2 class="uppercase text-gray-500">
                    {{ product?.category?.title }}
                </h2>
                <h1 class="font-semibold text-2xl">
                    {{ product?.seo?.title || product.title || "Товар" }}
                </h1>

                <div>
                    <StarRating
                        :read-only="true"
                        :show-average="true"
                        :initial-rating="Number(reviewsRating)"
                        :average-rating="Number(reviewsRating)"
                    />
                </div>
            </div>

            <div class="p-12 bg-white flex items-center gap-4">
                <div>
                    <div>
                        <span v-if="product?.quantity > 0">{{
                            $t("inStoke")
                        }}</span>
                    </div>
                    <div>
                        <span class="text-2xl font-semibold"
                            >{{ product.price }}₴</span
                        >
                    </div>
                    <div v-if="product.old_price" class="line-through">
                        {{ product.old_price }}₴
                    </div>
                </div>

                <div>
                    <ButtonBuy></ButtonBuy>
                </div>
            </div>
            <div class="p-12 bg-white">
                <ReviewForm :model-id="product.id" model-type="Item" />
            </div>
            <div class="p-12 bg-white flex items-center gap-4">
                <ReviewList :model-id="product.id" model-type="Item" />
            </div>
            <div class="p-12 bg-white">{{ product.description }}</div>
        </div>
        <div class="p-6 h-full col-span-2"></div>

        <div class="p-6 h-full col-span-full bg-white">
            <div v-if="product?.images && product?.images?.length">
                <div
                    class="flex items-center justify-center w-full h-full"
                    v-for="img in product?.images"
                >
                    <transition name="fade" mode="out-in">
                        <img
                            :src="img?.url"
                            class="max-w-full max-h-full object-contain mix-blend-multiply gap-[1px]"
                            :alt="'' || 'Product image'"
                        />
                    </transition>
                </div>
            </div>
        </div>
        <div class="bg-gray-100 rounded-lg p-12 overflow-hidden col-span-full">
            <pre>
            {{ product }}
        </pre
            >
        </div>
    </div>
    <SeoMeta />
</template>
