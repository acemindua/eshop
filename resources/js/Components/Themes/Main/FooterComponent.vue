<script setup>
import ApplicationLogo from "@/Components/ApplicationLogo.vue";
import CategoryTree from "../Ecommerce/CategoryTree.vue";

import { ref } from "vue";
import { Link, usePage } from "@inertiajs/vue3";
const props = defineProps({
    data: {
        type: Object,
        default: () => ({}),
    },
});

const categories = ref(props.data.categories.data || {});
const pages = ref(props.data.pages.data || {});

// Дані сторінки
const currentPage = usePage();

// Активна сторінка
const isActivePage = (slug) => {
    return currentPage.url.startsWith(`/${slug}`);
};
</script>

<template>
    <div class="flex items-center justify-between py-6">
        <div
            v-if="categories && categories.length > 0"
            class="flex gap-4 items-start"
        >
            <h4 class="text-gray-600 text-sm font-semibold">
                {{ $t("Category") }}:
            </h4>
            <CategoryTree :categories="categories" />
        </div>
        <div v-if="pages && pages.length > 0" class="flex gap-4 items-start">
            <h4 class="text-gray-600 text-sm font-semibold">
                {{ $t("Pages") }}:
            </h4>

            <ul class="text-sm text-gray-600 capitalize">
                <li>
                    <Link href="/">{{ $t("Home") }}</Link>
                </li>
                <li v-for="page in pages" :key="page.id">
                    <Link
                        :href="`/${page.slug}`"
                        :class="{ underline: isActivePage(page.slug) }"
                        >{{ page.title }}</Link
                    >
                </li>
            </ul>
        </div>

        <Link href="/" class="inline-flex items-center space-x-2">
            <ApplicationLogo
                class="block h-9 w-auto fill-current text-gray-600"
            />
        </Link>
    </div>

    <div class="text-xs text-gray-600 py-4 border-t">
        ©{{ $page.props.app.year }} {{ $page.props.app.name }}.
        {{ $t("All rights reserved.") }}
    </div>
</template>
