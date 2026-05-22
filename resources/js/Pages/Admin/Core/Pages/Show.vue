<!-- resources/js/Pages/Admin/Core/Pages/Show.vue -->
<script setup>
// Layout and UI Components
import DashboardAdminLayout from "@/Layouts/Admin/DashboardAdminLayout.vue";

/**
 * Component Props
 */
const props = defineProps({
    data: { type: Object },
});

defineOptions({ layout: DashboardAdminLayout });
</script>

<template></template>
