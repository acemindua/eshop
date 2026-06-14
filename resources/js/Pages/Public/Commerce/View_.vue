<script setup>
import ButtonBuy from "@/Components/Public/Commerce/ButtonBuy.vue";
import MediaSlider from "@/Components/Public/Commerce/MediaSlider.vue";
import ReviewForm from "@/Components/Review/ReviewForm.vue";
import ReviewList from "@/Components/Review/ReviewList.vue";
import StarRating from "@/Components/Review/StarRating.vue";
import SeoMeta from "@/Components/SeoMeta.vue";
import Layout from "@/Layouts/Public/DefaultLayout.vue";
import { IconMinus, IconPlus } from "@tabler/icons-vue";
import { computed, ref } from "vue";

defineOptions({
    layout: Layout,
});

const props = defineProps({
    data: Object,
});

// Стан кількості товару
const quantity = ref(1);

// Безпечне отримання даних товару
const product = computed(() => props?.data?.item?.data || {});

const reviewsCount = computed(
    () => product?.value?.average_reviews?.count || 0,
);
const reviewsRating = computed(
    () => product?.value?.average_reviews?.rating || 0,
);

// Функції для зміни кількості
const increment = () => quantity.value++;
const decrement = () => {
    if (quantity.value > 1) quantity.value--;
};
</script>

<template>
    <div class="grid grid-cols-2 md:grid-cols-12 w-full h-full gap-2">
        <div class="col-span-5 h-[75vh]">
            <MediaSlider :images="product.images" />
        </div>

        <div class="col-span-7 h-full flex flex-col bg-gray-200 gap-[1px]">
            <div class="p-12 flex flex-col bg-white">
                <h2
                    class="uppercase text-gray-400 text-xs tracking-widest mb-2 font-['Exo_2']"
                >
                    {{ product?.category?.title }}
                </h2>
                <h1 class="font-semibold text-3xl leading-tight">
                    {{ product?.seo?.title || product.title || "Товар" }}
                </h1>

                <div class="mt-4">
                    <StarRating
                        :read-only="true"
                        :show-average="true"
                        :initial-rating="Number(reviewsRating)"
                        :average-rating="Number(reviewsRating)"
                    />
                </div>
            </div>

            <div class="p-12 bg-white flex flex-wrap items-center gap-8">
                <div>
                    <div class="mb-1 h-5">
                        <span
                            v-if="product?.quantity > 0"
                            class="text-[10px] text-green-600 font-bold uppercase tracking-tighter"
                        >
                            {{ $t("inStoke") }}
                        </span>
                    </div>
                    <div class="flex flex-col">
                        <span
                            v-if="product.old_price"
                            class="text-sm text-gray-400 line-through -mb-1"
                        >
                            {{ product.old_price }}₴
                        </span>
                        <span class="text-3xl font-bold font-['Exo_2']">
                            {{ product.price }}₴
                        </span>
                    </div>
                </div>

                <div
                    class="flex items-center border border-gray-200 rounded-lg h-14 bg-gray-50"
                >
                    <button
                        @click="decrement"
                        class="px-4 h-full hover:bg-white transition-colors disabled:opacity-30 border-r"
                        :disabled="quantity <= 1"
                    >
                        <IconMinus :size="18" stroke-width="1.5" />
                    </button>
                    <input
                        v-model.number="quantity"
                        type="number"
                        readonly
                        class="w-14 text-center border-none bg-transparent focus:ring-0 font-['Exo_2'] font-bold text-lg"
                    />
                    <button
                        @click="increment"
                        class="px-4 h-full hover:bg-white transition-colors border-l"
                    >
                        <IconPlus :size="18" stroke-width="1.5" />
                    </button>
                </div>

                <div class="flex-grow md:flex-grow-0">
                    <ButtonBuy
                        :id="product.id"
                        :title="product.title"
                        :price="product.price"
                        :qty="quantity"
                        class="w-full md:w-auto h-14 min-w-[180px]"
                    />
                </div>
            </div>

            <div class="p-12 bg-white">
                <h3 class="font-bold uppercase text-xs tracking-widest mb-6">
                    Залишити відгук
                </h3>
                <ReviewForm :model-id="product.id" model-type="Item" />
            </div>

            <div class="p-12 bg-white">
                <h3
                    class="font-bold uppercase text-xs tracking-widest mb-6 text-gray-400"
                >
                    Відгуки клієнтів
                </h3>
                <ReviewList :model-id="product.id" model-type="Item" />
            </div>

            <div class="p-12 bg-white flex-grow">
                <h3 class="font-bold uppercase text-xs tracking-widest mb-4">
                    Опис товару
                </h3>
                <div class="prose prose-sm text-gray-600 leading-relaxed">
                    {{ product.description }}
                </div>
            </div>
        </div>

        <div class="p-6 h-full col-span-2"></div>

        <div class="p-6 h-full col-span-full bg-white border-t border-gray-100">
            <div
                v-if="product?.images?.length > 1"
                class="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
                <div
                    v-for="(img, index) in product.images"
                    :key="index"
                    class="aspect-square bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center p-4"
                >
                    <img
                        :src="img?.url"
                        class="max-w-full max-h-full object-contain mix-blend-multiply"
                        :alt="product.title"
                    />
                </div>
            </div>
        </div>

        <div class="bg-gray-100 rounded-lg p-12 overflow-hidden col-span-full">
            <h4
                class="text-xs font-mono text-gray-400 mb-4 uppercase tracking-widest"
            >
                Debug Info
            </h4>
            <pre
                class="text-[10px] leading-tight text-gray-500 overflow-x-auto"
                >{{ product }}</pre
            >
        </div>
    </div>
    <SeoMeta />
</template>

<style scoped>
/* Стилізація input[type=number] для прибирання стрілок */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
input[type="number"] {
    -moz-appearance: textfield;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
