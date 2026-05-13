import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
const _sfc_main = {
  __name: "OrderSummary",
  __ssrInlineRender: true,
  props: {
    items: Array,
    total: [Number, String],
    subtotal: [Number, String],
    shippingPrice: [Number, String]
  },
  setup(__props) {
    const formatPrice = (value) => value?.toLocaleString() + " ₴";
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "font-['Exo_2'] text-black uppercase" }, _attrs))}><h3 class="text-[11px] font-black tracking-[0.4em] mb-12 border-b border-black pb-4">${ssrInterpolate(_ctx.$t("Your Selection"))}</h3><div class="space-y-8 mb-12"><!--[-->`);
      ssrRenderList(__props.items, (item) => {
        _push(`<div class="flex gap-6 items-start"><div class="w-20 h-24 bg-white border border-black p-2 shrink-0 grayscale"><img${ssrRenderAttr("src", item.image)} class="w-full h-full object-contain mix-blend-multiply"></div><div class="flex-grow"><h4 class="text-[11px] font-black leading-tight mb-2 italic tracking-tight">${ssrInterpolate(item.name)}</h4><div class="flex justify-between items-end"><span class="text-[9px] font-bold text-gray-400 tracking-widest"> QTY: ${ssrInterpolate(item.quantity)}</span><span class="text-sm font-black italic">${ssrInterpolate(formatPrice(item.price * item.quantity))}</span></div></div></div>`);
      });
      _push(`<!--]--></div><div class="border-t-2 border-black pt-8 space-y-4"><div class="flex justify-between text-[10px] font-bold tracking-widest text-gray-400"><span>Subtotal</span><span>${ssrInterpolate(formatPrice(__props.subtotal))}</span></div><div class="flex justify-between text-[10px] font-bold tracking-widest text-gray-400"><span>Shipping</span><span class="text-black italic font-black">${ssrInterpolate(__props.shippingPrice > 0 ? formatPrice(__props.shippingPrice) : "FREE")}</span></div><div class="flex justify-between items-end pt-6"><span class="text-[11px] font-black tracking-[0.4em]">Total</span><div class="text-right"><span class="text-4xl font-black italic tracking-tighter leading-none">${ssrInterpolate(formatPrice(__props.total))}</span></div></div></div><div class="mt-12 p-4 border border-black border-dashed text-[8px] font-bold text-gray-400 tracking-widest"> * TAXES AND DUTIES INCLUDED. SECURE CHECKOUT. </div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/Commerce/Checkout/Partials/OrderSummary.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
