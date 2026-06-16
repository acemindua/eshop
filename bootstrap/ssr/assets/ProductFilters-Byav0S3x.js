import { computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import Slider from "@vueform/slider";
import { _ as _sfc_main$1 } from "./InputLabel-BSWPuOQO.js";
import { _ as _sfc_main$2 } from "./TextInput-5OXx1Hvj.js";
/* empty css                 */
const _sfc_main = {
  __name: "ProductFilters",
  __ssrInlineRender: true,
  props: {
    modelValue: Object,
    /* brands: Array,*/
    defaultMin: Number,
    defaultMax: Number
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const localForm = computed({
      get: () => props.modelValue,
      set: (val) => emit("update:modelValue", val)
    });
    const priceRange = computed({
      get: () => [localForm.value.min_price, localForm.value.max_price],
      set: (val) => {
        localForm.value.min_price = val[0];
        localForm.value.max_price = val[1];
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "pr-4 py-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        value: _ctx.$t("Price"),
        class: "mb-2 text-gray-800"
      }, null, _parent));
      _push(`<div class="flex items-center gap-2">`);
      _push(ssrRenderComponent(_sfc_main$2, {
        modelValue: localForm.value.min_price,
        "onUpdate:modelValue": ($event) => localForm.value.min_price = $event,
        modelModifiers: { number: true },
        type: "number",
        placeholder: _ctx.$t("Min")
      }, null, _parent));
      _push(`<span>-</span>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        modelValue: localForm.value.max_price,
        "onUpdate:modelValue": ($event) => localForm.value.max_price = $event,
        modelModifiers: { number: true },
        type: "number",
        placeholder: _ctx.$t("Max")
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(unref(Slider), {
        modelValue: priceRange.value,
        "onUpdate:modelValue": ($event) => priceRange.value = $event,
        min: __props.defaultMin,
        max: __props.defaultMax,
        class: "slider-brand mt-4",
        tooltips: false
      }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/Commerce/Components/ProductFilters.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
