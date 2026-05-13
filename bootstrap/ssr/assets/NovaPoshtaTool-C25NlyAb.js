import { ref, watch, computed, onMounted, onBeforeUnmount, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import axios from "axios";
import debounce from "lodash.debounce";
import { _ as _sfc_main$1 } from "./BaseSelect-BvqgQdVd.js";
import { IconTruckDelivery } from "@tabler/icons-vue";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "@headlessui/vue";
const _sfc_main = {
  __name: "NovaPoshtaTool",
  __ssrInlineRender: true,
  props: {
    cityRef: String,
    cityName: String,
    warehouseRef: String,
    warehouseName: String,
    errors: Object
  },
  emits: [
    "update:cityRef",
    "update:cityName",
    "update:warehouseRef",
    "update:warehouseName"
  ],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
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
          params: { q: cleanSearch(query) }
        });
        cities.value = data;
      } catch (e) {
        console.error("NP Cities Error:", e);
      } finally {
        isCityLoading.value = false;
      }
    };
    const fetchWarehouses = async (cityRef) => {
      if (!cityRef) return;
      isWarehouseLoading.value = true;
      try {
        const { data } = await axios.get(route("api.np.warehouses"), {
          params: { city_ref: cityRef }
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
      emit("update:warehouseName", w?.name || "");
    });
    const filteredWarehouses = computed(() => {
      if (!queryWarehouse.value) return warehouses.value;
      const q = queryWarehouse.value.toLowerCase();
      return warehouses.value.filter((w) => w.name?.toLowerCase().includes(q));
    });
    onMounted(async () => {
      if (props.cityRef) {
        selectedCity.value = { ref: props.cityRef, present: props.cityName };
        queryCity.value = props.cityName || "";
        await fetchWarehouses(props.cityRef);
        if (props.warehouseRef) {
          selectedWarehouse.value = warehouses.value.find(
            (w) => w.ref === props.warehouseRef
          ) || { ref: props.warehouseRef, name: props.warehouseName };
        }
      }
    });
    onBeforeUnmount(() => debouncedFetchCities.cancel());
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6 p-6 bg-white border border-gray-100 rounded-[2rem] shadow-sm animate-in fade-in slide-in-from-top-4 duration-500" }, _attrs))} data-v-7a37cdde><div class="flex items-center gap-3 mb-2" data-v-7a37cdde><div class="p-2 bg-red-50 rounded-lg" data-v-7a37cdde>`);
      _push(ssrRenderComponent(unref(IconTruckDelivery), {
        size: "20",
        class: "text-red-500"
      }, null, _parent));
      _push(`</div><div data-v-7a37cdde><h4 class="text-[10px] font-black uppercase tracking-widest text-black" data-v-7a37cdde> Нова Пошта </h4><p class="text-[9px] text-gray-400 uppercase tracking-tighter" data-v-7a37cdde> Доставка у відділення або поштомат </p></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-8" data-v-7a37cdde><div class="relative" data-v-7a37cdde>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        label: "Ваше місто",
        placeholder: "Почніть вводити назву...",
        "display-key": "present",
        modelValue: selectedCity.value,
        "onUpdate:modelValue": ($event) => selectedCity.value = $event,
        options: cities.value,
        loading: isCityLoading.value,
        error: __props.errors?.city_ref,
        onQueryChange: (v) => queryCity.value = v,
        class: "np-select"
      }, null, _parent));
      _push(`</div><div class="relative" data-v-7a37cdde>`);
      if (selectedCity.value) {
        _push(ssrRenderComponent(_sfc_main$1, {
          label: "Відділення",
          placeholder: "Оберіть номер або адресу...",
          modelValue: selectedWarehouse.value,
          "onUpdate:modelValue": ($event) => selectedWarehouse.value = $event,
          options: filteredWarehouses.value,
          loading: isWarehouseLoading.value,
          error: __props.errors?.warehouse_ref,
          "is-static": true,
          "show-check": "",
          onQueryChange: (v) => queryWarehouse.value = v,
          class: "np-select"
        }, null, _parent));
      } else {
        _push(`<div class="h-full flex items-end pb-3" data-v-7a37cdde><span class="text-[9px] text-gray-300 uppercase italic tracking-widest" data-v-7a37cdde> Спочатку оберіть місто </span></div>`);
      }
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/Commerce/DeliveryTools/NovaPoshtaTool.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const NovaPoshtaTool = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7a37cdde"]]);
export {
  NovaPoshtaTool as default
};
