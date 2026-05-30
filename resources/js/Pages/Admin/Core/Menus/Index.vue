<script setup>
import { ref, watch, computed } from "vue";
import { router } from "@inertiajs/vue3";
import debounce from "lodash.debounce";

// Layout and UI Components
import BadgeStatus from "@/Components/UI/Badge/BadgeStatus.vue";
import ButtonsGroup from "@/Components/UI/Buttons/Admin/ButtonsGroup.vue";
import InputSearch from "@/Components/UI/InputSearch.vue";
import Layout from "@/Layouts/Admin/DashboardAdminLayout.vue";
import { IconMenu2 } from "@tabler/icons-vue";
import DataTable from "@/Components/DataTable.vue";
/**
 * Component Props
 */
/**
 * Component Props
 */
const props = defineProps({
    data: { type: Object, default: () => ({ items: { data: [], meta: {} } }) },
    filters: {
        type: Object,
        default: () => ({ search: "", field: "id", direction: "desc" }),
    },
    routePrefix: { type: String, required: true },
});

const searchText = ref(props.filters?.search || "");
const selectedItems = ref([]);
// Sorting
const sortField = ref(props.filters?.field || "id");
const sortDirection = ref(props.filters?.direction || "desc");
// --- Methods ---
const handleImport = () => console.log("Importing...");
const handleCreate = () => router.visit(route(`${props.routePrefix}.create`));
const handleDelete = (item) => {
    router.delete(route(`${props.routePrefix}.destroy`, item.id), {
        preserveScroll: true,
        preserveState: false,
        onSuccess: () => {
            selectedItems.value = [];
        },
    });
};

// --- Configuration ---
const actionButtons = [
    {
        label: "import",
        disabled: true,
        action: handleImport,
        type: "secondary",
        icon: "IconCloudUpload",
    },
    {
        label: "create",
        action: handleCreate,
        type: "primary",
        icon: "IconCirclePlus",
    },
];

const handleSort = (field) => {};
defineOptions({ layout: Layout });
</script>

<template>
    <div class="flex flex-col space-y-4">
        <div
            class="flex items-center justify-between bg-gray-50 dark:bg-slate-900/50 border dark:border-slate-800 rounded-xl p-4 shadow-xs"
        >
            <div class="flex items-center space-x-3">
                <div class="p-2 bg-brand text-white rounded-xl shadow-sm">
                    <IconMenu2 size="20" />
                </div>
                <div>
                    <h1
                        class="text-base font-semibold tracking-tight dark:text-slate-200"
                    >
                        {{ $t("Navigations & Menus") }}
                    </h1>
                    <p class="text-xs text-slate-400 font-medium">
                        {{ $t("Manage menu content and structure") }}
                    </p>
                </div>
            </div>
            <ButtonsGroup :buttons="actionButtons" />
        </div>
        <!-- Search Input -->
        <InputSearch v-model="searchText" class="w-64" />

        <!-- Main Data Section -->
        <section>
            <DataTable
                :route-prefix="props.routePrefix"
                :items="props.data?.items?.data || []"
                :meta="props.data?.items?.meta || {}"
                :selected-items="selectedItems"
                @update:selectedItems="selectedItems = $event"
                @delete="handleDelete"
                :sort-field="sortField"
                :sort-direction="sortDirection"
                @sort="handleSort"
            >
                <template #headers>
                    <th class="p-2 text-start cursor-pointer">
                        <div class="flex items-center space-x-1">
                            <span>{{ $t("Title") }}</span>
                        </div>
                    </th>
                </template>

                <template #item-data="{ item }">
                    <td class="p-2">
                        <p>{{ item.title }}</p>
                        <p
                            class="text-xs text-gray-500 hover:text-indigo-400 duration-150 transition"
                        >
                            {{ item.slug }}
                        </p>
                    </td>
                </template>
            </DataTable>
        </section>
    </div>
</template>
