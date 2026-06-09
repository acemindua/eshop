import { mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { l as link_default } from "../ssr.js";
import BuyButton from "./BuyButton-21mHn8CJ.js";
import "@vue/shared";
import "@vue/compiler-ssr";
import "node:stream";
import "@inertiajs/core";
import "lodash-es";
import "laravel-precognition";
import "@inertiajs/core/server";
import "pinia";
import "@floating-ui/dom";
import "@tabler/icons-vue";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "ProductCard",
  __ssrInlineRender: true,
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white border border-gray-100 hover:border-gray-200 rounded-lg overflow-hidden relative group flex flex-col justify-between transition-all duration-300 h-full" }, _attrs))}><div class="bg-gray-50 w-full aspect-square md:h-[300px] md:aspect-auto flex items-center justify-center overflow-hidden">`);
      if (__props.data.images?.length) {
        _push(`<img${ssrRenderAttr("src", __props.data.images[0].url)}${ssrRenderAttr("alt", __props.data.title)} class="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105">`);
      } else {
        _push(`<div class="text-gray-300 flex items-center justify-center h-full"><svg class="w-12 h-12 stroke-[1.2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V6.75zm.375 0a.375 0 11-.75 0 .375 0 01.75 0z"></path></svg></div>`);
      }
      _push(`</div><div class="p-2 flex flex-col space-y-2 flex-grow justify-between relative z-20 pointer-events-none"><h3 class="text-sm font-medium text-gray-800 transition-colors group-hover:text-brand group-hover:underline line-clamp-2 h-12">${ssrInterpolate(__props.data.title)}</h3><div class="flex items-center justify-between pt-2 min-h-[44px] pointer-events-auto"><div class="flex flex-col justify-end">`);
      if (__props.data.old_price && Number(__props.data.old_price) > Number(__props.data.price)) {
        _push(`<span class="text-xs text-gray-400 line-through leading-tight">${ssrInterpolate(__props.data.old_price)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<span class="text-lg font-bold text-black font-[&#39;Exo_2&#39;] leading-none">${ssrInterpolate(__props.data.price)}</span></div>`);
      _push(ssrRenderComponent(BuyButton, {
        data: __props.data,
        class: "scale-90 origin-right relative z-30"
      }, null, _parent));
      _push(`</div></div>`);
      if (__props.data.slug) {
        _push(ssrRenderComponent(unref(link_default), {
          href: _ctx.route("page.show", __props.data.slug),
          class: "absolute inset-0 z-10",
          "aria-label": "Переглянути товар"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/Commerce/Components/ProductCard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
