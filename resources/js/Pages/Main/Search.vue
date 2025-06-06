<template>
    <MainLayout>
        <h1 class="text-3xl font-extrabold text-gray-900 mb-6 sr-only">
            {{ title }}
        </h1>

        <section class="py-8 space-y-8">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                    v-if="items.length"
                    class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full"
                >
                    <ProductCard
                        v-for="item in items"
                        :key="item.id"
                        :data="item"
                        @add-to-cart="handleAddToCart"
                    />
                </div>

                <div v-else class="text-center py-16">
                    <p class="text-xl mb-4">
                        По запиту "{{ searchQuery }}" немає результатів
                    </p>
                    <div class="text-gray-600">
                        <p>
                            Можливо, ви ввели некоректний запит. Перевірте
                            правильність написання.
                        </p>
                        <p>Намагайтеся використовувати тільки ключові слова.</p>
                    </div>
                </div>
            </div>
        </section>
    </MainLayout>
</template>

<script setup>
import { computed, ref } from "vue";
import { useHead } from "@vueuse/head";
import { generateHeadMeta } from "@/helpers";
import MainLayout from "@/Layouts/MainLayout.vue";
import { usePage } from "@inertiajs/vue3"; // Import router for search functionality
import ProductCard from "@/Components/Themes/Ecommerce/ProductCard.vue";

const props = defineProps({
    data: Object,
    filters: Object,
});

const title = computed(() => props.data.seo.meta_title ?? props.data.seo.title);
const items = computed(() => props.data.results.data || []);

// State for search query
const searchQuery = ref(props.filters?.q || ""); // Initialize with current search query if available

const headMeta = computed(() =>
    generateHeadMeta(props.data.seo, usePage().props.app.name)
);

useHead(headMeta);
</script>
