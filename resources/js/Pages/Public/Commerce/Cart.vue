<template>
    <Head>
        <title>{{ $t("Your Cart") }}</title>
    </Head>

    <Layout>
        <div class="min-h-screen bg-gray-100 p-6 md:p-12">
            <div class="max-w-5xl mx-auto">
                <h1
                    class="text-3xl font-black mb-10 tracking-tighter uppercase italic text-gray-900"
                >
                    {{ $t("Shopping Cart") }}
                </h1>

                <div
                    v-if="cartItems.length > 0"
                    class="grid grid-cols-1 lg:grid-cols-12 gap-12"
                >
                    <div class="lg:col-span-8 space-y-4">
                        <div
                            v-for="item in cartItems"
                            :key="item.id"
                            class="bg-white p-4 md:p-6 rounded-2xl border border-gray-200 flex flex-col md:flex-row gap-6 items-center transition-hover hover:shadow-xl hover:shadow-gray-200/50"
                        >
                            <div
                                class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-gray-50"
                            >
                                <img
                                    v-if="item.attributes?.image"
                                    :src="item.attributes.image"
                                    class="h-full w-full object-cover"
                                />
                            </div>

                            <div class="flex-1 text-center md:text-left">
                                <h3
                                    class="text-sm font-black uppercase tracking-tight text-gray-900 leading-tight"
                                >
                                    {{ item.name }}
                                </h3>
                                <p class="text-xs text-gray-400 mt-1 italic">
                                    Ціна за одиницю: {{ item.price }} ₴
                                </p>
                            </div>

                            <div
                                class="flex items-center gap-3 bg-gray-100 p-1 rounded-xl"
                            >
                                <button
                                    @click="
                                        updateQuantity(
                                            item.id,
                                            item.quantity - 1,
                                        )
                                    "
                                    class="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm hover:bg-gray-50 active:scale-90 transition"
                                    :disabled="item.quantity <= 1"
                                >
                                    <span class="font-bold text-lg">-</span>
                                </button>
                                <span
                                    class="w-8 text-center font-black text-sm"
                                    >{{ item.quantity }}</span
                                >
                                <button
                                    @click="
                                        updateQuantity(
                                            item.id,
                                            item.quantity + 1,
                                        )
                                    "
                                    class="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm hover:bg-gray-50 active:scale-90 transition"
                                >
                                    <span class="font-bold text-lg">+</span>
                                </button>
                            </div>

                            <div
                                class="flex flex-col items-end gap-2 min-w-[100px]"
                            >
                                <p
                                    class="font-black text-lg text-indigo-700 tracking-tighter"
                                >
                                    {{ item.price * item.quantity }} ₴
                                </p>
                                <button
                                    @click="removeItem(item.id)"
                                    class="text-[10px] uppercase font-black tracking-widest text-red-500 hover:text-red-700 transition"
                                >
                                    {{ $t("Remove") }}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="lg:col-span-4">
                        <div
                            class="bg-white p-8 rounded-3xl border-2 border-gray-900 sticky top-8 shadow-2xl shadow-indigo-100"
                        >
                            <h2
                                class="text-xl font-black uppercase tracking-widest border-b-2 border-gray-100 pb-4 mb-6"
                            >
                                {{ $t("Summary") }}
                            </h2>

                            <div class="space-y-4 mb-8">
                                <div
                                    class="flex justify-between text-sm font-bold uppercase text-gray-500"
                                >
                                    <span>{{ $t("Items") }}</span>
                                    <span>{{ cartItems.length }}</span>
                                </div>
                                <div
                                    class="flex justify-between items-end border-t border-gray-100 pt-4"
                                >
                                    <span
                                        class="text-sm font-black uppercase italic"
                                        >{{ $t("Total amount") }}</span
                                    >
                                    <span
                                        class="text-3xl font-black text-gray-900 tracking-tighter"
                                        >{{ cartTotal }} ₴</span
                                    >
                                </div>
                            </div>

                            <Link
                                :href="route('checkout')"
                                class="block w-full bg-black text-white text-center py-5 rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-indigo-700 transition-all active:scale-[0.97]"
                            >
                                {{ $t("Go to Checkout") }}
                            </Link>

                            <Link
                                :href="route('home')"
                                class="block w-full text-center mt-4 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-900 transition"
                            >
                                ← {{ $t("Continue Shopping") }}
                            </Link>
                        </div>
                    </div>
                </div>

                <div
                    v-else
                    class="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300"
                >
                    <div
                        class="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-10 w-10 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M16 11V7a4 4 0 11-8 0v4M5 9h14l1 12H4L5 9z"
                            />
                        </svg>
                    </div>
                    <h2
                        class="text-2xl font-black uppercase italic tracking-tighter text-gray-900"
                    >
                        {{ $t("Your cart is empty") }}
                    </h2>
                    <p class="text-gray-500 mt-2 mb-8">
                        {{ $t("Add some fertilizers to start your order") }}
                    </p>
                    <Link
                        :href="route('home')"
                        class="bg-black text-white px-10 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-indigo-700 transition"
                    >
                        {{ $t("To Catalog") }}
                    </Link>
                </div>
            </div>
        </div>
    </Layout>
</template>

<script setup>
import Layout from "@/Layouts/Public/Landing/SimpleLayout.vue";
import { Head, Link, usePage, router } from "@inertiajs/vue3";
import { computed } from "vue";

const page = usePage();
const cartItems = computed(() => page.props.cart?.items || []);
const cartTotal = computed(() => page.props.cart?.total || 0);

const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;

    router.patch(
        route("cart.update", id),
        { quantity },
        {
            preserveScroll: true,
        },
    );
};

const removeItem = (id) => {
    if (confirm("Видалити цей товар?")) {
        router.delete(route("cart.destroy", id), {
            preserveScroll: true,
        });
    }
};
</script>
