<script setup>
import BaseInput from "@/Components/UI/BaseInput.vue";
import {
    IconUserCircle,
    IconFingerprint,
    IconInfoCircle,
} from "@tabler/icons-vue";

defineProps({
    name: String,
    last_name: String,
    email: String,
    phone: String,
    errors: Object,
});

defineEmits([
    "update:name",
    "update:last_name",
    "update:email",
    "update:phone",
    "open-auth",
    "open-register",
]);
</script>

<template>
    <div
        class="bg-white p-6 md:p-8 border border-gray-200 shadow-sm rounded-3xl"
    >
        <!-- Header -->
        <div
            class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-gray-50"
        >
            <div class="flex items-center gap-3">
                <div
                    class="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center text-xs font-black"
                >
                    1
                </div>
                <h2
                    class="text-sm font-bold uppercase tracking-[0.2em] text-gray-900"
                >
                    Оформлення замовлення
                </h2>
            </div>

            <!-- Auth Status / Buttons -->
            <div
                v-if="$page.props.auth.user"
                class="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-full"
            >
                <span
                    class="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"
                ></span>
                <span
                    class="text-[10px] text-green-700 font-bold uppercase tracking-widest"
                >
                    Профіль: {{ $page.props.auth.user.first_name }}
                </span>
            </div>

            <div
                v-else
                class="flex items-center gap-4 text-[10px] uppercase tracking-widest font-bold"
            >
                <button
                    type="button"
                    @click="$emit('open-auth')"
                    class="text-blue-600 hover:text-blue-800 transition-colors"
                >
                    Увійти
                </button>
                <span class="text-gray-200">|</span>
                <button
                    type="button"
                    @click="$emit('open-register')"
                    class="text-gray-500 hover:text-black transition-colors"
                >
                    Реєстрація
                </button>
            </div>
        </div>

        <div class="space-y-10">
            <!-- Розділ 1: Особисті дані -->
            <section>
                <div class="flex items-center gap-2 mb-6 text-gray-400">
                    <IconUserCircle size="18" />
                    <span class="text-[11px] font-bold uppercase tracking-wider"
                        >Персональні дані</span
                    >
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <BaseInput
                        label="Ім'я"
                        :model-value="name"
                        @update:model-value="$emit('update:name', $event)"
                        :error="errors?.name"
                        placeholder="Ваше ім'я"
                    />
                    <BaseInput
                        label="Прізвище"
                        :model-value="last_name"
                        @update:model-value="$emit('update:last_name', $event)"
                        :error="errors?.last_name"
                        placeholder="Ваше прізвище"
                    />
                </div>
            </section>

            <!-- Розділ 2: Контакти -->
            <section>
                <div class="flex items-center gap-2 mb-6 text-gray-400">
                    <IconFingerprint size="18" />
                    <span class="text-[11px] font-bold uppercase tracking-wider"
                        >Контактна інформація</span
                    >
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <BaseInput
                        label="Телефон"
                        :model-value="phone"
                        @update:model-value="$emit('update:phone', $event)"
                        :error="errors?.phone"
                        v-mask="'+38 0## ### ####'"
                        placeholder="+38 0__ ___ ____"
                        type="tel"
                    />
                    <BaseInput
                        label="Email"
                        :model-value="email"
                        @update:model-value="$emit('update:email', $event)"
                        :error="errors?.email"
                        :readonly="!!$page.props.auth.user"
                        :class="{
                            'bg-gray-50 opacity-70': !!$page.props.auth.user,
                        }"
                        placeholder="mail@example.com"
                    />
                </div>
            </section>
        </div>

        <!-- Повідомлення про авто-реєстрацію -->
        <div
            v-if="!$page.props.auth.user"
            class="mt-10 p-4 bg-blue-50/50 border border-blue-100 rounded-2xl flex items-start gap-3 group hover:bg-blue-50 transition-colors"
        >
            <IconInfoCircle size="20" class="text-blue-500 shrink-0 mt-0.5" />
            <div class="space-y-1">
                <p class="text-[12px] font-bold text-blue-900 leading-tight">
                    Smart Checkout включено
                </p>
                <p class="text-[11px] text-blue-700/80 leading-relaxed">
                    Ми автоматично створимо для вас особистий кабінет. Це
                    дозволить вам
                    <span class="font-bold text-blue-800"
                        >відстежувати статус замовлення</span
                    >, зберігати історію покупок та отримувати персональні
                    пропозиції.
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Додаткова стилізація, якщо BaseInput не має власних відступів */
section {
    position: relative;
}
</style>
