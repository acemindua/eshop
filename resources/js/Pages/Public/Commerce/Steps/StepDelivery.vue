<script setup>
import { computed } from "vue";
import NovaPoshtaTool from "../DeliveryTools/NovaPoshtaTool.vue";
import UkrPoshtaTool from "../DeliveryTools/UkrPoshtaTool.vue"; // Створимо пізніше
import { IconBuildingStore, IconTruck, IconMapPin } from "@tabler/icons-vue";

const props = defineProps({
    form: Object,
    shippingMethods: Array, // Дані з таблиці shippings (pickup, nova_poshta, ukr_poshta)
    warehouses: Array, // Дані з твоєї таблиці warehouses (твої фізичні точки)
    errors: Object,
});

// Динамічно визначаємо, чи валідний крок
const isStepValid = computed(() => {
    const method = props.form.delivery_method;
    if (!method) return false;

    if (method === "pickup") return !!props.form.warehouse_id;
    if (method === "nova_poshta")
        return !!(props.form.city_ref && props.form.warehouse_ref);
    if (method === "ukr_poshta") return !!props.form.post_index;

    return true;
});
</script>

<template>
    <div class="space-y-12">
        <!-- КРОК 1: ВИБІР ТИПУ ДОСТАВКИ -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
                v-for="method in shippingMethods"
                :key="method.code"
                @click="form.delivery_method = method.code"
                class="p-6 rounded-3xl border-2 transition-all cursor-pointer text-center"
                :class="
                    form.delivery_method === method.code
                        ? 'border-black bg-black text-white'
                        : 'border-gray-100 bg-white'
                "
            >
                <component
                    :is="
                        method.code === 'pickup' ? IconBuildingStore : IconTruck
                    "
                    class="mx-auto mb-3"
                    size="24"
                />
                <span
                    class="text-[10px] font-black uppercase tracking-widest block"
                    >{{ method.title }}</span
                >
            </div>
        </div>

        <!-- КРОК 2: ДЕТАЛІЗАЦІЯ (Інструменти) -->
        <div class="pt-10 border-t border-gray-50">
            <!-- ВАРІАНТ: САМОВИВІЗ (Твої склади) -->
            <div
                v-if="form.delivery_method === 'pickup'"
                class="space-y-4 animate-in fade-in"
            >
                <p
                    class="text-[9px] text-gray-400 uppercase tracking-widest mb-4"
                >
                    Оберіть точку видачі:
                </p>
                <div class="grid grid-cols-1 gap-3">
                    <div
                        v-for="wh in warehouses"
                        :key="wh.id"
                        @click="form.warehouse_id = wh.id"
                        class="p-5 rounded-2xl border-2 transition-all cursor-pointer flex justify-between items-center"
                        :class="
                            form.warehouse_id === wh.id
                                ? 'border-black bg-gray-50'
                                : 'border-gray-100'
                        "
                    >
                        <div>
                            <h4 class="text-[11px] font-bold uppercase">
                                {{ wh.title }}
                            </h4>
                            <p class="text-[10px] text-gray-500">
                                {{ wh.city }}, {{ wh.address }}
                            </p>
                        </div>
                        <IconMapPin
                            size="18"
                            :class="
                                form.warehouse_id === wh.id
                                    ? 'text-black'
                                    : 'text-gray-200'
                            "
                        />
                    </div>
                </div>
            </div>

            <!-- ВАРІАНТ: НОВА ПОШТА -->
            <NovaPoshtaTool
                v-if="form.delivery_method === 'nova_poshta'"
                v-model:city-ref="form.city_ref"
                v-model:city-name="form.city_name"
                v-model:warehouse-ref="form.warehouse_ref"
                v-model:warehouse-name="form.warehouse_name"
                :errors="errors"
            />

            <!-- ВАРІАНТ: УКРПОШТА -->
            <UkrPoshtaTool
                v-if="form.delivery_method === 'ukr_poshta'"
                v-model:index="form.post_index"
                :errors="errors"
            />
        </div>
    </div>
</template>
