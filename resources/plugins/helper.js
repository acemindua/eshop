import moment from "moment";
import "moment/dist/locale/uk";

const helper = {
    install(app) {
        // --- Нова функція для цін (виправлено) ---
        app.config.globalProperties.$formatPrice = (value) => {
            const num = parseFloat(value);

            if (isNaN(num)) return "0 ₴";

            // Intl.NumberFormat автоматично додає нерозривні пробіли
            // та коректно обробляє кому для української мови
            const formatter = new Intl.NumberFormat("uk-UA", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
            });

            return `${formatter.format(num)}`;
        };

        // --- Ваша нова функція для 00001 ---
        app.config.globalProperties.$formatSerial = (value, length = 5) => {
            if (value === null || value === undefined || value === "")
                return "";
            return String(value).padStart(length, "0");
        };

        // --- Існуюча функція для чисел (гроші, вага тощо) ---
        app.config.globalProperties.$fomatterNumber = (
            value,
            minDecimalPart = 0,
        ) => {
            const num = parseFloat(value);
            if (isNaN(num)) return "0";

            // Використовуємо той самий підхід, що й у $formatPrice для консистентності
            const formatter = new Intl.NumberFormat("uk-UA", {
                minimumFractionDigits: minDecimalPart > 0 ? 2 : 0,
                maximumFractionDigits: 2,
            });

            return formatter.format(num);
        };

        // --- Існуюча функція для дат ---
        app.config.globalProperties.$fomatterData = (
            date,
            mask = "DD.MM.YY",
        ) => {
            if (!date || date === "") return "";
            return moment(new Date(date)).locale("uk").format(mask);
        };
    },
};

export default helper;
