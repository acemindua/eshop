import { computed, mergeProps, createVNode, resolveDynamicComponent, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderList, ssrIncludeBooleanAttr, ssrRenderClass, ssrRenderVNode, ssrInterpolate, ssrRenderSlot, ssrRenderComponent } from "vue/server-renderer";
import { IconUserCheck, IconTruckDelivery, IconCreditCard, IconCircleCheckFilled } from "@tabler/icons-vue";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "CheckoutLayout",
  __ssrInlineRender: true,
  props: {
    currentStep: { type: Number, default: 1 }
  },
  emits: ["goToStep"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const steps = [
      { id: 1, name: "Контакти", icon: IconUserCheck },
      { id: 2, name: "Доставка", icon: IconTruckDelivery },
      { id: 3, name: "Оплата", icon: IconCreditCard }
    ];
    const progressWidth = computed(
      () => `${(props.currentStep - 1) / (steps.length - 1) * 100}%`
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "checkout-layout max-w-3xl mx-auto" }, _attrs))} data-v-9d8b5b59><nav class="relative mb-12 px-4" aria-label="Progress" data-v-9d8b5b59><div class="absolute top-6 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2" aria-hidden="true" data-v-9d8b5b59></div><div class="absolute top-6 left-0 h-0.5 bg-blue-600 -translate-y-1/2 transition-all duration-500 ease-in-out" style="${ssrRenderStyle({ width: progressWidth.value })}" data-v-9d8b5b59></div><ol class="relative z-10 flex justify-between" data-v-9d8b5b59><!--[-->`);
      ssrRenderList(steps, (step) => {
        _push(`<li class="flex flex-col items-center" data-v-9d8b5b59><button type="button"${ssrIncludeBooleanAttr(step.id >= __props.currentStep) ? " disabled" : ""} class="${ssrRenderClass([
          "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 border-4 outline-none",
          __props.currentStep > step.id ? "bg-blue-600 border-blue-100 text-white cursor-pointer" : __props.currentStep === step.id ? "bg-white border-blue-600 text-blue-600 shadow-lg shadow-blue-100 scale-110" : "bg-white border-gray-100 text-gray-400 cursor-default"
        ])}" data-v-9d8b5b59>`);
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(
          __props.currentStep > step.id ? unref(IconCircleCheckFilled) : step.icon
        ), {
          size: "22",
          "stroke-width": "2.5"
        }, null), _parent);
        _push(`</button><span class="${ssrRenderClass([
          "mt-3 text-[10px] font-black uppercase tracking-[0.15em] transition-colors duration-300",
          __props.currentStep >= step.id ? "text-gray-900" : "text-gray-400"
        ])}" data-v-9d8b5b59>${ssrInterpolate(step.name)}</span></li>`);
      });
      _push(`<!--]--></ol></nav><main class="relative" data-v-9d8b5b59><div class="bg-white border border-gray-100 rounded-[2.5rem] p-6 md:p-10 shadow-2xl shadow-gray-200/50" data-v-9d8b5b59>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></main><footer class="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-4 border-t border-gray-100 pt-8" data-v-9d8b5b59><!--[-->`);
      ssrRenderList([
        { text: "Захищене SSL з'єднання", icon: "bg-green-500" },
        { text: "Офіційна гарантія" },
        { text: "14 днів на повернення" }
      ], (badge, index) => {
        _push(`<div class="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400" data-v-9d8b5b59>`);
        if (badge.icon) {
          _push(`<div class="${ssrRenderClass([
            badge.icon,
            "w-1.5 h-1.5 rounded-full animate-pulse"
          ])}" data-v-9d8b5b59></div>`);
        } else {
          _push(ssrRenderComponent(unref(IconCircleCheckFilled), {
            size: "14",
            class: "text-gray-200"
          }, null, _parent));
        }
        _push(` ${ssrInterpolate(badge.text)}</div>`);
      });
      _push(`<!--]--></footer></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/Commerce/Partials/CheckoutLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const CheckoutLayout = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9d8b5b59"]]);
export {
  CheckoutLayout as default
};
