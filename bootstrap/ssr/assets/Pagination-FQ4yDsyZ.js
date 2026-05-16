import { createVNode, resolveDynamicComponent, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderVNode } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  name: "Pagination",
  props: {
    links: Object,
    to: Number,
    from: Number,
    total: Number,
    anchor: {
      type: String,
      default: ""
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  if ($props.links.length > 3) {
    _push(`<div${ssrRenderAttrs(_attrs)}><div class="brounded-md"><div class="flex items-center justify-between text-xs text-dark py-3 text-slate-600"><div> Показано від ${ssrInterpolate($props.from)} до ${ssrInterpolate($props.to)} з ${ssrInterpolate($props.total)} позицій </div><div class="flex items-center space-x-2 text-sm"><!--[-->`);
    ssrRenderList($props.links, (link) => {
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(link.url ? "Link" : "span"), {
        key: link,
        href: `${link.url}${$props.anchor}`,
        class: ["px-3 py-2 leading-none duration-300", {
          "hover:text-violet-600": link.url,
          "text-gray-400 hover:border-transparent hover:text-gray-400": !link.url,
          "font-bold bg-gray-800 text-white rounded hover:text-white": link.active
        }]
      }, null), _parent);
    });
    _push(`<!--]--></div></div></div></div>`);
  } else {
    _push(`<!---->`);
  }
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Pagination.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Pagination = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  Pagination as P
};
