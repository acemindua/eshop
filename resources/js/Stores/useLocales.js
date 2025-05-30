import { reactive, computed } from "vue";
import { usePage } from "@inertiajs/vue3";
import { localeMap, mapLocale } from "@/helpers";

export default function useLocales() {
    const page = usePage();
    const state = reactive({
        locales: page.props.lang.locales,
        currentLocale: page.props.lang.locale,
    });

    const localeKeys = computed(() => Object.keys(state.locales));
    const hasMultipleLocales = computed(() => localeKeys.value.length > 1);

    function mappedLocale(key) {
        return computed(() => mapLocale(key));
    }

    return {
        localeKeys,
        hasMultipleLocales,
        locales: state.locales,
        currentLocale: state.currentLocale,
        mappedCurrentLocale: mappedLocale(state.currentLocale),
        mappedLocale,
    };
}
