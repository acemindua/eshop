import { computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseEqual } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./Checkbox-86GmRX3v.js";
import { _ as _sfc_main$2 } from "./TextInput-5OXx1Hvj.js";
import Slider from "@vueform/slider";
/* empty css                 */
const _sfc_main = {
  __name: "ProductFiltersOld",
  __ssrInlineRender: true,
  props: {
    modelValue: Object,
    // Сюди передаємо об'єкт form
    brands: Array,
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
      _push(`<aside${ssrRenderAttrs(mergeProps({
        class: "w-full md:w-64 flex-shrink-0 border-t md:border-r p-4 space-y-8",
        role: "search"
      }, _attrs))}><label class="flex items-center gap-2 cursor-pointer text-sm">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        checked: localForm.value.promo,
        "onUpdate:checked": ($event) => localForm.value.promo = $event
      }, null, _parent));
      _push(`<span>${ssrInterpolate(_ctx.$t("Sale"))}</span></label><fieldset class="pt-4 border-t"><legend class="text-sm font-medium text-gray-700 mb-2">${ssrInterpolate(_ctx.$t("Rating"))}</legend><ul class="space-y-1" role="radiogroup"><!--[-->`);
      ssrRenderList([0, 5, 4, 3, 2, 1], (i) => {
        _push(`<li class="flex items-center"><input type="radio"${ssrRenderAttr("id", "rating-" + i)}${ssrRenderAttr("value", i)}${ssrIncludeBooleanAttr(ssrLooseEqual(localForm.value.rating, i)) ? " checked" : ""} class="mr-2"><label${ssrRenderAttr("for", "rating-" + i)} class="text-sm cursor-pointer">${ssrInterpolate(i === 0 ? _ctx.$t("All") : i + "+ " + _ctx.$t("stars"))}</label></li>`);
      });
      _push(`<!--]--></ul></fieldset><div class="pt-4 border-t"><label class="text-sm font-medium text-gray-700 mb-6 block">${ssrInterpolate(_ctx.$t("Price Range"))}</label><div class="flex items-center gap-2">`);
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
        class: "mt-6",
        tooltips: false
      }, null, _parent));
      _push(`</div><fieldset class="pt-4 border-t"><legend class="text-sm font-medium text-gray-700 mb-2">${ssrInterpolate(_ctx.$t("Brands"))}</legend><div class="space-y-2"></div></fieldset></aside>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/Commerce/Components/ProductFiltersOld.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
