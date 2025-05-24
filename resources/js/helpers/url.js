// resources/js/helpers/url.js
import { usePage } from "@inertiajs/vue3";
import { isLocale, availableLocales } from "./index";
/**
 * Видаляє мовний префікс з URL-шляху
 * @param {string} path
 */
export const stripLocaleFromPath = (path) => {
    const segments = path.split("/").filter(Boolean);
    if (isLocale(segments[0])) segments.shift();
    return "/" + segments.join("/");
};

/**
 * Повертає canonical URL без мовного префікса
 */
export const getCanonicalUrl = () => {
    const fullPath = window.location ?? "";
    const origin = fullPath.origin;
    const segments = stripLocaleFromPath(fullPath.pathname);
    return origin + segments;
};

/**
 * Генерує URL для певної локалі, замінюючи мовний префікс або додаючи його
 */
export const buildUrlForLocale = (locale, currentPath) => {
    const url = new URL(window.location.href);
    let segments = url.pathname.split("/").filter(Boolean);

    if (segments.length && isLocale(segments[0])) {
        segments[0] = locale; // замінюємо існуючий префікс
    } else {
        segments.unshift(locale); // додаємо префікс, якщо нема
    }

    url.pathname = "/" + segments.join("/");
    return url.toString();
};

/**
 * Генерує масив об'єктів для тега hreflang
 */
export const generateHreflangs = () => {
    const locales = availableLocales();
    const currentPath = window.location.pathname;

    return locales.map((locale) => ({
        hreflang: locale,
        href: buildUrlForLocale(locale, currentPath),
    }));
};
