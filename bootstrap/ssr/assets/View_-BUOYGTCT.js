import { ref, computed, unref, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderAttr, ssrRenderList } from "vue/server-renderer";
import { _ as _sfc_main$3 } from "./ButtonBuy-DnE-dJYe.js";
import { M as MediaSlider, _ as _sfc_main$4, a as _sfc_main$5, b as _sfc_main$6 } from "./SeoMeta-DM-OmeWN.js";
import { _ as _sfc_main$2 } from "./StarRating-BIiPcL0U.js";
import { _ as _sfc_main$1 } from "./DefaultLayout-B74gfzmX.js";
import { IconMinus, IconPlus } from "@tabler/icons-vue";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
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
import "./ApplicationLogo-CSNe_4RD.js";
import "./CartButton-CHDIERBZ.js";
import "./VarDump-DqvrPBoK.js";
import "./UserLoginRegisterForm-LzyRbNgH.js";
import "./AuthModal-CIdPxOdr.js";
import "./TextInput-5OXx1Hvj.js";
import "./InputLabel-BSWPuOQO.js";
import "./InputError-Cp3nFeNd.js";
import "./Breadcrumbs-DKsddhuk.js";
const _sfc_main = /* @__PURE__ */ Object.assign({
  layout: _sfc_main$1
}, {
  __name: "View_",
  __ssrInlineRender: true,
  props: {
    data: Object
  },
  setup(__props) {
    const props = __props;
    const quantity = ref(1);
    const product = computed(() => props?.data?.item?.data || {});
    computed(
      () => product?.value?.average_reviews?.count || 0
    );
    const reviewsRating = computed(
      () => product?.value?.average_reviews?.rating || 0
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="grid grid-cols-2 md:grid-cols-12 w-full h-full gap-2" data-v-de31c9d3><div class="col-span-5 h-[75vh]" data-v-de31c9d3>`);
      _push(ssrRenderComponent(MediaSlider, {
        images: product.value.images
      }, null, _parent));
      _push(`</div><div class="col-span-7 h-full flex flex-col bg-gray-200 gap-[1px]" data-v-de31c9d3><div class="p-12 flex flex-col bg-white" data-v-de31c9d3><h2 class="uppercase text-gray-400 text-xs tracking-widest mb-2 font-[&#39;Exo_2&#39;]" data-v-de31c9d3>${ssrInterpolate(product.value?.category?.title)}</h2><h1 class="font-semibold text-3xl leading-tight" data-v-de31c9d3>${ssrInterpolate(product.value?.seo?.title || product.value.title || "Товар")}</h1><div class="mt-4" data-v-de31c9d3>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        "read-only": true,
        "show-average": true,
        "initial-rating": Number(reviewsRating.value),
        "average-rating": Number(reviewsRating.value)
      }, null, _parent));
      _push(`</div></div><div class="p-12 bg-white flex flex-wrap items-center gap-8" data-v-de31c9d3><div data-v-de31c9d3><div class="mb-1 h-5" data-v-de31c9d3>`);
      if (product.value?.quantity > 0) {
        _push(`<span class="text-[10px] text-green-600 font-bold uppercase tracking-tighter" data-v-de31c9d3>${ssrInterpolate(_ctx.$t("inStoke"))}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="flex flex-col" data-v-de31c9d3>`);
      if (product.value.old_price) {
        _push(`<span class="text-sm text-gray-400 line-through -mb-1" data-v-de31c9d3>${ssrInterpolate(product.value.old_price)}₴ </span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<span class="text-3xl font-bold font-[&#39;Exo_2&#39;]" data-v-de31c9d3>${ssrInterpolate(product.value.price)}₴ </span></div></div><div class="flex items-center border border-gray-200 rounded-lg h-14 bg-gray-50" data-v-de31c9d3><button class="px-4 h-full hover:bg-white transition-colors disabled:opacity-30 border-r"${ssrIncludeBooleanAttr(quantity.value <= 1) ? " disabled" : ""} data-v-de31c9d3>`);
      _push(ssrRenderComponent(unref(IconMinus), {
        size: 18,
        "stroke-width": "1.5"
      }, null, _parent));
      _push(`</button><input${ssrRenderAttr("value", quantity.value)} type="number" readonly class="w-14 text-center border-none bg-transparent focus:ring-0 font-[&#39;Exo_2&#39;] font-bold text-lg" data-v-de31c9d3><button class="px-4 h-full hover:bg-white transition-colors border-l" data-v-de31c9d3>`);
      _push(ssrRenderComponent(unref(IconPlus), {
        size: 18,
        "stroke-width": "1.5"
      }, null, _parent));
      _push(`</button></div><div class="flex-grow md:flex-grow-0" data-v-de31c9d3>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        id: product.value.id,
        title: product.value.title,
        price: product.value.price,
        qty: quantity.value,
        class: "w-full md:w-auto h-14 min-w-[180px]"
      }, null, _parent));
      _push(`</div></div><div class="p-12 bg-white" data-v-de31c9d3><h3 class="font-bold uppercase text-xs tracking-widest mb-6" data-v-de31c9d3> Залишити відгук </h3>`);
      _push(ssrRenderComponent(_sfc_main$4, {
        "model-id": product.value.id,
        "model-type": "Item"
      }, null, _parent));
      _push(`</div><div class="p-12 bg-white" data-v-de31c9d3><h3 class="font-bold uppercase text-xs tracking-widest mb-6 text-gray-400" data-v-de31c9d3> Відгуки клієнтів </h3>`);
      _push(ssrRenderComponent(_sfc_main$5, {
        "model-id": product.value.id,
        "model-type": "Item"
      }, null, _parent));
      _push(`</div><div class="p-12 bg-white flex-grow" data-v-de31c9d3><h3 class="font-bold uppercase text-xs tracking-widest mb-4" data-v-de31c9d3> Опис товару </h3><div class="prose prose-sm text-gray-600 leading-relaxed" data-v-de31c9d3>${ssrInterpolate(product.value.description)}</div></div></div><div class="p-6 h-full col-span-2" data-v-de31c9d3></div><div class="p-6 h-full col-span-full bg-white border-t border-gray-100" data-v-de31c9d3>`);
      if (product.value?.images?.length > 1) {
        _push(`<div class="grid grid-cols-2 md:grid-cols-4 gap-4" data-v-de31c9d3><!--[-->`);
        ssrRenderList(product.value.images, (img, index) => {
          _push(`<div class="aspect-square bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center p-4" data-v-de31c9d3><img${ssrRenderAttr("src", img?.url)} class="max-w-full max-h-full object-contain mix-blend-multiply"${ssrRenderAttr("alt", product.value.title)} data-v-de31c9d3></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="bg-gray-100 rounded-lg p-12 overflow-hidden col-span-full" data-v-de31c9d3><h4 class="text-xs font-mono text-gray-400 mb-4 uppercase tracking-widest" data-v-de31c9d3> Debug Info </h4><pre class="text-[10px] leading-tight text-gray-500 overflow-x-auto" data-v-de31c9d3>${ssrInterpolate(product.value)}</pre></div></div>`);
      _push(ssrRenderComponent(_sfc_main$6, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/Commerce/View_.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const View_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-de31c9d3"]]);
export {
  View_ as default
};
