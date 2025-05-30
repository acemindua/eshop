import { getCanonicalUrl, generateHreflangs } from "./url";

/**
 * Generates full <head> metadata object for useHead() or similar
 * @param {Object} item - Metadata source object
 * @param {string} appName - Application name for titleTemplate
 * @param {string[]} localeKeys - Supported locale keys
 * @returns {Object}
 */
export const generateHeadMeta = (
    item,
    appName = "Laravel",
) => {
    const description =
        item.meta_description ??
        item.description ??
        item.content?.slice(0, 160) ??
        "";
    const canonical = getCanonicalUrl();
    const image = item.image ?? "/images/logo.jpg";

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
                content: description,
            },
            {
                property: "og:title",
                content: item.meta_title ?? item.title,
            },
            {
                property: "og:description",
                content: description,
            },
            {
                property: "og:image",
                content: image,
            },
            {
                property: "og:url",
                content: canonical,
            },
            {
                property: "og:type",
                content: "website",
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
 * Extracts up to 10 keywords (4+ characters) from title + description
 * @param {string} title
 * @param {string} description
 * @returns {string}
 */
export const generateKeywords = (title = "", description = "") => {
    const text = `${title}, ${description}`.toLowerCase();
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
