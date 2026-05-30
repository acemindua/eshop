<!-- resources/js/Pages/Admin/Core/Users/Create.vue -->
<script setup>
// Layout and UI Components
import Layout from "@/Layouts/Admin/DashboardAdminLayout.vue";
import UserForm from "./Components/UserForm.vue";

defineOptions({ layout: Layout });
/**
 * Component Props
 */
const props = defineProps({
    data: { type: Object },
    routePrefix: { type: String, default: () => null },
    isEditing: { type: Boolean, default: false },
    errors: { type: Object, default: () => ({}) },
});
</script>

<template>
    <UserForm
        :data="props.data?.user || {}"
        :roles="props.data?.roles || []"
        :route-prefix="props.routePrefix"
        :is-editing="props.isEditing"
        :errors="props.errors"
    />
</template>
