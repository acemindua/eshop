import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { computed, mergeProps, unref, withCtx, createVNode, useSSRContext } from "vue";
import { Link } from "@inertiajs/vue3";
import { IconMessage } from "@tabler/icons-vue";
import { _ as _sfc_main$2 } from "./DefaultLayout-BGA2lhVk.js";
import "./Layout-C8l94jH5.js";
import "./UserLoginRegisterForm-tpsqiF-p.js";
import "./TextInput-C-4bWHj0.js";
const _sfc_main$1 = {
  __name: "ProductCard",
  __ssrInlineRender: true,
  props: {
    data: Object
  },
  setup(__props) {
    const props = __props;
    const hasReviews = computed(
      () => props.data?.reviews?.average_rating !== null && props.data?.reviews?.reviews_count > 0
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col group relative p-2 w-full h-full transition-shadow hover:shadow-md rounded-xl" }, _attrs))}><div class="bg-gray-100 w-full h-64 rounded-lg overflow-hidden">`);
      if (__props.data.images?.length) {
        _push(`<img${ssrRenderAttr("src", __props.data.images[0].url)} alt="" class="w-full h-full object-contain transition-all duration-500 group-hover:scale-105">`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="p-2"><h3 class="font-semibold text-gray-800 transition-colors group-hover:text-brand">${ssrInterpolate(__props.data.title)}</h3></div><div class="h-8 flex w-full items-center justify-start text-xs">`);
      if (hasReviews.value) {
        _push(`<div class="flex items-center space-x-2"><p class="flex items-center space-x-1">`);
        _push(ssrRenderComponent(unref(IconMessage), {
          stroke: 1,
          class: "w-4 h-4"
        }, null, _parent));
        _push(`<span class="ml-2">${ssrInterpolate(_ctx.reviewsCount)}</span></p></div>`);
      } else {
        _push(`<div class="flex items-center space-x-1 py-1">`);
        _push(ssrRenderComponent(unref(IconMessage), {
          stroke: 1,
          class: "w-4 h-4"
        }, null, _parent));
        _push(ssrRenderComponent(unref(Link), {
          href: `${_ctx.productLink}#reviews`,
          alt: __props.data.title,
          class: "hover:underline hover:text-gray-700 duration-200"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="text-gray-500"${_scopeId}>Залишити відгук</span>`);
            } else {
              return [
                createVNode("span", { class: "text-gray-500" }, "Залишити відгук")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("page.show", __props.data.slug),
        class: "absolute inset-0 z-10",
        "aria-label": "Читати детальніше"
      }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Public/Commerce/ProductCard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: _sfc_main$2 }, {
  __name: "Home",
  __ssrInlineRender: true,
  props: {
    products: Object
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.products.data?.length) {
        _push(`<div${ssrRenderAttrs(_attrs)}><div class="grid grid-cols-2 md:grid-cols-10 gap-2"><div class="col-span-full bg-white p-12"><h1 class="font-semibold text-2xl">Товари</h1></div><!--[-->`);
        ssrRenderList(__props.products.data, (product) => {
          _push(`<div class="col-span-2 md:col-span-2 bg-white">`);
          _push(ssrRenderComponent(_sfc_main$1, { data: product }, null, _parent));
          _push(`</div>`);
        });
        _push(`<!--]--><div class="bg-gray-100 rounded-lg p-12 overflow-hidden col-span-full"><pre>            ${ssrInterpolate(__props.products)}
        </pre></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/Home.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
