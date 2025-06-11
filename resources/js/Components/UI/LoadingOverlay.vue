<template>
    <TransitionRoot as="template" :show="show">
        <Dialog
            tabindex="0"
            :initialFocus="initialFocusRef"
            as="div"
            class="relative z-50"
            @close="show = false"
        >
            <TransitionChild
                as="template"
                enter="opacity-0"
                enter-to="opacity-100"
                leave="opacity-100"
                leave-to="opacity-0"
                class="transition-opacity duration-300"
            >
                <div class="fixed inset-0 bg-white bg-opacity-75" />
            </TransitionChild>

            <div
                class="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
                <TransitionChild
                    as="template"
                    enter="scale-95"
                    enter-to="scale-100"
                    leave="scale-100"
                    leave-to="scale-95"
                    class="transition-transform duration-300"
                >
                    <div class="w-full max-w-xs overflow-hidden">
                        <div class="h-1 relative bg-gray-100 rounded-full">
                            <div class="loading-progress-bar"></div>
                        </div>
                    </div>
                </TransitionChild>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup>
import { ref, watch } from "vue";
import { Dialog, TransitionChild, TransitionRoot } from "@headlessui/vue";

const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
});

const show = ref(props.show);
const initialFocusRef = ref(null);
// Watch for changes in the 'show' prop to update the internal state
watch(
    () => props.show,
    (newVal) => {
        show.value = newVal;
    }
);
</script>

<style scoped>
/* Styles for the animated progress bar */
.loading-progress-bar {
    height: 100%;
    width: 40%; /* Visible part of the bar */
    background-color: #27ae60; /* Tailwind's indigo-600 */
    position: absolute;
    top: 0;
    left: -40%; /* Start off-screen to the left */
    border-radius: inherit; /* Inherit border-radius from parent */
    animation: sweep-progress 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

@keyframes sweep-progress {
    0% {
        left: -40%;
    }
    100% {
        left: 100%;
    }
}
</style>
