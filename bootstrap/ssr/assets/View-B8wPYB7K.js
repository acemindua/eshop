import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { mergeProps, unref, useSSRContext, ref, computed, watch, reactive } from "vue";
import { IconShoppingBag } from "@tabler/icons-vue";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import { usePage } from "@inertiajs/vue3";
import { u as useApiResourceService } from "./useApiResourceService-BibiLDfj.js";
import { _ as _sfc_main$6 } from "./SeoMeta-BKMwl4sv.js";
import { _ as _sfc_main$5 } from "./DefaultLayout-BGA2lhVk.js";
import "axios";
import "./Layout-C8l94jH5.js";
import "./UserLoginRegisterForm-tpsqiF-p.js";
import "./TextInput-C-4bWHj0.js";
const _sfc_main$4 = {
  __name: "ButtonBuy",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        type: "button",
        class: "bg-brand px-4 py-2 rounded-lg text-white inline-flex items-center justify-center gap-2"
      }, _attrs))}>`);
      _push(ssrRenderComponent(unref(IconShoppingBag), {
        stroke: 2,
        size: 32
      }, null, _parent));
      _push(`<span>${ssrInterpolate(_ctx.$t("Buy"))}</span></button>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Public/Commerce/ButtonBuy.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = {
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col md:flex-row w-full h-full gap-[1px]" }, _attrs))} data-v-3b9a1d4f>`);
      if (__props.images.length > 1) {
        _push(`<aside class="order-2 md:order-1 bg-white" data-v-3b9a1d4f><div class="flex md:flex-col gap-[1px] w-32 bg-gray-200" data-v-3b9a1d4f><!--[-->`);
        ssrRenderList(__props.images, (img, index) => {
          _push(`<button class="bg-white w-full h-full aspect-square flex items-center justify-center p-3 relative group transition-colors"${ssrRenderAttr("aria-current", activeIndex.value === index)} data-v-3b9a1d4f>`);
          if (activeIndex.value === index) {
            _push(`<div class="absolute inset-0 z-10" data-v-3b9a1d4f></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<img${ssrRenderAttr("src", img.preview || img.url)} class="${ssrRenderClass([
            activeIndex.value === index ? "opacity-100 grayscale-0" : "opacity-30 grayscale group-hover:opacity-60",
            "w-full h-full object-contain transition-all duration-500"
          ])}" loading="lazy" data-v-3b9a1d4f></button>`);
        });
        _push(`<!--]--></div></aside>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="bg-white order-1 md:order-2 flex-1 p-4 flex items-center justify-center relative" data-v-3b9a1d4f><img${ssrRenderAttr("src", currentImage.value?.url)} class="max-w-full max-h-full object-contain mix-blend-multiply gap-[1px]"${ssrRenderAttr("alt", __props.productTitle || "Product image")} data-v-3b9a1d4f><div class="absolute bottom-4 right-4 text-[9px] font-mono text-gray-400 rounded-full tracking-widest select-none" data-v-3b9a1d4f>${ssrInterpolate(activeIndex.value + 1)} / ${ssrInterpolate(__props.images.length)}</div></div></div>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Public/Commerce/MediaSlider.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const MediaSlider = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-3b9a1d4f"]]);
const _sfc_main$2 = {
  __name: "StarRating",
  __ssrInlineRender: true,
  props: {
    modelValue: {
      // Для v-model, якщо використовуємо для вводу
      type: Number,
      default: 0
    },
    initialRating: {
      // Для відображення вже існуючого рейтингу (read-only)
      type: Number,
      default: 0
    },
    maxStars: {
      type: Number,
      default: 5
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    showAverage: {
      type: Boolean,
      default: false
    },
    averageRating: {
      type: Number,
      default: 0
    }
  },
  emits: ["update:modelValue", "rating-selected"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const internalRating = ref(props.modelValue || props.initialRating);
    const hoverRating = ref(0);
    const currentRating = computed(() => hoverRating.value || internalRating.value);
    watch(
      () => props.modelValue,
      (newVal) => {
        internalRating.value = newVal;
      }
    );
    watch(
      () => props.initialRating,
      (newVal) => {
        if (props.readOnly) {
          internalRating.value = newVal;
        }
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center text-2xl" }, _attrs))}><!--[-->`);
      ssrRenderList(__props.maxStars, (star) => {
        _push(`<span class="${ssrRenderClass([{
          "text-yellow-400": star <= currentRating.value,
          // Заповнені зірки
          "text-gray-300": star > currentRating.value,
          // Незаповнені зірки
          "hover:text-yellow-500": !__props.readOnly
          // Ефект при наведенні для інтерактивних зірок
        }, "cursor-pointer transition-colors duration-200"])}"> ★ </span>`);
      });
      _push(`<!--]-->`);
      if (__props.showAverage && __props.averageRating > 0) {
        _push(`<span class="ml-2 text-sm text-gray-600"> (${ssrInterpolate(__props.averageRating.toFixed(1))}) </span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Review/StarRating.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "ReviewForm",
  __ssrInlineRender: true,
  props: {
    modelType: { type: String, required: true },
    modelId: { type: Number, required: true }
  },
  emits: ["review-added"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const api = useApiResourceService();
    const page = usePage();
    const auth = computed(() => page.props.auth?.user);
    const form = reactive({
      title: "",
      review: "",
      rating: 0,
      model: props.modelType,
      model_id: props.modelId
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (auth.value) {
        _push(`<div${ssrRenderAttrs(_attrs)}><form><div class="mb-4"><label class="block text-sm font-medium text-gray-700 mb-1">Оцінка:</label>`);
        _push(ssrRenderComponent(_sfc_main$2, {
          modelValue: form.rating,
          "onUpdate:modelValue": ($event) => form.rating = $event
        }, null, _parent));
        if (unref(api).errorsRequests.value?.rating) {
          _push(`<p class="mt-1 text-sm text-red-600">${ssrInterpolate(unref(api).errorsRequests.value.rating[0])}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="mb-6"><label for="review" class="block text-sm font-medium text-gray-700 mb-1">Ваш відгук:</label><textarea id="review" rows="5" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="Поділіться враженнями...">${ssrInterpolate(form.review)}</textarea>`);
        if (unref(api).errorsRequests.value?.review) {
          _push(`<p class="mt-1 text-sm text-red-600">${ssrInterpolate(unref(api).errorsRequests.value.review[0])}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><button type="submit"${ssrIncludeBooleanAttr(unref(api).loading.value) ? " disabled" : ""} class="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 disabled:opacity-25 transition">`);
        if (unref(api).loading.value) {
          _push(`<span>Відправка...</span>`);
        } else {
          _push(`<span>Надіслати відгук</span>`);
        }
        _push(`</button>`);
        if (unref(api).errorsRequests.value?.general) {
          _push(`<p class="mt-3 text-sm text-red-600">${ssrInterpolate(unref(api).errorsRequests.value.general[0])}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</form></div>`);
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-yellow-50 border-l-4 border-yellow-400 p-4" }, _attrs))}><p class="text-sm text-yellow-700"> Будь ласка, <a href="/login" class="font-bold underline">увійдіть</a>, щоб залишити відгук. </p></div>`);
      }
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Review/ReviewForm.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ Object.assign({
  layout: _sfc_main$5
}, {
  __name: "View",
  __ssrInlineRender: true,
  props: {
    data: Object
  },
  setup(__props) {
    const props = __props;
    const product = computed(() => props?.data?.item?.data || {});
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="grid grid-cols-2 md:grid-cols-12 w-full h-full gap-2"><div class="col-span-5 h-[75vh]">`);
      _push(ssrRenderComponent(MediaSlider, {
        images: product.value.images
      }, null, _parent));
      _push(`</div><div class="col-span-5 h-full flex flex-col bg-gray-200 gap-[1px]"><div class="p-12 flex flex-col bg-white"><h2 class="uppercase text-gray-500">${ssrInterpolate(product.value?.category?.title)}</h2><h1 class="font-semibold text-2xl">${ssrInterpolate(product.value?.seo?.title || product.value.title || "Товар")}</h1><p>`);
      _push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
      _push(`</p></div><div class="p-12 bg-white flex items-center gap-4"><div><div>`);
      if (product.value?.quantity > 0) {
        _push(`<span>${ssrInterpolate(_ctx.$t("inStoke"))}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><span class="text-2xl font-semibold">${ssrInterpolate(product.value.price)}₴</span></div>`);
      if (product.value.old_price) {
        _push(`<div class="line-through">${ssrInterpolate(product.value.old_price)}₴ </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div>`);
      _push(ssrRenderComponent(_sfc_main$4, null, null, _parent));
      _push(`</div></div><div class="p-12 bg-white">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        "model-id": product.value.id,
        "model-type": `Item`
      }, null, _parent));
      _push(`</div><div class="p-12 bg-white">${ssrInterpolate(product.value.description)}</div></div><div class="p-6 h-full col-span-2"></div><div class="p-6 h-full col-span-full bg-white">`);
      if (product.value?.images && product.value?.images?.length) {
        _push(`<div><!--[-->`);
        ssrRenderList(product.value?.images, (img) => {
          _push(`<div class="flex items-center justify-center w-full h-full"><img${ssrRenderAttr("src", img?.url)} class="max-w-full max-h-full object-contain mix-blend-multiply gap-[1px]"${ssrRenderAttr("alt", "Product image")}></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="bg-gray-100 rounded-lg p-12 overflow-hidden col-span-full"><pre>            ${ssrInterpolate(product.value)}
        </pre></div></div>`);
      _push(ssrRenderComponent(_sfc_main$6, null, null, _parent));
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
