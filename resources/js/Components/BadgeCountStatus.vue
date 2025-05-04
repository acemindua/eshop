<template>
    <div class="inline-block text-xs px-2 rounded border" :class="badgeClass">
        {{ count }}
    </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
    count: { type: Number, default: 0 },
});

const badgeClass = computed(() => {
    if (props.count < 0) return "bg-red-500 text-white border-red-600";
    if (props.count === 0) return "bg-orange-500 text-white border-orange-600";
    return "bg-green-500 text-white border-green-600";
});
</script>
