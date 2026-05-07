<script setup>
import { computed } from "vue";

const props = defineProps({
    cart: {
        type: Object,
        default: () => ({ items: [], total: 0 }),
    },
    processing: Boolean,
});

const emit = defineEmits(["submit"]);

const formatPrice = (price = 0) => {
    return (
        new Intl.NumberFormat("uk-UA", {
            style: "decimal",
            minimumFractionDigits: 2,
        }).format(price) + " ₴"
    );
};

const items = computed(() => props.cart?.items || []);
const itemsCount = computed(() => items.value.length);
const total = computed(() => props.cart?.total || 0);
const finalTotal = computed(() => total.value); // Тут можна додати знижки/податки
</script>

<template>
    <div class="sticky top-4 space-y-4">
        <div class="bg-white border border-gray-200 p-6 shadow-sm">
            <h3
                class="text-xs uppercase tracking-widest font-bold mb-6 border-b border-gray-100 pb-2"
            >
                Ваше замовлення ({{ itemsCount }})
            </h3>

            <div
                class="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar"
            >
                <div v-for="item in items" :key="item.id" class="flex gap-4">
                    <div
                        class="w-16 h-16 bg-gray-50 border border-gray-100 flex-shrink-0 flex items-center justify-center overflow-hidden"
                    >
                        <img
                            v-if="item.image"
                            :src="item.image"
                            class="object-cover w-full h-full"
                        />
                        <span v-else class="text-[10px] text-gray-400"
                            >NO IMG</span
                        >
                    </div>

                    <div class="flex-grow">
                        <h4
                            class="text-[11px] font-bold leading-tight line-clamp-2 uppercase italic text-gray-800"
                        >
                            {{ item.name }}
                        </h4>
                        <div class="flex justify-between items-end mt-1">
                            <span class="text-[10px] text-gray-500 uppercase"
                                >к-сть: {{ item.quantity }}</span
                            >
                            <span class="text-xs font-bold">{{
                                formatPrice(item.price * item.quantity)
                            }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-8 pt-6 border-t border-black space-y-3">
                <div class="flex justify-between text-xs">
                    <span class="text-gray-500 uppercase tracking-tighter"
                        >Сума:</span
                    >
                    <span>{{ formatPrice(total) }}</span>
                </div>
                <div class="flex justify-between text-xs">
                    <span class="text-gray-500 uppercase tracking-tighter"
                        >Доставка:</span
                    >
                    <span class="text-[10px] font-bold uppercase"
                        >За тарифами перевізника</span
                    >
                </div>
                <div
                    class="flex justify-between text-base font-black pt-4 border-t border-gray-100"
                >
                    <span>РАЗОМ:</span>
                    <span>{{ formatPrice(finalTotal) }}</span>
                </div>
            </div>
        </div>

        <button
            @click="$emit('submit')"
            :disabled="processing"
            class="w-full bg-black text-white py-5 px-8 text-xs uppercase tracking-[0.2em] font-bold transition-all hover:bg-gray-900 disabled:bg-gray-400 flex items-center justify-center gap-3"
        >
            <span
                v-if="processing"
                class="animate-spin h-3 w-3 border-2 border-white border-t-transparent"
            ></span>
            {{ processing ? "Оформлюється..." : "Підтвердити замовлення" }}
        </button>

        <div
            class="text-[9px] text-gray-400 uppercase tracking-tight text-center px-4 leading-relaxed"
        >
            Натискаючи кнопку, ви погоджуєтесь з умовами
            <a href="#" class="underline">публічної оферти</a>.
        </div>
    </div>
</template>

<style scoped>
* {
    border-radius: 0 !important;
}
.custom-scrollbar::-webkit-scrollbar {
    width: 2px;
}
.custom-scrollbar::-webkit-scrollbar-track {
    background: #f1f1f1;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
    background: #000;
}
</style>
