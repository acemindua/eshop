import { reactive } from "vue";

export default function useFormLocales(locales, translatedFields = []) {
    const form = reactive({});

    const initForm = (defaultValues = {}) => {
        Object.assign(form, defaultValues);
        for (const code in locales) {
            form[code] = {};
            translatedFields.forEach((attr) => (form[code][attr] = ""));
        }
    };

    const fillForm = (item) => {
        Object.assign(form, item);
        for (const code in locales) {
            translatedFields.forEach((attr) => {
                form[code][attr] = item[code]?.[attr] || "";
            });
        }
    };

    return { form, initForm, fillForm };
}
