<script setup>
import { IconX } from "@tabler/icons-vue";
import { watchEffect } from "vue";

const props = defineProps({
    open: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(["close"]);
const onClose = () => emit("close");

// Optional: Add a watchEffect to handle body overflow when results are open
watchEffect(() => {
    if (props.open) {
        document.body.style.overflow = "hidden"; // Prevents scrolling behind the overlay
    } else {
        document.body.style.overflow = ""; // Restores scrolling
    }
});
</script>

<template>
    <div v-show="open" class="relative z-40">
        <div class="absolute top-full w-full pt-2">
            <div class="rounded-md bg-white p-4 shadow-md">
                <p>ResultSearch: {{ open }}</p>
                <ul v-if="true">
                    <li class="py-1">Result 1</li>
                    <li class="py-1">Result 2</li>
                    <li class="py-1">Result 3</li>
                </ul>
                <p v-else class="text-gray-500">No results found.</p>
            </div>
        </div>
    </div>
</template>
