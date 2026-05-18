<script setup>
import { ref, computed, watch } from "vue";
import { useForm } from "@inertiajs/vue3";

// Сучасні іконки замість важких картинок
import {
    IconSearch,
    IconTrash,
    IconDeviceFloppy,
    IconAlertTriangle,
    IconCircleCheck
} from "@tabler/icons-vue";

import Layout from "@/Layouts/Admin/SettingsAdminLayout.vue";

// Твої оригінальні пропси
const props = defineProps({ 
    translations: { type: Array, default: () => [] }, 
    locales: { type: Array, default: () => [] } 
});

// Ініціалізація форми Inertia твоїми даними
const form = useForm({ items: props.translations });

// Фронтенд пошуковий запит
const search = ref("");

// Сховище для активної мови в кожній картці (дефолт — перша мова з масиву)
const activeLocales = ref({});

// Слідкуємо за ініціалізацією даних, щоб виставити першу мову активною за замовчуванням
watch(
    () => form.items,
    (items) => {
        if (items && items.length > 0) {
            const defaultLocale = props.locales[0] || 'uk';
            items.forEach(item => {
                if (!activeLocales.value[item.key]) {
                    activeLocales.value[item.key] = defaultLocale;
                }
            });
        }
    },
    { immediate: true }
);

// Покращений та захищений від помилок типів фронтенд-фільтр
const filteredItems = computed(() => {
    if (!search.value) return form.items;
    
    const query = search.value.toLowerCase().trim();
    
    // Рекурсивна функція для пошуку по будь-яких вкладених структурах (текст, масиви, об'єкти)
    const checkValue = (val) => {
        if (!val) return false;
        if (typeof val === 'string') {
            return val.toLowerCase().includes(query);
        }
        if (typeof val === 'object') {
            return Object.values(val).some(nestedVal => checkValue(nestedVal));
        }
        return String(val).toLowerCase().includes(query);
    };

    return form.items.filter((i) => {
        // 1. Шукаємо в самому системному ключі
        if (i.key && i.key.toLowerCase().includes(query)) return true;
        
        // 2. Шукаємо всередині мовних значень (навіть якщо там об'єкти чи null)
        if (i.values && typeof i.values === 'object') {
            return Object.values(i.values).some(v => checkValue(v));
        }
        
        return false;
    });
});

// Перевірка чи є пусті мови в ключі для підсвічування помилок
const hasEmptyLocale = (item) => {
    return props.locales.some(l => !item.values[l] || String(item.values[l]).trim() === '');
};

// Твоя оригінальна функція автовисоти для textarea
const adjustHeight = (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
};

// Нативний сабміт форми через твій роут
const submit = () => {
    form.post(route("admin.translations.update_all"), { 
        preserveScroll: true 
    });
};
</script>

<template>
    <Layout>
        <div class="flex flex-col space-y-4 p-1">
            
            <!-- Топ-бар: Заголовок, інпут пошуку та кнопка збереження -->
            <section class="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-lg border shadow-sm">
                <div class="flex items-center gap-4 flex-1 max-w-2xl">
                    <h1 class="text-xl font-bold text-gray-800 whitespace-nowrap">Локалізація (JSON)</h1>
                    
                    <!-- Твій інпут пошуку, обгорнутий в гарний стиль -->
                    <div class="relative w-full">
                        <span class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                            <IconSearch size="18" />
                        </span>
                        <input
                            v-model="search"
                            type="text"
                            placeholder="Швидкий пошук за ключем або текстом перекладу..."
                            class="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition"
                        />
                    </div>
                </div>
                
                <div class="flex items-center gap-3">
                    <div class="text-xs text-gray-500 bg-gray-100 px-3 py-2 rounded-lg border font-medium">
                        Усього мов: <span class="font-bold text-indigo-600">{{ locales.length }}</span>
                    </div>
                    
                    <button
                        @click="submit"
                        :disabled="form.processing"
                        class="px-5 py-2 bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:bg-indigo-400 rounded-lg inline-flex items-center gap-2 text-sm font-semibold transition shadow-sm"
                    >
                        <IconDeviceFloppy size="18" v-if="!form.processing" />
                        {{ form.processing ? "Збереження..." : "Зберегти зміни" }}
                    </button>
                </div>
            </section>

            <!-- Основний вертикальний список карток -->
            <div class="flex flex-col space-y-3 max-h-[75vh] overflow-y-auto pr-1">
                <div 
                    v-for="(item, index) in filteredItems" 
                    :key="item.key" 
                    class="bg-white border rounded-lg shadow-sm overflow-hidden flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x border-gray-200 transition-all duration-200"
                    :class="{'border-red-200 bg-red-50/5 ring-1 ring-red-100': hasEmptyLocale(item)}"
                >
                    
                    <!-- 1. Блок Системного Ключа -->
                    <div class="p-4 md:w-1/4 bg-slate-50/60 flex flex-col justify-between gap-3">
                        <div>
                            <span class="text-[10px] uppercase font-bold text-gray-400 block mb-1 tracking-wider">Системний Ключ</span>
                            <div class="font-mono text-xs text-gray-700 font-bold break-all bg-gray-100 p-2.5 rounded border border-gray-200 select-all">
                                {{ item.key }}
                            </div>
                        </div>

                        <!-- Статус заповнення ключа -->
                        <div class="flex items-center justify-between border-t pt-2 border-gray-200/60 text-xs">
                            <span class="inline-flex items-center gap-1.5">
                                <component 
                                    :is="hasEmptyLocale(item) ? IconAlertTriangle : IconCircleCheck" 
                                    size="15" 
                                    :class="hasEmptyLocale(item) ? 'text-red-500' : 'text-green-500'"
                                />
                                <span :class="hasEmptyLocale(item) ? 'text-red-700 font-medium' : 'text-gray-500'">
                                    {{ hasEmptyLocale(item) ? 'Потрібен переклад' : 'Заповнено повністю' }}
                                </span>
                            </span>
                        </div>
                    </div>

                    <!-- 2. Вертикальний вибір мови (Витримає навіть 100+ мов за рахунок прокрутки) -->
                    <div class="p-2 md:w-1/5 max-h-[180px] overflow-y-auto no-scrollbar bg-white">
                        <span class="text-[10px] uppercase font-bold text-gray-400 block px-2 mb-1 tracking-wider">Оберіть мову</span>
                        <div class="flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-x-visible">
                            <button
                                v-for="l in locales"
                                :key="l"
                                type="button"
                                @click.prevent="activeLocales[item.key] = l"
                                class="px-3 py-1.5 rounded-md text-left text-xs font-medium transition inline-flex items-center justify-between gap-2 shrink-0 w-auto md:w-full border md:border-0"
                                :class="[
                                    activeLocales[item.key] === l
                                        ? 'bg-indigo-50 border-indigo-200 text-indigo-700 md:font-bold'
                                        : 'bg-gray-50 md:bg-transparent border-gray-200 text-gray-600 hover:bg-gray-100'
                                ]"
                            >
                                <span class="uppercase tracking-wide font-semibold">{{ l }}</span>

                                <!-- Маркер незаповненого поля для конкретної мови -->
                                <span 
                                    v-if="!item.values[l] || String(item.values[l]).trim() === ''" 
                                    class="h-2 w-2 rounded-full bg-red-400 animate-pulse" 
                                    title="Переклад відсутній"
                                />
                            </button>
                        </div>
                    </div>

                    <!-- 3. Поле редагування активної мови -->
                    <div class="p-4 flex-1 bg-slate-50/20 flex flex-col justify-between">
                        <div class="w-full">
                            <div class="flex items-center justify-between mb-2">
                                <label class="text-xs font-bold text-gray-500 uppercase inline-flex items-center gap-1.5">
                                    Редагування мови: 
                                    <span class="px-2 py-0.5 bg-indigo-600 text-white rounded text-[10px] font-mono font-bold uppercase tracking-wider">
                                        {{ activeLocales[item.key] }}
                                    </span>
                                </label>
                            </div>

                            <!-- Твоє поле з підтримкою реактивності та автовисоти -->
                            <textarea
                                v-model="item.values[activeLocales[item.key]]"
                                rows="2"
                                class="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition shadow-inner font-medium bg-white"
                                :class="{
                                    'border-red-300 bg-red-50/10': !item.values[activeLocales[item.key]],
                                    'border-gray-300': item.values[activeLocales[item.key]]
                                }"
                                :placeholder="`Введіть текст перекладу для [${activeLocales[item.key]}]...`"
                                @input="adjustHeight"
                            ></textarea>
                        </div>
                    </div>

                </div>

                <!-- Пустий стан якщо фільтр нічого не видав -->
                <div v-if="filteredItems.length === 0" class="p-12 text-center bg-white border rounded-lg text-gray-400 shadow-sm">
                    Нічого не знайдено за запитом "{{ search }}".
                </div>
            </div>
        </div>
    </Layout>
</template>

<style scoped>
/* Ховаємо дефолтний скролбар у списку мов, щоб зберегти інтерфейс чистим */
.no-scrollbar::-webkit-scrollbar {
    display: none;
}
.no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>