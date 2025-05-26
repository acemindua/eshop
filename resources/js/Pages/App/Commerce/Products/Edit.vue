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
                        <div class="border bg-white p-4 md:p-8 flex rounded-lg">
                            <div class="w-full md:w-1/4">
                                <h2 class="uppercase font-semibold">General</h2>
                                <span class="py-2 text-sm text-gray-600"
                                    >Manage general info</span
                                >
                            </div>
                            <GeneralForm
                                :form="form"
                                :errors="errors"
                                :is-editing="true"
                            />
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <VariantList
                            :product-id="data.item.id"
                            :errors="errors"
                        />
                    </TabPanel>
                    <TabPanel>
                        <div class="border bg-white p-4 md:p-8 flex rounded-lg">
                            <div class="w-full md:w-1/4">
                                <h2 class="uppercase font-semibold">Data</h2>
                                <span class="py-2 text-sm text-gray-600"
                                    >General product settings</span
                                >
                            </div>
                            <DataForm
                                :form="form"
                                :errors="errors"
                                :data="data"
                            />
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <ImagesForm :data="data.item" :errors="errors" />
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
import { ref, reactive, onBeforeMount, watch } from "vue";
import { usePage, router } from "@inertiajs/vue3";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import { IconCancel, IconDeviceFloppy } from "@tabler/icons-vue";
import Layout from "@/Shared/Themes/Layouts/CommerceLayout.vue";
import GeneralForm from "./Partials/GeneralForm.vue";
import DataForm from "./Partials/DataForm.vue";
import ImagesForm from "./Partials/ImagesForm.vue";
import ButtonTabGroup from "@/Components/ButtonTabGroup.vue";
import PrimaryButton from "@/Shared/Themes/App/Components/Buttons/PrimaryButton.vue";
import SecondaryButton from "@/Shared/Themes/App/Components/Buttons/SecondaryButton.vue";
import VarDump from "@/Shared/VarDump.vue";
import VariantList from "./Partials/Variant/VariantList.vue";

// Пропси
const props = defineProps({
    data: { type: Object },
    errors: { type: Object },
});

// Вкладки
const activeTab = ref(0);
const tabs = ref([
    { key: "general", label: "General" },
    { key: "variants", label: "Variants" },
    { key: "data", label: "Data" },
    { key: "images", label: "Images" },
]);

// Ініціалізація форми
const page = usePage();
const translatedAttributes = ["title", "slug", "description", "content"];

const form = reactive({
    _method: "put",
    manufacturer_id: props.data.item.manufacturer_id || null,
    order: props.data.item.order || 1,
    country_id: props.data.item.country_id || null,
    category_id: props.data.item.category_id || null,
    public: !!props.data.item.public,
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

    if (props.data.item.translations) {
        for (const trans of props.data.item.translations) {
            if (!form[trans.locale]) continue;
            for (const attr of translatedAttributes) {
                form[trans.locale][attr] = trans[attr] ?? "";
            }
        }
    }
});

// Відправка форми
const submit = () => {
    router.post(route("admin.products.update", props.data.item.id), form, {
        _method: "put",
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
