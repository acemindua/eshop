<script setup>
import { useForm } from "@inertiajs/vue3";
import { ref } from "vue";
import {
    IconX,
    IconMail,
    IconShieldLock,
    IconEye,
    IconEyeClosed,
    IconUser,
} from "@tabler/icons-vue";
import TextInput from "@/Components/UI/TextInput.vue";
import InputLabel from "@/Components/UI/InputLabel.vue";
import InputError from "@/Components/UI/InputError.vue";

const props = defineProps({
    isOpen: Boolean,
    initialMode: { type: String, default: "login" },
});

const emit = defineEmits(["close"]);

const authMode = ref(props.initialMode);
const passwordShow = ref(false);

const form = useForm({
    name: "",
    email: "",
    password: "",
});

const submit = () => {
    const routeName = authMode.value === "login" ? "login" : "register";
    form.post(route(routeName), {
        onSuccess: () => emit("close"),
        onFinish: () => form.reset("password"),
    });
};
</script>

<template>
    <Teleport to="body">
        <div
            v-if="isOpen"
            class="fixed inset-0 z-[100] flex items-center justify-center sm:p-4"
        >
            <div
                class="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
                @click="$emit('close')"
            ></div>

            <div
                class="relative bg-white w-full h-full sm:h-auto sm:max-w-[700px] sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in duration-200"
            >
                <button
                    @click="$emit('close')"
                    class="absolute top-4 right-4 z-10 p-2 bg-gray-100 rounded-full md:bg-transparent text-gray-500 hover:text-gray-800"
                >
                    <IconX :size="20" />
                </button>

                <div
                    class="hidden md:flex w-1/3 bg-indigo-600 p-8 text-white flex-col justify-center"
                >
                    <h2 class="text-2xl font-bold">S-Market</h2>
                    <p class="mt-4 text-indigo-100 text-sm">
                        {{
                            authMode === "login"
                                ? "З поверненням!"
                                : "Створіть аккаунт для бонусів."
                        }}
                    </p>
                </div>

                <div class="flex-1 p-6 sm:p-10 overflow-y-auto">
                    <div class="flex border-b mb-6 text-sm">
                        <button
                            @click="authMode = 'login'"
                            :class="[
                                'flex-1 pb-3 transition',
                                authMode === 'login'
                                    ? 'border-b-2 border-indigo-600 font-bold text-indigo-600'
                                    : 'text-gray-400',
                            ]"
                        >
                            Увійти
                        </button>
                        <button
                            @click="authMode = 'register'"
                            :class="[
                                'flex-1 pb-3 transition',
                                authMode === 'register'
                                    ? 'border-b-2 border-indigo-600 font-bold text-indigo-600'
                                    : 'text-gray-400',
                            ]"
                        >
                            Реєстрація
                        </button>
                    </div>

                    <form @submit.prevent="submit" class="space-y-4">
                        <div v-if="authMode === 'register'">
                            <InputLabel for="name" value="Ім'я" />
                            <div class="relative">
                                <TextInput
                                    id="name"
                                    type="text"
                                    class="mt-1 block w-full pl-10"
                                    v-model="form.name"
                                    required
                                />
                                <IconUser
                                    class="absolute top-2.5 left-3 text-gray-400"
                                    :size="18"
                                />
                            </div>
                            <InputError :message="form.errors.name" />
                        </div>

                        <div>
                            <InputLabel for="email" value="Email" />
                            <div class="relative">
                                <TextInput
                                    id="email"
                                    type="email"
                                    class="mt-1 block w-full pl-10"
                                    v-model="form.email"
                                    required
                                />
                                <IconMail
                                    class="absolute top-2.5 left-3 text-gray-400"
                                    :size="18"
                                />
                            </div>
                            <InputError :message="form.errors.email" />
                        </div>

                        <div>
                            <InputLabel for="password" value="Пароль" />
                            <div class="relative">
                                <TextInput
                                    id="password"
                                    :type="passwordShow ? 'text' : 'password'"
                                    class="mt-1 block w-full px-10"
                                    v-model="form.password"
                                    required
                                />
                                <IconShieldLock
                                    class="absolute top-2.5 left-3 text-gray-400"
                                    :size="18"
                                />
                                <button
                                    type="button"
                                    @click="passwordShow = !passwordShow"
                                    class="absolute top-2.5 right-3 text-gray-400"
                                >
                                    <IconEye v-if="passwordShow" :size="18" />
                                    <IconEyeClosed v-else :size="18" />
                                </button>
                            </div>
                            <InputError :message="form.errors.password" />
                        </div>

                        <button
                            type="submit"
                            :disabled="form.processing"
                            class="w-full py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition shadow-lg"
                        >
                            {{
                                authMode === "login"
                                    ? "Увійти"
                                    : "Створити аккаунт"
                            }}
                        </button>
                    </form>

                    <div class="relative my-6">
                        <div class="absolute inset-0 flex items-center">
                            <div class="w-full border-t border-gray-200"></div>
                        </div>
                        <div
                            class="relative flex justify-center text-xs uppercase"
                        >
                            <span
                                class="px-2 bg-white text-gray-400 font-medium tracking-wider"
                            >
                                {{ $t("або") }}
                            </span>
                        </div>
                    </div>

                    <a
                        :href="route('auth.google.redirect')"
                        class="flex items-center justify-center gap-3 w-full py-3 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition text-sm font-semibold text-gray-700 shadow-sm"
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
            </div>
        </div>
    </Teleport>
</template>
