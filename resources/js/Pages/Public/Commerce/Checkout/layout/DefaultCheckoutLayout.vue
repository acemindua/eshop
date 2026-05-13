<script setup>
import { trans } from 'laravel-vue-i18n';
import {
    IconUserCheck,
    IconTruckDelivery,
    IconCreditCard,
    IconCheck,
} from "@tabler/icons-vue";

const props = defineProps({
    currentStep: { type: Number, default: 1 },
});

const emit = defineEmits(["goToStep"]);

const steps = [
    { id: 1, name: trans("Contacts") },
    { id: 2, name: trans("Delivery") },
    { id: 3, name: trans("Pay") },
];

const handleStepClick = (stepId) => {
    // Дозволяємо повернутися на крок назад, але не перестрибувати вперед
    if (stepId < props.currentStep) emit("goToStep", stepId);
};
</script>

<template>
    <div class="w-full bg-white font-['Exo_2'] uppercase">

        <!-- Header Степера: Строга чорна межа -->
        <nav class="border-b border-black py-8 px-6 md:px-12 bg-zinc-50" aria-label="Progress">
            <ol class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-12 w-full max-w-7xl mx-auto">

                <li
                    v-for="(step, index) in steps"
                    :key="step.id"
                    class="relative flex flex-1 items-center w-full last:flex-none"
                >
                    <!-- Step Item -->
                    <div
                        class="flex items-center gap-4 transition-all duration-300"
                        :class="[step.id < currentStep ? 'cursor-pointer hover:opacity-70' : 'cursor-default']"
                        @click="handleStepClick(step.id)"
                    >
                        <!-- Number Box: Квадратний, без заокруглень -->
                        <div
                            :class="[
                                'w-10 h-10 flex items-center justify-center border-2 transition-all duration-500 font-black italic text-lg',
                                currentStep > step.id
                                    ? 'bg-black border-black text-white'
                                    : currentStep === step.id
                                        ? 'border-black text-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                                        : 'border-zinc-200 text-zinc-300 bg-transparent'
                            ]"
                        >
                            <IconCheck v-if="currentStep > step.id" size="20" stroke-width="4" />
                            <span v-else>{{ step.id }}</span>
                        </div>

                        <!-- Step Label -->
                        <div class="flex flex-col">
                            <span
                                :class="[
                                    'text-[10px] font-black tracking-[0.3em] transition-colors italic leading-none',
                                    currentStep >= step.id ? 'text-black' : 'text-zinc-300'
                                ]"
                            >
                                {{ step.name }}
                            </span>
                            <span v-if="currentStep === step.id" class="text-[8px] font-bold text-gray-400 mt-1 tracking-widest">
                                IN PROGRESS
                            </span>
                        </div>
                    </div>

                    <!-- Line Divider: Тільки на десктопі, строга лінія -->
                    <div
                        v-if="index !== steps.length - 1"
                        class="hidden md:block flex-1 mx-8 h-[2px] bg-zinc-200 overflow-hidden"
                    >
                        <div
                            class="h-full bg-black transition-all duration-1000 ease-in-out"
                            :style="{ width: currentStep > step.id ? '100%' : '0%' }"
                        ></div>
                    </div>
                </li>
            </ol>
        </nav>

        <!-- Main Content Area -->
        <main class="w-full">
            <slot />
        </main>

        <!-- Footer Trust Block: Архітектурний мінімалізм -->
        <footer class="border-t border-black p-8 md:p-16 bg-white">
            <div class="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                <div v-for="i in 4" :key="i" class="space-y-2 opacity-20 grayscale hover:opacity-100 transition-all duration-500">
                    <div class="h-8 w-full bg-zinc-200 border border-black/10 animate-pulse"></div>
                </div>
            </div>
        </footer>
    </div>
</template>

<style scoped>
/* Стиль для активного кроку - невеликий ефект зміщення */
.shadow-\[4px_4px_0px_0px_rgba\(0\0\0\1\)\] {
    box-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 1);
}

main {
    animation: slideUp 0.6s cubic-bezier(0.23, 1, 0.32, 1) both;
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
