<template>
    <ul
        class="capitalize text-sm font-semibold inline-flex items-center space-x-3"
    >
        <!-- Статичні сторінки -->
        <li v-for="page in pages" :key="page.id">
            <Link
                :href="`/${page.slug}`"
                class="text-slate-500 hover:text-slate-900 transition"
                :class="{ 'font-bold underline': isActivePage(page.slug) }"
            >
                {{ page.title }}
            </Link>
        </li>
    </ul>
</template>

<script setup>
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
