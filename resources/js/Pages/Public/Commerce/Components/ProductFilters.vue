<script setup>
import { computed } from "vue";
import Slider from "@vueform/slider";
import InputLabel from "@/Components/UI/InputLabel.vue";
import TextInput from "@/Components/UI/TextInput.vue";
//css
import "@vueform/slider/themes/default.css";
import Checkbox from "@/Components/UI/Checkbox.vue";
import { IconStarFilled } from "@tabler/icons-vue";
import RadioButton from "@/Components/UI/RadioButton.vue";

const props = defineProps({
    modelValue: Object,
    brands: Array,
    categories: Array,
    defaultMax: { type: Number, default: 50000 },
});

const emit = defineEmits(["update:modelValue"]);

const localForm = computed({
    get: () => props.modelValue,
    set: (val) => emit("update:modelValue", val),
});

const priceRange = computed({
    get: () => [localForm.value.min_price, localForm.value.max_price],
    set: (val) => {
        localForm.value.min_price = val[0];
        localForm.value.max_price = val[1];
    },
});

const ratingOptions = [
    { value: 0, label: "All" },
    { value: 4, label: "4+ Stars" },
    { value: 3, label: "3+ Stars" }, // можна легко додати інші
];
</script>

<template>
    <div class="flex flex-col divide-y">
        <!--filters-->
        <div class="py-4">
            <InputLabel
                :value="$t('Filters')"
                class="text-sm mb-2 text-gray-800"
            />
            <div class="flex flex-col space-y-2">
                <label class="flex items-center gap-2 cursor-pointer text-sm">
                    <Checkbox v-model:checked="localForm.sale" />
                    <span>{{ $t("Sale") }}</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer text-sm">
                    <Checkbox v-model:checked="localForm.in_stock" />
                    <span>{{ $t("In stock") }}</span>
                </label>
            </div>
        </div>
        <!--rating-->
        <div class="py-4">
            <InputLabel
                :value="$t('Rating')"
                class="text-sm mb-2 text-gray-800"
            />

            <ul class="space-y-2" role="radiogroup">
                <li v-for="option in ratingOptions" :key="option.value">
                    <label class="flex items-center gap-3 cursor-pointer group">
                        <RadioButton
                            :value="option.value"
                            v-model="localForm.rating"
                        />
                        <span class="text-sm flex items-center gap-1">
                            <template v-if="option.value === 0">
                                {{ $t(option.label) }}
                            </template>
                            <template v-else>
                                <IconStarFilled
                                    class="w-4 h-4 text-orange-500"
                                />
                                {{ option.value }}+
                            </template>
                        </span>
                    </label>
                </li>
            </ul>
        </div>

        <!--price-->
        <div class="py-4">
            <InputLabel
                :value="$t('Price')"
                class="text-sm mb-2 text-gray-800"
            />

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
                :min="0"
                :max="defaultMax"
                class="slider-brand mt-4"
                :tooltips="false"
            />
        </div>

        <!--brand-->
        <div class="py-4">
            <InputLabel
                :value="$t('Categories')"
                class="text-sm mb-2 text-gray-800"
            />
            <label
                v-for="category in props.categories"
                :key="category.id"
                class="text-sm mb-2 text-gray-800 flex items-center gap-2"
            >
                <Checkbox
                    :value="category.id"
                    v-model:checked="localForm.categories"
                />
                <span class="text-sm whitespace-nowrap">
                    {{ category.title }} ({{ category.count }})
                </span>
            </label>
        </div>

        <!--brand-->
        <div class="py-4">
            <InputLabel
                :value="$t('Brands')"
                class="text-sm mb-2 text-gray-800"
            />
            <label
                v-for="brand in props.brands"
                :key="brand.id"
                class="text-sm mb-2 text-gray-800 flex items-center gap-2"
            >
                <Checkbox
                    :value="brand.id"
                    v-model:checked="localForm.brands"
                />
                <span class="text-sm"
                    >{{ brand.title }} ({{ brand.count }})</span
                >
            </label>
        </div>
    </div>
</template>
