import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/**/*.vue", // Make sure this line exists!
        "./resources/js/**/*.vue",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["'Exo 2'", ...defaultTheme.fontFamily.sans],
            },
            colors: {
                brand: {
                    DEFAULT: "rgb(var(--brand-color) / <alpha-value>)",
                    hover: "rgb(var(--brand-color-hover) / <alpha-value>)",
                    light: "rgb(var(--brand-color) / 0.1)", // для фонів іконок
                },
            },
        },
    },

    plugins: [forms],
};
