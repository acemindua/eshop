<template>
    <form @submit.prevent="submit">
        <!-- Dropzone -->
        <label
            for="dropzone-file"
            class="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-50 text-gray-500"
        >
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                    class="w-10 h-10 mb-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                </svg>
                <p class="mb-2 text-sm text-gray-500">
                    <span class="font-semibold">{{
                        $t("Click to upload")
                    }}</span>
                    {{ $t("or drag and drop") }}
                </p>
                <p class="text-xs">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
            </div>
            <input
                id="dropzone-file"
                type="file"
                multiple
                class="hidden"
                @change="handleFiles"
            />
        </label>

        <!-- Image previews -->
        <div v-if="previews.length" class="flex flex-wrap gap-2 mt-4">
            <div
                v-for="(preview, index) in previews"
                :key="index"
                class="w-32 h-32 relative border rounded overflow-hidden p-2"
            >
                <img :src="preview.url" class="w-full h-full object-cover" />
                <PrimaryButton
                    @click.prevent="removePreview(index)"
                    class="absolute shadow top-1 w-4 text-white bg-slate-800/25 right-1 hover:bg-red-500 rounded-full flex items-center justify-center"
                    title="Delete image"
                >
                    ×
                </PrimaryButton>
            </div>
        </div>

        <p v-if="errors" class="text-red-500 text-sm mt-2">{{ errors }}</p>
        <!-- Upload button -->
        <div class="mt-4">
            <PrimaryButtonThemes
                type="submit"
                class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                :disabled="loading"
            >
                <template #icon>
                    <IconRotateClockwise2
                        v-if="loading"
                        class="animate-spin"
                        stroke="2"
                    />
                    <IconCloudUp v-else stroke="2" />
                </template>
                <span v-if="loading">{{ $t("Uploading") }}...</span>
                <span v-else>{{ $t("Upload") }}</span>
            </PrimaryButtonThemes>
        </div>
    </form>
</template>

<script setup>
import { ref } from "vue";
import { IconCloudUp, IconRotateClockwise2 } from "@tabler/icons-vue";

import PrimaryButton from "@/Components/PrimaryButton.vue";
import PrimaryButtonThemes from "@/Shared/Themes/App/Components/Buttons/PrimaryButton.vue";

const props = defineProps({
    loading: Boolean,
    errors: String,
});

const emit = defineEmits(["uploaded"]);

const previews = ref([]);
const files = ref([]);

function handleFiles(event) {
    const validFiles = Array.from(event.target.files).filter((file) =>
        file.type.startsWith("image/")
    );

    files.value = validFiles;
    previews.value = validFiles.map((file) => ({
        url: URL.createObjectURL(file),
        file,
    }));
}

function removePreview(index) {
    previews.value.splice(index, 1);
    files.value.splice(index, 1);
}

function submit() {
    if (!files.value.length) return;
    emit("uploaded", files.value);
    previews.value = [];
    files.value = [];
}
</script>
