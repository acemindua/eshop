<!-- resources/js/Pages/Admin/Core/Pages/Index.vue -->
<script setup>
import { ref, watch, computed } from "vue";
import { router } from "@inertiajs/vue3";
import debounce from "lodash.debounce";

// Layout and UI Components
import DashboardAdminLayout from "@/Layouts/Admin/DashboardAdminLayout.vue";
import ButtonsGroup from "@/Components/UI/Buttons/Admin/ButtonsGroup.vue";
import InputSearch from "@/Components/UI/InputSearch.vue";
import DataTable from "@/Components/DataTable.vue";
import BadgeStatus from "@/Components/UI/Badge/BadgeStatus.vue";
import {
    IconArrowsSort,
    IconArticle,
    IconSortAscending,
    IconSortDescending,
} from "@tabler/icons-vue";

/**
 * Component Props
 */
const props = defineProps({
    data: { type: Object },
    filters: {
        type: Object,
        default: () => ({ search: "", field: "id", direction: "desc" }),
    },
    routePrefix: { type: String, required: true },
});

// --- State ---
const searchText = ref(props.filters?.search || "");
const selectedItems = ref([]);

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

// --- Watchers ---

/**
 * Combined Debounced Watcher
 * Слідкує за пошуком та фільтром одночасно.
 */
watch(
    [searchText, sortField, sortDirection],
    debounce(([searchVal, field, direction]) => {
        router.get(
            route(`${props.routePrefix}.index`),
            { search: searchVal, field: field, direction: direction },
            {
                preserveState: false,
                replace: true,
                preserveScroll: true,
            },
        );
    }, 500),
);

const handleSort = (field) => {
    if (sortField.value === field) {
        sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
    } else {
        sortField.value = field;
        sortDirection.value = "asc";
    }
};
defineOptions({ layout: DashboardAdminLayout });
</script>

<template>
    <div class="flex flex-col space-y-4">
        <div
            class="flex items-center justify-between bg-gray-50 dark:bg-slate-900/50 border dark:border-slate-800 rounded-xl p-4 shadow-xs"
        >
            <div class="flex items-center space-x-3">
                <div class="p-2 bg-brand text-white rounded-xl shadow-sm">
                    <IconArticle size="20" />
                </div>
                <div>
                    <h1
                        class="text-base font-semibold tracking-tight dark:text-slate-200"
                    >
                        {{ $t("Pages") }}
                    </h1>
                    <p class="text-xs text-slate-400 font-medium">
                        {{ $t("Manage page content and structure") }}
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
                    <th
                        class="p-2 text-start cursor-pointer"
                        @click="handleSort('title')"
                    >
                        <div class="flex items-center space-x-1">
                            <span>{{ $t("Title") }}</span>

                            <!-- Іконки сортування -->
                            <template v-if="sortField === 'title'">
                                <IconSortAscending
                                    v-if="sortDirection === 'asc'"
                                    size="14"
                                />
                                <IconSortDescending v-else size="14" />
                            </template>
                            <IconArrowsSort
                                v-else
                                size="14"
                                class="text-gray-300"
                            />
                        </div>
                    </th>
                    <th class="p-2 text-center w-48">{{ $t("Status") }}</th>
                </template>

                <template #item-data="{ item }">
                    <td class="p-2">
                        <p>{{ item.title }}</p>
                        <p
                            class="text-xs text-gray-500 hover:text-indigo-400 duration-150 transition"
                        >
                            url: {{ `/${item.slug}` }}
                        </p>
                    </td>
                    <td class="p-2">
                        <div class="flex justify-center">
                            <BadgeStatus :active="item.public" />
                        </div>
                    </td>
                </template>
            </DataTable>
        </section>
    </div>
</template>
