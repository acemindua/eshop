<script setup>
import {
    IconArrowRight,
    IconArrowLeft,
    IconMapPin
} from "@tabler/icons-vue";
import NovaPoshtaTool from "@/Components/DeliveryTools/NovaPoshtaTool.vue";
import { defineAsyncComponent } from "vue";

const props = defineProps({
    form: Object,
    shippingMethods: Array,
    warehouses: Array
});

const emit = defineEmits(["next", "back"]);

const selectWarehouse = (w) => {
    if (!w) return;
    props.form.city = w.city;
    props.form.warehouse = w.address;
    props.form.clearErrors('warehouse');
};
const deliveryComponents = {
    nova_poshta: defineAsyncComponent(() => import("@/Components/DeliveryTools/NovaPoshtaTool.vue")),
    ukr_poshta: defineAsyncComponent(() => import("@/Components/DeliveryTools/UkrPoshtaTool.vue")),
    pickup: defineAsyncComponent(() => import("@/Components/DeliveryTools/PickupTool.vue")),
};
const selectMethod = (alias) => {
    props.form.delivery_method = alias;
    props.form.clearErrors();

    // Очищаємо дані доставки при зміні методу
    props.form.city = '';
    props.form.warehouse = '';
    props.form.city_ref = '';
    props.form.warehouse_ref = '';

    if (alias === 'pickup' && props.warehouses?.length > 0) {
        selectWarehouse(props.warehouses[0]);
    }
};

const validateAndNext = () => {
    props.form.clearErrors();
    let hasErrors = false;

    if (!props.form.delivery_method) {
        props.form.setError('delivery_method', 'Please select a shipping method');
        hasErrors = true;
    }

    // Валідація для Нової Пошти (використовуємо refs)
    if (props.form.delivery_method === 'novaposhta') {
        if (!props.form.city_ref) {
            props.form.setError('city', 'Please select a city from the list');
            hasErrors = true;
        }
        if (!props.form.warehouse_ref) {
            props.form.setError('warehouse', 'Please select a warehouse');
            hasErrors = true;
        }
    }

    // Валідація для самовивозу
    if (props.form.delivery_method === 'pickup' && !props.form.warehouse) {
        props.form.setError('warehouse', 'Please select a pickup point');
        hasErrors = true;
    }

    // Загальна валідація для інших методів (якщо будуть)
    if (props.form.delivery_method && !['pickup', 'novaposhta'].includes(props.form.delivery_method)) {
        if (!props.form.city) {
            props.form.setError('city', 'Please enter your city');
            hasErrors = true;
        }
    }

    if (!hasErrors) emit('next');
};
</script>

<template>
    <div class="space-y-0 py-4 font-['Exo_2'] animate-in fade-in slide-in-from-bottom-4 duration-700 text-black max-w-5xl mx-auto">

        <!-- Header -->
        <header class="mb-12 border-b border-black pb-8">
            <h2 class="text-4xl font-black uppercase tracking-tighter italic">
                02. {{ $t("Shipping") }}
            </h2>
            <p class="text-gray-500 text-[10px] font-bold tracking-[0.3em] uppercase mt-2">
                {{ $t("Select how you want to receive your order") }}
            </p>
        </header>

        <!-- Shipping Methods List -->
        <div class="flex flex-col border-t border-black">
            <div v-for="method in shippingMethods" :key="method.id" class="flex flex-col">
                <div
                    @click="selectMethod(method.alias)"
                    class="group p-8 border-b border-black cursor-pointer flex justify-between items-center transition-all duration-300"
                    :class="form.delivery_method === method.alias ? 'bg-black text-white' : 'hover:bg-zinc-50'"
                >
                    <div class="flex items-center gap-8">
                        <span class="text-2xl font-black italic transition-opacity" :class="form.delivery_method === method.alias ? 'opacity-100' : 'opacity-20'">
                            0{{ method.id }}
                        </span>
                        <span class="text-sm font-black uppercase tracking-[0.2em]">{{ method.title }}</span>
                    </div>

                    <div class="flex items-center gap-6">
                        <span class="text-xl font-black italic tracking-tighter">
                            {{ parseFloat(method.price) > 0 ? `${method.price} ₴` : $t('Free') }}
                        </span>
                    </div>
                </div>


                <!-- Динамічний компонент служби -->
                <transition
                    enter-active-class="transition duration-500 ease-out"
                    enter-from-class="opacity-0 -translate-y-2"
                    enter-to-class="opacity-100 translate-y-0"
                >
                    <div v-if="form.delivery_method === method.alias && deliveryComponents[method.alias]">
                        <component :is="deliveryComponents[method.alias]"
                            v-model:cityRef="form.city_ref"
                            v-model:cityName="form.city"
                            v-model:warehouseRef="form.warehouse_ref"
                            v-model:warehouseName="form.warehouse"
                           v-bind="method.alias === 'pickup' ? { warehouses: warehouses } : {}"
                            :errors="form.errors"
                        />
                    </div>
                </transition>

            </div>

            <!-- Global Delivery Error -->
            <p v-if="form.errors.delivery_method" class="text-red-500 text-[10px] font-black uppercase mt-6 tracking-widest">
                ! {{ $t(form.errors.delivery_method) }}
            </p>
        </div>

        <!-- Footer -->
        <footer class="flex flex-col md:flex-row justify-between items-center pt-20 gap-6">
            <button @click="emit('back')" type="button"
                class="w-full md:w-auto group flex items-center justify-center gap-6 px-10 py-6 border border-zinc-200 hover:border-black transition-all duration-500">
                <IconArrowLeft size="20" class="group-hover:-translate-x-2 transition-transform duration-500" />
                <span class="text-[11px] font-black uppercase tracking-[0.4em]">{{ $t("Back") }}</span>
            </button>

            <button @click="validateAndNext" type="button"
                class="w-full md:w-auto group flex items-center justify-between bg-black text-white pl-12 pr-8 py-6 hover:bg-zinc-800 transition-all duration-500">
                <span class="text-[11px] font-black uppercase tracking-[0.4em]">{{ $t("Next step") }}</span>
                <div class="mx-12 w-12 h-px bg-white/30 group-hover:w-20 transition-all duration-500"></div>
                <IconArrowRight size="20" class="group-hover:translate-x-1 transition-transform duration-500" />
            </button>
        </footer>
    </div>
</template>

<style scoped>
/* Додаткова стилізація для бруталізму */
.group:hover .transition-opacity {
    opacity: 1;
}
</style>
