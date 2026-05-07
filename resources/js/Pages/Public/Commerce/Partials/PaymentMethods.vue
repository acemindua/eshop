<script setup>
const props = defineProps({
    modelValue: String, // Значення вибраного методу (напр. 'card', 'cash')
    methods: Array, // Масив доступних методів з бекенду
    errors: Object,
});

const emit = defineEmits(["update:modelValue"]);

const selectMethod = (code) => {
    emit("update:modelValue", code);
};
</script>

<template>
    <div class="bg-white border border-gray-200 p-6">
        <div class="grid grid-cols-1 gap-3">
            <div
                v-for="method in methods"
                :key="method.code"
                @click="selectMethod(method.code)"
                :class="[
                    'relative flex items-center p-4 cursor-pointer transition-all border',
                    modelValue === method.code
                        ? 'border-black bg-gray-50'
                        : 'border-gray-200 hover:border-gray-400',
                ]"
            >
                <div class="mr-4 flex items-center justify-center">
                    <div
                        class="w-4 h-4 border border-black flex items-center justify-center"
                        :class="
                            modelValue === method.code ? 'bg-black' : 'bg-white'
                        "
                    >
                        <div
                            v-if="modelValue === method.code"
                            class="w-1.5 h-1.5 bg-white"
                        ></div>
                    </div>
                </div>

                <div class="flex-grow">
                    <p class="text-sm font-bold uppercase tracking-tight">
                        {{ method.label }}
                    </p>
                    <p
                        v-if="method.description"
                        class="text-xs text-gray-500 mt-1"
                    >
                        {{ method.description }}
                    </p>
                </div>

                <div v-if="method.icon" class="ml-auto opacity-60">
                    <component :is="method.icon" class="w-6 h-6" />
                </div>
            </div>
        </div>

        <p v-if="errors?.payment_method" class="text-red-500 text-xs mt-3">
            {{ errors.payment_method }}
        </p>
    </div>
</template>

<style scoped>
/* У вашому стилі: жодних заокруглень */
div {
    border-radius: 0 !important;
}
</style>
