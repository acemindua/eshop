<template>
    <!-- Список для вибору значень -->
    <Listbox :modelValue="modelValue" @update:modelValue="(value) => emit('update:modelValue', value)">
        <div class="relative">
            <ListboxButton
                class="relative w-full cursor-pointer rounded-md bg-white dark:bg-slate-800 h-10 pl-3 pr-10 text-left border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm overflow-hidden"
            >
                <span class="block truncate dark:text-slate-300 text-sm">
                    {{ modelValue && modelValue.id ? `${modelValue.title}` : 'Виберіть елемент' }}
                </span>
                <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <IconSelector :size="20" stroke-width="1" class="h-5 w-5 text-slate-400" aria-hidden="true" />
                </span>
            </ListboxButton>

            <transition
                leave-active-class="transition duration-100 ease-in"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
            >
                <ListboxOptions class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-slate-900 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                    <ListboxOption
                        v-for="item in dataArray"
                        :key="item.id"
                        :value="item"
                        v-slot="{ active, selected }"
                    >
                        <li
                            :class="[
                                active ? 'bg-indigo-100 text-indigo-900 dark:bg-indigo-600/20 dark:text-white' : 'text-gray-900 dark:text-slate-300',
                                'relative cursor-default select-none py-2 pl-10 pr-4'
                            ]"
                        >
                            <span :class="selected ? 'font-medium' : 'font-normal'" class="block truncate">
                                {{ `${item.title}` }}
                            </span>
                            <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-500">
                                <IconCheck class="h-5 w-5" aria-hidden="true" />
                            </span>
                        </li>
                    </ListboxOption>
                </ListboxOptions>
            </transition>
        </div>
    </Listbox>
</template>

<script setup>
import { IconSelector, IconCheck } from "@tabler/icons-vue";
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from "@headlessui/vue";

const props = defineProps({
    modelValue: [String, Object],
    dataArray: {
        type: Array,
        required: true
    }
});
const emit = defineEmits(["update:modelValue"]);
</script>
