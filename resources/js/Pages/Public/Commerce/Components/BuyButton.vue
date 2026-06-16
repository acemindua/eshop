<script setup>
import { usePage, router } from "@inertiajs/vue3";
import {
    IconShoppingBagPlus,
    IconShoppingBagCheck,
    IconLoader2,
} from "@tabler/icons-vue";
import { computed, ref } from "vue";

const props = defineProps({
    data: {
        type: Object,
        required: true,
    },
});

const page = usePage();
const isProcessing = ref(false);

const isInCart = computed(() => {
    const items = page.props.cart?.items || [];
    return items.some((item) => item.id === props.data.id);
});

const addToCart = () => {
    if (isProcessing.value || isInCart.value) return;

    router.post(
        route("cart.add"),
        {
            id: props.data.id,
            name: props.data.title || props.data.name,
            price: props.data.price,
            quantity: props.data?.qty || 1,
        },
        {
            preserveScroll: true,
            onStart: () => (isProcessing.value = true),
            onFinish: () => (isProcessing.value = false),
        },
    );
};
</script>

<template>
    <button
        @click.stop="addToCart"
        :disabled="isProcessing || isInCart"
        class="relative overflow-hidden flex items-center justify-center gap-2 px-2.5 md:pr-4 py-2.5 rounded-full transition-all duration-300 focus:outline-none font-bold text-sm shadow-sm"
        :class="[
            isInCart
                ? 'bg-gray-100 text-gray-600 cursor-default'
                : 'bg-brand text-white hover:bg-brand-darkactive:scale-95',
        ]"
    >
        <div class="shine-effect"></div>

        <IconLoader2 v-if="isProcessing" class="w-6 h-6 animate-spin" />
        <template v-else>
            <IconShoppingBagCheck v-if="isInCart" :stroke="2" class="w-6 h-6" />
            <IconShoppingBagPlus v-else :stroke="2" class="w-6 h-6" />
        </template>
        <span class="hidden md:block">
            {{ isInCart ? $t("In Cart") : $t("Buy") }}
        </span>
    </button>
</template>
<style scoped>
/* Ефект відблиску */
.shine-effect {
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.4),
        transparent
    );
    /* transition видалено, щоб не заважати анімації */
}

/* Коли батьківська картка (group) має hover, запускаємо анімацію 1 раз */
.group:hover .shine-effect {
    /* Прибрали infinite, додали forwards, щоб промінь не повертався назад */
    animation: shine 0.8s ease-in-out forwards;
}

@keyframes shine {
    0% {
        left: -100%;
    }
    100% {
        left: 100%;
    }
}
</style>
