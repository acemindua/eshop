import { createSSRApp, h } from "vue";
import { renderToString } from "@vue/server-renderer";
import { createInertiaApp, Head, Link } from "@inertiajs/vue3";
import createServer from "@inertiajs/vue3/server";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { ZiggyVue } from "../../vendor/tightenco/ziggy";
import { i18nVue } from "laravel-vue-i18n";
import { createPinia } from "pinia";
import FloatingVue from "floating-vue";
import helper from "../plugins/helper";

createServer((page) =>
    createInertiaApp({
        page,
        render: renderToString,
        title: (title) => title,
        resolve: (name) =>
            resolvePageComponent(
                `./Pages/${name}.vue`,
                import.meta.glob("./Pages/**/*.vue"),
            ),
        setup({ App, props, plugin }) {
            const pinia = createPinia();

            return createSSRApp({ render: () => h(App, props) })
                .use(plugin)
                .use(ZiggyVue, {
                    ...page.props.ziggy,
                    location: new URL(page.props.ziggy.location),
                })
                .use(i18nVue, {
                    resolve: (lang) => {
                        // Важливо: для SSR краще використовувати синхронне завантаження або передавати переклади через props
                        const langs = import.meta.glob("../../lang/*.json", {
                            eager: true,
                        });
                        return langs[`../../lang/${lang}.json`].default;
                    },
                })
                .use(pinia)
                .use(FloatingVue)
                .use(helper)
                .component("Head", Head)
                .component("Link", Link);
        },
    }),
);
