<script setup>
const props = defineProps({
    items: Array,
    total: [Number, String],
    subtotal: [Number, String],
    shippingPrice: [Number, String],
});

const formatPrice = (value) => value?.toLocaleString() + ' ₴';
</script>

<template>
    <div class="font-['Exo_2'] text-black uppercase">
        <h3 class="text-[11px] font-black tracking-[0.4em] mb-12 border-b border-black pb-4">
            {{ $t('Your Selection') }}
        </h3>

        <div class="space-y-8 mb-12">
            <div v-for="item in items" :key="item.id" class="flex gap-6 items-start">
                <div class="w-20 h-24 bg-white border border-black p-2 shrink-0 grayscale">
                    <img :src="item.image" class="w-full h-full object-contain mix-blend-multiply" />
                </div>
                <div class="flex-grow">
                    <h4 class="text-[11px] font-black leading-tight mb-2 italic tracking-tight">
                        {{ item.name }}
                    </h4>
                    <div class="flex justify-between items-end">
                        <span class="text-[9px] font-bold text-gray-400 tracking-widest">
                            QTY: {{ item.quantity }}
                        </span>
                        <span class="text-sm font-black italic">{{ formatPrice(item.price * item.quantity) }}</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="border-t-2 border-black pt-8 space-y-4">
            <div class="flex justify-between text-[10px] font-bold tracking-widest text-gray-400">
                <span>Subtotal</span>
                <span>{{ formatPrice(subtotal) }}</span>
            </div>
            <div class="flex justify-between text-[10px] font-bold tracking-widest text-gray-400">
                <span>Shipping</span>
                <span class="text-black italic font-black">{{ shippingPrice > 0 ? formatPrice(shippingPrice) : 'FREE' }}</span>
            </div>
            <div class="flex justify-between items-end pt-6">
                <span class="text-[11px] font-black tracking-[0.4em]">Total</span>
                <div class="text-right">
                    <span class="text-4xl font-black italic tracking-tighter leading-none">
                        {{ formatPrice(total) }}
                    </span>
                </div>
            </div>
        </div>

        <div class="mt-12 p-4 border border-black border-dashed text-[8px] font-bold text-gray-400 tracking-widest">
            * TAXES AND DUTIES INCLUDED. SECURE CHECKOUT.
        </div>
    </div>
</template>
