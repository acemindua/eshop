<template>
    <TransitionRoot as="template" :show="visible">
        <Dialog
            as="div"
            class="relative z-50"
            @close="$emit('close')"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <!-- Overlay -->
            <TransitionChild
                as="template"
                enter="ease-out duration-300"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="ease-in duration-200"
                leave-from="opacity-100"
                leave-to="opacity-0"
            >
                <div class="fixed inset-0 bg-black/50" />
            </TransitionChild>

            <!-- Modal Panel -->
            <div
                class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0"
            >
                <TransitionChild
                    as="template"
                    enter="ease-out duration-300"
                    enter-from="opacity-0 scale-95"
                    enter-to="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leave-from="opacity-100 scale-100"
                    leave-to="opacity-0 scale-95"
                >
                    <DialogPanel
                        class="relative w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left shadow-xl transition-all"
                    >
                        <DialogTitle
                            id="modal-title"
                            class="text-xl font-semibold text-gray-900 mb-4"
                        >
                            {{ $t("Ваша корзина порожня") }}
                            <button
                                type="button"
                                class="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
                                @click="$emit('close')"
                            >
                                <XMarkIcon class="size-6" aria-hidden="true" />
                                <span class="sr-only">Close</span>
                            </button>
                        </DialogTitle>

                        <div
                            id="modal-description"
                            class="text-gray-600 mb-6 text-sm"
                        >
                            {{ $t("Додайте товари, щоб розпочати покупки.") }}
                        </div>

                        <div class="mx-auto max-w-sm py-4">
                            <button
                                type="button"
                                class="w-full rounded-lg bg-green-600 px-4 py-2 text-white font-semibold shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
                                @click="$emit('close')"
                            >
                                {{ $t("Продовжити покупки") }}
                            </button>
                        </div>
                    </DialogPanel>
                </TransitionChild>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup>
import {
    Dialog,
    DialogPanel,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
} from "@headlessui/vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import { defineProps, defineEmits } from "vue";

defineProps({
    visible: {
        type: Boolean,
        default: false,
    },
});

defineEmits(["close"]);
</script>

<style scoped>
/* Tailwind повністю керує стилями */
</style>
