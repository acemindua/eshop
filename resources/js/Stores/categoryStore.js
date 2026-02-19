import { defineStore } from "pinia";
import { ref } from "vue";
import useApiResourceService from "@/Composables/useApiResourceService";

export const useCategoryStore = defineStore("category", () => {
    const categories = ref({});
    const isLoading = ref(false);

    // Створюємо об'єкт для відстеження активних промісів
    const loadingPromises = {};

    const { fetchData } = useApiResourceService();

    async function fetchCategories(locale) {
        // 1. Якщо дані вже є в кеші — повертаємо їх
        if (categories.value[locale]?.length > 0) {
            return;
        }

        // 2. Якщо запит для цієї мови вже виконується — чекаємо на нього
        if (loadingPromises[locale]) {
            return loadingPromises[locale];
        }

        isLoading.value = true;

        // Створюємо проміс і зберігаємо його в loadingPromises
        loadingPromises[locale] = (async () => {
            try {
                const url = route("api.get.categories", { locale });
                const res = await fetchData(url);

                if (res?.data?.items) {
                    categories.value[locale] = res.data.items;
                }
            } catch (e) {
                console.error("Pinia Category Error:", e);
            } finally {
                isLoading.value = false;
                // Видаляємо проміс після завершення
                delete loadingPromises[locale];
            }
        })();

        return loadingPromises[locale];
    }

    return { categories, isLoading, fetchCategories };
});
