<template>
    <div class="bg-gray-50 border rounded-lg p-4 md:p-8 w-full">
        
            <div
                class="mb-3"
               
            >
                <div class="flex items-center space-x-1">
                    <span class="text-red-500">*</span>
                    <InputLabel
                        :for="`slug`"
                        :value="`Slug`"
                        class="flex leading-6 items-center font-semibold"
                    />
                </div>
                <div class="w-full sm:col-span-3">
                    <div class="relative w-full">
                        <TextInput
                            :id="`slug`"
                            type="text"
                            v-model="form.slug"
                            class="block w-full"
                            :placeholder="`slug`"
                            :class="{
                                'border-red-500': errors.slug,
                            }"
                        />
                    </div>

                    <InputError
                        class="mt-2"
                        :message="errors.slug"
                    />
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
    errors: { type: Object },
    isEditing: {
        type: Boolean,
        default: false, // Якщо не передано — вважається "створення"
    },
});

// Utils
const splitRegion = (region) => region.split("_")[1].toLowerCase();
</script>
