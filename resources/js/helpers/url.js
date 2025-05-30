import { mapLocale, isLocale, availableLocales } from "./locale";

/**
 * Removes the locale prefix from a given path
 * @param {string} path
 * @returns {string}
 */
export const stripLocaleFromPath = (path) => {
    const segments = path.split("/").filter(Boolean);
    if (isLocale(segments[0])) segments.shift();
    return "/" + segments.join("/");
};

/**
 * Returns the canonical URL without a locale prefix
 * @returns {string}
 */
export const getCanonicalUrl = () => {
    const origin = window.location.origin;
    const cleanPath = stripLocaleFromPath(window.location.pathname);
    return origin + cleanPath;
};

/**
 * Builds a localized version of the current URL
 * @param {string} locale
 * @param {string} currentPath
 * @returns {string}
 */
export const buildUrlForLocale = (locale, currentPath) => {
    const cleanPath = stripLocaleFromPath(currentPath);
    const segments = cleanPath.split("/").filter(Boolean);
    segments.unshift(mapLocale(locale));
    const url = new URL(window.location.origin);
    url.pathname = "/" + segments.join("/");
    return url.toString();
};

/**
 * Generates an array of alternate hreflang links
 * @param {string[]} localeKeys
 * @returns {{ hreflang: string, href: string }[]}
 */
export const generateHreflangs = () => {
    const locales = availableLocales().value;
    const currentPath = window.location.pathname;
    return locales["keys"].map((locale) => ({
        hreflang: locale,
        href: buildUrlForLocale(locale, currentPath),
    }));
};
