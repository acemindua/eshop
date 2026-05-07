<script setup>
import { computed } from "vue";
import { Link } from "@inertiajs/vue3"; // Переконайся, що імпортував Link

const props = defineProps({
    href: { type: String, required: true },
    active: { type: Boolean, default: false },
    showText: { type: Boolean, default: true }, // Новий пропс для керування видимістю тексту
    class: { type: String, default: "" },
    iconClass: { type: String, default: "" },
    textClass: { type: String, default: "" },
});

const baseClasses =
    "inline-flex space-x-2 w-full items-center p-2 rounded-lg text-sm leading-5 transition duration-150 ease-in-out hover:bg-slate-100 dark:hover:bg-slate-800";

// Додамо стилі для активного стану (наприклад, колір тексту або фону)
const activeClasses = "";

const classes = computed(
    () =>
        `${baseClasses} ${props.active ? activeClasses : "text-slate-600 dark:text-slate-400"} ${props.class}`,
);
</script>

<template>
    <Link
        :href="href"
        :class="classes"
        :title="!showText ? $slots.default()[0].children : ''"
    >
        <span
            class="flex items-center justify-center shrink-0 transition duration-150 ease-in-out"
            :class="[active ? 'text-brand' : '', iconClass]"
        >
            <slot name="icon" />
        </span>

        <Transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="opacity-0 -translate-x-2"
            enter-to-class="opacity-100 translate-x-0"
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <span
                v-if="showText"
                class="flex items-center whitespace-nowrap overflow-hidden"
                :class="textClass"
            >
                <slot />
            </span>
        </Transition>
    </Link>
</template>
