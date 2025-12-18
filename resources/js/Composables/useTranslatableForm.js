import { reactive } from "vue";
// Імпортуємо наш новий композабл useLocales
import useLocales from "./useLocales";

/**
 * Composable for handling translatable forms.
 * Automatically creates fields for multiple locales.
 *
 * @param {Array} translatedAttributes - list of translated field names (e.g., ['title', 'description'])
 */
export default function useTranslatableForm(translatedAttributes = []) {
    // 1. Отримуємо дані про локалі за допомогою useLocales
    // Зауваження: current не передаємо, оскільки в даному контексті нам потрібні
    // лише всі доступні локалі для ініціалізації форми.
    const {
        state: localeState, // Перейменовуємо state для уникнення конфлікту
        localeKeys,
        hasMultipleLocales,
        currentMappedLocale, // Може бути корисним для відображення
        localeKeysMapped, // Може бути корисним для відображення
    } = useLocales();

    // Об'єкт доступних локалей
    const locales = localeState.locales;

    // Реактивна форма
    const form = reactive({});

    /**
     * Initialize form with default values and empty translations
     *
     * @param {Object} defaultValues - non-translated default fields (e.g., { active: true })
     */
    const initForm = (defaultValues = {}) => {
        // Clear previous form data
        Object.keys(form).forEach((key) => delete form[key]);

        // Set base values (not translated)
        Object.assign(form, defaultValues);

        // Set empty translation fields for each locale
        // Використовуємо localeKeys для ітерації
        localeKeys.value.forEach((code) => {
            form[code] = {};
            translatedAttributes.forEach((attr) => {
                form[code][attr] = "";
            });
        });
    };

    /**
     * Fill form translations from an existing item with `translations`
     *
     * @param {Object} item - an object that contains a `translations` array
     */
    const fillForm = (item) => {
        // Спочатку ініціалізуємо форму базовими значеннями
        initForm(item);

        if (!item.translations) return;

        for (const trans of item.translations) {
            // Перевіряємо, чи існує локаль у формі
            if (!form[trans.locale]) continue;

            translatedAttributes.forEach((attr) => {
                form[trans.locale][attr] = trans[attr] ?? "";
            });
        }

        form._method = "put";
    };

    return {
        form,
        locales, // Тепер це locales з useLocales
        localeKeys, // Додатково повертаємо ключі локалей
        hasMultipleLocales, // Додатково повертаємо інформацію про множинні локалі
        currentMappedLocale, // Додатково повертаємо поточну маповану локаль
        localeKeysMapped, // Додатково повертаємо мапінг ключів локалей
        initForm,
        fillForm,
    };
}
