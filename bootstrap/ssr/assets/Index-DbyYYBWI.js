import { mergeProps, withCtx, unref, createTextVNode, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./Layout-eqAzibxp.js";
import { Link } from "@inertiajs/vue3";
import "./ApplicationLogo-DsJOFw9w.js";
import "./Breadcrumbs-Be9A5eey.js";
import "@tabler/icons-vue";
import "./LangSwitcher-wZTGpIJc.js";
import "@headlessui/vue";
import "laravel-vue-i18n";
import "./useLocales-Cm2D8rND.js";
import "./UserLoginRegisterForm-CzuFF-4H.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./TextInput-Dmmb8A31.js";
import "./InputError-Cp3nFeNd.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: { products: Object, seo: Object },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ seo: __props.seo }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<section class="p-6 md:p-12 lg:p-20 border-b-[1px] border-black"${_scopeId}><h1 class="text-[12vw] font-black leading-[0.8] uppercase tracking-tighter italic"${_scopeId}> Fertilizer <br${_scopeId}><span class="text-gray-100 italic"${_scopeId}>Solutions</span></h1></section><section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-black gap-[1px] border-b-[1px] border-black"${_scopeId}><!--[-->`);
            ssrRenderList(__props.products.data, (product, index) => {
              _push2(`<div class="bg-white p-10 group hover:bg-gray-50 transition-colors relative"${_scopeId}><span class="text-[9px] font-bold absolute top-6 left-6 text-gray-300 italic tracking-widest"${_scopeId}>0${ssrInterpolate(index + 1)}</span><div class="aspect-[4/5] my-8 flex items-center justify-center grayscale"${_scopeId}><img${ssrRenderAttr(
                "src",
                product.images?.[0]?.preview || "/img/placeholder.png"
              )} class="max-h-full object-contain"${_scopeId}></div><div class="space-y-4"${_scopeId}><h3 class="text-xl font-black uppercase italic tracking-tighter h-12 overflow-hidden"${_scopeId}>${ssrInterpolate(product.title)}</h3><div class="flex items-baseline justify-between pt-6 border-t-[1px] border-black"${_scopeId}><span class="text-lg font-black tracking-tighter"${_scopeId}>${ssrInterpolate(product.price)} ₴</span>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: `/${product.slug}`,
                class: "text-[9px] font-black uppercase tracking-widest underline underline-offset-4"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Details `);
                  } else {
                    return [
                      createTextVNode(" Details ")
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div></div></div>`);
            });
            _push2(`<!--]--></section>`);
          } else {
            return [
              createVNode("section", { class: "p-6 md:p-12 lg:p-20 border-b-[1px] border-black" }, [
                createVNode("h1", { class: "text-[12vw] font-black leading-[0.8] uppercase tracking-tighter italic" }, [
                  createTextVNode(" Fertilizer "),
                  createVNode("br"),
                  createVNode("span", { class: "text-gray-100 italic" }, "Solutions")
                ])
              ]),
              createVNode("section", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-black gap-[1px] border-b-[1px] border-black" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(__props.products.data, (product, index) => {
                  return openBlock(), createBlock("div", {
                    key: product.id,
                    class: "bg-white p-10 group hover:bg-gray-50 transition-colors relative"
                  }, [
                    createVNode("span", { class: "text-[9px] font-bold absolute top-6 left-6 text-gray-300 italic tracking-widest" }, "0" + toDisplayString(index + 1), 1),
                    createVNode("div", { class: "aspect-[4/5] my-8 flex items-center justify-center grayscale" }, [
                      createVNode("img", {
                        src: product.images?.[0]?.preview || "/img/placeholder.png",
                        class: "max-h-full object-contain"
                      }, null, 8, ["src"])
                    ]),
                    createVNode("div", { class: "space-y-4" }, [
                      createVNode("h3", { class: "text-xl font-black uppercase italic tracking-tighter h-12 overflow-hidden" }, toDisplayString(product.title), 1),
                      createVNode("div", { class: "flex items-baseline justify-between pt-6 border-t-[1px] border-black" }, [
                        createVNode("span", { class: "text-lg font-black tracking-tighter" }, toDisplayString(product.price) + " ₴", 1),
                        createVNode(unref(Link), {
                          href: `/${product.slug}`,
                          class: "text-[9px] font-black uppercase tracking-widest underline underline-offset-4"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Details ")
                          ]),
                          _: 1
                        }, 8, ["href"])
                      ])
                    ])
                  ]);
                }), 128))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
