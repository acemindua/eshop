<script setup>
import useApiResourceService from "@/Composables/useApiResourceService";
import { debounce } from "lodash";
import { ref, watch, onMounted, computed } from "vue";

const props = defineProps({
    form: { type: Object, required: true },
    isEditing: { type: Boolean, default: false },
    errors: { type: Object, default: () => ({}) },
});

const items = ref([]); // Знайдені товари в API
const searchText = ref("");
const showResults = ref(false);
const { loading, fetchData } = useApiResourceService();

// Унікальний ключ для збереження чернетки
const storageKey = computed(() => `order_draft_${props.form.id || "new"}`)

// Завантаження товарів з API
const getItems = async (query = "") => {
    if (!query) {
        items.value = [];
        return;
    }
    const url = route("api.commerce.items", { search: query, in_stock: true });
    const result = await fetchData(url);
    if (result) {
        items.value = result.data;
        showResults.value = true;
    }
};

watch(
    searchText,
    debounce((v) => getItems(v), 500),
);

// --- Логіка LocalStorage (Збереження після F5) ---

onMounted(() => {
    const saved = localStorage.getItem(storageKey.value);
    if (saved && props.form.items?.length === 0) {
        props.form.items = JSON.parse(saved);
    }

    document.addEventListener("click", (e) => {
        if (!e.target.closest(".search-container")) showResults.value = false;
    });
});

watch(
    () => props.form.items,
    (newVal) => {
        localStorage.setItem(storageKey.value, JSON.stringify(newVal));
    },
    { deep: true },
);

// --- Логіка товарів ---

const selectItemFromSearch = (item) => {
    if (!props.form.items) props.form.items = [];

    const exists = props.form.items.find((i) => i.item_id === item.id);

    if (exists) {
        exists.quantity++;
    } else {
        // Додаємо новий рядок з прев'ю зображення
        props.form.items.push({
            item_id: item.id,
            quantity: 1,
            price: item.price,
            title: item.title,
            preview: item.images?.[0]?.preview || null, // Зберігаємо перше фото
        });
    }

    searchText.value = "";
    showResults.value = false;
};

const removeRow = (index) => {
    props.form.items.splice(index, 1);
};

// --- Розрахунки ---

const calculateRowTotal = (row) => {
    return (row.quantity * row.price).toFixed(2);
};

const grandTotal = computed(() => {
    if (!props.form?.items) return "0.00";
    return props.form.items
        .reduce(
            (sum, row) =>
                sum +
                (parseFloat(row.price) || 0) * (parseInt(row.quantity) || 0),
            0,
        )
        .toFixed(2);
});
</script>

<template>
    <div
        class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6"
    >
        <div
            class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-5"
        >
            <div>
                <h3
                    class="text-lg font-bold text-gray-800 text-center sm:text-left"
                >
                    Товари замовлення
                </h3>
                <p class="text-xs text-gray-500">
                    Оберіть товар з пошуку, щоб додати його до списку
                </p>
            </div>

            <div class="relative w-full sm:w-96 search-container">
                <div class="relative">
                    <input
                        v-model="searchText"
                        @focus="showResults = items.length > 0"
                        type="text"
                        placeholder="Введіть назву товару..."
                        class="w-full pl-10 pr-4 py-2.5 text-sm border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-all"
                    />
                    <div class="absolute left-3 top-3">
                        <svg
                            v-if="!loading"
                            class="h-4 w-4 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                        <div
                            v-else
                            class="h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"
                        ></div>
                    </div>
                </div>

                <div
                    v-if="showResults && items?.length"
                    class="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl max-h-72 overflow-y-auto"
                >
                    <div
                        v-for="item in items"
                        :key="item.id"
                        @click="selectItemFromSearch(item)"
                        class="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-50 last:border-0 transition-colors flex justify-between items-center group"
                    >
                        <div class="flex items-center gap-3">
                            <div
                                class="h-10 w-10 rounded-md overflow-hidden bg-gray-100 border border-gray-100 flex-shrink-0"
                            >
                                <img
                                    v-if="item.images?.length"
                                    :src="item.images[0].preview"
                                    class="h-full w-full object-cover"
                                />
                                <div
                                    v-else
                                    class="h-full w-full flex items-center justify-center text-gray-300"
                                >
                                    <svg
                                        class="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div class="flex flex-col">
                                <span
                                    class="text-sm font-bold text-gray-800 group-hover:text-blue-700 transition-colors line-clamp-1"
                                    >{{ item.title }}</span
                                >
                                <span class="text-[10px] text-gray-400"
                                    >На складі:
                                    {{ item.quantity || 0 }} шт.</span
                                >
                            </div>
                        </div>
                        <div class="text-right">
                            <div
                                class="text-sm font-mono font-bold text-blue-600"
                            >
                                {{ item.price }} {{ form.currency }}
                            </div>
                            <div class="text-[10px] text-blue-400 font-medium">
                                Додати
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="overflow-x-auto" v-if="form?.items?.length">
            <table class="w-full border-separate border-spacing-y-2">
                <thead>
                    <tr
                        class="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider"
                    >
                        <th class="pb-2 pl-4">Товар</th>
                        <th class="pb-2 w-28 text-center">Кількість</th>
                        <th class="pb-2 w-32 text-right">Ціна од.</th>
                        <th class="pb-2 w-32 text-right">Сума</th>
                        <th class="pb-2 w-12"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(row, index) in form.items"
                        :key="index"
                        class="bg-gray-50/50 hover:bg-white border border-gray-100 transition-all group shadow-sm rounded-lg"
                    >
                        <td
                            class="py-3 pl-4 rounded-l-lg border-y border-l border-gray-100"
                        >
                            <div class="flex items-center gap-3">
                                <img
                                    v-if="row.preview"
                                    :src="row.preview"
                                    class="h-9 w-9 rounded-md object-cover border border-gray-200"
                                />
                                <div>
                                    <div
                                        class="text-sm font-semibold text-gray-700 line-clamp-1"
                                    >
                                        {{ row.title }}
                                    </div>
                                    <div
                                        v-if="errors[`items.${index}.item_id`]"
                                        class="text-[10px] text-red-500"
                                    >
                                        Помилка в товарі
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td class="py-3 border-y border-gray-100">
                            <input
                                v-model.number="row.quantity"
                                type="number"
                                min="1"
                                class="w-16 mx-auto block text-center border-gray-200 rounded-md text-sm focus:ring-blue-500 p-1"
                            />
                        </td>
                        <td
                            class="py-3 text-right text-sm text-gray-500 border-y border-gray-100 px-2 font-mono"
                        >
                            {{ row.price }}
                        </td>
                        <td
                            class="py-3 text-right text-sm font-bold text-gray-800 border-y border-gray-100 px-2 font-mono"
                        >
                            {{ calculateRowTotal(row) }}
                        </td>
                        <td
                            class="py-3 text-center rounded-r-lg border-y border-r border-gray-100 pr-2"
                        >
                            <button
                                @click="removeRow(index)"
                                type="button"
                                class="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-md transition-all"
                            >
                                <svg
                                    class="h-5 w-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div
            v-if="!form?.items?.length"
            class="text-center py-16 bg-gray-50/50 rounded-2xl border-2 border-dashed border-gray-200"
        >
            <div class="bg-white inline-flex p-4 rounded-full shadow-sm mb-4">
                <svg
                    class="h-8 w-8 text-blue-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
            </div>
            <h4 class="text-gray-900 font-bold mb-1">Товари ще не додані</h4>
            <p class="text-gray-400 text-sm max-w-xs mx-auto">
                Знайдіть товар за назвою, щоб додати його до замовлення
            </p>
        </div>

        <div
            class="flex justify-end items-center pt-6 border-t border-gray-100"
        >
            <div class="text-right">
                <p
                    class="text-xs text-gray-400 uppercase font-bold tracking-widest mb-1"
                >
                    Сума до сплати
                </p>
                <div class="flex items-baseline justify-end gap-2">
                    <span
                        class="text-4xl font-black text-blue-600 font-mono tracking-tighter"
                        >{{ grandTotal }}</span
                    >
                    <span class="text-lg font-bold text-gray-400 uppercase">{{
                        form.currency
                    }}</span>
                </div>
            </div>
        </div>
    </div>
</template>
