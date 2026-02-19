<template>
    <Head>
        <title>{{ displayTitle }}</title>
    </Head>
    <div class="flex flex-col space-y-2">
        <h1 class="text-xl text-gray-800 font-semibold">{{ displayTitle }}</h1>

        <section>
            <VarDump :data="data" />
        </section>
    </div>
</template>

<script setup>
import Layout from "@/Layouts/Public/Default/IndexLayout.vue";
import VarDump from "@/Shared/VarDump.vue";
import { computed } from "vue";

defineOptions({ layout: Layout });

const props = defineProps({
    data: { type: Object },
});

const page = computed(() => props.data?.page?.data || {});
const displayTitle = computed(() => page.value.title || "Сторінка");
</script>
