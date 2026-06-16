import { ref, computed, onMounted, onUnmounted, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { b as usePage, l as link_default } from "../ssr.js";
import { IconShoppingBag, IconX } from "@tabler/icons-vue";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "CartButton",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const isOpen = ref(false);
    const cartItems = computed(() => page.props.cart?.items || []);
    const cartTotal = computed(() => page.props.cart?.total || 0);
    const cartCount = computed(() => page.props.cart?.count || 0);
    const closeCart = () => isOpen.value = false;
    const handleEsc = (e) => {
      if (e.key === "Escape" && isOpen.value) closeCart();
    };
    onMounted(() => window.addEventListener("keydown", handleEsc));
    onUnmounted(() => window.removeEventListener("keydown", handleEsc));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative font-['Exo_2']" }, _attrs))} data-v-3a4dc955><button class="${ssrRenderClass([
        isOpen.value ? "border border-brand bg-gray-100" : cartTotal.value > 0 ? "bg-gray-50" : "border",
        "p-2 transition-colors relative group flex items-center gap-2 border border-transparent rounded-lg"
      ])}" data-v-3a4dc955>`);
      _push(ssrRenderComponent(unref(IconShoppingBag), {
        stroke: 1.5,
        size: 24,
        class: "text-gray-700"
      }, null, _parent));
      if (cartTotal.value > 0) {
        _push(`<p class="text-sm font-semibold text-brand relative" data-v-3a4dc955><span class="text-xs text-gray-500 absolute -top-3 left-0" data-v-3a4dc955>Сума:</span> ${ssrInterpolate(_ctx.$formatPrice(cartTotal.value))}</p>`);
      } else {
        _push(`<span class="hidden md:block text-sm font-semibold tracking-tight group-hover:underline" data-v-3a4dc955>${ssrInterpolate(_ctx.$t("Cart"))}</span>`);
      }
      if (cartCount.value > 0) {
        _push(`<span class="absolute -top-1 -right-1 bg-brand text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-sm" data-v-3a4dc955>${ssrInterpolate(cartCount.value)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button>`);
      if (isOpen.value) {
        _push(`<div class="absolute right-0 mt-3 w-80 bg-white border border-gray-100 shadow-2xl rounded-2xl z-[100] overflow-hidden" data-v-3a4dc955><div class="p-4 border-b flex justify-between items-center bg-gray-50/50" data-v-3a4dc955><span class="font-black uppercase text-[10px] tracking-[0.2em] text-gray-400" data-v-3a4dc955>${ssrInterpolate(_ctx.$t("Your Cart"))}</span><button class="text-gray-400 hover:text-black transition" data-v-3a4dc955>`);
        _push(ssrRenderComponent(unref(IconX), { size: 18 }, null, _parent));
        _push(`</button></div>`);
        if (cartCount.value > 0) {
          _push(`<div class="max-h-96 overflow-y-auto custom-scrollbar" data-v-3a4dc955><!--[-->`);
          ssrRenderList(cartItems.value, (item) => {
            _push(`<div class="p-4 border-b last:border-0 flex gap-3 hover:bg-gray-50 transition items-center" data-v-3a4dc955><div class="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden border border-gray-100" data-v-3a4dc955>`);
            if (item.attributes?.image) {
              _push(`<img${ssrRenderAttr("src", item.attributes.image)}${ssrRenderAttr("alt", item.name)} class="object-cover w-full h-full" data-v-3a4dc955>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div><div class="flex-grow min-w-0" data-v-3a4dc955><h4 class="text-xs font-bold text-gray-900 truncate uppercase" data-v-3a4dc955>${ssrInterpolate(item.name)}</h4><p class="text-[10px] text-gray-500 font-medium" data-v-3a4dc955>${ssrInterpolate(item.quantity)} × ${ssrInterpolate(_ctx.$formatPrice(item.price))}</p></div><div class="text-sm font-black text-gray-900" data-v-3a4dc955>${ssrInterpolate(_ctx.$formatPrice(item.price * item.quantity))}</div></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<div class="p-10 text-center text-gray-400 text-sm italic" data-v-3a4dc955>${ssrInterpolate(_ctx.$t("Cart is empty"))}</div>`);
        }
        if (cartCount.value > 0) {
          _push(`<div class="p-4 bg-white border-t" data-v-3a4dc955><div class="flex justify-between items-center mb-4 px-1" data-v-3a4dc955><span class="text-gray-400 text-[10px] font-bold uppercase tracking-widest" data-v-3a4dc955>${ssrInterpolate(_ctx.$t("Total"))}:</span><span class="text-xl font-black text-indigo-700" data-v-3a4dc955>${ssrInterpolate(_ctx.$formatPrice(cartTotal.value))}</span></div><div class="grid grid-cols-2 gap-2" data-v-3a4dc955>`);
          _push(ssrRenderComponent(unref(link_default), {
            href: _ctx.route("cart.index"),
            onClick: closeCart,
            class: "flex justify-center bg-gray-100 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-200 transition"
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
            class: "flex justify-center bg-black text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition"
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
        _push(`<div class="fixed inset-0 z-40" data-v-3a4dc955></div>`);
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
const CartButton = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3a4dc955"]]);
export {
  CartButton as C
};
