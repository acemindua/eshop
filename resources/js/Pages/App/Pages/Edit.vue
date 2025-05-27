<template>
    <DashboardLayout>
        <!-- Header Buttons -->
        <section class="flex w-full items-center justify-between">
            <div></div>
            <div class="inline-flex items-center space-x-2">
                <SecondaryButton
                    as="Link"
                    :href="route('admin.attributes.index')"
                    :disabled="loading"
                    :class="{ 'opacity-50': loading }"
                >
                    <template #icon><IconCancel :stroke="2" /></template>
                    <span>{{ $t("Cancel") }}</span>
                </SecondaryButton>
                <PrimaryButton
                    @click="submit"
                    :disabled="loading"
                    :class="{ 'opacity-50': loading }"
                >
                    <template #icon><IconDeviceFloppy :stroke="2" /></template>
                    <span>{{ $t("Save") }}</span>
                </PrimaryButton>
            </div>
        </section>

        <!-- Tabs -->
        <section>
            <TabGroup :selectedIndex="activeTab" @change="changeTab">
                <TabList
                    class="flex items-center w-full bg-white border rounded-lg mt-4 p-2"
                >
                    <Tab
                        v-for="(tab, index) in tabs"
                        :key="tab.key"
                        as="template"
                        v-slot="{ selected }"
                    >
                        <ButtonTabGroup
                            :selected="selected"
                            :has-error="tabErrors[index]"
                        >
                            {{ $t(tab.label) }}
                        </ButtonTabGroup>
                    </Tab>
                </TabList>

                <TabPanels class="mt-2">
                    <TabPanel>
                        <GeneralForm
                            :form="form"
                            :errors="errors"
                            :isEditing="true"
                        />
                    </TabPanel>
                    <TabPanel>
                        <div class="border bg-white p-4 md:p-8 flex rounded-lg">
                            <div class="w-full md:w-1/4">
                                <h2 class="uppercase font-semibold">Data</h2>
                                <span class="py-2 text-sm text-gray-600">
                                    General settings
                                </span>
                            </div>
                            <DataForm
                                :form="form"
                                :errors="errors"
                                :data="data"
                            />
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div class="border bg-white p-4 md:p-8 flex rounded-lg">
                            <div class="w-full md:w-1/4">
                                <h2 class="uppercase font-semibold">SEO</h2>
                                <span class="py-2 text-sm text-gray-600">
                                    SEO settings
                                </span>
                            </div>
                            <SeoForm
                                :form="form"
                                :errors="errors"
                                :isEditing="true"
                            />
                        </div>
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        </section>

        <!-- Debug (Only outside local) -->
        <section v-if="$page.props.app.env === 'local'">
            <VarDump :data="form" />
        </section>
    </DashboardLayout>
</template>

<script setup>
// Vue & Inertia Core
import { ref, watch, onBeforeMount } from "vue";
import { router } from "@inertiajs/vue3";
import useTranslatableForm from "@/Composables/useTranslatableForm";

// UI Components
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import { IconCancel, IconDeviceFloppy } from "@tabler/icons-vue";
// Layouts & Components
import DashboardLayout from "@/Shared/Themes/Layouts/DashboardLayout.vue";
import ButtonTabGroup from "@/Components/ButtonTabGroup.vue";
import PrimaryButton from "@/Shared/Themes/App/Components/Buttons/PrimaryButton.vue";
import SecondaryButton from "@/Shared/Themes/App/Components/Buttons/SecondaryButton.vue";
import VarDump from "@/Shared/VarDump.vue";

// Partials
import GeneralForm from "./Partials/GeneralForm.vue";
import DataForm from "./Partials/DataForm.vue";
import SeoForm from "@/Components/SEO/SeoForm.vue";

// Props
const props = defineProps({
    data: Object,
    errors: Object,
});

const loading = ref(false);
// Tabs logic
const activeTab = ref(0);
const tabs = ref([
    { key: "general", label: "General" },
    { key: "data", label: "Data" },
    { key: "seo", label: "SEO" },
]);

const translatedAttributes = [
    "title",
    "description",
    "content",
    "meta_title",
    "meta_description",
    "meta_keywords",
];

// Form init
const { form, fillForm } = useTranslatableForm(translatedAttributes);

onBeforeMount(() => {
    fillForm(props.data.item);
});

const tabErrors = ref([false, false, false]);
// Логіка перемикання вкладок на основі помилок
watch(
    () => props.errors,
    (errors) => {
        const keys = Object.keys(errors);

        // Оновлення tabErrors
        tabErrors.value[0] = keys.some((key) =>
            translatedAttributes.some((attr) => key.endsWith(attr))
        );

        tabErrors.value[1] = keys.some((key) =>
            ["order", "public"].includes(key)
        );

        tabErrors.value[2] = keys.some((key) => ["slug"].includes(key));

        // Автоматичне перемикання на першу вкладку з помилкою
        const firstErrorTabIndex = tabErrors.value.findIndex(Boolean);
        if (firstErrorTabIndex !== -1) {
            activeTab.value = firstErrorTabIndex;
        }
    },
    { immediate: true }
);

// Tab switch
function changeTab(index) {
    activeTab.value = index;
}
function submit() {
    loading.value = true;
    form._method = "PUT";
    router.post(route("admin.pages.update", props.data.item.id), form, {
        forceFormData: true,
        preserveState: true,
        onFinish: () => (loading.value = false),
    });
}
</script>
