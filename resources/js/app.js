import "../css/app.css";
import "./bootstrap";

import { createInertiaApp } from "@inertiajs/vue3";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createApp, h } from "vue";
import { createHead } from "@vueuse/head";
import { ZiggyVue } from "../../vendor/tightenco/ziggy";
import { Link, Head } from "@inertiajs/vue3";
import FlagIcon from "vue-flag-icon";
import { i18nVue } from "laravel-vue-i18n";
import VueTheMask from "vue-the-mask";
import LaravelPermissionToVueJS from "../../vendor/zodexnl/spatie-permission-to-vue-inertia/src/js";

createInertiaApp({
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.vue`,
            import.meta.glob("./Pages/**/*.vue")
        ),
    setup({ el, App, props, plugin }) {
        return createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(ZiggyVue)
            .use(FlagIcon)
            .use(i18nVue, {
                resolve: async (lang) => {
                    const langs = import.meta.glob("../../lang/*.json");

                    const file = `../../lang/${lang}.json`;
                    if (langs[file]) {
                        return await langs[file]();
                    } else {
                        console.warn(
                            `[i18n] Translation file not found: ${file}`
                        );
                        return {}; // або кидати помилку, якщо критично
                    }
                },
            })
            .use(VueTheMask)
            .use(LaravelPermissionToVueJS)
            .use(createHead())
            .component("Link", Link)
            .component("Head", Head)
            .mount(el);
    },
    progress: {
        color: "#4B5563",
    },
});
