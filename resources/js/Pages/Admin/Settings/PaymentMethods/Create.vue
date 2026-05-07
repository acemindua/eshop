<template>
    <Head :title="$t('Create Payment Method')" />

    <div class="flex flex-col space-y-2">
        <section class="flex items-center justify-between pt-4">
            <h1
                class="text-lg font-bold uppercase tracking-tight text-slate-700"
            >
                {{ $t("New Payment Method") }}
            </h1>
            <ButtonsGroup :buttons="actionButtons" />
        </section>

        <section>
            <TabGroup :selectedIndex="activeTab" @change="changeTab">
                <TabList
                    class="flex items-center w-full border-b border-gray-300 bg-white dark:bg-slate-900"
                >
                    <Tab
                        v-for="tab in tabs"
                        :key="tab.key"
                        as="template"
                        v-slot="{ selected }"
                    >
                        <ButtonTabGroup :selected="selected">
                            {{ $t(tab.label) }}
                        </ButtonTabGroup>
                    </Tab>
                </TabList>

                <TabPanels class="mt-2">
                    <Transition name="slot-fade" mode="out-in" appear>
                        <TabPanel>
                            <div class="bg-white dark:bg-slate-900 border p-6">
                                <GeneralForm
                                    :form="form"
                                    :errors="errors"
                                    :is-editing="isEditing"
                                />
                            </div>
                        </TabPanel>
                    </Transition>

                    <Transition name="slot-fade" mode="out-in" appear>
                        <TabPanel>
                            <div class="bg-white dark:bg-slate-900 border p-6">
                                <DataForm
                                    :form="form"
                                    :data="data"
                                    :errors="errors"
                                    :is-editing="isEditing"
                                />
                            </div>
                        </TabPanel>
                    </Transition>
                </TabPanels>
            </TabGroup>
        </section>

        <section v-if="$page.props.app.mode === 'local'">
            <VarDump :data="{ form, data }" />
        </section>
    </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { router, Head } from "@inertiajs/vue3";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/vue";

// Ace Admin Components
import Layout from "@/Layouts/Admin/SettingsAdminLayout.vue";
import ButtonsGroup from "@/Components/UI/Buttons/Admin/ButtonsGroup.vue";
import ButtonTabGroup from "@/Components/UI/Buttons/Admin/ButtonTabGroup.vue";
import VarDump from "@/Shared/VarDump.vue";

// Partials
import GeneralForm from "./Partials/GeneralForm.vue";
import DataForm from "./Partials/DataForm.vue";

// Composables
import useTranslatableForm from "@/Composables/useTranslatableForm";

defineOptions({
    layout: Layout,
});

const props = defineProps({
    data: Object,
    errors: Object,
});

const activeTab = ref(0);
const isEditing = ref(false);
const loading = ref(false);

const tabs = ref([
    { key: "general", label: "General Content" },
    { key: "data", label: "Technical Data" },
]);

// Атрибути, що потребують перекладу (UA/EN)
const translatedAttributes = ["title", "description", "instructions"];

const { form, initForm } = useTranslatableForm(translatedAttributes);

// Додаємо технічні поля, яких немає в перекладах
onBeforeMount(() => {
    initForm({
        code: "",
        icon: "IconCreditCard",
        commission_fixed: 0,
        commission_percent: 0,
        is_active: true,
        sort_order: 0,
        ...props.data,
    });
});

function changeTab(index) {
    activeTab.value = index;
}

const handleCancel = () => {
    router.visit(route("admin.settings.payment-methods.index"));
};

const handleSave = () => {
    router.post(route("admin.settings.payment-methods.store"), form, {
        preserveState: true,
        onStart: () => (loading.value = true),
        onFinish: () => (loading.value = false),
    });
};

const actionButtons = [
    {
        label: "cancel",
        action: handleCancel,
        type: "secondary",
        icon: "IconCancel",
    },
    {
        label: "save",
        loadingLabel: "Saving...",
        action: handleSave,
        type: "primary",
        icon: "IconDeviceFloppy",
    },
];
</script>
