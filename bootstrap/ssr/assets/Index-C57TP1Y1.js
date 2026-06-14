import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./DefaultLayout-DkxO0_wl.js";
import PopularProducts from "./PopularProducts-w3Nfb6j8.js";
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
import "./LangSwitcher-BpdYRBp1.js";
import "@headlessui/vue";
import "./useLocales-sgag9Abd.js";
import "@tabler/icons-vue";
import "./ApplicationLogo-CSNe_4RD.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./CartButton-i1aDL68u.js";
import "./VarDump-DqvrPBoK.js";
import "./UserLoginRegisterForm-DImQWDi_.js";
import "./AuthModal-BV8YJLyF.js";
import "./TextInput-D87biKav.js";
import "./InputError-Cp3nFeNd.js";
import "./Breadcrumbs-DKsddhuk.js";
import "./useApiResourceService-D0zlI-JQ.js";
import "axios";
import "./ProductCard-2s9tQvH7.js";
import "./BuyButton-JQnkdb_2.js";
import "./QuantityStatus-Wz7Unz6U.js";
import "./StatsRating-Cjhsk8Tq.js";
import "./StarRating-BIiPcL0U.js";
import "./ProductPrice-BQZjVJ64.js";
import "./SkeletonProductCard-DC70LTym.js";
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
