<script setup>
import { useHead, useSeoMeta } from "@unhead/vue";
import { ref, computed, reactive, watch } from "vue";
import debounce from "lodash.debounce";
import { wTransChoice } from "laravel-vue-i18n";

import Layout from "@/Layouts/Public/DefaultLayout.vue";
import SortDropdown from "../Components/SortDropdown.vue";
import ProductFilters from "../Components/ProductFilters.vue";
import SkeletonProductCard from "../Components/SkeletonProductCard.vue";
import ProductCard from "../Components/ProductCard.vue";
import { useCatalogApi } from "@/Composables/useCatalogApi";
import { IconFlaskOff } from "@tabler/icons-vue";

defineOptions({ layout: Layout });
const props = defineProps({ data: Object, schema: Object, seo: Object });

const loading = ref(true);
const category = computed(() => props.data?.category?.data || null);
const priceMax = ref(props.data?.price_max || 50000);

const sortOptions = [
    { value: "rating_desc", label: "Highest Rated" },
    { value: "price_asc", label: "Price: Low to High" },
    { value: "price_desc", label: "Price: High to Low" },
];

const { items, meta, brands, categories, fetchCatalog } = useCatalogApi();

const form = reactive({
    in_stock: route().params.in_stock == "1",
    sale: route().params.sale == "1",
    rating: route().params.rating || 0,
    sort: route().params.sort || sortOptions[0].value,
    brands: route().params.brands?.split(",").map(Number) || [],
    categories: route().params.categories?.split(",").map(Number) || [],
    min_price: Number(route().params.min_price) || 0,
    max_price: Number(route().params.max_price) || priceMax.value,
});

const getRequest = async () => {
    try {
        await fetchCatalog(route("api.commerce.items"), {
            ...form,
            category_id: category.value?.id,
        });
    } catch (error) {
        // Тут можна додати сповіщення (toast) для користувача
        console.error("Не вдалося оновити товари", error);
    } finally {
        loading.value = false;
    }
};
const updateDebounce = debounce(getRequest, 500);

watch(form, () => updateDebounce(), { deep: true, immediate: true });

useHead({
    link: [
        { rel: "canonical", href: props.seo.links.canonical },
        ...Object.entries(props.seo.links.hreflangs).map(([lang, url]) => ({
            rel: "alternate",
            hreflang: lang,
            href: url,
        })),
    ],
    script: [
        {
            type: "application/ld+json",
            innerHTML: props.schema, // Тут буде чистий JSON без тегів <script>
        },
    ],
});
useSeoMeta(props.seo.meta);
</script>

<template>
    <div class="pb-2 border-b">
        <h1 class="text-2xl font-semibold">
            {{ category?.seo?.title || category?.title || $t("Category") }}
        </h1>

        <div class="flex items-center justify-between">
            <p class="text-sm text-gray-600">
                {{ $t("Found") }}
                {{
                    wTransChoice("Products", meta?.total || 0, {
                        count: meta?.total || 0,
                    })
                }}
            </p>
            <SortDropdown v-model="form.sort" :options="sortOptions" />
        </div>
    </div>

    <div class="flex flex-col md:flex-row items-start divide-x">
        <aside class="w-full md:w-64 shrink-0">
            <div class="pr-8">
                <ProductFilters
                    v-model="form"
                    :brands="brands"
                    :categories="categories"
                    :default-max="priceMax"
                />
            </div>
        </aside>

        <div class="flex-1 w-full">
            <div class="grid grid-cols-2 md:grid-cols-4">
                <template v-if="loading">
                    <SkeletonProductCard v-for="n in 4" :key="'skel-' + n" />
                </template>
                <template v-else-if="items.length > 0">
                    <ProductCard
                        v-for="item in items"
                        :key="item.id"
                        :data="item"
                    />
                </template>
            </div>
            <div
                v-if="!loading && items.length === 0"
                class="w-full h-64 flex items-center justify-center text-gray-500"
            >
                <div class="flex flex-col items-center gap-4">
                    <div
                        class="flex items-center justify-center bg-gray-100 rounded-full p-4"
                    >
                        <IconFlaskOff
                            stroke="{2}"
                            class="text-brand w-16 h-16"
                        />
                    </div>
                    <p>{{ $t("No products found...") }}</p>
                </div>
            </div>
        </div>
    </div>

    <section
        v-if="category?.seo?.description"
        class="mt-16 pt-8 border-t border-gray-100"
    >
        <h4 class="text-lg font-semibold text-gray-800 mb-4">
            {{ category.title }}
        </h4>
        <div
            class="prose prose-sm max-w-none text-gray-600"
            v-html="category.seo?.description"
        />
    </section>
</template>
