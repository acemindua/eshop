import { ref, computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrRenderComponent } from "vue/server-renderer";
import { IconStarFilled, IconStarHalfFilled, IconStar } from "@tabler/icons-vue";
const _sfc_main = {
  __name: "StarRating",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: Number, default: 0 },
    maxStars: { type: Number, default: 5 },
    readOnly: { type: Boolean, default: true },
    showAverage: { type: Boolean, default: true },
    averageRating: { type: Number, default: 0 },
    size: { type: [Number, String], default: 24 }
  },
  emits: ["update:modelValue", "rating-selected"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const hoverRating = ref(0);
    const currentRating = computed(() => {
      if (hoverRating.value > 0) return hoverRating.value;
      if (props.modelValue > 0) return props.modelValue;
      if (props.readOnly && props.showAverage) {
        return props.averageRating;
      }
      return 0;
    });
    const fullStars = computed(() => Math.floor(currentRating.value));
    const hasHalfStar = computed(() => currentRating.value % 1 >= 0.5);
    const starColorClass = (star) => {
      if (star <= Math.ceil(currentRating.value)) {
        return ["text-orange-500", !props.readOnly && "hover:text-orange-400"];
      }
      return ["text-gray-300", !props.readOnly && "hover:text-orange-400"];
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center" }, _attrs))}><!--[-->`);
      ssrRenderList(__props.maxStars, (star) => {
        _push(`<span class="${ssrRenderClass([starColorClass(star), "cursor-pointer transition-colors duration-200"])}">`);
        if (star <= fullStars.value) {
          _push(ssrRenderComponent(unref(IconStarFilled), { size: __props.size }, null, _parent));
        } else if (star === fullStars.value + 1 && hasHalfStar.value) {
          _push(ssrRenderComponent(unref(IconStarHalfFilled), { size: __props.size }, null, _parent));
        } else {
          _push(ssrRenderComponent(unref(IconStar), { size: __props.size }, null, _parent));
        }
        _push(`</span>`);
      });
      _push(`<!--]--></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Review/StarRating.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
