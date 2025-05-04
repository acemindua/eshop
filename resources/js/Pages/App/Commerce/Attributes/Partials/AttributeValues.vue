<template>
    <form @submit.prevent="addNewValue">
        <div class="flex flex-col">
            <LanguagesTabs v-model="selectedLocale" :errors="errors">
                <div class="mb-3">
                    <div class="flex space-x-2">
                        <InputLabel
                            :for="`${selectedLocale}[title]`"
                            :value="`Title (${selectedLocale})`"
                            class="flex leading-6 items-center"
                        />
                        <span class="text-red-500">*</span>
                    </div>
                    <div class="w-full sm:col-span-2">
                        <TextInput
                            :id="`${selectedLocale}[title]`"
                            type="text"
                            v-model="form[selectedLocale].title"
                            class="block w-full"
                            :placeholder="`Title (${selectedLocale})`"
                            :class="{
                                'border-red-500':
                                    errors[`${selectedLocale}.title`],
                            }"
                        />
                        <InputError
                            class="mt-2"
                            :message="errors[`${selectedLocale}.title`]"
                        />
                    </div>
                </div>
            </LanguagesTabs>

            <div class="p-4 w-full">
                <PrimaryButton
                    :class="{ 'opacity-25': form.processing }"
                    :disabled="form.processing"
                >
                    {{ $t("Store") }}
                </PrimaryButton>
            </div>
        </div>
    </form>

    <div>
        <table>
            <tr
                v-if="attributeValues.length > 0"
                v-for="value in attributeValues"
                :key="value.id"
            >
                <td>{{ value.id }}</td>
                <td>{{ value.title }}</td>
                <td>
                    <button @click="deleteValue(value.id)">delete</button>
                </td>
            </tr>
        </table>
    </div>
    <pre>
        {{}}
    </pre>
</template>

<script setup>
import { reactive, watch, ref, computed } from "vue";
import { usePage } from "@inertiajs/vue3";
import useAttributeValues from "@/Composables/useAttributeValues";

import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import TextInput from "@/Components/TextInput.vue";
import LanguagesTabs from "@/Shared/LanguagesTabs.vue";

const {
    createAttributeValue,
    fetchAttributeValues,
    deleteAttributeValue,
    attributeValues,
} = useAttributeValues();

const props = defineProps({
    errors: Object,
    id: { type: Number, required: true },
});

const selectedLocale = ref(usePage().props.lang.default);
const translatedAttributes = ["title", "description"];

const form = reactive({
    attribute_id: props.id,
    public: true,
    order: 1,
    ...Object.fromEntries(
        Object.keys(usePage().props.lang.locales).map((locale) => [
            locale,
            Object.fromEntries(translatedAttributes.map((attr) => [attr, ""])),
        ])
    ),
});
const id = computed(() => props.id);
watch(
    id,
    (newId) => {
        if (newId) {
            fetchAttributeValues(newId);
        }
    },
    { immediate: true }
);

const addNewValue = async () => {
    await createAttributeValue(form);
};

const deleteValue = async (idValue) => {
    await deleteAttributeValue(idValue);
};
</script>
