<template>
    <Layout>
        <Head :title="$t('Pages')" />
        <div class="flex flex-col space-y-2">
            <h1 class="text-xl text-gray-800 font-semibold">
                {{ $t("Pages") }}
            </h1>
            <!-- DataTable Pages-->
            <section>
                <DataTable
                    :items="items"
                    :meta="meta"
                    :selected-items="selectedItems"
                    @update:selectedItems="selectedItems = $event"
                    @delete="deleteValueItem"
                />
            </section>

            <section>
                <VarDump :data="data" />
            </section>
        </div>
    </Layout>
</template>
<script setup>
import Layout from "@/Layouts/Admin/DashboardAdminLayout.vue";
import DataTable from "./Partials/DataTable.vue";
import VarDump from "@/Shared/VarDump.vue";
import { computed, ref, watch } from "vue";
import { router } from "@inertiajs/vue3";
import debounce from "lodash.debounce";

const props = defineProps({
    data: {
        type: Object,
    },
    filters: Object,
});

const items = computed(() => props.data?.pages?.data || []);
const meta = computed(() => props.data?.pages?.meta || []);
const searchText = ref(props.filters.search);
const selectedItems = ref([]);

watch(
    searchText,
    debounce((value) => {
        router.get(
            route("admin.pages.index"),
            { search: value },
            { preserveState: true, replace: true }
        );
    }, 500)
);

//
const deleteValueItem = (item) => {
    router.delete(route("admin.pages.destroy", item.id));
};
</script>
