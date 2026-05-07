import { computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "OrderSummary",
  __ssrInlineRender: true,
  props: {
    cart: {
      type: Object,
      default: () => ({ items: [], total: 0 })
    },
    processing: Boolean
  },
  emits: ["submit"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const formatPrice = (price = 0) => {
      return new Intl.NumberFormat("uk-UA", {
        style: "decimal",
        minimumFractionDigits: 2
      }).format(price) + " ₴";
    };
    const items = computed(() => props.cart?.items || []);
    const itemsCount = computed(() => items.value.length);
    const total = computed(() => props.cart?.total || 0);
    const finalTotal = computed(() => total.value);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "sticky top-4 space-y-4" }, _attrs))} data-v-6afab960><div class="bg-white border border-gray-200 p-6 shadow-sm" data-v-6afab960><h3 class="text-xs uppercase tracking-widest font-bold mb-6 border-b border-gray-100 pb-2" data-v-6afab960> Ваше замовлення (${ssrInterpolate(itemsCount.value)}) </h3><div class="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar" data-v-6afab960><!--[-->`);
      ssrRenderList(items.value, (item) => {
        _push(`<div class="flex gap-4" data-v-6afab960><div class="w-16 h-16 bg-gray-50 border border-gray-100 flex-shrink-0 flex items-center justify-center overflow-hidden" data-v-6afab960>`);
        if (item.image) {
          _push(`<img${ssrRenderAttr("src", item.image)} class="object-cover w-full h-full" data-v-6afab960>`);
        } else {
          _push(`<span class="text-[10px] text-gray-400" data-v-6afab960>NO IMG</span>`);
        }
        _push(`</div><div class="flex-grow" data-v-6afab960><h4 class="text-[11px] font-bold leading-tight line-clamp-2 uppercase italic text-gray-800" data-v-6afab960>${ssrInterpolate(item.name)}</h4><div class="flex justify-between items-end mt-1" data-v-6afab960><span class="text-[10px] text-gray-500 uppercase" data-v-6afab960>к-сть: ${ssrInterpolate(item.quantity)}</span><span class="text-xs font-bold" data-v-6afab960>${ssrInterpolate(formatPrice(item.price * item.quantity))}</span></div></div></div>`);
      });
      _push(`<!--]--></div><div class="mt-8 pt-6 border-t border-black space-y-3" data-v-6afab960><div class="flex justify-between text-xs" data-v-6afab960><span class="text-gray-500 uppercase tracking-tighter" data-v-6afab960>Сума:</span><span data-v-6afab960>${ssrInterpolate(formatPrice(total.value))}</span></div><div class="flex justify-between text-xs" data-v-6afab960><span class="text-gray-500 uppercase tracking-tighter" data-v-6afab960>Доставка:</span><span class="text-[10px] font-bold uppercase" data-v-6afab960>За тарифами перевізника</span></div><div class="flex justify-between text-base font-black pt-4 border-t border-gray-100" data-v-6afab960><span data-v-6afab960>РАЗОМ:</span><span data-v-6afab960>${ssrInterpolate(formatPrice(finalTotal.value))}</span></div></div></div><button${ssrIncludeBooleanAttr(__props.processing) ? " disabled" : ""} class="w-full bg-black text-white py-5 px-8 text-xs uppercase tracking-[0.2em] font-bold transition-all hover:bg-gray-900 disabled:bg-gray-400 flex items-center justify-center gap-3" data-v-6afab960>`);
      if (__props.processing) {
        _push(`<span class="animate-spin h-3 w-3 border-2 border-white border-t-transparent" data-v-6afab960></span>`);
      } else {
        _push(`<!---->`);
      }
      _push(` ${ssrInterpolate(__props.processing ? "Оформлюється..." : "Підтвердити замовлення")}</button><div class="text-[9px] text-gray-400 uppercase tracking-tight text-center px-4 leading-relaxed" data-v-6afab960> Натискаючи кнопку, ви погоджуєтесь з умовами <a href="#" class="underline" data-v-6afab960>публічної оферти</a>. </div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/Commerce/Partials/OrderSummary.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const OrderSummary = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6afab960"]]);
export {
  OrderSummary as default
};
