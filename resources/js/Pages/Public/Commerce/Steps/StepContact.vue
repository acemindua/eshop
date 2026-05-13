<script setup>
import { ref, computed } from "vue";
import {
    IconChevronRight,
    IconCircleCheck,
    IconAlertCircle,
} from "@tabler/icons-vue";
import TextInput from "@/Components/UI/TextInput.vue";
import InputLabel from "@/Components/UI/InputLabel.vue";

const props = defineProps({ form: Object });
const emit = defineEmits(["next", "open-auth"]);

const touched = ref(new Set());

// Валідація: враховуємо пробіли у масці "+38 0## ### ####" (всього 16 символів)
const isStepValid = computed(() => {
    const f = props.form;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Перевірка телефону на 16 символів через маску з пробілами
    const isPhoneValid = (phone) => phone?.length === 16;

    const mainValid =
        f.last_name?.length > 1 &&
        f.name?.length > 1 &&
        isPhoneValid(f.phone) &&
        emailRegex.test(f.email);

    if (f.different_recipient) {
        return (
            mainValid &&
            f.recipient_last_name?.length > 1 &&
            f.recipient_name?.length > 1 &&
            isPhoneValid(f.recipient_phone)
        );
    }
    return mainValid;
});

const handleNext = () => {
    if (isStepValid.value) {
        emit("next");
    } else {
        [
            "last_name",
            "name",
            "phone",
            "email",
            "recipient_last_name",
            "recipient_name",
            "recipient_phone",
        ].forEach((k) => touched.value.add(k));
    }
};
</script>

<template>
    <div
        class="max-w-2xl mx-auto space-y-12 py-10 animate-in fade-in duration-700"
    >
        <!-- Header -->
        <header class="flex justify-between items-start">
            <div class="space-y-1">
                <h3
                    class="text-[10px] font-black uppercase tracking-[0.5em] text-black"
                >
                    01. Контакти
                </h3>
                <p class="text-[9px] text-gray-400 uppercase tracking-widest">
                    Персональні дані замовника
                </p>
            </div>
            <button
                v-if="!$page.props.auth.user"
                @click="emit('open-auth')"
                type="button"
                class="group flex items-center gap-2 text-[9px] font-black uppercase tracking-widest bg-gray-50 px-4 py-2 rounded-full hover:bg-black hover:text-white transition-all"
            >
                <span>Увійти</span>
                <IconCircleCheck
                    size="14"
                    class="text-gray-300 group-hover:text-white"
                />
            </button>
        </header>

        <!-- Main Fields -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            <!-- Прізвище -->
            <div class="relative group">
                <InputLabel
                    value="Прізвище"
                    :class="[
                        touched.has('last_name') && form.last_name?.length < 2
                            ? 'text-red-500'
                            : 'text-gray-400',
                    ]"
                    class="text-[9px] uppercase tracking-widest mb-1"
                />
                <TextInput
                    v-model="form.last_name"
                    @blur="touched.add('last_name')"
                    placeholder="Шевченко"
                    class="w-full border-0 border-b bg-transparent px-0 py-2 focus:ring-0 text-sm transition-all"
                    :class="[
                        touched.has('last_name') && form.last_name?.length < 2
                            ? 'border-red-300'
                            : 'border-gray-100 focus:border-black',
                    ]"
                />
            </div>

            <!-- Ім'я -->
            <div class="relative group">
                <InputLabel
                    value="Ім'я"
                    :class="[
                        touched.has('name') && form.name?.length < 2
                            ? 'text-red-500'
                            : 'text-gray-400',
                    ]"
                    class="text-[9px] uppercase tracking-widest mb-1"
                />
                <TextInput
                    v-model="form.name"
                    @blur="touched.add('name')"
                    placeholder="Андрій"
                    class="w-full border-0 border-b bg-transparent px-0 py-2 focus:ring-0 text-sm transition-all"
                    :class="[
                        touched.has('name') && form.name?.length < 2
                            ? 'border-red-300'
                            : 'border-gray-100 focus:border-black',
                    ]"
                />
            </div>

            <!-- Телефон (З маскою) -->
            <div class="relative group">
                <InputLabel
                    value="Телефон"
                    :class="[
                        touched.has('phone') && form.phone?.length < 16
                            ? 'text-red-500'
                            : 'text-gray-400',
                    ]"
                    class="text-[9px] uppercase tracking-widest mb-1"
                />
                <TextInput
                    v-model="form.phone"
                    v-mask="'+38 0## ### ####'"
                    placeholder="+38 0__ ___ ____"
                    type="tel"
                    @blur="touched.add('phone')"
                    class="w-full border-0 border-b bg-transparent px-0 py-2 focus:ring-0 text-sm transition-all tracking-widest"
                    :class="[
                        touched.has('phone') && form.phone?.length < 16
                            ? 'border-red-300'
                            : 'border-gray-100 focus:border-black',
                    ]"
                />
            </div>

            <!-- Email -->
            <div class="relative group">
                <InputLabel
                    value="Email"
                    :class="[
                        touched.has('email') && !form.email?.includes('@')
                            ? 'text-red-500'
                            : 'text-gray-400',
                    ]"
                    class="text-[9px] uppercase tracking-widest mb-1"
                />
                <TextInput
                    v-model="form.email"
                    @blur="touched.add('email')"
                    placeholder="example@mail.com"
                    class="w-full border-0 border-b bg-transparent px-0 py-2 focus:ring-0 text-sm transition-all"
                    :class="[
                        touched.has('email') && !form.email?.includes('@')
                            ? 'border-red-300'
                            : 'border-gray-100 focus:border-black',
                    ]"
                />
            </div>
        </div>

        <!-- Toggle Recipient -->
        <div
            @click="form.different_recipient = !form.different_recipient"
            class="flex items-center justify-between p-8 rounded-[2rem] border transition-all cursor-pointer group shadow-sm hover:shadow-md"
            :class="
                form.different_recipient
                    ? 'bg-black border-black'
                    : 'bg-gray-50 border-gray-100'
            "
        >
            <div class="flex items-center gap-4">
                <div
                    class="w-10 h-5 rounded-full relative transition-colors"
                    :class="
                        form.different_recipient ? 'bg-white/20' : 'bg-gray-200'
                    "
                >
                    <div
                        class="absolute top-1 left-1 w-3 h-3 rounded-full transition-transform"
                        :class="[
                            form.different_recipient
                                ? 'translate-x-5 bg-white'
                                : 'bg-gray-400',
                        ]"
                    ></div>
                </div>
                <span
                    class="text-[10px] font-black uppercase tracking-widest"
                    :class="
                        form.different_recipient
                            ? 'text-white'
                            : 'text-gray-400'
                    "
                    >Отримає інша людина</span
                >
            </div>
            <IconAlertCircle
                v-if="!form.different_recipient"
                size="18"
                class="text-gray-200"
            />
        </div>

        <!-- Recipient Fields -->
        <transition name="slide-up">
            <div
                v-if="form.different_recipient"
                class="space-y-10 pt-10 border-t border-gray-50"
            >
                <h4 class="text-[10px] font-black uppercase tracking-[0.5em]">
                    Дані отримувача
                </h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                    <div class="relative group">
                        <InputLabel
                            value="Прізвище"
                            :class="[
                                touched.has('recipient_last_name') &&
                                form.recipient_last_name?.length < 2
                                    ? 'text-red-500'
                                    : 'text-gray-400',
                            ]"
                            class="text-[9px] uppercase tracking-widest mb-1"
                        />
                        <TextInput
                            v-model="form.recipient_last_name"
                            @blur="touched.add('recipient_last_name')"
                            placeholder="Коваленко"
                            class="w-full border-0 border-b bg-transparent px-0 py-2 focus:ring-0 text-sm transition-all"
                            :class="[
                                touched.has('recipient_last_name') &&
                                form.recipient_last_name?.length < 2
                                    ? 'border-red-300'
                                    : 'border-gray-100 focus:border-black',
                            ]"
                        />
                    </div>
                    <div class="relative group">
                        <InputLabel
                            value="Ім'я"
                            :class="[
                                touched.has('recipient_name') &&
                                form.recipient_name?.length < 2
                                    ? 'text-red-500'
                                    : 'text-gray-400',
                            ]"
                            class="text-[9px] uppercase tracking-widest mb-1"
                        />
                        <TextInput
                            v-model="form.recipient_name"
                            @blur="touched.add('recipient_name')"
                            placeholder="Іван"
                            class="w-full border-0 border-b bg-transparent px-0 py-2 focus:ring-0 text-sm transition-all"
                            :class="[
                                touched.has('recipient_name') &&
                                form.recipient_name?.length < 2
                                    ? 'border-red-300'
                                    : 'border-gray-100 focus:border-black',
                            ]"
                        />
                    </div>
                    <!-- Телефон отримувача (З маскою) -->
                    <div class="relative group">
                        <InputLabel
                            value="Телефон отримувача"
                            :class="[
                                touched.has('recipient_phone') &&
                                form.recipient_phone?.length < 16
                                    ? 'text-red-500'
                                    : 'text-gray-400',
                            ]"
                            class="text-[9px] uppercase tracking-widest mb-1"
                        />
                        <TextInput
                            v-model="form.recipient_phone"
                            v-mask="'+38 0## ### ####'"
                            placeholder="+38 0__ ___ ____"
                            type="tel"
                            @blur="touched.add('recipient_phone')"
                            class="w-full border-0 border-b bg-transparent px-0 py-2 focus:ring-0 text-sm transition-all tracking-widest"
                            :class="[
                                touched.has('recipient_phone') &&
                                form.recipient_phone?.length < 16
                                    ? 'border-red-300'
                                    : 'border-gray-100 focus:border-black',
                            ]"
                        />
                    </div>
                </div>
            </div>
        </transition>

        <!-- Footer -->
        <footer class="pt-10">
            <button
                @click="handleNext"
                type="button"
                class="group relative w-full py-8 rounded-2xl transition-all font-black uppercase tracking-[0.4em] text-[11px]"
                :class="
                    isStepValid
                        ? 'bg-black text-white shadow-xl shadow-black/10'
                        : 'bg-gray-50 text-gray-300'
                "
            >
                <div class="flex items-center justify-center gap-3">
                    <span>{{
                        isStepValid ? "Продовжити" : "Заповніть форму"
                    }}</span>
                    <IconChevronRight
                        v-if="isStepValid"
                        size="18"
                        class="group-hover:translate-x-2 transition-transform"
                    />
                </div>
            </button>
            <p
                class="text-center mt-8 text-[8px] font-black uppercase tracking-[0.6em] text-gray-200"
            >
                Крок 01 / 03
            </p>
        </footer>
    </div>
</template>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
    transition: all 0.5s ease;
}
.slide-up-enter-from {
    opacity: 0;
    transform: translateY(20px);
}
.slide-up-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
</style>
