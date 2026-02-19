<template>
    <div
        class="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition hover:bg-gray-100"
        @click="onClick"
    >
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <p class="mb-2 text-sm text-gray-500">
                <span class="font-semibold">{{ $t("Click to upload") }}</span>
                {{ $t("or drag and drop") }}
            </p>
            <p class="text-xs">SVG, PNG, JPG or GIF (MAX. 800x800px)</p>
        </div>
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
