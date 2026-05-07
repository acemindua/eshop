import { reactive } from "vue";
import { u as useLocales } from "./useLocales-Cm2D8rND.js";
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
