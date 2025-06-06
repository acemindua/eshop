<template>
    <Layout>
        <section class="flex w-full items-center justify-between">
            <div></div>
            <div class="inline-flex items-center space-x-2">
                <SecondaryButton
                    as="Link"
                    :href="route('admin.products.index')"
                    :class="{ 'opacity-50': loading }"
                    :disabled="loading"
                >
                    <template #icon><IconCancel stroke="{2}" /></template>
                    <span>{{ $t("Cancel") }}</span>
                </SecondaryButton>
                <PrimaryButton
                    @click="submit"
                    class=""
                    :class="{ 'opacity-50': loading }"
                    :disabled="loading"
                >
                    <template #icon><IconDeviceFloppy stroke="{2}" /></template>
                    <span>{{ $t("Save") }}</span>
                </PrimaryButton>
            </div>
        </section>

        <section>
            <!-- Вкладки -->
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
                        <GeneralForm :form="form" :errors="errors" />
                    </TabPanel>
                    <TabPanel>
                        <DataForm :form="form" :errors="errors" :data="data" />
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        </section>

        <!-- VarDump для локального середовища -->
        <section v-if="$page.props.app.env !== 'local'">
            <VarDump :data="data" />
        </section>
    </Layout>
</template>

<script setup>
// Core Vue & Inertia
import { ref, reactive, onBeforeMount, watch } from "vue";
import { usePage, router } from "@inertiajs/vue3";

// Third-party UI Libraries
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import { IconCancel, IconDeviceFloppy } from "@tabler/icons-vue";

// Layouts
import Layout from "@/Shared/Themes/Layouts/CommerceLayout.vue";

// Partials
import GeneralForm from "./Partials/GeneralForm.vue";
import DataForm from "./Partials/DataForm.vue";

// UI Components
import ButtonTabGroup from "@/Components/ButtonTabGroup.vue";
import PrimaryButton from "@/Shared/Themes/App/Components/Buttons/PrimaryButton.vue";
import SecondaryButton from "@/Shared/Themes/App/Components/Buttons/SecondaryButton.vue";

// Debug
import VarDump from "@/Shared/VarDump.vue";

// Пропси
const props = defineProps({
    data: { type: Object },
    errors: { type: Object },
});

// Вкладки
const activeTab = ref(0);
const tabs = ref([
    { key: "general", label: "General" },
    { key: "data", label: "Data" },
]);

// Ініціалізація форми
const page = usePage();
const translatedAttributes = ["title", "slug", "description", "content"];

const form = reactive({
    manufacturer_id: null,
    order: 1,
    country_id: null,
    category_id: null,
    public: false,
    user_id: page.props.auth.user.id,
});

// Додавання перекладів
onBeforeMount(() => {
    const locales = page.props.lang.locales;

    for (const [code] of Object.entries(locales)) {
        form[code] = {};
        translatedAttributes.forEach((attr) => {
            form[code][attr] = "";
        });
    }
});

// Відправка форми
const submit = () => {
    router.post(route("admin.products.store"), form, {
        forceFormData: true,
        preserveState: true,
    });
};

// Логіка перемикання вкладок на основі помилок
watch(
    () => props.errors,
    (errors) => {
        const keys = Object.keys(errors);

        // Якщо є помилки у перекладах — перейти на вкладку General
        if (
            keys.some((key) =>
                translatedAttributes.some((attr) => key.endsWith(attr))
            )
        ) {
            activeTab.value = 0;
        }

        // Якщо є помилки в основних полях — Data
        if (
            keys.some((key) =>
                [
                    "order",
                    "manufacturer_id",
                    "country_id",
                    "category_id",
                ].includes(key)
            )
        ) {
            activeTab.value = 1;
        }

        // Якщо в майбутньому буде валідація картинок — додати логіку для вкладки Images
    },
    { immediate: true }
);

function changeTab(index) {
    activeTab.value = index;
}

const loading = ref(false);
</script>
