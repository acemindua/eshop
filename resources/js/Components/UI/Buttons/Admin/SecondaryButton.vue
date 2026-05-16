<script setup>
import { Link } from "@inertiajs/vue3";
import { computed } from "vue";

const props = defineProps({
    as: {
        type: String,
        default: "button",
    },
    action: {
        type: String, // 'import', 'cancel', 'add'
    },
});

const actionClasses = computed(() => {
    switch (props.action) {
        case "import":
            // М'який Slate стиль для системних дій
            return "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900 hover:border-slate-300 shadow-sm";
        case "cancel":
            return "bg-white text-gray-500 border-gray-200 hover:bg-gray-50 hover:text-gray-700";
        case "add":
            return "bg-emerald-50/50 text-emerald-700 border-emerald-100 hover:bg-emerald-50 hover:border-emerald-200";
        default:
            return "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-800 shadow-sm";
    }
});
</script>

<template>
    <component
        :is="as === 'Link' ? Link : 'button'"
        v-bind="$attrs"
        :class="actionClasses"
        class="group inline-flex items-center justify-center gap-2 rounded-lg border px-3.5 py-2 text-[11px] font-bold uppercase tracking-tight transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-100 focus:ring-offset-1 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.97]"
    >
        <!-- Іконка (наприклад, IconCloudUpload) -->
        <div
            v-if="$slots.icon"
            class="shrink-0 opacity-60 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-[-1px]"
        >
            <slot name="icon" />
        </div>

        <!-- Текст -->
        <span class="leading-none">
            <slot />
        </span>
    </component>
</template>
