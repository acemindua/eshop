import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import vue from "@vitejs/plugin-vue";
import i18n from "laravel-vue-i18n/vite";

export default defineConfig({
    server: {
        cors: {
            origin: "*",
            methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            allowedHeaders: ["Content-Type", "Authorization"],
            credentials: true,
        },
    },
    plugins: [
        i18n(),
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
                compilerOptions: {
                    isCustomElement: (tag) => tag.includes("swiper"),
                },
            },
        }),
    ],
});
