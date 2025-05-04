import { ref } from "vue";
import axios from "axios";

export default function ApiStats() {
    // Reactive state variables
    const loading = ref(false);
    const errors = ref([]);
    const data = ref([]);

    // Function to fetch data from the given URL
    const getResponse = async (url) => {
        try {
            loading.value = true;
            // Make an asynchronous GET request
            const response = await axios.get(url);
            data.value = response.data; // Update data with response
        } catch (e) {
            // Handle errors
            errors.value =
                e instanceof Error ? e.message : new Error(e).message;
        } finally {
            loading.value = false; // Set loading to false regardless of success or error
        }
    };

    // Return reactive variables and functions for use in components
    return {
        errors,
        loading,
        data,
        getResponse,
    };
}
