import { ref, computed, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext, onMounted, onUnmounted, resolveComponent, createVNode } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderSlot, ssrRenderTeleport } from "vue/server-renderer";
import { _ as _sfc_main$2 } from "./ApplicationLogo-DsJOFw9w.js";
import { _ as _sfc_main$6 } from "./Breadcrumbs-Be9A5eey.js";
import { usePage, Link, router } from "@inertiajs/vue3";
import { IconGardenCart, IconX } from "@tabler/icons-vue";
import { _ as _sfc_main$5 } from "./LangSwitcher-wZTGpIJc.js";
import { _ as _sfc_main$3, S as SerchContainer, a as _sfc_main$4 } from "./UserLoginRegisterForm-CzuFF-4H.js";
const _sfc_main$1 = {
  __name: "CartButton",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const isOpen = ref(false);
    const cartItems = computed(() => page.props.cart?.items || []);
    const cartTotal = computed(() => page.props.cart?.total || 0);
    const cartCount = computed(() => page.props.cart?.count || 0);
    const closeCart = () => {
      isOpen.value = false;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative font-['Exo_2']" }, _attrs))}><button class="${ssrRenderClass([{ "border-brand bg-brand/5": isOpen.value }, "p-2 border rounded-lg hover:bg-gray-50 transition-colors relative group"])}">`);
      _push(ssrRenderComponent(unref(IconGardenCart), {
        stroke: 1.5,
        size: 24,
        class: "text-gray-700"
      }, null, _parent));
      if (cartCount.value > 0) {
        _push(`<span class="absolute -top-2 -right-2 bg-brand text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-sm">${ssrInterpolate(cartCount.value)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button>`);
      if (isOpen.value) {
        _push(`<div class="absolute right-0 mt-3 w-80 bg-white border border-gray-100 shadow-2xl rounded-2xl z-[100] overflow-hidden"><div class="p-4 border-b flex justify-between items-center bg-gray-50/50"><span class="font-black uppercase text-[10px] tracking-[0.2em] text-gray-400">${ssrInterpolate(_ctx.$t("Your Cart"))}</span><button class="text-gray-400 hover:text-black transition">`);
        _push(ssrRenderComponent(unref(IconX), { size: 18 }, null, _parent));
        _push(`</button></div>`);
        if (cartCount.value > 0) {
          _push(`<div class="max-h-96 overflow-y-auto"><!--[-->`);
          ssrRenderList(cartItems.value, (item) => {
            _push(`<div class="p-4 border-b last:border-0 flex gap-3 hover:bg-gray-50 transition items-center"><div class="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden border border-gray-100">`);
            if (item.attributes?.image) {
              _push(`<img${ssrRenderAttr("src", item.attributes.image)} class="object-cover w-full h-full">`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div><div class="flex-grow min-w-0"><h4 class="text-xs font-bold text-gray-900 truncate uppercase tracking-tight">${ssrInterpolate(item.name)}</h4><div class="text-[10px] text-gray-500 font-medium">${ssrInterpolate(item.quantity)} × ${ssrInterpolate(item.price)} ₴ </div></div><div class="text-sm font-black text-gray-900 whitespace-nowrap">${ssrInterpolate(item.price * item.quantity)} ₴ </div></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<div class="p-10 text-center"><p class="text-gray-400 text-sm italic">${ssrInterpolate(_ctx.$t("Cart is empty"))}</p></div>`);
        }
        if (cartCount.value > 0) {
          _push(`<div class="p-4 bg-white border-t space-y-2"><div class="flex justify-between items-center mb-4 px-1"><span class="text-gray-400 text-[10px] font-bold uppercase tracking-widest">${ssrInterpolate(_ctx.$t("Total"))}:</span><span class="text-xl font-black tracking-tighter text-indigo-700">${ssrInterpolate(cartTotal.value)} ₴</span></div><div class="grid grid-cols-2 gap-2">`);
          _push(ssrRenderComponent(unref(Link), {
            href: _ctx.route("cart.index"),
            onClick: closeCart,
            class: "flex items-center justify-center bg-gray-100 text-black py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-200 transition"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(_ctx.$t("View Cart"))}`);
              } else {
                return [
                  createTextVNode(toDisplayString(_ctx.$t("View Cart")), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(ssrRenderComponent(unref(Link), {
            href: _ctx.route("checkout"),
            onClick: closeCart,
            class: "flex items-center justify-center bg-black text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition shadow-lg shadow-gray-200"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(_ctx.$t("Checkout"))}`);
              } else {
                return [
                  createTextVNode(toDisplayString(_ctx.$t("Checkout")), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (isOpen.value) {
        _push(`<div class="fixed inset-0 z-40 bg-transparent"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Public/Commerce/CartButton.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "Layout",
  __ssrInlineRender: true,
  setup(__props) {
    const catalogMenu = ref(false);
    ref(false);
    const inputFocus = ref(false);
    const hadleFocus = () => {
      inputFocus.value = true;
      catalogMenu.value = false;
    };
    const closeAll = () => {
      catalogMenu.value = false;
      inputFocus.value = false;
    };
    const handleEsc = (e) => {
      if (e.key === "Escape") closeAll();
    };
    onMounted(() => window.addEventListener("keydown", handleEsc));
    onUnmounted(() => window.removeEventListener("keydown", handleEsc));
    const goSearch = (e) => {
      closeAll();
      router.get(
        route("search"),
        { q: e },
        // Передаємо чистий рядок
        {
          preserveState: true
        }
      );
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col w-full min-h-screen bg-gray-200 text-sm gap-2" }, _attrs))}><header class="bg-white p-4"><div class="w-full mx-auto"><nav class="inline-flex gap-4 justify-between items-center w-full px-4">`);
      _push(ssrRenderComponent(_component_Link, {
        href: "/",
        class: "flex items-center gap-2 shrink-0 group md:pr-12",
        onClick: closeAll
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
      _push(`<div class="md:relative z-[60] flex flex-col flex-grow max-w-xl">`);
      _push(ssrRenderComponent(_sfc_main$3, {
        onFocus: hadleFocus,
        onSearch: ($event) => goSearch($event)
      }, null, _parent));
      if (inputFocus.value) {
        _push(`<div>`);
        _push(ssrRenderComponent(SerchContainer, {
          locale: _ctx.locale,
          onClose: closeAll
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="hidden md:flex items-center gap-4">`);
      _push(ssrRenderComponent(_sfc_main$4, null, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(ssrRenderComponent(_sfc_main$5, null, null, _parent));
      _push(`</div></nav></div></header><div class="bg-white p-4">`);
      _push(ssrRenderComponent(_sfc_main$6, null, null, _parent));
      _push(`</div><main class="flex-grow px-2"><div class="w-full mx-auto">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></main><footer class="bg-white p-4"><div class="w-full mx-auto">#footer (Copyright/Info)</div></footer>`);
      ssrRenderTeleport(_push, (_push2) => {
        if (catalogMenu.value || inputFocus.value) {
          _push2(`<div class="fixed inset-0 bg-black/10 z-[10]"></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/Public/Landing/Layout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
