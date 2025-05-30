// resources/js/helpers/locale.js
import { localeMap } from "@/helpers";
import { computed } from "vue";
import useLocales from "@/Stores/useLocales";

/**
 * Мапить ключ локалі до URL-коду
 */
export const mapLocale = (key) => localeMap[key] || key;

/**
 * Отримує всі доступні локалі
 * @returns {ComputedRef<{ keys: string[], mapKeys: string[] }>}
 */
export const availableLocales = () => {
    const { localeKeys } = useLocales();
    return computed(() => ({
        keys: localeKeys.value,
        mapKeys: localeKeys.value.map(mapLocale),
    }));
};

/**
 * Чи є код локаллю
 */
export const isLocale = (code) => {
    const locales = availableLocales().value;
    //console.log(locales["mapKeys"].includes(code));
    return locales["mapKeys"].includes(code);
};
