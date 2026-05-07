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
    modelValue: [Object, null],
    options: Array,
    label: String,
    placeholder: String,
    loading: Boolean,
    error: String,
    displayKey: { type: String, default: "name" }, // ключ для відображення (напр. 'present' або 'name')
    showCheck: Boolean, // чи показувати галочку
    isStatic: Boolean, // якщо true — список відкривається відразу (як для відділень)
});

const emit = defineEmits(["update:modelValue", "query-change"]);
</script>

<template>
    <div class="relative">
        <label
            v-if="label"
            class="text-[10px] uppercase font-bold text-gray-400 mb-1.5 block tracking-widest"
        >
            {{ label }}
        </label>

        <Combobox
            :modelValue="modelValue"
            @update:modelValue="(val) => emit('update:modelValue', val)"
            nullable
        >
            <div class="relative">
                <ComboboxButton as="div" class="w-full">
                    <ComboboxInput
                        class="w-full border-gray-300 focus:border-black focus:ring-0 py-2.5 px-3 transition-all text-sm"
                        :class="{
                            'border-red-500': error,
                            'cursor-pointer': isStatic,
                        }"
                        :placeholder="placeholder"
                        :displayValue="(v) => (v ? v[displayKey] : '')"
                        autocomplete="off"
                        autocorrect="off"
                        spellcheck="false"
                        @change="emit('query-change', $event.target.value)"
                        @focus="
                            isStatic && !modelValue && emit('query-change', '')
                        "
                    />
                </ComboboxButton>

                <TransitionRoot
                    leave="transition duration-100"
                    leaveTo="opacity-0"
                >
                    <ComboboxOptions
                        class="absolute z-50 w-full bg-white border border-black mt-[-1px] max-h-60 overflow-auto shadow-xl"
                    >
                        <div
                            v-if="loading"
                            class="p-3 text-xs text-gray-400 italic"
                        >
                            Завантаження...
                        </div>

                        <ComboboxOption
                            v-for="item in options"
                            :key="item.ref"
                            :value="item"
                            v-slot="{ active, selected }"
                        >
                            <li
                                class="px-3 py-2 cursor-pointer border-b border-gray-50 last:border-none text-sm flex justify-between items-center transition-colors"
                                :class="
                                    active
                                        ? 'bg-black text-white'
                                        : selected
                                          ? 'bg-gray-100'
                                          : ''
                                "
                            >
                                <span>{{ item[displayKey] }}</span>
                                <span v-if="selected && showCheck">✓</span>
                            </li>
                        </ComboboxOption>

                        <div
                            v-if="!options.length && !loading"
                            class="p-3 text-xs text-gray-400"
                        >
                            Нічого не знайдено
                        </div>
                    </ComboboxOptions>
                </TransitionRoot>
            </div>
        </Combobox>
    </div>
    <p v-if="error" class="text-red-500 text-[10px] mt-1">{{ error }}</p>
</template>
