<template>
    <DashboardLayout>
        <section class="flex w-full items-start justify-between">
            <div class="flex flex-col w-full max-w-sm space-y-2">
                <div class="inline-flex rounded-md shadow-xs" role="group">
                    <button
                        type="button"
                        class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                    >
                        Profile
                    </button>
                    <button
                        type="button"
                        class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                    >
                        Settings
                    </button>
                    <button
                        type="button"
                        class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                    >
                        Messages
                    </button>
                </div>
                <div class="w-full max-w-sm">
                    <FilterInput v-model="searchText" class="w-full" />
                </div>
            </div>

            <div class="flex flex-col w-full max-w-sm space-y-2">
                <div class="inline-flex items-center space-x-2 justify-end">
                    <SecondaryButton
                        @click="importRequest"
                        :disabled="loading"
                        :class="{ 'opacity-50': loading }"
                    >
                        <template #icon><IconCloudDown :stroke="2" /></template>
                        <span>Import</span>
                    </SecondaryButton>

                    <PrimaryButton
                        as="Link"
                        :href="route('admin.pages.create')"
                        :disabled="loading"
                        :class="{ 'opacity-50': loading }"
                    >
                        <template #icon><IconPlus :stroke="2" /></template>
                        <span>{{ $t("Add") }}</span>
                    </PrimaryButton>
                </div>
            </div>
        </section>

        <DataTable :items="items" :meta="meta" />

        <section v-if="$page.props.app.env === 'local'">
            <VarDump :data="data" />
        </section>
    </DashboardLayout>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { router } from "@inertiajs/vue3";
import debounce from "lodash.debounce";

// Tabler icons
import { IconCloudDown, IconPlus } from "@tabler/icons-vue";

// Layouts & Components
import DashboardLayout from "@/Shared/Themes/Layouts/DashboardLayout.vue";
import VarDump from "@/Shared/VarDump.vue";

// UI Components
import FilterInput from "@/Shared/Themes/App/Components/Inputs/FilterInput.vue";
import PrimaryButton from "@/Shared/Themes/App/Components/Buttons/PrimaryButton.vue";
import SecondaryButton from "@/Shared/Themes/App/Components/Buttons/SecondaryButton.vue";

// Table Component
import DataTable from "./Partials/DataTable.vue";

const props = defineProps({
    data: Object,
    filters: Object,
});

const items = computed(() => props.data.items.data || []);
const meta = computed(() => props.data.items.meta || []);

const searchText = ref(props.filters.search);
const loading = ref(false);

watch(
    searchText,
    debounce((value) => {
        router.get(
            route("admin.pages.index"),
            { search: value },
            { preserveState: true, replace: true }
        );
    }, 500)
);

const importRequest = () => {
    // TODO: Implement import logic
    return false;
};
</script>
