<script setup>
// Layout and UI Components
import DashboardAdminLayout from "@/Layouts/Admin/DashboardAdminLayout.vue";
import VarDump from "@/Shared/VarDump.vue";

/**
 * Component Props
 */
const props = defineProps({
    data: { type: Object },
});

defineOptions({ layout: DashboardAdminLayout });
</script>

<template>
    <div class="flex flex-col space-y-4">
        <div class="mt-4">
            <VarDump :data="data" />
        </div>
    </div>
</template>
