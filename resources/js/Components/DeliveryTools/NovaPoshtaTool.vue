<script setup>
import { ref, watch, computed, onMounted, onBeforeUnmount } from "vue";
import axios from "axios";
import debounce from "lodash.debounce";
import BaseSelect from "@/Components/UI/BaseSelect.vue";
import { IconTruckDelivery } from "@tabler/icons-vue";

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

const selectedCity = ref(null);
const queryCity = ref("");
const cities = ref([]);
const isCityLoading = ref(false);

const selectedWarehouse = ref(null);
const queryWarehouse = ref("");
const warehouses = ref([]);
const isWarehouseLoading = ref(false);

const cleanSearch = (val) => val.replace(/^(місто|м\.|село|с\.|смт)\s+/gi, "").trim();

const fetchCities = async (query) => {
    isCityLoading.value = true;
    try {
        const { data } = await axios.get(route("api.np.cities"), {
            params: { q: cleanSearch(query) },
        });
        cities.value = data;
    } catch (e) { console.error("NP Cities Error:", e); }
    finally { isCityLoading.value = false; }
};

const fetchWarehouses = async (cityRef) => {
    if (!cityRef) return;
    isWarehouseLoading.value = true;
    try {
        const { data } = await axios.get(route("api.np.warehouses"), {
            params: { city_ref: cityRef },
        });
        warehouses.value = data;
    } catch (e) { console.error("NP Warehouses Error:", e); }
    finally { isWarehouseLoading.value = false; }
};

const debouncedFetchCities = debounce((val) => {
    if (!val || val.length < 3) { cities.value = []; return; }
    fetchCities(val);
}, 400);

watch(queryCity, (val) => debouncedFetchCities(val));

watch(selectedCity, async (newCity) => {
    emit("update:cityRef", newCity?.ref || "");
    emit("update:cityName", newCity?.present || "");
    selectedWarehouse.value = null;
    emit("update:warehouseRef", "");
    emit("update:warehouseName", "");
    if (newCity?.ref) await fetchWarehouses(newCity.ref);
});

watch(selectedWarehouse, (w) => {
    emit("update:warehouseRef", w?.ref || "");
    emit("update:warehouseName", w?.title || "");
});

const filteredWarehouses = computed(() => {
    if (!queryWarehouse.value) return warehouses.value;
    const q = queryWarehouse.value.toLowerCase();
    return warehouses.value.filter((w) => w.title?.toLowerCase().includes(q));
});

onMounted(async () => {
    if (props.cityRef) {
        selectedCity.value = { ref: props.cityRef, present: props.cityName };
        queryCity.value = props.cityName || "";
        await fetchWarehouses(props.cityRef);
        if (props.warehouseRef) {
            selectedWarehouse.value = warehouses.value.find(w => w.ref === props.warehouseRef)
                || { ref: props.warehouseRef, name: props.warehouseName };
        }
    }
});

onBeforeUnmount(() => debouncedFetchCities.cancel());
</script>

<template>
    <div class="border-x border-b border-black p-8 bg-zinc-50 animate-in fade-in slide-in-from-top-2 duration-500">
        <!-- Brand Header -->
        <div class="flex items-center gap-4 mb-10">
            <div class="w-12 h-12 bg-[#ff392e] flex items-center justify-center">
                <IconTruckDelivery size="24" class="text-white" />
            </div>
            <div class="uppercase italic">
                <h4 class="text-xs font-black tracking-widest leading-none">Нова Пошта</h4>
                <p class="text-[9px] text-gray-500 font-bold mt-1 tracking-tighter">До відділення або поштомату</p>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
            <!-- City -->
            <div class="relative">
                <BaseSelect
                    :label="$t('City')"
                    :placeholder="$t('Search city...')"
                    display-key="present"
                    v-model="selectedCity"
                    :options="cities"
                    :loading="isCityLoading"
                    :error="errors?.city"
                    @query-change="(v) => (queryCity = v)"
                    class="np-select"
                />
            </div>

            <!-- Warehouse -->
            <div class="relative">
                <transition name="fade">
                    <BaseSelect
                        v-if="selectedCity"
                        :label="$t('Warehouse')"
                        :placeholder="$t('Select warehouse...')"
                        v-model="selectedWarehouse"
                        :options="filteredWarehouses"
                        :loading="isWarehouseLoading"
                        :error="errors?.warehouse"
                        :is-static="true"
                        show-check
                        @query-change="(v) => (queryWarehouse = v)"
                        class="np-select"
                    />
                    <div v-else class="h-full flex items-end pb-4">
                        <span class="text-[10px] font-bold text-zinc-300 uppercase italic tracking-widest">
                            {{ $t('Select city first') }}
                        </span>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

:deep(.np-select label) {
    @apply text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-2 block;
}

:deep(.np-select input) {
    @apply border-0 border-b border-zinc-200 bg-transparent px-0 py-3 focus:ring-0 text-sm font-bold transition-all focus:border-black w-full placeholder:text-zinc-300;
}
</style>
