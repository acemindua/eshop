<script setup>
import { computed } from "vue";

const props = defineProps({
    href: { type: String, required: true },
    active: { type: Boolean, default: false },
    class: { type: String, default: "" }, // додаткові класи ззовні
    iconClass: { type: String, default: "" }, // додаткові класи для іконки
    textClass: { type: String, default: "" }, // додаткові класи для тексту
});

const baseClasses =
    "inline-flex items-center p-1 px-2 rounded-lg text-sm leading-5 text-slate-600 transition duration-150 ease-in-out hover:bg-slate-100";
const activeClasses = "bg-slate-100";
const classes = computed(
    () => `${baseClasses} ${props.active ? activeClasses : ""} ${props.class}`
);
</script>

<template>
    <Link :href="href" :class="classes">
        <span
            class="mr-2 flex items-center"
            :class="[active ? 'text-blue-700' : '', iconClass]"
        >
            <slot name="icon" />
        </span>
        <span class="flex items-center text-slate-600" :class="textClass">
            <slot />
        </span>
    </Link>
</template>
