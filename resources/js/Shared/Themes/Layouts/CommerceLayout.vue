<template>
    <Layout>
        <template #sidenav>
            <AppCommerceNavigations />
        </template>

        <div><slot /></div>
    </Layout>
</template>

<script setup>
import Layout from "@/Layouts/AppLayout.vue";
import AppCommerceNavigations from "../App/Navigations/AppCommerceNavigations.vue";
</script>
