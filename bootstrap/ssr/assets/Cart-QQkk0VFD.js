import { resolveComponent, mergeProps, withCtx, createVNode, toDisplayString, useSSRContext, computed, unref, createTextVNode, openBlock, createBlock, Fragment, renderList, createCommentVNode } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderSlot, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { _ as _sfc_main$2 } from "./ApplicationLogo-DsJOFw9w.js";
import { _ as _sfc_main$3 } from "./LangSwitcher-wZTGpIJc.js";
import { usePage, Head, Link, router } from "@inertiajs/vue3";
import "@headlessui/vue";
import "laravel-vue-i18n";
import "./useLocales-Cm2D8rND.js";
import "@tabler/icons-vue";
const _sfc_main$1 = {
  __name: "SimpleLayout",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col w-full min-h-screen bg-gray-200 text-sm gap-2" }, _attrs))}><header class="bg-white p-4"><div class="w-full mx-auto"><nav class="inline-flex gap-4 justify-between items-center w-full px-4">`);
      _push(ssrRenderComponent(_component_Link, {
        href: "/",
        class: "flex items-center gap-2 shrink-0 group md:pr-12"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class=""${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, { class: "w-10 h-10 bg-brand fill-current" }, null, _parent2, _scopeId));
            _push2(`</div><span class="font-semibold hidden md:block"${_scopeId}>${ssrInterpolate(_ctx.$page.props?.app?.name)}</span>`);
          } else {
            return [
              createVNode("div", { class: "" }, [
                createVNode(_sfc_main$2, { class: "w-10 h-10 bg-brand fill-current" })
              ]),
              createVNode("span", { class: "font-semibold hidden md:block" }, toDisplayString(_ctx.$page.props?.app?.name), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="hidden md:flex items-center gap-4">`);
      _push(ssrRenderComponent(_sfc_main$3, null, null, _parent));
      _push(`</div></nav></div></header><main>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main><footer></footer></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/Public/Landing/SimpleLayout.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "Cart",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const cartItems = computed(() => page.props.cart?.items || []);
    const cartTotal = computed(() => page.props.cart?.total || 0);
    const updateQuantity = (id, quantity) => {
      if (quantity < 1) return;
      router.patch(
        route("cart.update", id),
        { quantity },
        {
          preserveScroll: true
        }
      );
    };
    const removeItem = (id) => {
      if (confirm("Видалити цей товар?")) {
        router.delete(route("cart.destroy", id), {
          preserveScroll: true
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>${ssrInterpolate(_ctx.$t("Your Cart"))}</title>`);
          } else {
            return [
              createVNode("title", null, toDisplayString(_ctx.$t("Your Cart")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="min-h-screen bg-gray-100 p-6 md:p-12"${_scopeId}><div class="max-w-5xl mx-auto"${_scopeId}><h1 class="text-3xl font-black mb-10 tracking-tighter uppercase italic text-gray-900"${_scopeId}>${ssrInterpolate(_ctx.$t("Shopping Cart"))}</h1>`);
            if (cartItems.value.length > 0) {
              _push2(`<div class="grid grid-cols-1 lg:grid-cols-12 gap-12"${_scopeId}><div class="lg:col-span-8 space-y-4"${_scopeId}><!--[-->`);
              ssrRenderList(cartItems.value, (item) => {
                _push2(`<div class="bg-white p-4 md:p-6 rounded-2xl border border-gray-200 flex flex-col md:flex-row gap-6 items-center transition-hover hover:shadow-xl hover:shadow-gray-200/50"${_scopeId}><div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-gray-50"${_scopeId}>`);
                if (item.attributes?.image) {
                  _push2(`<img${ssrRenderAttr("src", item.attributes.image)} class="h-full w-full object-cover"${_scopeId}>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div><div class="flex-1 text-center md:text-left"${_scopeId}><h3 class="text-sm font-black uppercase tracking-tight text-gray-900 leading-tight"${_scopeId}>${ssrInterpolate(item.name)}</h3><p class="text-xs text-gray-400 mt-1 italic"${_scopeId}> Ціна за одиницю: ${ssrInterpolate(item.price)} ₴ </p></div><div class="flex items-center gap-3 bg-gray-100 p-1 rounded-xl"${_scopeId}><button class="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm hover:bg-gray-50 active:scale-90 transition"${ssrIncludeBooleanAttr(item.quantity <= 1) ? " disabled" : ""}${_scopeId}><span class="font-bold text-lg"${_scopeId}>-</span></button><span class="w-8 text-center font-black text-sm"${_scopeId}>${ssrInterpolate(item.quantity)}</span><button class="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm hover:bg-gray-50 active:scale-90 transition"${_scopeId}><span class="font-bold text-lg"${_scopeId}>+</span></button></div><div class="flex flex-col items-end gap-2 min-w-[100px]"${_scopeId}><p class="font-black text-lg text-indigo-700 tracking-tighter"${_scopeId}>${ssrInterpolate(item.price * item.quantity)} ₴ </p><button class="text-[10px] uppercase font-black tracking-widest text-red-500 hover:text-red-700 transition"${_scopeId}>${ssrInterpolate(_ctx.$t("Remove"))}</button></div></div>`);
              });
              _push2(`<!--]--></div><div class="lg:col-span-4"${_scopeId}><div class="bg-white p-8 rounded-3xl border-2 border-gray-900 sticky top-8 shadow-2xl shadow-indigo-100"${_scopeId}><h2 class="text-xl font-black uppercase tracking-widest border-b-2 border-gray-100 pb-4 mb-6"${_scopeId}>${ssrInterpolate(_ctx.$t("Summary"))}</h2><div class="space-y-4 mb-8"${_scopeId}><div class="flex justify-between text-sm font-bold uppercase text-gray-500"${_scopeId}><span${_scopeId}>${ssrInterpolate(_ctx.$t("Items"))}</span><span${_scopeId}>${ssrInterpolate(cartItems.value.length)}</span></div><div class="flex justify-between items-end border-t border-gray-100 pt-4"${_scopeId}><span class="text-sm font-black uppercase italic"${_scopeId}>${ssrInterpolate(_ctx.$t("Total amount"))}</span><span class="text-3xl font-black text-gray-900 tracking-tighter"${_scopeId}>${ssrInterpolate(cartTotal.value)} ₴</span></div></div>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("checkout"),
                class: "block w-full bg-black text-white text-center py-5 rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-indigo-700 transition-all active:scale-[0.97]"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(_ctx.$t("Go to Checkout"))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(_ctx.$t("Go to Checkout")), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("home"),
                class: "block w-full text-center mt-4 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-900 transition"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` ← ${ssrInterpolate(_ctx.$t("Continue Shopping"))}`);
                  } else {
                    return [
                      createTextVNode(" ← " + toDisplayString(_ctx.$t("Continue Shopping")), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div></div></div>`);
            } else {
              _push2(`<div class="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300"${_scopeId}><div class="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 11-8 0v4M5 9h14l1 12H4L5 9z"${_scopeId}></path></svg></div><h2 class="text-2xl font-black uppercase italic tracking-tighter text-gray-900"${_scopeId}>${ssrInterpolate(_ctx.$t("Your cart is empty"))}</h2><p class="text-gray-500 mt-2 mb-8"${_scopeId}>${ssrInterpolate(_ctx.$t("Add some fertilizers to start your order"))}</p>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("home"),
                class: "bg-black text-white px-10 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-indigo-700 transition"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(_ctx.$t("To Catalog"))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(_ctx.$t("To Catalog")), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "min-h-screen bg-gray-100 p-6 md:p-12" }, [
                createVNode("div", { class: "max-w-5xl mx-auto" }, [
                  createVNode("h1", { class: "text-3xl font-black mb-10 tracking-tighter uppercase italic text-gray-900" }, toDisplayString(_ctx.$t("Shopping Cart")), 1),
                  cartItems.value.length > 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "grid grid-cols-1 lg:grid-cols-12 gap-12"
                  }, [
                    createVNode("div", { class: "lg:col-span-8 space-y-4" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(cartItems.value, (item) => {
                        return openBlock(), createBlock("div", {
                          key: item.id,
                          class: "bg-white p-4 md:p-6 rounded-2xl border border-gray-200 flex flex-col md:flex-row gap-6 items-center transition-hover hover:shadow-xl hover:shadow-gray-200/50"
                        }, [
                          createVNode("div", { class: "h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-gray-50" }, [
                            item.attributes?.image ? (openBlock(), createBlock("img", {
                              key: 0,
                              src: item.attributes.image,
                              class: "h-full w-full object-cover"
                            }, null, 8, ["src"])) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "flex-1 text-center md:text-left" }, [
                            createVNode("h3", { class: "text-sm font-black uppercase tracking-tight text-gray-900 leading-tight" }, toDisplayString(item.name), 1),
                            createVNode("p", { class: "text-xs text-gray-400 mt-1 italic" }, " Ціна за одиницю: " + toDisplayString(item.price) + " ₴ ", 1)
                          ]),
                          createVNode("div", { class: "flex items-center gap-3 bg-gray-100 p-1 rounded-xl" }, [
                            createVNode("button", {
                              onClick: ($event) => updateQuantity(
                                item.id,
                                item.quantity - 1
                              ),
                              class: "w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm hover:bg-gray-50 active:scale-90 transition",
                              disabled: item.quantity <= 1
                            }, [
                              createVNode("span", { class: "font-bold text-lg" }, "-")
                            ], 8, ["onClick", "disabled"]),
                            createVNode("span", { class: "w-8 text-center font-black text-sm" }, toDisplayString(item.quantity), 1),
                            createVNode("button", {
                              onClick: ($event) => updateQuantity(
                                item.id,
                                item.quantity + 1
                              ),
                              class: "w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm hover:bg-gray-50 active:scale-90 transition"
                            }, [
                              createVNode("span", { class: "font-bold text-lg" }, "+")
                            ], 8, ["onClick"])
                          ]),
                          createVNode("div", { class: "flex flex-col items-end gap-2 min-w-[100px]" }, [
                            createVNode("p", { class: "font-black text-lg text-indigo-700 tracking-tighter" }, toDisplayString(item.price * item.quantity) + " ₴ ", 1),
                            createVNode("button", {
                              onClick: ($event) => removeItem(item.id),
                              class: "text-[10px] uppercase font-black tracking-widest text-red-500 hover:text-red-700 transition"
                            }, toDisplayString(_ctx.$t("Remove")), 9, ["onClick"])
                          ])
                        ]);
                      }), 128))
                    ]),
                    createVNode("div", { class: "lg:col-span-4" }, [
                      createVNode("div", { class: "bg-white p-8 rounded-3xl border-2 border-gray-900 sticky top-8 shadow-2xl shadow-indigo-100" }, [
                        createVNode("h2", { class: "text-xl font-black uppercase tracking-widest border-b-2 border-gray-100 pb-4 mb-6" }, toDisplayString(_ctx.$t("Summary")), 1),
                        createVNode("div", { class: "space-y-4 mb-8" }, [
                          createVNode("div", { class: "flex justify-between text-sm font-bold uppercase text-gray-500" }, [
                            createVNode("span", null, toDisplayString(_ctx.$t("Items")), 1),
                            createVNode("span", null, toDisplayString(cartItems.value.length), 1)
                          ]),
                          createVNode("div", { class: "flex justify-between items-end border-t border-gray-100 pt-4" }, [
                            createVNode("span", { class: "text-sm font-black uppercase italic" }, toDisplayString(_ctx.$t("Total amount")), 1),
                            createVNode("span", { class: "text-3xl font-black text-gray-900 tracking-tighter" }, toDisplayString(cartTotal.value) + " ₴", 1)
                          ])
                        ]),
                        createVNode(unref(Link), {
                          href: _ctx.route("checkout"),
                          class: "block w-full bg-black text-white text-center py-5 rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-indigo-700 transition-all active:scale-[0.97]"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(_ctx.$t("Go to Checkout")), 1)
                          ]),
                          _: 1
                        }, 8, ["href"]),
                        createVNode(unref(Link), {
                          href: _ctx.route("home"),
                          class: "block w-full text-center mt-4 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-900 transition"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" ← " + toDisplayString(_ctx.$t("Continue Shopping")), 1)
                          ]),
                          _: 1
                        }, 8, ["href"])
                      ])
                    ])
                  ])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300"
                  }, [
                    createVNode("div", { class: "inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6" }, [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        class: "h-10 w-10 text-gray-400",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M16 11V7a4 4 0 11-8 0v4M5 9h14l1 12H4L5 9z"
                        })
                      ]))
                    ]),
                    createVNode("h2", { class: "text-2xl font-black uppercase italic tracking-tighter text-gray-900" }, toDisplayString(_ctx.$t("Your cart is empty")), 1),
                    createVNode("p", { class: "text-gray-500 mt-2 mb-8" }, toDisplayString(_ctx.$t("Add some fertilizers to start your order")), 1),
                    createVNode(unref(Link), {
                      href: _ctx.route("home"),
                      class: "bg-black text-white px-10 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-indigo-700 transition"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(_ctx.$t("To Catalog")), 1)
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ]))
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/Commerce/Cart.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
