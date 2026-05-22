<!-- resources/js/Pages/Admin/Core/Users/Index.vue -->
<script setup>
import { ref, watch, computed, onUnmounted } from "vue";
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
    IconShieldFilled,
    IconSortAscending,
    IconSortDescending,
    IconUsers,
} from "@tabler/icons-vue";
import ImageDataView from "@/Components/UI/ImageDataView.vue";

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

const routePrefix = props.routePrefix;
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
const handleCreate = () => router.visit(route(`${routePrefix}.create`));

const handleDelete = (item) => {
    if (
        !confirm(
            route().params.locale === "uk"
                ? "Ви впевнені, що хочете видалити цього користувача?"
                : "Are you sure you want to delete this user?",
        )
    )
        return;

    router.delete(route(`${routePrefix}.destroy`, item.id), {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => {
            selectedItems.value = [];
        },
    });
};

const handleSort = (field) => {
    if (sortField.value === field) {
        sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
    } else {
        sortField.value = field;
        sortDirection.value = "asc";
    }
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

// Конфігурація стилів для бейджів ролей
const roleStyles = {
    "super-user":
        "bg-red-50 text-red-700 border border-red-100 dark:bg-red-950/30 dark:text-red-400 dark:border-red-900/50",
    administrator:
        "bg-purple-50 text-purple-700 border border-purple-100 dark:bg-purple-950/30 dark:text-purple-400 dark:border-purple-900/50",
    moder: "bg-blue-50 text-blue-700 border border-blue-100 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-900/50",
    auth: "bg-green-50 text-green-700 border border-green-100 dark:bg-green-950/30 dark:text-green-400 dark:border-green-900/50",
    default:
        "bg-slate-50 text-slate-600 border border-slate-200 dark:bg-slate-800/50 dark:text-slate-400 dark:border-slate-700",
};

const getRoleClass = (roleName) => {
    return roleStyles[roleName] || roleStyles["default"];
};

// --- Watchers ---
const dbRequest = debounce((searchVal, field, direction) => {
    router.get(
        route(`${routePrefix}.index`),
        { search: searchVal, field: field, direction: direction },
        {
            preserveState: true,
            replace: true,
            preserveScroll: true,
        },
    );
}, 400);

watch(
    [searchText, sortField, sortDirection],
    ([searchVal, field, direction]) => {
        dbRequest(searchVal, field, direction);
    },
);

onUnmounted(() => {
    dbRequest.cancel();
});

defineOptions({ layout: DashboardAdminLayout });
</script>

<template>
    <div class="flex flex-col space-y-4">
        <div
            class="flex items-center justify-between bg-gray-50 dark:bg-slate-900/50 border dark:border-slate-800 rounded-xl p-4 shadow-xs"
        >
            <div class="flex items-center space-x-3">
                <div class="p-2 bg-brand text-white rounded-xl shadow-sm">
                    <IconUsers size="20" />
                </div>
                <div>
                    <h1
                        class="text-base font-semibold tracking-tight dark:text-slate-200"
                    >
                        {{ $t("Users") }}
                    </h1>
                    <p class="text-xs text-slate-400 font-medium">
                        {{ $t("Manage user accounts, roles, and permissions") }}
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
                :route-prefix="routePrefix"
                :items="items"
                :meta="metaItems"
                :selected-items="selectedItems"
                @update:selectedItems="selectedItems = $event"
                @delete="handleDelete"
                :sort-field="sortField"
                :sort-direction="sortDirection"
                @sort="handleSort"
            >
                <template #headers>
                    <th
                        class="py-2 text-center w-16 text-slate-500 dark:text-slate-400 font-semibold text-xs uppercase tracking-wider"
                    >
                        {{ $t("ava") }}
                    </th>
                    <th
                        class="p-2 text-left cursor-pointer select-none text-slate-500 dark:text-slate-400 font-semibold text-xs uppercase tracking-wider"
                        @click="handleSort('full_name')"
                    >
                        <div class="flex items-center space-x-1">
                            <span>{{ $t("User Info") }}</span>
                            <template v-if="sortField === 'full_name'">
                                <IconSortAscending
                                    v-if="sortDirection === 'asc'"
                                    size="14"
                                />
                                <IconSortDescending v-else size="14" />
                            </template>
                            <IconArrowsSort
                                v-else
                                size="14"
                                class="text-gray-300 dark:text-slate-600"
                            />
                        </div>
                    </th>
                    <th
                        class="p-2 text-left text-slate-500 dark:text-slate-400 font-semibold text-xs uppercase tracking-wider"
                    >
                        {{ $t("Role") }}
                    </th>
                    <th
                        class="p-2 text-left text-slate-500 dark:text-slate-400 font-semibold text-xs uppercase tracking-wider"
                    >
                        {{ $t("Contacts") }}
                    </th>
                </template>

                <template #item-data="{ item }">
                    <td class="p-2 text-center align-middle">
                        <div class="relative inline-flex">
                            <ImageDataView
                                :src="item?.avatar"
                                :configs="{ width: '32px', height: '32px' }"
                                class="rounded-full shadow-sm object-cover"
                            />
                        </div>
                    </td>

                    <td class="p-2 align-middle">
                        <div class="flex flex-col leading-tight">
                            <span
                                class="font-medium text-slate-900 dark:text-slate-100"
                            >
                                {{ item.full_name }}
                            </span>
                            <UserStatus
                                :user="{
                                    is_online: item.online,
                                    last_activity: item.last_activity_raw,
                                }"
                            />
                        </div>
                    </td>

                    <td class="p-2 align-middle">
                        <div
                            class="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-medium tracking-wide"
                            :class="getRoleClass(item.role)"
                        >
                            <IconShieldFilled
                                size="12"
                                class="opacity-80 text-orange-400 dark:text-orange-500"
                            />
                            <span>{{ item.role ? $t(item.role) : "—" }}</span>
                        </div>
                    </td>

                    <td class="p-2 align-middle">
                        <div class="flex flex-col text-xs space-y-0.5">
                            <span
                                class="text-slate-700 dark:text-slate-300 font-medium"
                            >
                                {{ formatPhone(item.phone) || "—" }}
                            </span>
                            <span
                                class="text-slate-400 dark:text-slate-500 italic text-[10px]"
                            >
                                {{ item.email }}
                            </span>
                        </div>
                    </td>
                </template>
            </DataTable>
        </section>
    </div>
</template>
