<template>
    <div>
        <section class="bg-white p-8 rounded-lg">
            <h1 class="text-xl font-semibold">{{ item.title }}</h1>
            <div class="py-4">
                <div v-html="item.content" />
            </div>
        </section>

        <section v-if="$page.props.app.env === 'local'">
            <VarDump :data="data" />
        </section>
    </div>
</template>
<script setup>
import { computed } from "vue";
import { useHead } from "@vueuse/head";
import { usePage } from "@inertiajs/vue3";
import { generateHeadMeta } from "@/helpers";
import MainLayout from "@/Layouts/MainLayout.vue";
import VarDump from "@/Shared/VarDump.vue";

defineOptions({ layout: MainLayout });

const props = defineProps({
    data: {
        type: Object,
    },
});
//
const item = computed(() => props.data.item.data || {});
//
const headMeta = computed(() =>
    generateHeadMeta(
        item.value,
        usePage().props.app.name,
        usePage().props.lang.keys
    )
);
//
useHead(headMeta);
</script>
