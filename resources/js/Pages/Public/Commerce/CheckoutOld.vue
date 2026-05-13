<script setup>
import { useForm, usePage } from "@inertiajs/vue3";
import { ref, watch, computed } from "vue";
import ContactInfo from "./Partials/ContactInfo.vue";
import ShippingInfo from "./Partials/ShippingInfo.vue";
import PaymentMethods from "./Partials/PaymentMethods.vue";
import OrderSummary from "./Partials/OrderSummary.vue";
import InputError from "@/Components/UI/InputError.vue";

const props = defineProps({
    paymentMethods: Array,
    warehouses: Array, // Твої склади з БД
});

const page = usePage();
const cart = computed(() => page.props.cart);
const user = page.props.auth.user?.data; // Отримуємо юзера з глобальних пропсів Inertia

const form = useForm({
    // Якщо юзер є, підставляємо дані, якщо ні — пустий рядок
    name: user?.name || "",
    last_name: user?.last_name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    delivery_method: "pickup",
    warehouse_id: null,
    payment_method: null,
    city_ref: "",
    city_name: "",
    warehouse_ref: "",
    warehouse_name: "",
});

watch(
    () => page.props.auth.user,
    (newUser) => {
        if (newUser) {
            form.first_name = newUser.first_name;
            form.last_name = newUser.last_name;
            form.email = newUser.email;
            form.phone = newUser.phone;
        }
    },
    { deep: true },
);
// Скидання даних при зміні методу доставки
watch(
    () => form.delivery_method,
    (method) => {
        if (method === "pickup") {
            form.city_ref =
                form.city_name =
                form.warehouse_ref =
                form.warehouse_name =
                    "";
            if (props.warehouses?.length > 0)
                form.warehouse_id = props.warehouses[0].id;
        } else {
            form.warehouse_id = null;
        }
    },
    { immediate: true },
);

const submitOrder = () => form.post(route("order.store"));
</script>

<template>
    <div class="max-w-6xl mx-auto py-12 px-4">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div class="lg:col-span-8 space-y-10">
                <ContactInfo
                    v-model:name="form.name"
                    v-model:last_name="form.last_name"
                    v-model:email="form.email"
                    v-model:phone="form.phone"
                    :errors="form.errors"
                />

                <!-- СЕКЦІЯ ДОСТАВКИ -->
                <div class="bg-white p-6 border border-gray-200 shadow-sm">
                    <h2
                        class="text-sm font-bold uppercase tracking-[0.2em] mb-8 text-black"
                    >
                        2. Спосіб доставки
                    </h2>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        <button
                            type="button"
                            @click="form.delivery_method = 'pickup'"
                            class="border p-5 flex flex-col transition-all"
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
                                >З нашого складу</span
                            >
                        </button>

                        <button
                            type="button"
                            @click="form.delivery_method = 'nova_poshta'"
                            class="border p-5 flex flex-col transition-all"
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

                    <!-- Вибір нашого складу -->
                    <div
                        v-if="form.delivery_method === 'pickup'"
                        class="space-y-3 animate-in fade-in slide-in-from-top-2"
                    >
                        <div
                            v-for="w in warehouses"
                            :key="w.id"
                            @click="form.warehouse_id = w.id"
                            class="cursor-pointer border p-4 flex justify-between items-center transition-all"
                            :class="
                                form.warehouse_id === w.id
                                    ? 'border-black ring-1 ring-black'
                                    : 'border-gray-100 hover:border-gray-300'
                            "
                        >
                            <div>
                                <p
                                    class="text-sm font-bold text-black uppercase"
                                >
                                    {{ w.title }}
                                </p>
                                <p class="text-xs text-gray-500">
                                    {{ w.city }}, {{ w.address }}
                                </p>
                            </div>
                            <div
                                class="w-4 h-4 rounded-full border flex items-center justify-center"
                                :class="
                                    form.warehouse_id === w.id
                                        ? 'bg-black border-black'
                                        : 'border-gray-300'
                                "
                            >
                                <div
                                    v-if="form.warehouse_id === w.id"
                                    class="w-1.5 h-1.5 bg-white rounded-full"
                                ></div>
                            </div>
                        </div>
                        <InputError :message="form.errors.warehouse_id" />
                    </div>

                    <!-- Вибір Нової Пошти -->
                    <div v-if="form.delivery_method === 'nova_poshta'">
                        <ShippingInfo
                            v-model:city_ref="form.city_ref"
                            v-model:city_name="form.city_name"
                            v-model:warehouse_ref="form.warehouse_ref"
                            v-model:warehouse_name="form.warehouse_name"
                            :errors="form.errors"
                        />
                    </div>
                </div>

                <!-- СЕКЦІЯ ОПЛАТИ -->
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
