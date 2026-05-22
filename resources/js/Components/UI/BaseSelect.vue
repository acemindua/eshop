<!-- Components/UI/BaseSelect.vue -->
<script setup>
import {
    Combobox,
    ComboboxInput,
    ComboboxOptions,
    ComboboxOption,
    ComboboxButton,
    TransitionRoot,
} from "@headlessui/vue";

defineProps({
    options: {
        type: Array,
        default: () => [],
    },
    label: String,
    placeholder: String,
    loading: Boolean,
    displayKey: { type: String, default: "name" },
    showCheck: { type: Boolean, default: true },
    isStatic: Boolean,
    error: Boolean,
});

const emit = defineEmits(["query-change"]);

// Переходимо на сучасний defineModel
const model = defineModel({ type: [Object, null], required: true });
</script>

<!-- Components/UI/BaseSelect.vue -->
<template>
    <div class="relative w-full">
        <Combobox v-model="model" nullable>
            <div class="relative">
                <ComboboxButton as="div" class="w-full">
                    <!-- Слот для іконки ліворуч в інпуті -->
                    <div
                        v-if="$slots.leading"
                        class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400 dark:text-slate-500"
                    >
                        <slot name="leading"></slot>
                    </div>

                    <ComboboxInput
                        class="w-full rounded-lg border py-2.5 text-sm shadow-sm transition-colors duration-200 outline-none focus:ring-4"
                        :class="[
                            'bg-white text-slate-900 placeholder-slate-400 dark:bg-slate-900 dark:text-slate-100 dark:placeholder-slate-500',
                            error
                                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10 dark:border-red-500/80'
                                : 'border-slate-200 hover:border-slate-300 focus:border-indigo-500 focus:ring-indigo-500/10 dark:border-slate-700 dark:hover:border-slate-600 dark:focus:border-indigo-500',

                            // Динамічний відступ зліва, якщо є іконка
                            $slots.leading ? 'pl-10 pr-10' : 'px-3',
                            { 'cursor-pointer': isStatic },
                        ]"
                        :placeholder="placeholder"
                        :displayValue="(v) => (v ? v[displayKey] : '')"
                        autocomplete="off"
                        @change="emit('query-change', $event.target.value)"
                    />

                    <div
                        class="absolute inset-y-0 right-0 flex items-center pr-2.5 pointer-events-none text-slate-400 dark:text-slate-500"
                    >
                        <svg
                            class="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </div>
                </ComboboxButton>

                <TransitionRoot
                    leave="transition ease-in duration-100"
                    leaveTo="opacity-0"
                >
                    <ComboboxOptions
                        class="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-slate-200 bg-white p-1 text-sm shadow-lg dark:border-slate-700 dark:bg-slate-800"
                    >
                        <ComboboxOption
                            v-for="item in options"
                            :key="item.ref || item.id || item[displayKey]"
                            :value="item"
                            v-slot="{ active, selected }"
                        >
                            <li
                                class="relative flex items-center justify-between cursor-pointer select-none rounded-md px-3 py-2 text-slate-900 transition-colors dark:text-slate-100"
                                :class="[
                                    active
                                        ? 'bg-indigo-600 text-white dark:bg-indigo-500'
                                        : selected
                                          ? 'bg-slate-100 dark:bg-slate-700/50'
                                          : '',
                                ]"
                            >
                                <!-- Гнучкий вивід вмісту: або через слот, або просто текст -->
                                <div class="flex items-center gap-2.5">
                                    <slot
                                        name="option"
                                        :item="item"
                                        :selected="selected"
                                        :active="active"
                                    >
                                        <span
                                            :class="{
                                                'font-semibold': selected,
                                            }"
                                            >{{ item[displayKey] }}</span
                                        >
                                    </slot>
                                </div>

                                <span
                                    v-if="selected && showCheck"
                                    :class="
                                        active
                                            ? 'text-white'
                                            : 'text-indigo-600 dark:text-indigo-400'
                                    "
                                >
                                    <svg
                                        class="h-4 w-4"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                </span>
                            </li>
                        </ComboboxOption>
                    </ComboboxOptions>
                </TransitionRoot>
            </div>
        </Combobox>
    </div>
</template>
