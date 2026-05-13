<script setup>
import { Head, Link, useForm } from "@inertiajs/vue3";
import AdminLayout from "@/Layouts/Admin/SettingsAdminLayout.vue";
import InputError from "@/Components/UI/InputError.vue";
import InputLabel from "@/Components/UI/InputLabel.vue";
import TextInput from "@/Components/UI/TextInput.vue";
import PrimaryButton from "@/Components/UI/Buttons/PrimaryButton.vue";
import Checkbox from "@/Components/UI/Checkbox.vue";
import VarDump from "@/Shared/VarDump.vue";

const props = defineProps({
    data: {
        type: Object,
        required: true,
    },
});

const warehouse = props.data?.warehouse?.data || {};

const form = useForm({
    _method: "PUT", // Необхідно для Laravel при завантаженні файлів через POST запит
    title: warehouse.title,
    city: warehouse.city,
    address: warehouse.address,
    phone: warehouse.phone,
    working_hours: warehouse.working_hours,
    map_link: warehouse.map_link,
    sort_order: warehouse.sort_order,
    is_active: warehouse.is_active,
    image: null,
});

const submit = () => {
    // Використовуємо post замість put через особливості PHP/Laravel при роботі з multipart/form-data
    form.post(route("admin.settings.warehouses.update", warehouse.id), {
        forceFormData: true,
        onSuccess: () => {},
    });
};
</script>

<template>
    <Head :title="`Редагувати: ${warehouse.title}`" />

    <AdminLayout>
        <template #header>
            <div class="flex items-center justify-between">
                <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                    Редагування складу:
                    <span class="text-indigo-600">{{ warehouse.title }}</span>
                </h2>
                <Link
                    :href="route('admin.settings.warehouses.index')"
                    class="text-sm text-gray-600 hover:text-gray-900 flex items-center"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                    </svg>
                    Назад до списку
                </Link>
            </div>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <form
                    @submit.prevent="submit"
                    class="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 space-y-6"
                >
                    <!-- Основна інформація -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="space-y-4">
                            <div>
                                <InputLabel for="title" value="Назва складу" />
                                <TextInput
                                    id="title"
                                    v-model="form.title"
                                    type="text"
                                    class="mt-1 block w-full"
                                    required
                                />
                                <InputError
                                    :message="form.errors.title"
                                    class="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel for="city" value="Місто" />
                                <TextInput
                                    id="city"
                                    v-model="form.city"
                                    type="text"
                                    class="mt-1 block w-full"
                                    required
                                />
                                <InputError
                                    :message="form.errors.city"
                                    class="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel for="address" value="Адреса" />
                                <TextInput
                                    id="address"
                                    v-model="form.address"
                                    type="text"
                                    class="mt-1 block w-full"
                                    required
                                />
                                <InputError
                                    :message="form.errors.address"
                                    class="mt-2"
                                />
                            </div>
                        </div>

                        <div class="space-y-4">
                            <div>
                                <InputLabel for="phone" value="Телефон" />
                                <TextInput
                                    id="phone"
                                    v-model="form.phone"
                                    type="text"
                                    class="mt-1 block w-full"
                                />
                                <InputError
                                    :message="form.errors.phone"
                                    class="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    for="working_hours"
                                    value="Графік роботи"
                                />
                                <TextInput
                                    id="working_hours"
                                    v-model="form.working_hours"
                                    type="text"
                                    class="mt-1 block w-full"
                                />
                                <InputError
                                    :message="form.errors.working_hours"
                                    class="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    for="map_link"
                                    value="Посилання на Google Maps"
                                />
                                <TextInput
                                    id="map_link"
                                    v-model="form.map_link"
                                    type="url"
                                    class="mt-1 block w-full"
                                />
                                <InputError
                                    :message="form.errors.map_link"
                                    class="mt-2"
                                />
                            </div>
                        </div>
                    </div>

                    <hr class="my-6 border-gray-200" />

                    <!-- Медіа та налаштування -->
                    <div
                        class="grid grid-cols-1 md:grid-cols-3 gap-6 items-start"
                    >
                        <div>
                            <InputLabel value="Поточне фото" class="mb-2" />
                            <div v-if="warehouse.image" class="mb-4">
                                <img
                                    :src="warehouse.image"
                                    class="h-32 w-48 object-cover rounded shadow"
                                    alt="Warehouse image"
                                />
                            </div>
                            <div
                                v-else
                                class="mb-4 h-32 w-48 bg-gray-100 flex items-center justify-center rounded border border-dashed border-gray-300 text-gray-400 text-sm"
                            >
                                Немає фото
                            </div>

                            <InputLabel for="image" value="Замінити фото" />
                            <input
                                id="image"
                                type="file"
                                class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                                @input="form.image = $event.target.files[0]"
                            />
                            <InputError
                                :message="form.errors.image"
                                class="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel
                                for="sort_order"
                                value="Порядок сортування"
                            />
                            <TextInput
                                id="sort_order"
                                v-model="form.sort_order"
                                type="number"
                                class="mt-1 block w-full"
                            />
                            <InputError
                                :message="form.errors.sort_order"
                                class="mt-2"
                            />
                        </div>

                        <div class="flex items-center h-full pt-6 md:pt-12">
                            <label class="flex items-center cursor-pointer">
                                <Checkbox v-model:checked="form.is_active" />
                                <span
                                    class="ml-2 text-sm text-gray-600 font-medium"
                                    >Склад активний</span
                                >
                            </label>
                            <InputError
                                :message="form.errors.is_active"
                                class="mt-2"
                            />
                        </div>
                    </div>

                    <div class="flex items-center justify-end mt-8 gap-4">
                        <Link
                            :href="route('admin.settings.warehouses.index')"
                            class="text-sm text-gray-600 hover:underline"
                        >
                            Скасувати зміни
                        </Link>
                        <PrimaryButton
                            :class="{ 'opacity-25': form.processing }"
                            :disabled="form.processing"
                        >
                            Зберегти зміни
                        </PrimaryButton>
                    </div>
                </form>
            </div>

            <section v-if="$page.props.app.mode === 'local'">
                <VarDump :data="data" />
            </section>
        </div>
    </AdminLayout>
</template>
