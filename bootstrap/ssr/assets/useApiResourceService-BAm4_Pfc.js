import { ref } from "vue";
import axios from "axios";
function useApiResourceService() {
  const loading = ref(false);
  const errorsRequests = ref();
  const handleRequest = async (fn, fallback = "Something went wrong.") => {
    loading.value = true;
    errorsRequests.value = {};
    try {
      return await fn();
    } catch (e) {
      const response = e.response;
      if (response?.status === 422 && response.data?.errors) {
        errorsRequests.value = response.data.errors;
      } else {
        let message = response?.data?.message || e.message || fallback;
        errorsRequests.value = { general: [message] };
      }
      throw e;
    } finally {
      loading.value = false;
    }
  };
  const storeData = (url, data) => handleRequest(() => {
    const isFormData = data instanceof FormData;
    return axios.post(url, data, {
      headers: isFormData ? { "Content-Type": "multipart/form-data" } : {}
    });
  });
  const updateData = (url, data) => handleRequest(() => {
    const isFormData = data instanceof FormData;
    return axios.post(url, data, {
      headers: isFormData ? { "Content-Type": "multipart/form-data" } : {}
    });
  });
  const fetchData = (url, params = {}) => {
    return handleRequest(
      () => axios.get(url, { params }),
      "Failed to fetch data."
    );
  };
  const deleteData = (url, ids = []) => handleRequest(() => axios.delete(url, { data: { ids } }));
  return {
    loading,
    errorsRequests,
    storeData,
    updateData,
    fetchData,
    deleteData
  };
}
export {
  useApiResourceService as u
};
