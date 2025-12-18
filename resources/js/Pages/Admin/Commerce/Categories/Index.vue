<template>
    <Head :title="title" />
    <div class="flex flex-col space-y-2">
        <!-- Action Buttons -->
        <section
            class="md:flex items-center justify-between pt-4 gap-4 space-y-2"
        >
            <InputSearch v-model="searchText" />
            <ButtonsGroup :buttons="actionButtons" />
        </section>
        <!-- DataTable Pages-->
        <section>
            <DataTable
                :items="items"
                :meta="meta"
                :selected-items="selectedItems"
                @update:selectedItems="selectedItems = $event"
                @delete="deleteValueItem"
                model="categories"
            />
        </section>

        <section v-if="$page.props.app.mode === 'local'">
            <VarDump :data="data" />
        </section>
    </div>
</template>
<script setup>
import Layout from "@/Layouts/Admin/CommerceAdminLayout.vue";
import DataTable from "./Partials/DataTable.vue";
import VarDump from "@/Shared/VarDump.vue";
import { computed, ref, watch } from "vue";
import { router } from "@inertiajs/vue3";
import debounce from "lodash.debounce";
import InputSearch from "@/Components/UI/InputSearch.vue";
import ButtonsGroup from "@/Components/UI/Buttons/Admin/ButtonsGroup.vue";

defineOptions({
    layout: Layout,
});

const props = defineProps({
    data: {
        type: Object,
    },
    filters: Object,
});

const title = "Categories";
const items = computed(() => props.data?.categories?.data || []);
const meta = computed(() => props.data?.categories?.meta || []);
const searchText = ref(props.filters.search);
const selectedItems = ref([]);

watch(
    searchText,
    debounce((value) => {
        router.get(
            route("admin.categories.index"),
            { search: value },
            { preserveState: true, replace: true }
        );
    }, 500)
);

//
const deleteValueItem = (item) => {
    router.delete(route("admin.categories.destroy", item.id));
};
const handleImport = () => {
    console.log("Importing...");
};
const handleCreate = () => {
    router.visit(route("admin.categories.create"));
};

const actionButtons = [
    {
        label: "import",
        action: handleImport,
        type: "secondary",
        icon: "IconCloudUpload",
    },
    {
        label: "create",
        loadingLabel: "Saving...",
        action: handleCreate,
        type: "primary",
        icon: "IconCirclePlus",
    },
];
</script>
