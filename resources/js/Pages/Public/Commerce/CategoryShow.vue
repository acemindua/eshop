<template>
    <Head>
        <title>{{ displayTitle }}</title>
    </Head>
    <div class="flex flex-col space-y-2">
        <h1 class="text-xl text-gray-800 font-semibold">{{ displayTitle }}</h1>

        <section
            class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4"
        >
            <ItemCard v-for="item in items" :key="item.id" :data="item" />
        </section>

        <section>
            <VarDump :data="items" />
        </section>
    </div>
</template>

<script setup>
import ItemCard from "@/Components/Public/UI/Commerce/ItemCard.vue";
import Layout from "@/Layouts/Public/DefaultLayout.vue";
import VarDump from "@/Shared/VarDump.vue";
import { computed } from "vue";

defineOptions({ layout: Layout });

const props = defineProps({
    data: { type: Object },
});

const category = computed(() => props.data?.category?.data || {});
const displayTitle = computed(() => category.value.title || "Page");

const items = computed(() => props.data?.category?.data?.items || []);
</script>
