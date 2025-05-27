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
                            :is-editing="true"
                        />
                    </TabPanel>

                    <TabPanel>
                        <DataForm :form="form" :errors="errors" :data="data" />
                    </TabPanel>
                    <TabPanel>
                        <ImagesForm :data="data.item" :errors="errors" />
                    </TabPanel>
                    <TabPanel>
                        <VariantForm
                            :product-id="data.item.id"
                            :errors="errors"
                        />
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

        <!-- VarDump для локального середовища -->
        <section v-if="$page.props.app.env === 'local'">
            <VarDump :data="data" />
        </section>
    </Layout>
</template>

<script setup>
import { ref, onBeforeMount, watch } from "vue";
import { router } from "@inertiajs/vue3";
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
import useTranslatableForm from "@/Composables/useTranslatableForm";
import SeoForm from "@/Components/SEO/SeoForm.vue";
import VariantForm from "./Partials/VariantForm.vue";

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
    { key: "images", label: "Images" },
    { key: "variants", label: "Variants" },
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

function submit() {
    loading.value = true;
    form._method = "PUT";
    router.post(route("admin.products.update", props.data.item.id), form, {
        forceFormData: true,
        preserveState: true,
        onFinish: () => (loading.value = false),
    });
}
const tabErrors = ref([false, false, false, false, false]);
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
            [
                "sku",
                "price",
                "quantity",
                "order",
                "public",
                "manufacturer_id",
                "country_id",
                "category_id",
            ].includes(key)
        );
        tabErrors.value[2] = false; // для майбутньої валідації

        tabErrors.value[3] = keys.some((key) => key.startsWith("variants"));

        tabErrors.value[4] = keys.some((key) => ["slug"].includes(key));

        // Автоматичне перемикання на першу вкладку з помилкою
        const firstErrorTabIndex = tabErrors.value.findIndex(Boolean);
        if (firstErrorTabIndex !== -1) {
            activeTab.value = firstErrorTabIndex;
        }
    },
    { immediate: true }
);

function changeTab(index) {
    activeTab.value = index;
}

const loading = ref(false);
</script>
