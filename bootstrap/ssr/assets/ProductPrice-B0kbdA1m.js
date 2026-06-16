import { computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
const _sfc_main = {
  __name: "ProductPrice",
  __ssrInlineRender: true,
  props: {
    q: { type: Number, required: true },
    hasDiscount: { type: Boolean, default: false },
    price: {
      type: Object,
      required: true,
      validator: (p) => "price" in p
    }
  },
  setup(__props) {
    const props = __props;
    const priceClass = computed(() => {
      if (props.q <= 0) return "text-gray-400";
      return props.hasDiscount ? "text-red-500" : "text-gray-900";
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col justify-end" }, _attrs))}>`);
      if (__props.hasDiscount && __props.q > 0) {
        _push(`<span class="text-xs text-gray-400 line-through">${ssrInterpolate(_ctx.$formatPrice(__props.price.old_price))}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<span class="${ssrRenderClass([priceClass.value, "text-lg md:text-xl transition-colors font-semibold"])}">${ssrInterpolate(_ctx.$formatPrice(__props.price.price))}</span></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/Commerce/Components/View/ProductPrice.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
