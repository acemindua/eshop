<script setup>
import { computed } from "vue";
import {
    IconUserCheck,
    IconTruckDelivery,
    IconCreditCard,
    IconCircleCheckFilled,
} from "@tabler/icons-vue";

const props = defineProps({
    currentStep: { type: Number, default: 1 },
});

const steps = [
    { id: 1, name: "Контакти", icon: IconUserCheck },
    { id: 2, name: "Доставка", icon: IconTruckDelivery },
    { id: 3, name: "Оплата", icon: IconCreditCard },
];

const progressWidth = computed(() => {
    return ((props.currentStep - 1) / (steps.length - 1)) * 100 + "%";
});
</script>

<template>
    <div class="checkout-layout">
        <!-- Стрічка прогресу (Stepper) -->
        <div class="relative mb-12">
            <!-- Лінія-бекграунд -->
            <div
                class="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 z-0"
            ></div>

            <!-- Активна лінія з анімацією -->
            <div
                class="absolute top-1/2 left-0 h-0.5 bg-blue-600 -translate-y-1/2 z-0 transition-all duration-500 ease-in-out"
                :style="{ width: progressWidth }"
            ></div>

            <div class="relative z-10 flex justify-between">
                <div
                    v-for="step in steps"
                    :key="step.id"
                    class="flex flex-col items-center"
                >
                    <div
                        :class="[
                            'w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 border-4',
                            currentStep > step.id
                                ? 'bg-blue-600 border-blue-100 text-white'
                                : currentStep === step.id
                                  ? 'bg-white border-blue-600 text-blue-600 shadow-lg shadow-blue-100'
                                  : 'bg-white border-gray-100 text-gray-400',
                        ]"
                    >
                        <component
                            :is="
                                currentStep > step.id
                                    ? IconCircleCheckFilled
                                    : step.icon
                            "
                            size="22"
                        />
                    </div>
                    <span
                        :class="[
                            'mt-3 text-xs font-bold uppercase tracking-wider transition-colors duration-300',
                            currentStep >= step.id
                                ? 'text-gray-900'
                                : 'text-gray-400',
                        ]"
                    >
                        {{ step.name }}
                    </span>
                </div>
            </div>
        </div>

        <!-- Контентна область з анімованим переходом -->
        <div class="relative overflow-hidden">
            <Transition
                mode="out-in"
                enter-active-class="transition duration-300 ease-out"
                enter-from-class="transform translate-x-8 opacity-0"
                enter-to-class="transform translate-x-0 opacity-100"
                leave-active-class="transition duration-200 ease-in"
                leave-from-class="transform translate-x-0 opacity-100"
                leave-to-class="transform -translate-x-8 opacity-0"
            >
                <div
                    :key="currentStep"
                    class="bg-white border border-gray-100 rounded-3xl p-6 md:p-10 shadow-xl shadow-gray-500/5"
                >
                    <slot />
                </div>
            </Transition>
        </div>

        <!-- Додатковий Trust-блок -->
        <div class="mt-8 flex flex-wrap justify-center gap-6 text-gray-400">
            <div class="flex items-center gap-2 text-xs font-medium">
                <div
                    class="w-2 h-2 bg-green-500 rounded-full animate-pulse"
                ></div>
                Захищене з'єднання SSL
            </div>
            <div class="flex items-center gap-2 text-xs font-medium">
                <IconCircleCheckFilled size="14" class="text-gray-300" />
                Офіційна гарантія
            </div>
            <div class="flex items-center gap-2 text-xs font-medium">
                <IconCircleCheckFilled size="14" class="text-gray-300" />
                Обмін та повернення 14 днів
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Додаткові стилі для кастомного скролу або специфічних ефектів */
.checkout-layout {
    perspective: 1000px;
}
</style>
