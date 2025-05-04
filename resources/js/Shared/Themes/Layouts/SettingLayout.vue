<template>
    <Layout>
        <template #sidenav>
            <AppSettingNavigations />
        </template>

        <div><slot /></div>
    </Layout>
</template>

<script setup>
import Layout from "@/Layouts/AppLayout.vue";
import AppSettingNavigations from "../App/Navigations/AppSettingNavigations.vue";
</script>
