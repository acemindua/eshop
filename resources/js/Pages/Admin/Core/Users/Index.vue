<script setup>
import { ref, watch, computed } from "vue";
import { router } from "@inertiajs/vue3";
import debounce from "lodash.debounce";

// Layout and UI Components
import DashboardAdminLayout from "@/Layouts/Admin/DashboardAdminLayout.vue";
import ButtonsGroup from "@/Components/UI/Buttons/Admin/ButtonsGroup.vue";
import InputSearch from "@/Components/UI/InputSearch.vue";
import useFormatter from "@/Composables/useFormatter";
import DataTable from "@/Components/DataTable.vue";
import UserStatus from "@/Components/UserStatus.vue";
import {
    IconArrowsSort,
    IconSortAscending,
    IconSortDescending,
} from "@tabler/icons-vue";
import ImageDataView from "@/Components/UI/ImageDataView.vue";
/**
 * Component Props
 */
const props = defineProps({
    data: { type: Object },
    filters: { type: Object },
});

const model = "users";
const items = computed(() => props.data?.items?.data || []);
const metaItems = computed(() => props.data?.items?.meta || []);
// --- State ---
const searchText = ref(props.filters?.search || "");
const selectedItems = ref([]);
const { formatPhone } = useFormatter();
const sortField = ref(props.filters?.field || "id");
const sortDirection = ref(props.filters?.direction || "desc");

// --- Methods ---
const handleImport = () => console.log("Importing...");
const handleCreate = () => router.visit(route(`admin.${model}.create`));
const handleDelete = (item) => {
    router.delete(route(`admin.${model}.destroy`, item.id), {
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
            route(`admin.${model}.index`),
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
            <DataTable :model="model" :items="items" :meta="metaItems" :selected-items="selectedItems"
                @update:selectedItems="selectedItems = $event" @delete="handleDelete" :sort-field="sortField"
                :sort-direction="sortDirection" @sort="handleSort">
                <template #headers>
                    <th class="py-2 text-center w-16">{{ $t("ava") }}</th>
                    <th class="p-2 text-left" @click="handleSort('full_name')">

                        <div class="flex items-center space-x-1">
                            <span> {{ $t("User Info") }}</span>

                            <!-- Іконки сортування -->
                            <template v-if="sortField === 'title'">
                                <IconSortAscending v-if="sortDirection === 'asc'" size="14" />
                                <IconSortDescending v-else size="14" />
                            </template>
                            <IconArrowsSort v-else size="14" class="text-gray-300" />
                        </div>

                    </th>
                    <th class="p-2 text-left">{{ $t("Contacts") }}</th>
                    <th class="p-2 text-center">{{ $t("Loyalty") }}</th>
                </template>

                <template #item-data="{ item }">
                    <td class="p-2 text-center">
                        <div class="relative inline-flex">
                            <ImageDataView :src="item?.avatar" :configs="{ width: '32px', height: '32px' }"
                                class="rounded-full shadow-sm" />
                        </div>
                    </td>

                    <td class="p-2">
                        <div class="flex flex-col leading-tight">
                            <span class="dark:text-slate-100">
                                {{ item.full_name }}
                            </span>
                            <UserStatus :user="{
                                is_online: item.online,
                                last_activity: item.last_activity_raw,
                            }" />


                        </div>
                    </td>

                    <td class="p-2">
                        <div class="flex flex-col text-xs space-y-0.5">
                            <span class="text-slate-700 font-medium">{{
                                formatPhone(item.phone) || "—"
                                }}</span>
                            <span class="text-slate-400 italic text-[10px]">{{
                                item.email
                                }}</span>
                        </div>
                    </td>

                    <td class="p-2 text-center font-mono text-xs">
                        <span :class="item.bonus_balance > 0
                                ? 'text-brand font-bold'
                                : 'text-slate-400'
                            ">
                            {{ item.bonus_balance }} ₴
                        </span>
                    </td>
                </template>
            </DataTable>
        </section>
    </div>
</template>
