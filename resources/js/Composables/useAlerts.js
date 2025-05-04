// useAlerts.js
import { ref } from "vue";

const alerts = ref([]);

export default function useAlerts() {
    const removeAlert = (id) => {
        alerts.value = alerts.value.filter((alert) => alert.id !== id);
    };

    const addAlert = (alert) => {
        const id = Date.now(); // Генеруємо унікальний id
        alerts.value.push({
            id,
            ...alert,
        });

        setTimeout(() => removeAlert(id), 5000);

        if (alerts.value.length > 5) {
            alerts.value.shift(); // Видаляємо перший елемент
        }
    };

    return {
        alerts,
        addAlert,
        removeAlert,
    };
}
