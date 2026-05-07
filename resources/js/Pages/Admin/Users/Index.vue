<template>
    <div class="flex flex-col space-y-4 w-full">
        <!-- Action Buttons -->
        <section class="md:flex items-center justify-between gap-2 space-y-2">
            <InputSearch v-model="searchText" />
            <ButtonsGroup :buttons="actionButtons" />
        </section>

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

        <section>
            <VarDump :data="data" />
        </section>
    </div>
</template>

<script setup>
// Ми НЕ використовуємо defineOptions для лейауту тут,
// якщо хочемо передати йому v-model напряму.
// Або використовуємо стандартний підхід Inertia (нижче).

import VarDump from "@/Shared/VarDump.vue";
import DataTable from "./Partials/DataTable.vue";
import { computed, ref, watch } from "vue";
import { router } from "@inertiajs/vue3";
import debounce from "lodash.debounce";
import InputSearch from "@/Components/UI/InputSearch.vue";
import DashboardAdminLayout from "@/Layouts/Admin/DashboardAdminLayout.vue";
import ButtonsGroup from "@/Components/UI/Buttons/Admin/ButtonsGroup.vue";

const props = defineProps({
    data: {
        type: Object,
    },
    filters: Object,
});

// Налаштування лейауту
defineOptions({
    layout: DashboardAdminLayout,
});

const items = computed(() => props.data?.users?.data || []);
const meta = computed(() => props.data?.users?.meta || []);
const searchText = ref(props.filters?.search || "");
const selectedItems = ref([]);

watch(
    searchText,
    debounce((value) => {
        router.get(
            route("admin.users.index"),
            { search: value },
            { preserveState: true, replace: true },
        );
    }, 500),
);

const deleteValueItem = (item) => {
    if (confirm("Ви впевнені, що хочете видалити цього користувача?")) {
        router.delete(route("admin.users.destroy", item.id));
    }
};

const handleImport = () => {
    console.log("Importing...");
};
const handleCreate = () => {
    router.visit(route("admin.users.create"));
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
