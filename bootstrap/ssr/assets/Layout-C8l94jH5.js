import { defineComponent, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./UserLoginRegisterForm-tpsqiF-p.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Layout",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col w-full min-h-screen bg-gray-200 text-sm gap-2" }, _attrs))}><header class="bg-white p-4"><div class="w-full mx-auto"><nav><div class="hidden md:flex items-center gap-4">`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`</div></nav></div></header><main class="flex-grow px-2"><div class="w-full mx-auto">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></main><footer class="bg-white p-4"><div class="w-full mx-auto">#footer (Copyright/Info)</div></footer></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/Public/Landing/Layout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
