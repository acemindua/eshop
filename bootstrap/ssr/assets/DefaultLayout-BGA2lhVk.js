import { computed, createVNode, resolveDynamicComponent, withCtx, renderSlot, useSSRContext } from "vue";
import { ssrRenderVNode, ssrRenderSlot } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./Layout-C8l94jH5.js";
const _sfc_main = {
  __name: "DefaultLayout",
  __ssrInlineRender: true,
  setup(__props) {
    const layout = computed(() => {
      return _sfc_main$1;
    });
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(layout.value), _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }), _parent);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/Public/DefaultLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
