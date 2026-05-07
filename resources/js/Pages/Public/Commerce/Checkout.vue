<script setup>
import { useForm, usePage } from "@inertiajs/vue3";
import { ref, watch, computed } from "vue";
import ContactInfo from "./Partials/ContactInfo.vue";
import ShippingInfo from "./Partials/ShippingInfo.vue";
import PaymentMethods from "./Partials/PaymentMethods.vue"; // Наш новий компонент
import OrderSummary from "./Partials/OrderSummary.vue";

const props = defineProps({
    paymentMethods: {
        type: Array,
        required: true,
    },
});

const page = usePage();
const cart = computed(() => page.props.cart);

const form = useForm({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    delivery_method: "pickup",
    payment_method: "card", // дефолтний метод
    city_ref: "",
    city_name: "",
    warehouse_ref: "",
    warehouse_name: "",
});

const isAuthModalOpen = ref(false);

const syncUserData = (user) => {
    if (user) {
        const data = user.data || user;
        form.first_name = data.first_name || data.name || "";
        form.last_name = data.last_name || "";
        form.email = data.email || "";
        form.phone = data.phone || "";
        form.defaults();
    }
};

watch(
    () => page.props.auth.user,
    (newUser) => syncUserData(newUser),
    { immediate: true, deep: true },
);

const submitOrder = () => {
    form.post(route("orders.store"));
};
</script>

<template>
    <div class="max-w-6xl mx-auto py-12 px-4">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div class="lg:col-span-8 space-y-10">
                <ContactInfo
                    v-model:first_name="form.first_name"
                    v-model:last_name="form.last_name"
                    v-model:email="form.email"
                    v-model:phone="form.phone"
                    :errors="form.errors"
                    @open-auth="isAuthModalOpen = true"
                />

                <div class="bg-white p-6 border border-gray-200 shadow-sm">
                    <h2
                        class="text-sm font-bold uppercase tracking-[0.2em] mb-8 text-black"
                    >
                        2. Спосіб доставки
                    </h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button
                            @click="form.delivery_method = 'pickup'"
                            class="border p-5 flex flex-col text-left transition-all"
                            :class="
                                form.delivery_method === 'pickup'
                                    ? 'border-black bg-black text-white'
                                    : 'border-gray-200 text-gray-400 hover:border-black'
                            "
                        >
                            <span
                                class="text-xs font-bold uppercase tracking-widest"
                                >Самовивіз</span
                            >
                            <span class="text-[10px] mt-1 opacity-70"
                                >Львів, вул. Промислова, 5</span
                            >
                        </button>

                        <button
                            @click="form.delivery_method = 'nova_poshta'"
                            class="border p-5 flex flex-col text-left transition-all"
                            :class="
                                form.delivery_method === 'nova_poshta'
                                    ? 'border-black bg-black text-white'
                                    : 'border-gray-200 text-gray-400 hover:border-black'
                            "
                        >
                            <span
                                class="text-xs font-bold uppercase tracking-widest"
                                >Нова Пошта</span
                            >
                            <span class="text-[10px] mt-1 opacity-70"
                                >У відділення</span
                            >
                        </button>
                    </div>

                    <Transition
                        enter-active-class="transition duration-300 ease-out"
                        enter-from-class="opacity-0 -translate-y-4"
                        enter-to-class="opacity-100 translate-y-0"
                    >
                        <div
                            v-if="form.delivery_method === 'nova_poshta'"
                            class="mt-8 pt-8 border-t border-gray-100"
                        >
                            <ShippingInfo
                                v-model:city_ref="form.city_ref"
                                v-model:city_name="form.city_name"
                                v-model:warehouse_ref="form.warehouse_ref"
                                v-model:warehouse_name="form.warehouse_name"
                                :errors="form.errors"
                            />
                        </div>
                    </Transition>
                </div>

                <div class="bg-white p-6 border border-gray-200 shadow-sm">
                    <h2
                        class="text-sm font-bold uppercase tracking-[0.2em] mb-8 text-black"
                    >
                        3. Спосіб оплати
                    </h2>
                    <PaymentMethods
                        v-model="form.payment_method"
                        :methods="paymentMethods"
                        :errors="form.errors"
                    />
                </div>
            </div>

            <aside class="lg:col-span-4">
                <OrderSummary
                    :cart="cart"
                    :processing="form.processing"
                    @submit="submitOrder"
                />
            </aside>
        </div>
    </div>
</template>
