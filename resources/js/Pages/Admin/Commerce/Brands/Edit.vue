<!-- resources/js/Pages/Admin/Core/Pages/Create.vue -->
<script setup>
// Layout and UI Components
import Layout from "@/Layouts/Admin/CommerceAdminLayout.vue";
import BrandForm from "./Components/BrandForm.vue";

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
    <BrandForm
        :data="props.data || {}"
        :route-prefix="props.routePrefix"
        :is-editing="props.isEditing"
        :errors="props.errors"
    />
</template>
