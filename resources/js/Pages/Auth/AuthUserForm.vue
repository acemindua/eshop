<script setup>
import { ref, computed } from "vue";
import { useForm } from "@inertiajs/vue3";
import InputLabel from "@/Components/UI/InputLabel.vue";
import TextInput from "@/Components/UI/TextInput.vue";
import InputError from "@/Components/UI/InputError.vue";
import {
    IconEye,
    IconEyeClosed,
    IconMail,
    IconShieldLock,
    IconUser,
    IconPhone,
} from "@tabler/icons-vue";

const props = defineProps({
    initialMode: { type: String, default: "login" },
});

const authMode = ref(props.initialMode);
const passwordShow = ref(false);

const form = useForm({
    name: "",
    email: "",
    password: "",
    phone: "+380",
    remember: true,
});

// Динамічні тексти та роути
const config = computed(() => ({
    buttonText: authMode.value === "login" ? "Увійти" : "Створити аккаунт",
    routeName: authMode.value === "login" ? "login.store" : "register.store",
    title: authMode.value === "login" ? "Вхід у кабінет" : "Новий користувач",
}));

const submit = () => {
    form.post(route(config.value.routeName), {
        preserveScroll: true,
        onSuccess: () => form.reset("password"),
    });
};
</script>

<template>
    <div class="w-full max-w-md mx-auto space-y-6">
        <!-- Tabs -->
        <div class="flex p-1 bg-gray-100 rounded-xl w-full">
            <button
                v-for="mode in ['login', 'register']"
                :key="mode"
                @click="authMode = mode"
                :class="[
                    'flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-200',
                    authMode === mode
                        ? 'bg-white shadow-sm text-gray-900'
                        : 'text-gray-500 hover:text-gray-700',
                ]"
            >
                {{ mode === "login" ? "Вхід" : "Реєстрація" }}
            </button>
        </div>

        <form @submit.prevent="submit" class="space-y-4">
            <!-- Поле Ім'я (Анімована поява) -->
            <Transition
                enter-active-class="transition duration-200 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
            >
                <div v-if="authMode === 'register'">
                    <InputLabel for="name" value="Ваше ім'я" />
                    <div class="relative mt-1">
                        <TextInput
                            id="name"
                            type="text"
                            class="block w-full pl-10"
                            v-model="form.name"
                            placeholder="Олександр"
                        />
                        <IconUser
                            class="absolute top-3 left-3 text-gray-400"
                            :size="18"
                        />
                    </div>
                    <InputError :message="form.errors.name" />
                </div>
            </Transition>

            <!-- Email -->
            <div>
                <InputLabel for="email" value="Email" />
                <div class="relative mt-1">
                    <TextInput
                        id="email"
                        type="email"
                        class="block w-full pl-10"
                        v-model="form.email"
                        placeholder="example@mail.com"
                    />
                    <IconMail
                        class="absolute top-3 left-3 text-gray-400"
                        :size="18"
                    />
                </div>
                <InputError :message="form.errors.email" />
            </div>
            <!-- Phone Number -->
            <Transition
                enter-active-class="transition duration-200 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
            >
                <div v-if="authMode === 'register'">
                    <InputLabel for="phone" value="Номер телефону" />
                    <div class="relative mt-1">
                        <TextInput
                            id="phone"
                            type="tel"
                            class="block w-full pl-10"
                            v-model="form.phone"
                            placeholder="+380 (__) ___-__-__"
                            v-mask="'+38 0## ### ####'"
                        />
                        <IconPhone
                            class="absolute top-3 left-3 text-gray-400"
                            :size="18"
                        />
                    </div>
                    <InputError :message="form.errors.phone" />
                </div>
            </Transition>
            <!-- Пароль -->
            <div>
                <div class="flex justify-between items-center mb-1">
                    <InputLabel for="password" value="Пароль" />
                    <a
                        v-if="authMode === 'login'"
                        :href="route('password.request')"
                        class="text-xs font-medium text-blue-600 hover:text-blue-500"
                    >
                        Забули пароль?
                    </a>
                </div>
                <div class="relative">
                    <TextInput
                        id="password"
                        :type="passwordShow ? 'text' : 'password'"
                        class="block w-full px-10"
                        v-model="form.password"
                        required
                    />
                    <IconShieldLock
                        class="absolute top-3 left-3 text-gray-400"
                        :size="18"
                    />
                    <button
                        type="button"
                        @click="passwordShow = !passwordShow"
                        class="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
                    >
                        <component
                            :is="passwordShow ? IconEye : IconEyeClosed"
                            :size="18"
                        />
                    </button>
                </div>
                <InputError :message="form.errors.password" />
            </div>

            <button
                type="submit"
                :disabled="form.processing"
                class="w-full py-3.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 focus:ring-4 focus:ring-blue-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <span v-if="form.processing" class="inline-block animate-pulse"
                    >Завантаження...</span
                >
                <span v-else>{{ config.buttonText }}</span>
            </button>
        </form>

        <!-- Divider -->
        <div class="relative py-2">
            <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-200"></div>
            </div>
            <div class="relative flex justify-center text-xs uppercase">
                <span
                    class="bg-white px-4 text-gray-400 font-medium tracking-tighter italic"
                    >або через</span
                >
            </div>
        </div>

        <!-- Google -->
        <a
            :href="route('auth.google.redirect')"
            class="flex items-center justify-center gap-3 w-full py-3 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all text-sm font-semibold text-gray-700 shadow-sm"
        >
            <svg class="w-5 h-5" viewBox="0 0 48 48">
                <path
                    fill="#FFC107"
                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
                <path
                    fill="#FF3D00"
                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                ></path>
                <path
                    fill="#4CAF50"
                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                ></path>
                <path
                    fill="#1976D2"
                    d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
            </svg>
            <span>Продовжити з Google</span>
        </a>
    </div>
</template>
