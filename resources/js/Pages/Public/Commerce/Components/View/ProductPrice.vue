<template>
    <div class="flex flex-col justify-end">
        <span
            v-if="hasDiscount && q > 0"
            class="text-xs text-gray-400 line-through"
        >
            {{ $formatPrice(price.old_price) }}
        </span>

        <span
            class="text-lg md:text-xl transition-colors font-semibold"
            :class="priceClass"
        >
            {{ $formatPrice(price.price) }}
        </span>
    </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
    q: { type: Number, required: true },
    hasDiscount: { type: Boolean, default: false },
    price: {
        type: Object,
        required: true,
        validator: (p) => "price" in p,
    },
});

// Виносимо логіку класів, щоб не перевантажувати шаблон
const priceClass = computed(() => {
    if (props.q <= 0) return "text-gray-400";
    return props.hasDiscount ? "text-red-500" : "text-gray-900";
});
</script>
