<template>
    <div class="flex flex-col space-y-4 p-4">
        <h1 class="text-xl text-gray-800 font-semibold">{{ displayTitle }}</h1>

        <div class="flex flex-col md:flex-row gap-6">
            <aside
                class="w-full md:w-64 space-y-6 bg-white p-4 border rounded-lg shadow-sm h-fit"
            >
                <div>
                    <h3 class="font-bold border-b pb-2 mb-4 text-gray-700">
                        Фільтри
                    </h3>

                    <div class="mb-6">
                        <label class="text-sm font-medium text-gray-600"
                            >Ціна</label
                        >
                        <div class="flex items-center gap-2 mt-2">
                            <input
                                v-model="form.min_price"
                                type="number"
                                placeholder="Від"
                                class="w-1/2 border rounded px-2 py-1 text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                            />
                            <input
                                v-model="form.max_price"
                                type="number"
                                placeholder="До"
                                class="w-1/2 border rounded px-2 py-1 text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                            />
                        </div>
                    </div>

                    <div v-if="availableManufacturers.length" class="mb-6">
                        <label
                            class="text-sm font-medium text-gray-600 block mb-2"
                        >
                            Виробник
                        </label>
                        <div
                            class="max-h-48 overflow-y-auto space-y-1 pr-2 custom-scrollbar"
                        >
                            <div
                                v-for="man in availableManufacturers"
                                :key="man.id"
                                class="flex items-center"
                            >
                                <input
                                    type="checkbox"
                                    :id="'man-' + man.id"
                                    :value="man.id"
                                    v-model="form.manufacturers"
                                    class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <label
                                    :for="'man-' + man.id"
                                    class="ml-2 text-sm text-gray-600 cursor-pointer select-none"
                                >
                                    {{ man.title }}
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex flex-col gap-2">
                    <button
                        @click="applyFilters"
                        class="bg-gray-800 text-white py-2 rounded text-sm hover:bg-black transition shadow-sm"
                    >
                        Застосувати
                    </button>
                    <button
                        @click="resetFilters"
                        class="text-gray-500 text-xs underline hover:text-gray-800 transition"
                    >
                        Скинути все
                    </button>
                </div>
            </aside>

            <div class="flex-1">
                <div
                    class="flex flex-wrap items-center justify-between mb-6 bg-white p-3 border rounded-lg shadow-sm gap-4"
                >
                    <div class="flex items-center gap-4">
                        <div class="flex items-center gap-2">
                            <span
                                class="text-xs font-bold text-gray-400 uppercase tracking-wider"
                                >Сортувати:</span
                            >
                            <select
                                v-model="form.sort"
                                @change="applyFilters"
                                class="border-none bg-transparent text-sm text-gray-700 focus:ring-0 cursor-pointer font-medium"
                            >
                                <option value="newest">Новинки</option>
                                <option value="price_asc">Найдешевші</option>
                                <option value="price_desc">Найдорожчі</option>
                            </select>
                        </div>
                    </div>

                    <div
                        class="flex items-center border rounded-md overflow-hidden bg-gray-50"
                    >
                        <button
                            @click="viewMode = 'grid'"
                            :class="[
                                'p-2 transition-colors',
                                viewMode === 'grid'
                                    ? 'bg-white shadow-sm text-blue-600'
                                    : 'text-gray-400 hover:text-gray-600',
                            ]"
                            title="Сітка"
                        >
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
                                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                                />
                            </svg>
                        </button>
                        <button
                            @click="viewMode = 'list'"
                            :class="[
                                'p-2 transition-colors',
                                viewMode === 'list'
                                    ? 'bg-white shadow-sm text-blue-600'
                                    : 'text-gray-400 hover:text-gray-600',
                            ]"
                            title="Список"
                        >
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
                        </button>
                    </div>
                </div>

                <div
                    v-if="items.length"
                    :class="[
                        'grid gap-4 transition-all duration-300',
                        viewMode === 'grid'
                            ? 'grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                            : 'grid-cols-1',
                    ]"
                >
                    <ItemCard
                        v-for="item in items"
                        :key="item.id"
                        :data="item"
                        :view-mode="viewMode"
                    />
                </div>

                <div
                    v-else
                    class="flex flex-col items-center justify-center py-20 text-gray-400 bg-white border rounded-lg border-dashed"
                >
                    <svg
                        class="w-12 h-12 mb-4 opacity-20"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        ></path>
                    </svg>
                    <p>Товарів не знайдено за обраними параметрами</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { router } from "@inertiajs/vue3";
import ItemCard from "@/Components/Public/UI/Commerce/ItemCard.vue";
import Layout from "@/Layouts/Public/Default/IndexLayout.vue";
import { pickBy, identity } from "lodash";

defineOptions({ layout: Layout });

const props = defineProps({
    data: Object,
    filters: Object,
});

// Локальний стан для вигляду (не потребує синхронізації з URL)
const viewMode = ref("grid");

// Стан форми фільтрів та сортування
const form = ref({
    min_price: props.filters?.min_price || null,
    max_price: props.filters?.max_price || null,
    manufacturers: props.filters?.manufacturers || [],
    sort: props.filters?.sort || "newest",
});

// Обчислювальні властивості для зручного доступу
const category = computed(() => props.data?.category?.data || {});
const displayTitle = computed(() => category.value.title || "Каталог");
const items = computed(() => props.data?.items?.data || []);
const availableManufacturers = computed(
    () => props.data?.available_manufacturers || []
);

/**
 * Застосування фільтрів через Inertia router
 */
const applyFilters = () => {
    router.get(window.location.pathname, pickBy(form.value, identity), {
        preserveState: true,
        preserveScroll: true,
        replace: true,
    });
};

/**
 * Скидання всіх параметрів до початкового стану
 */
const resetFilters = () => {
    form.value = {
        min_price: null,
        max_price: null,
        manufacturers: [],
        sort: "newest",
    };
    applyFilters();
};
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
    width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
    background: #f1f1f1;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #888;
}
</style>
