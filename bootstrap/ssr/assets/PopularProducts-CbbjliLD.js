import { ref, computed, watch, unref, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderComponent } from "vue/server-renderer";
import { u as useApiResourceService } from "./useApiResourceService-BibiLDfj.js";
import _sfc_main$1 from "./ProductCard-mCglwJt6.js";
import { c as usePage } from "../ssr.js";
import SkeletonProductCard from "./SkeletonProductCard-BvTpNmcI.js";
import "axios";
import "./BuyButton-21mHn8CJ.js";
import "@tabler/icons-vue";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
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
  __name: "PopularProducts",
  __ssrInlineRender: true,
  setup(__props) {
    const { loading, fetchData } = useApiResourceService();
    const items = ref([]);
    const page = usePage();
    const currentLocale = computed(() => {
      return page.props.config.locale || "en";
    });
    const getData = async () => {
      try {
        const response = await fetchData(
          route("api.commerce.popular", { locale: currentLocale.value })
        );
        items.value = response.data?.items || response.data || [];
      } catch (error) {
        console.error("Error fetching popular products:", error);
      }
    };
    watch(
      currentLocale,
      () => {
        getData();
      },
      { immediate: true }
    );
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(loading) || items.value.length > 0) {
        _push(`<section${ssrRenderAttrs(mergeProps({ class: "flex flex-col space-y-4" }, _attrs))}><h2 class="text-2xl font-semibold text-gray-800">${ssrInterpolate(_ctx.$t("Popular products"))}</h2>`);
        if (unref(loading) || items.value.length > 0) {
          _push(`<div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">`);
          if (unref(loading)) {
            _push(`<!--[-->`);
            ssrRenderList(5, (n) => {
              _push(ssrRenderComponent(SkeletonProductCard, {
                key: "skeleton-" + n
              }, null, _parent));
            });
            _push(`<!--]-->`);
          } else {
            _push(`<!--[-->`);
            ssrRenderList(items.value, (item) => {
              _push(ssrRenderComponent(_sfc_main$1, {
                key: item.id,
                data: item
              }, null, _parent));
            });
            _push(`<!--]-->`);
          }
          _push(`</div>`);
        } else {
          _push(`<div class="text-gray-500 py-12 text-center border border-dashed border-gray-200 rounded-xl bg-gray-50/50"><p class="text-sm">${ssrInterpolate(_ctx.$t("No popular products found."))}</p></div>`);
        }
        _push(`</section>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/Commerce/Components/PopularProducts.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
