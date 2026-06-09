<script setup>
import useApiResourceService from "@/Composables/useApiResourceService.js";
import ProductCard from "./ProductCard.vue";
import { ref, watch, computed } from "vue";
import { usePage } from "@inertiajs/vue3";
import SkeletonProductCard from "./SkeletonProductCard.vue";

const { loading, fetchData } = useApiResourceService();
const items = ref([]);
const page = usePage();

const currentLocale = computed(() => {
    return page.props.config.locale || "en";
});

const getData = async () => {
    try {
        const response = await fetchData(
            route("api.commerce.popular", { locale: currentLocale.value }),
        );
        // Захист: якщо items прийде як null/undefined, ставимо порожній масив
        items.value = response.data?.items || response.data || [];
    } catch (error) {
        console.error("Error fetching popular products:", error);
    }
};

watch(
    currentLocale,
    () => {
        getData();
    },
    { immediate: true },
);
</script>

<template>
    <section v-if="loading || items.length > 0" class="flex flex-col space-y-4">
        <h2 class="text-2xl font-semibold text-gray-800">
            {{ $t("Popular products") }}
        </h2>

        <div
            v-if="loading || items.length > 0"
            class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4"
        >
            <template v-if="loading">
                <SkeletonProductCard v-for="n in 5" :key="'skeleton-' + n" />
            </template>

            <template v-else>
                <ProductCard
                    v-for="item in items"
                    :key="item.id"
                    :data="item"
                />
            </template>
        </div>

        <div
            v-else
            class="text-gray-500 py-12 text-center border border-dashed border-gray-200 rounded-xl bg-gray-50/50"
        >
            <p class="text-sm">{{ $t("No popular products found.") }}</p>
        </div>
    </section>
</template>
