<script setup>
import { computed } from "vue";

const props = defineProps({
    modelValue: {
        type: [String, Number, Boolean],
        required: true,
    },
    value: {
        type: [String, Number, Boolean],
        required: true,
    },
});

const emit = defineEmits(["update:modelValue"]);

const proxyChecked = computed({
    get() {
        return props.modelValue;
    },
    set(val) {
        emit("update:modelValue", val);
    },
});
</script>

<template>
    <input
        type="radio"
        :value="value"
        v-model="proxyChecked"
        class="w-4 h-4 border-slate-300 text-brand focus:ring-brand focus:ring-offset-0 dark:border-slate-700 dark:bg-slate-800 dark:checked:bg-brand transition duration-150 ease-in-out cursor-pointer"
    />
</template>
