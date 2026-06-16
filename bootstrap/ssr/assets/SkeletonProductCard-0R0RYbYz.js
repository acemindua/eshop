import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "border-b border-r h-full p-4 flex flex-col" }, _attrs))}><div class="flex flex-col select-none pointer-events-none animate-pulse"><div class="bg-gray-100 w-full h-32 md:h-64 rounded-sm mb-4"><div class="w-full h-full bg-gray-200/70"></div></div><div class="space-y-2 mb-4"><div class="h-4 bg-gray-200 rounded-sm w-full"></div><div class="h-4 bg-gray-200 rounded-sm w-3/4"></div></div><div class="h-8 flex items-center mb-2"><div class="h-3 bg-gray-200 rounded-sm w-24"></div></div><div class="grid grid-cols-2 h-12 items-center"><div class="space-y-1.5"><div class="h-3 bg-gray-200 rounded-sm w-12"></div><div class="h-5 bg-gray-200 rounded-sm w-20"></div></div><div class="flex justify-end"><div class="w-24 h-9 bg-gray-200 rounded-sm scale-90 origin-right"></div></div></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/Commerce/Components/SkeletonProductCard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const SkeletonProductCard = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  SkeletonProductCard as default
};
