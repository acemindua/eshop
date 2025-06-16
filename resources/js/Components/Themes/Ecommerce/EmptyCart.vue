<template>
    <Modal :show="show">
        <div class="flex items-center justify-center min-h-screen">
            <div
                class="bg-white shadow rounded-lg p-6 text-center max-w-md w-full"
            >
                <h1 class="text-xl font-semibold text-gray-900 mb-3">
                    {{ $t("Ваша корзина порожня") }}
                </h1>
                <p class="text-gray-600 mb-6 text-sm">
                    {{ $t("Додайте товари, щоб розпочати покупки.") }}
                </p>
                <button
                    type="button"
                    class="w-full rounded-lg bg-green-600 px-4 py-2 text-white font-semibold shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
                    @click="$emit('close')"
                >
                    {{ $t("Продовжити покупки") }}
                </button>
            </div>
        </div>
    </Modal>
</template>

<script setup>
import Modal from "@/Components/Modal.vue";

defineProps({
    show: {
        type: Boolean,
        default: false,
    },
});
</script>
