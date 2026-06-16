<script setup>
import { computed, ref, onMounted, watch } from "vue";
import Layout from "@/Layouts/Public/DefaultLayout.vue";
import SkeletonProductCard from "./Components/SkeletonProductCard.vue";
import ProductCard from "./Components/ProductCard.vue";
import { wTransChoice } from "laravel-vue-i18n";
import ProductFilters from "./Components/ProductFilters.vue";
import Pagination from "./Pagination.vue";
import { useCatalogApi } from "@/Composables/useCatalogApi";

defineOptions({ layout: Layout });
const props = defineProps({ data: Object });

const category = computed(() => props.data?.category?.data || null);

// Ініціалізація сторінки з URL
const page = ref(Number(route().params.page) || 1);

const defaultMin = computed(() => props.data?.min_price || 0);
const defaultMax = computed(() => props.data?.max_price || 50000);

const form = ref({
    promo: route().params.promo == "1",
    min_price: Number(route().params.min_price) || defaultMin.value,
    max_price: Number(route().params.max_price) || defaultMax.value,
    brands: route().params.brands
        ? route().params.brands.split(",").map(Number)
        : [],
    rating: route().params.rating || 0,
    sort: route().params.sort || "rating_desc",
});

// Головний метод отримання даних
const { items, meta, loading, brands, fetchCatalog } = useCatalogApi();

const getData = () => {
    fetchCatalog(route("api.commerce.items"), {
        ...form.value,
        category_id: category.value?.id,
        page: page.value,
    });
};

// Оновлення URL та запит
const updateUrl = (resetPage = true) => {
    if (resetPage) page.value = 1;

    const params = {
        ...route().params,
        ...form.value,
        page: page.value,
        brands:
            form.value.brands.length > 0 ? form.value.brands.join(",") : null,
    };

    Object.keys(params).forEach(
        (key) => params[key] == null && delete params[key],
    );
    window.history.replaceState({}, "", route(route().current(), params));
    getData();
};

// Спостерігачі за фільтрами
watch(
    [
        () => form.value.promo,
        () => form.value.brands,
        () => form.value.rating,
        //() => form.value.sort,
    ],
    () => updateUrl(true),
    { deep: true },
);

// Спостерігач за ціною (з дебаунсом)
watch([() => form.value.min_price, () => form.value.max_price], () => {
    clearTimeout(window.timeout);
    window.timeout = setTimeout(() => updateUrl(true), 500);
});

// Слухач для кліків по пагінації (через вікно, якщо компонент викликає подію)
// Або ви можете просто викликати getData() при кліку в компоненті
onMounted(getData);

const handlePageChange = (link) => {
    if (!link.url || link.active) return; // Ігноруємо клік по активній або порожній

    const url = new URL(link.url);
    const newPage = url.searchParams.get("page");

    if (newPage && page.value !== Number(newPage)) {
        page.value = Number(newPage);
        updateUrl(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
};

import {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
} from "@headlessui/vue";

const sortOptions = [
    { value: "rating_desc", label: "Highest Rated" },
    { value: "price_asc", label: "Price: Low to High" },
    { value: "price_desc", label: "Price: High to Low" },
];

// Знаходимо поточний label для кнопки
const currentSortLabel = computed(
    () => sortOptions.find((o) => o.value === form.value.sort)?.label || "Sort",
);

const initialForm = {
    promo: false,
    min_price: defaultMin.value, // используем ваши дефолтные значения
    max_price: defaultMax.value,
    brands: [],
    rating: 0,
    sort: "rating_desc",
};

const resetFilters = () => {
    // Сбрасываем форму
    form.value = { ...initialForm };

    // Сбрасываем страницу
    page.value = 1;

    // Обновляем URL и получаем данные
    updateUrl(true);
};
</script>

<template>
    <div class="catalog-container">
        <h1 class="text-xl font-semibold mb-6">
            {{ category?.title || $t("Catalog") }}
        </h1>
        <button
            @click="resetFilters"
            class="text-sm text-gray-500 hover:text-red-600 underline transition"
        >
            {{ $t("Reset filters") }}
        </button>
        <div class="text-xs">
            <span>{{ $t("Found") }}</span>
            {{
                wTransChoice("Products", meta?.total || 0, {
                    count: meta?.total || 0,
                })
            }}
        </div>

        <Listbox v-model="form.sort" @update:model-value="updateUrl(true)">
            <div class="relative mt-1">
                <ListboxButton
                    class="border p-2 rounded text-sm w-48 text-left bg-white shadow-sm"
                >
                    {{ $t(currentSortLabel) }}
                </ListboxButton>

                <ListboxOptions
                    class="absolute mt-1 w-48 bg-white border rounded shadow-lg z-10"
                >
                    <ListboxOption
                        v-for="option in sortOptions"
                        :key="option.value"
                        :value="option.value"
                        v-slot="{ active, selected }"
                    >
                        <li
                            :class="[
                                'p-2 cursor-pointer',
                                active ? 'bg-gray-100' : '',
                                selected ? 'font-bold' : '',
                            ]"
                        >
                            {{ $t(option.label) }}
                        </li>
                    </ListboxOption>
                </ListboxOptions>
            </div>
        </Listbox>
        <div class="flex flex-col md:flex-row">
            <ProductFilters
                v-model="form"
                :brands="brands"
                :default-min="defaultMin"
                :default-max="defaultMax"
            />

            <main class="flex-grow">
                <div
                    v-if="loading"
                    class="grid grid-cols-2 md:grid-cols-4 border-t"
                >
                    <SkeletonProductCard v-for="n in 8" :key="'skel-' + n" />
                </div>

                <template v-else-if="items.length > 0">
                    <div class="grid grid-cols-2 md:grid-cols-4 border-t">
                        <ProductCard
                            v-for="item in items"
                            :key="item.id"
                            :data="item"
                        />
                    </div>

                    <div v-if="meta?.links?.length > 3" class="py-8">
                        <Pagination v-bind="meta" @change="handlePageChange" />
                    </div>
                </template>

                <p v-else class="text-center py-20 text-gray-500">
                    {{ $t("No products found") }}
                </p>
            </main>
        </div>
    </div>
</template>
