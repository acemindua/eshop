<template>
    <div class="border bg-gray-100 p-4 md:p-8 md:flex rounded-lg mb-2 md:gap-4">
        <div class="w-full md:w-1/4 mb-2">
            <h2 class="uppercase font-semibold">Images</h2>
            <span class="py-2 text-sm text-gray-600"
                >This section allows you to upload and arrange product
                images.</span
            >
        </div>
        <div class="w-full">
            <!-- Image List -->
            <ImageList
                v-if="images.data"
                :images="images.data"
                @delete="deleteImage"
                @reorder="handleReorder"
                :loading="loading"
                :errors="errors"
            />
        </div>
    </div>

    <div class="border p-4 md:p-8 flex rounded-lg mb-4 gap-4 bg-white">
        <div class="w-full md:w-1/4">
            <h2 class="font-semibold">{{ $t("Upload") }}</h2>
            <span class="py-2 text-sm text-gray-600"
                >{{ $t("Upload new image") }}.
                <small class="italic block">
                    {{
                        $t(
                            "The first image will be used as the primary image for your product."
                        )
                    }}</small
                ></span
            >
        </div>
        <div class="w-full">
            <!-- Upload form -->
            <ImageUploadForm
                @uploaded="handleUpload"
                :loading="loading"
                :errors="errors"
            />
        </div>
    </div>

    <div class="w-full">
        <div class="mt-6"></div>
        <!-- Error display -->
        <p v-if="errors" class="text-red-500 text-sm mt-2">{{ errors }}</p>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import useImageService from "@/Composables/useImageService";
import ImageList from "./ImageList.vue";
import ImageUploadForm from "./ImageUploadForm.vue";

const props = defineProps({
    data: { type: Object },
    errors: { type: Object },
});

const { get, sort, destroy, upload, errors, loading } = useImageService();
const images = ref([]);

onMounted(fetchImages);

async function fetchImages() {
    images.value = await get(route("products.media", props.data.id));
}

async function handleUpload(filesArray) {
    await upload(route("products.media.store", props.data.id), filesArray);
    fetchImages(); // Fetch images after uploading
}

async function deleteImage(imageId) {
    await destroy(route("products.media.delete", [props.data.id, imageId]));
    images.value.data = images.value.data.filter(
        (image) => image.id !== imageId
    );
}

async function handleReorder(order) {
    await sort(route("products.media.sort", props.data.id), order);
    fetchImages();
}
</script>
