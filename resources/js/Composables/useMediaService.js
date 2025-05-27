import { ref } from "vue";
import axios from "axios";

/**
 * @param {Object} meta - { model_type, model_id, collection }
 * @returns {{
 *   uploadingMedia: Ref<boolean>,
 *   uploadErrors: Ref<Object>,
 *   uploadingProgress: Ref<number>,
 *   getMedia: Function,
 *   uploadMedia: Function,
 *   deleteMedia: Function,
 *   sortMedia: Function
 * }}
 */
export default function useMediaService(meta) {
    const uploadingMedia = ref(false);
    const uploadErrors = ref({});
    const uploadingProgress = ref(0);

    /**
     * Unified request handler with error and progress tracking
     *
     * @param {Function} fn - Async function that returns an Axios request
     * @param {String} fallback - Fallback message for unknown errors
     * @returns {Promise<any>}
     */
    const handleRequest = async (fn, fallback = "Something went wrong.") => {
        uploadingMedia.value = true;
        uploadErrors.value = {};

        try {
            return await fn();
        } catch (e) {
            const res = e.response;

            if (res?.status === 422 && res.data?.errors) {
                uploadErrors.value = res.data.errors;
            } else {
                let message =
                    res?.data?.message || res?.data || e.message || fallback;

                uploadErrors.value = {
                    general: [message],
                };
            }

            throw e;
        } finally {
            uploadingMedia.value = false;
            setTimeout(() => (uploadingProgress.value = 0), 500);
        }
    };

    /**
     * Fetch media files for a given model
     *
     * @param {String} url - API endpoint to retrieve media
     * @returns {Promise<Object>} - Axios response data with media list
     */
    const getMedia = async (url) => {
        return handleRequest(
            () =>
                axios.get(url, {
                    params: {
                        model_type: meta.model_type,
                        model_id: meta.model_id,
                        collection: meta.collection,
                    },
                }),
            "Failed to load media files."
        );
    };

    /**
     * Upload files to a media collection for a given model
     *
     * @param {String} url - Upload endpoint
     * @param {File[]} files - Files to upload
     * @param {Function} [externalProgress] - Optional external progress callback
     * @returns {Promise<Object[]>} - Uploaded media response
     */
    const uploadMedia = async (url, files, externalProgress = () => {}) => {
        const formData = new FormData();
        files.forEach((f) => formData.append("files[]", f));
        formData.append("model_type", meta.model_type);
        formData.append("model_id", meta.model_id);
        formData.append("collection", meta.collection);

        return handleRequest(() =>
            axios.post(url, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                onUploadProgress: (e) => {
                    if (e.lengthComputable) {
                        const percent = Math.round((e.loaded * 100) / e.total);
                        uploadingProgress.value = percent;
                        externalProgress(e); // optional callback
                    }
                },
            })
        );
    };

    /**
     * Reorder media files
     *
     * @param {String} url - API endpoint for sorting
     * @param {Array<{ id: number, position: number }>} order - Sorted media order
     * @returns {Promise<void>}
     */
    const sortMedia = async (url, order) => {
        return handleRequest(
            () =>
                axios.post(url, {
                    order,
                    model_type: meta.model_type,
                    model_id: meta.model_id,
                    collection: meta.collection,
                }),
            "Failed to reorder images."
        );
    };

    /**
     * Delete a media item
     *
     * @param {String} url - API endpoint for deletion
     * @returns {Promise<void>}
     */
    const deleteMedia = async (url) => {
        return handleRequest(
            () => axios.delete(url),
            "Failed to delete media item."
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
