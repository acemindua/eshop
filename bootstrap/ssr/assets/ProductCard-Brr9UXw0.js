import { computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrRenderComponent } from "vue/server-renderer";
import { l as link_default } from "../ssr.js";
import BuyButton from "./BuyButton-DurVeyzU.js";
import _sfc_main$3 from "./QuantityStatus-BjP6BbJj.js";
import _sfc_main$1 from "./StatsRating-8EdIqWFW.js";
import _sfc_main$2 from "./ProductPrice-B0kbdA1m.js";
import "@unhead/vue/server";
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
import "./StarRating-BIiPcL0U.js";
const _sfc_main = {
  __name: "ProductCard",
  __ssrInlineRender: true,
  props: {
    data: { type: Object, required: true }
  },
  setup(__props) {
    const props = __props;
    const imagesCount = computed(() => props.data?.images?.length || 0);
    const hasDiscount = computed(() => {
      const old = parseFloat(props.data?.old_price || 0);
      const curr = parseFloat(props.data?.price || 0);
      return old > curr && curr > 0;
    });
    const discountPercentage = computed(() => {
      if (!hasDiscount.value) return 0;
      const old = parseFloat(props.data.old_price);
      const curr = parseFloat(props.data.price);
      return Math.round((old - curr) / old * 100);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative group h-full w-full overflow-hidden border-r border-b p-4 bg-white" }, _attrs))}>`);
      if (hasDiscount.value && __props.data.quantity > 0) {
        _push(`<div class="absolute top-4 left-4 z-30 bg-red-500 text-white text-[10px] uppercase font-bold px-2 py-1 rounded-sm shadow-sm"><span>-${ssrInterpolate(discountPercentage.value)}%</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex flex-col"><div class="text-gray-300 flex items-center justify-center h-32 md:h-64 relative z-10 w-full">`);
      if (imagesCount.value > 0) {
        _push(`<!--[--><img${ssrRenderAttr("src", __props.data.images[0].url)}${ssrRenderAttr("alt", __props.data.title)} class="${ssrRenderClass([[
          imagesCount.value === 1 ? "relative" : "group-hover:opacity-0"
        ], "w-full h-full object-contain absolute inset-0 z-10 transition-all duration-700 ease-in-out"])}">`);
        if (imagesCount.value > 1) {
          _push(`<img${ssrRenderAttr("src", __props.data.images[1].url)}${ssrRenderAttr("alt", __props.data.title)} class="w-full h-full object-contain absolute inset-0 opacity-0 z-0 transition-all duration-700 ease-in-out group-hover:opacity-100 group-hover:z-10">`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><h3 class="mt-4 text-sm font-medium text-gray-800 group-hover:underline line-clamp-2 leading-5 h-10">${ssrInterpolate(__props.data.title)}</h3><div class="h-8 flex items-center">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        "average-reviews": __props.data.average_reviews || {}
      }, null, _parent));
      _push(`</div><div class="flex items-center h-12"><div class="flex flex-1 items-center">`);
      _push(ssrRenderComponent(_sfc_main$2, {
        q: __props.data.quantity || 0,
        "has-discount": hasDiscount.value,
        price: {
          price: __props.data.price,
          old_price: __props.data.old_price
        }
      }, null, _parent));
      _push(`</div><div class="flex items-center justify-end">`);
      if (__props.data.quantity > 0) {
        _push(ssrRenderComponent(BuyButton, {
          data: __props.data,
          class: "scale-90 origin-right relative z-30"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        q: __props.data.quantity || 0
      }, null, _parent));
      _push(`</div>`);
      if (__props.data.url) {
        _push(ssrRenderComponent(unref(link_default), {
          href: __props.data.url,
          class: "absolute inset-0 z-20",
          "aria-label": "View product"
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
