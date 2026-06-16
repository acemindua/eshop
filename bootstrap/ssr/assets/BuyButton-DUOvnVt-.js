import { ref, computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { b as usePage } from "../ssr.js";
import { IconLoader2, IconShoppingBagCheck, IconShoppingBag } from "@tabler/icons-vue";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "@vue/shared";
import "@vue/compiler-ssr";
import "node:stream";
import "@inertiajs/core";
import "lodash-es";
import "laravel-precognition";
import "@inertiajs/core/server";
import "pinia";
import "@floating-ui/dom";
const _sfc_main = {
  __name: "BuyButton",
  __ssrInlineRender: true,
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const page = usePage();
    const isProcessing = ref(false);
    const isInCart = computed(() => {
      const items = page.props.cart?.items || [];
      return items.some((item) => item.id === props.data.id);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        disabled: isProcessing.value || isInCart.value,
        class: ["relative overflow-hidden flex items-center justify-center gap-2 px-2.5 md:px-5 py-2.5 rounded-full transition-all duration-300 focus:outline-none font-bold text-sm shadow-sm", [
          isInCart.value ? "bg-gray-100 text-gray-600 cursor-default" : "bg-brand text-white hover:bg-brand-darkactive:scale-95"
        ]]
      }, _attrs))} data-v-f92948f5><div class="shine-effect" data-v-f92948f5></div>`);
      if (isProcessing.value) {
        _push(ssrRenderComponent(unref(IconLoader2), { class: "w-5 h-5 animate-spin" }, null, _parent));
      } else {
        _push(`<!--[-->`);
        if (isInCart.value) {
          _push(ssrRenderComponent(unref(IconShoppingBagCheck), {
            stroke: 2,
            class: "w-5 h-5"
          }, null, _parent));
        } else {
          _push(ssrRenderComponent(unref(IconShoppingBag), {
            stroke: 2,
            class: "w-5 h-5"
          }, null, _parent));
        }
        _push(`<!--]-->`);
      }
      _push(`<span class="hidden md:block" data-v-f92948f5>${ssrInterpolate(isInCart.value ? _ctx.$t("In Cart") : _ctx.$t("Buy"))}</span></button>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/Commerce/Components/BuyButton.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const BuyButton = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f92948f5"]]);
export {
  BuyButton as default
};
