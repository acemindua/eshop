<script setup>
import Layout from "@/Layouts/Public/Landing/Layout.vue";
import {
    IconLogout,
    IconUserScan,
    IconShoppingBag,
    IconEdit,
    IconCheck,
} from "@tabler/icons-vue";
import { computed, ref, watch } from "vue";
import { Link, useForm } from "@inertiajs/vue3";
import { vMask } from "vue-the-mask";
import Swal from "sweetalert2";
import moment from "moment";

defineOptions({ layout: Layout });

const props = defineProps({ data: Object });
const user = computed(() => props.data?.user || {});
const isEditing = ref(false);

const form = useForm({
    name: "",
    last_name: "",
    middle_name: "",
    phone: "",
    birthday: "",
    gender: "",
    preferred_locale: "",
});

// Синхронізація з моделлю (враховуючи ваші нові поля)
watch(
    () => user.value,
    (newVal) => {
        form.name = newVal.name || "";
        form.last_name = newVal.last_name || "";
        form.middle_name = newVal.middle_name || "";
        form.phone = newVal.phone || "";
        form.birthday = newVal.birthday ? newVal.birthday.split("T")[0] : "";
        form.gender = newVal.gender || "";
        form.preferred_locale = newVal.preferred_locale || "uk";
    },
    { immediate: true },
);

const saveProfile = () => {
    form.patch(route("profile.update"), {
        preserveScroll: true,
        onSuccess: () => {
            isEditing.value = false;
            Swal.fire({
                title: "Збережено!",
                icon: "success",
                toast: true,
                position: "top-end",
                timer: 3000,
                showConfirmButton: false,
            });
        },
    });
};

const uploadAvatar = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const avatarForm = useForm({ avatar: file });
    avatarForm.post(route("profile.avatar.update"), {
        forceFormData: true,
        preserveScroll: true,
        onSuccess: () => {
            Swal.fire({
                title: "Фото оновлено",
                icon: "success",
                toast: true,
                position: "top-end",
                timer: 2000,
                showConfirmButton: false,
            });
        },
    });
};

const updateLocale = (lang) => {
    form.preferred_locale = lang;
    form.patch(route("profile.update"), { preserveScroll: true });
};
</script>

<template>
    <div
        class="grid grid-cols-1 md:grid-cols-12 w-full min-h-screen bg-gray-100 gap-[1px]"
    >
        <div
            class="md:col-span-4 bg-white p-12 flex flex-col items-center border-r border-gray-100"
        >
            <div class="sticky top-12 w-full space-y-8">
                <div class="flex justify-center">
                    <div
                        class="relative group cursor-pointer"
                        @click="$refs.fileInput.click()"
                    >
                        <div
                            class="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-50 shadow-inner bg-gray-100 flex items-center justify-center"
                        >
                            <img
                                v-if="user.avatar"
                                :src="user.avatar"
                                class="w-full h-full object-cover"
                            />
                            <IconUserScan
                                v-else
                                :size="48"
                                class="text-gray-300"
                            />
                        </div>
                        <div
                            class="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                        >
                            <IconEdit class="text-white" :size="20" />
                        </div>
                        <input
                            type="file"
                            ref="fileInput"
                            class="hidden"
                            @change="uploadAvatar"
                        />
                    </div>
                </div>

                <div class="text-center">
                    <h1
                        class="text-xl font-bold font-['Exo_2'] uppercase tracking-tight"
                    >
                        {{ user.full_name }}
                    </h1>
                    <p class="text-xs font-mono text-gray-400 mt-1">
                        {{ user.email }}
                    </p>
                </div>

                <div
                    class="bg-indigo-600 rounded-3xl p-8 text-white shadow-xl shadow-indigo-100"
                >
                    <span
                        class="text-[10px] uppercase tracking-[0.2em] opacity-80 font-bold"
                        >{{ $t("Бонусний рахунок") }}</span
                    >
                    <div class="text-4xl font-black font-['Exo_2'] mt-2">
                        {{ user.bonus_balance }}
                        <span class="text-lg font-light">₴</span>
                    </div>
                </div>

                <div
                    class="pt-8 border-t border-gray-50 flex flex-col items-center gap-6"
                >
                    <div class="flex gap-2">
                        <button
                            v-for="l in ['uk', 'en']"
                            :key="l"
                            @click="updateLocale(l)"
                            :class="[
                                'px-4 py-2 rounded-xl text-[10px] font-bold uppercase transition-all',
                                user.preferred_locale === l
                                    ? 'bg-black text-white'
                                    : 'bg-gray-50 text-gray-400 hover:bg-gray-100',
                            ]"
                        >
                            {{ l }}
                        </button>
                    </div>
                    <Link
                        href="/logout"
                        method="post"
                        as="button"
                        class="text-[10px] font-bold uppercase tracking-widest text-red-400 hover:text-red-600 flex items-center gap-2"
                    >
                        <IconLogout :size="16" /> {{ $t("Вийти") }}
                    </Link>
                </div>
            </div>
        </div>

        <div class="md:col-span-8 bg-white p-12">
            <div class="max-w-3xl">
                <div class="flex justify-between items-center mb-12">
                    <h2
                        class="text-xs uppercase font-bold tracking-[0.3em] text-gray-400"
                    >
                        {{ $t("Особисті дані") }}
                    </h2>
                    <button
                        @click="isEditing = !isEditing"
                        class="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest px-6 py-3 rounded-full transition-all"
                        :class="
                            isEditing
                                ? 'bg-indigo-50 text-indigo-600'
                                : 'bg-gray-50 text-gray-400 hover:text-black'
                        "
                    >
                        <component
                            :is="isEditing ? IconCheck : IconEdit"
                            :size="14"
                        />
                        {{ isEditing ? $t("Завершити") : $t("Редагувати") }}
                    </button>
                </div>

                <form
                    @submit.prevent="saveProfile"
                    class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8"
                >
                    <div
                        v-for="field in [
                            { id: 'last_name', label: 'Прізвище' },
                            { id: 'name', label: 'Ім’я' },
                            { id: 'middle_name', label: 'По-батькові' },
                        ]"
                        :key="field.id"
                        class="space-y-1"
                    >
                        <label
                            class="text-[10px] uppercase font-bold text-gray-400 tracking-tighter"
                            >{{ $t(field.label) }}</label
                        >
                        <input
                            v-if="isEditing"
                            v-model="form[field.id]"
                            type="text"
                            class="input-style"
                        />
                        <p v-else class="text-lg font-bold font-['Exo_2']">
                            {{ user[field.id] || "—" }}
                        </p>
                    </div>

                    <div class="space-y-1">
                        <label
                            class="text-[10px] uppercase font-bold text-gray-400 tracking-tighter"
                            >{{ $t("Телефон") }}</label
                        >
                        <input
                            v-if="isEditing"
                            v-model="form.phone"
                            v-mask="'+38 (0##) ###-##-##'"
                            class="input-style"
                        />
                        <p v-else class="text-lg font-bold font-['Exo_2']">
                            {{ user.phone || "—" }}
                        </p>
                    </div>

                    <div class="space-y-1">
                        <label
                            class="text-[10px] uppercase font-bold text-gray-400 tracking-tighter"
                            >{{ $t("Дата народження") }}</label
                        >
                        <input
                            v-if="isEditing"
                            v-model="form.birthday"
                            type="date"
                            class="input-style"
                        />
                        <p v-else class="text-lg font-bold font-['Exo_2']">
                            {{
                                user.birthday
                                    ? moment(user.birthday).format("DD.MM.YYYY")
                                    : "—"
                            }}
                        </p>
                    </div>

                    <div class="space-y-1">
                        <label
                            class="text-[10px] uppercase font-bold text-gray-400 tracking-tighter"
                            >{{ $t("Стать") }}</label
                        >
                        <select
                            v-if="isEditing"
                            v-model="form.gender"
                            class="input-style bg-transparent"
                        >
                            <option value="male">{{ $t("Чоловіча") }}</option>
                            <option value="female">{{ $t("Жіноча") }}</option>
                            <option value="other">{{ $t("Інша") }}</option>
                        </select>
                        <p
                            v-else
                            class="text-lg font-bold font-['Exo_2'] capitalize"
                        >
                            {{ $t(user.gender || "—") }}
                        </p>
                    </div>

                    <div v-if="isEditing" class="md:col-span-2 pt-4">
                        <button
                            type="submit"
                            :disabled="form.processing"
                            class="bg-black text-white px-10 py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-indigo-600 transition-all disabled:opacity-50"
                        >
                            {{
                                form.processing
                                    ? $t("Зберігаємо...")
                                    : $t("Зберегти зміни")
                            }}
                        </button>
                    </div>
                </form>

                <div class="mt-20">
                    <h2
                        class="text-xs uppercase font-bold tracking-[0.3em] text-gray-400 mb-8"
                    >
                        {{ $t("Історія замовлень") }}
                    </h2>
                    <div
                        class="border border-gray-100 rounded-3xl p-12 text-center bg-gray-50/30"
                    >
                        <IconShoppingBag
                            :size="40"
                            class="mx-auto text-gray-200 mb-4"
                        />
                        <p class="text-sm text-gray-400 italic">
                            {{ $t("У вас поки немає замовлень") }}
                        </p>
                        <Link
                            :href="route('home')"
                            class="inline-block mt-6 text-[10px] font-bold uppercase tracking-widest text-indigo-600 hover:text-black transition-colors"
                        >
                            {{ $t("Перейти до покупок") }} →
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.input-style {
    @apply w-full border-0 border-b-2 border-gray-100 focus:border-indigo-600 focus:ring-0 text-lg font-bold font-['Exo_2'] p-0 pb-1 transition-all;
}
</style>
