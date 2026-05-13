import { ref, onMounted, computed, mergeProps, createVNode, resolveDynamicComponent, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrRenderVNode, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { IconCircleCheck, IconMapPin, IconChevronRight, IconChevronLeft, IconBuildingStore, IconTruckDelivery } from "@tabler/icons-vue";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./TextInput-Dmmb8A31.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "StepDelivery",
  __ssrInlineRender: true,
  props: {
    form: Object,
    shippingMethods: Array,
    warehouses: Array
    // Додаємо пропс зі списком ваших складів
  },
  emits: ["next", "back"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const touched = ref(/* @__PURE__ */ new Set());
    onMounted(() => {
      if (!props.form.delivery_method && props.shippingMethods?.length > 0) {
        selectMethod(props.shippingMethods[0].alias);
      }
    });
    const isStepValid = computed(() => {
      const f = props.form;
      if (!f.delivery_method) return false;
      if (f.delivery_method === "pickup") {
        return !!f.warehouse;
      }
      return f.city?.length > 2 && f.warehouse?.length > 1;
    });
    const selectMethod = (alias) => {
      props.form.delivery_method = alias;
      props.form.city = null;
      props.form.warehouse = null;
      if (alias === "pickup" && props.warehouses?.length > 0) {
        props.form.warehouse = props.warehouses[0].id;
      }
    };
    const getIcon = (alias) => {
      if (alias === "pickup") return IconBuildingStore;
      return IconTruckDelivery;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-2xl mx-auto space-y-12 py-10 animate-in fade-in slide-in-from-right-4 duration-700" }, _attrs))} data-v-22cee596><header class="space-y-1" data-v-22cee596><h3 class="text-[10px] font-black uppercase tracking-[0.5em] text-black" data-v-22cee596>02. Доставка</h3><p class="text-[9px] text-gray-400 uppercase tracking-widest" data-v-22cee596>Оберіть спосіб отримання замовлення</p></header><div class="grid grid-cols-1 gap-4" data-v-22cee596><!--[-->`);
      ssrRenderList(__props.shippingMethods, (method) => {
        _push(`<div class="${ssrRenderClass([[
          __props.form.delivery_method === method.alias ? "bg-black border-black shadow-xl shadow-black/5" : "bg-white border-gray-100 hover:border-gray-300"
        ], "group relative flex items-center justify-between p-6 rounded-2xl border transition-all cursor-pointer"])}" data-v-22cee596><div class="flex items-center gap-5" data-v-22cee596>`);
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(getIcon(method.alias)), {
          size: "22",
          class: __props.form.delivery_method === method.alias ? "text-white" : "text-gray-400"
        }, null), _parent);
        _push(`<div data-v-22cee596><p class="${ssrRenderClass([__props.form.delivery_method === method.alias ? "text-white" : "text-black", "text-[10px] font-black uppercase tracking-widest"])}" data-v-22cee596>${ssrInterpolate(method.name)}</p><p class="${ssrRenderClass([__props.form.delivery_method === method.alias ? "text-gray-500" : "text-gray-400", "text-[9px] uppercase tracking-widest mt-0.5"])}" data-v-22cee596>${ssrInterpolate(method.price > 0 ? `${method.price} грн` : "За тарифами перевізника")}</p></div></div>`);
        if (__props.form.delivery_method === method.alias) {
          _push(`<div class="text-white" data-v-22cee596>`);
          _push(ssrRenderComponent(unref(IconCircleCheck), { size: "18" }, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div><div class="min-h-[200px]" data-v-22cee596>`);
      if (__props.form.delivery_method === "pickup") {
        _push(`<div class="space-y-6" data-v-22cee596><h4 class="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400" data-v-22cee596>Наші точки видачі:</h4><div class="grid grid-cols-1 gap-3" data-v-22cee596><!--[-->`);
        ssrRenderList(__props.warehouses, (wh) => {
          _push(`<div class="${ssrRenderClass([__props.form.warehouse === wh.id ? "border-black bg-gray-50" : "border-gray-100 opacity-60 hover:opacity-100", "p-5 rounded-xl border transition-all cursor-pointer flex items-start gap-4"])}" data-v-22cee596>`);
          _push(ssrRenderComponent(unref(IconMapPin), {
            size: "18",
            class: [__props.form.warehouse === wh.id ? "text-black" : "text-gray-300", "mt-1"]
          }, null, _parent));
          _push(`<div data-v-22cee596><p class="text-[11px] font-bold uppercase tracking-tight text-black" data-v-22cee596>${ssrInterpolate(wh.city)}, ${ssrInterpolate(wh.address)}</p>`);
          if (wh.working_hours) {
            _push(`<p class="text-[10px] text-gray-500 mt-1" data-v-22cee596>${ssrInterpolate(wh.working_hours)}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else if (__props.form.delivery_method) {
        _push(`<div class="space-y-10" data-v-22cee596><div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 pt-4" data-v-22cee596><div class="relative group" data-v-22cee596>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          value: "Населений пункт",
          class: [[touched.value.has("city") && !__props.form.city ? "text-red-500" : "text-gray-400"], "text-[9px] uppercase tracking-widest mb-1"]
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$2, {
          modelValue: __props.form.city,
          "onUpdate:modelValue": ($event) => __props.form.city = $event,
          onBlur: ($event) => touched.value.add("city"),
          placeholder: "Напр: Львів",
          class: ["w-full border-0 border-b bg-transparent px-0 py-2 focus:ring-0 text-sm transition-all", [touched.value.has("city") && !__props.form.city ? "border-red-300" : "border-gray-100 focus:border-black"]]
        }, null, _parent));
        _push(`</div><div class="relative group" data-v-22cee596>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          value: "Відділення / Склад",
          class: [[touched.value.has("warehouse") && !__props.form.warehouse ? "text-red-500" : "text-gray-400"], "text-[9px] uppercase tracking-widest mb-1"]
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$2, {
          modelValue: __props.form.warehouse,
          "onUpdate:modelValue": ($event) => __props.form.warehouse = $event,
          onBlur: ($event) => touched.value.add("warehouse"),
          placeholder: "№1, вул. Городоцька",
          class: ["w-full border-0 border-b bg-transparent px-0 py-2 focus:ring-0 text-sm transition-all", [touched.value.has("warehouse") && !__props.form.warehouse ? "border-red-300" : "border-gray-100 focus:border-black"]]
        }, null, _parent));
        _push(`</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><footer class="pt-10 flex flex-col gap-4" data-v-22cee596><button type="button" class="${ssrRenderClass([isStepValid.value ? "bg-black text-white shadow-xl shadow-black/10" : "bg-gray-50 text-gray-300", "group relative w-full py-8 rounded-2xl transition-all font-black uppercase tracking-[0.4em] text-[11px]"])}" data-v-22cee596><div class="flex items-center justify-center gap-3" data-v-22cee596><span data-v-22cee596>${ssrInterpolate(isStepValid.value ? "Продовжити" : "Оберіть дані доставки")}</span>`);
      if (isStepValid.value) {
        _push(ssrRenderComponent(unref(IconChevronRight), {
          size: "18",
          class: "group-hover:translate-x-2 transition-transform"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></button><button class="flex items-center justify-center gap-2 py-4 text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-black transition-colors" data-v-22cee596>`);
      _push(ssrRenderComponent(unref(IconChevronLeft), { size: "14" }, null, _parent));
      _push(`<span data-v-22cee596>Назад до контактів</span></button></footer></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/Commerce/Steps/StepDelivery.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const StepDelivery = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-22cee596"]]);
export {
  StepDelivery as default
};
