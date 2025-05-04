<template>
    <div class="flex text-xs">
        <span class="block rounded-full px-2" :class="classes">
            {{ role }}
        </span>
    </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
    role: {
        type: String,
        default: "auth",
    },
});

const classes = computed(() => {
    switch (props.role) {
        case "auth":
            return "bg-orange-100 text-orange-600";
        case "moder":
            return "bg-red-100 text-red-600";
        case "admin":
            return "bg-sky-100 text-sky-600";

        default:
            return "bg-slate-600 text-white";
    }
});
</script>
