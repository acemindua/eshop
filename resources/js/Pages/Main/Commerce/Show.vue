<template>
    <MainLayout>
        <section>
            <h1 class="text-xl font-semibold">{{ item.title }}</h1>
        </section>
        <section v-if="$page.props.app.env === 'local'">
            <VarDump :data="data" />
        </section>
    </MainLayout>
</template>
<script setup>
import { computed, onMounted, ref } from "vue";
import { useHead } from "@vueuse/head";
import MainLayout from "@/Layouts/MainLayout.vue";
import VarDump from "@/Shared/VarDump.vue";
import { usePage } from "@inertiajs/vue3";

const props = defineProps({
    data: Object,
});

const isLoading = ref(true);
const item = computed(() => props.data.item.data || {});
const variant = computed(() => props.data.variant?.data ?? null);

// Отримуємо перше зображення відповідно до наявності variant
const imageUrl = computed(() => {
    if (variant.value && variant.value.images?.length) {
        return variant.value.images[0].url;
    }
    if (item.value.images?.length) {
        return item.value.images[0].url;
    }
    return null;
});

// SEO
const headMeta = computed(() => ({
    title: () => (isLoading.value ? "Loading..." : item.value.title),
    titleTemplate: `%s - ${usePage().props.app.name}`,
    meta: [
        {
            name: "robots",
            content: item.value.status ? "index, follow" : "noindex, nofollow",
        },
        {
            name: "keywords",
            content: generateKeywords(item.value.title, item.value.description),
        },
        {
            name: "description",
            content:
                item.value.description ?? item.value.content?.slice(0, 160),
        },
        {
            property: "og:title",
            content: item.value.title,
        },
        {
            property: "og:description",
            content:
                item.value.description ?? item.value.content?.slice(0, 160),
        },
        {
            property: "og:image",
            content: imageUrl.value,
        },
    ],
}));

useHead(headMeta);

function generateKeywords(title, description) {
    const text = `${title} ${description ?? ""}`.toLowerCase();
    return [
        ...new Set(
            text
                .replace(/[^\p{L}\s]/gu, "") // Зберігає всі літери (в т.ч. кирилицю) та пробіли
                .split(/\s+/)
                .filter((word) => word.length > 3)
        ),
    ]
        .slice(0, 10)
        .join(", ");
}

onMounted(() => {
    isLoading.value = false;
});
</script>
