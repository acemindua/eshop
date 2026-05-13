<template>
    <div :class="['flex items-center space-x-1.5', sizeClasses[size]]">
        <!-- Крапка статусу з динамічним розміром -->
        <div :class="[
            dotSizeClasses[size],
            'rounded-full transition-colors duration-300', 
            statusColor, 
            statusRing
        ]"></div>

        <!-- Текст статусу -->
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
    },
    // Додано підтримку 'xs'
    size: {
        type: String,
        default: "sm",
        validator: (value) => ["xs", "sm", "md"].includes(value),
    },
    description: {
        type: Boolean,
        default: true,
    },
});

// --- КОНФІГУРАЦІЯ ---
const isOnline = computed(() => props.user.is_online);
const lastActivity = computed(() => props.user.last_activity);

// --- ОБЧИСЛЕННЯ СТАТУСУ ---
const activityStatus = computed(() => {
    if (isOnline.value) return "online";
    if (lastActivity.value) return "offline";
    return "never";
});

// --- СТИЛІ ТА ТЕКСТ ---

const statusColor = computed(() => {
    switch (activityStatus.value) {
        case "online": return "bg-green-500";
        case "offline": return "bg-yellow-500";
        case "never": return "bg-gray-400";
        default: return "bg-gray-400";
    }
});

const statusTextColor = computed(() => {
    switch (activityStatus.value) {
        case "online": return "text-green-600 font-medium";
        case "offline": return "text-yellow-600";
        case "never": return "text-gray-500 italic";
        default: return "text-gray-500";
    }
});

const statusText = computed(() => {
    switch (activityStatus.value) {
        case "online": return "Онлайн";
        case "offline": return `Був: ${lastActivity.value}`;
        case "never": return "Не заходив";
        default: return "Невідомо";
    }
});

// Класи для контейнера (розмір шрифту)
const sizeClasses = {
    xs: "text-[10px] leading-tight",
    sm: "text-xs",
    md: "text-sm",
};

// Класи для крапки (щоб вона була меншою на 'xs')
const dotSizeClasses = {
    xs: "w-1.5 h-1.5",
    sm: "w-2 h-2",
    md: "w-2.5 h-2.5",
};

const statusRing = computed(() => {
    return activityStatus.value === "online" ? "ring-2 ring-green-200" : "";
});
</script>