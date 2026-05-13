import { defineConfig, loadEnv } from "vite";
import laravel from "laravel-vite-plugin";
import vue from "@vitejs/plugin-vue";
import i18n from "laravel-vue-i18n/vite";

export default defineConfig(({ mode }) => {
    
    const env = loadEnv(mode, process.cwd());
    const domain = env.APP_URL || "http://localhost";
    let protocol = "http:";
    let hostname = "localhost";
    try {
        const appUrl = new URL(domain);
        protocol = appUrl.protocol;
        hostname = appUrl.host;
    } catch (e) {
        console.error(
            "Failed to parse APP_URL. Using defaults (http://localhost). Error:",
            e.message,
        );
    }
    return {
        
        server: {
            host: "127.0.0.1",
            cors: false, // вимикаємо стандартний, пишемо свій
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods":
                    "GET, POST, PUT, DELETE, PATCH, OPTIONS",
                "Access-Control-Allow-Headers":
                    "X-Requested-With, content-type, Authorization",
            },
        },
        plugins: [
            laravel({
                input: "resources/js/app.js",
                ssr: 'resources/js/ssr.js',
                refresh: true,
            }),
            vue({
                template: {
                    transformAssetUrls: {
                        base: null,
                        includeAbsolute: false,
                    },
                },
            }),
            i18n(),
        ],
        ssr: {
            noExternal: [
                'moment',
                'laravel-vue-i18n',
                'vue-flag-icon',
                'floating-vue',
                '@inertiajs/vue3',
                '@vue/server-renderer',
            ],
        },
    };
});
