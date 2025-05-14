// useApiResourceService.js
import { ref, reactive } from "vue";
import { usePage } from "@inertiajs/vue3";
import axios from "axios";

/**
 * Компонент-обгортка для роботи з API ресурсами.
 * Підтримує локалізовані поля, форму, помилки, запити на збереження та оновлення.
 *
 * @param {Array} translatedAttributes - список локалізованих полів (наприклад: ["title", "description"])
 */
export default function useApiResourceService(translatedAttributes = []) {
    // Стан завантаження запиту
    const loading = ref(false);

    // Помилки (не для відображення форми, а глобальні/під запити)
    const errorsRequests = ref({});

    // Основна реактивна форма
    const form = reactive({});

    // Локалі з глобального props через Inertia
    const page = usePage();
    const locales = page.props.lang.locales;

    /**
     * Обробник запиту з try-catch-логікою
     * @param {Function} fn - async функція, яка повертає axios-запит
     * @param {String} fallback - повідомлення за замовчуванням при помилці
     * @returns {Promise<*>}
     */
    const handleRequest = async (fn, fallback = "Something went wrong.") => {
        loading.value = true;
        errorsRequests.value = {};

        try {
            return await fn();
        } catch (e) {
            if (e.response?.status === 422) {
                // Витягуємо помилки в одну строку (можна переробити під об'єкт за потреби)
                errorsRequests.value = Object.values(e.response.data.errors)
                    .flat()
                    .join(", ");
            } else {
                errorsRequests.value = e.response?.data?.message || fallback;
            }
            throw e;
        } finally {
            loading.value = false;
        }
    };

    /**
     * Ініціалізує форму з порожніми полями для кожної мови та локалізованих атрибутів
     * @param {Object} defaultValues - поля форми не пов'язані з перекладами (наприклад: { order: 1, public: true })
     */
    const initForm = (defaultValues = {}) => {
        // Очищуємо попередні дані
        Object.keys(form).forEach((key) => delete form[key]);

        // Задаємо значення не перекладених полів
        Object.assign(form, defaultValues);

        // Додаємо перекладені поля для кожної мови
        for (const code in locales) {
            form[code] = {};
            translatedAttributes.forEach((attr) => {
                form[code][attr] = "";
            });
        }
    };

    /**
     * Заповнює перекладені поля форми з переданого елемента
     * @param {Object} item - об'єкт з translations
     */
    const fillForm = (item) => {
        if (item.translations) {
            for (const trans of item.translations) {
                if (!form[trans.locale]) continue;

                translatedAttributes.forEach((attr) => {
                    form[trans.locale][attr] = trans[attr] ?? "";
                });
            }
        }
    };

    /**
     * POST запит на створення ресурсу
     * @param {String} url - API endpoint
     * @param {Object} data - дані для відправки
     * @returns {Promise}
     */
    const storeData = (url, data) => {
        return handleRequest(() =>
            axios.post(url, data, {
                headers: { "Content-Type": "multipart/form-data" },
            })
        );
    };

    /**
     * PUT запит на оновлення ресурсу
     * @param {String} url - API endpoint
     * @param {Object|FormData} data - дані для відправки
     * @returns {Promise}
     */
    const updateData = (url, data) => {
        return handleRequest(() =>
            axios.post(url, data, {
                headers: { "Content-Type": "multipart/form-data" },
            })
        );
    };

    /**
     * GET запит на отримання ресурсу
     * @param {String} url - API endpoint
     * @returns {Promise}
     */
    const fetchData = (url) => {
        return handleRequest(() => axios.get(url), "Failed to fetch data.");
    };

    /**
     * DELETE запит з масивом ID для видалення
     * @param {String} url - API endpoint
     * @param {Array} ids - масив ID для видалення
     * @returns {Promise}
     */
    const deleteData = (url, ids = []) => {
        return handleRequest(() => axios.delete(url, { data: { ids } }));
    };

    return {
        loading,
        errorsRequests,
        form,
        locales,
        initForm,
        fillForm,
        storeData,
        updateData,
        fetchData,
        deleteData,
    };
}
