<!-- resources/js/Pages/Admin/Core/Components/Users/UserForm.vue -->
<script setup>
import { computed, ref, onUnmounted } from "vue";
import { router, useForm } from "@inertiajs/vue3";
import ButtonsGroup from "@/Components/UI/Buttons/Admin/ButtonsGroup.vue";
import ImageDataView from "@/Components/UI/ImageDataView.vue";
import { trans } from "laravel-vue-i18n";

// Імпорт потрібних іконок (додано IconX та IconDeviceFloppy)
import {
    IconCamera,
    IconArrowLeft,
    IconUser,
    IconMail,
    IconPhone,
    IconLock,
    IconShield,
    IconEye,
    IconEyeOff,
} from "@tabler/icons-vue";
import InputLabel from "@/Components/UI/InputLabel.vue";
import TextInput from "@/Components/UI/TextInput.vue";
import InputError from "@/Components/UI/InputError.vue";
import BaseSelect from "@/Components/UI/BaseSelect.vue";
import StickyActions from "@/Components/StickyActions.vue";

const props = defineProps({
    data: { type: Object, default: () => null },
    roles: { type: Array, default: () => [] },
    routePrefix: { type: String, required: true },
    isEditing: { type: Boolean, default: false },
    errors: { type: Object, default: () => ({}) },
});

const imagePreview = ref(props.data?.avatar || null);
const showPassword = ref(false);

const getInitialState = () => ({
    name: props.data?.name || "",
    last_name: props.data?.last_name || "",
    middle_name: props.data?.middle_name || "",
    email: props.data?.email || "",
    phone: props.data?.phone || "",
    birthday: props.data?.birthday || "",
    gender: props.data?.gender || "",
    role: props.data?.role || "auth",
    description: props.data?.description || "",
    password: "",
    password_confirmation: "",
    avatar: null,
});

const form = useForm(getInitialState());

const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        form.avatar = file;
        // Очищаємо попередній blob, якщо він був створений
        if (imagePreview.value && imagePreview.value.startsWith("blob:")) {
            URL.revokeObjectURL(imagePreview.value);
        }
        imagePreview.value = URL.createObjectURL(file);
    }
};

const handleSave = () => {
    const url = props.isEditing
        ? route(`${props.routePrefix}.update`, props.data?.id)
        : route(`${props.routePrefix}.store`);

    if (props.isEditing) {
        form.transform((data) => ({
            ...data,
            _method: "PUT",
        })).post(url, {
            forceFormData: true,
            preserveState: true,
            onSuccess: () => {
                form.password = "";
                form.password_confirmation = "";
            },
        });
    } else {
        form.post(url, {
            preserveState: true,
        });
    }
};

// Динамічні кнопки з іконками для ButtonsGroup (передаємо компоненти іконок прямо)
const actionButtons = computed(() => [
    {
        label: "cancel",
        action: () => router.visit(route(`${props.routePrefix}.index`)),
        type: "secondary",
        icon: "IconCancel",
        loading: form.processing,
    },
    {
        label: "save",
        loadingLabel: "Saving...",
        action: handleSave,
        type: "primary",
        icon: "IconDeviceFloppy",
        loading: form.processing,
    },
]);

onUnmounted(() => {
    // Запобігаємо витоку пам'яті при виході з компонента
    if (imagePreview.value && imagePreview.value.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview.value);
    }
});

// Формуємо масив ролей для BaseSelect (вирішує проблему відсутньої змінної)
const roleOptions = computed(() => {
    if (!props.roles || props.roles.length === 0) {
        return [{ value: "auth", name: "Auth User" }];
    }
    // Переконуємось, що об'єкт має ключі id та name для BaseSelect, або адаптуємо під displayKey="name"
    return props.roles.map((role) => ({
        id: role.value,
        name: role.label,
    }));
});

// Список опцій для статі
const genderOptions = computed(() => [
    {
        id: "male",
        name: trans("Male"),
        icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11.5 14a5.5 5.5 0 100-11 5.5 5.5 0 000 11zm0 0V21m0 0H9m2.5 0h2.5M16.5 7.5l4.5-4.5m0 0H17m4 0v4"/></svg>`,
    },
    {
        id: "female",
        name: trans("Female"),
        icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4a5 5 0 100 10 5 5 0 000-10zm0 10v7m0 0h-3m3 0h3"/></svg>`,
    },
    {
        id: "other",
        name: trans("Other"),
        icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m7-7H5"/></svg>`,
    },
]);

// Створюємо computed для синхронізації примітивного значення (form.gender) з об'єктом для Combobox/BaseSelect
const selectedGender = computed({
    get: () =>
        genderOptions.value.find((option) => option.id === form.gender) || null,
    set: (value) => {
        form.gender = value ? value.id : null;
    },
});

// Computed для синхронізації обраної ролі з BaseSelect
const selectedRole = computed({
    get: () =>
        roleOptions.value.find((option) => option.id === form.role) || null,
    set: (value) => {
        form.role = value ? value.id : "auth";
    },
});
</script>

<template>
    <div class="flex flex-col space-y-4">
        <StickyActions
            :buttons="actionButtons"
            :routePrefix="props.routePrefix"
            :title="
                props.isEditing
                    ? props.data?.full_name || $t('User Profile')
                    : $t('New User Account')
            "
            :description="
                props.isEditing
                    ? $t('Manage operational and personal parameters')
                    : $t('Register a secure user into the ecosystem')
            "
        >
            <!-- Головна форма -->
            <form
                @submit.prevent="handleSave"
                class="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start"
            >
                <!-- ЛІВА ПАНЕЛЬ: Картка Контексту (4Cols) -->
                <div
                    class="lg:col-span-4 lg:sticky lg:top-6 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-6 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)]"
                >
                    <div class="flex flex-col items-center text-center">
                        <!-- Зона Аватара -->
                        <div class="relative group w-24 h-24 my-4">
                            <label
                                class="block w-full h-full rounded-2xl overflow-hidden cursor-pointer border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 transition-all duration-300 group-hover:border-slate-300 dark:group-hover:border-slate-700"
                            >
                                <ImageDataView
                                    :src="imagePreview"
                                    :configs="{ width: '96px', height: '96px' }"
                                    class="object-cover w-full h-full"
                                />
                                <div
                                    class="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-all duration-200 rounded-2xl backdrop-blur-[1px]"
                                >
                                    <IconCamera
                                        size="20"
                                        class="scale-90 group-hover:scale-100 transition-transform"
                                    />
                                </div>
                                <input
                                    type="file"
                                    class="hidden"
                                    accept="image/*"
                                    @change="handleImageChange"
                                />
                            </label>
                        </div>

                        <h2
                            class="text-base font-semibold text-slate-800 dark:text-slate-200"
                        >
                            {{
                                form.name || form.last_name
                                    ? `${form.last_name} ${form.name}`
                                    : $t("Identity Preview")
                            }}
                        </h2>

                        <!-- Системний бейдж ролі -->
                        <div
                            class="mt-1.5 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-md"
                        >
                            {{ form.role }}
                        </div>
                    </div>

                    <!-- Вибір ролі (Очищено від дублювання стандартного селекту) -->
                    <div
                        class="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800"
                    >
                        <label
                            class="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2 flex items-center space-x-1"
                        >
                            <IconShield size="14" class="text-brand" />
                            <span>{{ $t("System Group Assignment") }}</span>
                        </label>
                        <BaseSelect
                            id="role"
                            v-model="selectedRole"
                            :options="roleOptions"
                            :label="$t('Role Selection')"
                            :placeholder="'—'"
                            displayKey="name"
                            isStatic
                        />
                        <InputError :message="form.errors.role" />
                    </div>

                    <!-- Метадані -->
                    <div
                        v-if="props.isEditing && props.data"
                        class="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 dark:text-slate-500 space-y-2 font-medium"
                    >
                        <div class="flex justify-between">
                            <span>Record ID</span>
                            <span
                                class="text-slate-700 dark:text-slate-300 font-mono"
                                >{{ props.data?.id }}</span
                            >
                        </div>
                        <div class="flex justify-between">
                            <span>Last Sync</span>
                            <span class="text-slate-700 dark:text-slate-300">{{
                                props.data?.last_activity || "—"
                            }}</span>
                        </div>
                    </div>
                </div>

                <!-- ПРАВА ПАНЕЛЬ: Робочі секції (8Cols) -->
                <div class="lg:col-span-8 space-y-4">
                    <!-- Блок 1: Персональні дані -->
                    <div
                        class="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-6 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)]"
                    >
                        <h3
                            class="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-5 pb-2 border-b border-slate-50 dark:border-slate-800/50 flex items-center space-x-1.5"
                        >
                            <IconUser size="16" class="text-brand" />
                            <span>{{ $t("General Data") }}</span>
                        </h3>
                        <div
                            class="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start"
                        >
                            <!-- Last Name -->
                            <div>
                                <InputLabel
                                    :value="$t('Last Name')"
                                    for="last_name"
                                />
                                <TextInput
                                    id="last_name"
                                    v-model="form.last_name"
                                    class="block w-full mt-1.5"
                                    type="text"
                                    :error="form.errors.last_name"
                                />
                                <InputError :message="form.errors.last_name" />
                            </div>

                            <!-- First Name -->
                            <div>
                                <InputLabel
                                    :value="$t('First Name')"
                                    :required="true"
                                    for="name"
                                />
                                <TextInput
                                    id="name"
                                    v-model="form.name"
                                    class="block w-full mt-1.5"
                                    type="text"
                                    :error="form.errors.name"
                                    required
                                />
                                <InputError :message="form.errors.name" />
                            </div>

                            <!-- Middle Name -->
                            <div>
                                <InputLabel
                                    :value="$t('Middle Name')"
                                    for="middle_name"
                                />
                                <TextInput
                                    id="middle_name"
                                    v-model="form.middle_name"
                                    class="block w-full mt-1.5"
                                    type="text"
                                />
                                <InputError
                                    :message="form.errors.middle_name"
                                />
                            </div>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                            <div>
                                <InputLabel
                                    :value="$t('Date of Birth')"
                                    for="birthday"
                                />
                                <TextInput
                                    id="birthday"
                                    v-model="form.birthday"
                                    type="date"
                                    class="block w-full mt-1.5"
                                    :error="form.errors.birthday"
                                />
                                <InputError :message="form.errors.birthday" />
                            </div>
                            <div>
                                <InputLabel
                                    :value="$t('Gender')"
                                    for="gender"
                                />
                                <BaseSelect
                                    id="gender"
                                    v-model="selectedGender"
                                    :options="genderOptions"
                                    :label="$t('Gender')"
                                    :placeholder="'—'"
                                    :error="form.errors.gender"
                                    displayKey="name"
                                    isStatic
                                />
                                <InputError :message="form.errors.gender" />
                            </div>
                        </div>
                    </div>

                    <!-- Блок 2: Комунікації з іконками -->
                    <div
                        class="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-6 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)]"
                    >
                        <h3
                            class="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-5 pb-2 border-b border-slate-50 dark:border-slate-800/50 flex items-center space-x-1.5"
                        >
                            <IconMail size="16" class="text-brand" />
                            <span>{{ $t("Communication Hub") }}</span>
                        </h3>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <!-- Email -->
                            <div>
                                <label
                                    class="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 flex items-center space-x-1"
                                >
                                    <IconMail
                                        size="14"
                                        class="text-slate-400"
                                    />
                                    <span
                                        >{{ $t("Email Address") }}
                                        <span class="text-rose-500"
                                            >*</span
                                        ></span
                                    >
                                </label>
                                <input
                                    type="email"
                                    v-model="form.email"
                                    class="w-full text-sm border-slate-200 dark:border-slate-800 rounded-xl focus:border-slate-400 focus:ring-0 bg-white dark:bg-slate-900 dark:text-slate-100 transition-all py-2"
                                    required
                                />
                                <div
                                    v-if="form.errors.email"
                                    class="text-rose-500 text-xs mt-1"
                                >
                                    {{ form.errors.email }}
                                </div>
                            </div>
                            <!-- Phone -->
                            <div>
                                <label
                                    class="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 flex items-center space-x-1"
                                >
                                    <IconPhone
                                        size="14"
                                        class="text-slate-400"
                                    />
                                    <span>{{ $t("Phone Connection") }}</span>
                                </label>
                                <input
                                    type="text"
                                    v-model="form.phone"
                                    v-mask="'+380 (##) ###-##-##'"
                                    placeholder="+380"
                                    class="w-full text-sm border-slate-200 dark:border-slate-800 rounded-xl focus:border-slate-400 focus:ring-0 bg-white dark:bg-slate-900 dark:text-slate-100 transition-all py-2"
                                />
                                <div
                                    v-if="form.errors.phone"
                                    class="text-rose-500 text-xs mt-1"
                                >
                                    {{ form.errors.phone }}
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Блок 3: Безпека з іконками локу -->
                    <div
                        class="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-6 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)]"
                    >
                        <h3
                            class="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1 pb-2 flex items-center space-x-1.5"
                        >
                            <IconLock size="16" class="text-brand" />
                            <span>{{ $t("Security Credentials") }}</span>
                        </h3>
                        <p
                            v-if="props.isEditing"
                            class="text-xs text-slate-400 dark:text-slate-500 mb-5 font-medium"
                        >
                            {{
                                $t(
                                    "Leave empty if you don't want to change the password",
                                )
                            }}
                        </p>
                        <div
                            v-else
                            class="mb-5 border-b border-slate-50 dark:border-slate-800/50 pb-2"
                        ></div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <!-- Password -->
                            <div>
                                <label
                                    class="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5"
                                >
                                    {{ $t("Password") }}
                                    <span
                                        v-if="!props.isEditing"
                                        class="text-rose-500"
                                        >*</span
                                    >
                                </label>
                                <div class="relative">
                                    <input
                                        :type="
                                            showPassword ? 'text' : 'password'
                                        "
                                        v-model="form.password"
                                        :required="!props.isEditing"
                                        class="w-full text-sm border-slate-200 dark:border-slate-800 rounded-xl focus:border-slate-400 focus:ring-0 bg-white dark:bg-slate-900 dark:text-slate-100 transition-all py-2 pr-10"
                                    />
                                    <button
                                        type="button"
                                        @click="showPassword = !showPassword"
                                        class="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                                    >
                                        <IconEye
                                            v-if="showPassword"
                                            size="16"
                                        />
                                        <IconEyeOff v-else size="16" />
                                    </button>
                                </div>
                                <div
                                    v-if="form.errors.password"
                                    class="text-rose-500 text-xs mt-1"
                                >
                                    {{ form.errors.password }}
                                </div>
                            </div>

                            <!-- Confirm Password -->
                            <div>
                                <label
                                    class="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5"
                                >
                                    {{ $t("Confirm Password") }}
                                    <span
                                        v-if="!props.isEditing"
                                        class="text-rose-500"
                                        >*</span
                                    >
                                </label>
                                <div class="relative">
                                    <input
                                        :type="
                                            showPassword ? 'text' : 'password'
                                        "
                                        v-model="form.password_confirmation"
                                        :required="!props.isEditing"
                                        class="w-full text-sm border-slate-200 dark:border-slate-800 rounded-xl focus:border-slate-400 focus:ring-0 bg-white dark:bg-slate-900 dark:text-slate-100 transition-all py-2 pr-10"
                                    />
                                    <button
                                        type="button"
                                        @click="showPassword = !showPassword"
                                        class="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                                    >
                                        <IconEye
                                            v-if="showPassword"
                                            size="16"
                                        />
                                        <IconEyeOff v-else size="16" />
                                    </button>
                                </div>
                                <div
                                    v-if="form.errors.password_confirmation"
                                    class="text-rose-500 text-xs mt-1"
                                >
                                    {{ form.errors.password_confirmation }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </StickyActions>
    </div>
</template>
