<script setup>
import { computed } from "vue";
import { IconX } from "@tabler/icons-vue";

// Components
import CheckBoxSwitcher from "@/Components/CheckBoxSwitcher.vue";
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import TextInput from "@/Components/TextInput.vue";
import AttributeForm from "./AttributeForm.vue";

// Props and Events
const props = defineProps({
    errors: Object,
    isEditing: Boolean,
});

const emit = defineEmits(["close", "save"]);

const model = defineModel({
    type: Object,
    required: true,
});

// Two-way binding for boolean field "public"
const booleanPublic = computed({
    get: () => !!model.value.public,
    set: (val) => (model.value.public = val),
});

const onSave = () => emit("save");
</script>

<template>
    <div class="w-full h-full flex items-center justify-center">
        <div
            class="relative bg-white p-6 rounded-xl shadow-xl w-full max-w-2xl space-y-6"
        >
            <!-- Title and Close -->
            <div class="flex justify-between items-start">
                <h1 class="text-xl font-semibold">
                    {{
                        isEditing
                            ? $t("Edit Variant")
                            : $t("Create New Variant")
                    }}
                </h1>
                <IconX
                    :stroke="2"
                    class="w-5 h-5 cursor-pointer hover:text-red-500"
                    @click="emit('close')"
                />
            </div>

            <!-- STEP 1: Select attribute and value -->
            <div class="space-y-4">
                <h2 class="text-md font-medium text-gray-600">
                    {{ $t("Step 1: Choose attribute and value") }}
                </h2>
                <AttributeForm v-model="model" :errors="errors" />
            </div>

            <!-- STEP 2: SKU / Price / Quantity -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <InputLabel
                        for="sku"
                        :value="$t('SKU')"
                        class="font-semibold"
                    />
                    <TextInput
                        id="sku"
                        type="text"
                        v-model="model.sku"
                        class="w-full"
                        :class="{ 'border-red-500': errors.sku }"
                    />
                    <InputError class="mt-2" :message="errors.sku" />
                </div>

                <div>
                    <InputLabel
                        for="price"
                        :value="$t('Price')"
                        class="font-semibold"
                    />
                    <TextInput
                        id="price"
                        type="number"
                        v-model="model.price"
                        class="w-full"
                        :class="{ 'border-red-500': errors.price }"
                    />
                    <InputError class="mt-2" :message="errors.price" />
                </div>

                <div>
                    <InputLabel
                        for="quantity"
                        :value="$t('Stock Quantity')"
                        class="font-semibold"
                    />
                    <TextInput
                        id="quantity"
                        type="number"
                        v-model="model.quantity"
                        class="w-full"
                        :class="{ 'border-red-500': errors.quantity }"
                    />
                    <InputError class="mt-2" :message="errors.quantity" />
                </div>
            </div>

            <!-- STEP 3: Order and Status -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <InputLabel
                        for="order"
                        :value="$t('Order')"
                        class="font-semibold"
                    />
                    <TextInput
                        id="order"
                        type="number"
                        v-model="model.order"
                        class="w-full"
                        :class="{ 'border-red-500': errors.order }"
                    />
                    <InputError class="mt-2" :message="errors.order" />
                </div>

                <div>
                    <InputLabel
                        for="public"
                        :value="$t('Visibility')"
                        class="font-semibold"
                    />
                    <CheckBoxSwitcher v-model="booleanPublic" />
                    <InputError class="mt-2" :message="errors.public" />
                </div>
            </div>

            <!-- STEP 4: Save button -->
            <div class="flex justify-end">
                <PrimaryButton
                    class="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
                    @click="onSave"
                >
                    {{ $t("Save") }}
                </PrimaryButton>
            </div>
        </div>
    </div>
</template>
