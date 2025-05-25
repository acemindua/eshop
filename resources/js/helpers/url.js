import { isLocale, availableLocales } from "./locale";

/**
 * Removes the locale prefix from a given path
 * @param {string} path
 * @param {string[]} validLocales
 * @returns {string}
 */
export const stripLocaleFromPath = (path, validLocales = []) => {
    const segments = path.split("/").filter(Boolean);
    if (isLocale(segments[0], validLocales)) segments.shift();
    return "/" + segments.join("/");
};

/**
 * Returns the canonical URL without a locale prefix
 * @param {string[]} validLocales
 * @returns {string}
 */
export const getCanonicalUrl = (validLocales = []) => {
    const origin = window.location.origin;
    const cleanPath = stripLocaleFromPath(
        window.location.pathname,
        validLocales
    );
    return origin + cleanPath;
};

/**
 * Builds a localized version of the current URL
 * @param {string} locale
 * @param {string} currentPath
 * @param {string[]} validLocales
 * @returns {string}
 */
export const buildUrlForLocale = (locale, currentPath, validLocales = []) => {
    const cleanPath = stripLocaleFromPath(currentPath, validLocales);
    const segments = cleanPath.split("/").filter(Boolean);
    segments.unshift(locale);

    const url = new URL(window.location.origin);
    url.pathname = "/" + segments.join("/");

    return url.toString();
};

/**
 * Generates an array of alternate hreflang links
 * @param {string[]} localeKeys
 * @returns {{ hreflang: string, href: string }[]}
 */
export const generateHreflangs = (localeKeys = []) => {
    const locales = availableLocales(localeKeys);
    const currentPath = window.location.pathname;

    return locales.map((locale) => ({
        hreflang: locale,
        href: buildUrlForLocale(locale, currentPath, locales),
    }));
};
