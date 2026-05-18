<script setup>
import { ref, computed, nextTick, onMounted, watch } from "vue";
import { usePage, useForm, router } from "@inertiajs/vue3";
import { 
    IconDeviceFloppy, 
    IconAlertTriangle, 
    IconCopy, 
    IconCheck, 
    IconX,
    IconFolder,
    IconFilter,
    IconEye,
    IconRefresh
} from "@tabler/icons-vue";

// Ваші стандартні адмін-компоненти
import Layout from "@/Layouts/Admin/SettingsAdminLayout.vue";

import InputSearch from "@/Components/UI/InputSearch.vue";
import ButtonsGroup from "@/Components/UI/Buttons/Admin/ButtonsGroup.vue";

const props = defineProps({
    translations: { type: Array, default: () => [] },
});

const page = usePage();
const locales = computed(() => page.props.config.supportedLocales || {});
const localesKeys = computed(() => Object.keys(locales.value));

const globalLocale = ref(localesKeys.value[0] || 'uk');
const form = useForm({ items: props.translations });
const searchText = ref("");
const copiedKey = ref(null);
const isSyncing = ref(false);

// Фільтр стану: 'all' або 'empty'
const filterStatus = ref("all");

// Оновлення форми при отриманні нових пропсів з бекенду (напр. після синхронізації)
watch(() => props.translations, (newTranslations) => {
    form.items = newTranslations;
    nextTick(() => autoResizeAll());
}, { deep: true });

// Обчислення кількості пустих значень для кожної мови (виводиться на табах)
const emptyCounts = computed(() => {
    const counts = {};
    localesKeys.value.forEach(locale => {
        counts[locale] = form.items.filter(item => !item.values[locale] || String(item.values[locale]).trim() === '').length;
    });
    return counts;
});

// Автогрупування за першим сегментом ключа ("auth.login" -> "auth")
const getGroup = (key) => {
    if (!key) return "general";
    const parts = key.split(".");
    return parts.length > 1 ? parts[0] : "general";
};

// Розумна клієнтська фільтрація (пошук + стан заповненості)
const filteredItems = computed(() => {
    let items = form.items;

    if (filterStatus.value === "empty") {
        items = items.filter(item => !item.values[globalLocale.value] || String(item.values[globalLocale.value]).trim() === '');
    }

    if (searchText.value) {
        const query = searchText.value.toLowerCase().trim();
        items = items.filter((i) => {
            if (i.key && i.key.toLowerCase().includes(query)) return true;
            if (i.values && typeof i.values === 'object') {
                return Object.values(i.values).some(v => v && String(v).toLowerCase().includes(query));
            }
            return false;
        });
    }

    return items;
});

// Розподіл відфільтрованих записів за групами модулів
const groupedItems = computed(() => {
    const groups = {};
    filteredItems.value.forEach(item => {
        const g = getGroup(item.key);
        if (!groups[g]) groups[g] = [];
        groups[g].push(item);
    });
    return groups;
});

const getCountryCode = (r) => r && r.includes("_") ? r.split("_")[1].toLowerCase() : "ua";
const isFieldEmpty = (item, lang) => !item.values[lang] || String(item.values[lang]).trim() === '';

// Копіювання ключа в буфер
const copyToClipboard = (text) => {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => handleCopySuccess(text)).catch(() => fallbackCopyToClipboard(text));
    } else {
        fallbackCopyToClipboard(text);
    }
};

const handleCopySuccess = (text) => {
    copiedKey.value = text;
    setTimeout(() => { copiedKey.value = null; }, 1500);
};

const fallbackCopyToClipboard = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.top = "-9999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try { document.execCommand('copy'); handleCopySuccess(text); } catch (e) {}
    document.body.removeChild(textArea);
};

const clearField = (item) => {
    item.values[globalLocale.value] = '';
    nextTick(() => autoResizeAll());
};

const adjustHeight = (e) => {
    const element = e?.target || e;
    if (!element) return;
    element.style.height = 'auto';
    element.style.height = (element.scrollHeight + 2) + 'px';
};

const autoResizeAll = () => {
    nextTick(() => {
        const textareas = document.querySelectorAll('.translation-textarea');
        textareas.forEach(el => adjustHeight(el));
    });
};

watch(globalLocale, () => autoResizeAll());
watch(filteredItems, () => autoResizeAll(), { deep: false });
onMounted(() => autoResizeAll());

// --- Дії на кнопках ---
const handleSync = () => {
    isSyncing.value = true;
    router.post(route("admin.settings.translations.sync"), {}, {
        preserveScroll: true,
        preserveState: false, 
        onFinish: () => {
            isSyncing.value = false;
        }
    });
};

const submit = () => {
    form.post(route("admin.settings.translations.update-all"), {
        preserveScroll: true,
        onSuccess: () => autoResizeAll()
    });
};

// Конфігурація екшенів для ButtonsGroup
const actionButtons = computed(() => [
    { 
        label: "Оновити ключі", 
        action: handleSync, 
        type: "secondary", 
        icon: "IconRefresh",
        disabled: isSyncing.value || form.processing
    },
    { 
        label: "Зберегти зміни", 
        action: submit, 
        type: "primary", 
        icon: "IconDeviceFloppy",
        disabled: isSyncing.value || form.processing
    },
]);

defineOptions({ layout: Layout });
</script>

<template>
    <div class="flex flex-col space-y-4">
        
        <!-- Тулбар (Точна копія вашої структури кнопок користувачів) -->
        <section class="flex flex-wrap items-center justify-between gap-4">
            <div class="flex flex-wrap items-center gap-3">
                
                <!-- Пошук по ключах та перекладах -->
                <InputSearch v-model="searchText" class="w-64" placeholder="Пошук перекладів..." />

                <!-- Світлий таб-фільтр заповненості -->
                <div class="inline-flex rounded-lg border border-slate-200 p-0.5 bg-white select-none">
                    <button type="button" @click="filterStatus = 'all'"
                        class="px-3 py-1.5 rounded-md text-xs font-medium transition-all inline-flex items-center gap-1.5"
                        :class="filterStatus === 'all' ? 'bg-slate-100 text-slate-800 font-semibold' : 'text-slate-500 hover:text-slate-800'">
                        <IconEye size="14" />
                        <span>Всі</span>
                    </button>
                    <button type="button" @click="filterStatus = 'empty'"
                        class="px-3 py-1.5 rounded-md text-xs font-medium transition-all inline-flex items-center gap-1.5"
                        :class="filterStatus === 'empty' ? 'bg-amber-50 text-amber-700 font-semibold border-amber-100' : 'text-slate-500 hover:text-slate-800'">
                        <IconFilter size="14" />
                        <span>Порожні</span>
                    </button>
                </div>

                <!-- Перемикач робочої мови -->
                <div class="flex items-center gap-1 border-l border-slate-200 pl-3 select-none">
                    <button v-for="(locale, code) in locales" :key="code" type="button"
                        @click.prevent="globalLocale = code"
                        class="px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all inline-flex items-center gap-2 border"
                        :class="[
                            globalLocale === code
                                ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        ]">
                        <flag v-if="locale.regional" :iso="getCountryCode(locale.regional)" class="rounded-sm text-[10px]" />
                        <span class="uppercase tracking-wider text-[11px]">{{ code }}</span>

                        <!-- Червона мітка незаповнених полів локалі -->
                        <span v-if="emptyCounts[code] > 0"
                            class="inline-flex items-center justify-center px-1.5 py-0.5 text-[9px] font-black rounded"
                            :class="globalLocale === code ? 'bg-white/20 text-white' : 'bg-red-50 text-red-600'">
                            {{ emptyCounts[code] }}
                        </span>
                    </button>
                </div>
            </div>

            <!-- Група головних дій (Кнопки синхронізації та збереження) -->
            <ButtonsGroup :buttons="actionButtons" />
        </section>

        <!-- Двоколоночна сітка карток перекладів -->
        <section class="space-y-6 overflow-y-auto max-h-[70vh] pr-1 scrollbar-thin">
            
            <div v-for="(groupItems, groupName) in groupedItems" :key="groupName" class="space-y-3">
                
                <!-- Розділювач груп кодів (auth, validation, etc) -->
                <div class="flex items-center gap-2 px-1 pt-2">
                    <div class="p-1 rounded bg-slate-100 text-slate-600 border border-slate-200/60">
                        <IconFolder size="14" />
                    </div>
                    <span class="text-xs font-bold uppercase tracking-widest text-slate-400">{{ groupName }}</span>
                    <div class="h-px bg-gradient-to-r from-slate-200 to-transparent flex-1 ml-2"></div>
                </div>

                <!-- Сітка -->
                <div class="grid grid-cols-1 xl:grid-cols-2 gap-3">
                    <div v-for="item in groupItems" :key="item.key"
                        class="bg-white border rounded-xl p-3 flex flex-col justify-between transition-all duration-150 group/card relative focus-within:ring-2 focus-within:ring-slate-900/10 focus-within:border-slate-400"
                        :class="[isFieldEmpty(item, globalLocale) ? 'border-rose-200 bg-rose-50/20' : 'border-slate-200 shadow-sm']">

                        <!-- Верхня лінія картки -->
                        <div class="flex items-start justify-between gap-4 mb-2">
                            <!-- Копіювання ключа -->
                            <div @click="copyToClipboard(item.key)"
                                class="cursor-pointer max-w-[85%] font-mono text-[11px] text-slate-600 bg-slate-50 border border-slate-200 px-2 py-1 rounded-md hover:bg-slate-100 hover:text-slate-900 transition-all flex items-center gap-1.5 select-none">
                                <span class="truncate">{{ item.key }}</span>
                                <component :is="copiedKey === item.key ? IconCheck : IconCopy" size="11" 
                                    :class="copiedKey === item.key ? 'text-green-600' : 'text-slate-400'" />
                            </div>

                            <!-- Точки індикації стану інших локалей -->
                            <div class="flex items-center gap-1 mt-1">
                                <span v-for="lKey in localesKeys" :key="lKey"
                                    class="w-3 h-1.5 rounded-sm transition-all"
                                    :class="isFieldEmpty(item, lKey) ? 'bg-slate-200' : 'bg-green-500'"
                                    :title="`Мова: ${lKey.toUpperCase()} — ${isFieldEmpty(item, lKey) ? 'Пусто' : 'Заповнено'}`">
                                </span>
                            </div>
                        </div>

                        <!-- Поле вводу тексту перекладу -->
                        <div class="relative w-full mt-1 flex items-center">
                            <textarea v-model="item.values[globalLocale]" rows="1"
                                class="translation-textarea w-full border border-slate-200 rounded-lg pl-3 pr-14 py-2 text-sm font-medium bg-slate-50/30 text-slate-800 placeholder-slate-400 focus:bg-white focus:border-slate-400 focus:ring-0 block resize-none transition-all duration-75"
                                :placeholder="`Текст для [${globalLocale}]...`" @input="adjustHeight"></textarea>

                            <!-- Внутрішні контроли поля -->
                            <div class="absolute right-2.5 flex items-center space-x-1.5 select-none">
                                <button v-if="item.values[globalLocale]" type="button" @click="clearField(item)"
                                    class="p-1 rounded text-slate-400 hover:bg-slate-100 hover:text-slate-600 opacity-0 group-hover/card:opacity-100 focus:opacity-100 transition-opacity"
                                    title="Очистити">
                                    <IconX size="12" />
                                </button>
                                <span class="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-100 text-slate-400 border border-slate-200">
                                    {{ globalLocale }}
                                </span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <!-- Нічого не знайдено -->
            <div v-if="filteredItems.length === 0"
                class="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-400 text-sm flex flex-col items-center justify-center gap-1.5 shadow-sm">
                <IconAlertTriangle class="text-slate-300" size="24" />
                <span class="font-semibold text-slate-700">Перекладів не знайдено</span>
                <p class="text-xs text-slate-400">Змініть параметри пошуку або перевірте іншу мову.</p>
            </div>
        </section>

    </div>
</template>

<style scoped>
.scrollbar-thin::-webkit-scrollbar {
    height: 5px;
    width: 5px;
}
.scrollbar-thin::-webkit-scrollbar-track {
    background: transparent;
}
.scrollbar-thin::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 10px;
}
.scrollbar-thin::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
}
</style>