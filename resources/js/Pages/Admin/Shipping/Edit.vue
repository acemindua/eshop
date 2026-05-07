<script setup>
import Layout from "@/Layouts/Admin/SettingsAdminLayout.vue";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { IconArrowLeft, IconDeviceFloppy, IconTruck } from "@tabler/icons-vue";

const props = defineProps({
    shipping: Object, // Дані з нашого ShippingResource
});

// Ініціалізація форми через Inertia Helper
const form = useForm({
    name: props.shipping.data.name,
    is_active: props.shipping.data.is_active,
    sort_order: props.shipping.data.sort_order,
    settings: props.shipping.data.settings || {},
});

const submit = () => {
    form.put(route("admin.shippings.update", props.shipping.data.id), {
        preserveScroll: true,
    });
};
</script>

<template>
    <Head :title="`Редагування: ${shipping.data.name}`" />
    <Layout>
        <div class="max-w-4xl p-6 mx-auto">
            <div class="flex items-center justify-between mb-8">
                <div class="flex items-center gap-4">
                    <Link
                        :href="route('admin.shippings.index')"
                        class="p-2 transition bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                        <IconArrowLeft class="w-5 h-5 text-gray-600" />
                    </Link>
                    <div>
                        <h1 class="text-2xl font-bold text-gray-900">
                            {{ shipping.data.name }}
                        </h1>
                        <p class="text-sm text-gray-500 uppercase font-mono">
                            {{ shipping.data.alias }}
                        </p>
                    </div>
                </div>
            </div>

            <form @submit.prevent="submit" class="space-y-6">
                <div
                    class="p-6 bg-white border border-gray-100 shadow-sm rounded-xl"
                >
                    <h2
                        class="mb-4 text-lg font-semibold text-gray-800 border-b pb-2"
                    >
                        Основні налаштування
                    </h2>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="flex flex-col gap-2">
                            <label class="text-sm font-medium text-gray-700"
                                >Назва для клієнта</label
                            >
                            <input
                                v-model="form.name"
                                type="text"
                                class="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                            />
                            <div
                                v-if="form.errors.name"
                                class="text-xs text-red-500"
                            >
                                {{ form.errors.name }}
                            </div>
                        </div>

                        <div class="flex flex-col gap-2">
                            <label class="text-sm font-medium text-gray-700"
                                >Порядок сортування</label
                            >
                            <input
                                v-model="form.sort_order"
                                type="number"
                                class="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                            />
                        </div>

                        <div class="flex items-center gap-3 md:col-span-2">
                            <input
                                v-model="form.is_active"
                                type="checkbox"
                                id="is_active"
                                class="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label
                                for="is_active"
                                class="text-sm font-medium text-gray-700"
                                >Служба активна (відображати при
                                оформленні)</label
                            >
                        </div>
                    </div>
                </div>

                <div
                    class="p-6 bg-white border border-gray-100 shadow-sm rounded-xl"
                >
                    <h2
                        class="mb-4 text-lg font-semibold text-gray-800 border-b pb-2"
                    >
                        Специфічні налаштування
                    </h2>

                    <div class="space-y-6">
                        <div
                            v-if="
                                [
                                    'nova_poshta',
                                    'delivery',
                                    'ukr_poshta',
                                ].includes(shipping.data.alias)
                            "
                            class="flex flex-col gap-2"
                        >
                            <label class="text-sm font-medium text-gray-700"
                                >API Ключ</label
                            >
                            <input
                                v-model="form.settings.api_key"
                                type="password"
                                class="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                            />
                            <p class="text-xs text-gray-400">
                                Введіть ключ, отриманий в особистому кабінеті
                                перевізника.
                            </p>
                            <div
                                v-if="form.errors['settings.api_key']"
                                class="text-xs text-red-500"
                            >
                                {{ form.errors["settings.api_key"] }}
                            </div>
                        </div>

                        <div
                            v-if="shipping.data.alias === 'pickup'"
                            class="space-y-4"
                        >
                            <div class="flex flex-col gap-2">
                                <label class="text-sm font-medium text-gray-700"
                                    >Адреса складу</label
                                >
                                <textarea
                                    v-model="form.settings.address"
                                    rows="3"
                                    class="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                                ></textarea>
                            </div>
                            <div class="flex flex-col gap-2">
                                <label class="text-sm font-medium text-gray-700"
                                    >Графік роботи</label
                                >
                                <input
                                    v-model="form.settings.work_hours"
                                    type="text"
                                    class="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                                />
                            </div>
                        </div>

                        <div
                            v-if="shipping.data.alias === 'delivery'"
                            class="flex flex-col gap-2"
                        >
                            <label class="text-sm font-medium text-gray-700"
                                >Мінімальна вага вантажу (кг)</label
                            >
                            <input
                                v-model="form.settings.min_weight"
                                type="number"
                                class="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                            />
                        </div>
                    </div>
                </div>

                <div class="flex justify-end">
                    <button
                        type="submit"
                        :disabled="form.processing"
                        class="flex items-center gap-2 px-6 py-2 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    >
                        <IconDeviceFloppy class="w-5 h-5" />
                        {{
                            form.processing ? "Збереження..." : "Зберегти зміни"
                        }}
                    </button>
                </div>
            </form>
        </div>
    </Layout>
</template>
