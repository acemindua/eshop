<template>
    <Layout>
        <!-- Header Buttons -->
        <section
            ref="headerButtonsRef"
            class="flex w-full items-center justify-between"
        >
            <div></div>
            <div class="inline-flex items-center space-x-2">
                <SecondaryButton
                    as="Link"
                    :href="route('admin.pages.index')"
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
                    <TabPanel>
                        <div class="border bg-white p-4 md:p-8 flex rounded-lg">
                            <div class="w-full md:w-1/4">
                                <h2 class="uppercase font-semibold">General</h2>
                                <span class="py-2 text-sm text-gray-600">
                                    Manage general info
                                </span>
                            </div>
                            <GeneralForm :form="form" :errors="errors" />
                        </div>
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
                </TabPanels>
            </TabGroup>
        </section>

        <!-- Debug (Only outside local) -->
        <section v-if="$page.props.app.env === 'local'">
            <VarDump :data="form" />
        </section>
    </Layout>
</template>

<script setup>
// Vue & Inertia Core
import { ref, watch, onMounted, onUnmounted, onBeforeMount } from "vue";
import { usePage, router } from "@inertiajs/vue3";
import useApiResourceService from "@/Composables/useApiResourceService";
import useTranslatableForm from "@/Composables/useTranslatableForm";

// UI Components
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import { IconCancel, IconDeviceFloppy } from "@tabler/icons-vue";
import Layout from "@/Shared/Themes/Layouts/CommerceLayout.vue";
import ButtonTabGroup from "@/Components/ButtonTabGroup.vue";
import PrimaryButton from "@/Shared/Themes/App/Components/Buttons/PrimaryButton.vue";
import SecondaryButton from "@/Shared/Themes/App/Components/Buttons/SecondaryButton.vue";
import VarDump from "@/Shared/VarDump.vue";

// Partials
import GeneralForm from "./Partials/GeneralForm.vue";
import DataForm from "./Partials/DataForm.vue";

// Props
const props = defineProps({
    data: Object,
    errors: Object,
});

// Tabs logic
const activeTab = ref(0);
const tabs = ref([
    { key: "general", label: "General" },
    { key: "data", label: "Data" },
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
const { loading, fetchData } = useApiResourceService();
const { form, initForm } = useTranslatableForm(translatedAttributes);

onBeforeMount(() => {
    initForm({
        order: 1,
        public: true,
    });
});
// Error-driven tab navigation
watch(
    () => props.errors,
    (errors) => {
        const keys = Object.keys(errors);
        if (
            keys.some((key) =>
                translatedAttributes.some((attr) => key.endsWith(attr))
            )
        ) {
            activeTab.value = 0;
        }
        if (keys.some((key) => ["order", "category_id"].includes(key))) {
            activeTab.value = 1;
        }
    },
    { immediate: true }
);

// Tab switch
function changeTab(index) {
    activeTab.value = index;
}
function submit() {
    router.post(route("admin.pages.store"), form, {
        forceFormData: true,
        preserveState: true,
    });
}
</script>
