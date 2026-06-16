import { computed, ref, reactive, watch, unref, isRef, useSSRContext } from "vue";
import { ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { w as wTransChoice } from "../ssr.js";
import { _ as _sfc_main$1 } from "./DefaultLayout-B74gfzmX.js";
import _sfc_main$2 from "./SortDropdown-CL6wpuCI.js";
import _sfc_main$3 from "./ProductFilters-Byav0S3x.js";
import { u as useCatalogApi } from "./useCatalogApi-BZhDgs9b.js";
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
import "@vueform/slider";
/* empty css                 */
import "axios";
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: _sfc_main$1 }, {
  __name: "Category",
  __ssrInlineRender: true,
  props: { data: Object, seo: Object, schema: Object },
  setup(__props) {
    const props = __props;
    const category = computed(() => props.data?.category?.data || null);
    const sortOptions = [
      { value: "rating_desc", label: "Highest Rated" },
      { value: "price_asc", label: "Price: Low to High" },
      { value: "price_desc", label: "Price: High to Low" }
    ];
    const defaultMin = ref(0);
    const defaultMax = ref(5e4);
    const { meta, brands } = useCatalogApi();
    let form = reactive({
      sort: sortOptions[0].value,
      min_price: defaultMin.value,
      max_price: defaultMax.value
      // інші поля фільтрів будуть тут
    });
    watch(form, () => updateRequests(), { deep: true });
    const updateRequests = (reset = false) => {
      console.log("Update requested:", form);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="py-2 border-b"><h1 class="text-2xl font-semibold pb-2">${ssrInterpolate(category.value?.seo?.title || category.value?.title || _ctx.$t("Category"))}</h1><div class="flex items-center justify-between"><p class="text-sm text-gray-600">${ssrInterpolate(_ctx.$t("Found"))} ${ssrInterpolate(unref(wTransChoice)("Products", unref(meta)?.total || 0, {
        count: unref(meta)?.total || 0
      }))}</p>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        modelValue: unref(form).sort,
        "onUpdate:modelValue": ($event) => unref(form).sort = $event,
        options: sortOptions
      }, null, _parent));
      _push(`</div></div><div class="flex flex-col md:flex-row gap-8 items-start"><aside class="w-full md:w-64 shrink-0 md:border-r"><div class="sticky top-24">`);
      _push(ssrRenderComponent(_sfc_main$3, {
        modelValue: unref(form),
        "onUpdate:modelValue": ($event) => isRef(form) ? form.value = $event : form = $event,
        brands: unref(brands),
        "default-min": defaultMin.value,
        "default-max": defaultMax.value
      }, null, _parent));
      _push(`</div></aside><div class="flex-1 w-full"><div class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"></div></div></div>`);
      if (category.value?.seo?.description) {
        _push(`<section class="mt-16 pt-8 border-t border-gray-100"><h2 class="text-lg font-semibold text-gray-800 mb-4">${ssrInterpolate(category.value.title)}</h2><div class="prose prose-sm max-w-none text-gray-600">${category.value.seo?.description ?? ""}</div></section>`);
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
