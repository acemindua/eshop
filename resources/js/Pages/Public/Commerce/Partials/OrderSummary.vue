<script setup>
import { ref, computed } from "vue";
import {
    IconShoppingCart,
    IconTruckDelivery,
    IconReceipt2,
    IconChevronDown,
    IconChevronUp,
    IconInfoCircle,
} from "@tabler/icons-vue";

const props = defineProps({
    cart: { type: Object, required: true },
    form: { type: Object, required: true },
});

const isMobileExpanded = ref(false);
const promoCode = ref("");
const isApplyingPromo = ref(false);

// Безпечний підрахунок суми
const subtotal = computed(() => props.cart?.total_price || 0);

// Логіка доставки
const deliveryFee = computed(() => {
    // Якщо самовивіз (pickup) — 0, інакше 80 (можна змінити на логіку з API)
    return props.form.delivery_method === "pickup" ? 0 : 80;
});

const total = computed(() => subtotal.value + deliveryFee.value);

const formatPrice = (value) => {
    return new Intl.NumberFormat("uk-UA", {
        style: "currency",
        currency: "UAH",
        maximumFractionDigits: 0,
    }).format(value);
};

const applyPromo = () => {
    if (!promoCode.value) return;
    isApplyingPromo.value = true;
    // Імітація запиту
    setTimeout(() => {
        isApplyingPromo.value = false;
        alert("Промокод не дійсний");
    }, 800);
};
</script>

<template>
    <div class="sticky top-6 space-y-6">
        <!-- Мобільний хедер підсумку -->
        <div
            class="lg:hidden bg-white border border-gray-100 rounded-2xl shadow-sm transition-all duration-500"
        >
            <button
                @click="isMobileExpanded = !isMobileExpanded"
                class="flex items-center justify-between w-full p-5"
            >
                <div class="flex items-center gap-3">
                    <div class="relative">
                        <IconShoppingCart size="20" class="text-black" />
                        <span
                            class="absolute -top-2 -right-2 bg-black text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold"
                        >
                            {{ cart?.items?.length || 0 }}
                        </span>
                    </div>
                    <span
                        class="text-[10px] font-black uppercase tracking-widest text-gray-900"
                        >Ваше замовлення</span
                    >
                </div>
                <div class="flex items-center gap-3">
                    <span class="font-black text-sm">{{
                        formatPrice(total)
                    }}</span>
                    <component
                        :is="isMobileExpanded ? IconChevronUp : IconChevronDown"
                        size="16"
                        class="text-gray-400"
                    />
                </div>
            </button>
        </div>

        <!-- Основний блок -->
        <div
            class="bg-white border border-gray-50 rounded-[2rem] overflow-hidden shadow-2xl shadow-gray-200/50 transition-all duration-700"
            :class="[!isMobileExpanded ? 'hidden lg:block' : 'block']"
        >
            <!-- Список товарів -->
            <div
                class="p-8 border-b border-gray-50 max-h-[380px] overflow-y-auto custom-scrollbar"
            >
                <h3
                    class="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mb-8 hidden lg:block"
                >
                    Склад замовлення
                </h3>

                <div class="space-y-8">
                    <div
                        v-for="item in cart?.items"
                        :key="item.id"
                        class="flex gap-5 group"
                    >
                        <div
                            class="relative flex-shrink-0 w-16 h-20 bg-gray-50 rounded-xl overflow-hidden border border-gray-50"
                        >
                            <img
                                :src="item.image"
                                :alt="item.name"
                                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div class="absolute inset-0 bg-black/5"></div>
                        </div>

                        <div
                            class="flex-1 flex flex-col justify-center min-w-0"
                        >
                            <h4
                                class="text-[11px] font-bold text-gray-900 uppercase tracking-tight leading-tight"
                            >
                                {{ item.name }}
                            </h4>
                            <div class="flex items-center gap-2 mt-2">
                                <span
                                    class="text-[10px] text-gray-400 font-medium"
                                    >{{ item.quantity }} шт. ×</span
                                >
                                <span
                                    class="text-[10px] text-gray-900 font-bold"
                                    >{{ formatPrice(item.price) }}</span
                                >
                            </div>
                        </div>

                        <div
                            class="flex items-center text-[11px] font-black text-gray-900"
                        >
                            {{ formatPrice(item.price * item.quantity) }}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Деталізація ціни -->
            <div class="p-8 bg-gray-50/30 space-y-4">
                <div
                    class="flex justify-between text-[10px] font-bold uppercase tracking-widest text-gray-400"
                >
                    <span>Товари</span>
                    <span class="text-gray-900">{{
                        formatPrice(subtotal)
                    }}</span>
                </div>

                <div
                    class="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-gray-400"
                >
                    <div class="flex items-center gap-2">
                        <IconTruckDelivery size="14" stroke-width="3" />
                        <span>Доставка</span>
                    </div>
                    <span v-if="deliveryFee > 0" class="text-gray-900">{{
                        formatPrice(deliveryFee)
                    }}</span>
                    <span v-else class="text-green-600 font-black">Free</span>
                </div>

                <!-- Поле промокоду -->
                <div class="pt-4 border-t border-gray-100">
                    <div class="relative group">
                        <input
                            v-model="promoCode"
                            type="text"
                            placeholder="ПРОМОКОД"
                            class="w-full bg-white border-0 border-b border-gray-100 px-0 py-3 text-[10px] font-black tracking-[0.2em] focus:ring-0 focus:border-black transition-all outline-none placeholder:text-gray-200"
                        />
                        <button
                            @click="applyPromo"
                            :disabled="isApplyingPromo || !promoCode"
                            class="absolute right-0 top-1/2 -translate-y-1/2 text-[9px] font-black uppercase tracking-widest hover:text-blue-600 disabled:text-gray-300 transition-colors"
                        >
                            {{ isApplyingPromo ? "..." : "Ок" }}
                        </button>
                    </div>
                </div>

                <!-- Підсумок -->
                <div class="pt-6 flex justify-between items-end">
                    <div class="space-y-1">
                        <p
                            class="text-[9px] font-black text-gray-400 uppercase tracking-[0.3em]"
                        >
                            Всього до сплати
                        </p>
                        <p
                            class="text-3xl font-black text-gray-900 leading-none tracking-tighter"
                        >
                            {{ formatPrice(total) }}
                        </p>
                    </div>
                    <div
                        class="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center shadow-lg shadow-black/20"
                    >
                        <IconReceipt2 size="22" stroke-width="1.5" />
                    </div>
                </div>
            </div>
        </div>

        <!-- Інфо-картка (Більш стильна) -->
        <div
            class="group bg-black rounded-3xl p-6 transition-all duration-500 hover:-translate-y-1"
        >
            <div class="flex gap-4 items-start">
                <IconInfoCircle
                    class="text-white w-5 h-5 flex-shrink-0"
                    stroke-width="1.5"
                />
                <div class="space-y-1">
                    <p
                        class="text-[10px] font-black text-white uppercase tracking-widest"
                    >
                        Обробка замовлення
                    </p>
                    <p
                        class="text-[9px] text-gray-400 leading-relaxed uppercase tracking-tighter"
                    >
                        Відправка протягом 24 годин після підтвердження
                        менеджером.
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
    width: 2px;
}
.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
    background: #000;
}

/* Плавна анімація для мобільного випадаючого списку */
@media (max-width: 1023px) {
    .bg-white {
        animation: slideDown 0.4s ease-out;
    }
}

@keyframes slideDown {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
