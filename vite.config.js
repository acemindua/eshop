import { defineConfig, loadEnv } from "vite";
import laravel from "laravel-vite-plugin";
import vue from "@vitejs/plugin-vue";
import i18n from "laravel-vue-i18n/vite";

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd());
    const appUrl = new URL(env.APP_URL);
    const protocol = appUrl.protocol;
    const hostname = appUrl.hostname;

    return {
        server: {
            cors: {
                origin: [
                    `${protocol}//app.${hostname}`,
                    `${protocol}//${hostname}`,
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
