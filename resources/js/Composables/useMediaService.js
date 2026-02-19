import { ref } from "vue";
import axios from "axios";

export default function useMediaService(meta) {
    const uploadingMedia = ref(false);
    const uploadErrors = ref({});
    const uploadingProgress = ref(0); // Загальний прогрес (для бару зверху)

    const handleRequest = async (fn, fallback = "Сталася помилка.") => {
        uploadingMedia.value = true;
        uploadErrors.value = {};

        try {
            const response = await fn();
            return response.data; // Відразу повертаємо дані
        } catch (e) {
            const res = e.response;
            if (res?.status === 422 && res.data?.errors) {
                uploadErrors.value = res.data.errors;
            } else {
                uploadErrors.value = {
                    general: [res?.data?.message || e.message || fallback],
                };
            }
            throw e;
        } finally {
            uploadingMedia.value = false;
        }
    };

    const getMedia = async (url) => {
        return handleRequest(
            () => axios.get(url, { params: meta }),
            "Не вдалося завантажити медіа.",
        );
    };

    const uploadMedia = async (url, files, onFileProgress = () => {}) => {
        const formData = new FormData();
        files.forEach((f) => formData.append("files[]", f));

        // Додаємо мета-дані з об'єкта meta
        Object.keys(meta).forEach((key) => formData.append(key, meta[key]));

        return handleRequest(() =>
            axios.post(url, formData, {
                onUploadProgress: (e) => {
                    if (e.lengthComputable) {
                        uploadingProgress.value = Math.round(
                            (e.loaded * 100) / e.total,
                        );
                        onFileProgress(uploadingProgress.value);
                    }
                },
            }),
        );
    };

    const sortMedia = async (url, order) => {
        return handleRequest(
            () => axios.post(url, { ...meta, order }),
            "Не вдалося змінити порядок.",
        );
    };

    const deleteMedia = async (url) => {
        return handleRequest(
            () => axios.delete(url),
            "Не вдалося видалити елемент.",
        );
    };

    return {
        uploadingMedia,
        uploadErrors,
        uploadingProgress,
        getMedia,
        uploadMedia,
        sortMedia,
        deleteMedia,
    };
}
