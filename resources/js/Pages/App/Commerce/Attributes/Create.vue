<template>
    <Layout>
        <section>
            <form @submit.prevent="submit">
                <LanguagesTabs v-model="selectedLocale" :errors="errors">
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
                        <InputError class="mt-2" :message="errors[`order`]" />
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
                        <InputError class="mt-2" :message="errors[`public`]" />
                    </div>
                </div>
                <div class="p-4">
                    <PrimaryButton
                        class=""
                        :class="{ 'opacity-25': form.processing }"
                        :disabled="form.processing"
                    >
                        {{ $t("Store") }}
                    </PrimaryButton>
                </div>
            </form>
        </section>
        <section v-if="$page.props.app.env === 'local'">
            <VarDump :data="data" />
        </section>
    </Layout>
</template>

<script setup>
import { ref, reactive, onBeforeMount } from "vue";
import { router, usePage } from "@inertiajs/vue3";
import Layout from "@/Layouts/AppLayout.vue";
import LanguagesTabs from "@/Shared/LanguagesTabs.vue";
import VarDump from "@/Shared/VarDump.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import InputLabel from "@/Components/InputLabel.vue";
import TextInput from "@/Components/TextInput.vue";
import InputError from "@/Components/InputError.vue";
import StoreAttributesForm from "./Partials/StoreAttributesForm.vue";
import CheckBoxSwitcher from "@/Components/CheckBoxSwitcher.vue";

const props = defineProps({
    data: { type: Object },
    errors: { type: Object },
});

const selectedLocale = ref(usePage().props.lang.default);
const form = reactive({
    order: 1,
    public: false,
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
});

// Функція для надсилання форми
const submit = () => {
    router.post(route("admin.attributes.store"), form, {
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
