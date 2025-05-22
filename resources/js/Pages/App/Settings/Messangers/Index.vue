<template>
    <Layout>
        <Head title="Messengers" />

        <section></section>

        <section v-if="$page.props.app.env === 'local'">
            <VarDump :data="data" />
        </section>
    </Layout>
</template>

<script setup>
import Layout from "@/Shared/Themes/Layouts/SettingLayout.vue";
import VarDump from "@/Shared/VarDump.vue";

const props = defineProps({
    data: Object,
});
</script>
