import { mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { w as wTransChoice } from "../ssr.js";
import { _ as _sfc_main$1 } from "./StarRating-BIiPcL0U.js";
import { IconMessage } from "@tabler/icons-vue";
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
  __name: "StatsRating",
  __ssrInlineRender: true,
  props: {
    averageReviews: Object
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "text-sm" }, _attrs))}>`);
      if (__props.averageReviews.rating) {
        _push(`<div class="flex items-center gap-2 group cursor-pointer">`);
        _push(ssrRenderComponent(_sfc_main$1, {
          "model-value": __props.averageReviews.rating,
          size: 14,
          "read-only": ""
        }, null, _parent));
        _push(`<span class="text-gray-300">•</span><div class="flex items-center gap-1 text-gray-600 transition">`);
        _push(ssrRenderComponent(unref(IconMessage), {
          stroke: 1,
          class: "w-4 h-4"
        }, null, _parent));
        _push(`<span>${ssrInterpolate(unref(wTransChoice)("reviews", __props.averageReviews.total, {
          count: __props.averageReviews.total
        }))}</span></div></div>`);
      } else {
        _push(`<div class="text-gray-400">${ssrInterpolate(_ctx.$t("Be the first to review"))}</div>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/Commerce/Components/View/StatsRating.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
