import { reactive, toRefs } from "vue";
import { u as useLocales } from "./useLocales-V6QHCGCa.js";
function useTranslatableForm(translatedAttributes = []) {
  const { localeKeys, locales, hasMultipleLocales } = useLocales();
  const form = reactive({
    processing: false
    // Додаємо стан обробки запиту
  });
  const generateEmptyTranslations = () => {
    const translations = {};
    localeKeys.value.forEach((code) => {
      translations[code] = {};
      translatedAttributes.forEach((attr) => {
        translations[code][attr] = "";
      });
    });
    return translations;
  };
  const initForm = (defaultValues = {}) => {
    Object.keys(form).forEach((key) => {
      if (key !== "processing") delete form[key];
    });
    Object.assign(form, defaultValues);
    const translations = generateEmptyTranslations();
    Object.assign(form, translations);
  };
  const fillForm = (item) => {
    if (!item) return;
    Object.assign(form, item);
    const emptyTrans = generateEmptyTranslations();
    Object.assign(form, emptyTrans);
    if (item.translations && Array.isArray(item.translations)) {
      item.translations.forEach((trans) => {
        const code = trans.locale;
        if (form[code]) {
          translatedAttributes.forEach((attr) => {
            form[code][attr] = trans[attr] ?? "";
          });
        }
      });
    }
  };
  return {
    form,
    // залишаємо reactive об'єкт
    processing: toRefs(form).processing,
    // дозволяє використовувати як окрему змінну
    locales,
    localeKeys,
    hasMultipleLocales,
    initForm,
    fillForm
  };
}
export {
  useTranslatableForm as u
};
