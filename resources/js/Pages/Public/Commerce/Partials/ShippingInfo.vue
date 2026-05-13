<script setup>
import { ref, watch, computed, onMounted, onBeforeUnmount } from "vue";
import axios from "axios";
import debounce from "lodash.debounce";
import BaseSelect from "@/Components/UI/BaseSelect.vue";

const props = defineProps({
    city_ref: String,
    city_name: String,
    warehouse_ref: String,
    warehouse_name: String,
    errors: Object,
});

const emit = defineEmits([
    "update:city_ref",
    "update:city_name",
    "update:warehouse_ref",
    "update:warehouse_name",
]);

const selectedCity = ref(null);
const queryCity = ref("");
const cities = ref([]);
const isCityLoading = ref(false);

const selectedWarehouse = ref(null);
const queryWarehouse = ref("");
const warehouses = ref([]);
const isWarehouseLoading = ref(false);

const cleanSearch = (val) =>
    val.replace(/^(місто|м\.|село|с\.|смт)\s+/gi, "").trim();

const fetchCities = async (query) => {
    isCityLoading.value = true;
    try {
        const { data } = await axios.get(route("api.np.cities"), {
            params: { q: cleanSearch(query) },
        });
        cities.value = data;
    } catch (e) {
        console.error(e);
    } finally {
        isCityLoading.value = false;
    }
};

const fetchWarehouses = async (cityRef) => {
    if (!cityRef) return;
    isWarehouseLoading.value = true;
    try {
        const { data } = await axios.get(route("api.np.warehouses"), {
            params: { city_ref: cityRef },
        });
        warehouses.value = data;
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

watch(queryCity, (val) => debouncedFetchCities(val));

watch(selectedCity, async (newCity) => {
    emit("update:city_ref", newCity?.ref || "");
    emit("update:city_name", newCity?.present || "");

    selectedWarehouse.value = null;
    emit("update:warehouse_ref", "");
    emit("update:warehouse_name", "");

    if (newCity?.ref) await fetchWarehouses(newCity.ref);
});

watch(selectedWarehouse, (w) => {
    emit("update:warehouse_ref", w?.ref || "");
    emit("update:warehouse_name", w?.name || "");
});

const filteredWarehouses = computed(() => {
    if (!queryWarehouse.value) return warehouses.value;
    return warehouses.value.filter((w) =>
        w.name?.toLowerCase().includes(queryWarehouse.value.toLowerCase()),
    );
});

onMounted(async () => {
    if (props.city_ref) {
        selectedCity.value = { ref: props.city_ref, present: props.city_name };
        queryCity.value = props.city_name || "";
        await fetchWarehouses(props.city_ref);
        if (props.warehouse_ref) {
            selectedWarehouse.value = warehouses.value.find(
                (w) => w.ref === props.warehouse_ref,
            ) || { ref: props.warehouse_ref, name: props.warehouse_name };
        }
    }
});

onBeforeUnmount(() => debouncedFetchCities.cancel());
</script>

<template>
    <div
        class="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-500"
    >
        <BaseSelect
            label="Місто"
            placeholder="Введіть місто..."
            display-key="present"
            v-model="selectedCity"
            :options="cities"
            :loading="isCityLoading"
            :error="errors?.city_ref"
            @query-change="(v) => (queryCity = v)"
        />

        <Transition
            enter-active-class="transition duration-200"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
        >
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
        </Transition>
    </div>
</template>
