<script setup>
import { computed, watch, ref } from "vue";
import { usePage } from "@inertiajs/vue3";
import { useAlertStore } from "@/Stores/alertStore";
import { IconX } from "@tabler/icons-vue";

const page = usePage();
const alertStore = useAlertStore();

// Локальний стан, який контролює, чи відображати повідомлення
const isVisible = ref(false);
// Локальний стан, який зберігає вміст повідомлення для відображення
const displayAlert = ref(null);

// Обчислюваний стан, що визначає поточне актуальне повідомлення
const currentSourceAlert = computed(() => {
    // Пріоритет для Flash-повідомлень Inertia
    return page.props.alert || alertStore.localAlert;
});

// **Синхронізація станів**
watch(
    currentSourceAlert,
    (newAlert) => {
        if (newAlert) {
            displayAlert.value = newAlert;
            isVisible.value = true;
        } else {
            // Якщо обидва джерела повідомлень порожні, приховуємо компонент
            isVisible.value = false;
        }
    },
    { immediate: true }
);

watch(
    () => page.props.errors,
    (errors) => {
        if (Object.keys(errors).length > 0) {
            displayAlert.value = {
                type: "error",
                message:
                    "Перевірте правильність заповнення полів на всіх мовах.",
            };
            isVisible.value = true;
        }
    },
    { deep: true }
);

// Обробник закриття
const closeAlert = () => {
    // 1. Приховати локальний компонент
    isVisible.value = false;

    // 2. Якщо повідомлення було з Pinia Store, очистити Store
    if (displayAlert.value === alertStore.localAlert) {
        alertStore.clearAlert();
    }

    // Якщо повідомлення було з Inertia Flash, воно просто приховується локально,
    // але залишається в пропсах до наступного реквесту Inertia, що є нормальним.
    // Наступний Inertia-візит/редирект видалить його з пропсів.
};

// ... решта логіки (alertClasses) залишається незмінною
const alertClasses = computed(() => {
    if (!displayAlert.value) return {};

    switch (displayAlert.value.type) {
        case "success":
            return {
                "bg-green-100": true,
                "border-green-400": true,
                "text-green-700": true,
            };
        case "error":
            return {
                "bg-red-100": true,
                "border-red-400": true,
                "text-red-700": true,
            };
        case "info":
        case "warning":
            return {
                "bg-yellow-100": true,
                "border-yellow-400": true,
                "text-yellow-700": true,
            };
        default:
            return {};
    }
});
</script>

<template>
    <Transition name="slide-fade">
        <div
            v-if="isVisible && displayAlert"
            :class="alertClasses"
            class="fixed text-sm px-2 py-2 flex items-center justify-between top-4 right-4 z-50 rounded-lg shadow-lg border-l-4 transition duration-300 ease-in-out"
            role="alert"
        >
            <div class="flex items-center">
                <svg
                    v-if="displayAlert.type === 'success'"
                    class="w-4 h-4 mr-2 fill-current text-green-500"
                    viewBox="0 0 20 20"
                >
                    <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                </svg>
                <svg
                    v-if="displayAlert.type === 'error'"
                    class="w-4 h-4 mr-2 fill-current text-red-500"
                    viewBox="0 0 20 20"
                >
                    <path
                        d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 9H6v2h2v-2zm3 0h-2v2h2v-2zm3 0h-2v2h2v-2zM4 10a6 6 0 1112 0 6 6 0 01-12 0z"
                    />
                </svg>

                <p class="font-bold">
                    {{
                        displayAlert.type.charAt(0).toUpperCase() +
                        displayAlert.type.slice(1)
                    }}
                    !
                </p>
                <p class="ml-2">{{ displayAlert.message }}</p>
            </div>
            <button @click="closeAlert" class="p-2 text-red-500">
                <IconX :size="18" stroke="2" />
            </button>
        </div>
    </Transition>
</template>

<style scoped>
/* Стилі для анімації залишаються без змін */
.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
}
</style>
