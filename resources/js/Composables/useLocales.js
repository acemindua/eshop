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
        // Повертаємо мапінг, якщо він існує, інакше повертаємо поточний код локалі
        return state.mapping[current] || current;
    });

    const localeKeysMapped = computed(() => {
        return localeKeys.value.reduce((acc, key) => {
            // Отримуємо мапінг з об'єкта state.mapping
            acc[key] = state.mapping[key] || key;
            return acc;
        }, {});
    });

    return {
        state,
        localeKeys,
        hasMultipleLocales,
        currentMappedLocale,
        localeKeysMapped,
    };
}
