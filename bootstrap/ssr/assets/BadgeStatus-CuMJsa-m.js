import { createVNode, resolveDynamicComponent, useSSRContext, computed, mergeProps } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderVNode } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main$1 = {
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Pagination.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const Pagination = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main = {
  __name: "BadgeStatus",
  __ssrInlineRender: true,
  props: {
    active: [Number, Boolean]
  },
  setup(__props) {
    const props = __props;
    const classes = computed(
      () => props.active ? "bg-green-50 border-green-200 text-green-600" : "bg-slate-50 border-slate-200 text-slate-600"
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["inline-block px-4 border rounded-lg text-center text-xs py-1", classes.value]
      }, _attrs))}>`);
      if (__props.active) {
        _push(`<span> Active </span>`);
      } else {
        _push(`<span> Disabled </span>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/UI/Badge/BadgeStatus.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  Pagination as P,
  _sfc_main as _
};
