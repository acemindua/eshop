import { defineStore } from "pinia";

export const useAlertStore = defineStore("alert", {
    state: () => ({
        localAlert: null,
        // Змінна для зберігання ідентифікатора таймера
        timer: null,
    }),

    actions: {
        setAlert(type, message) {
            this.localAlert = { type, message };

            // 1. Очищуємо попередній таймер, якщо він існує
            if (this.timer) {
                clearTimeout(this.timer);
            }

            // 2. Встановлюємо новий таймер на 5 секунд
            this.timer = setTimeout(() => {
                this.clearAlert();
            }, 5000); // Повідомлення зникне через 5 секунд
        },

        clearAlert() {
            // 1. Очищуємо локальний стан
            this.localAlert = null;

            // 2. Важливо: Очищуємо таймер після спрацювання або ручного закриття
            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
            }
        },
    },
});
