import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { computed, mergeProps, unref, useSSRContext } from "vue";
import { _ as _sfc_main$2, b as _sfc_main$3, a as _sfc_main$4 } from "./DefaultLayout-Cjfl4mqk.js";
import { Link } from "@inertiajs/vue3";
import { IconMessage } from "@tabler/icons-vue";
import "./Layout-DyM0uGUn.js";
import "./ApplicationLogo-DsJOFw9w.js";
import "./Breadcrumbs-Be9A5eey.js";
import "./LangSwitcher-wZTGpIJc.js";
import "@headlessui/vue";
import "laravel-vue-i18n";
import "./useLocales-Cm2D8rND.js";
import "./UserLoginRegisterForm-CNKqNW1z.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./TextInput-C-4bWHj0.js";
const _sfc_main$1 = {
  __name: "ProductCard",
  __ssrInlineRender: true,
  props: {
    data: Object
  },
  setup(__props) {
    const props = __props;
    computed(
      () => props.data?.reviews?.rating !== null && props.data?.reviews?.count > 0
    );
    const reviewsCount = computed(() => props.data?.average_reviews?.count || 0);
    const reviewsRating = computed(() => props.data?.average_reviews?.rating || 0);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col group relative p-2 w-full h-full transition-shadow hover:shadow-md rounded-xl bg-white border border-transparent hover:border-gray-100" }, _attrs))}><div class="bg-gray-50 w-full h-64 rounded-lg overflow-hidden flex items-center justify-center">`);
      if (__props.data.images?.length) {
        _push(`<img${ssrRenderAttr("src", __props.data.images[0].url)}${ssrRenderAttr("alt", __props.data.title)} class="w-full h-full object-contain transition-all duration-500 group-hover:scale-105">`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="p-2 flex flex-col flex-grow"><h3 class="font-semibold text-gray-800 transition-colors group-hover:text-brand line-clamp-2 h-12">${ssrInterpolate(__props.data.title)}</h3><div class="h-8 flex w-full items-center justify-start text-xs mt-2">`);
      _push(ssrRenderComponent(_sfc_main$2, {
        "read-only": true,
        "show-average": false,
        "initial-rating": Number(reviewsRating.value),
        "average-rating": Number(reviewsRating.value)
      }, null, _parent));
      if (reviewsCount.value > 0) {
        _push(`<div class="flex items-center ml-2 text-gray-400">`);
        _push(ssrRenderComponent(unref(IconMessage), {
          stroke: 1.5,
          class: "w-3.5 h-3.5 mr-1"
        }, null, _parent));
        _push(`<span>${ssrInterpolate(reviewsCount.value)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="mt-auto pt-4 flex items-center justify-between relative z-20"><div class="flex flex-col">`);
      if (__props.data.old_price) {
        _push(`<span class="text-xs text-gray-400 line-through">${ssrInterpolate(__props.data.old_price)} ₴ </span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<span class="text-lg font-bold text-black font-[&#39;Exo_2&#39;]">${ssrInterpolate(__props.data.price)} ₴ </span></div>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        id: __props.data.id,
        title: __props.data.title,
        price: __props.data.price,
        class: "scale-90 origin-right"
      }, null, _parent));
      _push(`</div></div>`);
      _push(ssrRenderComponent(unref(Link), {
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
          _push(ssrRenderComponent(_sfc_main$1, { data: product }, null, _parent));
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
