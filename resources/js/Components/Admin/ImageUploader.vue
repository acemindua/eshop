<template>
    <div
        class="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-300 ease-in-out"
        :class="[
            isDragActive
                ? 'border-indigo-500 bg-indigo-50 text-indigo-600'
                : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-500',
            props.disabled ? 'opacity-50 cursor-not-allowed grayscale' : '',
        ]"
        @click="!props.disabled && onClick()"
        @dragover.prevent="!props.disabled && (isDragActive = true)"
        @dragleave.prevent="isDragActive = false"
        @drop.prevent="!props.disabled && onDrop($event)"
        role="button"
        aria-label="Upload images"
    >
        <div
            class="flex flex-col items-center justify-center space-y-2 pointer-events-none"
        >
            <svg
                class="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4v16m8-8H4"
                />
            </svg>
            <p class="text-sm font-medium">
                {{ $t("Click to upload") }}
                <span class="text-gray-400 font-normal">{{
                    $t("or drag and drop")
                }}</span>
            </p>
            <p class="text-[10px] text-gray-400 uppercase tracking-wide">
                PNG, JPG, WEBP (MAX. 2MB PER FILE)
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

const props = defineProps({
    disabled: { type: Boolean, default: false },
});

const emit = defineEmits(["uploaded", "error"]);
const fileInput = ref(null);
const isDragActive = ref(false);

const MAX_SIZE_MB = 2;

const onClick = () => fileInput.value?.click();

const processFiles = (files) => {
    const fileArray = Array.from(files);
    const validFiles = [];
    const errors = [];

    fileArray.forEach((file) => {
        if (!file.type.startsWith("image/")) {
            errors.push(`File ${file.name} is not an image.`);
        } else if (file.size > MAX_SIZE_MB * 1024 * 1024) {
            errors.push(`File ${file.name} exceeds ${MAX_SIZE_MB}MB.`);
        } else {
            validFiles.push(file);
        }
    });

    if (errors.length) emit("error", errors);
    if (validFiles.length) emit("uploaded", validFiles);
};

const handleFiles = (event) => {
    processFiles(event.target.files);
    event.target.value = null; // Обов'язковий скид для повторного вибору того ж файлу
};

const onDrop = (event) => {
    isDragActive.value = false;
    processFiles(event.dataTransfer.files || []);
};
</script>
