import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./DefaultLayout-B74gfzmX.js";
import PopularProducts from "./PopularProducts-BEiqbSSr.js";
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
import "./LangSwitcher-e9tQy0N1.js";
import "@headlessui/vue";
import "./useLocales-sgag9Abd.js";
import "@tabler/icons-vue";
import "./ApplicationLogo-CSNe_4RD.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./CartButton-CHDIERBZ.js";
import "./VarDump-DqvrPBoK.js";
import "./UserLoginRegisterForm-LzyRbNgH.js";
import "./AuthModal-CIdPxOdr.js";
import "./TextInput-5OXx1Hvj.js";
import "./InputLabel-BSWPuOQO.js";
import "./InputError-Cp3nFeNd.js";
import "./Breadcrumbs-DKsddhuk.js";
import "./useApiResourceService-BAm4_Pfc.js";
import "axios";
import "./ProductCard-COylpu_H.js";
import "./BuyButton-DUOvnVt-.js";
import "./QuantityStatus-BjP6BbJj.js";
import "./StatsRating-CKI7axxr.js";
import "./StarRating-BIiPcL0U.js";
import "./ProductPrice-B0kbdA1m.js";
import "./SkeletonProductCard-0R0RYbYz.js";
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
