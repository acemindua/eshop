import { computed, mergeProps, unref, useSSRContext, ref, watch, createVNode, resolveDynamicComponent, withCtx, renderSlot } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderVNode, ssrRenderSlot } from "vue/server-renderer";
import { usePage } from "@inertiajs/vue3";
import { IconCheck, IconShoppingBag } from "@tabler/icons-vue";
import { _ as _sfc_main$3 } from "./Layout-DkSNUF55.js";
const _sfc_main$2 = {
  __name: "ButtonBuy",
  __ssrInlineRender: true,
  props: {
    id: { type: Number, required: true },
    title: { type: String },
    price: { type: [Number, String] },
    qty: { type: Number, required: true, default: 1 }
  },
  setup(__props) {
    const props = __props;
    const page = usePage();
    const isInCart = computed(() => {
      const items = page.props.cart?.items || {};
      return !!items[props.id];
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        type: "button",
        class: [
          "px-6 py-3 rounded-lg inline-flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 shadow-sm font-['Exo_2'] uppercase tracking-wider text-sm font-bold",
          isInCart.value ? "bg-green-600 text-white shadow-green-100" : "bg-black text-white hover:bg-gray-800"
        ]
      }, _attrs))}>`);
      if (isInCart.value) {
        _push(ssrRenderComponent(unref(IconCheck), {
          stroke: 2,
          size: 24
        }, null, _parent));
      } else {
        _push(ssrRenderComponent(unref(IconShoppingBag), {
          stroke: 1.5,
          size: 24
        }, null, _parent));
      }
      _push(`<span>${ssrInterpolate(isInCart.value ? _ctx.$t("In Cart") : _ctx.$t("Buy"))}</span></button>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Public/Commerce/ButtonBuy.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Review/StarRating.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "DefaultLayout",
  __ssrInlineRender: true,
  setup(__props) {
    const layout = computed(() => {
      return _sfc_main$3;
    });
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(layout.value), _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }), _parent);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/Public/DefaultLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main$1 as _,
  _sfc_main as a,
  _sfc_main$2 as b
};
