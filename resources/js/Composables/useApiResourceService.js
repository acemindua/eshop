// useApiResourceService.js
import { ref } from "vue";
import axios from "axios";

/**
 * Composable for working with API resources.
 * Handles loading state, global errors, and common CRUD requests.
 */
export default function useApiResourceService() {
    const loading = ref(false); // true when request is in progress
    const errorsRequests = ref(); // global errors (not form validation errors)

    /**
     * Helper for handling async requests with error capturing
     *
     * @param {Function} fn - async function that makes an API request
     * @param {String} fallback - default error message
     * @returns {Promise<*>}
     */
    const handleRequest = async (fn, fallback = "Something went wrong.") => {
        loading.value = true;
        errorsRequests.value = {};

        try {
            return await fn();
        } catch (e) {
            const response = e.response;

            if (response?.status === 422 && response.data?.errors) {
                // Validation errors
                errorsRequests.value = response.data.errors;
            } else {
                // General error handling
                let message = response?.data?.message || e.message || fallback;
                errorsRequests.value = { general: [message] };
            }

            throw e;
        } finally {
            loading.value = false;
        }
    };

    /**
     * Send POST request to create a resource
     *
     * @param {String} url - API endpoint
     * @param {Object} data - form data or plain object
     * @returns {Promise}
     */
    const storeData = (url, data) =>
        handleRequest(() =>
            axios.post(url, data, {
                headers: { "Content-Type": "multipart/form-data" },
            })
        );

    /**
     * Send POST request to update a resource
     *
     * @param {String} url - API endpoint
     * @param {Object} data - form data or plain object
     * @returns {Promise}
     */
    const updateData = (url, data) =>
        handleRequest(() =>
            axios.post(url, data, {
                headers: { "Content-Type": "multipart/form-data" },
            })
        );

    /**
     * Send GET request to fetch data from API
     *
     * @param {String} url - API endpoint
     * @returns {Promise}
     */
    const fetchData = (url) => {
        return handleRequest(() => axios.get(url), "Failed to fetch data.");
    };

    /**
     * Send DELETE request to remove resources by IDs
     *
     * @param {String} url - API endpoint
     * @param {Array} ids - array of IDs to delete
     * @returns {Promise}
     */
    const deleteData = (url, ids = []) =>
        handleRequest(() => axios.delete(url, { data: { ids } }));

    return {
        loading,
        errorsRequests,
        storeData,
        updateData,
        fetchData,
        deleteData,
    };
}
