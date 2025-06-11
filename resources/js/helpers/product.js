/**
 * Універсальна функція плюралізації для української мови.
 * @param {number | null | undefined} count Кількість.
 * @param {string[]} forms Масив з 3 форм слова: [однина, 2-4, множина].
 * Наприклад: ['день', 'дні', 'днів']
 * @returns {string} Відформатований рядок (наприклад, "1 день", "2 дні", "5 днів").
 */
export function pluralizeUk(count, forms) {
    if (
        count === null ||
        count === undefined ||
        isNaN(count) ||
        !Array.isArray(forms) ||
        forms.length !== 3
    ) {
        // Повертаємо множину або пустий рядок у випадку помилки/некоректних даних
        return (
            (count !== null && !isNaN(count) ? count + " " : "") +
            (forms[2] || "")
        );
    }

    const absCount = Math.abs(count);
    const lastDigit = absCount % 10;
    const lastTwoDigits = absCount % 100;

    // Випадки для 11-14
    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
        return `${count} ${forms[2]}`; // множина
    }

    // Випадок для 1
    if (lastDigit === 1) {
        return `${count} ${forms[0]}`; // однина
    }

    // Випадки для 2, 3, 4
    if (lastDigit >= 2 && lastDigit <= 4) {
        return `${count} ${forms[1]}`; // 2-4
    }

    // Усі інші випадки
    return `${count} ${forms[2]}`; // множина
}
