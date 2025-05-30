<template>
    <!-- <div class="border-t border-b py-2">
        <ul class="text-sm font-semibold inline-flex items-center space-x-3">
    
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
    </div> -->
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
    const locale = currentPage.props.lang.default;
    const urls = [`/${slug}`, `/${locale}/${slug}`];
    return urls.includes(currentPage.url);
};
</script>
