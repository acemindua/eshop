import { ref, reactive, toRefs } from "vue";
import useLocales from "./useLocales";

export default function useTranslatableForm(translatedAttributes = []) {
    const { localeKeys, locales, hasMultipleLocales } = useLocales();

    // Використовуємо ref для самого об'єкта форми
    // Це дає змогу легко скидати форму до початкового стану
    const form = reactive({
        processing: false, // Додаємо стан обробки запиту
    });

    /**
     * Створює чисту структуру для перекладів
     */
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

    /**
     * Ініціалізація форми (для Create)
     */
    const initForm = (defaultValues = {}) => {
        // Очищаємо всі ключі крім системних
        Object.keys(form).forEach((key) => {
            if (key !== "processing") delete form[key];
        });

        // Додаємо базові значення
        Object.assign(form, defaultValues);

        // Додаємо структуру перекладів
        const translations = generateEmptyTranslations();
        Object.assign(form, translations);
    };

    /**
     * Заповнення форми (для Edit)
     */
    const fillForm = (item) => {
        if (!item) return;

        // 1. Спочатку заповнюємо базові поля (id, public, order тощо)
        Object.assign(form, item);

        // 2. Ініціалізуємо порожні переклади (щоб уникнути undefined)
        const emptyTrans = generateEmptyTranslations();
        Object.assign(form, emptyTrans);

        // 3. Наповнюємо реальними даними з масиву translations
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
        form, // залишаємо reactive об'єкт
        processing: toRefs(form).processing, // дозволяє використовувати як окрему змінну
        locales,
        localeKeys,
        hasMultipleLocales,
        initForm,
        fillForm,
    };
}
