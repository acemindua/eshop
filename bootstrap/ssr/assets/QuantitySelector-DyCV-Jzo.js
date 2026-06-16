import { mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrIncludeBooleanAttr, ssrRenderComponent, ssrRenderAttr } from "vue/server-renderer";
import { IconMinus, IconPlus } from "@tabler/icons-vue";
const _sfc_main = {
  __name: "QuantitySelector",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: Number, required: true },
    max: { type: Number, default: 99 }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center border border-gray-300 rounded-lg h-12 bg-white shadow-sm w-max" }, _attrs))}><button aria-label="Зменшити кількість" class="px-4 h-full hover:bg-gray-100 transition-colors disabled:opacity-30"${ssrIncludeBooleanAttr(__props.modelValue <= 1) ? " disabled" : ""}>`);
      _push(ssrRenderComponent(unref(IconMinus), {
        size: 18,
        "stroke-width": "2"
      }, null, _parent));
      _push(`</button><input type="number"${ssrRenderAttr("value", __props.modelValue)} readonly class="w-14 text-center border-none bg-transparent font-bold text-lg focus:ring-0 outline-none"><button aria-label="Збільшити кількість" class="px-4 h-full hover:bg-gray-100 transition-colors disabled:opacity-30"${ssrIncludeBooleanAttr(__props.modelValue >= __props.max) ? " disabled" : ""}>`);
      _push(ssrRenderComponent(unref(IconPlus), {
        size: 18,
        "stroke-width": "2"
      }, null, _parent));
      _push(`</button></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/Commerce/Components/View/QuantitySelector.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
