import { computed, mergeProps, createVNode, resolveDynamicComponent, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderVNode, ssrInterpolate } from "vue/server-renderer";
import { IconChecks, IconCancel } from "@tabler/icons-vue";
const _sfc_main = {
  __name: "QuantityStatus",
  __ssrInlineRender: true,
  props: {
    q: {
      type: Number,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const status = computed(() => {
      const isInStock = props.q > 0;
      return {
        icon: isInStock ? IconChecks : IconCancel,
        label: isInStock ? "inStoke" : "Out of stock",
        textColor: isInStock ? "text-green-600" : "text-gray-400",
        iconColor: isInStock ? "text-green-600" : "text-gray-400"
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["flex items-center gap-1.5 text-xs font-medium", status.value.textColor]
      }, _attrs))}>`);
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(status.value.icon), {
        class: ["w-4 h-4", status.value.iconColor]
      }, null), _parent);
      _push(`<span>${ssrInterpolate(_ctx.$t(status.value.label))}</span></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/Commerce/Components/View/QuantityStatus.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
