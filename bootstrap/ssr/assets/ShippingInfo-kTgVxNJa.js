import { ref, watch, computed, onMounted, onBeforeUnmount, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import axios from "axios";
import debounce from "lodash.debounce";
import { _ as _sfc_main$1 } from "./BaseSelect-BvqgQdVd.js";
import "@headlessui/vue";
const _sfc_main = {
  __name: "ShippingInfo",
  __ssrInlineRender: true,
  props: {
    city_ref: String,
    city_name: String,
    warehouse_ref: String,
    warehouse_name: String,
    errors: Object
  },
  emits: [
    "update:city_ref",
    "update:city_name",
    "update:warehouse_ref",
    "update:warehouse_name"
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
          params: { city_ref: cityRef }
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
      return warehouses.value.filter(
        (w) => w.name?.toLowerCase().includes(queryWarehouse.value.toLowerCase())
      );
    });
    onMounted(async () => {
      if (props.city_ref) {
        selectedCity.value = { ref: props.city_ref, present: props.city_name };
        queryCity.value = props.city_name || "";
        await fetchWarehouses(props.city_ref);
        if (props.warehouse_ref) {
          selectedWarehouse.value = warehouses.value.find(
            (w) => w.ref === props.warehouse_ref
          ) || { ref: props.warehouse_ref, name: props.warehouse_name };
        }
      }
    });
    onBeforeUnmount(() => debouncedFetchCities.cancel());
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-500" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        label: "Місто",
        placeholder: "Введіть місто...",
        "display-key": "present",
        modelValue: selectedCity.value,
        "onUpdate:modelValue": ($event) => selectedCity.value = $event,
        options: cities.value,
        loading: isCityLoading.value,
        error: __props.errors?.city_ref,
        onQueryChange: (v) => queryCity.value = v
      }, null, _parent));
      if (selectedCity.value) {
        _push(ssrRenderComponent(_sfc_main$1, {
          label: "Відділення",
          placeholder: "Оберіть номер...",
          modelValue: selectedWarehouse.value,
          "onUpdate:modelValue": ($event) => selectedWarehouse.value = $event,
          options: filteredWarehouses.value,
          loading: isWarehouseLoading.value,
          error: __props.errors?.warehouse_ref,
          "is-static": true,
          "show-check": "",
          onQueryChange: (v) => queryWarehouse.value = v
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/Commerce/Partials/ShippingInfo.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
