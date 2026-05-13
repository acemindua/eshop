import { ref, computed, mergeProps, unref, createVNode, resolveDynamicComponent, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderVNode, ssrRenderClass, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { IconShoppingCart, IconChevronUp, IconChevronDown, IconTruckDelivery, IconReceipt2, IconInfoCircle } from "@tabler/icons-vue";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "OrderSummary",
  __ssrInlineRender: true,
  props: {
    cart: { type: Object, required: true },
    form: { type: Object, required: true }
  },
  setup(__props) {
    const props = __props;
    const isMobileExpanded = ref(false);
    const promoCode = ref("");
    const isApplyingPromo = ref(false);
    const subtotal = computed(() => props.cart?.total_price || 0);
    const deliveryFee = computed(() => {
      return props.form.delivery_method === "pickup" ? 0 : 80;
    });
    const total = computed(() => subtotal.value + deliveryFee.value);
    const formatPrice = (value) => {
      return new Intl.NumberFormat("uk-UA", {
        style: "currency",
        currency: "UAH",
        maximumFractionDigits: 0
      }).format(value);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "sticky top-6 space-y-6" }, _attrs))} data-v-69a38530><div class="lg:hidden bg-white border border-gray-100 rounded-2xl shadow-sm transition-all duration-500" data-v-69a38530><button class="flex items-center justify-between w-full p-5" data-v-69a38530><div class="flex items-center gap-3" data-v-69a38530><div class="relative" data-v-69a38530>`);
      _push(ssrRenderComponent(unref(IconShoppingCart), {
        size: "20",
        class: "text-black"
      }, null, _parent));
      _push(`<span class="absolute -top-2 -right-2 bg-black text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold" data-v-69a38530>${ssrInterpolate(__props.cart?.items?.length || 0)}</span></div><span class="text-[10px] font-black uppercase tracking-widest text-gray-900" data-v-69a38530>Ваше замовлення</span></div><div class="flex items-center gap-3" data-v-69a38530><span class="font-black text-sm" data-v-69a38530>${ssrInterpolate(formatPrice(total.value))}</span>`);
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(isMobileExpanded.value ? unref(IconChevronUp) : unref(IconChevronDown)), {
        size: "16",
        class: "text-gray-400"
      }, null), _parent);
      _push(`</div></button></div><div class="${ssrRenderClass([[!isMobileExpanded.value ? "hidden lg:block" : "block"], "bg-white border border-gray-50 rounded-[2rem] overflow-hidden shadow-2xl shadow-gray-200/50 transition-all duration-700"])}" data-v-69a38530><div class="p-8 border-b border-gray-50 max-h-[380px] overflow-y-auto custom-scrollbar" data-v-69a38530><h3 class="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mb-8 hidden lg:block" data-v-69a38530> Склад замовлення </h3><div class="space-y-8" data-v-69a38530><!--[-->`);
      ssrRenderList(__props.cart?.items, (item) => {
        _push(`<div class="flex gap-5 group" data-v-69a38530><div class="relative flex-shrink-0 w-16 h-20 bg-gray-50 rounded-xl overflow-hidden border border-gray-50" data-v-69a38530><img${ssrRenderAttr("src", item.image)}${ssrRenderAttr("alt", item.name)} class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" data-v-69a38530><div class="absolute inset-0 bg-black/5" data-v-69a38530></div></div><div class="flex-1 flex flex-col justify-center min-w-0" data-v-69a38530><h4 class="text-[11px] font-bold text-gray-900 uppercase tracking-tight leading-tight" data-v-69a38530>${ssrInterpolate(item.name)}</h4><div class="flex items-center gap-2 mt-2" data-v-69a38530><span class="text-[10px] text-gray-400 font-medium" data-v-69a38530>${ssrInterpolate(item.quantity)} шт. ×</span><span class="text-[10px] text-gray-900 font-bold" data-v-69a38530>${ssrInterpolate(formatPrice(item.price))}</span></div></div><div class="flex items-center text-[11px] font-black text-gray-900" data-v-69a38530>${ssrInterpolate(formatPrice(item.price * item.quantity))}</div></div>`);
      });
      _push(`<!--]--></div></div><div class="p-8 bg-gray-50/30 space-y-4" data-v-69a38530><div class="flex justify-between text-[10px] font-bold uppercase tracking-widest text-gray-400" data-v-69a38530><span data-v-69a38530>Товари</span><span class="text-gray-900" data-v-69a38530>${ssrInterpolate(formatPrice(subtotal.value))}</span></div><div class="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-gray-400" data-v-69a38530><div class="flex items-center gap-2" data-v-69a38530>`);
      _push(ssrRenderComponent(unref(IconTruckDelivery), {
        size: "14",
        "stroke-width": "3"
      }, null, _parent));
      _push(`<span data-v-69a38530>Доставка</span></div>`);
      if (deliveryFee.value > 0) {
        _push(`<span class="text-gray-900" data-v-69a38530>${ssrInterpolate(formatPrice(deliveryFee.value))}</span>`);
      } else {
        _push(`<span class="text-green-600 font-black" data-v-69a38530>Free</span>`);
      }
      _push(`</div><div class="pt-4 border-t border-gray-100" data-v-69a38530><div class="relative group" data-v-69a38530><input${ssrRenderAttr("value", promoCode.value)} type="text" placeholder="ПРОМОКОД" class="w-full bg-white border-0 border-b border-gray-100 px-0 py-3 text-[10px] font-black tracking-[0.2em] focus:ring-0 focus:border-black transition-all outline-none placeholder:text-gray-200" data-v-69a38530><button${ssrIncludeBooleanAttr(isApplyingPromo.value || !promoCode.value) ? " disabled" : ""} class="absolute right-0 top-1/2 -translate-y-1/2 text-[9px] font-black uppercase tracking-widest hover:text-blue-600 disabled:text-gray-300 transition-colors" data-v-69a38530>${ssrInterpolate(isApplyingPromo.value ? "..." : "Ок")}</button></div></div><div class="pt-6 flex justify-between items-end" data-v-69a38530><div class="space-y-1" data-v-69a38530><p class="text-[9px] font-black text-gray-400 uppercase tracking-[0.3em]" data-v-69a38530> Всього до сплати </p><p class="text-3xl font-black text-gray-900 leading-none tracking-tighter" data-v-69a38530>${ssrInterpolate(formatPrice(total.value))}</p></div><div class="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center shadow-lg shadow-black/20" data-v-69a38530>`);
      _push(ssrRenderComponent(unref(IconReceipt2), {
        size: "22",
        "stroke-width": "1.5"
      }, null, _parent));
      _push(`</div></div></div></div><div class="group bg-black rounded-3xl p-6 transition-all duration-500 hover:-translate-y-1" data-v-69a38530><div class="flex gap-4 items-start" data-v-69a38530>`);
      _push(ssrRenderComponent(unref(IconInfoCircle), {
        class: "text-white w-5 h-5 flex-shrink-0",
        "stroke-width": "1.5"
      }, null, _parent));
      _push(`<div class="space-y-1" data-v-69a38530><p class="text-[10px] font-black text-white uppercase tracking-widest" data-v-69a38530> Обробка замовлення </p><p class="text-[9px] text-gray-400 leading-relaxed uppercase tracking-tighter" data-v-69a38530> Відправка протягом 24 годин після підтвердження менеджером. </p></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/Commerce/Partials/OrderSummary.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const OrderSummary = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-69a38530"]]);
export {
  OrderSummary as default
};
