<!-- Commerce/Products/Partials/DataProductForm -->
<script setup>
import CheckBoxSwitcher from "@/Components/CheckBoxSwitcher.vue";
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import TextInput from "@/Components/TextInput.vue";

const props = defineProps({
    form: { type: Object, required: true },
    data: { type: [Object, Array], required: true },
    errors: { type: Object, default: () => ({}) },
});
</script>

<template>
    <div
        class="flex flex-col w-full space-y-4 bg-gray-50 border rounded-lg p-4 md:p-8"
    >
        <!-- Order Input -->
        <div>
            <InputLabel
                for="order"
                :value="$t('Order')"
                class="flex items-center leading-6 font-semibold"
            />
            <TextInput
                id="order"
                type="number"
                v-model="form.order"
                class="block w-full pr-4 text-start"
                :class="{ 'border-red-500': errors.order }"
            />
            <InputError class="mt-2" :message="errors.order" />
        </div>

        <!-- Status Toggle -->
        <div>
            <InputLabel
                for="public"
                :value="$t('Status')"
                class="flex items-center leading-6 font-semibold"
            />
            <CheckBoxSwitcher v-model="form.public" />
            <InputError class="mt-2" :message="errors.public" />
        </div>
    </div>
</template>
