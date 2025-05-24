// resources/js/helpers/locale.js

/**
 * Повертає список підтримуваних мов
 */
export const availableLocales = () => ["ua", "en" /* "pl", "ru" */];

/**
 * Перевіряє, чи переданий код — підтримувана мова
 */
export const isLocale = (code) => availableLocales().includes(code);

/**
 * Витягує мовний префікс з URL, якщо є
 */
export const getCurrentLocaleFromPath = () => {
    const segments = window.location.pathname.split("/").filter(Boolean);
    return isLocale(segments[0]) ? segments[0] : null;
};
