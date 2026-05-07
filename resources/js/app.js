import "../css/app.css";
import "./bootstrap";

import { createInertiaApp, Head, Link, usePage, router } from "@inertiajs/vue3";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createApp, h } from "vue";
import { ZiggyVue } from "../../vendor/tightenco/ziggy";
import { i18nVue } from "laravel-vue-i18n";
import FlagIcon from "vue-flag-icon";
import { createPinia } from "pinia";
import VueTheMask from "vue-the-mask";
import FloatingVue from "floating-vue";
import helper from "../plugins/helper";

import "floating-vue/dist/style.css";

let appName = import.meta.env.VITE_APP_NAME || "Laravel";
const pinia = createPinia();

createInertiaApp({
    title: (title) => title,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.vue`,
            import.meta.glob("./Pages/**/*.vue"),
        ),
    setup({ el, App, props, plugin }) {
        return createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(ZiggyVue)
            .use(i18nVue, {
                resolve: async (lang) => {
                    const langs = import.meta.glob("../../lang/*.json");
                    return await langs[`../../lang/${lang}.json`]();
                },
                // Якщо хочете, щоб замість порожнього рядка виводився сам ключ
                onMissingKey: (key) => key,
            })
            .use(FlagIcon)
            .use(pinia)
            .use(VueTheMask)
            .use(FloatingVue)
            .use(helper)
            .component("Head", Head)
            .component("Link", Link)
            .mount(el);
    },
    progress: {
        color: "rgb( 40, 125, 245)",
    },
});

router.on("navigate", (event) => {
    if (window.gtag) {
        window.gtag("config", "G-XXXXXXXX", {
            page_location: event.detail.page.url,
            page_title: document.title,
        });
    }

    // Для Facebook Pixel
    if (window.fbq) {
        window.fbq("track", "PageView");
    }
});
