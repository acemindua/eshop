<!-- resources/js/Pages/Front/Commerce/Warehouses/Show.vue -->
<script setup>
import { computed, ref } from "vue";
import { Link } from "@inertiajs/vue3";
import Layout from "@/Layouts/Admin/SettingsAdminLayout.vue"; // Твій поточний лейаут
import ImageDataView from "@/Components/UI/ImageDataView.vue";

// Іконки з бібліотеки Tabler Icons
import {
    IconArrowLeft,
    IconMapPin,
    IconPhone,
    IconClock,
    IconExternalLink,
    IconEdit,
    IconCopy,
    IconCheck,
} from "@tabler/icons-vue";

const props = defineProps({
    data: { type: Object },
    auth: { type: Object }, // Передаємо дані авторизації для перевірки прав (опціонально)
});

// Безпечно витягуємо об'єкт складу з пропсів Inertia
const warehouse = computed(
    () =>
        props.data?.warehouse?.data ||
        props.data?.warehouse ||
        props.data ||
        {},
);

// Стейт для мікро-анімації копіювання адреси
const isCopied = ref(false);

const copyAddress = async () => {
    if (!warehouse.value.address) return;
    const fullAddress = `${warehouse.value.city || ""} ${warehouse.value.address}`;
    try {
        await navigator.clipboard.writeText(fullAddress);
        isCopied.value = true;
        setTimeout(() => (isCopied.value = false), 2000);
    } catch (err) {
        console.error("Не вдалося скопіювати: ", err);
    }
};

// Динамічний статус роботи (індикатор "Відкрито")
const isCurrentlyOpen = computed(() => {
    if (!warehouse.value.working_hours) return null;

    const now = new Date();
    const currentHour = now.getHours();

    // Спробуємо витягнути цифри з рядка (наприклад, "09:00 - 18:00")
    const hoursMatch = warehouse.value.working_hours.match(
        /(\d{1,2}):(\d{2})\s*-\s*(\d{1,2}):(\d{2})/,
    );
    if (!hoursMatch) return null;

    const startHour = parseInt(hoursMatch[1], 10);
    const endHour = parseInt(hoursMatch[3], 10);

    return currentHour >= startHour && currentHour < endHour;
});

// Генерація посилання для безкоштовного iframe Google Maps на основі адреси
const embedMapUrl = computed(() => {
    if (!warehouse.value.address) return null;
    const fullAddress = `${warehouse.value.city || ""} ${warehouse.value.address}`;
    return `https://maps.google.com/maps?q=${encodeURIComponent(fullAddress)}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
});

defineOptions({ layout: Layout });
</script>

<template>
    <div class="max-w-5xl mx-auto px-4 py-6 space-y-8">
        <!-- 1. ШАПКА: Велике зображення складу із назвою та плаваючою кнопкою "Редагувати" -->
        <div
            class="relative h-[280px] sm:h-[400px] w-full rounded-2xl overflow-hidden bg-slate-900 shadow-md group"
        >
            <div class="absolute inset-0 w-full h-full">
                <ImageDataView
                    v-if="warehouse.image"
                    :src="warehouse.image"
                    :configs="{ width: '100%', height: '100%' }"
                    class="w-full h-full object-cover opacity-75 group-hover:scale-105 transition duration-700"
                />
                <!-- Плейсхолдер, якщо у складу немає завантаженого фото -->
                <div
                    v-else
                    class="w-full h-full bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-700 opacity-95"
                ></div>
            </div>

            <!-- Акцентні кнопки керування поверх зображення -->
            <div
                class="absolute top-4 right-4 z-10 flex items-center space-x-2"
            >
                <!-- Кнопка швидкого редагування складу для адміна -->
                <Link
                    :href="
                        route('admin.settings.commerce.warehouses.edit', {
                            id: warehouse.id,
                        })
                    "
                    class="inline-flex items-center space-x-1.5 px-4 py-2 bg-white/90 backdrop-blur-md hover:bg-white text-slate-900 text-xs font-bold rounded-xl shadow-sm transition transform active:scale-95"
                >
                    <IconEdit size="14" class="text-slate-600" />
                    <span>Редагувати склад</span>
                </Link>
            </div>

            <!-- Затемнення знизу для легкого читання тексту -->
            <div
                class="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent"
            ></div>

            <!-- Текст поверх фото -->
            <div
                class="absolute bottom-0 inset-x-0 p-6 sm:p-8 space-y-2 text-white"
            >
                <div
                    v-if="warehouse.city"
                    class="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold bg-white/20 backdrop-blur-md text-white uppercase tracking-wider"
                >
                    {{ warehouse.city }}
                </div>
                <h1
                    class="text-2xl sm:text-4xl font-black tracking-tight drop-shadow-sm"
                >
                    {{ warehouse.title }}
                </h1>
            </div>
        </div>

        <!-- 2. ДАНІ: Розбиті по групах (Грид на 3 колонки) -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Група: Локація + Копіювання адреси -->
            <div
                class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between space-y-4"
            >
                <div class="space-y-3">
                    <div
                        class="flex items-center justify-between text-slate-900"
                    >
                        <div class="flex items-center space-x-2">
                            <div
                                class="p-2 bg-slate-50 rounded-xl text-slate-600"
                            >
                                <IconMapPin size="20" />
                            </div>
                            <h3 class="font-bold text-base">
                                Адреса та локація
                            </h3>
                        </div>

                        <!-- Фіча: Швидке копіювання адреси клієнту -->
                        <button
                            v-if="warehouse.address"
                            @click="copyAddress"
                            class="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 transition"
                            title="Копіювати адресу"
                        >
                            <IconCheck
                                v-if="isCopied"
                                size="16"
                                class="text-green-600"
                            />
                            <IconCopy v-else size="16" />
                        </button>
                    </div>
                    <p class="text-sm text-slate-600 leading-relaxed pt-1">
                        {{ warehouse.address || "Адресу не вказано" }}
                    </p>
                </div>

                <div v-if="warehouse.map_link" class="pt-2">
                    <a
                        :href="warehouse.map_link"
                        target="_blank"
                        class="inline-flex items-center space-x-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 transition group/link"
                    >
                        <span>Пряме посилання на Google Maps</span>
                        <IconExternalLink
                            size="14"
                            class="transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition duration-200"
                        />
                    </a>
                </div>
            </div>

            <!-- Група: Контакти -->
            <div
                class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-3"
            >
                <div class="flex items-center space-x-2 text-slate-900">
                    <div class="p-2 bg-slate-50 rounded-xl text-slate-600">
                        <IconPhone size="20" />
                    </div>
                    <h3 class="font-bold text-base">Зв'язок з філіалом</h3>
                </div>

                <div class="space-y-1 pt-1">
                    <div v-if="warehouse.phone">
                        <a
                            :href="`tel:${warehouse.phone.replace(/\s+/g, '')}`"
                            class="text-lg font-extrabold text-slate-900 hover:text-blue-600 transition tracking-tight block"
                        >
                            {{ warehouse.phone }}
                        </a>
                        <span class="text-[11px] text-slate-400 block mt-0.5"
                            >Клікніть для швидкого дзвінка</span
                        >
                    </div>
                    <p v-else class="text-sm font-medium text-slate-500">—</p>
                </div>
            </div>

            <!-- Група: Графік роботи + Живий Статус -->
            <div
                class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-3"
            >
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-2 text-slate-900">
                        <div class="p-2 bg-slate-50 rounded-xl text-slate-600">
                            <IconClock size="20" />
                        </div>
                        <h3 class="font-bold text-base">Графік роботи</h3>
                    </div>

                    <!-- Фіча: Розумний бейдж поточного статусу -->
                    <div v-if="isCurrentlyOpen !== null">
                        <span
                            v-if="isCurrentlyOpen"
                            class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-50 text-green-700 border border-green-200"
                        >
                            Відкрито
                        </span>
                        <span
                            v-else
                            class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200"
                        >
                            Зачинено
                        </span>
                    </div>
                </div>
                <p
                    class="text-sm font-semibold text-slate-700 leading-relaxed whitespace-pre-line pt-1"
                >
                    {{
                        warehouse.working_hours ||
                        "Інформація тимчасово відсутня"
                    }}
                </p>
            </div>
        </div>

        <!-- 3. КАРТА GOOGLE: Інтерактивний блок знизу на всю ширину сторінки -->
        <div
            v-if="embedMapUrl"
            class="bg-white rounded-2xl border border-slate-100 shadow-sm p-2"
        >
            <div
                class="w-full h-[380px] rounded-xl overflow-hidden bg-slate-50"
            >
                <iframe
                    width="100%"
                    height="100%"
                    frameborder="0"
                    style="border: 0"
                    :src="embedMapUrl"
                    allowfullscreen
                    loading="lazy"
                ></iframe>
            </div>
        </div>
    </div>
</template>
