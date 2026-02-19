import { unref, mergeProps, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass } from "vue/server-renderer";
import { Switch } from "@headlessui/vue";
const _sfc_main = {
  __name: "CheckBoxSwitcher",
  __ssrInlineRender: true,
  props: ["modelValue"],
  emits: ["update:modelValue", "change"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    function onUpdate(value) {
      emit("update:modelValue", value);
      emit("change", value);
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Switch), mergeProps({
        modelValue: __props.modelValue,
        "onUpdate:modelValue": onUpdate,
        class: [__props.modelValue ? "bg-blue-600" : "bg-gray-200", "relative inline-flex h-6 w-11 items-center rounded-full z-0"]
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="sr-only"${_scopeId}>Enable toggle</span><span class="${ssrRenderClass([__props.modelValue ? "translate-x-6" : "translate-x-1", "inline-block h-4 w-4 transform rounded-full bg-white transition"])}"${_scopeId}></span>`);
          } else {
            return [
              createVNode("span", { class: "sr-only" }, "Enable toggle"),
              createVNode("span", {
                class: [__props.modelValue ? "translate-x-6" : "translate-x-1", "inline-block h-4 w-4 transform rounded-full bg-white transition"]
              }, null, 2)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/UI/CheckBoxSwitcher.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
