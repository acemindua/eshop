<script setup>
import { ref } from "vue";
import { IconCircleCheck, IconArrowRight } from "@tabler/icons-vue";
import BaseInput from "@/Components/UI/BaseInput.vue";

const props = defineProps({
    form: Object,
    authUser: Object
});

const emit = defineEmits(["next", "open-auth"]);

const showRecipientFields = ref(props.form.different_recipient);

const validateAndNext = () => {
    props.form.clearErrors();
    let hasErrors = false;

    // Валідація основних полів
    if (!props.form.name || props.form.name.trim().length < 2) {
        props.form.setError('name', 'Please enter your name');
        hasErrors = true;
    }

    if (!props.form.last_name || props.form.last_name.trim().length < 2) {
        props.form.setError('last_name', 'Please enter your last name');
        hasErrors = true;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!props.form.email || !emailRegex.test(props.form.email)) {
        props.form.setError('email', 'Please enter a valid email address');
        hasErrors = true;
    }

    const phoneDigits = props.form.phone.replace(/\D/g, '');
    if (phoneDigits.length < 12) {
        props.form.setError('phone', 'Phone number is too short');
        hasErrors = true;
    }

    // Валідація іншого отримувача
    if (props.form.different_recipient) {
        if (!props.form.recipient_name) {
            props.form.setError('recipient_name', 'Please enter recipient name');
            hasErrors = true;
        }
        if (!props.form.recipient_phone) {
            props.form.setError('recipient_phone', 'Recipient phone number is invalid');
            hasErrors = true;
        }
    }

    if (!hasErrors) {
        emit('next');
    } else {
        // Скрол до першої помилки
        setTimeout(() => {
            const firstError = document.querySelector('.text-red-500');
            if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    }
};

const toggleRecipient = () => {
    showRecipientFields.value = !showRecipientFields.value;
    props.form.different_recipient = showRecipientFields.value;
    if (!showRecipientFields.value) {
        props.form.clearErrors('recipient_name', 'recipient_last_name', 'recipient_phone');
    }
};
</script>

<template>
    <div class="space-y-12 py-4 font-['Exo_2'] animate-in fade-in slide-in-from-bottom-4 duration-700">

        <!-- Header -->
        <header class="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-black pb-8 gap-6">
            <div class="space-y-2">
                <h2 class="text-3xl font-black uppercase tracking-tighter italic">
                    01. {{ $t("Contacts") }}
                </h2>
                <p class="text-gray-500 text-sm tracking-wide uppercase">
                    {{ authUser ? `` : $t('Fill in your details or login') }}
                </p>
            </div>

            <button
                v-if="!authUser"
                @click="emit('open-auth')"
                type="button"
                class="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] border border-black px-8 py-4 hover:bg-black hover:text-white transition-all duration-500"
            >
                <span>{{ $t("Login") }}</span>
                <IconCircleCheck size="16" class="text-gray-400 group-hover:text-white transition-colors" />
            </button>
        </header>

        <!-- Main Form Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
            <BaseInput
                :label="$t('Name')"
                v-model="form.name"
                :placeholder="$t('Enter your name')"
                :error="form.errors.name ? $t(form.errors.name) : ''"
            />
            <BaseInput
                :label="$t('LastName')"
                v-model="form.last_name"
                :placeholder="$t('Enter your last name')"
                :error="form.errors.last_name ? $t(form.errors.last_name) : ''"
            />
            <BaseInput
                :label="$t('Email')"
                v-model="form.email"
                type="email"
                placeholder="example@mail.com"
                :error="form.errors.email ? $t(form.errors.email) : ''"
            />
            <BaseInput
                :label="$t('Phone')"
                v-model="form.phone"
                type="tel"
                v-mask="'+38 0## ### ## ##'"
                placeholder="+38 0__ ___ __ __"
                :error="form.errors.phone ? $t(form.errors.phone) : ''"
            />
        </div>

        <!-- Another Recipient Toggle -->
        <div class="pt-4">
            <button @click="toggleRecipient" type="button" class="flex items-center gap-3 group transition-colors">
                <div class="w-6 h-6 border border-black flex items-center justify-center p-1">
                    <div v-if="showRecipientFields" class="w-full h-full bg-black"></div>
                </div>
                <span class="text-xs font-bold uppercase tracking-widest" :class="showRecipientFields ? 'text-black' : 'text-gray-400 group-hover:text-black'">
                    {{ $t("Another recipient") }}
                </span>
            </button>
        </div>

        <!-- Recipient Fields -->
        <div v-if="showRecipientFields" class="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 p-8 bg-gray-50 border border-dashed border-gray-200 animate-in zoom-in-95 duration-300">
            <BaseInput
                :label="$t('Recipient Name')"
                v-model="form.recipient_name"
                :error="form.errors.recipient_name ? $t(form.errors.recipient_name) : ''"
            />
            <BaseInput
                :label="$t('Recipient Last Name')"
                v-model="form.recipient_last_name"
                :error="form.errors.recipient_last_name ? $t(form.errors.recipient_last_name) : ''"
            />
            <BaseInput
                class="md:col-span-2"
                :label="$t('Recipient Phone')"
                v-model="form.recipient_phone"
                v-mask="'+38 0## ### ## ##'"
                :error="form.errors.recipient_phone ? $t(form.errors.recipient_phone) : ''"
            />
        </div>

        <!-- Footer -->
        <footer class="flex justify-end pt-12 border-t border-gray-100">
            <button
                @click="validateAndNext"
                type="button"
                class="group flex items-center gap-6 bg-black text-white pl-10 pr-6 py-6 hover:bg-zinc-900 transition-all duration-300"
            >
                <span class="text-xs font-black uppercase tracking-[0.3em]">{{ $t("Next step") }}</span>
                <div class="w-12 h-px bg-white/30 group-hover:w-16 transition-all duration-500"></div>
                <IconArrowRight size="20" />
            </button>
        </footer>
    </div>
</template>
