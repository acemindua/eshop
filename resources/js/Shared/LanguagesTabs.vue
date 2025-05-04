<template>
    <div class="flex flex-col w-full">
        <ul
            v-if="hasMultipleLanguages"
            class="flex space-x-2 mb-4 border p-2 rounded-lg border-dashed"
        >
            <li v-for="(locale, code) in locales" :key="code" class="relative">
                <button
                    type="button"
                    @click.prevent="changeTab(code)"
                    :class="buttonClass(code)"
                >
                    <flag
                        :iso="splitRegion(locale.regional)"
                        :title="locale.native"
                        class="rounded"
                    />
                    <span class="hidden md:block capitalize">{{
                        locale.native
                    }}</span>
                </button>

                <template v-if="hasError(code)">
                    <div class="absolute bottom-2 right-2 flex h-2 w-2">
                        <span
                            class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"
                        ></span>
                        <span
                            class="relative inline-flex rounded-full h-2 w-2 bg-red-500"
                        ></span>
                    </div>
                </template>
            </li>
        </ul>

        <div>
            <slot />
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { usePage } from "@inertiajs/vue3";

// Props & Emits
const props = defineProps({
    modelValue: String,
    errors: Object,
});
const emit = defineEmits(["update:modelValue"]);

// Locales
const page = usePage();
const locales = ref(page.props.lang.locales);
const selected = ref(props.modelValue || page.props.lang.default);

// Computed
const hasMultipleLanguages = computed(
    () => Object.keys(locales.value).length > 1
);

// Utils
const splitRegion = (region) => region.split("_")[1].toLowerCase();
const hasError = (code) => !!props.errors?.[`${code}.title`];

const buttonClass = (code) => [
    "flex items-center space-x-3 p-2 px-4 rounded-md text-sm text-gray-500 transition duration-150 ease-in-out",
    "",
    code === selected.value
        ? "ring-2 ring-blue-500 border-blue-500"
        : "hover:bg-slate-100",
    hasError(code) ? "text-red-500 ring-2 ring-red-500" : "",
];

// Logic
const changeTab = (code) => {
    selected.value = code;
};

watch(selected, (newVal) => {
    emit("update:modelValue", newVal);
});
</script>
