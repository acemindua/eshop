<script setup>
import { computed, useSlots } from "vue";
import { Link } from "@inertiajs/vue3";

const props = defineProps({
    href: { type: String, required: true },
    active: { type: Boolean, default: false },
    showText: { type: Boolean, default: true },
    title: { type: String, default: "" },
    class: { type: String, default: "" }, // Класи для li
    iconClass: { type: String, default: "" },
    textClass: { type: String, default: "" },
});

const slots = useSlots();

// Стилі для контейнера li
const liClasses = computed(() => [
    "group list-none transition-all duration-200 ease-in-out cursor-pointer text-sm px-4",
    props.active ? "bg-gray-100" : "",
    props.class,
]);

// Стилі для іконки
const iconWrapperClasses = computed(() => [
    "py-2",
    props.active
        ? "text-brand"
        : "text-gray-500 group-hover:text-brand transition duration-300 ease-out",
    props.iconClass,
]);

// Текст для тултіпа (коли меню згорнуте)
const tooltipText = computed(() => {
    if (props.title) return props.title;
    return slots.default ? slots.default()[0]?.children : "";
});
</script>

<template>
    <li :class="liClasses" :title="!showText ? tooltipText : ''">
        <Link
            :href="href"
            class="flex items-center space-x-2 w-full outline-none"
            :aria-current="active ? 'page' : undefined"
        >
            <!-- Icon Section -->
            <span :class="iconWrapperClasses">
                <slot name="icon" />
            </span>

            <!-- Text Section with Transition -->
            <Transition
                enter-active-class="transition duration-300 ease-out"
                enter-from-class="opacity-0 -translate-x-2"
                enter-to-class="opacity-100 translate-x-0"
                leave-active-class="transition duration-100 ease-in"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
            >
                <span
                    v-if="showText"
                    class="flex items-center font-medium text-sm whitespace-nowrap overflow-hidden text-ellipsis transition-colors duration-200"
                    :class="[
                        active
                            ? 'text-slate-900 dark:text-white'
                            : 'text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200',
                        textClass,
                    ]"
                >
                    <slot />
                </span>
            </Transition>
        </Link>
    </li>
</template>
