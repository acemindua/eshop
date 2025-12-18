import { defineStore } from "pinia";
import { usePage } from "@inertiajs/vue3";
import { computed } from "vue";

// Визначаємо та експортуємо Pinia Store
export const useSettingsStore = defineStore("settings", () => {
    // Отримання глобальних пропсів Inertia
    const pageProps = computed(() => usePage().props);

    // 1. Стан: Налаштування з Inertia Shared Props
    const allSettings = computed(() => pageProps.value.settings || {});

    /**
     * Метод для отримання конкретного налаштування за ключем
     * @param {string} key Ключ налаштування (наприклад, 'site_name')
     * @param {any} defaultValue Значення за замовчуванням, якщо ключ не знайдено
     * @returns {any} Значення налаштування
     */
    function get(key, defaultValue = null) {
        // Ми покладаємося на те, що Laravel вже декодував JSON (якщо реалізовано в Facade)
        return allSettings.value[key] ?? defaultValue;
    }

    // 2. Геттери (Getters) для часто використовуваних значень
    const siteName = computed(() => get("site_name", "Default App Name"));
    const adminEmail = computed(() =>
        get("admin_email", "contact@example.com")
    );
    const socialLinks = computed(() => get("social_links", {})); // Якщо це JSON-об'єкт

    // 3. Функція для оновлення налаштувань після успішного Inertia-запиту
    // Хоча Inertia автоматично оновлює props, цей метод може бути корисним для
    // локальних змін або для примусового оновлення.
    function updateSettings(newSettings) {
        // Це складно зробити напряму через usePage().props,
        // тому краще покладатися на Inertia, яка перезавантажить props
        // після успішного redirect.
    }

    return {
        allSettings,
        siteName,
        adminEmail,
        socialLinks,
        get,
        updateSettings,
    };
});
