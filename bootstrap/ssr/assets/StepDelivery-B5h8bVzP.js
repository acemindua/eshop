import { ref, watch, computed, onMounted, onBeforeUnmount, mergeProps, unref, useSSRContext, defineAsyncComponent, createVNode, resolveDynamicComponent } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderVNode } from "vue/server-renderer";
import { IconTruckDelivery, IconArrowLeft, IconArrowRight } from "@tabler/icons-vue";
import axios from "axios";
import debounce from "lodash.debounce";
import { _ as _sfc_main$2 } from "./BaseSelect-BvqgQdVd.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "@headlessui/vue";
const _sfc_main$1 = {
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
          selectedWarehouse.value = warehouses.value.find((w) => w.ref === props.warehouseRef) || { ref: props.warehouseRef, name: props.warehouseName };
        }
      }
    });
    onBeforeUnmount(() => debouncedFetchCities.cancel());
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "border-x border-b border-black p-8 bg-zinc-50 animate-in fade-in slide-in-from-top-2 duration-500" }, _attrs))} data-v-793fc7bd><div class="flex items-center gap-4 mb-10" data-v-793fc7bd><div class="w-12 h-12 bg-[#ff392e] flex items-center justify-center" data-v-793fc7bd>`);
      _push(ssrRenderComponent(unref(IconTruckDelivery), {
        size: "24",
        class: "text-white"
      }, null, _parent));
      _push(`</div><div class="uppercase italic" data-v-793fc7bd><h4 class="text-xs font-black tracking-widest leading-none" data-v-793fc7bd>Нова Пошта</h4><p class="text-[9px] text-gray-500 font-bold mt-1 tracking-tighter" data-v-793fc7bd>До відділення або поштомату</p></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-12" data-v-793fc7bd><div class="relative" data-v-793fc7bd>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        label: _ctx.$t("City"),
        placeholder: _ctx.$t("Search city..."),
        "display-key": "present",
        modelValue: selectedCity.value,
        "onUpdate:modelValue": ($event) => selectedCity.value = $event,
        options: cities.value,
        loading: isCityLoading.value,
        error: __props.errors?.city,
        onQueryChange: (v) => queryCity.value = v,
        class: "np-select"
      }, null, _parent));
      _push(`</div><div class="relative" data-v-793fc7bd>`);
      if (selectedCity.value) {
        _push(ssrRenderComponent(_sfc_main$2, {
          label: _ctx.$t("Warehouse"),
          placeholder: _ctx.$t("Select warehouse..."),
          modelValue: selectedWarehouse.value,
          "onUpdate:modelValue": ($event) => selectedWarehouse.value = $event,
          options: filteredWarehouses.value,
          loading: isWarehouseLoading.value,
          error: __props.errors?.warehouse,
          "is-static": true,
          "show-check": "",
          onQueryChange: (v) => queryWarehouse.value = v,
          class: "np-select"
        }, null, _parent));
      } else {
        _push(`<div class="h-full flex items-end pb-4" data-v-793fc7bd><span class="text-[10px] font-bold text-zinc-300 uppercase italic tracking-widest" data-v-793fc7bd>${ssrInterpolate(_ctx.$t("Select city first"))}</span></div>`);
      }
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/DeliveryTools/NovaPoshtaTool.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const NovaPoshtaTool = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-793fc7bd"]]);
const NovaPoshtaTool$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: NovaPoshtaTool
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main = {
  __name: "StepDelivery",
  __ssrInlineRender: true,
  props: {
    form: Object,
    shippingMethods: Array,
    warehouses: Array
  },
  emits: ["next", "back"],
  setup(__props, { emit: __emit }) {
    const deliveryComponents = {
      nova_poshta: defineAsyncComponent(() => Promise.resolve().then(() => NovaPoshtaTool$1)),
      ukr_poshta: defineAsyncComponent(() => import("./UkrPoshtaTool-CNNWEsbn.js")),
      pickup: defineAsyncComponent(() => import("./PickupTool-BwVUxatI.js"))
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-0 py-4 font-['Exo_2'] animate-in fade-in slide-in-from-bottom-4 duration-700 text-black max-w-5xl mx-auto" }, _attrs))} data-v-260fa40a><header class="mb-12 border-b border-black pb-8" data-v-260fa40a><h2 class="text-4xl font-black uppercase tracking-tighter italic" data-v-260fa40a> 02. ${ssrInterpolate(_ctx.$t("Shipping"))}</h2><p class="text-gray-500 text-[10px] font-bold tracking-[0.3em] uppercase mt-2" data-v-260fa40a>${ssrInterpolate(_ctx.$t("Select how you want to receive your order"))}</p></header><div class="flex flex-col border-t border-black" data-v-260fa40a><!--[-->`);
      ssrRenderList(__props.shippingMethods, (method) => {
        _push(`<div class="flex flex-col" data-v-260fa40a><div class="${ssrRenderClass([__props.form.delivery_method === method.alias ? "bg-black text-white" : "hover:bg-zinc-50", "group p-8 border-b border-black cursor-pointer flex justify-between items-center transition-all duration-300"])}" data-v-260fa40a><div class="flex items-center gap-8" data-v-260fa40a><span class="${ssrRenderClass([__props.form.delivery_method === method.alias ? "opacity-100" : "opacity-20", "text-2xl font-black italic transition-opacity"])}" data-v-260fa40a> 0${ssrInterpolate(method.id)}</span><span class="text-sm font-black uppercase tracking-[0.2em]" data-v-260fa40a>${ssrInterpolate(method.title)}</span></div><div class="flex items-center gap-6" data-v-260fa40a><span class="text-xl font-black italic tracking-tighter" data-v-260fa40a>${ssrInterpolate(parseFloat(method.price) > 0 ? `${method.price} ₴` : _ctx.$t("Free"))}</span></div></div>`);
        if (__props.form.delivery_method === method.alias && deliveryComponents[method.alias]) {
          _push(`<div data-v-260fa40a>`);
          ssrRenderVNode(_push, createVNode(resolveDynamicComponent(deliveryComponents[method.alias]), mergeProps({
            cityRef: __props.form.city_ref,
            "onUpdate:cityRef": ($event) => __props.form.city_ref = $event,
            cityName: __props.form.city,
            "onUpdate:cityName": ($event) => __props.form.city = $event,
            warehouseRef: __props.form.warehouse_ref,
            "onUpdate:warehouseRef": ($event) => __props.form.warehouse_ref = $event,
            warehouseName: __props.form.warehouse,
            "onUpdate:warehouseName": ($event) => __props.form.warehouse = $event
          }, { ref_for: true }, method.alias === "pickup" ? { warehouses: __props.warehouses } : {}, {
            errors: __props.form.errors
          }), null), _parent);
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]-->`);
      if (__props.form.errors.delivery_method) {
        _push(`<p class="text-red-500 text-[10px] font-black uppercase mt-6 tracking-widest" data-v-260fa40a> ! ${ssrInterpolate(_ctx.$t(__props.form.errors.delivery_method))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><footer class="flex flex-col md:flex-row justify-between items-center pt-20 gap-6" data-v-260fa40a><button type="button" class="w-full md:w-auto group flex items-center justify-center gap-6 px-10 py-6 border border-zinc-200 hover:border-black transition-all duration-500" data-v-260fa40a>`);
      _push(ssrRenderComponent(unref(IconArrowLeft), {
        size: "20",
        class: "group-hover:-translate-x-2 transition-transform duration-500"
      }, null, _parent));
      _push(`<span class="text-[11px] font-black uppercase tracking-[0.4em]" data-v-260fa40a>${ssrInterpolate(_ctx.$t("Back"))}</span></button><button type="button" class="w-full md:w-auto group flex items-center justify-between bg-black text-white pl-12 pr-8 py-6 hover:bg-zinc-800 transition-all duration-500" data-v-260fa40a><span class="text-[11px] font-black uppercase tracking-[0.4em]" data-v-260fa40a>${ssrInterpolate(_ctx.$t("Next step"))}</span><div class="mx-12 w-12 h-px bg-white/30 group-hover:w-20 transition-all duration-500" data-v-260fa40a></div>`);
      _push(ssrRenderComponent(unref(IconArrowRight), {
        size: "20",
        class: "group-hover:translate-x-1 transition-transform duration-500"
      }, null, _parent));
      _push(`</button></footer></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/Commerce/Checkout/Steps/StepDelivery.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const StepDelivery = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-260fa40a"]]);
export {
  StepDelivery as default
};
