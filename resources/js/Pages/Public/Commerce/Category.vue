<script setup>
import { computed, ref, onMounted, watch } from "vue";
import Layout from "@/Layouts/Public/DefaultLayout.vue";
import SkeletonProductCard from "./Components/SkeletonProductCard.vue";
import ProductCard from "./Components/ProductCard.vue";
import useApiResourceService from "@/Composables/useApiResourceService";
import Checkbox from "@/Components/UI/Checkbox.vue";
import Slider from "@vueform/slider"; // Імпорт бібліотеки
import "@vueform/slider/themes/default.css"; // Імпорт стилів
import TextInput from "@/Components/UI/TextInput.vue";

defineOptions({ layout: Layout });

const props = defineProps({ data: Object });

const category = computed(() => props.data?.category?.data || null);
const { loading, fetchData } = useApiResourceService();
const items = ref([]);
// Розраховуємо дефолтні значення
const defaultMin = computed(() => props.data?.min_price || 0);
const defaultMax = computed(() => props.data?.max_price || 50000);

const manufacturers = computed(() => props.data?.manufacturers || []);
// Стан форми
const form = ref({
    promo: route().params.promo == "1",
    // Якщо в URL немає параметрів ціни, беремо значення з бази (props)
    min_price: Number(route().params.min_price) || defaultMin.value,
    max_price: Number(route().params.max_price) || defaultMax.value,
    manufacturers: [],
});

// Масив для роботи слайдера
const priceRange = computed({
    get: () => [form.value.min_price, form.value.max_price],
    set: (val) => {
        form.value.min_price = val[0];
        form.value.max_price = val[1];
    },
});

const getData = async () => {
    try {
        const response = await fetchData(route("api.commerce.items"), {
            category_id: category.value?.id,
            promo: form.value.promo ? 1 : 0,
            min_price: form.value.min_price,
            max_price: form.value.max_price,
        });
        console.log(response.data);
        items.value = response?.data?.items || [];
    } catch (error) {
        console.error("Errors:", error);
    }
};

let timeout = null;
const updateFilters = () => {
    const params = {
        ...route().params,
        promo: form.value.promo ? 1 : 0,
        min_price: form.value.min_price > 0 ? form.value.min_price : null,
        max_price: form.value.max_price < 50000 ? form.value.max_price : null,
    };

    // Видаляємо null значення для чистих URL
    Object.keys(params).forEach(
        (key) => params[key] === null && delete params[key],
    );

    window.history.replaceState({}, "", route(route().current(), params));
    getData();
};

// Спостерігачі
watch(() => form.value.promo, updateFilters);
watch([() => form.value.min_price, () => form.value.max_price], () => {
    clearTimeout(timeout);
    timeout = setTimeout(updateFilters, 500);
});

onMounted(getData);
</script>

<template>
    <div>
        <h1 class="text-xl font-semibold mb-6">
            {{ category?.title || $t("Catalog") }}
        </h1>

        <div class="flex flex-col md:flex-row">
            <aside class="w-full md:w-64 flex-shrink-0 border-t p-4 space-y-8">
                <label
                    class="flex items-center gap-2 cursor-pointer text-sm text-gray-700"
                >
                    <Checkbox v-model:checked="form.promo" />
                    <span>{{ $t("Sale") }}</span>
                </label>

                <div class="pt-4 border-t">
                    <label
                        class="text-sm font-medium text-gray-700 mb-6 block"
                        >{{ $t("Price Range") }}</label
                    >
                    <div class="flex items-center gap-2 w-full">
                        <TextInput
                            v-model.number="form.min_price"
                            type="number"
                            :placeholder="$t('Min price')"
                        />
                        -
                        <TextInput
                            v-model.number="form.max_price"
                            type="number"
                            :placeholder="$t('Max price')"
                        />
                    </div>
                    <Slider
                        v-model="priceRange"
                        :min="defaultMin"
                        :max="defaultMax"
                        class="mt-6"
                        :tooltips="false"
                        :step="50"
                    />
                </div>

                <div class="pt-4 border-t">
                    <label class="text-sm font-medium text-gray-700 mb-2 block"
                        >Brands</label
                    >
                    <div class="space-y-2">
                        <label
                            v-for="brand in manufacturers"
                            :key="brand.id"
                            class="flex items-center gap-2"
                        >
                            <Checkbox
                                :value="brand.id"
                                v-model:checked="form.manufacturers"
                                @change="updateFilters"
                            />
                            <span class="text-sm">{{ brand.name }}</span>
                        </label>
                    </div>
                </div>
            </aside>

            <main class="flex-grow">
                <div
                    v-if="loading"
                    class="grid grid-cols-2 md:grid-cols-4 border-t border-l"
                >
                    <SkeletonProductCard
                        v-for="n in 8"
                        :key="'skeleton-' + n"
                    />
                </div>
                <div
                    v-else-if="items.length > 0"
                    class="grid grid-cols-2 md:grid-cols-4 border-t border-l"
                >
                    <ProductCard
                        v-for="item in items"
                        :key="item.id"
                        :data="item"
                    />
                </div>
                <div v-else class="text-center py-20 border-t border-l">
                    <p class="text-gray-500">{{ $t("No products found") }}</p>
                </div>
            </main>
        </div>
    </div>
</template>
