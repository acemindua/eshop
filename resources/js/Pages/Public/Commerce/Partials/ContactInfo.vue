<script setup>
import BaseInput from "@/Components/UI/BaseInput.vue";

// 1. Тільки приймаємо дані від батька (Checkout.vue)
defineProps({
    first_name: String,
    last_name: String,
    email: String,
    phone: String,
    errors: Object,
});

// 2. Повідомляємо батька, якщо користувач щось вводить
defineEmits([
    "update:first_name",
    "update:last_name",
    "update:email",
    "update:phone",
    "open-auth",
    "open-register",
]);
</script>

<template>
    <div class="bg-white p-6 border border-gray-200 shadow-sm">
        <div
            class="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-8"
        >
            <h2 class="text-sm font-bold uppercase tracking-[0.2em]">
                1. Контактні дані
            </h2>

            <div
                v-if="$page.props.auth.user"
                class="flex items-center gap-2 text-[10px] text-green-600 font-bold uppercase tracking-widest"
            >
                <span
                    class="w-2 h-2 bg-green-600 rounded-full animate-pulse"
                ></span>
                Дані заповнено з профілю
            </div>

            <div
                v-else
                class="text-[10px] text-gray-400 uppercase tracking-widest flex gap-3"
            >
                <span
                    >Вже купували?
                    <button
                        type="button"
                        @click="$emit('open-auth')"
                        class="text-black font-bold underline"
                    >
                        Увійти
                    </button>
                </span>
                <span class="text-gray-200">|</span>
                <span
                    >Вперше у нас?
                    <button
                        type="button"
                        @click="$emit('open-register')"
                        class="text-black font-bold underline"
                    >
                        Реєстрація
                    </button>
                </span>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <BaseInput
                label="Ім'я"
                :model-value="first_name"
                @update:model-value="$emit('update:first_name', $event)"
                :error="errors?.first_name"
                placeholder="Введіть ім'я"
            />
            <BaseInput
                label="Прізвище"
                :model-value="last_name"
                @update:model-value="$emit('update:last_name', $event)"
                :error="errors?.last_name"
                placeholder="Введіть прізвище"
            />
            <BaseInput
                label="Телефон"
                :model-value="phone"
                @update:model-value="$emit('update:phone', $event)"
                :error="errors?.phone"
                placeholder="+380..."
            />
            <BaseInput
                label="Email"
                :model-value="email"
                @update:model-value="$emit('update:email', $event)"
                :error="errors?.email"
                :readonly="!!$page.props.auth.user"
                placeholder="Приклад: user@mail.com"
            />
        </div>

        <p
            v-if="!$page.props.auth.user"
            class="mt-4 text-[11px] text-gray-500 italic"
        >
            * Ви можете заповнити дані вручну. Після замовлення ми автоматично
            створимо для вас акаунт.
        </p>
    </div>
</template>
