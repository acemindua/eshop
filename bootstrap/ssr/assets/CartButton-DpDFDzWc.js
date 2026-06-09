import { ref, computed, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { c as usePage, l as link_default } from "../ssr.js";
import { IconGardenCart, IconX } from "@tabler/icons-vue";
const _sfc_main = {
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
          _push(ssrRenderComponent(unref(link_default), {
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
          _push(ssrRenderComponent(unref(link_default), {
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
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Public/Commerce/CartButton.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
