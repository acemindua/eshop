<template>
    <div class="bg-white dark:bg-slate-800 p-4 border dark:border-slate-700 rounded-md flex flex-col">
        <div class="text-sm">
            <p class="font-semibold dark:text-white">
                UPDATE PASSWORD
            </p>
            <p class="text-sm text-slate-500">
                Ensure your account is using a long, random password to stay secure.
            </p>
        </div>

        <form @submit.prevent="updatePassword" class="mt-6 space-y-6">
            <div class="mx-auto w-full max-w-xl flex flex-col space-y-4">

                <div>
                    <InputLabel for="password" value="New Password" />

                    <TextInput id="password" ref="passwordInput" v-model="form.password" type="password"
                        class="mt-1 block w-full" autocomplete="new-password" />

                    <InputError :message="form.errors.password" class="mt-2" />
                </div>

                <div>
                    <InputLabel for="password_confirmation" value="Confirm Password" />

                    <TextInput id="password_confirmation" v-model="form.password_confirmation" type="password"
                        class="mt-1 block w-full" autocomplete="new-password" />

                    <InputError :message="form.errors.password_confirmation" class="mt-2" />
                </div>

                <div class="flex items-center gap-4 py-4">
                    <PrimaryButton :disabled="form.processing">Save</PrimaryButton>

                    <Transition enter-active-class="transition ease-in-out" enter-from-class="opacity-0"
                        leave-active-class="transition ease-in-out" leave-to-class="opacity-0">
                        <p v-if="form.recentlySuccessful" class="text-sm text-gray-500 dark:text-green-500" >Saved.</p>
                    </Transition>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup>
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import { useForm } from '@inertiajs/vue3';
import { ref } from 'vue';

const props = defineProps({
    userId: Number,
    errors: { type: Object },
});

const passwordInput = ref(null);

const form = useForm({
    password: '',
    password_confirmation: '',
});

const updatePassword = () => {
    form.put(route('admin.users.update', props.userId), {
        preserveScroll: true,
        onSuccess: () => form.reset(),
        onError: () => {
            if (form.errors.password) {
                form.reset('password', 'password_confirmation');
                passwordInput.value.focus();
            }
        },
    });
};
</script>