<script setup>
import { ref, onMounted, nextTick } from "vue";
import useMediaService from "@/Composables/useMediaService";
import ImageList from "@/Components/Admin/ImageList.vue";
import ImageUploader from "@/Components/Admin/ImageUploader.vue";

const props = defineProps({
    modelId: Number,
    modelType: String,
    collection: String,
});

const images = ref([]);

// Обчислюємо мета-дані, щоб уникнути undefined
const meta = {
    model_id: props.modelId,
    model_type: props.modelType || "Product",
    collection: props.collection || "images",
};

const { uploadMedia, getMedia, deleteMedia, sortMedia, uploadErrors } =
    useMediaService(meta);

onMounted(async () => {
    if (!props.modelId) return;
    try {
        const data = await getMedia("/api/media");
        // Переконайтеся, що ми записуємо саме масив
        images.value = data?.media || [];
    } catch (e) {
        console.error("Failed to fetch media", e);
    }
});

const handleUpload = async (files) => {
    const filesArray = Array.from(files);

    for (const file of filesArray) {
        // Створюємо Blob URL заздалегідь
        const objectUrl = URL.createObjectURL(file);
        const tempId = `temp-${Math.random().toString(36).substring(2)}`;

        const tempImage = {
            id: tempId,
            url: objectUrl,
            progress: 0,
            isUploading: true,
            name: file.name,
        };

        // Використовуємо деструктуризацію для забезпечення реактивності
        images.value = [...images.value, tempImage];

        try {
            const result = await uploadMedia(
                "/api/media",
                [file],
                (percent) => {
                    // Знаходимо об'єкт у масиві та оновлюємо прогрес
                    const target = images.value.find(
                        (img) => img.id === tempId,
                    );
                    if (target) target.progress = percent;
                },
            );

            if (result?.media?.length > 0) {
                const index = images.value.findIndex(
                    (img) => img.id === tempId,
                );
                if (index !== -1) {
                    // Використовуємо splice для гарантованої реактивності заміни
                    images.value.splice(index, 1, {
                        ...result.media[0],
                        isUploading: false,
                    });
                }
            }
            URL.revokeObjectURL(objectUrl);
        } catch (e) {
            images.value = images.value.filter((img) => img.id !== tempId);
            URL.revokeObjectURL(objectUrl);
        }
    }
};

const handleReorder = async (newImages) => {
    // Миттєве візуальне оновлення
    images.value = newImages;

    const order = {};
    newImages.forEach((img, i) => {
        // Відправляємо сортування тільки для збережених у БД фото (числові ID)
        if (typeof img.id === "number" || !isNaN(img.id)) {
            order[img.id] = i + 1;
        }
    });

    if (Object.keys(order).length > 0) {
        await sortMedia("/api/media/sort", order);
    }
};

const handleDelete = async (id) => {
    // Якщо ID тимчасовий (ще вантажиться), просто видаляємо з масиву
    if (String(id).startsWith("temp-")) {
        images.value = images.value.filter((img) => img.id !== id);
        return;
    }

    try {
        await deleteMedia(`/api/media/${id}`);
        images.value = images.value.filter((img) => img.id !== id);
    } catch (e) {
        console.error("Delete failed", e);
    }
};
</script>

<template>
    <div class="space-y-4">
        <div
            v-if="uploadErrors && Object.keys(uploadErrors).length > 0"
            class="p-3 bg-red-50 border border-red-200 rounded-lg"
        >
            <p
                v-for="(errors, field) in uploadErrors"
                :key="field"
                class="text-red-600 text-xs"
            >
                {{ errors[0] }}
            </p>
        </div>

        <ImageList
            :images="images"
            @reorder="handleReorder"
            @delete="handleDelete"
        />

        <ImageUploader @uploaded="handleUpload" />
    </div>
</template>
