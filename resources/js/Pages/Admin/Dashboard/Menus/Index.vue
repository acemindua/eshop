<template>
    <Head title="Конструктор меню" />

    <div
        class="p-6 max-w-[1600px] mx-auto antialiased font-sans text-slate-900 bg-slate-50/30 min-h-screen"
    >
        <!-- HEADER -->
        <div
            class="flex items-center justify-between mb-6 bg-white p-4 rounded-lg border border-slate-200 shadow-sm"
        >
            <div class="flex items-center gap-4">
                <div class="p-2.5 bg-slate-900 rounded shadow-lg text-white">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </div>
                <div>
                    <h1
                        class="text-xl font-extrabold tracking-tight text-slate-800"
                    >
                        Навігація
                    </h1>
                    <p
                        class="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-bold leading-none mt-1"
                    >
                        Керування структурою сайту
                    </p>
                </div>
            </div>

            <div class="flex items-center gap-3">
                <div
                    v-if="structureForm.recentlySuccessful"
                    class="text-xs text-emerald-600 font-bold animate-fade-out"
                >
                    ✓ ЗМІНИ ЗБЕРЕЖЕНО
                </div>
                <button
                    @click="saveStructure"
                    :disabled="structureForm.processing"
                    class="bg-slate-900 hover:bg-black text-white px-8 py-2.5 rounded text-xs font-bold transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50"
                >
                    <span
                        v-if="structureForm.processing"
                        class="animate-spin text-sm"
                        >◌</span
                    >
                    ЗБЕРЕГТИ ВСЕ
                </button>
            </div>
        </div>

        <div class="flex gap-6">
            <!-- LEFT COLUMN -->
            <div class="w-80 shrink-0 space-y-4">
                <!-- 1. МЕНЕДЖЕР ГРУП МЕНЮ -->
                <div
                    class="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm"
                >
                    <div
                        class="p-3 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center"
                    >
                        <h3
                            class="text-[10px] font-black text-slate-500 uppercase tracking-widest"
                        >
                            Групи меню
                        </h3>
                        <button
                            @click="showCreateMenuModal = true"
                            class="text-[10px] bg-white border border-slate-300 text-slate-700 px-2 py-1 rounded hover:bg-slate-50 font-bold shadow-sm transition-all"
                        >
                            + СТВОРИТИ
                        </button>
                    </div>

                    <div
                        class="p-2 space-y-1 max-h-[300px] overflow-y-auto custom-scrollbar"
                    >
                        <div
                            v-for="(menu, idx) in data.menus"
                            :key="menu.id || idx"
                            @click="selectedMenuIndex = idx"
                            :class="[
                                'group flex items-center justify-between px-3 py-2.5 rounded cursor-pointer transition-all border',
                                selectedMenuIndex === idx
                                    ? 'bg-slate-900 border-slate-900 text-white shadow-md'
                                    : 'border-transparent text-slate-600 hover:bg-slate-100 hover:border-slate-200',
                            ]"
                        >
                            <div class="flex flex-col">
                                <span class="text-xs font-bold truncate">{{
                                    menu.name
                                }}</span>
                                <span
                                    class="text-[9px] font-mono opacity-50 uppercase"
                                    >{{ menu.slug }}</span
                                >
                            </div>
                            <div
                                v-if="selectedMenuIndex === idx"
                                class="w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.6)]"
                            ></div>
                        </div>
                    </div>
                </div>

                <!-- 2. КАСТОМНІ ПОСИЛАННЯ -->
                <div
                    class="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden"
                >
                    <button
                        @click="toggleAccordion('custom')"
                        class="w-full flex justify-between items-center p-3 hover:bg-slate-50 transition-colors"
                        :class="{
                            'bg-slate-50/50 border-b border-slate-100':
                                activeAccordion === 'custom',
                        }"
                    >
                        <span
                            class="text-[10px] font-black uppercase tracking-widest text-slate-600"
                            >Своє посилання</span
                        >
                        <span class="text-slate-400 font-mono text-xs">{{
                            activeAccordion === "custom" ? "−" : "+"
                        }}</span>
                    </button>

                    <div
                        v-show="activeAccordion === 'custom'"
                        class="p-4 space-y-4"
                    >
                        <div class="grid grid-cols-2 gap-2">
                            <button
                                @click="setHomePreset"
                                class="bg-slate-100 text-slate-600 py-1.5 rounded text-[9px] font-black hover:bg-slate-200 transition-colors uppercase tracking-tighter"
                            >
                                Головна
                            </button>
                            <button
                                @click="customLink.url = '#'"
                                class="bg-slate-100 text-slate-600 py-1.5 rounded text-[9px] font-black hover:bg-slate-200 transition-colors uppercase tracking-tighter"
                            >
                                Заглушка #
                            </button>
                        </div>
                        <div class="space-y-3">
                            <div
                                v-for="(langName, langCode) in locales"
                                :key="langCode"
                            >
                                <label
                                    class="text-[9px] font-bold text-slate-400 uppercase mb-1 block ml-1"
                                    >Назва ({{ langCode }})</label
                                >
                                <input
                                    v-model="customLink.label[langCode]"
                                    type="text"
                                    class="w-full text-xs border-slate-200 rounded p-2 focus:ring-1 focus:ring-slate-400 bg-slate-50/50 font-semibold"
                                />
                            </div>
                            <div>
                                <label
                                    class="text-[9px] font-bold text-slate-400 uppercase mb-1 block ml-1"
                                    >URL / Шлях</label
                                >
                                <input
                                    v-model="customLink.url"
                                    type="text"
                                    class="w-full text-xs border-slate-200 rounded p-2 focus:ring-1 focus:ring-slate-400 bg-slate-50/50 font-mono"
                                />
                            </div>
                        </div>
                        <button
                            @click="addCustomLink"
                            class="w-full bg-slate-800 text-white text-[10px] py-3 rounded hover:bg-black transition-all font-bold uppercase tracking-widest"
                        >
                            Додати в список
                        </button>
                    </div>
                </div>

                <!-- 3. СТОРІНКИ -->
                <div
                    class="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden"
                >
                    <button
                        @click="toggleAccordion('pages')"
                        class="w-full flex justify-between items-center p-3 hover:bg-slate-50 transition-colors"
                    >
                        <span
                            class="text-[10px] font-black uppercase tracking-widest text-slate-600"
                            >Сторінки</span
                        >
                        <span class="text-slate-400 text-xs">{{
                            activeAccordion === "pages" ? "−" : "+"
                        }}</span>
                    </button>
                    <div
                        v-show="activeAccordion === 'pages'"
                        class="max-h-64 overflow-y-auto custom-scrollbar border-t border-slate-100"
                    >
                        <div
                            v-for="page in data.availablePages"
                            :key="page.id"
                            class="flex justify-between items-center p-2.5 px-4 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors"
                        >
                            <span
                                class="text-xs font-semibold text-slate-600 truncate mr-2"
                                >{{ page.title }}</span
                            >
                            <button
                                @click="addItemToMenu(page, 'model')"
                                class="text-xs font-bold text-slate-300 hover:text-slate-900 transition-colors"
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- RIGHT COLUMN -->
            <div class="flex-1 min-w-0">
                <div
                    class="bg-white rounded-lg shadow-sm border border-slate-200 p-6 min-h-[calc(100vh-180px)] flex flex-col relative overflow-hidden"
                >
                    <div v-if="activeMenu" class="flex-1 flex flex-col">
                        <div
                            class="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4"
                        >
                            <div
                                class="h-2 w-2 rounded-full bg-slate-900"
                            ></div>
                            <h2
                                class="text-sm font-black uppercase tracking-widest text-slate-800"
                            >
                                Редагування: {{ activeMenu.name }}
                            </h2>
                            <span
                                class="ml-auto text-[10px] font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded"
                                >ID: {{ activeMenu.slug }}</span
                            >
                        </div>

                        <div
                            class="bg-slate-50/30 rounded-lg p-4 border border-slate-100 flex-1 overflow-y-auto custom-scrollbar"
                        >
                            <draggable
                                v-model="activeMenu.items"
                                item-key="id"
                                group="menuItems"
                                :animation="200"
                                ghost-class="ghost-item"
                                class="space-y-2 pb-20"
                            >
                                <template #item="{ element, index }">
                                    <MenuItem
                                        :item="element"
                                        :index="index"
                                        :list="activeMenu.items"
                                    />
                                </template>
                            </draggable>

                            <div
                                v-if="activeMenu.items.length === 0"
                                class="flex flex-col items-center justify-center py-32 text-slate-300"
                            >
                                <p
                                    class="text-xs font-bold uppercase tracking-widest"
                                >
                                    Меню порожнє
                                </p>
                            </div>
                        </div>
                    </div>
                    <div
                        v-else
                        class="flex-1 flex items-center justify-center bg-slate-50/50 rounded-lg border-2 border-dashed border-slate-200 text-slate-400 text-xs font-bold uppercase tracking-widest"
                    >
                        Оберіть меню для роботи
                    </div>
                </div>
            </div>
        </div>

        <!-- MODAL -->
        <div
            v-if="showCreateMenuModal"
            class="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
            <div
                class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                @click="showCreateMenuModal = false"
            ></div>
            <div
                class="bg-white p-8 rounded-lg w-full max-w-sm shadow-2xl relative border border-slate-200"
            >
                <h2
                    class="text-lg font-black text-slate-900 mb-6 uppercase tracking-tight"
                >
                    Нова група
                </h2>
                <form @submit.prevent="createNewMenu" class="space-y-5">
                    <div>
                        <label
                            class="block text-[10px] font-black text-slate-400 uppercase mb-1.5 tracking-wider"
                            >Назва</label
                        >
                        <input
                            v-model="newMenuForm.name"
                            type="text"
                            class="w-full border-slate-200 rounded p-3 text-xs font-bold bg-slate-50 focus:ring-2 focus:ring-slate-900 outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label
                            class="block text-[10px] font-black text-slate-400 uppercase mb-1.5 tracking-wider"
                            >Системний ID</label
                        >
                        <input
                            v-model="newMenuForm.slug"
                            type="text"
                            class="w-full border-slate-200 rounded p-3 text-xs font-mono bg-slate-50 focus:ring-2 focus:ring-slate-900 outline-none"
                            required
                        />
                    </div>
                    <div class="flex gap-2 pt-2">
                        <button
                            type="button"
                            @click="showCreateMenuModal = false"
                            class="flex-1 px-4 py-3 rounded text-xs font-bold text-slate-500 hover:bg-slate-50 uppercase"
                        >
                            Скасувати
                        </button>
                        <button
                            type="submit"
                            class="flex-1 bg-slate-900 text-white py-3 rounded text-xs font-bold hover:bg-black uppercase tracking-widest"
                        >
                            Створити
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { Head, useForm, usePage } from "@inertiajs/vue3";
import draggable from "vuedraggable";
import MenuItem from "./Partials/MenuItem.vue";

const props = defineProps({
    data: Object,
});

// Глобальні дані Inertia
const page = usePage();
const locales = computed(
    () => page.props.config?.supportedLocales || { uk: "Українська" },
);

const selectedMenuIndex = ref(0);
const activeAccordion = ref("custom");
const showCreateMenuModal = ref(false);

const activeMenu = computed(
    () => props.data.menus[selectedMenuIndex.value] || null,
);

// Реактивний об'єкт для кастомного посилання
const customLink = ref({
    label: {},
    url: "",
});

// Функція безпечної ініціалізації об'єкта перекладів
const initLabels = () => {
    const labels = {};
    const keys = Object.keys(locales.value);
    if (keys.length > 0) {
        keys.forEach((lang) => {
            labels[lang] = "";
        });
    } else {
        labels["uk"] = ""; // Фолбек
    }
    customLink.value.label = labels;
};

// Викликаємо ініціалізацію при завантаженні та зміні locales
watch(locales, () => initLabels(), { immediate: true });

const newMenuForm = useForm({
    name: "",
    slug: "",
});

const structureForm = useForm({
    menus: props.data.menus,
});

const toggleAccordion = (id) =>
    (activeAccordion.value = activeAccordion.value === id ? null : id);

const setHomePreset = () => {
    Object.keys(locales.value).forEach((lang) => {
        customLink.value.label[lang] = "Головна";
    });
    customLink.value.url = "/";
};

const addCustomLink = () => {
    if (!activeMenu.value) return;
    activeMenu.value.items.push({
        id: Date.now(),
        label: { ...customLink.value.label },
        url: customLink.value.url,
        children: [],
    });
    // Очищення
    customLink.value.url = "";
    initLabels();
};

const addItemToMenu = (item, type) => {
    if (!activeMenu.value) return;
    activeMenu.value.items.push({
        id: Date.now(),
        model_id: item.id,
        model_type: type === "model" ? "Page" : null,
        original_item: item,
        children: [],
    });
};

const createNewMenu = () => {
    const newMenu = {
        id: Date.now(),
        name: newMenuForm.name,
        slug: newMenuForm.slug,
        items: [],
    };
    props.data.menus.push(newMenu);
    selectedMenuIndex.value = props.data.menus.length - 1;
    showCreateMenuModal.value = false;
    newMenuForm.reset();
};

const saveStructure = () => {
    if (!activeMenu.value) return;

    // Передаємо масив меню в форму
    structureForm.menus = props.data.menus;

    // Використовуємо правильну назву маршруту з твого web.php: 'admin.menus.structure'
    // Та передаємо ID поточного меню
    structureForm.post(
        route("admin.menus.structure", { menu: activeMenu.value.id }),
        {
            preserveScroll: true,
            onSuccess: () => {
                // Можна додати сповіщення тут
            },
        },
    );
};
</script>

<style>
.ghost-item {
    opacity: 0.4;
    background: #cbd5e1 !important;
    border: 2px dashed #64748b !important;
}
.custom-scrollbar::-webkit-scrollbar {
    width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
    background: #e2e8f0;
    border-radius: 10px;
}
@keyframes fade-out {
    0% {
        opacity: 1;
    }
    70% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}
.animate-fade-out {
    animation: fade-out 3s forwards;
}
</style>
