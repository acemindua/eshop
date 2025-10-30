<script setup>
import {
    ref,
    watch,
    defineExpose,
    defineProps,
    defineEmits,
    onMounted,
} from "vue";

const props = defineProps({
    modelValue: {
        type: [String, Number, null],
        required: true,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(["update:modelValue"]);

const input = ref(null);

const internalValue = ref(props.modelValue);

watch(
    () => props.modelValue,
    (newVal) => {
        internalValue.value = newVal;
    }
);

watch(internalValue, (newVal) => {
    emit("update:modelValue", newVal);
});

onMounted(() => {
    if (input.value?.hasAttribute("autofocus") && !props.disabled) {
        input.value.focus();
    }
});

defineExpose({
    focus: () => {
        if (!props.disabled) input.value?.focus();
    },
});
</script>

<template>
    <input
        class="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        v-model="internalValue"
        ref="input"
        :disabled="disabled"
    />
</template>
