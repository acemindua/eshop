<!-- resources/js/Pages/Admin/Core/Pages/Edit.vue -->
<script setup>
// Layout and UI Components
import Layout from "@/Layouts/Admin/DashboardAdminLayout.vue";
import PageForm from "./Components/PageForm.vue";

defineOptions({ layout: Layout });
/**
 * Component Props
 */
const props = defineProps({
    data: { type: Object },
    routePrefix: { type: String, default: () => null },
    errors: { type: Object, default: () => ({}) },
});
</script>

<template>
    <PageForm
        :data="props.data || {}"
        :route-prefix="props.routePrefix"
        :is-editing="true"
        :errors="props.errors"
    />
</template>
