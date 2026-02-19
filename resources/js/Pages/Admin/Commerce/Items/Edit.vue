<template>
    <div class="flex flex-col space-y-2">
        <!-- Action Buttons -->
        <section
            ref="scrollAnchor"
            class="flex items-center justify-between pt-4"
        >
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
                            <SEOForm
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
                    <Transition name="slot-fade" mode="out-in" appear>
                        <TabPanel>
                            <MediaForm
                                :form="form"
                                :model-id="form.id"
                                model-type="Item"
                                collection="images"
                                :errors="errors"
                                :is-editing="isEditing"
                            />
                        </TabPanel>
                    </Transition>
                </TabPanels>
            </TabGroup>
        </section>

        <section v-if="$page.props.app.mode === 'local'">
            <VarDump :data="data" />
        </section>

        <transition
            enter-active-class="transition ease-out duration-300"
            enter-from-class="transform translate-y-20 opacity-0"
            enter-to-class="transform translate-y-0 opacity-100"
            leave-active-class="transition ease-in duration-200"
            leave-from-class="transform translate-y-0 opacity-100"
            leave-to-class="transform translate-y-20 opacity-0"
        >
            <div
                v-if="isScrolled"
                class="fixed bottom-6 right-[30%] md:rigth-[50%]"
            >
                <ButtonsGroup :buttons="actionButtons" />
            </div>
        </transition>
    </div>
</template>

<script setup>
import ButtonsGroup from "@/Components/UI/Buttons/Admin/ButtonsGroup.vue";
import ButtonTabGroup from "@/Components/UI/Buttons/Admin/ButtonTabGroup.vue";
import useTranslatableForm from "@/Composables/useTranslatableForm";
import Layout from "@/Layouts/Admin/CommerceAdminLayout.vue";
import VarDump from "@/Shared/VarDump.vue";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/vue";
import DataForm from "./Partials/DataForm.vue";
import SEOForm from "./Partials/SEOForm.vue";
import GeneralForm from "./Partials/GeneralForm.vue";
import { onMounted, onUnmounted, onBeforeMount, ref } from "vue";
import { router } from "@inertiajs/vue3";
import MediaForm from "./Partials/MediaForm.vue";

defineOptions({
    layout: Layout,
});

// Define props passed to the component
const props = defineProps({
    data: Object,
    errors: Object,
});

const isScrolled = ref(false);
const scrollAnchor = ref(null); // посилання на div з шаблону
let observer = null;

onMounted(() => {
    // Важливо: шукаємо контейнер, який має overflow-y-auto
    const scrollContainer = document.querySelector(
        ".flex-grow.overflow-y-auto",
    );

    observer = new IntersectionObserver(
        ([entry]) => {
            // entry.isIntersecting буде true, коли якір В СЕРЕДИНІ зони
            // Ми хочемо, щоб isScrolled став true, коли якір ВИЙШОВ з зони
            isScrolled.value = !entry.isIntersecting;
        },
        {
            root: scrollContainer,
            // Створюємо "відступ" знизу від верхньої межі.
            // -100px означає, що подія спрацює, коли ви прокрутите 100px вниз.
            rootMargin: "0px 0px 0px 0px",
            threshold: 0,
        },
    );

    if (scrollAnchor.value) {
        observer.observe(scrollAnchor.value);
    }
});
onUnmounted(() => {
    if (observer) observer.disconnect();
});
// State variables for tab management, form, and scroll tracking
const activeTab = ref(0);
const tabs = ref([
    { key: "general", label: "General" },
    { key: "seo", label: "SEO" },
    { key: "data", label: "Data" },
    { key: "media", label: "Media" },
]);

const isEditing = ref(true);
const loading = ref(false);
const recentlySuccessful = ref(false);

// Initialize translated form attributes
const translatedAttributes = [
    "title",
    "slug",
    "description",
    "content",
    "meta_title",
    "meta_description",
    "meta_keywords",
];

// Form initialization and handling
const { form, fillForm } = useTranslatableForm(translatedAttributes);

// Handle tab changes
function changeTab(index) {
    activeTab.value = index;
}

// Form filling logic when page data is available
onBeforeMount(() => {
    if (props.data.item) {
        fillForm(props.data.item);
    }
});

const handleCancel = () => {
    router.visit(route("admin.items.index"));
};
const handleSave = () => {
    router.post(route("admin.items.update", props.data.item.id), form, {
        forceFormData: true,
        preserveState: true,
        onStart: () => (loading.value = true),
        onSuccess: () => {
            recentlySuccessful.value = true;
            setTimeout(() => (recentlySuccessful.value = false), 3000);
        },
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
