import moment from "moment";
import "moment/dist/locale/uk";

const helper = {
    install(app) {
        // --- Ваша нова функція для 00001 ---
        app.config.globalProperties.$formatSerial = (value, length = 5) => {
            if (value === null || value === undefined || value === "")
                return "";
            return String(value).padStart(length, "0");
        };

        // --- Існуюча функція для чисел (гроші, вага тощо) ---
        app.config.globalProperties.$fomatterNumber = (
            value,
            minDecimalPart = 0
        ) => {
            if (typeof value !== "number" || isNaN(value)) {
                return 0;
            }

            let number = parseFloat(value).toFixed(2);
            const [integerPart, decimalPart] = number.split(".");

            number = parseInt(integerPart).toLocaleString("uk-UA");

            if (decimalPart && parseInt(decimalPart) !== 0) {
                number += `.${decimalPart}`;
            } else if (minDecimalPart !== 0) {
                number += `.00`;
            }

            return number.replace(".", ",");
        };

        // --- Існуюча функція для дат ---
        app.config.globalProperties.$fomatterData = (
            date,
            mask = "DD.MM.YY"
        ) => {
            if (date === "") return "";
            return date
                ? moment(new Date(date)).locale("uk").format(mask)
                : null;
        };
    },
};

export default helper;
