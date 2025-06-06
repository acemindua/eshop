<!-- app/Commerce/Categories/Index.vue -->
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
            route("admin.posts.index"),
            { search: value },
            { preserveState: true, replace: true }
        );
    }, 500)
);

const importRequest = () => {
    // TODO: Implement import logic
    return false;
};

const deleteValueItem = (item) => {
    router.delete(route("admin.posts.destroy", item.id));
};
</script>

<template>
    <DashboardLayout>
        <section class="flex w-full items-center justify-between">
            <div class="w-full max-w-sm">
                <FilterInput v-model="searchText" class="w-full" />
            </div>

            <div class="inline-flex items-center space-x-2">
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
                    :href="route('admin.posts.create')"
                    :disabled="loading"
                    :class="{ 'opacity-50': loading }"
                >
                    <template #icon><IconPlus :stroke="2" /></template>
                    <span>{{ $t("Add") }}</span>
                </PrimaryButton>
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
            <VarDump :data="data" />
        </section>
    </DashboardLayout>
</template>
