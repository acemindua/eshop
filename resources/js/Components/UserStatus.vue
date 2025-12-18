<template>
    <div :class="['flex items-center space-x-1', sizeClasses[size]]">
        <div :class="['w-2 h-2 rounded-full', statusColor, statusRing]"></div>

        <span v-if="description" :class="statusTextColor">
            {{ statusText }}
        </span>
    </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
    // Об'єкт користувача з даними з БД
    user: {
        type: Object,
        required: true,
        // Очікуємо: { last_activity_human: '5 хвилин тому', is_online: true/false }
    },
    // Розмір компонента: 'sm' або 'md'
    size: {
        type: String,
        default: "sm",
        validator: (value) => ["sm", "md"].includes(value),
    },
    description: {
        type: Boolean,
        default: true,
    },
});

// --- КОНФІГУРАЦІЯ ---
const ACTIVE_THRESHOLD_MINUTES = 15; // Межа для статусу "Неактивний"

// Отримуємо останню активність як Carbon Human (як ми створили аксесор)
const lastActivity = computed(() => props.user.last_activity);
const isOnline = computed(() => props.user.is_online);

// --- ОБЧИСЛЕННЯ СТАТУСУ ---

const activityStatus = computed(() => {
    if (isOnline.value) {
        return "online";
    }

    // Якщо є last_activity, але користувач не онлайн, перевіряємо, чи був він нещодавно
    // Ми покладаємося на аксесор last_activity_human для відображення,
    // але для логіки "неактивний" потрібен сам час (last_activity)

    // *Примітка: Якщо last_activity_human виглядає як "10 хвилин тому",
    // але не більше ACTIVE_THRESHOLD_MINUTES, можна вважати його "Неактивним".
    // Оскільки аксесор 'last_activity_human' не містить точної інформації
    // для порівняння, ми просто використовуємо його як 'Offline'.

    if (lastActivity.value) {
        // Якщо користувач не онлайн, але є час активності:
        return "offline";
    }

    return "never";
});

// --- СТИЛІ ТА ТЕКСТ ---

const statusColor = computed(() => {
    switch (activityStatus.value) {
        case "online":
            return "bg-green-500";
        case "offline":
            return "bg-yellow-500";
        case "never":
        default:
            return "bg-gray-400";
    }
});

const statusTextColor = computed(() => {
    switch (activityStatus.value) {
        case "online":
            return "text-green-600 font-medium";
        case "offline":
            return "text-yellow-600";
        case "never":
        default:
            return "text-gray-500 italic";
    }
});

const statusText = computed(() => {
    switch (activityStatus.value) {
        case "online":
            return "Онлайн";
        case "offline":
            return `Останній візит: ${lastActivity.value}`;
        case "never":
        default:
            return "Не заходив";
    }
});

const sizeClasses = {
    sm: "text-xs",
    md: "text-sm",
};

const statusRing = computed(() => {
    return activityStatus.value === "online" ? "ring-2 ring-green-200" : "";
});
</script>
