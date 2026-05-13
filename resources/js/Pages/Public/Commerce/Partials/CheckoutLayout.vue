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

// Емітимо подію, якщо хочемо дозволити повернення до попередніх кроків через степер
const emit = defineEmits(["goToStep"]);

const steps = [
    { id: 1, name: "Контакти", icon: IconUserCheck },
    { id: 2, name: "Доставка", icon: IconTruckDelivery },
    { id: 3, name: "Оплата", icon: IconCreditCard },
];

const progressWidth = computed(
    () => `${((props.currentStep - 1) / (steps.length - 1)) * 100}%`,
);

const handleStepClick = (stepId) => {
    if (stepId < props.currentStep) emit("goToStep", stepId);
};
</script>

<template>
    <div class="checkout-layout max-w-3xl mx-auto">
        <!-- Stepper -->
        <nav class="relative mb-12 px-4" aria-label="Progress">
            <!-- Progress Line Background -->
            <div
                class="absolute top-6 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2"
                aria-hidden="true"
            ></div>

            <!-- Active Progress Line -->
            <div
                class="absolute top-6 left-0 h-0.5 bg-blue-600 -translate-y-1/2 transition-all duration-500 ease-in-out"
                :style="{ width: progressWidth }"
            ></div>

            <ol class="relative z-10 flex justify-between">
                <li
                    v-for="step in steps"
                    :key="step.id"
                    class="flex flex-col items-center"
                >
                    <button
                        type="button"
                        @click="handleStepClick(step.id)"
                        :disabled="step.id >= currentStep"
                        :class="[
                            'w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 border-4 outline-none',
                            currentStep > step.id
                                ? 'bg-blue-600 border-blue-100 text-white cursor-pointer'
                                : currentStep === step.id
                                  ? 'bg-white border-blue-600 text-blue-600 shadow-lg shadow-blue-100 scale-110'
                                  : 'bg-white border-gray-100 text-gray-400 cursor-default',
                        ]"
                    >
                        <component
                            :is="
                                currentStep > step.id
                                    ? IconCircleCheckFilled
                                    : step.icon
                            "
                            size="22"
                            stroke-width="2.5"
                        />
                    </button>
                    <span
                        :class="[
                            'mt-3 text-[10px] font-black uppercase tracking-[0.15em] transition-colors duration-300',
                            currentStep >= step.id
                                ? 'text-gray-900'
                                : 'text-gray-400',
                        ]"
                    >
                        {{ step.name }}
                    </span>
                </li>
            </ol>
        </nav>

        <!-- Content Area -->
        <main class="relative">
            <Transition
                mode="out-in"
                enter-active-class="transition duration-400 ease-out"
                enter-from-class="transform translate-y-4 opacity-0"
                enter-to-class="transform translate-y-0 opacity-100"
                leave-active-class="transition duration-200 ease-in"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
            >
                <div
                    :key="currentStep"
                    class="bg-white border border-gray-100 rounded-[2.5rem] p-6 md:p-10 shadow-2xl shadow-gray-200/50"
                >
                    <slot />
                </div>
            </Transition>
        </main>

        <!-- Trust Block -->
        <footer
            class="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-4 border-t border-gray-100 pt-8"
        >
            <div
                v-for="(badge, index) in [
                    { text: 'Захищене SSL з\'єднання', icon: 'bg-green-500' },
                    { text: 'Офіційна гарантія' },
                    { text: '14 днів на повернення' },
                ]"
                :key="index"
                class="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400"
            >
                <div
                    v-if="badge.icon"
                    :class="[
                        badge.icon,
                        'w-1.5 h-1.5 rounded-full animate-pulse',
                    ]"
                ></div>
                <IconCircleCheckFilled v-else size="14" class="text-gray-200" />
                {{ badge.text }}
            </div>
        </footer>
    </div>
</template>

<style scoped>
.checkout-layout {
    perspective: 1200px;
}

/* Прибираємо синій контур фокусу для кнопок, але залишаємо доступність */
button:focus-visible {
    box-shadow:
        0 0 0 2px white,
        0 0 0 4px #2563eb;
}
</style>
