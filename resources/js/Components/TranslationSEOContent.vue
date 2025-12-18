<template>
    <div
        v-if="'meta_title' in model"
        class="md:flex gap-6 w-full border rounded-lg p-2 md:p-6 lg:p-12 bg-gray-50"
    >
        <div class="w-full md:w-1/5 pb-4">
            <h2 class="uppercase font-semibold">Meta tags</h2>
            <span class="py-2 text-sm text-gray-600">SEO content</span>
        </div>

        <div class="flex md:w-3/4 w-full flex-col space-y-4 bg-gray-50">
            <div v-if="'slug' in model" class="mb-3">
                <div class="flex items-center space-x-1">
                    <span class="text-red-500">*</span>
                    <InputLabel
                        :for="`${code}.slug`"
                        :value="`Slug (${code})`"
                        class="flex leading-6 items-center font-semibold"
                    />
                </div>
                <div class="w-full sm:col-span-3">
                    <div class="relative w-full">
                        <TextInput
                            :id="`${code}.slug`"
                            type="text"
                            v-model="model.slug"
                            class="block w-full"
                            :placeholder="`slug`"
                            :class="{
                                'border-red-500': errors[`${code}.slug`],
                            }"
                        />
                    </div>

                    <InputError
                        class="mt-2"
                        :message="errors[`${code}.slug`]"
                    />
                </div>
            </div>

            <div v-if="'meta_title' in model" class="mb-3">
                <div class="flex items-center space-x-1">
                    <InputLabel
                        :for="`${code}.meta_title`"
                        :value="`Meta title (${code})`"
                        class="flex leading-6 items-center font-semibold"
                    />
                </div>

                <div class="w-full sm:col-span-3">
                    <TextInput
                        :id="`${code}.meta_title`"
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

            <div v-if="'meta_description' in model" class="mb-3">
                <InputLabel
                    :for="`${code}.meta_description`"
                    :value="`Meta description (${code})`"
                    class="flex leading-6 items-center font-semibold"
                />
                <div class="w-full sm:col-span-3">
                    <TextareaInput
                        :id="`${code}.meta_description`"
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

            <div v-if="'meta_keywords' in model" class="mb-3">
                <div class="flex items-center space-x-1">
                    <InputLabel
                        :for="`${code}.meta_keywords`"
                        :value="`Meta keywords (${code})`"
                        class="flex leading-6 items-center font-semibold"
                    />
                </div>

                <div class="w-full sm:col-span-3">
                    <TextInput
                        :id="`${code}.meta_keywords`"
                        type="text"
                        v-model="model.meta_keywords"
                        class="block w-full"
                        :placeholder="`meta_keywords (${code})`"
                        :class="{
                            'border-red-500': errors[`${code}.meta_keywords`],
                        }"
                        @keydown.space.prevent="appendComma"
                        @keydown.enter.prevent="appendComma"
                    />
                    <p class="mt-2 text-xs text-gray-500">
                        Enter keywords separated automatically by commas as you
                        type. Press space or enter to add a comma.
                    </p>
                    <InputError
                        class="mt-2"
                        :message="errors[`${code}.meta_keywords`]"
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
import TextInput from "./UI/TextInput.vue";

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
