<template>
    <DashboardLayout>
        <section class="flex w-full items-start justify-between">
            <div class="flex flex-col w-full max-w-sm space-y-2">
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

        <DataTable
            :items="items"
            :meta="meta"
            :selected-items="selectedItems"
            @update:selectedItems="selectedItems = $event"
            @delete="deleteValueItem"
        />

        <section v-if="$page.props.app.env === 'local'">
            <VarDump :data="selectedItems" />
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

const selectedItems = ref([]);

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

const deleteValueItem = (item) => {
    router.delete(route("admin.pages.destroy", item.id));
};

const importRequest = () => {
    // TODO: Implement import logic
    return false;
};
</script>
