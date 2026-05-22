<!-- resources/js/Pages/Admin/Commerce/Settings/Warehouses/Edit.vue -->
<script setup>
import Layout from "@/Layouts/Admin/SettingsAdminLayout.vue";
import WarehouseForm from "./Components/WarehouseForm.vue";

defineOptions({ layout: Layout });

defineProps({ data: { type: Object } });
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
