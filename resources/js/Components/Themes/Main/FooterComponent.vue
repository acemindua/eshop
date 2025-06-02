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

const categories = ref({});
const pages = ref({});

// Дані сторінки
const currentPage = usePage();

// Активна сторінка
const isActivePage = (slug) => {
    const locale = currentPage.props.lang.default;
    const urls = [`/${slug}`, `/${locale}/${slug}`];
    return urls.includes(currentPage.url);
};
</script>

<template>
    <div class="flex items-center justify-between py-6">
        <div
            v-if="categories && categories.length > 0"
            class="flex gap-4 items-start"
        >
            <h4 class="text-sm font-semibold">{{ $t("Category") }}:</h4>
            <CategoryTree :categories="categories" />
        </div>
        <div v-if="pages && pages.length > 0" class="flex gap-4 items-start">
            <h4 class="text-sm font-semibold">{{ $t("Pages") }}:</h4>

            <ul class="text-sm">
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
            <ApplicationLogo class="block h-9 w-auto fill-current" />
        </Link>
    </div>

    <div
        class="flex items-center justify-between pb-6 pt-3 text-xs  border-t"
    >
        <div class="">
            ©{{ $page.props.app.year }} {{ $page.props.app.name }}.
            {{ $t("All rights reserved.") }}
        </div>

        <div>
            <a
                href="http://apisoft.com.ua"
                target="_blank"
                class="inline-flex space-x-2 items-center"
            >
                <p class="flex flex-col text-end">
                    <span class="text-xs ">Handmade by:</span>
                    <span class=" font-semibold">apiSoft</span>
                </p>

                <img
                    src="https://apisoft.com.ua/storage/apisoft.svg"
                    alt="apiSoft"
                    class="w-10 h-10"
                />
            </a>
        </div>
    </div>
</template>
