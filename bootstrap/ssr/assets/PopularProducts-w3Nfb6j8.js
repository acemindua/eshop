import { ref, computed, onMounted, watch, unref, mergeProps, withCtx, createVNode, resolveDynamicComponent, openBlock, createBlock, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderVNode, ssrInterpolate, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { u as useApiResourceService } from "./useApiResourceService-D0zlI-JQ.js";
import _sfc_main$1 from "./ProductCard-2s9tQvH7.js";
import { b as usePage, h as head_default } from "../ssr.js";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-vue";
import SkeletonProductCard from "./SkeletonProductCard-DC70LTym.js";
import { register } from "swiper/element/bundle";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "axios";
import "./BuyButton-JQnkdb_2.js";
import "@vue/shared";
import "@vue/compiler-ssr";
import "node:stream";
import "@inertiajs/core";
import "lodash-es";
import "laravel-precognition";
import "@inertiajs/core/server";
import "pinia";
import "@floating-ui/dom";
import "./QuantityStatus-Wz7Unz6U.js";
import "./StatsRating-Cjhsk8Tq.js";
import "./StarRating-BIiPcL0U.js";
import "./ProductPrice-BQZjVJ64.js";
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
    const schemaMarkup = computed(() => {
      if (items.value.length === 0) return null;
      return JSON.stringify({
        "@context": "https://schema.org/",
        "@type": "ItemList",
        itemListElement: items.value.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Product",
            name: item.title,
            url: route("page.show", item.slug),
            image: item.images?.[0]?.url,
            offers: {
              "@type": "Offer",
              priceCurrency: "UAH",
              price: item.price,
              availability: "https://schema.org/InStock"
            }
          }
        }))
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(loading) || items.value.length > 0) {
        _push(`<section${ssrRenderAttrs(mergeProps({ class: "flex flex-col space-y-4 w-full overflow-hidden" }, _attrs))} data-v-cb3f7b1d>`);
        if (schemaMarkup.value) {
          _push(ssrRenderComponent(unref(head_default), null, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                ssrRenderVNode(_push2, createVNode(resolveDynamicComponent("script"), { type: "application/ld+json" }, null), _parent2, _scopeId);
              } else {
                return [
                  (openBlock(), createBlock(resolveDynamicComponent("script"), {
                    type: "application/ld+json",
                    innerHTML: schemaMarkup.value
                  }, null, 8, ["innerHTML"]))
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<h2 class="text-2xl font-semibold text-gray-800" data-v-cb3f7b1d>${ssrInterpolate(_ctx.$t("Popular products"))}</h2>`);
        if (unref(loading)) {
          _push(`<div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 border-t border-l" data-v-cb3f7b1d><!--[-->`);
          ssrRenderList(5, (n) => {
            _push(ssrRenderComponent(SkeletonProductCard, {
              key: "skeleton-" + n
            }, null, _parent));
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<div class="relative border-t border-l w-full group/slider" data-v-cb3f7b1d><button class="swiper-prev-btn absolute left-2 top-1/2 -translate-y-1/2 z-40 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-xl transition-all border opacity-0 group-hover/slider:opacity-100 flex items-center justify-center w-10 h-10" aria-label="Previous slide" data-v-cb3f7b1d>`);
          _push(ssrRenderComponent(unref(IconChevronLeft), { class: "w-6 h-6 stroke-[2]" }, null, _parent));
          _push(`</button><button class="swiper-next-btn absolute right-2 top-1/2 -translate-y-1/2 z-40 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-xl transition-all border opacity-0 group-hover/slider:opacity-100 flex items-center justify-center w-10 h-10" aria-label="Next slide" data-v-cb3f7b1d>`);
          _push(ssrRenderComponent(unref(IconChevronRight), { class: "w-6 h-6 stroke-[2]" }, null, _parent));
          _push(`</button><swiper-container slides-per-view="2"${ssrRenderAttr("space-between", 0)}${ssrRenderAttr("navigation", {
            prevEl: ".swiper-prev-btn",
            nextEl: ".swiper-next-btn"
          })}${ssrRenderAttr("breakpoints", {
            "640": { slidesPerView: 2 },
            "768": { slidesPerView: 4 },
            "1024": { slidesPerView: 5 }
          })} class="popular-swiper" data-v-cb3f7b1d><!--[-->`);
          ssrRenderList(items.value, (item) => {
            _push(`<swiper-slide class="h-auto" data-v-cb3f7b1d><div class="relative z-10" data-v-cb3f7b1d>`);
            _push(ssrRenderComponent(_sfc_main$1, { data: item }, null, _parent));
            _push(`</div></swiper-slide>`);
          });
          _push(`<!--]--></swiper-container></div>`);
        }
        _push(`</section>`);
      } else {
        _push(`<section${ssrRenderAttrs(mergeProps({ class: "w-full" }, _attrs))} data-v-cb3f7b1d><div class="text-gray-500 py-12 text-center border border-dashed border-gray-200 rounded-xl bg-gray-50/50" data-v-cb3f7b1d><p class="text-sm" data-v-cb3f7b1d>${ssrInterpolate(_ctx.$t("No popular products found."))}</p></div></section>`);
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
const PopularProducts = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-cb3f7b1d"]]);
export {
  PopularProducts as default
};
