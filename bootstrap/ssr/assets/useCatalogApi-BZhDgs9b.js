import { ref } from "vue";
import axios from "axios";
function useCatalogApi() {
  const items = ref([]);
  const meta = ref({});
  const loading = ref(false);
  const brands = ref([]);
  const fetchCatalog = async (url, params) => {
    loading.value = true;
    try {
      const { data } = await axios.get(url, { params });
      items.value = data.items;
      meta.value = data.meta;
      brands.value = data.brands || [];
      return data;
    } catch (e) {
      console.error("API Error:", e);
      throw e;
    } finally {
      loading.value = false;
    }
  };
  return { items, meta, loading, brands, fetchCatalog };
}
export {
  useCatalogApi as u
};
