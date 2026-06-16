import { ref } from "vue";
import axios from "axios";

export function useCatalogApi() {
    const items = ref([]);
    const meta = ref({});
    const loading = ref(false);
    const brands = ref([]);
    const price = ref({ min: 0, max: 0 });

    const fetchCatalog = async (url, params) => {
        loading.value = true;
        try {
            const { data } = await axios.get(url, { params });
            items.value = data.items;
            meta.value = data.meta;
            brands.value = data.brands || [];

            if (data.price) {
                price.value = { ...data.price };
            }

            //console.log(data);
            return data;
        } catch (e) {
            console.error("API Error:", e);
            throw e;
        } finally {
            loading.value = false;
        }
    };

    return { items, meta, loading, brands, price, fetchCatalog };
}
