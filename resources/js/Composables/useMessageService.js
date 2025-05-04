import { ref } from "vue";
import axios from "axios";

export default function useMessageService() {
    const loading = ref(false);
    const errors = ref(null);

    async function handleRequest(fn, fallback = "Something went wrong.") {
        loading.value = true;
        errors.value = null;
        try {
            const response = await fn();
            return response.data;
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

    // Get all messages
    const getMessages = (url) =>
        handleRequest(() => axios.get(url), "Failed to fetch messages.");

    const createMessage = (url, data) =>
        handleRequest(() => axios.post(url, data), "Failed store new message.");

    return { loading, errors, getMessages, createMessage };
}
