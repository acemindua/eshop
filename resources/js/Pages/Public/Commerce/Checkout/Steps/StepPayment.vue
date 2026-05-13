<script setup>
import { computed } from "vue";
import {
    IconChevronLeft,
    IconCreditCard,
    IconCash,
    IconReceipt2,
    IconCircleCheck,
    IconLock
} from "@tabler/icons-vue";

const props = defineProps({
    form: Object,
    paymentMethods: Array,
});

const emit = defineEmits(["submit", "back"]);

// Перевірка валідності кроку
const isStepValid = computed(() => !!props.form.payment_method);

// Логіка підбору іконок
const getIcon = (code) => {
    switch (code) {
        case 'cash': return IconCash;
        case 'invoice': return IconReceipt2;
        default: return IconCreditCard;
    }
};

const selectPayment = (code) => {
    props.form.payment_method = code;
    props.form.clearErrors('payment_method');
};
</script>

<template>
    <div class="space-y-12 py-4 font-['Exo_2'] animate-in fade-in slide-in-from-right-4 duration-700 text-black">

        <!-- Header -->
        <header class="flex flex-col border-b border-black pb-8 gap-2">
            <h2 class="text-3xl font-black uppercase tracking-tighter italic">
                03. {{ $t("Payment") }}
            </h2>
            <p class="text-gray-500 text-[10px] font-bold tracking-widest uppercase">
                {{ $t("Select your preferred payment method") }}
            </p>
        </header>

        <!-- Payment Methods Grid -->
        <div class="grid grid-cols-1 gap-4">
            <div
                v-for="method in paymentMethods"
                :key="method.code"
                @click="selectPayment(method.code)"
                class="group relative flex items-center justify-between p-6 border-2 transition-all duration-300 cursor-pointer bg-white"
                :class="form.payment_method === method.code
                    ? 'border-black ring-1 ring-black bg-zinc-50'
                    : 'border-gray-100 hover:border-black'"
            >
                <div class="flex items-center gap-6">
                    <!-- Checkbox Style -->
                    <div class="w-5 h-5 border-2 border-black flex items-center justify-center transition-colors">
                        <div v-if="form.payment_method === method.code" class="w-2.5 h-2.5 bg-black"></div>
                    </div>

                    <div class="flex flex-col">
                        <span class="text-[11px] font-black uppercase tracking-[0.2em]">
                            {{ method.label }}
                        </span>
                        <span class="text-[9px] text-gray-400 uppercase font-bold mt-1 tracking-wider">
                            {{ method.description }}
                        </span>
                    </div>
                </div>

                <div class="text-black opacity-40 group-hover:opacity-100 transition-opacity">
                    <component :is="getIcon(method.code)" size="24" stroke-width="1.5" />
                </div>
            </div>

            <p v-if="form.errors.payment_method" class="text-red-500 text-[10px] font-bold uppercase mt-2">
                {{ $t(form.errors.payment_method) }}
            </p>
        </div>

        <!-- Security Info -->
        <div class="flex items-center justify-center gap-4 py-6 border-y border-dashed border-gray-200 opacity-60">
            <IconLock size="16" class="text-black" />
            <p class="text-[9px] font-black uppercase tracking-[0.2em]">
                {{ $t("Secure encrypted checkout") }}
            </p>
        </div>

        <!-- Footer Buttons -->
        <footer class="pt-6 flex flex-col gap-6">
            <div class="flex justify-between items-center gap-4">
                <button
                    @click="emit('back')"
                    type="button"
                    :disabled="form.processing"
                    class="group flex items-center gap-4 px-6 py-6 border border-black/10 hover:border-black transition-all duration-300 disabled:opacity-30"
                >
                    <IconChevronLeft size="20" class="group-hover:-translate-x-1 transition-transform" />
                    <span class="text-[11px] font-black uppercase tracking-[0.3em]">{{ $t("Back") }}</span>
                </button>

                <button
                    @click="emit('submit')"
                    type="button"
                    :disabled="!isStepValid || form.processing"
                    class="group flex-grow flex items-center justify-between gap-12 bg-black text-white pl-10 pr-6 py-6 hover:bg-zinc-800 transition-all duration-300 disabled:bg-gray-200 disabled:cursor-not-allowed"
                >
                    <span class="text-[11px] font-black uppercase tracking-[0.3em]">
                        {{ form.processing ? $t('Processing...') : $t('Confirm Order') }}
                    </span>
                    <div v-if="!form.processing" class="hidden md:block w-12 h-px bg-white/30 group-hover:w-16 transition-all duration-500"></div>

                    <div v-if="form.processing" class="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    <IconCircleCheck v-else size="20" />
                </button>
            </div>

            <p class="text-center text-[8px] font-black uppercase tracking-[0.6em] text-gray-300 italic">
                Step 03 / 03
            </p>
        </footer>
    </div>
</template>
