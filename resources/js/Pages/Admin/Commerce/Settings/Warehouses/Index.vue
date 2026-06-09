<!-- resources/js/Pages/Admin/Commerce/Settings/Warehouses/Index.vue -->
<script setup>
import { ref, watch, computed } from "vue";
import { router } from "@inertiajs/vue3";
import debounce from "lodash.debounce";

// Layout and UI Components
import Layout from "@/Layouts/Admin/SettingsAdminLayout.vue";
import ButtonsGroup from "@/Components/UI/Buttons/Admin/ButtonsGroup.vue";
import InputSearch from "@/Components/UI/InputSearch.vue";
import DataTable from "@/Components/DataTable.vue";
import BadgeStatus from "@/Components/UI/Badge/BadgeStatus.vue";
import {
    IconArrowsSort,
    IconSortAscending,
    IconSortDescending,
    IconBuildingWarehouse, // Додано для кастомної іконки модуля складів
} from "@tabler/icons-vue";
import ImageDataView from "@/Components/UI/ImageDataView.vue";

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

const sortField = ref(props.filters?.field || "sort_order");
const sortDirection = ref(props.filters?.direction || "asc");

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

// Toggle warehouse active status directly from the table row
const handleToggleActive = (item) => {
    router.patch(
        route(`${props.routePrefix}.toggle`, item.id),
        {},
        {
            preserveScroll: true,
            preserveState: true,
        },
    );
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

defineOptions({ layout: Layout });
</script>

<template>
    <div class="flex flex-col space-y-4">
        <div
            class="flex items-center justify-between bg-gray-50 dark:bg-slate-900/50 border dark:border-slate-800 rounded-xl p-4 shadow-xs"
        >
            <div class="flex items-center space-x-3">
                <div class="p-2 bg-brand text-white rounded-xl shadow-sm">
                    <IconBuildingWarehouse size="20" />
                </div>
                <div>
                    <h1
                        class="text-base font-semibold tracking-tight dark:text-slate-200"
                    >
                        {{ $t("Warehouses") }}
                    </h1>
                    <p class="text-xs text-slate-400 font-medium">
                        {{ $t("Manage warehous content and structure") }}
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
                :items="props.data?.warehouses?.data || []"
                :meta="props.data?.warehouses?.meta || {}"
                :selected-items="selectedItems"
                @update:selectedItems="selectedItems = $event"
                @delete="handleDelete"
                :sort-field="sortField"
                :sort-direction="sortDirection"
                @sort="handleSort"
            >
                <template #headers>
                    <th class="w-12 py-1.5 text-center">{{ $t("Img") }}</th>

                    <!-- Sortable Warehouse / Address Column -->
                    <th
                        class="p-1.5 text-start cursor-pointer"
                        @click="handleSort('title')"
                    >
                        <div class="flex items-center space-x-1">
                            <span
                                class="text-xs font-semibold uppercase tracking-wider text-gray-500"
                            >
                                {{ $t("Warehouse / Address") }}
                            </span>
                            <template v-if="sortField === 'title'">
                                <IconSortAscending
                                    v-if="sortDirection === 'asc'"
                                    size="12"
                                />
                                <IconSortDescending v-else size="12" />
                            </template>
                            <IconArrowsSort
                                v-else
                                size="12"
                                class="text-gray-300"
                            />
                        </div>
                    </th>

                    <!-- Compact Contact and Schedule Columns -->
                    <th
                        class="w-40 p-1.5 text-start text-xs font-semibold uppercase tracking-wider text-gray-500 hidden sm:table-cell"
                    >
                        {{ $t("Contacts") }}
                    </th>
                    <th
                        class="w-44 p-1.5 text-start text-xs font-semibold uppercase tracking-wider text-gray-500 hidden md:table-cell"
                    >
                        {{ $t("Schedule") }}
                    </th>

                    <!-- Sortable Display Order Column -->
                    <th
                        class="w-24 p-1.5 text-center cursor-pointer"
                        @click="handleSort('sort_order')"
                    >
                        <div class="flex items-center justify-center space-x-1">
                            <span
                                class="text-xs font-semibold uppercase tracking-wider text-gray-500"
                            >
                                {{ $t("Order") }}
                            </span>
                            <template v-if="sortField === 'sort_order'">
                                <IconSortAscending
                                    v-if="sortDirection === 'asc'"
                                    size="12"
                                />
                                <IconSortDescending v-else size="12" />
                            </template>
                            <IconArrowsSort
                                v-else
                                size="12"
                                class="text-gray-300"
                            />
                        </div>
                    </th>

                    <th
                        class="w-20 p-1.5 text-center text-xs font-semibold uppercase tracking-wider text-gray-500"
                    >
                        {{ $t("Status") }}
                    </th>
                </template>

                <template #item-data="{ item }">
                    <!-- Image Display (scaled to 28px) -->
                    <td class="p-1.5 text-center align-middle">
                        <ImageDataView
                            :src="item?.image"
                            :configs="{ width: '28px', height: '28px' }"
                            class="inline-block object-cover border border-gray-100 rounded-md shadow-sm"
                        />
                    </td>

                    <!-- Title, Description, and Address Block -->
                    <td class="p-1.5 align-middle">
                        <div class="flex flex-col leading-tight">
                            <div
                                class="flex flex-wrap items-center space-x-1.5"
                            >
                                <span
                                    class="font-semibold text-gray-900 text-[13px]"
                                >
                                    {{ item.title }}
                                </span>
                                <span
                                    v-if="item.city"
                                    class="text-[10px] font-bold uppercase px-1 bg-slate-100 text-slate-600 rounded"
                                >
                                    {{ item.city }}
                                </span>
                            </div>

                            <!-- Address Line with Interactive Map Link -->
                            <div
                                v-if="item.address"
                                class="text-xs text-gray-500 flex items-center space-x-1 mt-0.5"
                            >
                                <span
                                    class="truncate max-w-[250px]"
                                    :title="item.address"
                                >
                                    {{ item.address }}
                                </span>
                                <a
                                    v-if="item.map_link"
                                    :href="item.map_link"
                                    target="_blank"
                                    class="p-0.5 text-blue-500 hover:text-blue-700 rounded hover:bg-blue-50 transition"
                                    title="Google Maps"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-3 w-3"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                        />
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </td>

                    <!-- Contact Details (Monospace-formatted phone) -->
                    <td
                        class="p-1.5 align-middle text-xs text-gray-600 hidden sm:table-cell"
                    >
                        <div
                            v-if="item.phone"
                            class="flex items-center space-x-1 text-gray-500"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-3 w-3 text-gray-400 shrink-0"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                />
                            </svg>
                            <span class="font-mono text-[11px]">
                                {{ item.phone }}
                            </span>
                        </div>
                        <span v-else class="text-gray-300">—</span>
                    </td>

                    <!-- Working Hours -->
                    <td
                        class="p-1.5 align-middle text-[11px] text-gray-500 hidden md:table-cell truncate max-w-[160px]"
                        :title="item.working_hours"
                    >
                        {{ item.working_hours || "—" }}
                    </td>

                    <!-- Sort Order Position Badge -->
                    <td
                        class="p-1.5 text-center text-xs font-medium text-gray-600 align-middle"
                    >
                        <span
                            class="px-1.5 py-0.5 bg-gray-50 rounded border border-gray-100"
                        >
                            {{ item.sort_order }}
                        </span>
                    </td>

                    <!-- Status Toggle Badge -->
                    <td class="p-1.5 align-middle">
                        <div class="flex justify-center">
                            <button
                                @click.stop="handleToggleActive(item)"
                                class="transition duration-100 transform hover:scale-105 active:scale-95 cursor-pointer transform-gpu"
                            >
                                <BadgeStatus
                                    :active="item.is_active"
                                    class="scale-90 origin-center"
                                />
                            </button>
                        </div>
                    </td>
                </template>
            </DataTable>
        </section>
    </div>
</template>
