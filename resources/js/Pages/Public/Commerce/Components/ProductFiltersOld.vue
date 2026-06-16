<template>
    <aside
        class="w-full md:w-64 flex-shrink-0 border-t md:border-r p-4 space-y-8"
        role="search"
    >
        <label class="flex items-center gap-2 cursor-pointer text-sm">
            <Checkbox v-model:checked="localForm.promo" />
            <span>{{ $t("Sale") }}</span>
        </label>

        <fieldset class="pt-4 border-t">
            <legend class="text-sm font-medium text-gray-700 mb-2">
                {{ $t("Rating") }}
            </legend>
            <ul class="space-y-1" role="radiogroup">
                <li
                    v-for="i in [0, 5, 4, 3, 2, 1]"
                    :key="i"
                    class="flex items-center"
                >
                    <input
                        type="radio"
                        :id="'rating-' + i"
                        :value="i"
                        v-model="localForm.rating"
                        class="mr-2"
                    />
                    <label :for="'rating-' + i" class="text-sm cursor-pointer">
                        {{ i === 0 ? $t("All") : i + "+ " + $t("stars") }}
                    </label>
                </li>
            </ul>
        </fieldset>

        <div class="pt-4 border-t">
            <label class="text-sm font-medium text-gray-700 mb-6 block">{{
                $t("Price Range")
            }}</label>
            <div class="flex items-center gap-2">
                <TextInput
                    v-model.number="localForm.min_price"
                    type="number"
                    :placeholder="$t('Min')"
                />
                <span>-</span>
                <TextInput
                    v-model.number="localForm.max_price"
                    type="number"
                    :placeholder="$t('Max')"
                />
            </div>
            <Slider
                v-model="priceRange"
                :min="defaultMin"
                :max="defaultMax"
                class="mt-6"
                :tooltips="false"
            />
        </div>

        <fieldset class="pt-4 border-t">
            <legend class="text-sm font-medium text-gray-700 mb-2">
                {{ $t("Brands") }}
            </legend>
            <div class="space-y-2">
              
            </div>
        </fieldset>
    </aside>
</template>

<script setup>
import { computed } from "vue";
import Checkbox from "@/Components/UI/Checkbox.vue";
import TextInput from "@/Components/UI/TextInput.vue";
import Slider from "@vueform/slider";
import "@vueform/slider/themes/default.css"; // Імпорт стилів

const props = defineProps({
    modelValue: Object, // Сюди передаємо об'єкт form
    brands: Array,
    defaultMin: Number,
    defaultMax: Number,
});

const emit = defineEmits(["update:modelValue"]);

// Створюємо computed для синхронізації з батьком
const localForm = computed({
    get: () => props.modelValue,
    set: (val) => emit("update:modelValue", val),
});

// Розрахунок слайдера для компонента
const priceRange = computed({
    get: () => [localForm.value.min_price, localForm.value.max_price],
    set: (val) => {
        localForm.value.min_price = val[0];
        localForm.value.max_price = val[1];
    },
});
</script>
