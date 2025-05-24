<template>
    <DashboardLayout>
        <Head title="Dashboard" />
        <div class="grid grid-cols-4 gap-2">
            <InformerUsers :url="route('api.stats.users')" />
            <InformerProducts :url="route('api.stats.products')" />
        </div>
    </DashboardLayout>
</template>

<script setup>
import DashboardLayout from "@/Shared/Themes/Layouts/DashboardLayout.vue";
import InformerUsers from "@/Components/Informers/InformerUsers.vue";
import InformerProducts from "@/Components/Informers/InformerProducts.vue";
</script>
