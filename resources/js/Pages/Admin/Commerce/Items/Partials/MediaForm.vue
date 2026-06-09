<script setup>
import { ref, onMounted, computed, readonly } from "vue";
import useMediaService from "@/Composables/useMediaService";
import ImageList from "@/Components/Admin/ImageList.vue";
import ImageUploader from "@/Components/Admin/ImageUploader.vue";

// Enforce strict component communication boundaries via TypeScript-like standard types
const props = defineProps({
    data: {
        type: Object,
        default: () => null,
    },
    isEditing: {
        type: Boolean,
        default: false,
    },
    modelType: {
        type: String,
        default: "Item",
    },
    collection: {
        type: String,
        default: "images",
    },
});

// Define explicit emits if this orchestrator scales into a wizard or sub-form pipeline
const emit = defineEmits(["stateChange", "error"]);

const images = ref([]);

/**
 * Computed Guard: Memoizes and safely unpacks the host model record identifier.
 */
const modelId = computed(() => Number(props.data?.item?.id) || null);

/**
 * Resource Metadata: Abstracted polymorphic context block required by the network service.
 */
const meta = computed(() => ({
    model_type: props.modelType,
    model_id: modelId.value,
    collection: props.collection,
}));

// Initialize unified reactive decoupling hook from composition layer
const { uploadMedia, getMedia, deleteMedia, sortMedia, uploadErrors } =
    useMediaService(meta.value);

/**
 * Life Cycle Hook: Orchestrates contextual data extraction or fallback mapping on mount.
 */
onMounted(async () => {
    const baselineImages = props.data?.item?.sorted_images;

    if (!props.isEditing || !modelId.value) {
        if (baselineImages) {
            images.value = [...baselineImages];
        }
        return;
    }

    try {
        const params = new URLSearchParams({
            model_type: props.modelType,
            model_id: String(modelId.value),
            collection: props.collection,
        });

        const response = await getMedia("/api/media", { params });
        images.value = response?.media || baselineImages || [];
    } catch (error) {
        console.error(
            "[MediaForm] API synchronization failed, executing local state hydration:",
            error,
        );
        if (baselineImages) {
            images.value = [...baselineImages];
        }
        emit("error", "Failed to pull cloud media assets.");
    }
});

/**
 * Handle Asset Ingestion: Processes incoming payloads sequentially, tracking progression states.
 * Uses atomic array indexing to mitigate race conditions during simultaneous asynchronous chunk streams.
 * * @param {FileList|Array<File>} files
 */
const handleUpload = async (files) => {
    const filesArray = files instanceof FileList ? Array.from(files) : files;

    if (!filesArray || filesArray.length === 0) {
        console.warn(
            "[MediaForm] Asset upload rejected: Received void or corrupted target structures.",
        );
        return;
    }

    for (const file of filesArray) {
        const objectUrl = URL.createObjectURL(file);
        const tempId = `temp-${Math.random().toString(36).substring(2, 11)}`;

        const tempImage = {
            id: tempId,
            url: objectUrl,
            progress: 0,
            isUploading: true,
            name: file.name,
        };

        // Thread-safe update of current media array pointer layout
        images.value = [...images.value, tempImage];

        try {
            const result = await uploadMedia(
                "/api/media",
                [file],
                (percent) => {
                    // Micro-optimization: directly modify targeting element instance parameters to skip global array rebuilds
                    const target = images.value.find(
                        (img) => img.id === tempId,
                    );
                    if (target) {
                        target.progress = percent;
                    }
                },
            );

            if (result?.media && result.media.length > 0) {
                images.value = images.value.map((img) =>
                    img.id === tempId
                        ? { ...result.media[0], isUploading: false }
                        : img,
                );
                emit("stateChange", {
                    action: "upload",
                    data: result.media[0],
                });
            }
        } catch (error) {
            console.error(
                `[MediaForm] Hard failure processing attachment binary: ${file.name}`,
                error,
            );
            images.value = images.value.filter((img) => img.id !== tempId);
        } finally {
            URL.revokeObjectURL(objectUrl);
        }
    }
};

/**
 * Handle Sequence Alignment: Commits transactional reordering operations upstream.
 * * @param {Array<Object>} newImages
 */
const handleReorder = async (newImages) => {
    if (!Array.isArray(newImages)) return;

    images.value = newImages;

    // Filter local transient memory components to build a flat list of actual primary keys
    const orderedIds = images.value
        .filter((img) => img?.id && !String(img.id).startsWith("temp-"))
        .map((img) => Number(img.id));

    if (orderedIds.length > 1) {
        try {
            // Decoupled layer communication: service encapsulates meta mapping autonomously
            await sortMedia("/api/media/sort", orderedIds);
            emit("stateChange", { action: "reorder", data: orderedIds });
        } catch (error) {
            console.error(
                "[MediaForm] Synchronous sorting transaction failed downstream:",
                error,
            );
        }
    }
};

/**
 * Handle Asset Purging: Performs hard database or temporary layout component extractions.
 * * @param {number|string} id
 */
const handleDelete = async (id) => {
    const isTransient = String(id).startsWith("temp-");

    if (isTransient) {
        images.value = images.value.filter((img) => img.id !== id);
        return;
    }

    try {
        await deleteMedia(`/api/media/${id}`);
        images.value = images.value.filter((img) => img.id !== id);
        emit("stateChange", { action: "delete", data: id });
    } catch (error) {
        console.error(
            `[MediaForm] Deletion contract rejected by upstream service for entity identifier: ${id}`,
            error,
        );
    }
};
</script>

<template>
    <div class="media-orchestrator-layout space-y-6">
        <div
            v-if="uploadErrors && Object.keys(uploadErrors).length > 0"
            class="p-4 bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-lg shadow-sm"
        >
            <h5
                class="text-xs font-bold uppercase tracking-wider text-red-800 mb-2"
            >
                Media Upload Failures
            </h5>
            <ul class="list-disc pl-5 space-y-1">
                <li
                    v-for="(errors, key) in uploadErrors"
                    :key="key"
                    class="text-xs font-mono text-red-600"
                >
                    {{ errors[0] }}
                </li>
            </ul>
        </div>

        <ImageList
            :images="readonly(images)"
            :is-editing="props.isEditing"
            @reorder="handleReorder"
            @delete="handleDelete"
        />

        <ImageUploader
            :errors="uploadErrors"
            :disabled="!modelId && props.isEditing"
            @uploaded="handleUpload"
        />
    </div>
</template>
