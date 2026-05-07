<script setup>
import { computed, ref } from "vue";
import { usePage, Link } from "@inertiajs/vue3";
import {
    IconGardenCart,
    IconTrash,
    IconX,
    IconArrowRight,
} from "@tabler/icons-vue";

const page = usePage();
const isOpen = ref(false);

// Отримуємо дані з глобального пропса Inertia
const cartItems = computed(() => page.props.cart?.items || []);
const cartTotal = computed(() => page.props.cart?.total || 0);
const cartCount = computed(() => page.props.cart?.count || 0);

const toggleCart = () => {
    isOpen.value = !isOpen.value;
};

const closeCart = () => {
    isOpen.value = false;
};
</script>

<template>
    <div class="relative font-['Exo_2']">
        <button
            @click="toggleCart"
            class="p-2 border rounded-lg hover:bg-gray-50 transition-colors relative group"
            :class="{ 'border-brand bg-brand/5': isOpen }"
        >
            <IconGardenCart :stroke="1.5" :size="24" class="text-gray-700" />

            <span
                v-if="cartCount > 0"
                class="absolute -top-2 -right-2 bg-brand text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-sm"
            >
                {{ cartCount }}
            </span>
        </button>

        <transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="translate-y-1 opacity-0"
            enter-to-class="translate-y-0 opacity-100"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="translate-y-0 opacity-100"
            leave-to-class="translate-y-1 opacity-0"
        >
            <div
                v-if="isOpen"
                class="absolute right-0 mt-3 w-80 bg-white border border-gray-100 shadow-2xl rounded-2xl z-[100] overflow-hidden"
            >
                <div
                    class="p-4 border-b flex justify-between items-center bg-gray-50/50"
                >
                    <span
                        class="font-black uppercase text-[10px] tracking-[0.2em] text-gray-400"
                    >
                        {{ $t("Your Cart") }}
                    </span>
                    <button
                        @click="closeCart"
                        class="text-gray-400 hover:text-black transition"
                    >
                        <IconX :size="18" />
                    </button>
                </div>

                <div v-if="cartCount > 0" class="max-h-96 overflow-y-auto">
                    <div
                        v-for="item in cartItems"
                        :key="item.id"
                        class="p-4 border-b last:border-0 flex gap-3 hover:bg-gray-50 transition items-center"
                    >
                        <div
                            class="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden border border-gray-100"
                        >
                            <img
                                v-if="item.attributes?.image"
                                :src="item.attributes.image"
                                class="object-cover w-full h-full"
                            />
                        </div>

                        <div class="flex-grow min-w-0">
                            <h4
                                class="text-xs font-bold text-gray-900 truncate uppercase tracking-tight"
                            >
                                {{ item.name }}
                            </h4>
                            <div class="text-[10px] text-gray-500 font-medium">
                                {{ item.quantity }} × {{ item.price }} ₴
                            </div>
                        </div>

                        <div
                            class="text-sm font-black text-gray-900 whitespace-nowrap"
                        >
                            {{ item.price * item.quantity }} ₴
                        </div>
                    </div>
                </div>

                <div v-else class="p-10 text-center">
                    <p class="text-gray-400 text-sm italic">
                        {{ $t("Cart is empty") }}
                    </p>
                </div>

                <div
                    v-if="cartCount > 0"
                    class="p-4 bg-white border-t space-y-2"
                >
                    <div class="flex justify-between items-center mb-4 px-1">
                        <span
                            class="text-gray-400 text-[10px] font-bold uppercase tracking-widest"
                            >{{ $t("Total") }}:</span
                        >
                        <span
                            class="text-xl font-black tracking-tighter text-indigo-700"
                            >{{ cartTotal }} ₴</span
                        >
                    </div>

                    <div class="grid grid-cols-2 gap-2">
                        <Link
                            :href="route('cart.index')"
                            @click="closeCart"
                            class="flex items-center justify-center bg-gray-100 text-black py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-200 transition"
                        >
                            {{ $t("View Cart") }}
                        </Link>
                        <Link
                            :href="route('checkout')"
                            @click="closeCart"
                            class="flex items-center justify-center bg-black text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition shadow-lg shadow-gray-200"
                        >
                            {{ $t("Checkout") }}
                        </Link>
                    </div>
                </div>
            </div>
        </transition>

        <div
            v-if="isOpen"
            @click="closeCart"
            class="fixed inset-0 z-40 bg-transparent"
        ></div>
    </div>
</template>
