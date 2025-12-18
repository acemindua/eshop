<template>
    <Head :title="`Dashboard`" />

    <section>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4">
            <!-- users -->
            <div class="bg-white border rounded-lg p-4">
                <div class="uppercase text-gray-500 text-xs">Total users</div>
            </div>
            <!-- items -->
            <div class="bg-white border rounded-lg p-4">
                <div class="uppercase text-gray-500 text-xs">Total items</div>
            </div>
        </div>
    </section>
</template>

<script setup>
import Layout from "@/Layouts/Admin/DashboardAdminLayout.vue";

defineOptions({
    layout: Layout,
});
</script>
