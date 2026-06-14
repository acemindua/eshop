import { reactive, computed } from "vue";
import { b as usePage } from "../ssr.js";
function useLocales(current) {
  const page = usePage();
  const state = reactive({
    locales: page.props?.config?.supportedLocales || {},
    currentLocale: current || page.props?.config?.locale,
    mapping: page.props?.config?.localesMapping || []
  });
  const localeKeys = computed(() => Object.keys(state.locales));
  const hasMultipleLocales = computed(() => localeKeys.value.length > 1);
  const currentMappedLocale = computed(() => {
    const current2 = state.currentLocale;
    return state.mapping[current2] || current2;
  });
  const localeKeysMapped = computed(() => {
    return localeKeys.value.reduce((acc, key) => {
      acc[key] = state.mapping[key] || key;
      return acc;
    }, {});
  });
  const getTranslation = (model, field = "title", locale = null) => {
    if (!model || !model.translations) return "";
    const targetLocale = locale || state.currentLocale;
    const translation = model.translations.find(
      (t) => t.locale === targetLocale
    );
    if (translation && translation[field]) {
      return translation[field];
    }
    return model.translations[0]?.[field] || `[No translation for ${targetLocale}]`;
  };
  return {
    state,
    localeKeys,
    hasMultipleLocales,
    currentMappedLocale,
    localeKeysMapped,
    getTranslation
    // <--- Експортуємо новий хелпер
  };
}
export {
  useLocales as u
};
