import { ref } from "vue";
import axios from "axios";

export default function useImageService() {
    const loading = ref(false);
    const errors = ref(null);

    async function handleRequest(fn, fallback = "Something went wrong.") {
        loading.value = true;
        errors.value = null;
        try {
            return await fn();
        } catch (e) {
            if (e.response?.status === 422) {
                errors.value = Object.values(e.response.data.errors)
                    .flat()
                    .join(", ");
            } else {
                errors.value = e.response?.data?.message || fallback;
            }
            throw e;
        } finally {
            loading.value = false;
        }
    }

    const upload = async (url, files) =>
        handleRequest(() => {
            const fd = new FormData();
            files.forEach((f) => fd.append("images[]", f));
            return axios.post(url, fd, {
                headers: { "Content-Type": "multipart/form-data" },
            });
        }, "Failed to upload images.");

    const get = (url) =>
        handleRequest(() => axios.get(url), "Failed to fetch images.");

    const sort = (url, order) =>
        handleRequest(
            () => axios.post(url, { order }),
            "Failed to reorder images."
        );

    const destroy = (url) =>
        handleRequest(() => axios.delete(url), "Failed to delete image.");

    return { loading, errors, upload, get, sort, destroy };
}
