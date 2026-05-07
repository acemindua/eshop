<!-- Partials/PaymentMethods.vue -->
<template>
    <div class="space-y-3">
        <div
            v-for="method in methods"
            :key="method.code"
            @click="updateValue(method.code)"
            class="group relative flex cursor-pointer border p-4 transition-all duration-200"
            :class="[
                modelValue === method.code
                    ? 'border-black bg-gray-50 ring-1 ring-black'
                    : 'border-gray-200 hover:border-gray-400',
            ]"
        >
            <div class="flex h-5 items-center">
                <div
                    class="flex h-4 w-4 items-center justify-center rounded-full border"
                    :class="
                        modelValue === method.code
                            ? 'border-black'
                            : 'border-gray-300'
                    "
                >
                    <div
                        v-if="modelValue === method.code"
                        class="h-2 w-2 rounded-full bg-black"
                    ></div>
                </div>
            </div>

            <div class="ml-4 flex flex-col">
                <span
                    class="text-xs font-bold uppercase tracking-wider"
                    :class="
                        modelValue === method.code
                            ? 'text-black'
                            : 'text-gray-500'
                    "
                >
                    {{ method.label }}
                </span>
                <span
                    v-if="method.description"
                    class="mt-1 text-[11px] text-gray-400 leading-relaxed"
                >
                    {{ method.description }}
                </span>
            </div>
        </div>

        <InputError
            v-if="errors.payment_method"
            :message="errors.payment_method"
            class="mt-2"
        />
    </div>
</template>

<script setup>
import InputError from "@/Components/UI/InputError.vue";

const props = defineProps({
    methods: Array,
    errors: Object,
});

const modelValue = defineModel();

const updateValue = (code) => {
    modelValue.value = code;
};
</script>
