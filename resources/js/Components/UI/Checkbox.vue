<script setup>
import { computed } from "vue";

const emit = defineEmits(["update:checked"]);

const props = defineProps({
    checked: {
        type: [Array, Boolean, Number], // Додав Number, бо ID часто приходять як числа
        required: true,
    },
    value: {
        default: null,
    },
});

const proxyChecked = computed({
    get() {
        return props.checked;
    },
    set(val) {
        emit("update:checked", val);
    },
});
</script>

<template>
    <input
        type="checkbox"
        :value="value"
        v-model="proxyChecked"
        class="w-4 h-4 rounded border-slate-300 dark:border-slate-700 
               text-brand focus:ring-brand focus:ring-offset-0 
               dark:bg-slate-800 dark:checked:bg-brand
               transition duration-150 ease-in-out cursor-pointer"
    />
</template>