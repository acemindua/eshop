<!-- Shared/Themes/App/Components/Buttons/ImportButton -->
<script setup>
import { onMounted, ref } from "vue";

defineProps({
    modelValue: {
        type: String,
    },
});

defineEmits(["update:modelValue"]);

const input = ref(null);

onMounted(() => {
    if (input.value.hasAttribute("autofocus")) {
        input.value.focus();
    }
});

defineExpose({ focus: () => input.value.focus() });
</script>

<template>
    <div class="group relative duration-300">
        <svg
            width="20"
            height="20"
            fill="currentColor"
            class="absolute left-3 top-1/2 -mt-2.5 text-gray-400 pointer-events-none group-focus-within:text-indigo-300"
            aria-hidden="true"
        >
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            />
        </svg>
        <input
            type="search"
            name="search"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            ref="input"
            class="dark:bg-slate-900 focus:ring-2 focus:ring-indigo-400 focus:outline-none appearance-none w-full text-sm leading-6 text-gray-600 placeholder-slate-400 rounded-lg py-2 pl-10 ring-1 ring-gray-200 dark:ring-slate-600 shadow-sm border-0 dark:text-slate-200"
            aria-label="Filter projects"
            :placeholder="`${$t('Filter')} ...`"
        />
    </div>
</template>
