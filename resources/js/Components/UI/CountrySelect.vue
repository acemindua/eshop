<template>
    <Combobox v-model="selected" as="div">
        <div class="relative mt-1">
            <div
                class="relative w-full cursor-default overflow-hidden border rounded-md border-gray-300 shadow-sm bg-white flex items-center focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-purple-500"
            >
                <div v-if="selected" class="pl-3 flex items-center">
                    <flag
                        :iso="selected.id"
                        class="rounded-sm shadow-sm scale-110"
                    />
                </div>

                <ComboboxInput
                    class="w-full border-none py-2.5 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                    @change="query = $event.target.value"
                    :displayValue="(item) => item?.title ?? ''"
                    autocomplete="off"
                    placeholder="Search country..."
                />

                <ComboboxButton
                    class="absolute inset-y-0 right-0 flex items-center pr-2"
                >
                    <IconSelector
                        class="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                    />
                </ComboboxButton>
            </div>

            <transition
                leave-active-class="transition duration-100 ease-in"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
                @after-leave="query = ''"
            >
                <ComboboxOptions
                    class="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                >
                    <div
                        v-if="filteredItems.length === 0 && query !== ''"
                        class="relative cursor-default select-none px-4 py-2 text-gray-700"
                    >
                        Nothing found.
                    </div>

                    <ComboboxOption
                        v-for="country in filteredItems"
                        :key="country.id"
                        :value="country"
                        as="template"
                        v-slot="{ selected, active }"
                    >
                        <li
                            class="relative cursor-default select-none py-2 pl-10 pr-4 flex items-center gap-3 transition-colors"
                            :class="{
                                'bg-purple-600 text-white': active,
                                'text-gray-900': !active,
                            }"
                        >
                            <flag
                                :iso="country.id"
                                class="rounded-sm flex-shrink-0"
                                :class="{ 'ring-1 ring-white/30': active }"
                            />

                            <span
                                class="block truncate"
                                :class="{
                                    'font-semibold': selected,
                                    'font-normal': !selected,
                                }"
                            >
                                {{ country.title }}
                                <span
                                    class="ml-1 opacity-50 text-[10px] uppercase"
                                    >({{ country.id }})</span
                                >
                            </span>

                            <span
                                v-if="selected"
                                class="absolute inset-y-0 left-0 flex items-center pl-3"
                                :class="{
                                    'text-white': active,
                                    'text-purple-600': !active,
                                }"
                            >
                                <IconCheck class="h-4 w-4" aria-hidden="true" />
                            </span>
                        </li>
                    </ComboboxOption>
                </ComboboxOptions>
            </transition>
        </div>
    </Combobox>
</template>

<script setup>
import { ref, computed } from "vue";
import {
    Combobox,
    ComboboxInput,
    ComboboxButton,
    ComboboxOptions,
    ComboboxOption,
} from "@headlessui/vue";
import { IconSelector, IconCheck } from "@tabler/icons-vue";

const props = defineProps({
    modelValue: [String, Number, Object],
    items: {
        type: Array,
        required: true,
        default: () => [],
    },
});

const emit = defineEmits(["update:modelValue"]);

const query = ref("");

// Обчислювана властивість для синхронізації з v-model
const selected = computed({
    get() {
        if (!props.modelValue) return null;
        if (typeof props.modelValue === "object") return props.modelValue;
        return props.items.find((i) => i.id === props.modelValue) || null;
    },
    set(value) {
        emit("update:modelValue", value?.id || null);
    },
});

const filteredItems = computed(() => {
    const s = query.value.toLowerCase().trim();
    return s === ""
        ? props.items
        : props.items.filter((item) => {
              return (
                  item.title.toLowerCase().includes(s) ||
                  item.id.toLowerCase().includes(s)
              );
          });
});
</script>
