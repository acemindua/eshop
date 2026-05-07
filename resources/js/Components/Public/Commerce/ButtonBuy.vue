<script setup>
import { router, usePage } from "@inertiajs/vue3";
import { IconShoppingBag, IconCheck } from "@tabler/icons-vue";
import { computed } from "vue";

const props = defineProps({
    id: { type: Number, required: true },
    title: { type: String },
    price: { type: [Number, String] },
    qty: { type: Number, required: true, default: 1 },
});

const page = usePage();

// ВИПРАВЛЕНО: Звертаємось напряму до props.id
const isInCart = computed(() => {
    const items = page.props.cart?.items || {};
    // DarrylDecode використовує ID товару як ключі в масиві/об'єкті
    return !!items[props.id];
});

const addToCart = () => {
    router.post(
        route("cart.add"),
        {
            id: props.id,
            name: props.title,
            price: props.price,
            quantity: props.qty,
        },
        {
            preserveScroll: true,
            onSuccess: () => {
                console.log("Товар додано");
            },
        },
    );
};
</script>

<template>
    <button
        @click.stop="addToCart"
        type="button"
        :class="[
            'px-6 py-3 rounded-lg inline-flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 shadow-sm font-[\'Exo_2\'] uppercase tracking-wider text-sm font-bold',
            isInCart
                ? 'bg-green-600 text-white shadow-green-100'
                : 'bg-black text-white hover:bg-gray-800',
        ]"
    >
        <IconCheck v-if="isInCart" :stroke="2" :size="24" />
        <IconShoppingBag v-else :stroke="1.5" :size="24" />

        <span>
            {{ isInCart ? $t("In Cart") : $t("Buy") }}
        </span>
    </button>
</template>
