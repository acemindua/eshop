import { computed, reactive } from "vue";

/**
 * Локалізаційний хук для роботи з мовами інтерфейсу.
 * @param {Object} locales - Об'єкт локалей з поточною локаллю та мапінгом.
 * @param {string} locales.initialLocale - Початкова мова (наприклад, 'en').
 * @param {Object} locales.mapping - Мапінг ключів до перекладів (може бути об'єкт з перекладами або посилання на них).
 */
export default function useLocales(locales) {
    const state = reactive({
        current: locales.locale || "en", // Initialize with the passed initialLocale or default to 'en'
    });

    const localeKeys = computed(() => Object.keys(locales.locales || {}));
    const hasMultipleLocales = computed(() => localeKeys.value.length > 1);

    // This function now correctly maps the locale key to its corresponding data
    // from the 'mapping' object.
    const mapLocale = (key) => {
        return locales.mapping?.[key] || key;
    }; // Returns the mapped object/value or undefined

    // mappedCurrentLocale now correctly depends on state.current
    const mappedCurrentLocale = computed(() => mapLocale(state.current));

    const localeKeysMapped = computed(() => {
        return localeKeys.value.reduce((acc, key) => {
            acc[key] = mapLocale(key);
            return acc;
        }, {});
    });

    return {
        state,
        localeKeys,
        hasMultipleLocales,
        mappedCurrentLocale,
        localeKeysMapped,
    };
}
