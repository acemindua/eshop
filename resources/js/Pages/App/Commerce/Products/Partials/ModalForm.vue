<script setup>
import { ref, computed } from "vue";
import { IconX } from "@tabler/icons-vue";

// Компоненти
import CheckBoxSwitcher from "@/Components/CheckBoxSwitcher.vue";
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import TextInput from "@/Components/TextInput.vue";
import ComboboxSelect from "@/Components/ComboboxSelect.vue";

// Пропси, моделі, емісії
const props = defineProps({
    attr: {
        type: Array,
    },
    attrValues: {
        type: Array,
    },
    errors: Object,
    isEditing: Boolean,
});

const emit = defineEmits(["close", "save"]);

const model = defineModel({
    type: Object,
    required: true,
});

const booleanPublic = computed({
    get: () => !!model.value.public,
    set: (val) => (model.value.public = val),
});

// Обробник збереження
const onSave = () => {
    emit("save");
};
</script>

<template>
    <div class="relative bg-white p-4 rounded-xl shadow w-full">
        <h1 class="font-semibold text-xl pb-4">
            {{ isEditing ? $t("Edit") : $t("New") }}
        </h1>

        <!-- Іконка закриття -->
        <span class="absolute top-3 right-3">
            <IconX
                :stroke="2"
                class="hover:text-red-500 cursor-pointer"
                @click="emit('close')"
            />
        </span>

        <div class="flex flex-col space-y-4">
            <div>
                <InputLabel
                    for="attribute"
                    :value="$t('Attribute')"
                    class="font-semibold"
                />
                <ComboboxSelect
                    id="attribute"
                    v-model="model.attribute_id"
                    :items="attr"
                />
                <InputError class="mt-2" :message="errors.attribute_id" />
            </div>
            <div>
                <InputLabel
                    for="attribute_value"
                    :value="$t('Attribute Value')"
                    class="font-semibold"
                />
                <ComboboxSelect
                    id="attribute_value"
                    v-model="model.attribute_value_id"
                    :items="attrValues"
                    :key="model.attribute_value_id"
                />
                <InputError class="mt-2" :message="errors.attribute_value_id" />
            </div>
            <div class="space-y-4 mt-4">
                <!-- Порядок -->
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
                        class="block w-full"
                        :class="{ 'border-red-500': errors.order }"
                    />
                    <InputError class="mt-2" :message="errors.order" />
                </div>

                <!-- Статус -->
                <div>
                    <InputLabel
                        for="public"
                        :value="$t('Status')"
                        class="font-semibold"
                    />
                    <CheckBoxSwitcher v-model="booleanPublic" />
                    <InputError class="mt-2" :message="errors.public" />
                </div>
            </div>

            <!-- Кнопка Зберегти -->
            <div class="mt-6 flex justify-end">
                <PrimaryButton
                    class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    @click="onSave"
                >
                    {{ $t("Save") }}
                </PrimaryButton>
            </div>
        </div>
    </div>
</template>
