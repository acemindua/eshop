import { computed, mergeProps, createVNode, resolveDynamicComponent, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderList, ssrRenderClass, ssrRenderVNode, ssrInterpolate, ssrRenderSlot, ssrRenderComponent } from "vue/server-renderer";
import { IconUserCheck, IconTruckDelivery, IconCreditCard, IconCircleCheckFilled } from "@tabler/icons-vue";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "StepPayment",
  __ssrInlineRender: true,
  props: {
    currentStep: { type: Number, default: 1 }
  },
  setup(__props) {
    const props = __props;
    const steps = [
      { id: 1, name: "Контакти", icon: IconUserCheck },
      { id: 2, name: "Доставка", icon: IconTruckDelivery },
      { id: 3, name: "Оплата", icon: IconCreditCard }
    ];
    const progressWidth = computed(() => {
      return (props.currentStep - 1) / (steps.length - 1) * 100 + "%";
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "checkout-layout" }, _attrs))} data-v-6ea9d663><div class="relative mb-12" data-v-6ea9d663><div class="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 z-0" data-v-6ea9d663></div><div class="absolute top-1/2 left-0 h-0.5 bg-blue-600 -translate-y-1/2 z-0 transition-all duration-500 ease-in-out" style="${ssrRenderStyle({ width: progressWidth.value })}" data-v-6ea9d663></div><div class="relative z-10 flex justify-between" data-v-6ea9d663><!--[-->`);
      ssrRenderList(steps, (step) => {
        _push(`<div class="flex flex-col items-center" data-v-6ea9d663><div class="${ssrRenderClass([
          "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 border-4",
          __props.currentStep > step.id ? "bg-blue-600 border-blue-100 text-white" : __props.currentStep === step.id ? "bg-white border-blue-600 text-blue-600 shadow-lg shadow-blue-100" : "bg-white border-gray-100 text-gray-400"
        ])}" data-v-6ea9d663>`);
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(
          __props.currentStep > step.id ? unref(IconCircleCheckFilled) : step.icon
        ), { size: "22" }, null), _parent);
        _push(`</div><span class="${ssrRenderClass([
          "mt-3 text-xs font-bold uppercase tracking-wider transition-colors duration-300",
          __props.currentStep >= step.id ? "text-gray-900" : "text-gray-400"
        ])}" data-v-6ea9d663>${ssrInterpolate(step.name)}</span></div>`);
      });
      _push(`<!--]--></div></div><div class="relative overflow-hidden" data-v-6ea9d663><div class="bg-white border border-gray-100 rounded-3xl p-6 md:p-10 shadow-xl shadow-gray-500/5" data-v-6ea9d663>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div><div class="mt-8 flex flex-wrap justify-center gap-6 text-gray-400" data-v-6ea9d663><div class="flex items-center gap-2 text-xs font-medium" data-v-6ea9d663><div class="w-2 h-2 bg-green-500 rounded-full animate-pulse" data-v-6ea9d663></div> Захищене з&#39;єднання SSL </div><div class="flex items-center gap-2 text-xs font-medium" data-v-6ea9d663>`);
      _push(ssrRenderComponent(unref(IconCircleCheckFilled), {
        size: "14",
        class: "text-gray-300"
      }, null, _parent));
      _push(` Офіційна гарантія </div><div class="flex items-center gap-2 text-xs font-medium" data-v-6ea9d663>`);
      _push(ssrRenderComponent(unref(IconCircleCheckFilled), {
        size: "14",
        class: "text-gray-300"
      }, null, _parent));
      _push(` Обмін та повернення 14 днів </div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/Commerce/Steps/StepPayment.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const StepPayment = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6ea9d663"]]);
export {
  StepPayment as default
};
