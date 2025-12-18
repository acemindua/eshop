import "../css/app.css";
import "./bootstrap";

import { createInertiaApp, Head, Link, usePage } from "@inertiajs/vue3";
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
    title: (title, appName) => {
        const { props } = usePage();
        let siteName = props?.settings?.site_name || appName; // Значення за замовчуванням (fallback)
        return `${title} - ${siteName}`;
    },
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.vue`,
            import.meta.glob("./Pages/**/*.vue")
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
        color: "#4B5563",
    },
});
