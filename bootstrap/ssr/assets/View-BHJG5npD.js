import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrRenderStyle } from "vue/server-renderer";
import { useHead } from "@unhead/vue";
import { _ as _sfc_main$4, a as _sfc_main$5, M as MediaSlider } from "./ReviewList-DIwFmrsY.js";
import { computed, mergeProps, unref, useSSRContext, ref, reactive, watch, onMounted } from "vue";
import { A as AuthModal } from "./AuthModal-CIdPxOdr.js";
import { IconStarFilled } from "@tabler/icons-vue";
import { _ as _sfc_main$3 } from "./StarRating-BIiPcL0U.js";
import { w as wTransChoice, b as usePage } from "../ssr.js";
import { u as useApiResourceService } from "./useApiResourceService-BAm4_Pfc.js";
import "./SeoMeta-D98tVnaL.js";
import { _ as _sfc_main$6 } from "./DefaultLayout-B74gfzmX.js";
import _sfc_main$8 from "./QuantityStatus-BjP6BbJj.js";
import _sfc_main$7 from "./StatsRating-8EdIqWFW.js";
import _sfc_main$9 from "./ProductPrice-B0kbdA1m.js";
import BuyButton from "./BuyButton-DurVeyzU.js";
import _sfc_main$a from "./QuantitySelector-DyCV-Jzo.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./TextInput-5OXx1Hvj.js";
import "./InputLabel-BSWPuOQO.js";
import "./InputError-Cp3nFeNd.js";
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
import "axios";
import "./LangSwitcher-e9tQy0N1.js";
import "@headlessui/vue";
import "./useLocales-sgag9Abd.js";
import "./ApplicationLogo-CSNe_4RD.js";
import "./CartButton-CHDIERBZ.js";
import "./VarDump-DqvrPBoK.js";
import "./UserLoginRegisterForm-LzyRbNgH.js";
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
    data: Object,
    schema: String
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
    useHead({
      script: [
        {
          type: "application/ld+json",
          innerHTML: props.schema
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="w-full p-[1px]"><div class="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-2"><div class="bg-gray-200 h-full">`);
      _push(ssrRenderComponent(MediaSlider, {
        images: item.value.images
      }, null, _parent));
      _push(`</div><div class="h-full flex flex-col divide-y gap-2"><div class="bg-white p-2 md:p-4 rounded-md flex flex-col space-y-2"><h1 class="font-semibold text-xl">${ssrInterpolate(item.value.title)}</h1>`);
      _push(ssrRenderComponent(_sfc_main$7, {
        "average-reviews": item.value.average_reviews || {}
      }, null, _parent));
      _push(`</div><div class="bg-white p-4"></div><div class="bg-white p-4">`);
      _push(ssrRenderComponent(_sfc_main$8, {
        q: item.value.quantity || 0
      }, null, _parent));
      _push(`</div>`);
      if (hasDiscount.value) {
        _push(`<div class="bg-white p-4"><div class="flex items-center"><div class="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded"> -${ssrInterpolate(discountPercentage.value)}% </div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="bg-white p-4 flex items-center gap-4">`);
      _push(ssrRenderComponent(_sfc_main$9, {
        q: item.value.quantity || 0,
        "has-discount": hasDiscount.value,
        price: {
          price: item.value.price,
          old_price: item.value.old_price
        }
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$a, {
        modelValue: quantity.value,
        "onUpdate:modelValue": ($event) => quantity.value = $event,
        max: item.value.quantity || 0
      }, null, _parent));
      if (item.value.quantity > 0) {
        _push(ssrRenderComponent(BuyButton, {
          data: item.value,
          class: "scale-90 origin-right relative z-30"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="bg-white p-4 grow"></div></div><div class="bg-white p-4 col-span-2">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        "model-type": "Item",
        "model-id": item.value.id,
        "model-title": item.value.title
      }, null, _parent));
      _push(`</div></div></div><div class="h-screen"></div><!--]-->`);
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
