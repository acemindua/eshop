import { reactive, computed } from "vue";
import { usePage } from "@inertiajs/vue3";

export default function useLocales(current) {
    const page = usePage();
    const state = reactive({
        locales: page.props?.config?.supportedLocales || {},
        currentLocale: current || page.props?.config?.locale,
        mapping: page.props?.config?.localesMapping || [],
    });

    const localeKeys = computed(() => Object.keys(state.locales));
    const hasMultipleLocales = computed(() => localeKeys.value.length > 1);

    const currentMappedLocale = computed(() => {
        const current = state.currentLocale;
        return state.mapping[current] || current;
    });

    const localeKeysMapped = computed(() => {
        return localeKeys.value.reduce((acc, key) => {
            acc[key] = state.mapping[key] || key;
            return acc;
        }, {});
    });

    /**
     * Хелпер для отримання перекладу з моделей Laravel (Astrotomic Translatable)
     * @param {Object} model — об'єкт сторінки або категорії (н-р, {id: 1, translations: [...]})
     * @param {String} field — яке поле витягнути ('title', 'slug' тощо)
     * @param {String|null} locale — конкретна локаль (якщо null — береться поточна активна)
     */
    const getTranslation = (model, field = "title", locale = null) => {
        if (!model || !model.translations) return "";

        const targetLocale = locale || state.currentLocale;

        // Шукаємо потрібну локаль у масиві перекладів
        const translation = model.translations.find(
            (t) => t.locale === targetLocale,
        );

        // Якщо знайшли — повертаємо поле, інакше — фолбек на першу ліпшу мову
        if (translation && translation[field]) {
            return translation[field];
        }

        return (
            model.translations[0]?.[field] ||
            `[No translation for ${targetLocale}]`
        );
    };

    return {
        state,
        localeKeys,
        hasMultipleLocales,
        currentMappedLocale,
        localeKeysMapped,
        getTranslation, // <--- Експортуємо новий хелпер
    };
}
