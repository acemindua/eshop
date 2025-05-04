<!-- Commerce/Products/Partials/DataProductForm -->
<script setup>
import CheckBoxSwitcher from "@/Components/CheckBoxSwitcher.vue";
import ComboboxSelect from "@/Components/ComboboxSelect.vue";
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import TextInput from "@/Components/TextInput.vue";

const props = defineProps({
    form: { type: Object },
    data: { type: [Object, Array] },
    errors: { type: Object },
});
</script>

<template>
    <div
        class="flex flex-col w-full space-y-4 bg-gray-50 border rounded-lg p-4 md:p-8"
    >
        <!-- Category -->
        <div>
            <InputLabel
                for="category_id"
                :value="$t('Category')"
                class="flex items-center leading-6 font-semibold"
            />
            <ComboboxSelect
                id="category_id"
                v-model="form.category_id"
                :items="data.categories.data"
                :class="{ 'border-red-500': errors.category_id }"
            />
            <InputError class="mt-2" :message="errors.category_id" />
        </div>

        <!-- Manufacturer -->
        <div>
            <InputLabel
                for="manufacturer_id"
                :value="$t('Manufacturer')"
                class="flex items-center leading-6"
            />
            <ComboboxSelect
                id="manufacturer_id"
                v-model="form.manufacturer_id"
                :items="data.manufacturers.data"
                :class="{ 'border-red-500': errors.manufacturer_id }"
            />
            <InputError class="mt-2" :message="errors.manufacturer_id" />
        </div>

        <!-- Country -->
        <div>
            <InputLabel
                for="country_id"
                :value="$t('Country')"
                class="flex items-center leading-6"
            />
            <ComboboxSelect
                id="country_id"
                v-model="form.country_id"
                :items="data.countries.data"
                :class="{ 'border-red-500': errors.country_id }"
            />
            <InputError class="mt-2" :message="errors.country_id" />
        </div>

        <!-- Order -->
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

        <!-- Status -->
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
