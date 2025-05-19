<template>
    <div class="border p-4 bg-white rounded-lg relative">
        <h1 class="text-xs font-semibold pb-2">
            #{{ data.id }} – {{ data.attribute.title }} ({{
                data.attribute_value.title
            }})
        </h1>

        <div class="border p-4 bg-gray-50 rounded-lg">
            <small>{{ $t("Details") }}</small>
            <div class="grid grid-cols-2">
                <div>SKU</div>
                <div>{{ data.sku }}</div>
            </div>
            <div class="grid grid-cols-2">
                <div>{{ $t("Price") }}</div>
                <div>{{ data.price }}</div>
            </div>
            <div class="grid grid-cols-2">
                <div>{{ $t("Qty") }}</div>
                <div>{{ data.quantity }}</div>
            </div>
        </div>

        <!-- Image List -->
        <ImageList
            :images="images || []"
            @delete="deleteImage"
            @reorder="handleReorder"
        />

        <!-- Image Uploader -->
        <ImageUploader @uploaded="handleUpload" />

        <PrimaryButton
            @click.prevent="confirmDelete(data.id)"
            class="absolute shadow top-1 w-4 text-white bg-slate-900/25 right-1 hover:bg-red-500 rounded-full flex items-center justify-center"
            title="Delete image"
        >
            ×
        </PrimaryButton>
    </div>

    <!-- Debugging info (local only) -->
    <section v-if="!$page.props.app.env === 'local'">
        <VarDump :data="data" />
    </section>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import Swal from "sweetalert2";
import useMediaService from "@/Composables/useMediaService";
import ImageList from "@/Components/Images/ImageList.vue";
import ImageUploader from "@/Components/Images/ImageUploader.vue";
import VarDump from "@/Shared/VarDump.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";

// Props
const props = defineProps({
    data: Object,
    errors: Object,
});

const emit = defineEmits(["delete"]);
const images = ref([]);

// Media service
const { getMedia, deleteMedia, sortMedia, uploadMedia } = useMediaService({
    model_type: "ProductVariant",
    model_id: props.data.id,
    collection: "images",
});

/**
 * Confirm before delete
 */
const confirmDelete = async (dataId) => {
    const result = await Swal.fire({
        title: "Are you sure?",
        text: "This item will be permanently deleted!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
        emit("delete", dataId);
    }
};

// Fetch images (optional: if dynamic reload is needed)
const fetchImages = async () => {
    const res = await getMedia(route("media.index"));
    images.value = res.data.media;
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
