<script setup>
import { ref, watch, computed, onMounted, onBeforeUnmount } from "vue";
import axios from "axios";
import debounce from "lodash.debounce";
import BaseSelect from "@/Components/UI/BaseSelect.vue";
import { IconMapPin, IconTruckDelivery } from "@tabler/icons-vue";

const props = defineProps({
    cityRef: String,
    cityName: String,
    warehouseRef: String,
    warehouseName: String,
    errors: Object,
});

const emit = defineEmits([
    "update:cityRef",
    "update:cityName",
    "update:warehouseRef",
    "update:warehouseName",
]);

// Состояние для городов
const selectedCity = ref(null);
const queryCity = ref("");
const cities = ref([]);
const isCityLoading = ref(false);

// Состояние для отделений
const selectedWarehouse = ref(null);
const queryWarehouse = ref("");
const warehouses = ref([]);
const isWarehouseLoading = ref(false);

// Очистка поискового запроса от префиксов "м.", "город" и т.д.
const cleanSearch = (val) =>
    val.replace(/^(місто|м\.|село|с\.|смт)\s+/gi, "").trim();

// Запрос городов через ваш API route
const fetchCities = async (query) => {
    isCityLoading.value = true;
    try {
        const { data } = await axios.get(route("api.np.cities"), {
            params: { q: cleanSearch(query) },
        });
        cities.value = data;
    } catch (e) {
        console.error("NP Cities Error:", e);
    } finally {
        isCityLoading.value = false;
    }
};

// Запрос отделений для выбранного города
const fetchWarehouses = async (cityRef) => {
    if (!cityRef) return;
    isWarehouseLoading.value = true;
    try {
        const { data } = await axios.get(route("api.np.warehouses"), {
            params: { city_ref: cityRef },
        });
        warehouses.value = data;
    } catch (e) {
        console.error("NP Warehouses Error:", e);
    } finally {
        isWarehouseLoading.value = false;
    }
};

const debouncedFetchCities = debounce((val) => {
    if (!val || val.length < 3) {
        cities.value = [];
        return;
    }
    fetchCities(val);
}, 400);

// Следим за вводом города
watch(queryCity, (val) => debouncedFetchCities(val));

// Следим за выбором города из списка
watch(selectedCity, async (newCity) => {
    emit("update:cityRef", newCity?.ref || "");
    emit("update:cityName", newCity?.present || "");

    // Сброс отделения при смене города
    selectedWarehouse.value = null;
    emit("update:warehouseRef", "");
    emit("update:warehouseName", "");

    if (newCity?.ref) await fetchWarehouses(newCity.ref);
});

// Следим за выбором отделения
watch(selectedWarehouse, (w) => {
    emit("update:warehouseRef", w?.ref || "");
    emit("update:warehouseName", w?.name || "");
});

// Фильтрация отделений по локальному поиску (номера/названия)
const filteredWarehouses = computed(() => {
    if (!queryWarehouse.value) return warehouses.value;
    const q = queryWarehouse.value.toLowerCase();
    return warehouses.value.filter((w) => w.name?.toLowerCase().includes(q));
});

// Инициализация при монтировании (если данные уже есть в форме)
onMounted(async () => {
    if (props.cityRef) {
        selectedCity.value = { ref: props.cityRef, present: props.cityName };
        queryCity.value = props.cityName || "";
        await fetchWarehouses(props.cityRef);

        if (props.warehouseRef) {
            selectedWarehouse.value = warehouses.value.find(
                (w) => w.ref === props.warehouseRef,
            ) || { ref: props.warehouseRef, name: props.warehouseName };
        }
    }
});

onBeforeUnmount(() => debouncedFetchCities.cancel());
</script>

<template>
    <div
        class="space-y-6 p-6 bg-white border border-gray-100 rounded-[2rem] shadow-sm animate-in fade-in slide-in-from-top-4 duration-500"
    >
        <div class="flex items-center gap-3 mb-2">
            <div class="p-2 bg-red-50 rounded-lg">
                <IconTruckDelivery size="20" class="text-red-500" />
            </div>
            <div>
                <h4
                    class="text-[10px] font-black uppercase tracking-widest text-black"
                >
                    Нова Пошта
                </h4>
                <p class="text-[9px] text-gray-400 uppercase tracking-tighter">
                    Доставка у відділення або поштомат
                </p>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Выбор Города -->
            <div class="relative">
                <BaseSelect
                    label="Ваше місто"
                    placeholder="Почніть вводити назву..."
                    display-key="present"
                    v-model="selectedCity"
                    :options="cities"
                    :loading="isCityLoading"
                    :error="errors?.city_ref"
                    @query-change="(v) => (queryCity = v)"
                    class="np-select"
                />
            </div>

            <!-- Выбор Отделения -->
            <div class="relative">
                <transition name="fade">
                    <BaseSelect
                        v-if="selectedCity"
                        label="Відділення"
                        placeholder="Оберіть номер або адресу..."
                        v-model="selectedWarehouse"
                        :options="filteredWarehouses"
                        :loading="isWarehouseLoading"
                        :error="errors?.warehouse_ref"
                        :is-static="true"
                        show-check
                        @query-change="(v) => (queryWarehouse = v)"
                        class="np-select"
                    />
                    <div v-else class="h-full flex items-end pb-3">
                        <span
                            class="text-[9px] text-gray-300 uppercase italic tracking-widest"
                        >
                            Спочатку оберіть місто
                        </span>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

:deep(.np-select) {
    --select-border: transparent;
}

:deep(.np-select label) {
    @apply text-[9px] uppercase tracking-[0.2em] text-gray-400 mb-1 block ml-1;
}

:deep(.np-select input) {
    @apply border-0 border-b border-gray-100 bg-transparent px-1 py-3 focus:ring-0 text-sm transition-all focus:border-black w-full;
}
</style>
