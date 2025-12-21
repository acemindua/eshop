<script setup>
import CheckBoxSwitcher from "@/Components/UI/CheckBoxSwitcher.vue";
import ComboboxSelect from "@/Components/UI/ComboboxSelect.vue";
import CountrySelect from "@/Components/UI/CountrySelect.vue";
import InputError from "@/Components/UI/InputError.vue";
import InputLabel from "@/Components/UI/InputLabel.vue";
import TextInput from "@/Components/UI/TextInput.vue";
import { computed } from "vue"; // computed залишаємо, але використовуємо для чистоти booleanPublic

const props = defineProps({
    // Форма Inertia, що містить поля для редагування
    form: { type: Object, required: true },
    // data пропс не використовується в цьому компоненті, можна прибрати або залишити, якщо він потрібен для майбутніх полів
    data: { type: [Object, Array], required: true },
    // Об'єкт помилок
    errors: { type: Object, default: () => ({}) },
});

// 1. ОПТИМІЗАЦІЯ: Спрощення двостороннього зв'язування для boolean "public"
// Це ідеальний спосіб перетворити 0/1 (або false/true) у чистий boolean для свитчера
// і коректно записати його назад у форму, якщо форма Inertia очікує 0/1 або null/undefined.
const booleanPublic = computed({
    // Отримуємо значення, перетворюючи його на чистий boolean (!!0 -> false, !!1 -> true)
    get: () => !!props.form.public,
    // При записі встановлюємо значення (CheckBoxSwitcher повертає true/false)
    set: (val) => (props.form.public = val),
});
</script>

<template>
    <div
        class="md:flex gap-6 w-full border rounded-lg p-2 md:p-6 lg:p-12 bg-gray-50"
    >
        <div class="w-full md:w-1/5 pb-4">
            <h2 class="uppercase font-semibold">
                {{ $t("General Data") }}
            </h2>
            <span class="py-2 text-sm text-gray-600">
                {{ $t("Manage general product info and public status.") }}
            </span>
        </div>

        <div class="flex md:w-2/4 w-full flex-col space-y-4 bg-gray-50">
            <!--Quantity-->
            <div>
                <InputLabel
                    for="quantity"
                    :value="$t('Quantity')"
                    class="flex items-center leading-6 font-semibold"
                />
                <TextInput
                    id="quantity"
                    type="number"
                    v-model="form.quantity"
                    class="block w-full pr-4 text-start"
                    :class="{ 'border-red-500': errors.quantity }"
                />
                <InputError class="mt-2" :message="errors.quantity" />
            </div>
            <!-- Price -->
            <div>
                <InputLabel
                    for="price"
                    :value="$t('Price')"
                    class="flex items-center leading-6 font-semibold"
                />
                <TextInput
                    id="price"
                    type="number"
                    v-model="form.price"
                    class="block w-full pr-4 text-start"
                    :class="{ 'border-red-500': errors.price }"
                />
                <InputError class="mt-2" :message="errors.price" />
            </div>
            <!-- Country Select -->
            <div>
                <InputLabel
                    for="country"
                    :value="$t('Country')"
                    class="flex items-center leading-6 font-semibold"
                />

                <CountrySelect
                    id="country"
                    v-model="form.country"
                    :items="data?.countries || []"
                    :class="{ 'border-red-500': errors.country }"
                />
                <InputError class="mt-2" :message="errors.country" />
            </div>
            <!-- Manufacturer Select -->
            <div>
                <InputLabel
                    for="manufacturer_id"
                    :value="$t('Manufacturer')"
                    class="flex items-center leading-6 font-semibold"
                />
                <ComboboxSelect
                    id="manufacturer_id"
                    v-model="form.manufacturer_id"
                    :items="data.manufacturers?.data || []"
                    :class="{ 'border-red-500': errors.manufacturer_id }"
                />
                <InputError class="mt-2" :message="errors.manufacturer_id" />
            </div>

            <!-- Category Select -->
            <div>
                <InputLabel
                    for="category_id"
                    :value="$t('Parent category')"
                    class="flex items-center leading-6 font-semibold"
                />
                <ComboboxSelect
                    id="category_id"
                    v-model="form.category_id"
                    :items="data.categories?.data || []"
                    :class="{ 'border-red-500': errors.category_id }"
                />
                <InputError class="mt-2" :message="errors.category_id" />
            </div>

            <!---->
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

            <div>
                <InputLabel
                    for="public-switcher"
                    :value="$t('Status')"
                    class="flex items-center leading-6 font-semibold mb-2"
                />
                <div class="flex items-center space-x-4">
                    <CheckBoxSwitcher
                        v-model="booleanPublic"
                        id="public-switcher"
                    />
                    <span
                        :class="[
                            'text-sm font-medium',
                            booleanPublic ? 'text-green-600' : 'text-red-600',
                        ]"
                    >
                        {{
                            booleanPublic
                                ? $t("Public (Visible)")
                                : $t("Private (Hidden)")
                        }}
                    </span>
                </div>
                <InputError class="mt-2" :message="errors.public" />
            </div>
        </div>
    </div>
</template>
