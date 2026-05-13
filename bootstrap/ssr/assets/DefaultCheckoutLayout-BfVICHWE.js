import { mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderSlot } from "vue/server-renderer";
import { t as trans } from "../ssr.js";
import { IconCheck } from "@tabler/icons-vue";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "@vue/shared";
import "@vue/compiler-ssr";
import "node:stream";
import "@inertiajs/core";
import "lodash-es";
import "laravel-precognition";
import "@inertiajs/core/server";
import "pinia";
import "@floating-ui/dom";
const _sfc_main = {
  __name: "DefaultCheckoutLayout",
  __ssrInlineRender: true,
  props: {
    currentStep: { type: Number, default: 1 }
  },
  emits: ["goToStep"],
  setup(__props, { emit: __emit }) {
    const steps = [
      { id: 1, name: trans("Contacts") },
      { id: 2, name: trans("Delivery") },
      { id: 3, name: trans("Pay") }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full bg-white font-['Exo_2'] uppercase" }, _attrs))} data-v-71981d5c><nav class="border-b border-black py-8 px-6 md:px-12 bg-zinc-50" aria-label="Progress" data-v-71981d5c><ol class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-12 w-full max-w-7xl mx-auto" data-v-71981d5c><!--[-->`);
      ssrRenderList(steps, (step, index) => {
        _push(`<li class="relative flex flex-1 items-center w-full last:flex-none" data-v-71981d5c><div class="${ssrRenderClass([[step.id < __props.currentStep ? "cursor-pointer hover:opacity-70" : "cursor-default"], "flex items-center gap-4 transition-all duration-300"])}" data-v-71981d5c><div class="${ssrRenderClass([
          "w-10 h-10 flex items-center justify-center border-2 transition-all duration-500 font-black italic text-lg",
          __props.currentStep > step.id ? "bg-black border-black text-white" : __props.currentStep === step.id ? "border-black text-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" : "border-zinc-200 text-zinc-300 bg-transparent"
        ])}" data-v-71981d5c>`);
        if (__props.currentStep > step.id) {
          _push(ssrRenderComponent(unref(IconCheck), {
            size: "20",
            "stroke-width": "4"
          }, null, _parent));
        } else {
          _push(`<span data-v-71981d5c>${ssrInterpolate(step.id)}</span>`);
        }
        _push(`</div><div class="flex flex-col" data-v-71981d5c><span class="${ssrRenderClass([
          "text-[10px] font-black tracking-[0.3em] transition-colors italic leading-none",
          __props.currentStep >= step.id ? "text-black" : "text-zinc-300"
        ])}" data-v-71981d5c>${ssrInterpolate(step.name)}</span>`);
        if (__props.currentStep === step.id) {
          _push(`<span class="text-[8px] font-bold text-gray-400 mt-1 tracking-widest" data-v-71981d5c> IN PROGRESS </span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
        if (index !== steps.length - 1) {
          _push(`<div class="hidden md:block flex-1 mx-8 h-[2px] bg-zinc-200 overflow-hidden" data-v-71981d5c><div class="h-full bg-black transition-all duration-1000 ease-in-out" style="${ssrRenderStyle({ width: __props.currentStep > step.id ? "100%" : "0%" })}" data-v-71981d5c></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</li>`);
      });
      _push(`<!--]--></ol></nav><main class="w-full" data-v-71981d5c>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main><footer class="border-t border-black p-8 md:p-16 bg-white" data-v-71981d5c><div class="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8" data-v-71981d5c><!--[-->`);
      ssrRenderList(4, (i) => {
        _push(`<div class="space-y-2 opacity-20 grayscale hover:opacity-100 transition-all duration-500" data-v-71981d5c><div class="h-8 w-full bg-zinc-200 border border-black/10 animate-pulse" data-v-71981d5c></div></div>`);
      });
      _push(`<!--]--></div></footer></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/Commerce/Checkout/layout/DefaultCheckoutLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Layout = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-71981d5c"]]);
export {
  Layout as default
};
