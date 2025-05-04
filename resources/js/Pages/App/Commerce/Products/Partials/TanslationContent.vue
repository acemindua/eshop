<template>
    <div class="mb-3">
        <div class="flex items-center space-x-1">
            <span class="text-red-500">*</span>
            <InputLabel
                :for="`${code}[title]`"
                :value="`Product Name (${code})`"
                class="flex leading-6 items-center font-semibold"
            />
        </div>

        <div class="w-full sm:col-span-3">
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
    <div class="mb-3" v-if="isEditing">
        <div class="flex items-center space-x-1">
            <span class="text-red-500">*</span>
            <InputLabel
                :for="`${code}[slug]`"
                :value="`Slug (${code})`"
                class="flex leading-6 items-center font-semibold"
            />
        </div>
        <div class="w-full sm:col-span-3">
            <TextInput
                :id="`${code}[slug]`"
                type="text"
                v-model="model.slug"
                class="block w-full"
                :placeholder="`slug (${code})`"
                :class="{ 'border-red-500': errors[`${code}.slug`] }"
            />

            <InputError class="mt-2" :message="errors[`${code}.slug`]" />
        </div>
    </div>
    <div class="mb-3">
        <InputLabel
            :for="`${code}[description]`"
            :value="`Description (${code})`"
            class="flex leading-6 items-center font-semibold"
        />
        <div class="w-full sm:col-span-3">
            <TextareaInput
                :id="`${code}[description]`"
                v-model="model.description"
                class="block w-full"
            />
            <InputError class="mt-2" :message="errors[`${code}.description`]" />
        </div>
    </div>
    <div class="mb-3">
        <InputLabel
            :for="`${code}[content]`"
            :value="`Content (${code})`"
            class="flex leading-6 items-center font-semibold"
        />
        <div class="w-full sm:col-span-3">
            <TextEditor v-model="model.content" />
            <InputError class="mt-2" :message="errors[`${code}.content`]" />
        </div>
    </div>
</template>

<script setup>
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import TextInput from "@/Components/TextInput.vue";
import TextEditor from "@/Components/TextEditor.vue";
import TextareaInput from "@/Components/TextareaInput.vue";

// Приймаємо `props` для `categories` та `errors`
const props = defineProps({
    errors: Object,
    code: {
        type: String,
    },
    isEditing: {
        type: Boolean,
        default: false, // Якщо не передано — вважається "створення"
    },
});

const model = defineModel({
    type: Object,
    required: true,
});
</script>
