import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrIncludeBooleanAttr, ssrRenderClass } from "vue/server-renderer";
const _sfc_main = {
  __name: "Pagination",
  __ssrInlineRender: true,
  props: {
    links: Array,
    from: Number,
    to: Number,
    total: Number
  },
  emits: ["change"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.links && __props.links.length > 3) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center justify-between py-3 text-xs text-slate-600" }, _attrs))}><div>Показано від ${ssrInterpolate(__props.from)} до ${ssrInterpolate(__props.to)} з ${ssrInterpolate(__props.total)} позицій</div><div class="flex items-center space-x-1"><!--[-->`);
        ssrRenderList(__props.links, (link, index) => {
          _push(`<button${ssrIncludeBooleanAttr(!link.url || link.active) ? " disabled" : ""} class="${ssrRenderClass([{
            "bg-gray-800 text-white font-bold": link.active,
            "hover:border-violet-600 hover:text-violet-600": link.url && !link.active,
            "text-gray-300 cursor-not-allowed": !link.url
          }, "px-3 py-2 border rounded duration-300"])}">${link.label ?? ""}</button>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/Commerce/Pagination.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
