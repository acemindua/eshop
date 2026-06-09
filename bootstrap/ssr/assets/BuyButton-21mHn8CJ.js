import { ref, computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { c as usePage } from "../ssr.js";
import { IconShoppingBagCheck, IconShoppingBag } from "@tabler/icons-vue";
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
        class: [
          "w-14 h-14 rounded-full flex items-center justify-center  transition-all duration-300 focus:outline-none",
          isInCart.value ? "bg-green-50 cursor-default text-green-600 animate-bounce-once" : "bg-green-500 cursor-pointer text-white"
        ]
      }, _attrs))} data-v-46d1e63f>`);
      if (isProcessing.value) {
        _push(`<div role="status" data-v-46d1e63f><svg aria-hidden="true" class="w-6 h-6 text-neutral-tertiary animate-spin fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-46d1e63f><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" data-v-46d1e63f></path><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" data-v-46d1e63f></path></svg><span class="sr-only" data-v-46d1e63f>Loading...</span></div>`);
      } else {
        _push(`<span class="flex items-center justify-center transition-transform duration-300 transform hover:scale-110" data-v-46d1e63f>`);
        if (isInCart.value) {
          _push(ssrRenderComponent(unref(IconShoppingBagCheck), {
            stroke: 2,
            class: "w-8 h-8 text-green-600"
          }, null, _parent));
        } else {
          _push(ssrRenderComponent(unref(IconShoppingBag), {
            stroke: 2,
            class: "w-8 h-8"
          }, null, _parent));
        }
        _push(`</span>`);
      }
      _push(`</button>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/Commerce/Components/BuyButton.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const BuyButton = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-46d1e63f"]]);
export {
  BuyButton as default
};
