<script setup>
import { computed, watch, ref } from "vue";
import { usePage } from "@inertiajs/vue3";
import { useAlertStore } from "@/Stores/alertStore";
import {
    IconX,
    IconCheck,
    IconAlertCircle,
    IconInfoCircle,
} from "@tabler/icons-vue";

const page = usePage();
const alertStore = useAlertStore();

const isVisible = ref(false);
const displayAlert = ref(null);
const manuallyClosed = ref(false);

// Computed state for Flash messages and Pinia
const currentSourceAlert = computed(() => {
    return page.props.alert || alertStore.localAlert;
});

// Synchronization of standard messages (Success/Info/Warning)
watch(
    currentSourceAlert,
    (newAlert) => {
        if (newAlert) {
            manuallyClosed.value = false;
            displayAlert.value = newAlert;
            isVisible.value = true;
        } else if (
            !page.props.errors ||
            Object.keys(page.props.errors).length === 0
        ) {
            isVisible.value = false;
        }
    },
    { immediate: true, deep: true },
);

// Dynamic rendering of the ACTUAL Laravel validation error
watch(
    () => page.props.errors,
    (errors) => {
        if (errors && Object.keys(errors).length > 0) {
            manuallyClosed.value = false;

            // Get the first specific error from the object (e.g., for the 'image' field)
            const errorKeys = Object.keys(errors);
            const firstErrorField = errorKeys[0];
            const firstErrorMessage = errors[firstErrorField];

            displayAlert.value = {
                type: "error",
                // If there's one error — show it. If multiple — append the remaining count.
                message:
                    errorKeys.length > 1
                        ? `${firstErrorMessage} (And ${errorKeys.length - 1} more errors)`
                        : firstErrorMessage,
            };
            isVisible.value = true;
        }
    },
    { deep: true, immediate: true },
);

// Automatically hide success alerts after 5 seconds
watch(isVisible, (visible) => {
    if (visible && displayAlert.value?.type === "success") {
        setTimeout(() => {
            if (!manuallyClosed.value) {
                closeAlert();
            }
        }, 5000);
    }
});

const closeAlert = () => {
    isVisible.value = false;
    manuallyClosed.value = true;

    // Clear the local store if it was used
    if (alertStore.localAlert) {
        alertStore.clearAlert();
    }

    // Nullify the flash in Inertia props to avoid the "zombie alert" effect on back navigation
    if (page.props.alert) {
        page.props.alert = null;
    }
};

// Dynamic classes for the container
const alertClasses = computed(() => {
    if (!displayAlert.value) return {};

    switch (displayAlert.value.type) {
        case "success":
            return "bg-green-50 border-green-400 text-green-800 dark:bg-gray-800 dark:text-green-400 dark:border-green-800";
        case "error":
            return "bg-red-50 border-red-400 text-red-800 dark:bg-gray-800 dark:text-red-400 dark:border-red-800";
        case "info":
            return "bg-blue-50 border-blue-400 text-blue-800 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800";
        case "warning":
            return "bg-yellow-50 border-yellow-400 text-yellow-800 dark:bg-gray-800 dark:text-yellow-400 dark:border-yellow-800";
        default:
            return "bg-white border-slate-300 text-slate-800";
    }
});

// Dynamic classes for the close button to match the theme
const closeButtonClasses = computed(() => {
    if (!displayAlert.value) return "";

    switch (displayAlert.value.type) {
        case "success":
            return "text-green-500 hover:bg-green-100 dark:hover:bg-gray-700";
        case "error":
            return "text-red-500 hover:bg-red-100 dark:hover:bg-gray-700";
        case "info":
            return "text-blue-500 hover:bg-blue-100 dark:hover:bg-gray-700";
        case "warning":
            return "text-yellow-600 hover:bg-yellow-100 dark:hover:bg-gray-700";
        default:
            return "text-slate-500 hover:bg-slate-100";
    }
});
</script>

<template>
    <Transition name="slide-fade">
        <div
            v-if="isVisible && displayAlert"
            :class="alertClasses"
            class="fixed text-sm p-3 flex items-center justify-between top-4 right-4 z-50 rounded-lg shadow-xl border-l-4 min-w-[320px] max-w-md transition duration-300 ease-in-out"
            role="alert"
        >
            <div class="flex items-center gap-2.5 mr-4">
                <IconCheck
                    v-if="displayAlert.type === 'success'"
                    :size="20"
                    class="shrink-0 text-green-500"
                />
                <IconAlertCircle
                    v-else-if="displayAlert.type === 'error'"
                    :size="20"
                    class="shrink-0 text-red-500"
                />
                <IconAlertCircle
                    v-else-if="displayAlert.type === 'warning'"
                    :size="20"
                    class="shrink-0 text-yellow-500"
                />
                <IconInfoCircle
                    v-else
                    :size="20"
                    class="shrink-0 text-blue-500"
                />

                <div>
                    <span
                        class="font-bold uppercase text-[10px] tracking-wider block opacity-75 leading-none"
                    >
                        {{ displayAlert.type }}
                    </span>
                    <p
                        class="mt-1 leading-tight font-medium text-slate-900 dark:text-slate-100"
                    >
                        {{ displayAlert.message }}
                    </p>
                </div>
            </div>

            <button
                @click="closeAlert"
                :class="closeButtonClasses"
                class="p-1.5 rounded-md transition-colors duration-200 shrink-0"
            >
                <IconX :size="16" stroke="2.5" />
            </button>
        </div>
    </Transition>
</template>

<style scoped>
.slide-fade-enter-active {
    transition: all 0.25s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(30px);
    opacity: 0;
}
</style>
