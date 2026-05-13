<script setup>
import { ref, watch } from "vue";
import { router } from "@inertiajs/vue3";
import debounce from "lodash.debounce";

// Layout and UI Components
import DashboardAdminLayout from "@/Layouts/Admin/DashboardAdminLayout.vue";
import ButtonsGroup from "@/Components/UI/Buttons/Admin/ButtonsGroup.vue";
import InputSearch from "@/Components/UI/InputSearch.vue";
import VarDump from "@/Shared/VarDump.vue";
import DataTable from "@/Components/DataTable.vue";
import BadgeStatus from "@/Components/UI/Badge/BadgeStatus.vue";
/**
 * Component Props
 */
const props = defineProps({
    data: { type: Object },
    filters: { type: Object },
});

// --- State ---
const searchText = ref(props.filters?.search || "");
const selectedItems = ref([]);

// --- Methods ---
const handleImport = () => console.log("Importing...");
const handleCreate = () => router.visit(route("admin.pages.create"));
const handleDelete = (item) => router.delete(route("admin.pages.destroy", item.id));

// --- Configuration ---
const actionButtons = [
    { label: "import", action: handleImport, type: "secondary", icon: "IconCloudUpload" },
    { label: "create", action: handleCreate, type: "primary", icon: "IconCirclePlus" },
];

// --- Watchers ---

/**
 * Combined Debounced Watcher
 * Слідкує за пошуком та фільтром одночасно.
 */
watch(
    [searchText],
    debounce(([searchVal]) => {
        router.get(
            route("admin.pages.index"),
            { 
                search: searchVal, 
            },
            { 
                preserveState: true, 
                replace: true,
                preserveScroll: true 
            },
        );
    }, 500),
);

defineOptions({ layout: DashboardAdminLayout });
</script>

<template>
    <div class="flex flex-col space-y-4">
        <!-- Top Toolbar -->
        <section class="flex flex-wrap items-center justify-between gap-4">
            <div class="flex items-center gap-3">
                <!-- Search Input -->
                <InputSearch v-model="searchText" class="w-64" />
            </div>

            <ButtonsGroup :buttons="actionButtons" />
        </section>

        <!-- Main Data Section -->
        <section>
            <DataTable 
                :items="props.data?.pages?.data || []" 
                :meta="props.data?.pages?.meta" 
                model="pages"
                :selected-items="selectedItems" 
                @update:selectedItems="selectedItems = $event" 
                @delete="handleDelete"
            >
                <template #headers>
                    <th class="p-2 text-start w-full md:w-auto">
                        {{ $t("Title") }}
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

        <section>
            <VarDump :data="data" />
        </section>
    </div>
</template>