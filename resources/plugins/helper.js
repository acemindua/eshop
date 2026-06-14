const helper = {
    install(app) {
        // 🔢 Базовий форматер чисел (реюз)
        const numberFormatter = (options = {}) =>
            new Intl.NumberFormat("uk-UA", options);

        // 💰 Ціна
        app.config.globalProperties.$formatPrice = (value) => {
            const num = Number(value);
            if (isNaN(num)) return "0 ₴";

            return numberFormatter({
                style: "currency",
                currency: "UAH",
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
            }).format(num);
        };

        // 🔢 Просто число
        app.config.globalProperties.$formatNumber = (value, minDecimal = 0) => {
            const num = Number(value);
            if (isNaN(num)) return "0";

            return numberFormatter({
                minimumFractionDigits: minDecimal,
                maximumFractionDigits: 2,
            }).format(num);
        };

        // 🔢 Серійник 00001
        app.config.globalProperties.$formatSerial = (value, length = 5) => {
            if (value === null || value === undefined || value === "")
                return "";
            return String(value).padStart(length, "0");
        };

        // 📅 Дата (uk-UA)
        app.config.globalProperties.$formatDate = (date, options = {}) => {
            if (!date) return "";

            const d = new Date(date);

            return new Intl.DateTimeFormat("uk-UA", {
                day: "2-digit",
                month: "long",
                year: "numeric",
                ...options,
            })
                .format(d)
                .replace(" р.", ""); // прибираємо "р."
        };

        // 📅 Коротка дата (аналог DD.MM.YY)
        app.config.globalProperties.$formatDateShort = (date) => {
            if (!date) return "";

            return new Intl.DateTimeFormat("uk-UA", {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
            }).format(new Date(date));
        };
    },
};

export default helper;
