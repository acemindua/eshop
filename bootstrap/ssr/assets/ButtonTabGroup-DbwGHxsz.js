import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderSlot } from "vue/server-renderer";
const _sfc_main = {
  __name: "ButtonTabGroup",
  __ssrInlineRender: true,
  props: {
    selected: Boolean,
    hasError: Boolean
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        type: "button",
        class: ["text-sm relative font-medium focus:outline-none p-2 mr-2 px-2 border-b-2 duration-150 transition -bottom-[1px]", [
          __props.selected ? "text-indigo-600 border-indigo-600" : "text-gray-500  border-transparent hover:border-gray-300 hover:text-gray-800",
          __props.hasError && !__props.selected ? "border-b-2 border-red-500 text-red-600" : ""
        ]]
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</button>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/UI/Buttons/Admin/ButtonTabGroup.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
