import { ref, computed, onMounted, watch, unref, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderComponent, ssrRenderAttr } from "vue/server-renderer";
import { u as useApiResourceService } from "./useApiResourceService-BAm4_Pfc.js";
import _sfc_main$1 from "./ProductCard-Brr9UXw0.js";
import { b as usePage } from "../ssr.js";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-vue";
import SkeletonProductCard from "./SkeletonProductCard-0R0RYbYz.js";
import { register } from "swiper/element/bundle";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "axios";
import "./BuyButton-DurVeyzU.js";
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
import "./QuantityStatus-BjP6BbJj.js";
import "./StatsRating-8EdIqWFW.js";
import "./StarRating-BIiPcL0U.js";
import "./ProductPrice-B0kbdA1m.js";
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
    onMounted(() => {
      register();
    });
    watch(
      currentLocale,
      () => {
        getData();
      },
      { immediate: true }
    );
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(loading) || items.value.length > 0) {
        _push(`<section${ssrRenderAttrs(mergeProps({ class: "flex flex-col space-y-4 w-full overflow-hidden" }, _attrs))} data-v-04aadc3d><h2 class="text-2xl font-semibold text-gray-800" data-v-04aadc3d>${ssrInterpolate(_ctx.$t("Popular products"))}</h2>`);
        if (unref(loading)) {
          _push(`<div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 border-t border-l" data-v-04aadc3d><!--[-->`);
          ssrRenderList(5, (n) => {
            _push(ssrRenderComponent(SkeletonProductCard, {
              key: "skeleton-" + n
            }, null, _parent));
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<div class="relative border-t border-l w-full group/slider" data-v-04aadc3d><button class="swiper-prev-btn absolute left-2 top-1/2 -translate-y-1/2 z-40 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-xl transition-all border opacity-0 group-hover/slider:opacity-100 flex items-center justify-center w-10 h-10" aria-label="Previous slide" data-v-04aadc3d>`);
          _push(ssrRenderComponent(unref(IconChevronLeft), { class: "w-6 h-6 stroke-[2]" }, null, _parent));
          _push(`</button><button class="swiper-next-btn absolute right-2 top-1/2 -translate-y-1/2 z-40 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-xl transition-all border opacity-0 group-hover/slider:opacity-100 flex items-center justify-center w-10 h-10" aria-label="Next slide" data-v-04aadc3d>`);
          _push(ssrRenderComponent(unref(IconChevronRight), { class: "w-6 h-6 stroke-[2]" }, null, _parent));
          _push(`</button><swiper-container slides-per-view="2"${ssrRenderAttr("space-between", 0)}${ssrRenderAttr("navigation", {
            prevEl: ".swiper-prev-btn",
            nextEl: ".swiper-next-btn"
          })}${ssrRenderAttr("breakpoints", {
            "640": { slidesPerView: 2 },
            "768": { slidesPerView: 4 },
            "1024": { slidesPerView: 5 }
          })} class="popular-swiper" data-v-04aadc3d><!--[-->`);
          ssrRenderList(items.value, (item) => {
            _push(`<swiper-slide class="h-auto" data-v-04aadc3d><div class="relative z-10" data-v-04aadc3d>`);
            _push(ssrRenderComponent(_sfc_main$1, { data: item }, null, _parent));
            _push(`</div></swiper-slide>`);
          });
          _push(`<!--]--></swiper-container></div>`);
        }
        _push(`</section>`);
      } else {
        _push(`<section${ssrRenderAttrs(mergeProps({ class: "w-full" }, _attrs))} data-v-04aadc3d><div class="text-gray-500 py-12 text-center border border-dashed border-gray-200 rounded-xl bg-gray-50/50" data-v-04aadc3d><p class="text-sm" data-v-04aadc3d>${ssrInterpolate(_ctx.$t("No popular products found."))}</p></div></section>`);
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
const PopularProducts = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-04aadc3d"]]);
export {
  PopularProducts as default
};
