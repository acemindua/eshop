import { computed, mergeProps, createVNode, resolveDynamicComponent, unref, withCtx, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderVNode, ssrInterpolate } from "vue/server-renderer";
import { u as usePage, l as link_default } from "../ssr.js";
import "@tabler/icons-vue";
const _sfc_main = {
  __name: "Breadcrumbs",
  __ssrInlineRender: true,
  setup(__props) {
    const breadcrumbs = computed(() => usePage().props.breadcrumbs || []);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<nav${ssrRenderAttrs(mergeProps({
        "aria-label": "breadcrumb",
        class: "text-xs"
      }, _attrs))}>`);
      if (breadcrumbs.value.length) {
        _push(`<ol class="breadcrumb breadcrumb-arrows flex"><!--[-->`);
        ssrRenderList(breadcrumbs.value, (page, index) => {
          _push(`<li class="breadcrumb-item flex items-center">`);
          if (index > 0) {
            _push(`<span class="px-2 text-slate-500 flex items-center"> ‹ </span>`);
          } else {
            _push(`<!---->`);
          }
          ssrRenderVNode(_push, createVNode(resolveDynamicComponent(page.current ? "span" : unref(link_default)), {
            href: !page.current ? page.url : void 0,
            class: ["flex items-center", {
              "text-slate-500": page.current,
              "hover:underline": !page.current
            }]
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<span${_scopeId}>${ssrInterpolate(page.title)}</span>`);
              } else {
                return [
                  createVNode("span", null, toDisplayString(page.title), 1)
                ];
              }
            }),
            _: 2
          }), _parent);
          _push(`</li>`);
        });
        _push(`<!--]--></ol>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</nav>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Breadcrumbs.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
