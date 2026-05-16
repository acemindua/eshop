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
import ImageDataView from "@/Components/UI/ImageDataView.vue";
import UserStatus from "@/Components/UserStatus.vue";
import useFormatter from "@/Composables/useFormatter";

/**
 * Component Props
 */
const props = defineProps({
    data: { type: Object },
    filters: { type: Object },
});

// --- State ---
const searchText = ref(props.filters?.search || "");
const onlineFilter = ref(props.filters?.online || ""); // Новий стан для фільтра
const selectedItems = ref([]);
const { formatPhone } = useFormatter();

// --- Methods ---
const handleImport = () => console.log("Importing...");
const handleCreate = () => router.visit(route("admin.users.create"));
const handleDelete = (item) =>
    router.delete(route("admin.users.destroy", item.id));

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
    [searchText, onlineFilter],
    debounce(([searchVal, onlineVal]) => {
        router.get(
            route("admin.users.index"),
            {
                search: searchVal,
                online: onlineVal,
            },
            {
                preserveState: true,
                replace: true,
                preserveScroll: true,
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

                <!-- Online Filter Select -->
                <select
                    v-model="onlineFilter"
                    class="h-10 px-3 py-2 text-xs border rounded-md bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 focus:ring-brand focus:border-brand"
                >
                    <option value="">{{ $t("All Statuses") }}</option>
                    <option value="1">{{ $t("Online") }}</option>
                    <option value="0">{{ $t("Offline") }}</option>
                </select>
            </div>

            <ButtonsGroup :buttons="actionButtons" />
        </section>

        <!-- Main Data Section -->
        <section>
            <DataTable
                :items="props.data?.users?.data || []"
                :meta="props.data?.users?.meta"
                model="users"
                :selected-items="selectedItems"
                @update:selectedItems="selectedItems = $event"
                @delete="handleDelete"
            >
                <template #headers>
                    <th class="py-2 text-center w-16">{{ $t("ava") }}</th>
                    <th class="p-2 text-left">{{ $t("User Info") }}</th>
                    <th class="p-2 text-left">{{ $t("Contacts") }}</th>
                    <th class="p-2 text-center">{{ $t("Loyalty") }}</th>
                </template>

                <template #item-data="{ item }">
                    <td class="p-2 text-center">
                        <div class="relative inline-flex">
                            <ImageDataView
                                :src="item?.avatar"
                                :configs="{ width: '32px', height: '32px' }"
                                class="rounded-full shadow-sm"
                            />
                        </div>
                    </td>

                    <td class="p-2">
                        <div class="flex flex-col leading-tight">
                            <span class="dark:text-slate-100">
                                {{ item.full_name }}
                            </span>
                            <UserStatus
                                :user="{
                                    is_online: item.online,
                                    last_activity: item.last_activity_raw,
                                }"
                                size="xs"
                            />
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
                        <span
                            :class="
                                item.bonus_balance > 0
                                    ? 'text-brand font-bold'
                                    : 'text-slate-400'
                            "
                        >
                            {{ item.bonus_balance }} ₴
                        </span>
                    </td>
                </template>
            </DataTable>
        </section>

        <section>
            <VarDump :data="data" />
        </section>
    </div>
</template>
