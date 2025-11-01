<template>
    <Layout>
        <Head :title="$t('Users')" />
        <div class="flex flex-col space-y-2 w-full">
            <h1 class="text-xl text-gray-800 font-semibold">
                {{ $t("Users") }}
            </h1>
            <!-- DataTable -->
            <section>
                <DataTable />
            </section>

            <!-- VArDump -->
            <section>
                <VarDump :data="data" />
            </section>
        </div>
    </Layout>
</template>
<script setup>
import Layout from "@/Layouts/Admin/DashboardAdminLayout.vue";
import VarDump from "@/Shared/VarDump.vue";
import DataTable from "./Partials/DataTable.vue";

const props = defineProps({
    data: {
        type: Object,
    },
});
</script>
