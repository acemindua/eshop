<script setup>
import Layout from "@/Layouts/Admin/SettingsAdminLayout.vue";
import { Head, Link, router } from "@inertiajs/vue3";
import {
    IconSettings,
    IconTruck,
    IconCircleCheck,
    IconCircleX,
} from "@tabler/icons-vue";

const props = defineProps({
    shippings: Object, // Це результат нашого ShippingResource::collection
});

const toggleStatus = (id) => {
    router.patch(
        route("admin.settings.shippings.toggle", id),
        {},
        {
            preserveScroll: true,
        },
    );
};
</script>

<template>
    <Head title="Методи доставки" />
    <Layout>
        <div class="p-6">
            <div class="flex justify-between items-center mb-6">
                <h1
                    class="text-2xl font-bold text-gray-900 flex items-center gap-2"
                >
                    <IconTruck class="w-7 h-7 text-gray-600" />
                    Методи доставки
                </h1>
            </div>

            <div
                class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            >
                <table class="w-full text-left border-collapse">
                    <thead
                        class="bg-gray-50 border-b border-gray-100 text-gray-600 uppercase text-xs font-semibold"
                    >
                        <tr>
                            <th class="px-6 py-4">Назва</th>
                            <th class="px-6 py-4 text-center">Статус</th>
                            <th class="px-6 py-4 text-center">Порядок</th>
                            <th class="px-6 py-4 text-right">Дії</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                        <tr
                            v-for="shipping in shippings.data"
                            :key="shipping.id"
                            class="hover:bg-gray-50/50 transition"
                        >
                            <td class="px-6 py-4">
                                <div class="font-medium text-gray-900">
                                    {{ shipping.name }}
                                </div>
                                <div class="text-xs text-gray-400 font-mono">
                                    {{ shipping.alias }}
                                </div>
                            </td>
                            <td class="px-6 py-4 text-center">
                                <button
                                    @click="toggleStatus(shipping.id)"
                                    class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition"
                                    :class="
                                        shipping.is_active
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-gray-100 text-gray-500'
                                    "
                                >
                                    <component
                                        :is="
                                            shipping.is_active
                                                ? IconCircleCheck
                                                : IconCircleX
                                        "
                                        class="w-4 h-4"
                                    />
                                    {{
                                        shipping.is_active
                                            ? "Активно"
                                            : "Вимкнено"
                                    }}
                                </button>
                            </td>
                            <td
                                class="px-6 py-4 text-center text-sm text-gray-600"
                            >
                                {{ shipping.sort_order }}
                            </td>
                            <td class="px-6 py-4 text-right">
                                <Link
                                    :href="
                                        route(
                                            'admin.settings.shippings.edit',
                                            shipping.id,
                                        )
                                    "
                                    class="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium transition"
                                >
                                    <IconSettings class="w-4 h-4" />
                                    Налаштувати
                                </Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </Layout>
</template>
