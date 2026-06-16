<script setup>
import {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
} from "@headlessui/vue";
import { IconArrowsDownUp, IconCheck } from "@tabler/icons-vue"; // Corrected import
import { computed } from "vue";

const props = defineProps({
    modelValue: String,
    options: Array,
});

const emit = defineEmits(["update:modelValue"]);

const currentLabel = computed(
    () =>
        props.options.find((o) => o.value === props.modelValue)?.label ||
        "Sort",
);
</script>

<template>
    <Listbox
        :model-value="modelValue"
        @update:model-value="(val) => emit('update:modelValue', val)"
    >
        <div class="relative group">
            <ListboxButton
                class="flex items-center gap-2 p-1 rounded-full text-sm w-48 text-left border"
            >
                <span class="block bg-gray-50 rounded-full p-2">
                    <IconArrowsDownUp
                        :stroke="2"
                        class="w-4 h-4 text-brand"
                    />
                </span>

                {{ $t(currentLabel) }}
            </ListboxButton>

            <ListboxOptions
                class="absolute mt-1 w-48 bg-white rounded-xl shadow-lg z-30 text-sm p-2"
            >
                <ListboxOption
                    v-for="option in options"
                    :key="option.value"
                    :value="option.value"
                    v-slot="{ active, selected }"
                >
                    <li
                        class="flex items-center justify-start cursor-pointer p-1 rounded-full gap-1 transition duration-150"
                        :class="[
                            active ? 'bg-gray-100' : '',
                            selected ? 'font-semibold text-brand' : '',
                        ]"
                    >
                        <div class="w-6 h-6 flex items-center justify-center">
                            <IconCheck
                                v-if="selected"
                                :stroke="2"
                                class="w-4 h-4"
                            />
                        </div>
                        <span class="flex-1">{{ $t(option.label) }}</span>
                    </li>
                </ListboxOption>
            </ListboxOptions>
        </div>
    </Listbox>
</template>
