<script setup>
import { ref, watch, computed, onMounted, onBeforeUnmount } from "vue";
import axios from "axios";
import debounce from "lodash.debounce";
import BaseSelect from "@/Components/UI/BaseSelect.vue";

// PROPS
const props = defineProps({
    city_ref: String,
    city_name: String,
    warehouse_ref: String,
    warehouse_name: String,
    errors: Object,
});

// EMITS
const emit = defineEmits([
    "update:city_ref",
    "update:city_name",
    "update:warehouse_ref",
    "update:warehouse_name",
]);

// STATE
const selectedCity = ref(null);
const queryCity = ref("");
const cities = ref([]);
const isCityLoading = ref(false);

const selectedWarehouse = ref(null);
const queryWarehouse = ref("");
const warehouses = ref([]);
const isWarehouseLoading = ref(false);

// HELPERS
const cleanSearch = (val) =>
    val.replace(/^(місто|м\.|село|с\.|смт)\s+/gi, "").trim();

// API: Cities
const fetchCities = async (query) => {
    isCityLoading.value = true;
    try {
        const { data } = await axios.get(route("api.np.cities"), {
            params: { q: cleanSearch(query) },
        });
        cities.value = data;
    } catch (e) {
        console.error("City loading error:", e);
    } finally {
        isCityLoading.value = false;
    }
};

// API: Warehouses
const fetchWarehouses = async (cityRef) => {
    if (!cityRef) {
        warehouses.value = [];
        return;
    }

    isWarehouseLoading.value = true;
    try {
        const { data } = await axios.get(route("api.np.warehouses"), {
            params: { city_ref: cityRef },
        });
        warehouses.value = data;
    } catch (e) {
        console.error("Warehouse loading error:", e);
    } finally {
        isWarehouseLoading.value = false;
    }
};

// ✅ DEBOUNCE (lodash)
const debouncedFetchCities = debounce((val) => {
    if (!val || val.length < 3) {
        cities.value = [];
        return;
    }
    fetchCities(val);
}, 400);

// WATCH: City query
watch(queryCity, (val) => {
    debouncedFetchCities(val);
});

// WATCH: Selected city
watch(selectedCity, async (city) => {
    emit("update:city_ref", city?.ref || "");
    emit("update:city_name", city?.present || "");

    selectedWarehouse.value = null;
    queryWarehouse.value = "";
    warehouses.value = [];

    if (city?.ref) {
        await fetchWarehouses(city.ref);
    }
});

// WATCH: Selected warehouse
watch(selectedWarehouse, (w) => {
    emit("update:warehouse_ref", w?.ref || "");
    emit("update:warehouse_name", w?.name || "");
});

// COMPUTED
const filteredWarehouses = computed(() => {
    if (!queryWarehouse.value) return warehouses.value;

    const q = queryWarehouse.value.toLowerCase();

    return warehouses.value.filter((w) => w.name?.toLowerCase().includes(q));
});

// INIT
onMounted(async () => {
    if (props.city_ref) {
        selectedCity.value = {
            ref: props.city_ref,
            present: props.city_name,
        };

        queryCity.value = props.city_name || "";

        if (props.warehouse_ref) {
            await fetchWarehouses(props.city_ref);

            selectedWarehouse.value = {
                ref: props.warehouse_ref,
                name: props.warehouse_name,
            };
        }
    }
});

onBeforeUnmount(() => {
    debouncedFetchCities.cancel();
});
</script>

<template>
    <div class="bg-white p-6 border border-gray-200 shadow-sm space-y-8">
        <h2 class="text-sm font-bold uppercase tracking-[0.2em] text-black">
            2. Доставка (Нова Пошта)
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <BaseSelect
                label="Місто"
                placeholder="Львів..."
                display-key="present"
                v-model="selectedCity"
                :options="cities"
                :loading="isCityLoading"
                :error="errors?.city_ref"
                @query-change="(v) => (queryCity = v)"
            />

            <BaseSelect
                v-if="selectedCity"
                label="Відділення"
                placeholder="Оберіть номер..."
                v-model="selectedWarehouse"
                :options="filteredWarehouses"
                :loading="isWarehouseLoading"
                :error="errors?.warehouse_ref"
                :is-static="true"
                show-check
                @query-change="(v) => (queryWarehouse = v)"
            />
        </div>
    </div>
</template>
