<template>
    <Layout>
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
                            <GeneralForm
                                :form="form"
                                :errors="errors"
                                :is-editing="true"
                            />
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div class="border bg-white p-4 md:p-8 flex rounded-lg">
                            <ValuesForm
                                :errors="errors"
                                :attribute-id="data.item.id"
                            />
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
        <section v-if="$page.props.app.env !== 'local'">
            <VarDump :data="data" />
        </section>
    </Layout>
</template>

<script setup>
// Vue & Inertia Core
import { ref, reactive, onBeforeMount, watch } from "vue";
import { usePage, router } from "@inertiajs/vue3";

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
import ValuesForm from "./Partials/ValuesForm.vue";

// Props
const props = defineProps({
    data: Object,
    errors: Object,
});

// Tabs logic
const activeTab = ref(0);
const tabs = ref([
    { key: "general", label: "General" },
    { key: "value", label: "Values" },
    { key: "data", label: "Data" },
]);

// Form init
const page = usePage();
const translatedAttributes = ["title", "slug", "description"];
const form = reactive({
    _method: "put",
    order: page.props.data.item.order,
    public: page.props.data.item.public,
    user_id: page.props.auth.user.id,
});

// Add i18n fields
onBeforeMount(() => {
    const locales = page.props.lang.locales;
    for (const code in locales) {
        form[code] = {};
        translatedAttributes.forEach((attr) => {
            form[code][attr] = "";
        });
    }

    if (props.data.item.translations) {
        for (const trans of props.data.item.translations) {
            if (!form[trans.locale]) continue;
            for (const attr of translatedAttributes) {
                form[trans.locale][attr] = trans[attr] ?? "";
            }
        }
    }
});
// Form submission
const loading = ref(false);
function submit() {
    loading.value = true;
    router.post(route("admin.attributes.update", props.data.item.id), form, {
        forceFormData: true,
        preserveState: true,
        onFinish: () => (loading.value = false),
    });
}

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
        if (keys.some((key) => ["order"].includes(key))) {
            activeTab.value = 1;
        }
    },
    { immediate: true }
);

// Tab switch
function changeTab(index) {
    activeTab.value = index;
}
</script>
