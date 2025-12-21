<template>
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
                                :data="data"
                                :form="form"
                                :errors="errors"
                                :is-editing="isEditing"
                            />
                        </TabPanel>
                    </Transition>
                    <Transition name="slot-fade" mode="out-in" appear>
                        <TabPanel>
                            <SEOForm
                                v-model="form"
                                :errors="errors"
                                :is-editing="isEditing"
                            />
                        </TabPanel>
                    </Transition>
                </TabPanels>
            </TabGroup>
        </section>

        <section v-if="$page.props.app.mode === 'local'">
            <VarDump :data="form" />
        </section>
    </div>
</template>
<script setup>
import ButtonsGroup from "@/Components/UI/Buttons/Admin/ButtonsGroup.vue";
import ButtonTabGroup from "@/Components/UI/Buttons/Admin/ButtonTabGroup.vue";

import Layout from "@/Layouts/Admin/CommerceAdminLayout.vue";
import VarDump from "@/Shared/VarDump.vue";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/vue";
import SEOForm from "./Partials/SEOForm.vue";
import GeneralForm from "./Partials/GeneralForm.vue";
import { ref, reactive } from "vue";
import { router } from "@inertiajs/vue3";

defineOptions({
    layout: Layout,
});

// Define props passed to the component
const props = defineProps({
    data: Object,
    errors: Object,
});

// State variables for tab management, form, and scroll tracking
const activeTab = ref(0);
const tabs = ref([
    { key: "general", label: "General" },
    { key: "seo", label: "SEO" },
]);

const isEditing = ref(false);
const loading = ref(false);
const recentlySuccessful = ref(false);
const manufacturer = ref(props.data.manufacturer || {});

const form = reactive({
    _method: "put",
    title: manufacturer.value.title,
    slug: manufacturer.value.slug,
    country: manufacturer.value.country,
    public: manufacturer.value.public || false,
    order: manufacturer.value.order || 1,
    image: null,
});

// Handle tab changes
function changeTab(index) {
    activeTab.value = index;
}

const handleCancel = () => {
    router.visit(route("admin.manufacturers.index"));
};
const handleSave = () => {
    router.post(
        route("admin.manufacturers.update", props.data.manufacturer.id),
        form,
        {
            forceFormData: true,
            preserveState: true,
            onStart: () => (loading.value = true),
            onSuccess: () => {
                recentlySuccessful.value = true;
                setTimeout(() => (recentlySuccessful.value = false), 3000);
            },
            onFinish: () => (loading.value = false),
        }
    );
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
