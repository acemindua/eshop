// useTranslatableForm.js
import { reactive } from "vue";
import { usePage } from "@inertiajs/vue3";

/**
 * Composable for handling translatable forms.
 * Automatically creates fields for multiple locales.
 *
 * @param {Array} translatedAttributes - list of translated field names (e.g., ['title', 'description'])
 */
export default function useTranslatableForm(translatedAttributes = []) {
    const form = reactive({});

    // Get available locales from the current Inertia page
    const locales = usePage().props.lang.locales;

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
        for (const code in locales) {
            form[code] = {};
            translatedAttributes.forEach((attr) => {
                form[code][attr] = "";
            });
        }
    };

    /**
     * Fill form translations from an existing item with `translations`
     *
     * @param {Object} item - an object that contains a `translations` array
     */
    const fillForm = (item) => {
        if (!item.translations) return;

        for (const trans of item.translations) {
            if (!form[trans.locale]) continue;

            translatedAttributes.forEach((attr) => {
                form[trans.locale][attr] = trans[attr] ?? "";
            });
        }
    };

    return {
        form,
        locales,
        initForm,
        fillForm,
    };
}
