<template>
    <Layout>
        <template #sidenav>
            <AppDashboardNavigations />
        </template>

        <div><slot /></div>
    </Layout>
</template>

<script setup>
import Layout from "@/Layouts/AppLayout.vue";
import AppDashboardNavigations from "../App/Navigations/AppDashboardNavigations.vue";
</script>
