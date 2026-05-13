<script setup>
import { ref, computed, watch } from "vue";
import { useForm, usePage } from "@inertiajs/vue3";
import CheckoutLayout from "./Partials/CheckoutLayout.vue";
import StepContact from "./Steps/StepContact.vue";
import StepDelivery from "./Steps/StepDelivery.vue";
import StepPayment from "./Steps/StepPayment.vue";
import OrderSummary from "./Partials/OrderSummary.vue";
import AuthModal from "@/Components/Public/Auth/AuthModal.vue";

const props = defineProps({
    cart: Object,
});

const isAuthModalOpen = ref(false);
const authMode = ref("login");

const openLogin = () => {
    authMode.value = "login";
    isAuthModalOpen.value = true;
};
const currentStep = ref(1);

const page = usePage();

// 1. ПЕРЕВІР СТРУКТУРУ: якщо у тебе стандартний ресурс Laravel, то там .data.
// Якщо просто масив пропсів - прибери .data.
// Також додаємо фолбек на порожні рядки відразу тут.
const user = computed(() => page.props?.auth?.user?.data || {});

const form = useForm({
    // Використовуємо оператор ?? для гарантії String
    name: user.value?.name ?? "",
    last_name: user.value?.last_name ?? "",
    email: user.value?.email ?? "",
    phone: user.value?.phone ?? "+380",
    password: "",

    different_recipient: false,
    recipient_name: "",
    recipient_last_name: "",
    recipient_phone: "+380",

    delivery_method: "nova_poshta",
    city: null,
    warehouse: null,

    payment_method: "card",
});

const submit = () => {
    form.post(route("checkout.store"));
};

// 2. ВИПРАВЛЕННЯ WATCH:
// Потрібно слідкувати за функцією, яка повертає значення, або за user.value.
// Також додаємо перевірку на наявність даних у newUser.
watch(
    () => user.value,
    (newUser) => {
        if (newUser && Object.keys(newUser).length > 0) {
            form.name = newUser.name ?? "";
            form.last_name = newUser.last_name ?? "";
            form.email = newUser.email ?? "";
            // Оновлюємо телефон тільки якщо він є у юзера і не порожній
            if (newUser.phone) {
                form.phone = newUser.phone;
            }
        }
    },
    { deep: true }, // Додаємо deep, якщо об'єкт user може змінюватися всередині
);
</script>

<template>
    <div class="max-w-7xl mx-auto px-4 py-10">
        <div class="lg:grid lg:grid-cols-12 lg:gap-x-12">
            <!-- Ліва частина: Кроки -->
            <div class="lg:col-span-7 space-y-6">
                <CheckoutLayout :current-step="currentStep">
                   
                    <StepContact
                        v-if="currentStep === 1"
                        :form="form"
                        @next="currentStep = 2"
                        @open-auth="openLogin"
                    />

                    <StepDelivery
                        v-if="currentStep === 2"
                        :form="form"
                        @next="currentStep = 3"
                        @back="currentStep = 1"
                    />

                    <StepPayment
                        v-if="currentStep === 3"
                        :form="form"
                        @back="currentStep = 2"
                        @submit="submit"
                    />
                </CheckoutLayout>
            </div>
            <!-- Модалка чекає тут -->
            <AuthModal
                :is-open="isAuthModalOpen"
                :initial-mode="authMode"
                @close="isAuthModalOpen = false"
            />
            <!-- Права частина: Кошик (Sticky) -->
            <div class="lg:col-span-5 mt-10 lg:mt-0">
                <OrderSummary :cart="cart" :form="form" />
            </div>
        </div>
    </div>
</template>
