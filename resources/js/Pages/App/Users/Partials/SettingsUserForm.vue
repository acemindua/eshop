<template>
    <div
        class="bg-white dark:bg-slate-800 p-4 border dark:border-slate-700 rounded-md flex flex-col"
    >
        <div class="text-sm">
            <p class="font-semibold dark:text-white">SETTINGS</p>
            <p class="text-sm text-slate-500">Edit settings</p>
        </div>
        <div class="mx-auto w-full max-w-xl flex flex-col space-y-4">
            <form @submit.prevent="submit" class="mt-6 space-y-6">
                <div>
                    <InputLabel for="role" value="Role" />
                    <select
                        v-model="form.role"
                        id="role"
                        class="mt-1 block w-full border border-gray-200 rounded-md"
                        autocomplete="none"
                    >
                        <option
                            v-for="role in roles"
                            :key="role.id"
                            :value="role.name"
                        >
                            {{ role.name }}
                        </option>
                    </select>
                    <InputError :message="form.errors.role" class="mt-2" />
                </div>

                <div class="flex items-center gap-4 py-4">
                    <PrimaryButton :disabled="form.processing"
                        >Save</PrimaryButton
                    >

                    <Transition
                        enter-active-class="transition ease-in-out"
                        enter-from-class="opacity-0"
                        leave-active-class="transition ease-in-out"
                        leave-to-class="opacity-0"
                    >
                        <p
                            v-if="form.recentlySuccessful"
                            class="text-sm text-gray-500 dark:text-green-500"
                        >
                            Saved.
                        </p>
                    </Transition>
                </div>
            </form>

            <div class="pt-4">
                <hr class="border-0 h-[1px] bg-slate-200 dark:bg-slate-700" />
            </div>

            <div class="flex items-center justify-between">
                <div class="text-sm">
                    <p class="font-semibold dark:text-white">Delete</p>
                    <p class="text-sm text-slate-500">Delete this account.</p>
                </div>

                <div>
                    <DangerButton @click="confirmUserDeletion"
                        >Delete Account</DangerButton
                    >

                    <Modal :show="confirmingUserDeletion" @close="closeModal">
                        <div class="p-6">
                            <h2
                                class="text-lg font-medium text-gray-900 dark:text-white"
                            >
                                Are you sure you want to delete this account?
                            </h2>
                            <p
                                class="mt-1 text-sm text-gray-600 dark:text-gray-400"
                            >
                                Once your account is deleted, all of its
                                resources and data will be permanently deleted.
                            </p>

                            <div class="mt-6 flex justify-end">
                                <SecondaryButton @click="closeModal"
                                    >Cancel</SecondaryButton
                                >

                                <DangerButton
                                    class="ms-3"
                                    :class="{ 'opacity-25': form.processing }"
                                    :disabled="form.processing"
                                    @click="deleteUser"
                                >
                                    Delete Account
                                </DangerButton>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useForm } from "@inertiajs/vue3";

import DangerButton from "@/Components/DangerButton.vue";
import Modal from "@/Components/Modal.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";
import InputLabel from "@/Components/InputLabel.vue";
import InputError from "@/Components/InputError.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";

const props = defineProps({
    user: Object,
    roles: Array,
    errors: Object,
});

// Визначаємо роль користувача (беремо першу, якщо є)
const role_name = computed(() => props.user.roles?.[0]?.name || null);

// Форма з початковим значенням ролі користувача
const form = useForm({
    id: props.user.id,
    role: role_name.value,
});

const confirmingUserDeletion = ref(false);

const closeModal = () => {
    confirmingUserDeletion.value = false;
};

const confirmUserDeletion = () => {
    confirmingUserDeletion.value = true;
};

const submit = () => {
    form.put(route('admin.users.update', props.user), {
        preserveScroll: true,
        onSuccess: () => form.reset(),
    });
};

const deleteUser = () => {
    form.delete(route("admin.users.destroy", props.user.id), {
        preserveScroll: true,
        onSuccess: closeModal,
    });
};
</script>
