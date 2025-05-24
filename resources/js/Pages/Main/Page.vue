<template>
    <MainLayout>
        <Head>
            <title>{{ item.title }}</title>
        </Head>
        <section class="bg-white p-8 rounded-lg">
            <h1 class="text-xl font-semibold">{{ item.title }}</h1>
            <div class="py-4">
                <div v-html="item.content" />
            </div>
        </section>
        <section v-if="$page.props.app.env === 'local'">
            <VarDump :data="data" />
        </section>
    </MainLayout>
</template>
<script setup>
import MainLayout from "@/Layouts/MainLayout.vue";
import VarDump from "@/Shared/VarDump.vue";
import { computed, ref, onMounted } from "vue";
import { useHead } from "@vueuse/head";
import { usePage } from "@inertiajs/vue3";

const props = defineProps({
    data: {
        type: Object,
    },
});
const isLoading = ref(true);
const item = computed(() => props.data.item.data || {});
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
