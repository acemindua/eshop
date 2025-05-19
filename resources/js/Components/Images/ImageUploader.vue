<template>
    <div
        class="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition hover:bg-gray-100"
        @click="onClick"
    >
        <p class="text-sm text-gray-500">
            Drag & drop images or
            <span class="font-semibold underline">click to upload</span>
        </p>
        <input
            type="file"
            multiple
            accept="image/*"
            class="hidden"
            ref="fileInput"
            @change="handleFiles"
        />
    </div>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["uploaded"]);

const fileInput = ref(null);

/**
 * Trigger file input click programmatically
 */
const onClick = () => {
    fileInput.value?.click();
};

/**
 * Handle manual file selection via input
 */
const handleFiles = (event) => {
    const files = Array.from(event.target.files);
    if (files.length) {
        emit("uploaded", files);
    }
    event.target.value = null; // Reset input so same file can be selected again
};
</script>
