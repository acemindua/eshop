<template>
    <div
        class="md:flex gap-6 w-full border rounded-lg p-2 md:p-6 lg:p-12 bg-gray-50"
    >
        <div class="w-full md:w-1/5 pb-4">
            <h2 class="uppercase font-semibold">Meta tags</h2>
            <span class="py-2 text-sm text-gray-600">SEO content</span>
        </div>

        <div class="flex md:w-3/4 w-full flex-col space-y-4 bg-gray-50">
            <div class="mb-3">
                <div class="flex items-center space-x-1">
                    <span class="text-red-500">*</span>
                    <InputLabel
                        for="slug"
                        :value="`Slug`"
                        class="flex leading-6 items-center font-semibold"
                    />
                </div>
                <div class="w-full sm:col-span-3">
                    <div class="relative w-full">
                        <TextInput
                            id="slug"
                            type="text"
                            v-model="model.slug"
                            class="block w-full"
                            :placeholder="`slug`"
                            :class="{
                                'border-red-500': errors[`slug`],
                            }"
                        />
                    </div>

                    <InputError class="mt-2" :message="errors[`slug`]" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import InputLabel from "@/Components/UI/InputLabel.vue";
import TextInput from "@/Components/UI/TextInput.vue";
import InputError from "@/Components/UI/InputError.vue";

const model = defineModel({
    type: Object,
    required: true,
});

const props = defineProps({
    errors: Object,
    isEditing: {
        type: Boolean,
        default: false,
    },
});
</script>
