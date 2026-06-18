import { ref, computed, watch, mergeProps, useSSRContext, unref, withCtx, createVNode, resolveDynamicComponent, openBlock, createBlock, Fragment, renderList, toDisplayString, createCommentVNode } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrRenderComponent, ssrIncludeBooleanAttr, ssrRenderVNode } from "vue/server-renderer";
import { IconLoader2, IconBrandTelegram } from "@tabler/icons-vue";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import { _ as _sfc_main$5 } from "./StarRating-BIiPcL0U.js";
import { b as usePage, h as head_default } from "../ssr.js";
const _sfc_main$4 = {
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
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Public/Commerce/MediaSlider.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const MediaSlider = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-0fd1f971"]]);
const _sfc_main$3 = {
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
        _push(ssrRenderComponent(_sfc_main$5, {
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
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Review/ReviewForm.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {
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
          _push(ssrRenderComponent(_sfc_main$5, {
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
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Review/ReviewList.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/SchemaMarkup.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
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
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/SeoMeta.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  MediaSlider as M,
  _sfc_main$3 as _,
  _sfc_main$2 as a,
  _sfc_main as b
};
