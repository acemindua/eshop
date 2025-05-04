<template>
    <div
        class="inline-block px-4 border rounded-lg text-center text-xs py-1"
        :class="classes"
    >
        <span v-if="active"> Active </span>
        <span v-else> Disabled </span>
    </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
    active: [Number, Boolean],
});

const classes = computed(() =>
    props.active
        ? "bg-green-50 border-green-500 text-green-600"
        : "bg-slate-50 border-slate-200 text-slate-600"
);
</script>
