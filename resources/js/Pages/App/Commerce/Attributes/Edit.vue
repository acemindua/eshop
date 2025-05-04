<template>
    <Layout>
        <Head :title="$t('Edit')" />
        <h1 class="font-semibold border-b p-4">{{ $t("Edit") }}</h1>

        <section class="flex gap-2">
            <div class="border bg-white rounded my-4 w-full">
                <div class="p-2">
                    <form @submit.prevent="submit">
                        <LanguagesTabs
                            v-model="selectedLocale"
                            :errors="errors"
                        >
                            <StoreAttributesForm
                                :code="selectedLocale"
                                v-model="form[selectedLocale]"
                                :errors="errors"
                            />
                        </LanguagesTabs>

                        <div class="px-4">
                            <InputLabel
                                for="order"
                                :value="`Order`"
                                class="flex leading-6 items-center"
                            />
                            <div>
                                <TextInput
                                    type="number"
                                    v-model="form.order"
                                    class="block w-full text-end pr-4"
                                />
                                <InputError
                                    class="mt-2"
                                    :message="errors[`order`]"
                                />
                            </div>
                        </div>
                        <div class="px-4">
                            <InputLabel
                                for="public"
                                :value="$t('Status')"
                                class="flex leading-6 items-center"
                            />
                            <div>
                                <CheckBoxSwitcher v-model="form.public" />
                                <InputError
                                    class="mt-2"
                                    :message="errors[`public`]"
                                />
                            </div>
                        </div>
                        <div class="p-4">
                            <PrimaryButton
                                class=""
                                :class="{ 'opacity-25': form.processing }"
                                :disabled="form.processing"
                            >
                                {{ $t("Save") }}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
            <div class="w-1/2 border bg-white rounded my-4">
                <AttributeValues :id="data.item.id" :errors="errors" />
            </div>
        </section>

        <section v-if="$page.props.app.env === 'local'">
            <VarDump :data="data" />
        </section>
    </Layout>
</template>

<script setup>
import Layout from "@/Layouts/AppLayout.vue";
import LanguagesTabs from "@/Shared/LanguagesTabs.vue";
import { router, usePage } from "@inertiajs/vue3";
import { ref } from "vue";
import StoreAttributesForm from "./Partials/StoreAttributesForm.vue";
import { reactive, onBeforeMount } from "vue";
import VarDump from "@/Shared/VarDump.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import InputLabel from "@/Components/InputLabel.vue";
import TextInput from "@/Components/TextInput.vue";
import InputError from "@/Components/InputError.vue";
import CheckBoxSwitcher from "@/Components/CheckBoxSwitcher.vue";
import AttributeValues from "./Partials/AttributeValues.vue";

const props = defineProps({
    data: { type: Object },
    errors: { type: Object },
});

const selectedLocale = ref(usePage().props.lang.default);
const form = reactive({
    _method: "put",
    order: props.data.item.order,
    public: props.data.item.public ? true : false,
    type: "text",
});

const translatedAttributes = ["title", "description"];
onBeforeMount(() => {
    // translatedAttributes
    for (let [code] of Object.entries(usePage().props.lang.locales)) {
        Object.assign(form, { [code]: {} });
        for (let [k, label] of Object.entries(translatedAttributes)) {
            Object.assign(form[code], {
                [label]: "",
            });
        }
    }

    // translatedAttributes varibals
    for (let [key, ObjTranslations] of Object.entries(
        props.data.item.translations
    )) {
        for (let [index, val] of Object.entries(ObjTranslations)) {
            for (let [code] of Object.entries(usePage().props.lang.locales)) {
                if (code == ObjTranslations.locale) {
                    Object.assign(form[code], {
                        [index]: val ?? "",
                    });
                }
            }
        }
    }
});

// Функція для надсилання форми
const submit = () => {
    router.post(route("admin.attributes.update", props.data.item.id), form, {
        forceFormData: true,
        preserveState: true,
        onStart: () => {
            // Дії перед початком відправки форми
        },
        onSuccess: () => {
            // Дії при успішній відправці
            setTimeout(() => {}, 3000);
        },
        onFinish: () => {
            // Дії після завершення відправки
        },
    });
};
</script>
