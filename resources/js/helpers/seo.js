import { getCanonicalUrl, generateHreflangs } from "./index";

/**
 * Генерує head-мета для useHead()
 * @param {Object} item - об'єкт з title, description, content, status
 * @param {String} appName - назва застосунку
 * @returns {Object}
 */
export const generateHeadMeta = (item, appName = "Laravel") => {
    const description =
        item.meta_description ??
        item.description ??
        item.content?.slice(0, 160) ??
        "";
    const canonical = getCanonicalUrl();
    const image = item.image ?? "/images/logo.jpg"; // 🔁 якщо немає зображення — логотип

    return {
        title: item.meta_title ?? item.title,
        titleTemplate: `%s - ${appName}`,
        meta: [
            {
                name: "robots",
                content: item.status ? "index, follow" : "noindex, nofollow",
            },
            {
                name: "keywords",
                content:
                    item.meta_keywords ??
                    generateKeywords(item.title, description),
            },
            {
                name: "description",
                content: item.description,
            },
            // Open Graph
            {
                property: "og:title",
                content: item.meta_title ?? item.title,
            },
            {
                property: "og:description",
                content: description,
            },

            /* {
                property: "og:image",
                content: image,
            }, */

            {
                property: "og:url",
                content: canonical,
            },
            {
                property: "og:type",
                content: "website", // або "article" — залежно від типу сторінки
            },
            {
                property: "og:site_name",
                content: appName,
            },
        ],
        link: [
            {
                rel: "canonical",
                href: canonical,
            },
            ...generateHreflangs().map((link) => ({
                rel: "alternate",
                hreflang: link.hreflang,
                href: link.href,
            })),
        ],
    };
};

/**
 * Генерує ключові слова з тексту (до 10 слів, більше 3 символів)
 */
export const generateKeywords = (title = "", description = "") => {
    const text = `${title}, ${description ?? ""}`.toLowerCase();
    return [
        ...new Set(
            text
                .replace(/[^\p{L}\s]/gu, "")
                .split(/\s+/)
                .filter((word) => word.length > 3)
        ),
    ]
        .slice(0, 10)
        .join(", ");
};
