<script setup>
import ImageList from "@/Components/Images/ImageList.vue";
import { onBeforeMount } from "vue";
import useMediaService from "@/Composables/useMediaService";
import { ref } from "vue";
import ImageUploader from "@/Components/Images/ImageUploader.vue";

const props = defineProps({
    data: { type: Object },
    errors: { type: Object },
});

const images = ref([]);

// Media service
const { getMedia, deleteMedia, sortMedia, uploadMedia } = useMediaService({
    model_type: "Product",
    model_id: props.data.id,
    collection: "images",
});

// Fetch images (optional: if dynamic reload is needed)
const fetchImages = async () => {
    const res = await getMedia(route("media.index"));
    images.value = res?.data?.media || [];
};

// Handle image upload
const handleUpload = async (files) => {
    const url = route("media.store"); // ensure this route exists
    await uploadMedia(url, files);
    await fetchImages();
};

// Handle reordering
const handleReorder = async (order) => {
    const url = route("media.sort");
    await sortMedia(url, order);
    await fetchImages();
};

// Delete image
const deleteImage = async (imageId) => {
    const url = route("media.destroy", imageId);
    console.log(url);
    await deleteMedia(url);
    // Optionally trigger refetch if you aren't syncing `data.images` manually
    await fetchImages();
};

onBeforeMount(() => fetchImages());
</script>

<template>
    <div class="border bg-white p-4 md:p-8 md:flex rounded-lg mb-2 md:gap-4">
        <div class="w-full md:w-1/4 mb-2">
            <h2 class="uppercase font-semibold">Images</h2>
            <span class="py-2 text-sm text-gray-600"
                >This section allows you to upload and arrange product
                images.</span
            >
        </div>
        <div class="w-full flex flex-col space-y-4">
            <!-- Image List -->
            <ImageList
                :images="images || []"
                @delete="deleteImage"
                @reorder="handleReorder"
            />

            <!-- Image Uploader -->
            <ImageUploader @uploaded="handleUpload" />
        </div>
    </div>
</template>
