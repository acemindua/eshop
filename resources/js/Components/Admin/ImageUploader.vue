<template>
    <div
        class="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition"
        :class="[
            isDragActive
                ? 'border-indigo-500 bg-indigo-50 text-indigo-600'
                : 'border-gray-300 hover:bg-gray-100 text-gray-500',
        ]"
        @click="onClick"
        @dragover.prevent="onDragOver"
        @dragenter.prevent="onDragEnter"
        @dragleave.prevent="onDragLeave"
        @drop.prevent="onDrop"
    >
        <div
            class="flex flex-col items-center justify-center pt-5 pb-6 pointer-events-none"
        >
            <p class="mb-2 text-sm">
                <span class="font-semibold">{{ $t("Click to upload") }}</span>
                {{ $t("or drag and drop") }}
            </p>
            <p class="text-xs text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x800px)
            </p>
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
const isDragActive = ref(false); // Стан для динамічної зміни стилів рамки

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
    event.target.value = null; // Reset input
};

/**
 * Drag & Drop handlers
 */
const onDragEnter = () => {
    isDragActive.value = true;
};

const onDragOver = () => {
    isDragActive.value = true;
};

const onDragLeave = () => {
    isDragActive.value = false;
};

const onDrop = (event) => {
    isDragActive.value = false;

    // Витягуємо файли з об'єкта події drop
    const files = Array.from(event.dataTransfer?.files || []);

    // Фільтруємо, щоб переконуватися, що це саме зображення (якщо користувач кине txt-файл)
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    if (imageFiles.length) {
        emit("uploaded", imageFiles);
    }

    console.log("uploaded files", imageFiles);
};
</script>
