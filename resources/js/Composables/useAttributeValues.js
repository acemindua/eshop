import { ref } from "vue";
import axios from "axios";

export default function useAttributeValues() {
    const attributeValues = ref([]);
    const attributeValue = ref(null);
    const loading = ref(false);
    const error = ref(null);

    // Отримати всі значення атрибутів
    const fetchAttributeValues = async (id) => {
        loading.value = true;
        error.value = null;
        try {
            const response = await axios.get(`/api/attribute-values`, {
                params: { attribute_id: id },
            });
            attributeValues.value = response.data;
        } catch (err) {
            error.value =
                err.response?.data?.message ||
                "Error fetching attribute values";
        } finally {
            loading.value = false;
        }
    };

    // Отримати конкретне значення атрибута
    const fetchAttributeValue = async (id) => {
        loading.value = true;
        error.value = null;
        try {
            const response = await axios.get(`/api/attribute-values/${id}`);
            attributeValue.value = response.data;
        } catch (err) {
            error.value =
                err.response?.data?.message || "Error fetching attribute value";
        } finally {
            loading.value = false;
        }
    };

    // Додати нове значення атрибута
    const createAttributeValue = async (data) => {
        loading.value = true;
        error.value = null;
        try {
            const response = await axios.post("/api/attribute-values", data);
            attributeValues.value.push(response.data);
            console.log(response);
            return response.data;
        } catch (err) {
            error.value =
                err.response?.data?.message || "Error creating attribute value";
            throw err;
        } finally {
            loading.value = false;
        }
    };

    // Оновити значення атрибута
    const updateAttributeValue = async (id, data) => {
        loading.value = true;
        error.value = null;
        try {
            const response = await axios.put(
                `/api/attribute-values/${id}`,
                data
            );
            attributeValues.value = attributeValues.value.map((av) =>
                av.id === id ? response.data : av
            );
            return response.data;
        } catch (err) {
            error.value =
                err.response?.data?.message || "Error updating attribute value";
            throw err;
        } finally {
            loading.value = false;
        }
    };

    // Видалити значення атрибута
    const deleteAttributeValue = async (id) => {
        loading.value = true;
        error.value = null;
        try {
            await axios.delete(`/api/attribute-values/${id}`);
            attributeValues.value = attributeValues.value.filter(
                (av) => av.id !== id
            );
        } catch (err) {
            error.value =
                err.response?.data?.message || "Error deleting attribute value";
            throw err;
        } finally {
            loading.value = false;
        }
    };

    return {
        attributeValues,
        attributeValue,
        loading,
        error,
        fetchAttributeValues,
        fetchAttributeValue,
        createAttributeValue,
        updateAttributeValue,
        deleteAttributeValue,
    };
}
