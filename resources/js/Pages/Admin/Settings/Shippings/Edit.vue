<script setup>
import Layout from "@/Layouts/Admin/SettingsAdminLayout.vue";
import VarDump from "@/Shared/VarDump.vue";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { 
    IconArrowLeft, 
    IconDeviceFloppy, 
    IconEye, 
    IconEyeOff,
    IconTruck
} from "@tabler/icons-vue";
import { ref, computed } from "vue";

// defineProps імпортувати не потрібно, це макрос
const props = defineProps({
    shipping: Object, // Дані з ShippingResource { data: {...} }
});

const showApiKey = ref(false);

// Спрощений доступ до даних через computed
const shippingData = computed(() => props.shipping.data);

// Ініціалізація форми
const form = useForm({
    title: shippingData.value.title ?? '',
    is_active: Boolean(shippingData.value.is_active),
    sort_order: shippingData.value.sort_order ?? 0,
    settings: {
        api_key: shippingData.value.settings?.api_key ?? '',
        address: shippingData.value.settings?.address ?? '',
        work_hours: shippingData.value.settings?.work_hours ?? '',
        min_weight: shippingData.value.settings?.min_weight ?? 0,
    },
});

const submit = () => {
    form.put(route("admin.settings.shippings.update", shippingData.value.id), {
        preserveScroll: true,
    });
};
</script>

<template>
    <Head :title="`Редагування: ${shippingData.name}`" />
    <Layout>
        <div class="max-w-4xl p-6 mx-auto">
            <!-- Header -->
            <div class="flex items-center justify-between mb-8">
                <div class="flex items-center gap-4">
                    <Link
                        :href="route('admin.settings.shippings.index')"
                        class="p-2 transition bg-white border border-gray-200 rounded-lg hover:bg-gray-50 shadow-sm text-gray-600"
                    >
                        <IconArrowLeft class="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 class="text-2xl font-bold text-gray-900 leading-tight">
                            {{ shippingData.title }}
                        </h1>
                        <div class="flex items-center gap-2 mt-1 font-mono text-xs text-gray-500 uppercase tracking-wider">
                            <IconTruck size="14" />
                            {{ shippingData.alias }}
                        </div>
                    </div>
                </div>
            </div>

            <form @submit.prevent="submit" class="space-y-6">
                <!-- Основні налаштування -->
                <div class="p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
                    <h2 class="mb-5 text-lg font-semibold text-gray-800 border-b pb-3 flex items-center gap-2">
                        <span class="w-1.5 h-5 bg-blue-500 rounded-full"></span>
                        Основні налаштування
                    </h2>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="flex flex-col gap-2">
                            <label class="text-sm font-medium text-gray-700">Назва для клієнта</label>
                            <input
                                v-model="form.title"
                                type="text"
                                class="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                                :class="{ 'border-red-500': form.errors.title }"
                            />
                            <p v-if="form.errors.name" class="text-xs text-red-500">{{ form.errors.title }}</p>
                        </div>

                        <div class="flex flex-col gap-2">
                            <label class="text-sm font-medium text-gray-700">Порядок сортування</label>
                            <input
                                v-model="form.sort_order"
                                type="number"
                                class="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                            />
                        </div>

                        <!-- Активність (Modern Toggle) -->
                        <div class="flex items-center gap-3 md:col-span-2 mt-2">
                            <label class="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" v-model="form.is_active" class="sr-only peer">
                                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                <span class="ml-3 text-sm font-medium text-gray-700">Служба активна</span>
                            </label>
                        </div>
                    </div>
                </div>

                <!-- Специфічні налаштування -->
                <div class="p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
                    <h2 class="mb-5 text-lg font-semibold text-gray-800 border-b pb-3 flex items-center gap-2">
                        <span class="w-1.5 h-5 bg-indigo-500 rounded-full"></span>
                        Специфічні налаштування
                    </h2>

                    <div class="space-y-6">
                        <!-- Поля для API служб (Нова Пошта, Укрпошта тощо) -->
                        <div v-if="['nova_poshta', 'delivery', 'ukr_poshta'].includes(shippingData.alias)" class="flex flex-col gap-2">
                            <label class="text-sm font-medium text-gray-700">API Ключ</label>
                            <div class="relative">
                                <input
                                    v-model="form.settings.api_key"
                                    :type="showApiKey ? 'text' : 'password'"
                                    class="w-full px-4 py-2 pr-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                                />
                                <button 
                                    type="button"
                                    @click="showApiKey = !showApiKey"
                                    class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    <IconEye v-if="!showApiKey" size="18" />
                                    <IconEyeOff v-else size="18" />
                                </button>
                            </div>
                            <p v-if="form.errors['settings.api_key']" class="text-xs text-red-500">{{ form.errors['settings.api_key'] }}</p>
                        </div>

                        <!-- Поля для Самовивозу -->
                        <div v-if="shippingData.alias === 'pickup'" class="grid gap-6">
                            <div class="flex flex-col gap-2">
                                <label class="text-sm font-medium text-gray-700">Адреса складу</label>
                                <textarea v-model="form.settings.address" rows="3" class="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"></textarea>
                            </div>
                            <div class="flex flex-col gap-2">
                                <label class="text-sm font-medium text-gray-700">Графік роботи</label>
                                <input v-model="form.settings.work_hours" type="text" class="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" />
                            </div>
                        </div>

                        <!-- Поля для Delivery (вага) -->
                        <div v-if="shippingData.alias === 'delivery'" class="flex flex-col gap-2">
                            <label class="text-sm font-medium text-gray-700">Мінімальна вага вантажу (кг)</label>
                            <input v-model="form.settings.min_weight" type="number" step="0.1" class="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" />
                        </div>
                    </div>
                </div>

                <!-- Footer / Actions -->
                <div class="flex justify-end pt-4">
                    <button
                        type="submit"
                        :disabled="form.processing"
                        class="flex items-center gap-2 px-8 py-3 text-white font-medium transition bg-blue-600 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-100 disabled:opacity-50"
                    >
                        <IconDeviceFloppy v-if="!form.processing" class="w-5 h-5" />
                        <span v-else class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        {{ form.processing ? "Збереження..." : "Зберегти налаштування" }}
                    </button>
                </div>
            </form>

        </div>

         <section v-if="$page.props.app.mode === 'local'">
            <VarDump :data="shipping" />
        </section>
    </Layout>
</template>