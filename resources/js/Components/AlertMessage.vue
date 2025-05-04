<template>
    <teleport to="body" v-if="alerts.length">
        <div class="fixed bottom-4 right-4 z-50 space-y-2">
            <div
                v-for="alert in alerts"
                :key="alert.id"
                class="flex items-center p-4 rounded-md shadow-lg text-white text-sm border"
                :class="{
                    'bg-green-500/85 border-green-500':
                        alert.type === 'success',
                    'bg-orange-500/85 border-orange-500':
                        alert.type === 'warning',
                    'bg-red-500/85 border-red-500': alert.type === 'danger',
                }"
            >
                <component :is="alertIcon(alert.type)" class="w-5 h-5 mr-3" />
                <span class="drop-shadow">{{ alert.message }}</span>
                <button
                    @click="removeAlert(alert.id)"
                    aria-label="Close"
                    class="text-white hover:text-gray-200 ml-4"
                >
                    <IconSquareRoundedX class="w-4 h-4" />
                </button>
            </div>
        </div>
    </teleport>
</template>

<script setup>
import { usePage } from "@inertiajs/vue3";
import { computed, watch } from "vue";
import useAlerts from "@/Composables/useAlerts";
import {
    IconAlertCircleFilled,
    IconAlertTriangleFilled,
    IconCircleCheckFilled,
    IconSquareRoundedX,
} from "@tabler/icons-vue";

const errors = computed(() => usePage().props.errors);
const flashAlert = computed(() => usePage().props.flash?.alert || null);
const { addAlert, removeAlert, alerts } = useAlerts();

watch(
    flashAlert,
    (newAlert) => {
        if (newAlert && newAlert.message) {
            addAlert(newAlert);
        }
    },
    { deep: true, immediate: true }
);

watch(errors, (newErrors) => {
    if (newErrors && Object.keys(newErrors).length > 0) {
        const messages = Object.values(newErrors).flat().join(" ");
        addAlert({ type: "danger", message: messages });
    }
});

const alertIcon = (type) => {
    switch (type) {
        case "success":
            return IconCircleCheckFilled;
        case "warning":
            return IconAlertTriangleFilled;
        case "danger":
            return IconAlertCircleFilled;
        default:
            return IconAlertCircleFilled;
    }
};
</script>
