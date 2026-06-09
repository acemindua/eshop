<!-- resources/js/Pages/Admin/Commerce/Settings/Warehouses/Edit.vue -->
<script setup>
import Layout from "@/Layouts/Admin/SettingsAdminLayout.vue";
import WarehouseForm from "./Components/WarehouseForm.vue";

defineOptions({ layout: Layout });

const props = defineProps({
    data: { type: Object },
    routePrefix: { type: String, default: () => null },
    isEditing: { type: Boolean, default: false },
    errors: { type: Object, default: () => ({}) },
});
</script>

<template>
    <div>
        <WarehouseForm
            :is-editing="true"
            :data="data.warehouse?.data || data.warehouse || {}"
            route-prefix="admin.settings.commerce.warehouses"
        />
    </div>
</template>
