// Import global CSS
import "../css/app.css";

// Import necessary libraries and plugins
import { createApp, h } from "vue"; // Vue core and render function
import { createInertiaApp, Link, Head } from "@inertiajs/vue3"; // Inertia integration
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createHead } from "@vueuse/head"; // Head manager
import { ZiggyVue } from "../../vendor/tightenco/ziggy"; // Ziggy for route generation
import FlagIcon from "vue-flag-icon"; // Country flag icons
import { i18nVue } from "laravel-vue-i18n"; // Localization plugin
import VueTheMask from "vue-the-mask"; // Input masking
import LaravelPermissionToVueJS from "../../vendor/zodexnl/spatie-permission-to-vue-inertia/src/js"; // Permission handling
import { cartStore } from "@/Stores/cart"; // Custom cart store

createInertiaApp({
    // Dynamically resolve page components from the Pages directory
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.vue`,
            import.meta.glob("./Pages/**/*.vue")
        ),

    setup({ el, App, props, plugin }) {
        // Create the Vue app instance
        const app = createApp({ render: () => h(App, props) });

        // Provide custom store globally for access in components
        app.provide("cartStore", cartStore);

        // Use required plugins and register global components
        app.use(plugin)
            .use(ZiggyVue) // Enables Laravel route usage
            .use(FlagIcon) // Country flag icons
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
                        return {}; // Return empty translations if file not found
                    }
                },
            })
            .use(VueTheMask) // Input masking plugin
            .use(LaravelPermissionToVueJS) // Permissions from backend to frontend
            .use(createHead()) // For dynamic head management
            .component("Link", Link) // Inertia navigation link
            .component("Head", Head) // Head metadata management
            .mount(el); // Mount the app
    },

    // Configure progress indicator color
    progress: {
        color: "#368D02",
    },
});
