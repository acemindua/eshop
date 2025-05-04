<template>
    <section>
        <div class="mb-3">
            <div class="flex space-x-2">
                <InputLabel
                    :for="`${code}[title]`"
                    :value="`Title (${code})`"
                    class="flex leading-6 items-center"
                />
                <span class="text-red-500">*</span>
            </div>
            <div class="w-full sm:col-span-2">
                <TextInput
                    :id="`${code}[title]`"
                    type="text"
                    v-model="model.title"
                    class="block w-full"
                    :placeholder="`Title (${code})`"
                    :class="{ 'border-red-500': errors[`${code}.title`] }"
                />

                <InputError class="mt-2" :message="errors[`${code}.title`]" />
            </div>
        </div>
        <div class="mb-3">
            <InputLabel
                :for="`${code}[description]`"
                :value="`Description (${code})`"
                class="flex leading-6 items-center"
            />
            <div>
                <TextareaInput
                    :id="`${code}[description]`"
                    v-model="model.description"
                    class="block w-full"
                />
                <InputError
                    class="mt-2"
                    :message="errors[`${code}.description`]"
                />
            </div>
        </div>
    </section>
</template>

<script setup>
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import TextareaInput from "@/Components/TextareaInput.vue";
import TextInput from "@/Components/TextInput.vue";

// Приймаємо `props` для `categories` та `errors`
const props = defineProps({
    errors: Object,
    code: {
        type: String,
    },
});

const model = defineModel({
    type: Object,
    required: true,
});
</script>
