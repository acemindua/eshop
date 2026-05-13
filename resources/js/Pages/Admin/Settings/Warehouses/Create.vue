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

const form = useForm({
    title: "",
    city: "",
    address: "",
    phone: "",
    working_hours: "",
    map_link: "",
    sort_order: props.data.defaults.sort_order,
    is_active: props.data.defaults.is_active,
    image: null,
});

const submit = () => {
    form.post(route("admin.settings.warehouses.store"), {
        forceFormData: true, // Важливо для завантаження медіа
        onSuccess: () => form.reset(),
    });
};
</script>

<template>
    <Head title="Додати склад" />

    <AdminLayout>
        <template #header>
            <div class="flex items-center justify-between">
                <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                    Новий склад
                </h2>
                <Link
                    :href="route('admin.settings.warehouses.index')"
                    class="text-sm text-gray-600 hover:text-gray-900"
                >
                    Скасувати
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
                                    placeholder="Наприклад: Головний склад Львів"
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
                                    placeholder="Львів"
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
                                    placeholder="вул. Промислова, 10"
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
                                    placeholder="+380..."
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
                                    placeholder="Пн-Пт: 09:00 - 18:00"
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
                                    placeholder="https://goo.gl/maps/..."
                                />
                                <InputError
                                    :message="form.errors.map_link"
                                    class="mt-2"
                                />
                            </div>
                        </div>
                    </div>

                    <hr class="my-6 border-gray-200" />

                    <!-- Додаткові параметри -->
                    <div
                        class="grid grid-cols-1 md:grid-cols-3 gap-6 items-start"
                    >
                        <div>
                            <InputLabel for="image" value="Фото складу" />
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

                        <div class="flex items-center h-full pt-6">
                            <label class="flex items-center">
                                <Checkbox v-model:checked="form.is_active" />
                                <span class="ml-2 text-sm text-gray-600"
                                    >Активний склад</span
                                >
                            </label>
                            <InputError
                                :message="form.errors.is_active"
                                class="mt-2"
                            />
                        </div>
                    </div>

                    <div class="flex items-center justify-end mt-6">
                        <PrimaryButton
                            :class="{ 'opacity-25': form.processing }"
                            :disabled="form.processing"
                        >
                            Створити склад
                        </PrimaryButton>
                    </div>
                </form>
            </div>
            <section v-if="$page.props.app.mode === 'local'">
                <VarDump :data="form" />
            </section>
        </div>
    </AdminLayout>
</template>
