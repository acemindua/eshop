import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./DefaultLayout-DTeqHHYh.js";
import PopularProducts from "./PopularProducts-BqTToXX4.js";
import { useSSRContext } from "vue";
import "../ssr.js";
import "@vue/shared";
import "@vue/compiler-ssr";
import "node:stream";
import "@inertiajs/core";
import "lodash-es";
import "laravel-precognition";
import "@inertiajs/core/server";
import "pinia";
import "@floating-ui/dom";
import "./LangSwitcher-BIfY0gKc.js";
import "@headlessui/vue";
import "./useLocales-C-Tc7ETb.js";
import "@tabler/icons-vue";
import "./ApplicationLogo-CSNe_4RD.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./CartButton-CBNnYGs8.js";
import "./VarDump-DqvrPBoK.js";
import "./useApiResourceService-D0zlI-JQ.js";
import "axios";
import "./ProductCard-D_pkPyrN.js";
import "./BuyButton-Cz_goqjB.js";
import "./SkeletonProductCard-GKuLREIM.js";
import "swiper/element/bundle";
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: _sfc_main$1 }, {
  __name: "Index",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><section class="mb-8">`);
      _push(ssrRenderComponent(PopularProducts, null, null, _parent));
      _push(`</section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
