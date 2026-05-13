<script setup>
import { ref, computed, watch } from "vue";
import { useForm } from "@inertiajs/vue3";
import Layout from "./layout/DefaultCheckoutLayout.vue";
import StepContact from "./Steps/StepContact.vue";
import StepDelivery from "./Steps/StepDelivery.vue";
import StepPayment from "./Steps/StepPayment.vue";
import OrderSummary from "./Partials/OrderSummary.vue";
import AuthModal from "@/Components/Public/Auth/AuthModal.vue";

const props = defineProps({
    data: Object,
});

const currentStep = ref(1);
const isAuthModalOpen = ref(false);

const authUser = computed(() => props.data?.authUser?.data || null);
const cart = computed(() => props.data?.cart || { items: [], total: 0, subtotal: 0 });

const form = useForm({
    name: authUser.value?.name || '',
    last_name: authUser.value?.last_name || '',
    phone: authUser.value?.phone ? authUser.value.phone.replace(/^380/, '') : '',
    email: authUser.value?.email || '',
    different_recipient: false,
    recipient_name: '',
    recipient_last_name: '',
    recipient_phone: '',
    delivery_method: '',
    city: '',
    address: '',
    payment_method: ''
});

const currentShippingPrice = computed(() => {
    const method = props.data?.shippingMethods?.find(m => m.alias === form.delivery_method);
    return method ? method.price : 0;
});

const nextStep = () => currentStep.value++;
const goToStep = (step) => {
    if (step < currentStep.value) currentStep.value = step;
};
</script>

<template>
    <Layout :current-step="currentStep" @go-to-step="goToStep">
        <div class="grid grid-cols-1 lg:grid-cols-12 min-h-screen">

            <!-- Ліва колонка: Форми кроків -->
            <div class="lg:col-span-7 border-r border-black">
                <div class="p-8 md:p-16">
                    <div class="max-w-xl mx-auto lg:ml-0">
                        <StepContact
                            v-if="currentStep === 1"
                            :form="form"
                            :auth-user="authUser"
                            @next="nextStep"
                            @open-auth="isAuthModalOpen = true"
                        />

                        <StepDelivery
                            v-if="currentStep === 2"
                            :form="form"
                            :warehouses="data?.warehouses"
                            :shipping-methods="data?.shippingMethods"
                            @next="nextStep"
                            @back="currentStep--"
                        />

                        <StepPayment
                            v-if="currentStep === 3"
                            :form="form"
                            :payment-methods="data?.paymentMethods"
                            @back="currentStep--"
                        />
                    </div>
                </div>
            </div>

            <!-- Права колонка: Список товарів -->
            <div class="lg:col-span-5 bg-zinc-50 relative">
                <div class="sticky top-20 p-8 md:p-16">
                    <OrderSummary
                        :items="cart.items"
                        :subtotal="cart.subtotal"
                        :total="Number(cart.total) + Number(currentShippingPrice)"
                        :shipping-price="currentShippingPrice"
                    />
                </div>
            </div>
        </div>

        <AuthModal :is-open="isAuthModalOpen" @close="isAuthModalOpen = false" />
    </Layout>
</template>
