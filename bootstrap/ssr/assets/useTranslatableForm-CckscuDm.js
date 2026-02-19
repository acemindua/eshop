import { reactive, computed } from "vue";
import { usePage } from "@inertiajs/vue3";
function useLocales(current) {
  const page = usePage();
  const state = reactive({
    locales: page.props?.config?.supportedLocales || {},
    currentLocale: page.props?.config?.locale,
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
  return {
    state,
    localeKeys,
    hasMultipleLocales,
    currentMappedLocale,
    localeKeysMapped
  };
}
function useTranslatableForm(translatedAttributes = []) {
  const {
    state: localeState,
    // Перейменовуємо state для уникнення конфлікту
    localeKeys,
    hasMultipleLocales,
    currentMappedLocale,
    // Може бути корисним для відображення
    localeKeysMapped
    // Може бути корисним для відображення
  } = useLocales();
  const locales = localeState.locales;
  const form = reactive({});
  const initForm = (defaultValues = {}) => {
    Object.keys(form).forEach((key) => delete form[key]);
    Object.assign(form, defaultValues);
    localeKeys.value.forEach((code) => {
      form[code] = {};
      translatedAttributes.forEach((attr) => {
        form[code][attr] = "";
      });
    });
  };
  const fillForm = (item) => {
    initForm(item);
    if (!item.translations) return;
    for (const trans of item.translations) {
      if (!form[trans.locale]) continue;
      translatedAttributes.forEach((attr) => {
        form[trans.locale][attr] = trans[attr] ?? "";
      });
    }
    form._method = "put";
  };
  return {
    form,
    locales,
    // Тепер це locales з useLocales
    localeKeys,
    // Додатково повертаємо ключі локалей
    hasMultipleLocales,
    // Додатково повертаємо інформацію про множинні локалі
    currentMappedLocale,
    // Додатково повертаємо поточну маповану локаль
    localeKeysMapped,
    // Додатково повертаємо мапінг ключів локалей
    initForm,
    fillForm
  };
}
export {
  useTranslatableForm as u
};
