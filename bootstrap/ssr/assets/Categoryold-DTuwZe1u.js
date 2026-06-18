import { computed, ref, watch, onMounted, mergeProps, unref, withCtx, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./DefaultLayout-DbG3NCf7.js";
import SkeletonProductCard from "./SkeletonProductCard-0R0RYbYz.js";
import _sfc_main$3 from "./ProductCard-rWWTvw_m.js";
import { w as wTransChoice } from "../ssr.js";
import _sfc_main$2 from "./ProductFilters-BYQlIU5b.js";
import _sfc_main$4 from "./Pagination-VZqicp2n.js";
import { u as useCatalogApi } from "./useCatalogApi-B9Che44a.js";
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from "@headlessui/vue";
import "./LangSwitcher-e9tQy0N1.js";
import "./useLocales-sgag9Abd.js";
import "@tabler/icons-vue";
import "@inertiajs/core";
import "./ApplicationLogo-CSNe_4RD.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./CartButton-CHDIERBZ.js";
import "./VarDump-DqvrPBoK.js";
import "./UserLoginRegisterForm-CQ1J7Gli.js";
import "./AuthModal-C4QAXByT.js";
import "./TextInput-koDpuiDW.js";
import "./InputError-Cp3nFeNd.js";
import "./Breadcrumbs-DKsddhuk.js";
import "./BuyButton-DurVeyzU.js";
import "./QuantityStatus-DsGBQWeE.js";
import "./StatsRating-8EdIqWFW.js";
import "./StarRating-BIiPcL0U.js";
import "./ProductPrice-B0kbdA1m.js";
import "@unhead/vue/server";
import "@vue/shared";
import "@vue/compiler-ssr";
import "node:stream";
import "lodash-es";
import "laravel-precognition";
import "@inertiajs/core/server";
import "pinia";
import "@floating-ui/dom";
import "@vueform/slider";
import "./Checkbox-86GmRX3v.js";
import "axios";
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: _sfc_main$1 }, {
  __name: "Categoryold",
  __ssrInlineRender: true,
  props: { data: Object },
  setup(__props) {
    const props = __props;
    const category = computed(() => props.data?.category?.data || null);
    const page = ref(Number(route().params.page) || 1);
    const defaultMin = computed(() => props.data?.min_price || 0);
    const defaultMax = computed(() => props.data?.max_price || 5e4);
    const form = ref({
      promo: route().params.promo == "1",
      min_price: Number(route().params.min_price) || defaultMin.value,
      max_price: Number(route().params.max_price) || defaultMax.value,
      brands: route().params.brands ? route().params.brands.split(",").map(Number) : [],
      rating: route().params.rating || 0,
      sort: route().params.sort || "rating_desc"
    });
    const { items, meta, loading, brands, fetchCatalog } = useCatalogApi();
    const getData = () => {
      fetchCatalog(route("api.commerce.items"), {
        ...form.value,
        category_id: category.value?.id,
        page: page.value
      });
    };
    const updateUrl = (resetPage = true) => {
      if (resetPage) page.value = 1;
      const params = {
        ...route().params,
        ...form.value,
        page: page.value,
        brands: form.value.brands.length > 0 ? form.value.brands.join(",") : null
      };
      Object.keys(params).forEach(
        (key) => params[key] == null && delete params[key]
      );
      window.history.replaceState({}, "", route(route().current(), params));
      getData();
    };
    watch(
      [
        () => form.value.promo,
        () => form.value.brands,
        () => form.value.rating
        //() => form.value.sort,
      ],
      () => updateUrl(true),
      { deep: true }
    );
    watch([() => form.value.min_price, () => form.value.max_price], () => {
      clearTimeout(window.timeout);
      window.timeout = setTimeout(() => updateUrl(true), 500);
    });
    onMounted(getData);
    const handlePageChange = (link) => {
      if (!link.url || link.active) return;
      const url = new URL(link.url);
      const newPage = url.searchParams.get("page");
      if (newPage && page.value !== Number(newPage)) {
        page.value = Number(newPage);
        updateUrl(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };
    const sortOptions = [
      { value: "rating_desc", label: "Highest Rated" },
      { value: "price_asc", label: "Price: Low to High" },
      { value: "price_desc", label: "Price: High to Low" }
    ];
    const currentSortLabel = computed(
      () => sortOptions.find((o) => o.value === form.value.sort)?.label || "Sort"
    );
    ({
      min_price: defaultMin.value,
      // используем ваши дефолтные значения
      max_price: defaultMax.value
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "catalog-container" }, _attrs))}><h1 class="text-xl font-semibold mb-6">${ssrInterpolate(category.value?.title || _ctx.$t("Catalog"))}</h1><button class="text-sm text-gray-500 hover:text-red-600 underline transition">${ssrInterpolate(_ctx.$t("Reset filters"))}</button><div class="text-xs"><span>${ssrInterpolate(_ctx.$t("Found"))}</span> ${ssrInterpolate(unref(wTransChoice)("Products", unref(meta)?.total || 0, {
        count: unref(meta)?.total || 0
      }))}</div>`);
      _push(ssrRenderComponent(unref(Listbox), {
        modelValue: form.value.sort,
        "onUpdate:modelValue": [($event) => form.value.sort = $event, ($event) => updateUrl(true)]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="relative mt-1"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(ListboxButton), { class: "border p-2 rounded text-sm w-48 text-left bg-white shadow-sm" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.$t(currentSortLabel.value))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.$t(currentSortLabel.value)), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(ListboxOptions), { class: "absolute mt-1 w-48 bg-white border rounded shadow-lg z-10" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(sortOptions, (option) => {
                    _push3(ssrRenderComponent(unref(ListboxOption), {
                      key: option.value,
                      value: option.value
                    }, {
                      default: withCtx(({ active, selected }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<li class="${ssrRenderClass([
                            "p-2 cursor-pointer",
                            active ? "bg-gray-100" : "",
                            selected ? "font-bold" : ""
                          ])}"${_scopeId3}>${ssrInterpolate(_ctx.$t(option.label))}</li>`);
                        } else {
                          return [
                            createVNode("li", {
                              class: [
                                "p-2 cursor-pointer",
                                active ? "bg-gray-100" : "",
                                selected ? "font-bold" : ""
                              ]
                            }, toDisplayString(_ctx.$t(option.label)), 3)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(), createBlock(Fragment, null, renderList(sortOptions, (option) => {
                      return createVNode(unref(ListboxOption), {
                        key: option.value,
                        value: option.value
                      }, {
                        default: withCtx(({ active, selected }) => [
                          createVNode("li", {
                            class: [
                              "p-2 cursor-pointer",
                              active ? "bg-gray-100" : "",
                              selected ? "font-bold" : ""
                            ]
                          }, toDisplayString(_ctx.$t(option.label)), 3)
                        ]),
                        _: 2
                      }, 1032, ["value"]);
                    }), 64))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "relative mt-1" }, [
                createVNode(unref(ListboxButton), { class: "border p-2 rounded text-sm w-48 text-left bg-white shadow-sm" }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(_ctx.$t(currentSortLabel.value)), 1)
                  ]),
                  _: 1
                }),
                createVNode(unref(ListboxOptions), { class: "absolute mt-1 w-48 bg-white border rounded shadow-lg z-10" }, {
                  default: withCtx(() => [
                    (openBlock(), createBlock(Fragment, null, renderList(sortOptions, (option) => {
                      return createVNode(unref(ListboxOption), {
                        key: option.value,
                        value: option.value
                      }, {
                        default: withCtx(({ active, selected }) => [
                          createVNode("li", {
                            class: [
                              "p-2 cursor-pointer",
                              active ? "bg-gray-100" : "",
                              selected ? "font-bold" : ""
                            ]
                          }, toDisplayString(_ctx.$t(option.label)), 3)
                        ]),
                        _: 2
                      }, 1032, ["value"]);
                    }), 64))
                  ]),
                  _: 1
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex flex-col md:flex-row">`);
      _push(ssrRenderComponent(_sfc_main$2, {
        modelValue: form.value,
        "onUpdate:modelValue": ($event) => form.value = $event,
        brands: unref(brands),
        "default-min": defaultMin.value,
        "default-max": defaultMax.value
      }, null, _parent));
      _push(`<main class="flex-grow">`);
      if (unref(loading)) {
        _push(`<div class="grid grid-cols-2 md:grid-cols-4 border-t"><!--[-->`);
        ssrRenderList(8, (n) => {
          _push(ssrRenderComponent(SkeletonProductCard, {
            key: "skel-" + n
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      } else if (unref(items).length > 0) {
        _push(`<!--[--><div class="grid grid-cols-2 md:grid-cols-4 border-t"><!--[-->`);
        ssrRenderList(unref(items), (item) => {
          _push(ssrRenderComponent(_sfc_main$3, {
            key: item.id,
            data: item
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
        if (unref(meta)?.links?.length > 3) {
          _push(`<div class="py-8">`);
          _push(ssrRenderComponent(_sfc_main$4, mergeProps(unref(meta), { onChange: handlePageChange }), null, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      } else {
        _push(`<p class="text-center py-20 text-gray-500">${ssrInterpolate(_ctx.$t("No products found"))}</p>`);
      }
      _push(`</main></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/Commerce/Categoryold.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
