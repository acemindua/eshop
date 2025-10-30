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
            e.message
        );
    }
    return {
        server: {
            cors: {
                origin: [
                    `${protocol}//eshop.com`,
                    `${protocol}//app.eshop.com`,
                ],
                methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
                allowedHeaders: ["Content-Type", "Authorization"],
                credentials: true,
            },
        },
        plugins: [
            laravel({
                input: "resources/js/app.js",
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
    };
});
