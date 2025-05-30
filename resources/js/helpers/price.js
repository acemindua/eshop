/**
 * Форматування ціни
 * @param {number|string} value - Вхідне значення ціни
 * @param {Object} options - Опції форматування
 * @param {number} options.roundTo - Заокруглення (10, 100, 1000)
 * @param {number} options.decimals - Кількість знаків після коми
 * @param {boolean} options.spaceSeparator - Чи використовувати пробіли замість ком
 * @param {number} options.rate - Курс переведення (наприклад, 1 USD → 38 UAH)
 * @returns {string} Відформатована ціна
 */
export function formatPrice(
    value,
    { roundTo = 1, decimals = 2, spaceSeparator = true, rate = 1 } = {}
) {
    let number = parseFloat(value);

    if (isNaN(number)) return "0.00";

    // Переведення за курсом
    number *= rate;

    // Заокруглення
    number = Math.round(number / roundTo) * roundTo;

    // Форматування з фіксованими знаками
    const parts = number.toFixed(decimals).split(".");

    // Додавання роздільників тисяч
    parts[0] = parts[0].replace(
        /\B(?=(\d{3})+(?!\d))/g,
        spaceSeparator ? " " : ","
    );

    return parts.join(".");
}
