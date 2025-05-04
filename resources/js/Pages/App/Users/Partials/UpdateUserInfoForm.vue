<template>
    <div
        class="bg-white dark:bg-slate-800 p-4 border dark:border-slate-700 rounded-md flex flex-col"
    >
        <div class="mb-4">
            <p class="font-semibold dark:text-white">GENERAL INFO</p>
            <p class="text-sm text-slate-500">
                Edit your account's general information
            </p>
        </div>

        <div class="mx-auto w-full max-w-xl flex flex-col space-y-4">
            <div class="text-sm mt-12">
                <p class="font-semibold dark:text-white">Profile picture</p>
                <p class="text-sm text-slate-400">
                    Others deserve to know you more
                </p>
            </div>
            <div class="flex items-center justify-center">
                <div class="relative">
                    <UserAvatar
                        :data-user="userData"
                        :max-width="100"
                        :src="preview"
                    />
                    <button
                        @click="chooseFiles()"
                        class="absolute right-2 bottom-2 bg-white dark:bg-slate-700 dark:text-white rounded-full w-6 h-6 shadow-xl"
                    >
                        <component
                            :is="preview ? IconPlus : IconPlus"
                            :size="24"
                            stroke="2"
                        />
                    </button>
                </div>
            </div>

            <div class="text-sm pt-12">
                <p class="font-semibold dark:text-white">Profile Info</p>
                <p class="text-sm text-slate-400">
                    This is how others will recognize you
                </p>
            </div>

            <div class="grid grid-cols-2 gap-4 py-6">
                <div>
                    <InputLabel for="name" value="Name" />
                    <TextInput
                        id="name"
                        type="text"
                        class="mt-1 block w-full"
                        :class="{ 'border-red-500': errors.name }"
                        v-model="form.name"
                        required
                        autofocus
                        autocomplete="name"
                    />
                    <InputError class="mt-2" :message="errors.name" />
                </div>

                <div>
                    <InputLabel for="surname" value="Surname" />
                    <TextInput
                        id="surname"
                        type="text"
                        class="mt-1 block w-full"
                        :class="{ 'border-red-500': errors.surname }"
                        v-model="form.surname"
                        required
                        autocomplete="surname"
                    />
                    <InputError class="mt-2" :message="errors.surname" />
                </div>
            </div>

            <div>
                <InputLabel for="email" value="Email address" />
                <TextInput
                    id="email"
                    type="email"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': errors.email }"
                    v-model="form.email"
                    required
                    autocomplete="email"
                />

                <InputError class="mt-2" :message="errors.email" />
            </div>
            <div>
                <InputLabel for="phone" value="Phone" />
                <TextInput
                    id="phone"
                    type="tel"
                    masked="true"
                    placeholder="+38 0"
                    v-mask="'+38 0## ### ####'"
                    class="mt-1 block w-full"
                    v-model="form.phone"
                    required
                    autocomplete="phone"
                />

                <InputError class="mt-2" :message="errors.phone" />
            </div>
            <div>
                <InputLabel for="description" value="About you" />
                <TextareaInput
                    id="description"
                    v-model="form.description"
                    class="mt-1 block w-full"
                >
                </TextareaInput>
                <InputError class="mt-2" :message="errors.description" />
            </div>

            <form @submit.prevent="submit" class="py-4">
                <input
                    ref="fileInput"
                    type="file"
                    @change="previewImage"
                    hidden
                    accept="image/*"
                />
                <div class="flex items-center gap-4">
                    <PrimaryButton :disabled="loading">Save</PrimaryButton>
                    <p
                        v-if="recentlySuccessful"
                        class="text-sm text-gray-500 dark:text-green-500"
                    >
                        Saved.
                    </p>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, watch } from "vue";
import { router } from "@inertiajs/vue3";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import TextInput from "@/Components/TextInput.vue";
import TextareaInput from "@/Components/TextareaInput.vue";
import { IconX, IconPlus } from "@tabler/icons-vue";
import UserAvatar from "@/Components/UserAvatar.vue";
import InputLabel from "@/Components/InputLabel.vue";
import InputError from "@/Components/InputError.vue";

const props = defineProps({
    userData: Object,
    errors: { type: Object },
});
const loading = ref(false);
const recentlySuccessful = ref(false);
const preview = ref(props.userData.avatar || "");
const fileInput = ref(null);

watch(
    () => props.userData.avatar,
    (newAvatar) => (preview.value = newAvatar || "")
);

const clearFiles = () => {
    router.get(route("users.clear.avatar", props.userData.id), {
        preserveState: true,
        onStart: () => (loading.value = true),
        onSuccess: () => {
            preview.value = "";
            recentlySuccessful.value = true;
            setTimeout(() => (recentlySuccessful.value = false), 3000);
        },
        onFinish: () => (loading.value = false),
    });
};

const chooseFiles = () => fileInput.value.click();

const previewImage = (event) => {
    const file = event.target.files[0];
    if (file) {
        preview.value = URL.createObjectURL(file);
        form.avatar = file;
    }
};

const form = reactive({
    _method: "put",
    id: props.userData.id,
    name: props.userData.name,
    surname: props.userData.surname ?? "",
    phone: props.userData.phone ?? "",
    email: props.userData.email,
    description: props.userData.description ?? "",
    avatar: null,
});

const submit = () => {
    router.post(route("admin.users.update", props.userData.id), form, {
        forceFormData: true,
        preserveState: true,
        onStart: () => (loading.value = true),
        onSuccess: () => {
            recentlySuccessful.value = true;
            setTimeout(() => (recentlySuccessful.value = false), 3000);
        },
        onFinish: () => (loading.value = false),
    });
};
</script>
