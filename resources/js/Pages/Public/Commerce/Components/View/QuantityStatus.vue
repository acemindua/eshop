<template>
    <div
        class="flex items-center gap-1.5 text-xs font-medium"
        :class="status.textColor"
    >
        <component
            :is="status.icon"
            class="w-4 h-4"
            :class="status.iconColor"
        />
        <span>{{ $t(status.label) }}</span>
    </div>
</template>

<script setup>
import { computed } from "vue";
import { IconChecks, IconCancel } from "@tabler/icons-vue";

const props = defineProps({
    q: {
        type: Number,
        required: true,
    },
});

const status = computed(() => {
    const isInStock = props.q > 0;
    return {
        icon: isInStock ? IconChecks : IconCancel,
        label: isInStock ? "inStoke" : "Out of stock",
        textColor: isInStock ? "text-green-600" : "text-gray-400",
        iconColor: isInStock ? "text-green-600" : "text-gray-400",
    };
});
</script>
