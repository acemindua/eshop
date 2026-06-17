import { ref, computed, reactive, watch, unref, isRef, useSSRContext } from "vue";
import { ssrInterpolate, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import debounce from "lodash.debounce";
import { w as wTransChoice } from "../ssr.js";
import { _ as _sfc_main$1 } from "./DefaultLayout-B74gfzmX.js";
import _sfc_main$2 from "./SortDropdown-DKM1lSKE.js";
import _sfc_main$3 from "./ProductFilters-BpcXW103.js";
import SkeletonProductCard from "./SkeletonProductCard-0R0RYbYz.js";
import _sfc_main$4 from "./ProductCard-Brr9UXw0.js";
import { u as useCatalogApi } from "./useCatalogApi-hK_Blna9.js";
import { IconFlaskOff } from "@tabler/icons-vue";
import "./SeoMeta-D98tVnaL.js";
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
import "./LangSwitcher-e9tQy0N1.js";
import "@headlessui/vue";
import "./useLocales-sgag9Abd.js";
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
import "@vueform/slider";
/* empty css                 */
import "./Checkbox-86GmRX3v.js";
import "./BuyButton-DurVeyzU.js";
import "./QuantityStatus-BjP6BbJj.js";
import "./StatsRating-8EdIqWFW.js";
import "./StarRating-BIiPcL0U.js";
import "./ProductPrice-B0kbdA1m.js";
import "axios";
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: _sfc_main$1 }, {
  __name: "Category",
  __ssrInlineRender: true,
  props: { data: Object, seo: Object, schema: Object },
  setup(__props) {
    const props = __props;
    const loading = ref(true);
    const category = computed(() => props.data?.category?.data || null);
    const priceMax = ref(props.data?.price_max || 5e4);
    const sortOptions = [
      { value: "rating_desc", label: "Highest Rated" },
      { value: "price_asc", label: "Price: Low to High" },
      { value: "price_desc", label: "Price: High to Low" }
    ];
    const { items, meta, brands, fetchCatalog } = useCatalogApi();
    let form = reactive({
      in_stock: route().params.in_stock == "1",
      sale: route().params.sale == "1",
      rating: route().params.rating || 0,
      sort: route().params.sort || sortOptions[0].value,
      brands: route().params.brands?.split(",").map(Number) || [],
      min_price: Number(route().params.min_price) || 0,
      max_price: Number(route().params.max_price) || priceMax.value
    });
    const getRequest = async () => {
      try {
        await fetchCatalog(route("api.commerce.items"), {
          ...form,
          category_id: category.value?.id
        });
      } catch (error) {
        console.error("Не вдалося оновити товари", error);
      } finally {
        loading.value = false;
      }
    };
    const updateDebounce = debounce(getRequest, 500);
    watch(form, () => updateDebounce(), { deep: true, immediate: true });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="pb-2 border-b"><h1 class="text-2xl font-semibold">${ssrInterpolate(category.value?.seo?.title || category.value?.title || _ctx.$t("Category"))}</h1><div class="flex items-center justify-between"><p class="text-sm text-gray-600">${ssrInterpolate(_ctx.$t("Found"))} ${ssrInterpolate(unref(wTransChoice)("Products", unref(meta)?.total || 0, {
        count: unref(meta)?.total || 0
      }))}</p>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        modelValue: unref(form).sort,
        "onUpdate:modelValue": ($event) => unref(form).sort = $event,
        options: sortOptions
      }, null, _parent));
      _push(`</div></div><div class="flex flex-col md:flex-row items-start divide-x"><aside class="w-full md:w-64 shrink-0"><div class="pr-8">`);
      _push(ssrRenderComponent(_sfc_main$3, {
        modelValue: unref(form),
        "onUpdate:modelValue": ($event) => isRef(form) ? form.value = $event : form = $event,
        brands: unref(brands),
        "default-max": priceMax.value
      }, null, _parent));
      _push(`</div></aside><div class="flex-1 w-full"><div class="grid grid-cols-2 md:grid-cols-4">`);
      if (loading.value) {
        _push(`<!--[-->`);
        ssrRenderList(4, (n) => {
          _push(ssrRenderComponent(SkeletonProductCard, {
            key: "skel-" + n
          }, null, _parent));
        });
        _push(`<!--]-->`);
      } else if (unref(items).length > 0) {
        _push(`<!--[-->`);
        ssrRenderList(unref(items), (item) => {
          _push(ssrRenderComponent(_sfc_main$4, {
            key: item.id,
            data: item
          }, null, _parent));
        });
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (!loading.value && unref(items).length === 0) {
        _push(`<div class="w-full h-64 flex items-center justify-center text-gray-500"><div class="flex flex-col items-center gap-4"><div class="flex items-center justify-center bg-gray-100 rounded-full p-4">`);
        _push(ssrRenderComponent(unref(IconFlaskOff), {
          stroke: "{2}",
          class: "text-brand w-16 h-16"
        }, null, _parent));
        _push(`</div><p>${ssrInterpolate(_ctx.$t("No products found..."))}</p></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      if (category.value?.seo?.description) {
        _push(`<section class="mt-16 pt-8 border-t border-gray-100"><h4 class="text-lg font-semibold text-gray-800 mb-4">${ssrInterpolate(category.value.title)}</h4><div class="prose prose-sm max-w-none text-gray-600">${category.value.seo?.description ?? ""}</div></section>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/Commerce/Category.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
