import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { getCurrentInstance, computed, onMounted, mergeProps, unref, useSSRContext } from "vue";
import { _ as _sfc_main$2, a as _sfc_main$3 } from "./StarRating-B5mfeG81.js";
import { l as link_default } from "../ssr.js";
import { IconMessage } from "@tabler/icons-vue";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import { _ as _sfc_main$4 } from "./DefaultLayout-DTeqHHYh.js";
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
import "./ApplicationLogo-CSNe_4RD.js";
import "./CartButton-CBNnYGs8.js";
import "./VarDump-DqvrPBoK.js";
const _sfc_main$1 = {
  __name: "ProductCard",
  __ssrInlineRender: true,
  props: {
    data: Object
  },
  setup(__props) {
    const { proxy } = getCurrentInstance();
    const props = __props;
    computed(
      () => props.data?.reviews?.rating !== null && props.data?.reviews?.count > 0
    );
    const reviewsCount = computed(() => props.data?.average_reviews?.count || 0);
    const reviewsRating = computed(() => props.data?.average_reviews?.rating || 0);
    onMounted(() => {
      console.log("Функція форматування:", proxy.$formatPrice);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col group relative p-2 w-full h-full transition-shadow hover:shadow-md rounded-xl bg-white border border-transparent hover:border-gray-100" }, _attrs))} data-v-9f6ae15d><div class="bg-gray-50 w-full h-64 rounded-lg overflow-hidden flex items-center justify-center" data-v-9f6ae15d>`);
      if (__props.data.images?.length) {
        _push(`<img${ssrRenderAttr("src", __props.data.images[0].url)}${ssrRenderAttr("alt", __props.data.title)} class="w-full h-full object-contain transition-all duration-500 group-hover:scale-105" data-v-9f6ae15d>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="p-2 flex flex-col flex-grow" data-v-9f6ae15d><h3 class="text-gray-800 transition-colors group-hover:text-brand line-clamp-2 h-12" data-v-9f6ae15d>${ssrInterpolate(__props.data.title)}</h3><div class="h-8 flex w-full items-center justify-start text-xs mt-2" data-v-9f6ae15d>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        "read-only": true,
        "show-average": false,
        "initial-rating": Number(reviewsRating.value),
        "average-rating": Number(reviewsRating.value)
      }, null, _parent));
      if (reviewsCount.value > 0) {
        _push(`<div class="flex items-center ml-2 text-gray-400" data-v-9f6ae15d>`);
        _push(ssrRenderComponent(unref(IconMessage), {
          stroke: 1.5,
          class: "w-3.5 h-3.5 mr-1"
        }, null, _parent));
        _push(`<span data-v-9f6ae15d>${ssrInterpolate(reviewsCount.value)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="mt-auto pt-4 flex items-center justify-between relative z-20" data-v-9f6ae15d><div class="flex flex-col" data-v-9f6ae15d>`);
      if (__props.data.old_price) {
        _push(`<span class="text-xs text-gray-400 line-through" data-v-9f6ae15d>${ssrInterpolate(_ctx.$formatPrice(__props.data.old_price))}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<span class="text-lg font-bold text-black font-[&#39;Exo_2&#39;]" data-v-9f6ae15d>${ssrInterpolate(_ctx.$formatPrice(__props.data.price))}</span></div>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        id: __props.data.id,
        title: __props.data.title,
        price: __props.data.price,
        class: "scale-90 origin-right relative z-30 transition-all duration-300 group-hover:scale-100 group-hover:shadow-lg group-hover:shadow-indigo-500/20 group-hover:animate-pulse-once"
      }, null, _parent));
      _push(`</div></div>`);
      _push(ssrRenderComponent(unref(link_default), {
        href: _ctx.route("page.show", __props.data.slug),
        class: "absolute inset-0 z-10",
        "aria-label": "Переглянути товар"
      }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Public/Commerce/ProductCard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ProductCard = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-9f6ae15d"]]);
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: _sfc_main$4 }, {
  __name: "Home",
  __ssrInlineRender: true,
  props: {
    products: Object
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.products.data?.length) {
        _push(`<div${ssrRenderAttrs(_attrs)}><div class="grid grid-cols-2 md:grid-cols-10 gap-2"><div class="col-span-full bg-white p-12"><h1 class="font-semibold text-2xl">Товари</h1></div><!--[-->`);
        ssrRenderList(__props.products.data, (product) => {
          _push(`<div class="col-span-2 md:col-span-2 bg-white">`);
          _push(ssrRenderComponent(ProductCard, { data: product }, null, _parent));
          _push(`</div>`);
        });
        _push(`<!--]--><div class="bg-gray-100 rounded-lg p-12 overflow-hidden col-span-full"><pre>            ${ssrInterpolate(__props.products)}
        </pre></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/Home.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
