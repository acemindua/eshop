import { computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { b as usePage } from "../ssr.js";
import { IconCheck, IconShoppingBag } from "@tabler/icons-vue";
const _sfc_main = {
  __name: "ButtonBuy",
  __ssrInlineRender: true,
  props: {
    id: { type: Number, required: true },
    title: { type: String },
    price: { type: [Number, String] },
    qty: { type: Number, required: true, default: 1 }
  },
  setup(__props) {
    const props = __props;
    const page = usePage();
    const isInCart = computed(() => {
      const items = page.props.cart?.items || {};
      return !!items[props.id];
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        type: "button",
        class: [
          "px-6 py-3 rounded-lg inline-flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 shadow-sm font-['Exo_2'] uppercase tracking-wider text-sm font-bold",
          isInCart.value ? "bg-green-600 text-white shadow-green-100" : "bg-black text-white hover:bg-gray-800"
        ]
      }, _attrs))}>`);
      if (isInCart.value) {
        _push(ssrRenderComponent(unref(IconCheck), {
          stroke: 2,
          size: 24
        }, null, _parent));
      } else {
        _push(ssrRenderComponent(unref(IconShoppingBag), {
          stroke: 1.5,
          size: 24
        }, null, _parent));
      }
      _push(`<span>${ssrInterpolate(isInCart.value ? _ctx.$t("In Cart") : _ctx.$t("Buy"))}</span></button>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Public/Commerce/ButtonBuy.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
