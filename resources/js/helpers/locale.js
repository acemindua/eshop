/**
 * Maps input locale keys to actual locale codes used in URLs (e.g., 'uk' → 'ua')
 * @param {string[]} locales
 * @returns {string[]}
 */
export const availableLocales = (locales = []) => {
    const localeMap = {
        uk: "ua",
        // Add more mappings as needed
    };
    return locales.map((key) => localeMap[key] || key);
};

/**
 * Checks if a given code is a valid locale prefix
 * @param {string} code
 * @param {string[]} validLocales
 * @returns {boolean}
 */
export const isLocale = (code, validLocales = []) => {
    return availableLocales(validLocales).includes(code);
};

/**
 * Extracts the locale from the current URL path, if valid
 * @param {string[]} validLocales
 * @returns {string|null}
 */
export const getCurrentLocaleFromPath = (validLocales = []) => {
    const segments = window.location.pathname.split("/").filter(Boolean);
    return isLocale(segments[0], validLocales) ? segments[0] : null;
};
