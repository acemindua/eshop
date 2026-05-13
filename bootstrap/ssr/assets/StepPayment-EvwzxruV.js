import { computed, mergeProps, createVNode, resolveDynamicComponent, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderVNode, ssrRenderComponent, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { IconLock, IconChevronLeft, IconCircleCheck, IconCreditCard, IconReceipt2, IconCash } from "@tabler/icons-vue";
const _sfc_main = {
  __name: "StepPayment",
  __ssrInlineRender: true,
  props: {
    form: Object,
    paymentMethods: Array
  },
  emits: ["submit", "back"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const isStepValid = computed(() => !!props.form.payment_method);
    const getIcon = (code) => {
      switch (code) {
        case "cash":
          return IconCash;
        case "invoice":
          return IconReceipt2;
        default:
          return IconCreditCard;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-12 py-4 font-['Exo_2'] animate-in fade-in slide-in-from-right-4 duration-700 text-black" }, _attrs))}><header class="flex flex-col border-b border-black pb-8 gap-2"><h2 class="text-3xl font-black uppercase tracking-tighter italic"> 03. ${ssrInterpolate(_ctx.$t("Payment"))}</h2><p class="text-gray-500 text-[10px] font-bold tracking-widest uppercase">${ssrInterpolate(_ctx.$t("Select your preferred payment method"))}</p></header><div class="grid grid-cols-1 gap-4"><!--[-->`);
      ssrRenderList(__props.paymentMethods, (method) => {
        _push(`<div class="${ssrRenderClass([__props.form.payment_method === method.code ? "border-black ring-1 ring-black bg-zinc-50" : "border-gray-100 hover:border-black", "group relative flex items-center justify-between p-6 border-2 transition-all duration-300 cursor-pointer bg-white"])}"><div class="flex items-center gap-6"><div class="w-5 h-5 border-2 border-black flex items-center justify-center transition-colors">`);
        if (__props.form.payment_method === method.code) {
          _push(`<div class="w-2.5 h-2.5 bg-black"></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="flex flex-col"><span class="text-[11px] font-black uppercase tracking-[0.2em]">${ssrInterpolate(method.label)}</span><span class="text-[9px] text-gray-400 uppercase font-bold mt-1 tracking-wider">${ssrInterpolate(method.description)}</span></div></div><div class="text-black opacity-40 group-hover:opacity-100 transition-opacity">`);
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(getIcon(method.code)), {
          size: "24",
          "stroke-width": "1.5"
        }, null), _parent);
        _push(`</div></div>`);
      });
      _push(`<!--]-->`);
      if (__props.form.errors.payment_method) {
        _push(`<p class="text-red-500 text-[10px] font-bold uppercase mt-2">${ssrInterpolate(_ctx.$t(__props.form.errors.payment_method))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="flex items-center justify-center gap-4 py-6 border-y border-dashed border-gray-200 opacity-60">`);
      _push(ssrRenderComponent(unref(IconLock), {
        size: "16",
        class: "text-black"
      }, null, _parent));
      _push(`<p class="text-[9px] font-black uppercase tracking-[0.2em]">${ssrInterpolate(_ctx.$t("Secure encrypted checkout"))}</p></div><footer class="pt-6 flex flex-col gap-6"><div class="flex justify-between items-center gap-4"><button type="button"${ssrIncludeBooleanAttr(__props.form.processing) ? " disabled" : ""} class="group flex items-center gap-4 px-6 py-6 border border-black/10 hover:border-black transition-all duration-300 disabled:opacity-30">`);
      _push(ssrRenderComponent(unref(IconChevronLeft), {
        size: "20",
        class: "group-hover:-translate-x-1 transition-transform"
      }, null, _parent));
      _push(`<span class="text-[11px] font-black uppercase tracking-[0.3em]">${ssrInterpolate(_ctx.$t("Back"))}</span></button><button type="button"${ssrIncludeBooleanAttr(!isStepValid.value || __props.form.processing) ? " disabled" : ""} class="group flex-grow flex items-center justify-between gap-12 bg-black text-white pl-10 pr-6 py-6 hover:bg-zinc-800 transition-all duration-300 disabled:bg-gray-200 disabled:cursor-not-allowed"><span class="text-[11px] font-black uppercase tracking-[0.3em]">${ssrInterpolate(__props.form.processing ? _ctx.$t("Processing...") : _ctx.$t("Confirm Order"))}</span>`);
      if (!__props.form.processing) {
        _push(`<div class="hidden md:block w-12 h-px bg-white/30 group-hover:w-16 transition-all duration-500"></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.form.processing) {
        _push(`<div class="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>`);
      } else {
        _push(ssrRenderComponent(unref(IconCircleCheck), { size: "20" }, null, _parent));
      }
      _push(`</button></div><p class="text-center text-[8px] font-black uppercase tracking-[0.6em] text-gray-300 italic"> Step 03 / 03 </p></footer></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/Commerce/Checkout/Steps/StepPayment.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
