<script setup>
import { ref, shallowRef, onMounted, computed, readonly } from "vue";
import useMediaService from "@/Composables/useMediaService";
import ImageList from "@/Components/Admin/ImageList.vue";
import ImageUploader from "@/Components/Admin/ImageUploader.vue";

const props = defineProps({
    data: { type: Object, default: () => null },
    isEditing: { type: Boolean, default: false },
    modelType: { type: String, default: "Item" },
    collection: { type: String, default: "images" },
});

const emit = defineEmits(["stateChange", "error"]);

// Використовуємо shallowRef для великих масивів об'єктів
const images = shallowRef([]);

const modelId = computed(() => Number(props.data?.item?.id) || null);

const meta = computed(() => ({
    model_type: props.modelType,
    model_id: modelId.value,
    collection: props.collection,
}));

const { uploadMedia, getMedia, deleteMedia, sortMedia, uploadErrors } =
    useMediaService(meta.value);

onMounted(async () => {
    const baselineImages = props.data?.item?.sorted_images || [];

    // Якщо створюємо новий запис, просто встановлюємо базовий стан
    if (!props.isEditing || !modelId.value) {
        images.value = [...baselineImages];
        return;
    }

    try {
        const response = await getMedia("/api/media", { params: meta.value });
        images.value = response?.media ?? baselineImages;
    } catch (error) {
        console.error("[MediaForm] Sync failed:", error);
        images.value = [...baselineImages];
        emit("error", "Failed to sync media from server.");
    }
});

const handleUpload = async (files) => {
    const filesArray = Array.isArray(files) ? files : Array.from(files);

    for (const file of filesArray) {
        const tempId = `temp-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
        const tempImage = {
            id: tempId,
            url: URL.createObjectURL(file),
            progress: 0,
            isUploading: true,
        };

        images.value = [...images.value, tempImage];

        try {
            const result = await uploadMedia(
                "/api/media",
                [file],
                (percent) => {
                    images.value = images.value.map((img) =>
                        img.id === tempId ? { ...img, progress: percent } : img,
                    );
                },
            );

            // --- ДОДАЙТЕ ЦЕЙ LOG ТА ПЕРЕВІРТЕ КОНСОЛЬ ---
            console.log("Отримано відповідь від сервера:", result);
            // ------------------------------------------

            // Логіка оновлення стану
            // Перевіряємо, чи повернув сервер щось валідне
            const mediaItem = result?.media?.[0] || result?.data?.[0] || result;

            if (mediaItem && mediaItem.id) {
                images.value = images.value.map((img) =>
                    img.id === tempId
                        ? { ...mediaItem, isUploading: false, progress: 100 }
                        : img,
                );
                emit("stateChange", { action: "upload", data: mediaItem });
            } else {
                throw new Error("Invalid server response structure");
            }
        } catch (error) {
            console.error("[MediaForm] Помилка обробки результату:", error);
            images.value = images.value.filter((img) => img.id !== tempId);
            emit(
                "error",
                "Завантаження завершено, але не вдалося оновити список.",
            );
        }
    }
};

const handleReorder = async (newImages) => {
    images.value = newImages;
    const orderedIds = newImages
        .filter((img) => typeof img.id === "number")
        .map((img) => img.id);

    try {
        await sortMedia("/api/media/sort", orderedIds);
        emit("stateChange", { action: "reorder", data: orderedIds });
    } catch (error) {
        emit("error", "Sorting update failed.");
    }
};

const handleDelete = async (id) => {
    if (String(id).startsWith("temp-")) {
        images.value = images.value.filter((img) => img.id !== id);
        return;
    }

    try {
        await deleteMedia(`/api/media/${id}`);
        images.value = images.value.filter((img) => img.id !== id);
        emit("stateChange", { action: "delete", data: id });
    } catch (error) {
        emit("error", "Deletion failed.");
    }
};
</script>

<template>
    <div class="media-orchestrator space-y-6">
        <div
            v-if="uploadErrors && Object.keys(uploadErrors).length"
            class="p-4 bg-red-50 border border-red-200 rounded-lg"
        >
            <ul class="text-xs text-red-600">
                <li v-for="(err, key) in uploadErrors" :key="key">
                    {{ err[0] }}
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
            :disabled="!modelId && props.isEditing"
            @uploaded="handleUpload"
            @error="(errs) => emit('error', errs)"
        />
    </div>
</template>
