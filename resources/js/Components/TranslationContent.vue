<template>
    <div
        class="md:flex gap-6 w-full border rounded-lg p-2 md:p-6 lg:p-12 bg-gray-50"
    >
        <div class="w-full md:w-1/5 pb-4">
            <h2 class="uppercase font-semibold">General</h2>
            <span class="py-2 text-sm text-gray-600">Manage general info</span>
        </div>

        <div class="flex md:w-3/4 w-full flex-col space-y-4 bg-gray-50">
            <div v-if="`title`" class="mb-3">
                <div class="flex items-center space-x-1">
                    <span class="text-red-500">*</span>
                    <InputLabel
                        :for="`${code}.title`"
                        :value="`Title (${code})`"
                        class="flex leading-6 items-center font-semibold"
                    />
                </div>

                <div class="w-full sm:col-span-3">
                    <TextInput
                        :id="`${code}.title`"
                        type="text"
                        v-model="model.title"
                        class="block w-full"
                        :placeholder="`Title (${code})`"
                        :class="{
                            'border-red-500': errors[`${code}.title`],
                        }"
                    />
                    <p class="mt-1 text-xs text-gray-500">
                        Enter the page title. This will appear in search engine
                        results.
                    </p>

                    <InputError
                        class="mt-2"
                        :message="errors[`${code}.title`]"
                    />
                </div>
            </div>
            <div v-if="`description`" class="mb-3">
                <InputLabel
                    :for="`${code}.description`"
                    :value="`Description (${code})`"
                    class="flex leading-6 items-center font-semibold"
                />
                <div class="w-full sm:col-span-3">
                    <TextareaInput
                        :id="`${code}.description`"
                        v-model="model.description"
                        class="block w-full"
                    />
                    <p class="mt-1 text-xs text-gray-500">
                        Provide a brief description of the page content for SEO
                        purposes.
                    </p>

                    <InputError
                        class="mt-2"
                        :message="errors[`${code}.description`]"
                    />
                </div>
            </div>
            <div v-if="`content`" class="mb-3">
                <InputLabel
                    :value="`Content (${code})`"
                    class="flex leading-6 items-center font-semibold"
                />
                <div class="w-full sm:col-span-3">
                    <TextEditor v-model="model.content" />
                    <p class="mt-1 text-xs text-gray-500">
                        Main content of the page, visible to users.
                    </p>
                    <InputError
                        class="mt-2"
                        :message="errors[`${code}.content`]"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import InputError from "./UI/InputError.vue";
import InputLabel from "./UI/InputLabel.vue";
import TextareaInput from "./UI/TextareaInput.vue";
import TextEditor from "./UI/TextEditor.vue";
import TextInput from "./UI/TextInput.vue";

const props = defineProps({
    code: {
        type: String,
        required: true,
    },
    errors: Object,
    isEditing: {
        type: Boolean,
        default: false,
    },
});

const model = defineModel({
    type: Object,
    required: true,
});
</script>
