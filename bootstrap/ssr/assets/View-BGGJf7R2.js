import { ref, computed, watch, mergeProps, useSSRContext, reactive, unref, onMounted, withCtx, createVNode, resolveDynamicComponent, openBlock, createBlock, Fragment, renderList, toDisplayString, createCommentVNode } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrRenderComponent, ssrIncludeBooleanAttr, ssrRenderVNode } from "vue/server-renderer";
import { _ as _sfc_main$6, a as _sfc_main$7, b as _sfc_main$8 } from "./DefaultLayout-D88p-vPg.js";
import { IconMinus, IconPlus } from "@tabler/icons-vue";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import { u as usePage, h as head_default } from "../ssr.js";
import { u as useApiResourceService } from "./useApiResourceService-BibiLDfj.js";
import "./Layout-BbYAnI22.js";
import "./ApplicationLogo-DsJOFw9w.js";
import "./Breadcrumbs-DA__G0nP.js";
import "./LangSwitcher-cLn0_SeS.js";
import "@headlessui/vue";
import "./useLocales-V6QHCGCa.js";
import "@inertiajs/core";
import "./UserLoginRegisterForm--fvTPzxL.js";
import "./AuthModal-yb31sphO.js";
import "./TextInput-Dmmb8A31.js";
import "./InputError-Cp3nFeNd.js";
import "@vue/shared";
import "@vue/compiler-ssr";
import "node:stream";
import "lodash-es";
import "laravel-precognition";
import "@inertiajs/core/server";
import "pinia";
import "@floating-ui/dom";
import "axios";
const _sfc_main$5 = {
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
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Public/Commerce/MediaSlider.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const MediaSlider = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-0fd1f971"]]);
const _sfc_main$4 = {
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
      model_id: props.modelId,
      user_id: auth.value?.data?.id || null
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (auth.value) {
        _push(`<div${ssrRenderAttrs(_attrs)}><form><div class="mb-4"><label class="block text-sm font-medium text-gray-700 mb-1">Оцінка:</label>`);
        _push(ssrRenderComponent(_sfc_main$6, {
          modelValue: form.rating,
          "onUpdate:modelValue": ($event) => form.rating = $event
        }, null, _parent));
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
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Review/ReviewForm.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = {
  __name: "ReviewList",
  __ssrInlineRender: true,
  props: {
    modelType: { type: String, required: true },
    modelId: { type: Number, required: true },
    currentUser: { type: Object, default: null }
  },
  emits: ["review-deleted", "edit-review"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const page = usePage();
    const api = useApiResourceService();
    const reviews = ref([]);
    const currentPage = ref(1);
    const lastPage = ref(1);
    const hasMoreReviews = ref(false);
    computed(() => page.props.auth?.user);
    const fetchReviews = async () => {
      const url = `/api/reviews?model=${props.modelType}&model_id=${props.modelId}&page=${currentPage.value}`;
      try {
        const response = await api.fetchData(url);
        const result = response.data;
        if (result) {
          console.log(result);
          if (currentPage.value === 1) {
            reviews.value = result;
          } else {
            reviews.value = [...reviews.value, ...result];
          }
          currentPage.value = result.current_page;
          lastPage.value = result.last_page;
          hasMoreReviews.value = currentPage.value < lastPage.value;
        }
      } catch (e) {
        console.error("Помилка при завантаженні відгуків:", e);
      }
    };
    const formatDate = (dateString) => {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString("uk-UA", options);
    };
    onMounted(fetchReviews);
    __expose({
      fetchReviews,
      currentPage,
      // Експортуємо для зовнішнього управління (наприклад, для скидання пагінації)
      reviews
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "review-list" }, _attrs))} data-v-982a9416><h2 class="text-2xl font-semibold mb-4 text-gray-800" data-v-982a9416> Відгуки користувачів </h2>`);
      if (unref(api).loading.value) {
        _push(`<div class="text-center text-gray-600 py-4" data-v-982a9416> Завантаження відгуків... </div>`);
      } else if (reviews.value.length === 0) {
        _push(`<div class="text-center text-gray-600 py-4" data-v-982a9416> Ще немає відгуків. Будьте першим! </div>`);
      } else {
        _push(`<div data-v-982a9416><!--[-->`);
        ssrRenderList(reviews.value, (review) => {
          _push(`<div class="bg-white p-4 rounded-lg shadow-sm mb-4 border border-gray-200" data-v-982a9416><div class="flex items-center justify-between mb-2" data-v-982a9416><div class="flex items-center" data-v-982a9416>`);
          _push(ssrRenderComponent(_sfc_main$6, {
            "initial-rating": review.overall_rating,
            "read-only": true,
            class: "text-lg"
          }, null, _parent));
          _push(`<span class="ml-3 text-sm text-gray-600" data-v-982a9416> від ${ssrInterpolate(review.user ? review.user.name : "Анонім")} на ${ssrInterpolate(formatDate(review.created_at))}</span></div>`);
          if (__props.currentUser && review.user_id === __props.currentUser.id) {
            _push(`<div class="flex space-x-2" data-v-982a9416><button class="text-blue-500 hover:text-blue-700 text-sm font-medium" data-v-982a9416> Редагувати </button><button class="text-red-500 hover:text-red-700 text-sm font-medium" data-v-982a9416> Видалити </button></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
          if (review.title) {
            _push(`<h4 class="text-lg font-semibold text-gray-700 mb-1" data-v-982a9416>${ssrInterpolate(review.title)}</h4>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<p class="text-gray-600 leading-relaxed" data-v-982a9416>${ssrInterpolate(review.review)}</p></div>`);
        });
        _push(`<!--]-->`);
        if (hasMoreReviews.value) {
          _push(`<button${ssrIncludeBooleanAttr(unref(api).loading.value) ? " disabled" : ""} class="mt-4 w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed" data-v-982a9416>`);
          if (unref(api).loading.value) {
            _push(`<span data-v-982a9416>Завантаження...</span>`);
          } else {
            _push(`<span data-v-982a9416>Завантажити більше</span>`);
          }
          _push(`</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Review/ReviewList.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const ReviewList = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-982a9416"]]);
const _sfc_main$2 = {
  __name: "SchemaMarkup",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const schemas = computed(() => {
      const data = page.props.seo?.schema || [];
      return (Array.isArray(data) ? data : [data]).map((s) => JSON.stringify(s));
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(head_default), _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(schemas.value, (jsonStr, index) => {
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent("script"), {
                key: index,
                type: "application/ld+json"
              }, null), _parent2, _scopeId);
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(schemas.value, (jsonStr, index) => {
                return openBlock(), createBlock(resolveDynamicComponent("script"), {
                  key: index,
                  type: "application/ld+json",
                  innerHTML: jsonStr
                }, null, 8, ["innerHTML"]);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/SchemaMarkup.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "SeoMeta",
  __ssrInlineRender: true,
  setup(__props) {
    const seo = computed(() => usePage().props.seo);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(head_default), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>${ssrInterpolate(seo.value.title)}</title><meta name="description"${ssrRenderAttr("content", seo.value.description)}${_scopeId}>`);
            if (seo.value.keywords) {
              _push2(`<meta name="keywords"${ssrRenderAttr("content", seo.value.keywords)}${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<meta property="og:site_name"${ssrRenderAttr("content", seo.value.site_name)}${_scopeId}><meta property="og:type"${ssrRenderAttr("content", seo.value.type)}${_scopeId}><meta property="og:url"${ssrRenderAttr("content", seo.value.url)}${_scopeId}><meta property="og:title"${ssrRenderAttr("content", seo.value.title)}${_scopeId}><meta property="og:description"${ssrRenderAttr("content", seo.value.description)}${_scopeId}><meta property="og:image"${ssrRenderAttr("content", seo.value.og_image)}${_scopeId}><meta name="robots"${ssrRenderAttr("content", seo.value.robots)}${_scopeId}><link rel="canonical"${ssrRenderAttr("href", seo.value.canonical)}${_scopeId}><!--[-->`);
            ssrRenderList(seo.value.hreflangs, (url, lang) => {
              _push2(`<link rel="alternate"${ssrRenderAttr("hreflang", lang)}${ssrRenderAttr("href", url)}${_scopeId}>`);
            });
            _push2(`<!--]-->`);
          } else {
            return [
              createVNode("title", null, toDisplayString(seo.value.title), 1),
              createVNode("meta", {
                name: "description",
                content: seo.value.description
              }, null, 8, ["content"]),
              seo.value.keywords ? (openBlock(), createBlock("meta", {
                key: 0,
                name: "keywords",
                content: seo.value.keywords
              }, null, 8, ["content"])) : createCommentVNode("", true),
              createVNode("meta", {
                property: "og:site_name",
                content: seo.value.site_name
              }, null, 8, ["content"]),
              createVNode("meta", {
                property: "og:type",
                content: seo.value.type
              }, null, 8, ["content"]),
              createVNode("meta", {
                property: "og:url",
                content: seo.value.url
              }, null, 8, ["content"]),
              createVNode("meta", {
                property: "og:title",
                content: seo.value.title
              }, null, 8, ["content"]),
              createVNode("meta", {
                property: "og:description",
                content: seo.value.description
              }, null, 8, ["content"]),
              createVNode("meta", {
                property: "og:image",
                content: seo.value.og_image
              }, null, 8, ["content"]),
              createVNode("meta", {
                name: "robots",
                content: seo.value.robots
              }, null, 8, ["content"]),
              createVNode("link", {
                rel: "canonical",
                href: seo.value.canonical
              }, null, 8, ["href"]),
              (openBlock(true), createBlock(Fragment, null, renderList(seo.value.hreflangs, (url, lang) => {
                return openBlock(), createBlock("link", {
                  key: lang,
                  rel: "alternate",
                  hreflang: lang,
                  href: url
                }, null, 8, ["hreflang", "href"]);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/SeoMeta.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ Object.assign({
  layout: _sfc_main$7
}, {
  __name: "View",
  __ssrInlineRender: true,
  props: {
    data: Object
  },
  setup(__props) {
    const props = __props;
    const quantity = ref(1);
    const product = computed(() => props?.data?.item?.data || {});
    computed(
      () => product?.value?.average_reviews?.count || 0
    );
    const reviewsRating = computed(
      () => product?.value?.average_reviews?.rating || 0
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="grid grid-cols-2 md:grid-cols-12 w-full h-full gap-2" data-v-5b613656><div class="col-span-5 h-[75vh]" data-v-5b613656>`);
      _push(ssrRenderComponent(MediaSlider, {
        images: product.value.images
      }, null, _parent));
      _push(`</div><div class="col-span-7 h-full flex flex-col bg-gray-200 gap-[1px]" data-v-5b613656><div class="p-12 flex flex-col bg-white" data-v-5b613656><h2 class="uppercase text-gray-400 text-xs tracking-widest mb-2 font-[&#39;Exo_2&#39;]" data-v-5b613656>${ssrInterpolate(product.value?.category?.title)}</h2><h1 class="font-semibold text-3xl leading-tight" data-v-5b613656>${ssrInterpolate(product.value?.seo?.title || product.value.title || "Товар")}</h1><div class="mt-4" data-v-5b613656>`);
      _push(ssrRenderComponent(_sfc_main$6, {
        "read-only": true,
        "show-average": true,
        "initial-rating": Number(reviewsRating.value),
        "average-rating": Number(reviewsRating.value)
      }, null, _parent));
      _push(`</div></div><div class="p-12 bg-white flex flex-wrap items-center gap-8" data-v-5b613656><div data-v-5b613656><div class="mb-1 h-5" data-v-5b613656>`);
      if (product.value?.quantity > 0) {
        _push(`<span class="text-[10px] text-green-600 font-bold uppercase tracking-tighter" data-v-5b613656>${ssrInterpolate(_ctx.$t("inStoke"))}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="flex flex-col" data-v-5b613656>`);
      if (product.value.old_price) {
        _push(`<span class="text-sm text-gray-400 line-through -mb-1" data-v-5b613656>${ssrInterpolate(product.value.old_price)}₴ </span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<span class="text-3xl font-bold font-[&#39;Exo_2&#39;]" data-v-5b613656>${ssrInterpolate(product.value.price)}₴ </span></div></div><div class="flex items-center border border-gray-200 rounded-lg h-14 bg-gray-50" data-v-5b613656><button class="px-4 h-full hover:bg-white transition-colors disabled:opacity-30 border-r"${ssrIncludeBooleanAttr(quantity.value <= 1) ? " disabled" : ""} data-v-5b613656>`);
      _push(ssrRenderComponent(unref(IconMinus), {
        size: 18,
        "stroke-width": "1.5"
      }, null, _parent));
      _push(`</button><input${ssrRenderAttr("value", quantity.value)} type="number" readonly class="w-14 text-center border-none bg-transparent focus:ring-0 font-[&#39;Exo_2&#39;] font-bold text-lg" data-v-5b613656><button class="px-4 h-full hover:bg-white transition-colors border-l" data-v-5b613656>`);
      _push(ssrRenderComponent(unref(IconPlus), {
        size: 18,
        "stroke-width": "1.5"
      }, null, _parent));
      _push(`</button></div><div class="flex-grow md:flex-grow-0" data-v-5b613656>`);
      _push(ssrRenderComponent(_sfc_main$8, {
        id: product.value.id,
        title: product.value.title,
        price: product.value.price,
        qty: quantity.value,
        class: "w-full md:w-auto h-14 min-w-[180px]"
      }, null, _parent));
      _push(`</div></div><div class="p-12 bg-white" data-v-5b613656><h3 class="font-bold uppercase text-xs tracking-widest mb-6" data-v-5b613656> Залишити відгук </h3>`);
      _push(ssrRenderComponent(_sfc_main$4, {
        "model-id": product.value.id,
        "model-type": "Item"
      }, null, _parent));
      _push(`</div><div class="p-12 bg-white" data-v-5b613656><h3 class="font-bold uppercase text-xs tracking-widest mb-6 text-gray-400" data-v-5b613656> Відгуки клієнтів </h3>`);
      _push(ssrRenderComponent(ReviewList, {
        "model-id": product.value.id,
        "model-type": "Item"
      }, null, _parent));
      _push(`</div><div class="p-12 bg-white flex-grow" data-v-5b613656><h3 class="font-bold uppercase text-xs tracking-widest mb-4" data-v-5b613656> Опис товару </h3><div class="prose prose-sm text-gray-600 leading-relaxed" data-v-5b613656>${ssrInterpolate(product.value.description)}</div></div></div><div class="p-6 h-full col-span-2" data-v-5b613656></div><div class="p-6 h-full col-span-full bg-white border-t border-gray-100" data-v-5b613656>`);
      if (product.value?.images?.length > 1) {
        _push(`<div class="grid grid-cols-2 md:grid-cols-4 gap-4" data-v-5b613656><!--[-->`);
        ssrRenderList(product.value.images, (img, index) => {
          _push(`<div class="aspect-square bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center p-4" data-v-5b613656><img${ssrRenderAttr("src", img?.url)} class="max-w-full max-h-full object-contain mix-blend-multiply"${ssrRenderAttr("alt", product.value.title)} data-v-5b613656></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="bg-gray-100 rounded-lg p-12 overflow-hidden col-span-full" data-v-5b613656><h4 class="text-xs font-mono text-gray-400 mb-4 uppercase tracking-widest" data-v-5b613656> Debug Info </h4><pre class="text-[10px] leading-tight text-gray-500 overflow-x-auto" data-v-5b613656>${ssrInterpolate(product.value)}</pre></div></div>`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
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
const View = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5b613656"]]);
export {
  View as default
};
