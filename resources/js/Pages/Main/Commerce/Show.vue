<template>
    <MainLayout>
        <section>
            <h1 class="text-xl font-semibold">{{ item.title }}</h1>
        </section>
        <section v-if="$page.props.app.env === 'local'">
            <VarDump :data="item" />
        </section>
    </MainLayout>
</template>
<script setup>
import { computed } from "vue";
import MainLayout from "@/Layouts/MainLayout.vue";
import VarDump from "@/Shared/VarDump.vue";

const props = defineProps({
    data: Object,
});

const item = computed(() => props.data.item.data || {});
</script>
