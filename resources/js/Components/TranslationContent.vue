<template>
    <div class="flex w-full flex-col space-y-4">
        <div class="bg-gray-50 border rounded-lg p-4 md:p-8">
            <div v-if="`title`" class="mb-3">
                <div class="flex items-center space-x-1">
                    <span class="text-red-500">*</span>
                    <InputLabel
                        :for="`${code}[title]`"
                        :value="`Title (${code})`"
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
                    :for="`${code}[content]`"
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

        <div v-if="`meta_title`">
            <h2 class="font-semibold text-xl mb-4">Meta tags</h2>
            <div class="bg-gray-50 border rounded-lg p-4 md:p-8">
                <div v-if="`meta_title`" class="mb-3">
                    <div class="flex items-center space-x-1">
                        <InputLabel
                            :for="`${code}[meta_title]`"
                            :value="`Meta title (${code})`"
                            class="flex leading-6 items-center font-semibold"
                        />
                    </div>

                    <div class="w-full sm:col-span-3">
                        <TextInput
                            :id="`${code}[meta_title]`"
                            type="text"
                            v-model="model.meta_title"
                            class="block w-full"
                            :placeholder="`meta_title (${code})`"
                            :class="{
                                'border-red-500': errors[`${code}.meta_title`],
                            }"
                        />
                        <p class="mt-1 text-xs text-gray-500">
                            SEO meta title, shown in browser tabs and search
                            results.
                        </p>

                        <InputError
                            class="mt-2"
                            :message="errors[`${code}.meta_title`]"
                        />
                    </div>
                </div>

                <div v-if="`meta_description`" class="mb-3">
                    <InputLabel
                        :for="`${code}[meta_description]`"
                        :value="`Meta description (${code})`"
                        class="flex leading-6 items-center font-semibold"
                    />
                    <div class="w-full sm:col-span-3">
                        <TextareaInput
                            :id="`${code}[meta_description]`"
                            v-model="model.meta_description"
                            class="block w-full"
                        />
                        <p class="mt-1 text-xs text-gray-500">
                            SEO meta description, helps improve search engine
                            snippets.
                        </p>
                        <InputError
                            class="mt-2"
                            :message="errors[`${code}.meta_description`]"
                        />
                    </div>
                </div>

                <div v-if="`meta_title`" class="mb-3">
                    <div class="flex items-center space-x-1">
                        <InputLabel
                            :for="`${code}[meta_keywords]`"
                            :value="`Meta keywords (${code})`"
                            class="flex leading-6 items-center font-semibold"
                        />
                    </div>

                    <div class="w-full sm:col-span-3">
                        <TextInput
                            :id="`${code}[meta_keywords]`"
                            type="text"
                            v-model="model.meta_keywords"
                            class="block w-full"
                            :placeholder="`meta_keywords (${code})`"
                            :class="{
                                'border-red-500':
                                    errors[`${code}.meta_keywords`],
                            }"
                            @keydown.space.prevent="appendComma"
                            @keydown.enter.prevent="appendComma"
                        />
                        <p class="mt-2 text-xs text-gray-500">
                            Enter keywords separated automatically by commas as
                            you type. Press space or enter to add a comma.
                        </p>
                        <InputError
                            class="mt-2"
                            :message="errors[`${code}.meta_keywords`]"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import InputError from "./InputError.vue";
import InputLabel from "./InputLabel.vue";
import TextInput from "./TextInput.vue";
import TextEditor from "./TextEditor.vue";
import TextareaInput from "./TextareaInput.vue";

const props = defineProps({
    errors: Object,
    code: {
        type: String,
    },
    isEditing: {
        type: Boolean,
        default: false,
    },
});

const model = defineModel({
    type: Object,
    required: true,
});

const appendComma = () => {
    if (!model.value.meta_keywords) return;

    const trimmed = model.value.meta_keywords
        .toLowerCase()
        .trim()
        .replace(/\s*,\s*$/, "");
    if (trimmed) {
        model.value.meta_keywords = trimmed + ", ";
    }
};
</script>
