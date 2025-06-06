<template>
    <TransitionRoot as="template" :show="visible">
        <Dialog as="div" class="relative z-50" @close="$emit('close')">
            <TransitionChild
                as="template"
                enter="ease-out duration-300"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="ease-in duration-200"
                leave-from="opacity-100"
                leave-to="opacity-0"
            >
                <div
                    class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                />
            </TransitionChild>

            <div class="fixed inset-0 z-50 w-screen overflow-y-auto">
                <div
                    class="flex min-h-full items-center justify-center p-4 text-center sm:p-0"
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
                            class="relative transform overflow-hidden rounded-lg bg-white p-6 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md text-center"
                        >
                            <DialogTitle
                                as="h3"
                                class="text-xl font-semibold mb-4 leading-6 text-gray-900"
                            >
                                {{ $t("Ваша корзина порожня") }}
                            </DialogTitle>
                            <div class="mt-2">
                                <p class="text-gray-600 mb-6">
                                    {{
                                        $t(
                                            "Додайте товари, щоб розпочати покупки."
                                        )
                                    }}
                                </p>
                            </div>
                            <div class="mt-5 sm:mt-6">
                                <button
                                    type="button"
                                    class="inline-flex w-full justify-center rounded-lg bg-green-600 px-4 py-2 text-white font-semibold shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                                    @click="$emit('close')"
                                >
                                    {{ $t("Продовжити покупки") }}
                                </button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
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
/* No additional custom CSS needed, Tailwind classes handle the animations. */
</style>
