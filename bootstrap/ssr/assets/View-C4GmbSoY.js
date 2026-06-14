import { computed, mergeProps, unref, useSSRContext, ref, reactive, watch, onMounted, withCtx, createTextVNode, toDisplayString } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrRenderStyle, ssrRenderClass, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { _ as _sfc_main$4, a as _sfc_main$5, M as MediaSlider, b as _sfc_main$8 } from "./SeoMeta-DM-OmeWN.js";
import { A as AuthModal } from "./AuthModal-BV8YJLyF.js";
import { IconStarFilled, IconMinus, IconPlus } from "@tabler/icons-vue";
import { _ as _sfc_main$3 } from "./StarRating-BIiPcL0U.js";
import { w as wTransChoice, b as usePage, l as link_default } from "../ssr.js";
import { u as useApiResourceService } from "./useApiResourceService-D0zlI-JQ.js";
import { _ as _sfc_main$6 } from "./DefaultLayout-DkxO0_wl.js";
import _sfc_main$7 from "./QuantityStatus-Wz7Unz6U.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./TextInput-D87biKav.js";
import "./InputError-Cp3nFeNd.js";
import "@vue/shared";
import "@vue/compiler-ssr";
import "node:stream";
import "@inertiajs/core";
import "lodash-es";
import "laravel-precognition";
import "@inertiajs/core/server";
import "pinia";
import "@floating-ui/dom";
import "axios";
import "./LangSwitcher-BpdYRBp1.js";
import "@headlessui/vue";
import "./useLocales-sgag9Abd.js";
import "./ApplicationLogo-CSNe_4RD.js";
import "./CartButton-i1aDL68u.js";
import "./VarDump-DqvrPBoK.js";
import "./UserLoginRegisterForm-DImQWDi_.js";
import "./Breadcrumbs-DKsddhuk.js";
const _sfc_main$2 = {
  __name: "RatingStats",
  __ssrInlineRender: true,
  props: {
    stats: { type: Object, required: true }
  },
  emits: ["filter-change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const total = computed(() => props.stats.total || 0);
    const breakdownList = computed(() => {
      return [5, 4, 3, 2, 1].map((star) => {
        const count = props.stats.breakdown?.[star] || 0;
        return {
          star,
          count,
          percent: total.value ? Math.round(count / total.value * 100) : 0
        };
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-1 md:grid-cols-4 gap-6" }, _attrs))}><div class="flex flex-col items-center justify-center space-y-2"><p class="text-3xl font-semibold">${ssrInterpolate(_ctx.$formatNumber(__props.stats.rating))} <span class="text-base font-normal"> (${ssrInterpolate(unref(wTransChoice)("reviews", __props.stats.total, {
        count: __props.stats.total
      }))}) </span></p>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        "model-value": __props.stats.rating,
        "read-only": "",
        "show-average": false
      }, null, _parent));
      _push(`</div><div class="md:col-span-2 space-y-2"><!--[-->`);
      ssrRenderList(breakdownList.value, (item) => {
        _push(`<div role="button" tabindex="0"${ssrRenderAttr("aria-label", `Filter by ${item.star} stars, ${item.count} reviews`)} class="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"><div class="flex items-center gap-1 w-12"><span class="text-sm">${ssrInterpolate(item.star)}</span>`);
        _push(ssrRenderComponent(unref(IconStarFilled), { class: "text-orange-500 w-4 h-4" }, null, _parent));
        _push(`</div><div class="flex-1 h-2 bg-gray-200 rounded overflow-hidden"><div class="h-full bg-orange-500 transition-all duration-500" style="${ssrRenderStyle({ width: item.percent + "%" })}"></div></div><div class="w-10 text-sm text-gray-600 text-right">${ssrInterpolate(item.count)}</div></div>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Review/RatingStats.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "Reviews",
  __ssrInlineRender: true,
  props: {
    modelType: { type: String, required: true },
    modelId: { type: Number, required: true },
    modelTitle: { type: String, required: true, default: () => "" },
    averageReviews: { type: Object }
  },
  setup(__props) {
    const props = __props;
    const isAuthModalOpen = ref(false);
    const reviews = ref([]);
    const currentPage = ref(1);
    const lastPage = ref(1);
    const activeFilter = ref(null);
    const stats = reactive({
      total: 0,
      rating: 0,
      breakdown: {}
    });
    const api = useApiResourceService();
    const page = usePage();
    const auth = computed(() => page.props.auth?.user);
    const form = reactive({
      title: props.modelTitle,
      review: "",
      rating: 0,
      model: props.modelType,
      model_id: props.modelId,
      user_id: auth.value?.data?.id || null
    });
    watch(
      auth,
      (val) => {
        form.user_id = val?.data?.id || null;
      },
      { immediate: true }
    );
    watch(activeFilter, () => {
      currentPage.value = 1;
      fetchReviews();
    });
    const hasUserAlreadyReviewed = computed(() => {
      return reviews.value.some(
        (review) => review.user_id === auth.value?.data?.id || null
      );
    });
    const fetchReviews = async () => {
      try {
        const url = `/api/reviews?model=${props.modelType}&model_id=${props.modelId}&page=${currentPage.value}${activeFilter.value ? "&rating=" + activeFilter.value : ""}`;
        const { data: result } = await api.fetchData(url);
        stats.total = result.total ?? 0;
        stats.rating = result.rating ?? 0;
        stats.breakdown = result.breakdown ?? {};
        const newReviews = result.reviews?.data ?? result.reviews ?? [];
        if (currentPage.value === 1) {
          reviews.value = newReviews;
        } else {
          reviews.value.push(...newReviews);
        }
        currentPage.value = result.current_page ?? 1;
        lastPage.value = result.last_page ?? 1;
      } catch (e) {
        console.error("Error fetching reviews:", e);
      }
    };
    const handleSubmit = async () => {
      if (form.rating === 0) return;
      const success = await api.storeData("/api/reviews", form);
      if (success) {
        form.review = "";
        form.rating = 0;
        currentPage.value = 1;
        await fetchReviews();
      }
    };
    onMounted(fetchReviews);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="flex flex-col gap-2">`);
      if (stats.total != 0) {
        _push(`<div class="">`);
        _push(ssrRenderComponent(_sfc_main$2, {
          stats,
          onFilterChange: ($event) => activeFilter.value = $event
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="">`);
      if (hasUserAlreadyReviewed.value) {
        _push(`<div class="text-center p-6 bg-green-50 border border-green-100 rounded-xl"><p class="text-green-800 font-medium">${ssrInterpolate(_ctx.$t("Thank you for your feedback!"))}</p><p class="text-green-600 text-sm mt-1">${ssrInterpolate(_ctx.$t(
          "Your opinion is important to us and helps us improve."
        ))}</p></div>`);
      } else {
        _push(ssrRenderComponent(_sfc_main$4, {
          form,
          "is-authenticated": auth.value,
          onOpenAuth: ($event) => isAuthModalOpen.value = true,
          onSubmit: handleSubmit,
          loading: unref(api).loading.value
        }, null, _parent));
      }
      _push(`</div><div class="">`);
      _push(ssrRenderComponent(_sfc_main$5, {
        loading: unref(api).loading.value,
        reviews: reviews.value
      }, null, _parent));
      _push(`</div></div>`);
      _push(ssrRenderComponent(AuthModal, {
        isOpen: isAuthModalOpen.value,
        onClose: ($event) => isAuthModalOpen.value = false
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Review/Reviews.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ Object.assign({
  layout: _sfc_main$6
}, {
  __name: "View",
  __ssrInlineRender: true,
  props: {
    data: Object
  },
  setup(__props) {
    const props = __props;
    const quantity = ref(1);
    const item = computed(() => props.data?.item?.data || {});
    const hasDiscount = computed(() => {
      const old = Number(item.value?.old_price);
      const curr = Number(item.value?.price);
      return old > curr;
    });
    const discountPercentage = computed(() => {
      if (!hasDiscount.value) return 0;
      return Math.round(
        (item.value.old_price - item.value.price) / item.value.old_price * 100
      );
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-4"><div class="bg-gray-200 p-4 h-full border">`);
      _push(ssrRenderComponent(MediaSlider, {
        images: item.value.images
      }, null, _parent));
      _push(`</div><div class="bg-white p-4 h-full border">`);
      if (item.value.category) {
        _push(`<nav aria-label="Breadcrumb">`);
        _push(ssrRenderComponent(unref(link_default), {
          href: item.value.category.url,
          class: "text-sm text-gray-700 hover:text-blue-600 underline-offset-2 hover:underline"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(item.value.category.title)}`);
            } else {
              return [
                createTextVNode(toDisplayString(item.value.category.title), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</nav>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<h1 class="font-semibold text-2xl mt-2 mb-4">${ssrInterpolate(item.value.title)}</h1><div class="flex items-center space-x-2 mb-4" role="img"${ssrRenderAttr(
        "aria-label",
        "Рейтинг товару: " + item.value.average_reviews.rating + " з 5"
      )}>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        "model-value": item.value.average_reviews.rating,
        size: 16,
        "read-only": ""
      }, null, _parent));
      _push(`<span class="text-sm text-gray-600">(${ssrInterpolate(item.value.average_reviews.total)})</span></div><div>`);
      _push(ssrRenderComponent(_sfc_main$7, {
        q: item.value.quantity || 0
      }, null, _parent));
      _push(`</div><div class="flex items-center gap-4 mb-6">`);
      if (hasDiscount.value) {
        _push(`<div class="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded"> -${ssrInterpolate(discountPercentage.value)}% </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex flex-col">`);
      if (hasDiscount.value) {
        _push(`<span class="text-sm text-gray-400 line-through"><span class="sr-only">Стара ціна: </span>${ssrInterpolate(_ctx.$formatPrice(item.value.old_price))}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<span class="${ssrRenderClass([hasDiscount.value ? "text-red-600" : "text-black", "text-2xl font-bold"])}"><span class="sr-only">Ціна: </span>${ssrInterpolate(_ctx.$formatPrice(item.value.price))}</span></div></div><div class="flex items-center mb-8"><label for="quantity-input" class="sr-only">Кількість товару</label><div class="flex items-center border border-gray-300 rounded-lg h-12 bg-white shadow-sm"><button aria-label="Зменшити кількість" class="px-4 h-full hover:bg-gray-100 transition-colors disabled:opacity-30"${ssrIncludeBooleanAttr(quantity.value <= 1) ? " disabled" : ""}>`);
      _push(ssrRenderComponent(unref(IconMinus), {
        size: 18,
        "stroke-width": "2"
      }, null, _parent));
      _push(`</button><input id="quantity-input"${ssrRenderAttr("value", quantity.value)} type="number" readonly class="w-14 text-center border-none bg-transparent font-bold text-lg focus:ring-0"><button aria-label="Збільшити кількість" class="px-4 h-full hover:bg-gray-100 transition-colors">`);
      _push(ssrRenderComponent(unref(IconPlus), {
        size: 18,
        "stroke-width": "2"
      }, null, _parent));
      _push(`</button></div></div></div><div class="border p-4 bg-white col-span-2">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        "model-type": "Item",
        "model-id": item.value.id,
        "model-title": item.value.title
      }, null, _parent));
      _push(`</div></div>`);
      _push(ssrRenderComponent(_sfc_main$8, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/Commerce/View.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
