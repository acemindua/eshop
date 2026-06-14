<script setup>
import { IconMinus, IconPlus } from "@tabler/icons-vue";

const props = defineProps({
    modelValue: { type: Number, required: true },
    max: { type: Number, default: 99 },
});

const emit = defineEmits(["update:modelValue"]);

const increment = () => {
    if (props.modelValue < props.max) {
        emit("update:modelValue", props.modelValue + 1);
    }
};

const decrement = () => {
    if (props.modelValue > 1) {
        emit("update:modelValue", props.modelValue - 1);
    }
};
</script>

<template>
    <div
        class="flex items-center border border-gray-300 rounded-lg h-12 bg-white shadow-sm w-max"
    >
        <button
            @click="decrement"
            aria-label="Зменшити кількість"
            class="px-4 h-full hover:bg-gray-100 transition-colors disabled:opacity-30"
            :disabled="modelValue <= 1"
        >
            <IconMinus :size="18" stroke-width="2" />
        </button>

        <input
            type="number"
            :value="modelValue"
            readonly
            class="w-14 text-center border-none bg-transparent font-bold text-lg focus:ring-0 outline-none"
        />

        <button
            @click="increment"
            aria-label="Збільшити кількість"
            class="px-4 h-full hover:bg-gray-100 transition-colors disabled:opacity-30"
            :disabled="modelValue >= max"
        >
            <IconPlus :size="18" stroke-width="2" />
        </button>
    </div>
</template>
