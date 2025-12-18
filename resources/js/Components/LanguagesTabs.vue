<template>
    <div class="flex flex-col py-4">
        <div v-if="countLanguages">
            <!-- class="text-sm font-semibold sticky top-0" -->
            <ul class="flex space-x-2 mb-2">
                <!-- class="flex md:flex-col md:absolute top-0 -left-20 gap-2 py-2" -->
                <li
                    v-for="(locale, code) in locales"
                    :key="code"
                    class="relative"
                >
                    <button
                        @click.prevent="changeTab(code)"
                        class="px-3 py-2 bg-gray-50 shadow rounded-lg hover:bg-indigo-100 transition-colors duration-200 inline-flex items-center space-x-2 tracking-wide line-clamp-3"
                        :class="{
                            'bg-indigo-50 shadow-inner text-indigo-500':
                                code === selected,
                            'bg-red-300': errors[`${code}.title`],
                        }"
                    >
                        <flag
                            :iso="splitRegion(locale.regional)"
                            :title="locale.name"
                            class="rounded-full text-xl shadow-lg"
                        />

                        <span class="hidden md:block capitalize text-xs">{{
                            locale.name
                        }}</span>
                    </button>

                    <div
                        v-if="errors[`${code}.title`]"
                        class="absolute bottom-2 right-2 flex h-2 w-2"
                    >
                        <span
                            class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"
                        ></span>
                        <span
                            class="relative inline-flex rounded-full h-2 w-2 bg-red-500"
                        ></span>
                    </div>
                </li>
            </ul>
        </div>
        <div>
            <slot />
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { usePage } from "@inertiajs/vue3";

const props = defineProps({
    modelValue: String,
    errors: Object,
    locale: {
        type: String,
        default: "uk",
    },
});

const emit = defineEmits(["update:modelValue"]);

const page = usePage();
const locales = ref(page.props.config.supportedLocales);

const countLanguages = computed(() => {
    return Object.keys(locales).length > 1 ? true : false;
});

const selected = ref(props.modelValue || props.locale);

function splitRegion($region) {
    return $region.split("_")[1].toLowerCase();
}

const changeTab = (item) => {
    selected.value = item;
};

// Слідкування за зміною значення selected та emit події для оновлення modelValue
watch(selected, (newValue) => {
    emit("update:modelValue", newValue);
});
</script>
