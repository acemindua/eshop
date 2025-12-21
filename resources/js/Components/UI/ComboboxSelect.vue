<template>
    <Combobox v-model="selected">
        <div class="relative mt-1">
            <div
                class="relative w-full cursor-default overflow-hidden border rounded-md border-gray-300 shadow-sm"
            >
                <ComboboxInput
                    @change="query = $event.target.value"
                    :displayValue="(item) => item?.title ?? ''"
                    autocomplete="off"
                    class="w-full border-none py-3 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                    placeholder="Select ..."
                />
                <ComboboxButton
                    class="absolute inset-y-0 right-0 flex items-center pr-2"
                >
                    <IconSelector
                        stroke="{2}"
                        class="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                    />
                </ComboboxButton>
            </div>
            <transition
                enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-out"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
            >
                <ComboboxOptions
                    class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                >
                    <div
                        v-if="filteredItems.length === 0 && query !== ''"
                        class="relative cursor-default select-none px-4 py-2 text-gray-700"
                    >
                        Nothing found.
                    </div>
                    <ComboboxOption
                        :value="null"
                        as="template"
                        v-slot="{ active }"
                    >
                        <li
                            class="relative cursor-default select-none py-2 pl-10 pr-4 text-slate-400 hover:text-white"
                            :class="{
                                'bg-purple-500 text-white': active,
                                'text-gray-900': !active,
                            }"
                        >
                            <span class="block truncate font-normal text-xs"
                                >Empty...</span
                            >
                        </li>
                    </ComboboxOption>
                    <ComboboxOption
                        v-for="item in filteredItems"
                        :key="item.id"
                        :value="item"
                        as="template"
                        v-slot="{ selected, active }"
                    >
                        <li
                            class="relative cursor-default select-none py-2 pl-10 pr-4 text-xs"
                            :class="{
                                'bg-purple-500 text-white': active,
                                'text-gray-900': !active,
                            }"
                        >
                            <span
                                class="block truncate"
                                :class="{
                                    'font-medium': selected,
                                    'font-normal': !selected,
                                }"
                            >
                                {{ item.title }}
                            </span>
                            <span
                                v-if="selected"
                                class="absolute inset-y-0 left-0 flex items-center pl-3"
                                :class="{
                                    'text-white': active,
                                    'text-purple-500': !active,
                                }"
                            >
                                <IconCheck
                                    stroke="{2}"
                                    class="h-5 w-5"
                                    aria-hidden="true"
                                />
                            </span>
                        </li>
                    </ComboboxOption>
                </ComboboxOptions>
            </transition>
        </div>
    </Combobox>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import {
    Combobox,
    ComboboxInput,
    ComboboxButton,
    ComboboxOptions,
    ComboboxOption,
} from "@headlessui/vue";
import { IconSelector, IconCheck } from "@tabler/icons-vue";
const props = defineProps({
    modelValue: [Number, Object], // modelValue може бути як id, так і об'єктом
    items: { type: [Object, Array] }, // Масив категорій [{ id, title }]
});
const emit = defineEmits(["update:modelValue"]);

// Обраний елемент (знаходимо об'єкт за id, якщо передано тільки id)
const selected = ref(
    typeof props.modelValue === "object"
        ? props.modelValue
        : props.items.find((item) => item.id === props.modelValue) || null
);

const query = ref("");

// Фільтрація категорій за запитом користувача
const filteredItems = computed(() => {
    return query.value === ""
        ? props.items
        : props.items.filter((item) =>
              item.title.toLowerCase().includes(query.value.toLowerCase())
          );
});

// Оновлюємо modelValue при зміні selected
watch(selected, (newValue) => {
    emit("update:modelValue", newValue?.id || null); // Відправляємо тільки id
});
</script>
