import { ref } from "vue";
import axios from "axios";
function useCatalogApi() {
  const items = ref([]);
  const meta = ref({});
  const loading = ref(false);
  const brands = ref([]);
  const categories = ref([]);
  const price = ref({ min: 0, max: 0 });
  const fetchCatalog = async (url, params) => {
    loading.value = true;
    try {
      const { data } = await axios.get(url, { params });
      items.value = data.items;
      meta.value = data.meta;
      brands.value = data.brands || [];
      categories.value = data.categories || [];
      if (data.price) {
        price.value = { ...data.price };
      }
      return data;
    } catch (e) {
      console.error("API Error:", e);
      throw e;
    } finally {
      loading.value = false;
    }
  };
  return { items, meta, loading, brands, categories, price, fetchCatalog };
}
export {
  useCatalogApi as u
};
