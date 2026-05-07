<script setup>
defineProps({
    modelValue: [String, Number],
    label: String,
    type: { type: String, default: "text" },
    placeholder: String,
    error: String,
    readonly: Boolean,
});
defineEmits(["update:modelValue"]);
</script>

<template>
    <div class="flex flex-col w-full">
        <label
            v-if="label"
            class="text-[10px] uppercase tracking-widest text-gray-400 mb-1.5 font-bold"
        >
            {{ label }}
        </label>
        <input
            :type="type"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            :placeholder="placeholder"
            :readonly="readonly"
            class="border-gray-300 focus:border-black focus:ring-0 transition-colors py-2.5 px-3 text-sm rounded-none outline-none"
            :class="{
                'border-red-500': error,
                'bg-gray-50 opacity-70 cursor-not-allowed': readonly,
            }"
            autocomplete="off"
        />
        <span
            v-if="error"
            class="text-red-500 text-[10px] mt-1 uppercase font-bold tracking-tighter"
        >
            {{ error }}
        </span>
    </div>
</template>
