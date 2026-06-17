import { ref, computed, watch, mergeProps, useSSRContext, unref } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrRenderComponent, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { IconLoader2, IconBrandTelegram } from "@tabler/icons-vue";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import { _ as _sfc_main$3 } from "./StarRating-BIiPcL0U.js";
const _sfc_main$2 = {
  __name: "MediaSlider",
  __ssrInlineRender: true,
  props: {
    images: { type: Array, required: true, default: () => [] },
    productTitle: { type: String, default: "" }
  },
  setup(__props) {
    const props = __props;
    const activeIndex = ref(0);
    const currentImage = computed(() => props.images[activeIndex.value] || null);
    watch(
      () => props.images.length,
      () => {
        activeIndex.value = 0;
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col md:flex-row w-full h-full gap-[1px]" }, _attrs))} data-v-0fd1f971>`);
      if (__props.images.length > 1) {
        _push(`<aside class="order-2 md:order-1 bg-white" data-v-0fd1f971><div class="flex md:flex-col gap-[1px] w-32 bg-gray-200" data-v-0fd1f971><!--[-->`);
        ssrRenderList(__props.images, (img, index) => {
          _push(`<button class="bg-white w-full h-full aspect-square flex items-center justify-center p-3 relative group transition-colors"${ssrRenderAttr("aria-current", activeIndex.value === index)} data-v-0fd1f971>`);
          if (activeIndex.value === index) {
            _push(`<div class="absolute inset-0 z-10" data-v-0fd1f971></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<img${ssrRenderAttr("src", img.preview || img.url)} class="${ssrRenderClass([
            activeIndex.value === index ? "opacity-100 grayscale-0" : "opacity-30 grayscale group-hover:opacity-60",
            "w-full h-full object-contain transition-all duration-500"
          ])}" loading="lazy" data-v-0fd1f971></button>`);
        });
        _push(`<!--]--></div></aside>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="bg-white order-1 md:order-2 flex-1 p-4 flex items-center justify-center relative" data-v-0fd1f971><img${ssrRenderAttr("src", currentImage.value?.url)} class="max-w-full max-h-full object-contain mix-blend-multiply gap-[1px]"${ssrRenderAttr("alt", __props.productTitle || "Product image")} data-v-0fd1f971><div class="absolute bottom-4 right-4 text-[9px] font-mono text-gray-400 rounded-full tracking-widest select-none" data-v-0fd1f971>${ssrInterpolate(activeIndex.value + 1)} / ${ssrInterpolate(__props.images.length)}</div></div></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Public/Commerce/MediaSlider.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const MediaSlider = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-0fd1f971"]]);
const _sfc_main$1 = {
  __name: "ReviewForm",
  __ssrInlineRender: true,
  props: {
    form: { type: Object, required: true },
    isAuthenticated: { type: [Object, Boolean], default: false },
    loading: { type: Boolean, default: false }
  },
  emits: ["open-auth", "submit"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "review-form-container" }, _attrs))}>`);
      if (!__props.isAuthenticated) {
        _push(`<div class="text-center p-6 bg-gray-50 rounded-xl border border-gray-100"><p class="text-gray-600 mb-4 text-sm">${ssrInterpolate(_ctx.$t("Only registered users can leave reviews."))}</p><button class="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium">${ssrInterpolate(_ctx.$t("Sign in"))}</button></div>`);
      } else {
        _push(`<form class="space-y-4">`);
        _push(ssrRenderComponent(_sfc_main$3, {
          modelValue: props.form.rating,
          "onUpdate:modelValue": ($event) => props.form.rating = $event,
          readOnly: false,
          showAverage: false
        }, null, _parent));
        _push(`<textarea rows="4" required class="w-full p-3 border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all resize-none"${ssrRenderAttr("placeholder", _ctx.$t("Share your experience..."))}>${ssrInterpolate(props.form.review)}</textarea><button type="submit"${ssrIncludeBooleanAttr(__props.loading || props.form.rating === 0) ? " disabled" : ""} class="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 disabled:opacity-50 transition-all">`);
        if (__props.loading) {
          _push(ssrRenderComponent(unref(IconLoader2), { class: "w-5 h-5 animate-spin" }, null, _parent));
        } else {
          _push(ssrRenderComponent(unref(IconBrandTelegram), {
            size: 20,
            stroke: "2"
          }, null, _parent));
        }
        _push(`<span>${ssrInterpolate(__props.loading ? _ctx.$t("Sending...") : _ctx.$t("Send Review"))}</span></button></form>`);
      }
      _push(`</section>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Review/ReviewForm.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "ReviewList",
  __ssrInlineRender: true,
  props: {
    loading: { type: Boolean, default: false },
    reviews: { type: Array, default: () => [] }
  },
  setup(__props) {
    const props = __props;
    const isEmpty = computed(() => !props.loading && props.reviews.length === 0);
    computed(() => !props.loading && props.reviews.length > 0);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-8" }, _attrs))}>`);
      if (__props.loading) {
        _push(`<div class="flex justify-center py-10"><svg class="animate-spin h-5 w-5 text-blue-600" viewBox="0 0 24 24"></svg></div>`);
      } else if (isEmpty.value) {
        _push(`<div class="text-center py-12 text-gray-400 italic">${ssrInterpolate(_ctx.$t(
          "There are no reviews yet. Be the first to share your thoughts."
        ))}</div>`);
      } else {
        _push(`<div class="space-y-4"><!--[-->`);
        ssrRenderList(__props.reviews, (review) => {
          _push(`<div class="flex items-start gap-x-12"><div class="py-2 shrink-0 flex flex-col">`);
          _push(ssrRenderComponent(_sfc_main$3, {
            "model-value": review.rating,
            "read-only": "",
            "show-average": false,
            size: 18
          }, null, _parent));
          _push(`<span class="text-xs text-gray-500 mt-1">${ssrInterpolate(_ctx.$formatDate(review.created_at))}</span></div><div class="flex-1"><p class="text-gray-800 leading-relaxed bg-gray-50 rounded-lg">${ssrInterpolate(review.review)}</p><p class="mt-4 text-sm font-medium text-gray-600"> — ${ssrInterpolate(review.user_name)}</p></div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Review/ReviewList.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  MediaSlider as M,
  _sfc_main$1 as _,
  _sfc_main as a
};
