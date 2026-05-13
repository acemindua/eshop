<script setup>
import { useForm } from "@inertiajs/vue3";
import { ref } from "vue";
import { IconX, IconEye, IconEyeOff, IconArrowRight } from "@tabler/icons-vue";
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
        onSuccess: () => {
            form.reset();
            emit("close");
        },
        onFinish: () => form.reset("password"),
    });
};
</script>

<template>
    <Teleport to="body">
        <div
            v-if="isOpen"
            class="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
            <!-- Overlay -->
            <div
                class="absolute inset-0 bg-black/10 backdrop-blur-[2px] transition-opacity"
                @click="$emit('close')"
            ></div>

            <!-- Modal Content -->
            <div
                class="relative bg-white w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
            >
                <!-- Close Button -->
                <button
                    @click="$emit('close')"
                    class="absolute top-6 right-6 z-10 text-gray-300 hover:text-black transition-colors"
                >
                    <IconX :size="20" stroke-width="1.5" />
                </button>

                <div class="p-10 sm:p-12">
                    <!-- Header -->
                    <div class="mb-10 text-center">
                        <h2
                            class="text-[10px] font-black uppercase tracking-[0.5em] text-gray-300 mb-2"
                        >
                            {{
                                authMode === "login"
                                    ? "01. Вхід"
                                    : "01. Реєстрація"
                            }}
                        </h2>
                        <p
                            class="text-xl font-light text-gray-900 tracking-tight"
                        >
                            {{
                                authMode === "login"
                                    ? "З поверненням"
                                    : "Створити акаунт"
                            }}
                        </p>
                    </div>

                    <!-- Auth Mode Toggle -->
                    <div class="flex gap-8 justify-center mb-10">
                        <button
                            @click="authMode = 'login'"
                            :class="
                                authMode === 'login'
                                    ? 'text-black border-black'
                                    : 'text-gray-300 border-transparent'
                            "
                            class="text-[10px] font-black uppercase tracking-[0.2em] pb-1 border-b-2 transition-all"
                        >
                            Увійти
                        </button>
                        <button
                            @click="authMode = 'register'"
                            :class="
                                authMode === 'register'
                                    ? 'text-black border-black'
                                    : 'text-gray-300 border-transparent'
                            "
                            class="text-[10px] font-black uppercase tracking-[0.2em] pb-1 border-b-2 transition-all"
                        >
                            Створити
                        </button>
                    </div>

                    <!-- Form -->
                    <form @submit.prevent="submit" class="space-y-8">
                        <div
                            v-if="authMode === 'register'"
                            class="animate-in slide-in-from-top-2 duration-300"
                        >
                            <InputLabel
                                for="name"
                                value="Ім'я"
                                class="text-[9px] uppercase tracking-widest text-gray-400 mb-1"
                            />
                            <TextInput
                                id="name"
                                v-model="form.name"
                                class="w-full border-0 border-b border-gray-100 rounded-none px-0 focus:ring-0 focus:border-black transition-all"
                                placeholder="Ваше ім'я"
                            />
                            <InputError
                                :message="form.errors.name"
                                class="mt-1 text-[10px]"
                            />
                        </div>

                        <div>
                            <InputLabel
                                for="email"
                                value="Email"
                                class="text-[9px] uppercase tracking-widest text-gray-400 mb-1"
                            />
                            <TextInput
                                id="email"
                                type="email"
                                v-model="form.email"
                                class="w-full border-0 border-b border-gray-100 rounded-none px-0 focus:ring-0 focus:border-black transition-all"
                                placeholder="example@mail.com"
                            />
                            <InputError
                                :message="form.errors.email"
                                class="mt-1 text-[10px]"
                            />
                        </div>

                        <div>
                            <InputLabel
                                for="password"
                                value="Пароль"
                                class="text-[9px] uppercase tracking-widest text-gray-400 mb-1"
                            />
                            <div class="relative">
                                <TextInput
                                    id="password"
                                    :type="passwordShow ? 'text' : 'password'"
                                    v-model="form.password"
                                    class="w-full border-0 border-b border-gray-100 rounded-none px-0 pr-8 focus:ring-0 focus:border-black transition-all"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    @click="passwordShow = !passwordShow"
                                    class="absolute right-0 bottom-2 text-gray-300 hover:text-black"
                                >
                                    <IconEye v-if="passwordShow" :size="16" />
                                    <IconEyeOff v-else :size="16" />
                                </button>
                            </div>
                            <InputError
                                :message="form.errors.password"
                                class="mt-1 text-[10px]"
                            />
                        </div>

                        <button
                            type="submit"
                            :disabled="form.processing"
                            class="w-full bg-black text-white py-6 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-gray-800 transition-all flex items-center justify-center gap-2 group"
                        >
                            {{
                                authMode === "login"
                                    ? "Увійти"
                                    : "Зареєструватися"
                            }}
                            <IconArrowRight
                                :size="16"
                                class="group-hover:translate-x-1 transition-transform"
                            />
                        </button>
                    </form>

                    <!-- Google Auth -->
                    <div class="mt-10 pt-10 border-t border-gray-50">
                        <a
                            :href="route('auth.google.redirect')"
                            class="flex items-center justify-center gap-3 w-full py-4 border border-gray-100 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-gray-50 transition-all"
                        >
                            <svg class="w-4 h-4" viewBox="0 0 48 48">
                                <path
                                    fill="#EA4335"
                                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                                />
                                <path
                                    fill="#4285F4"
                                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24s.92 7.54 2.56 10.78l7.97-6.19z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                                />
                            </svg>
                            Google
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<style scoped>
:deep(input) {
    box-shadow: none !important;
    outline: none !important;
}
</style>
