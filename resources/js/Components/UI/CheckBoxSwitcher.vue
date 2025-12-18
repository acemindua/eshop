<template>
    <Switch
        :modelValue="modelValue"
        @update:modelValue="onUpdate"
        :class="modelValue ? 'bg-blue-600' : 'bg-gray-200'"
        class="relative inline-flex h-6 w-11 items-center rounded-full z-0"
    >
        <span class="sr-only">Enable toggle</span>
        <span
            :class="modelValue ? 'translate-x-6' : 'translate-x-1'"
            class="inline-block h-4 w-4 transform rounded-full bg-white transition"
        />
    </Switch>
</template>

<script setup>
import { Switch } from "@headlessui/vue";

const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue", "change"]);

function onUpdate(value) {
    emit("update:modelValue", value);
    emit("change", value); // ← важлива частина
}
</script>
