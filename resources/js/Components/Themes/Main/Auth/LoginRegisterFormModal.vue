<template>
    <div v-if="user">
        <Link :href="route('profile.edit')">
            <UserAvatar :data-user="user" />
        </Link>
    </div>
    <div v-else>
        <button
            @click="open = !open"
            class="flex items-center rounded-lg p-1 hover:text-blue-600 duration-200"
        >
            <span
                ><svg-icon
                    type="mdi"
                    :path="mdiAccountOutline"
                    class="w-7 h-7"
                ></svg-icon
            ></span>
            <span class="hidden md:block px-1 text-sm">{{ $t("Login") }}</span>
        </button>
    </div>

    <Transition name="modal-fade">
        <Modal :show="open" @close="open = !open">
            <div class="flex w-full min-h-screen items-center justify-center">
                <form @submit.prevent="loginSubmit">
                    <div
                        class="bg-white shadow rounded-xl w-full overflow-hidden relative"
                    >
                        <span
                            class="absolute top-3 right-3"
                            @click="open = !open"
                        >
                            <IconX
                                stroke="{2}"
                                class=":hover:text-red-500 cursor-pointer"
                            />
                        </span>
                        <div class="md:flex">
                            <div
                                class="p-2 rounded-lg overflow-hidden hidden md:block"
                            >
                                <div
                                    class="bg-white px-20 flex items-center justify-center p-2 bg rounded-lg h-full"
                                    :style="{
                                        'background-image':
                                            'url(' + ImgBg + ')',
                                    }"
                                >
                                    <Link
                                        :href="`/`"
                                        class="flex flex-col items-center"
                                    >
                                        <ApplicationLogo
                                            class="block h-20 w-auto fill-current text-white"
                                        />
                                    </Link>
                                </div>
                            </div>

                            <div class="flex flex-col px-12 py-8">
                                <h1 class="font-semibold text-xl">
                                    {{ $t("actions.log_in") }}
                                </h1>

                                <div class="w-64 mx-auto">
                                    <a
                                        :href="route('auth.google.redirect')"
                                        class="group flex relative items-center py-2 px-6 my-8 border border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100"
                                    >
                                        <span class="absolute">
                                            <svg
                                                class="h-6 w-6 mr-2"
                                                xmlns="http://www.w3.org/2000/svg"
                                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                                width="800px"
                                                height="800px"
                                                viewBox="-0.5 0 48 48"
                                                version="1.1"
                                            >
                                                <title>Google-color</title>
                                                <desc>
                                                    Created with Sketch.
                                                </desc>
                                                <defs></defs>
                                                <g
                                                    id="Icons"
                                                    stroke="none"
                                                    stroke-width="1"
                                                    fill="none"
                                                    fill-rule="evenodd"
                                                >
                                                    <g
                                                        id="Color-"
                                                        transform="translate(-401.000000, -860.000000)"
                                                    >
                                                        <g
                                                            id="Google"
                                                            transform="translate(401.000000, 860.000000)"
                                                        >
                                                            <path
                                                                d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                                                                id="Fill-1"
                                                                fill="#FBBC05"
                                                            ></path>
                                                            <path
                                                                d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                                                                id="Fill-2"
                                                                fill="#EB4335"
                                                            ></path>
                                                            <path
                                                                d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                                                                id="Fill-3"
                                                                fill="#34A853"
                                                            ></path>
                                                            <path
                                                                d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                                                                id="Fill-4"
                                                                fill="#4285F4"
                                                            ></path>
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>
                                        </span>
                                        <span class="block mx-auto"
                                            >Google</span
                                        >
                                    </a>
                                </div>

                                <div class="flex items-center mb-3">
                                    <hr
                                        class="h-0 border-b border-solid border-slate-200 dark:border-slate-700 grow"
                                    />
                                    <p class="mx-4 text-slate-400">
                                        {{ $t("or") }}
                                    </p>
                                    <hr
                                        class="h-0 border-b border-solid border-slate-200 dark:border-slate-700 grow"
                                    />
                                </div>
                                <div class="flex flex-col space-y-3 mb-6">
                                    <div>
                                        <InputLabel
                                            for="phone"
                                            class="capitalize mb-1 font-thin"
                                        >
                                            {{
                                                $t(
                                                    "validation.attributes.phone"
                                                )
                                            }}
                                        </InputLabel>

                                        <div class="relative">
                                            <span
                                                class="absolute top-2 left-3 text-slate-400"
                                            >
                                                <IconPhone
                                                    stroke="{2}"
                                                    :size="24"
                                                />
                                            </span>
                                            <TextInput
                                                id="phone"
                                                type="tel"
                                                masked="true"
                                                placeholder="+38 0"
                                                v-mask="'+38 0## ### ####'"
                                                class="mt-1 block w-full ps-10"
                                                v-model="form.phone"
                                                required
                                                autocomplete="phone"
                                            />

                                            <InputError
                                                class="mt-2"
                                                :message="form.errors.phone"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <InputLabel
                                            for="password"
                                            class="capitalize mb-1 font-thin"
                                        >
                                            {{
                                                $t(
                                                    "validation.attributes.password"
                                                )
                                            }}
                                        </InputLabel>

                                        <div class="relative">
                                            <span
                                                class="absolute top-2 left-3 text-slate-400"
                                            >
                                                <IconLock
                                                    stroke="{2}"
                                                    :size="24"
                                                />
                                            </span>
                                            <TextInput
                                                id="password"
                                                type="password"
                                                class="mt-1 block w-full ps-10"
                                                v-model="form.password"
                                                required
                                                autocomplete="current-password"
                                            />

                                            <span
                                                @click="
                                                    switchVisibilityPassword
                                                "
                                                class="text-sm text-gray-500 absolute right-3 top-3 cursor-pointer"
                                            >
                                                <IconEye
                                                    v-if="showPass"
                                                    stroke="{2}"
                                                    :size="24"
                                                />
                                                <IconEyeClosed
                                                    v-else
                                                    stroke="{2}"
                                                    :size="24"
                                                />
                                            </span>

                                            <InputError
                                                class="mt-2"
                                                :message="form.errors.password"
                                            />
                                        </div>
                                    </div>

                                    <div
                                        class="pt-4 flex items-center justify-between"
                                    >
                                        <Link
                                            :href="route('password.request')"
                                            class="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            {{ $t("Forgot your password?") }}
                                        </Link>
                                        <PrimaryButton
                                            :class="{
                                                'opacity-25': form.processing,
                                            }"
                                            :disabled="form.processing"
                                        >
                                            {{ $t("actions.log_in") }}
                                        </PrimaryButton>
                                    </div>
                                </div>
                                <!-- 
                                <div class="flex items-center mb-3">
                                    <hr
                                        class="h-0 border-b border-solid border-slate-200 dark:border-slate-700 grow"
                                    />
                                    <p class="mx-4 text-slate-400">
                                        {{ $t("or") }}
                                    </p>
                                    <hr
                                        class="h-0 border-b border-solid border-slate-200 dark:border-slate-700 grow"
                                    />
                                </div>

                                <div class="text-sm">
                                    <Link
                                        :href="route('register')"
                                        class="flex items-center gap-x-2 group"
                                    >
                                        {{ $t("Register") }}
                                        <IconArrowNarrowRight
                                            stroke="{2}"
                                            :size="24"
                                            class="relative -left-2 group-hover:left-0 transition duration-400"
                                        />
                                    </Link>
                                </div> -->
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </Modal>
    </Transition>
</template>

<script setup>
import { useForm, usePage } from "@inertiajs/vue3";
import { computed, ref } from "vue";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiAccountOutline } from "@mdi/js";

import {
    IconEye,
    IconEyeClosed,
    IconLock,
    IconPhone,
    IconUser,
    IconX,
} from "@tabler/icons-vue";
import ApplicationLogo from "@/Components/ApplicationLogo.vue";
import TextInput from "@/Components/TextInput.vue";
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import Modal from "@/Components/Modal.vue";
import ImgBg from "@/Images/login_bg.jpg";
import UserAvatar from "@/Components/UserAvatar.vue";

const props = defineProps({
    canResetPassword: Boolean,
    status: String,
});

const user = computed(() => usePage().props.auth.user);
const open = ref(false);
const showPass = ref(false);

const form = useForm({
    email: "",
    phone: "+38 0",
    password: "",
    remember: false,
});

const loginSubmit = () => {
    form.post(route("login"), {
        onFinish: () => {
            form.reset("password"), (open.value = false);
        },
    });
};

const switchVisibilityPassword = () => {
    const passwordField = document.querySelector("#password");

    if (passwordField.getAttribute("type") === "password") {
        passwordField.setAttribute("type", "text");
        showPass.value = true;
    } else {
        passwordField.setAttribute("type", "password");
        showPass.value = false;
    }
};
</script>

<style scoped>
.bg {
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
}
</style>
