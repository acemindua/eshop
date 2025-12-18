<template>
    <div class="flex flex-col space-y-2 w-full">
        <section
            class="md:flex items-center justify-between pt-4 gap-4 space-y-2"
        >
            <InputSearch v-model="searchText" />
        </section>
        <!-- DataTable -->
        <section>
            <DataTable
                :items="items"
                :meta="meta"
                :selected-items="selectedItems"
                model="users"
                @update:selectedItems="selectedItems = $event"
                @delete="deleteValueItem"
            />
        </section>

        <!-- VArDump -->
        <section>
            <VarDump :data="data" />
        </section>
    </div>
</template>
<script setup>
import Layout from "@/Layouts/Admin/DashboardAdminLayout.vue";
import VarDump from "@/Shared/VarDump.vue";
import DataTable from "./Partials/DataTable.vue";
import { computed, ref, watch } from "vue";
import { router } from "@inertiajs/vue3";
import debounce from "lodash.debounce";
import InputSearch from "@/Components/UI/InputSearch.vue";

defineOptions({
    layout: Layout,
});

const props = defineProps({
    data: {
        type: Object,
    },
    filters: Object,
});

const items = computed(() => props.data?.users?.data || []);
const meta = computed(() => props.data?.users?.meta || []);
const searchText = ref(props.filters.search);
const selectedItems = ref([]);

watch(
    searchText,
    debounce((value) => {
        router.get(
            route("admin.users.index"),
            { search: value },
            { preserveState: true, replace: true }
        );
    }, 500)
);

//
const deleteValueItem = (item) => {
    router.delete(route("admin.users.destroy", item.id));
};
</script>
