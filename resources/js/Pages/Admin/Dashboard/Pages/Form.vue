<script setup>
import { ref, computed, onBeforeMount } from "vue";
import { router } from "@inertiajs/vue3";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/vue";

// Layout & Components
import DashboardAdminLayout from "@/Layouts/Admin/DashboardAdminLayout.vue";
import StickyActions from "@/Components/StickyActions.vue";
import ButtonTabGroup from "@/Components/UI/Buttons/Admin/ButtonTabGroup.vue";
import VarDump from "@/Shared/VarDump.vue";

// Partials
import GeneralForm from "./Partials/GeneralForm.vue";
import SeoForm from "./Partials/SeoForm.vue";
import DataForm from "./Partials/DataForm.vue";

// Composables
import useTranslatableForm from "@/Composables/useTranslatableForm";

const props = defineProps({
    data: { type: Object, default: () => ({}) },
    errors: { type: Object, default: () => ({}) },
});

const model = "pages";
const modelId = props.data?.page?.id || null;
const isEditing = ref(!!modelId);
const activeTab = ref(0);

const tabs = [
    {
        key: "general",
        label: "General",
        component: GeneralForm,
        fields: ["title", "description", "content"],
    },
    {
        key: "seo",
        label: "SEO",
        component: SeoForm,
        fields: ["slug", "meta_title", "meta_description", "meta_keywords"],
    },
    {
        key: "data",
        label: "Data",
        component: DataForm,
        fields: ["public", "order"], // Системні поля
    },
];

const { form, fillForm, initForm } = useTranslatableForm(
    tabs
        .flatMap((t) => t.fields)
        .filter((f) => !["public", "order"].includes(f)),
);

onBeforeMount(() => {
    if (isEditing.value) {
        fillForm(props.data?.page);
    } else initForm(props.data);
});

const hasTabErrors = (tab) => {
    const errorKeys = Object.keys(props.errors);
    if (errorKeys.length === 0) return false;

    return errorKeys.some((errorKey) => {
        return tab.fields.some((field) => {
            // Перевірка для звичайних полів (public) або перекладних (uk.title)
            return errorKey === field || errorKey.endsWith(`.${field}`);
        });
    });
};

const handleSave = () => {
    const url = isEditing.value
        ? route(`admin.${model}.update`, modelId)
        : route(`admin.${model}.store`);
    router.post(
        url,
        { ...form, _method: isEditing.value ? "PUT" : "POST" },
        {
            forceFormData: true,
            preserveState: true,
        },
    );
};

const actionButtons = computed(() => [
    {
        label: "cancel",
        action: () => router.visit(route(`admin.${model}.index`)),
        type: "secondary",
        icon: "IconCancel",
        loading: form.processing,
    },
    {
        label: "save",
        loadingLabel: "Saving...",
        action: handleSave,
        type: "primary",
        icon: "IconDeviceFloppy",
        loading: form.processing,
    },
]);

defineOptions({ layout: DashboardAdminLayout });
</script>

<template>
    <div class="flex flex-col">
        <StickyActions :buttons="actionButtons">
            <TabGroup
                :selectedIndex="activeTab"
                @change="(index) => (activeTab = index)"
            >
                <TabList
                    class="flex items-center w-full border-b border-gray-300"
                >
                    <Tab
                        v-for="tab in tabs"
                        :key="tab.key"
                        as="template"
                        v-slot="{ selected }"
                    >
                        <ButtonTabGroup :selected="selected">
                            <div class="flex items-center gap-2">
                                {{ $t(tab.label) }}
                                <!-- Індикатор помилок: червона крапка -->
                                <span
                                    v-if="hasTabErrors(tab)"
                                    class="w-2 h-2 bg-red-500 rounded-full animate-pulse"
                                />
                            </div>
                        </ButtonTabGroup>
                    </Tab>
                </TabList>

                <TabPanels class="mt-2">
                    <TabPanel v-for="tab in tabs" :key="tab.key">
                        <Transition name="slot-fade" mode="out-in" appear>
                            <component
                                :is="tab.component"
                                :form="form"
                                :errors="errors"
                                :data="data"
                                :is-editing="isEditing"
                                :fields="tab.fields"
                            />
                        </Transition>
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        </StickyActions>

        <div class="mt-4">
            <VarDump :data="form" />
        </div>
    </div>
</template>
