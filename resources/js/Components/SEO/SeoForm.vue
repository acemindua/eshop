<template>
    <div class="bg-gray-50 border rounded-lg p-4 md:p-8 w-full">
        <div
            v-for="(locale, code) in locales"
            :key="code"
            class="flex flex-col w-full"
        >
            <div
                class="mb-3"
                v-if="isEditing && form[code] && 'slug' in form[code]"
            >
                <div class="flex items-center space-x-1">
                    <span class="text-red-500">*</span>
                    <InputLabel
                        :for="`${code}[slug]`"
                        :value="`Slug (${code})`"
                        class="flex leading-6 items-center font-semibold"
                    />
                </div>
                <div class="w-full sm:col-span-3">
                    <div class="relative w-full">
                        <div class="absolute top-2 left-2">
                            <flag
                                :iso="splitRegion(locale.regional)"
                                :title="locale.native"
                                class="rounded"
                            />
                        </div>
                        <TextInput
                            :id="`${code}[slug]`"
                            type="text"
                            v-model="form[code].slug"
                            class="block w-full pl-8"
                            :placeholder="`slug (${code})`"
                            :class="{
                                'border-red-500': errors[`${code}.slug`],
                                'bg-gray-100 text-gray-500':
                                    Number(form.id) === 1,
                            }"
                            :disabled="Number(form.id) === 1"
                        />
                    </div>

                    <InputError
                        class="mt-2"
                        :message="errors[`${code}.slug`]"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import InputError from "../InputError.vue";
import InputLabel from "../InputLabel.vue";
import TextInput from "../TextInput.vue";

const props = defineProps({
    form: { type: Object },
    locales: { type: Object },
    errors: { type: Object },
    isEditing: {
        type: Boolean,
        default: false, // Якщо не передано — вважається "створення"
    },
});

// Utils
const splitRegion = (region) => region.split("_")[1].toLowerCase();
</script>
