// resources/js/Composables/useReviewApi.js

import { ref } from "vue";
import axios from "axios";

// Налаштування Axios для роботи з Laravel Sanctum (якщо використовується)
axios.defaults.withCredentials = true;
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
if (document.querySelector('meta[name="csrf-token"]')) {
    axios.defaults.headers.common["X-CSRF-TOKEN"] = document.querySelector(
        'meta[name="csrf-token"]'
    ).content;
} else {
    console.warn(
        "CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token"
    );
}

/**
 * Composable для взаємодії з API відгуків.
 * Надає реактивні змінні для стану завантаження, повідомлень про успіх/помилки
 * та функцію для надсилання відгуків.
 */
export function useReviewApi() {
    const loading = ref(false);
    const successMessage = ref("");
    const errorMessage = ref("");
    const errors = ref({}); // Для валідаційних помилок з бекенду

    /**
     * Надсилає новий відгук на сервер.
     * @param {string} modelType - Тип сутності (наприклад, 'products', 'articles').
     * @param {number}modelId - ID сутності.
     * @param {object} formData - Дані форми відгуку (title, review, rating).
     * @returns {Promise<boolean>} - Проміс, що повертає true у разі успіху, false - у разі помилки.
     */
    const submitReview = async (formData) => {
        loading.value = true;
        successMessage.value = "";
        errorMessage.value = "";
        errors.value = {}; // Очищаємо попередні помилки

        try {
            const response = await axios.post(`/api/reviews`, formData);
            console.log(response);
            successMessage.value = response.data.message;
            return true; // Успішно
        } catch (error) {
            if (error.response) {
                if (error.response.status === 422) {
                    errors.value = error.response.data.errors;
                } else if (error.response.data.message) {
                    errorMessage.value = error.response.data.message;
                } else {
                    errorMessage.value = "Виникла непередбачена помилка.";
                }
            } else {
                errorMessage.value =
                    "Помилка мережі або недоступність сервера.";
            }
            return false; // Помилка
        } finally {
            loading.value = false;
        }
    };

    /**
     * Отримує відгуки для певної сутності.
     * @param {string} reviewableType - Тип сутності.
     * @param {number} reviewableId - ID сутності.
     * @param {number} page - Номер сторінки для пагінації.
     * @returns {Promise<object>} - Проміс з даними відгуків.
     */
    const fetchReviews = async (reviewableType, reviewableId, page = 1) => {
        loading.value = true;
        errorMessage.value = "";
        try {
            const response = await axios.get(
                `/api/${reviewableType}/${reviewableId}/reviews?page=${page}`
            );
            return response.data;
        } catch (error) {
            errorMessage.value = "Помилка завантаження відгуків.";
            console.error("Error fetching reviews:", error);
            throw error;
        } finally {
            loading.value = false;
        }
    };

    /**
     * Отримує середній рейтинг та кількість відгуків для сутності.
     * @param {string} reviewableType - Тип сутності.
     * @param {number} reviewableId - ID сутності.
     * @returns {Promise<object>} - Проміс з середнім рейтингом та кількістю.
     */
    const fetchAverageRating = async (reviewableType, reviewableId) => {
        loading.value = true;
        errorMessage.value = "";
        try {
            const response = await axios.get(
                `/api/${reviewableType}/${reviewableId}/average-rating`
            );
            return response.data;
        } catch (error) {
            errorMessage.value = "Помилка завантаження середнього рейтингу.";
            console.error("Error fetching average rating:", error);
            return { average_rating: 0, reviews_count: 0 }; // Повертаємо дефолтні значення
        } finally {
            loading.value = false;
        }
    };

    /**
     * Видаляє відгук.
     * @param {string} reviewableType - Тип сутності.
     * @param {number} reviewableId - ID сутності.
     * @param {number} reviewId - ID відгуку для видалення.
     * @returns {Promise<boolean>} - Проміс, що повертає true у разі успіху, false - у разі помилки.
     */
    const deleteReview = async (reviewableType, reviewableId, reviewId) => {
        loading.value = true;
        errorMessage.value = "";
        try {
            await axios.delete(
                `/api/${reviewableType}/${reviewableId}/reviews/${reviewId}`
            );
            successMessage.value = "Відгук успішно видалено.";
            return true;
        } catch (error) {
            errorMessage.value = "Помилка видалення відгуку.";
            console.error("Error deleting review:", error);
            return false;
        } finally {
            loading.value = false;
        }
    };

    return {
        loading,
        successMessage,
        errorMessage,
        errors,
        submitReview,
        fetchReviews,
        fetchAverageRating,
        deleteReview,
    };
}
