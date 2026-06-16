<script setup>
import { computed, ref, onBeforeMount } from "vue";
import { router } from "@inertiajs/vue3";
import useTranslatableForm from "@/Composables/useTranslatableForm";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/vue";
import DataForm from "../Partials/DataForm.vue";
import SeoForm from "../Partials/SEOForm.vue";
import GeneralForm from "../Partials/GeneralForm.vue";
import StickyActions from "@/Components/StickyActions.vue";
import ButtonTabGroup from "@/Components/UI/Buttons/Admin/ButtonTabGroup.vue";
import MediaForm from "../Partials/MediaForm.vue";

const props = defineProps({
    data: { type: Object, default: () => null },
    routePrefix: { type: String, required: true },
    isEditing: { type: Boolean, default: false },
    errors: { type: Object, default: () => ({}) },
});
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
    {
        key: "media",
        label: "Media",
        component: MediaForm,
        fields: [], // Системні поля
    },
];

const { form, fillForm, initForm } = useTranslatableForm(
    tabs
        .flatMap((t) => t.fields)
        .filter((f) => !["public", "order"].includes(f)),
);

onBeforeMount(() => {
    if (props.isEditing) {
        fillForm(props.data?.brand);
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
    const url = props.isEditing
        ? route(`${props.routePrefix}.update`, props.data?.brand?.id)
        : route(`${props.routePrefix}.store`);
    router.post(
        url,
        { ...form, _method: props.isEditing ? "PUT" : "POST" },
        {
            forceFormData: true,
            preserveState: true,
        },
    );
};

const actionButtons = computed(() => [
    {
        label: "cancel",
        action: () => router.visit(route(`${props.routePrefix}.index`)),
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
</script>

<template>
    <div class="flex flex-col space-y-4">
        <StickyActions
            :buttons="actionButtons"
            :routePrefix="props.routePrefix"
            :title="
                props.isEditing
                    ? (props.data?.brand?.title ?? $t('Brand details'))
                    : $t('New brand')
            "
            :description="
                props.isEditing
                    ? $t('Brand details and settings management')
                    : $t(
                          'Brand creation form with all necessary details and settings',
                      )
            "
        >
            <div class="border rounded-lg bg-gray-50 p-4">
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
            </div>
        </StickyActions>
    </div>
</template>
