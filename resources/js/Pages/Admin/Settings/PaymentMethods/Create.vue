<template>
    <Head :title="$t('Create Payment Method')" />

    <div class="flex flex-col space-y-2">
        <!-- Action Buttons -->
        <section class="flex items-center justify-between pt-4">
            <span></span>
            <ButtonsGroup :buttons="actionButtons" />
        </section>

        <!-- Tabs Section -->
        <section>
            <TabGroup :selectedIndex="activeTab" @change="changeTab">
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
                            {{ $t(tab.label) }}
                        </ButtonTabGroup>
                    </Tab>
                </TabList>

                <TabPanels class="mt-2">
                    <Transition name="slot-fade" mode="out-in" appear>
                        <TabPanel>
                            <GeneralForm
                                :form="form"
                                :errors="errors"
                                :is-editing="isEditing"
                            />
                        </TabPanel>
                    </Transition>

                    <Transition name="slot-fade" mode="out-in" appear>
                        <TabPanel>
                            <DataForm
                                :form="form"
                                :data="data"
                                :errors="errors"
                                :is-editing="isEditing"
                            />
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
    data: {
        type: Object,
        default: () => ({}), // Повертаємо порожній об'єкт замість undefined
    },
    errors: Object,
});

const activeTab = ref(0);
const isEditing = ref(false);
const loading = ref(false);

const tabs = ref([
    { key: "general", label: "General Content" },
    { key: "data", label: "Technical Data" },
]);
// Initialize translated form attributes
const translatedAttributes = ["title", "description", "payment_details"];

// Form initialization and handling
const { form, initForm } = useTranslatableForm(translatedAttributes);

// Handle tab changes
function changeTab(index) {
    activeTab.value = index;
}

onBeforeMount(() => {
    // 1. Ініціалізуємо перекладні поля
    initForm(props.data);

    // 2. Додаємо технічні поля, яких немає в об'єкті за замовчуванням
    // Це гарантує, що Vue побачить ці ключі і не видасть undefined
    const defaultTechnicalFields = {
        code: "",
        driver: "manual",
        sort_order: 0,
        is_active: 1,
        commission_percent: 0,
        commission_fixed: 0,
    };

    // Мержимо технічні поля в об'єкт форми
    Object.assign(form, { ...defaultTechnicalFields, ...props.data });
});

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
