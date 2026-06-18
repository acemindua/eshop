import { computed, mergeProps, useSSRContext, unref } from "vue";
import { ssrRenderAttrs, ssrLooseEqual, ssrGetDynamicModelProps, ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import Slider from "@vueform/slider";
import { _ as _sfc_main$2, a as _sfc_main$4 } from "./TextInput-koDpuiDW.js";
import { _ as _sfc_main$3 } from "./Checkbox-86GmRX3v.js";
import { IconStarFilled } from "@tabler/icons-vue";
const _sfc_main$1 = {
  __name: "RadioButton",
  __ssrInlineRender: true,
  props: {
    modelValue: {
      type: [String, Number, Boolean],
      required: true
    },
    value: {
      type: [String, Number, Boolean],
      required: true
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const proxyChecked = computed({
      get() {
        return props.modelValue;
      },
      set(val) {
        emit("update:modelValue", val);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      let _temp0;
      _push(`<input${ssrRenderAttrs((_temp0 = mergeProps({
        type: "radio",
        value: __props.value,
        checked: ssrLooseEqual(proxyChecked.value, __props.value),
        class: "w-4 h-4 border-slate-300 text-brand focus:ring-brand focus:ring-offset-0 dark:border-slate-700 dark:bg-slate-800 dark:checked:bg-brand transition duration-150 ease-in-out cursor-pointer"
      }, _attrs), mergeProps(_temp0, ssrGetDynamicModelProps(_temp0, proxyChecked.value))))}>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/UI/RadioButton.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "ProductFilters",
  __ssrInlineRender: true,
  props: {
    modelValue: Object,
    brands: Array,
    categories: Array,
    defaultMax: { type: Number, default: 5e4 }
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
    const ratingOptions = [
      { value: 0, label: "All" },
      { value: 4, label: "4+ Stars" },
      { value: 3, label: "3+ Stars" }
      // можна легко додати інші
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col divide-y" }, _attrs))}><div class="py-4">`);
      _push(ssrRenderComponent(_sfc_main$2, {
        value: _ctx.$t("Filters"),
        class: "text-sm mb-2 text-gray-800"
      }, null, _parent));
      _push(`<div class="flex flex-col space-y-2"><label class="flex items-center gap-2 cursor-pointer text-sm">`);
      _push(ssrRenderComponent(_sfc_main$3, {
        checked: localForm.value.sale,
        "onUpdate:checked": ($event) => localForm.value.sale = $event
      }, null, _parent));
      _push(`<span>${ssrInterpolate(_ctx.$t("Sale"))}</span></label><label class="flex items-center gap-2 cursor-pointer text-sm">`);
      _push(ssrRenderComponent(_sfc_main$3, {
        checked: localForm.value.in_stock,
        "onUpdate:checked": ($event) => localForm.value.in_stock = $event
      }, null, _parent));
      _push(`<span>${ssrInterpolate(_ctx.$t("In stock"))}</span></label></div></div><div class="py-4">`);
      _push(ssrRenderComponent(_sfc_main$2, {
        value: _ctx.$t("Rating"),
        class: "text-sm mb-2 text-gray-800"
      }, null, _parent));
      _push(`<ul class="space-y-2" role="radiogroup"><!--[-->`);
      ssrRenderList(ratingOptions, (option) => {
        _push(`<li><label class="flex items-center gap-3 cursor-pointer group">`);
        _push(ssrRenderComponent(_sfc_main$1, {
          value: option.value,
          modelValue: localForm.value.rating,
          "onUpdate:modelValue": ($event) => localForm.value.rating = $event
        }, null, _parent));
        _push(`<span class="text-sm flex items-center gap-1">`);
        if (option.value === 0) {
          _push(`<!--[-->${ssrInterpolate(_ctx.$t(option.label))}<!--]-->`);
        } else {
          _push(`<!--[-->`);
          _push(ssrRenderComponent(unref(IconStarFilled), { class: "w-4 h-4 text-orange-500" }, null, _parent));
          _push(` ${ssrInterpolate(option.value)}+ <!--]-->`);
        }
        _push(`</span></label></li>`);
      });
      _push(`<!--]--></ul></div><div class="py-4">`);
      _push(ssrRenderComponent(_sfc_main$2, {
        value: _ctx.$t("Price"),
        class: "text-sm mb-2 text-gray-800"
      }, null, _parent));
      _push(`<div class="flex items-center gap-2">`);
      _push(ssrRenderComponent(_sfc_main$4, {
        modelValue: localForm.value.min_price,
        "onUpdate:modelValue": ($event) => localForm.value.min_price = $event,
        modelModifiers: { number: true },
        type: "number",
        placeholder: _ctx.$t("Min")
      }, null, _parent));
      _push(`<span>-</span>`);
      _push(ssrRenderComponent(_sfc_main$4, {
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
        min: 0,
        max: __props.defaultMax,
        class: "slider-brand mt-4",
        tooltips: false
      }, null, _parent));
      _push(`</div><div class="py-4">`);
      _push(ssrRenderComponent(_sfc_main$2, {
        value: _ctx.$t("Categories"),
        class: "text-sm mb-2 text-gray-800"
      }, null, _parent));
      _push(`<!--[-->`);
      ssrRenderList(props.categories, (category) => {
        _push(`<label class="text-sm mb-2 text-gray-800 flex items-center gap-2">`);
        _push(ssrRenderComponent(_sfc_main$3, {
          value: category.id,
          checked: localForm.value.categories,
          "onUpdate:checked": ($event) => localForm.value.categories = $event
        }, null, _parent));
        _push(`<span class="text-sm whitespace-nowrap">${ssrInterpolate(category.title)} (${ssrInterpolate(category.count)}) </span></label>`);
      });
      _push(`<!--]--></div><div class="py-4">`);
      _push(ssrRenderComponent(_sfc_main$2, {
        value: _ctx.$t("Brands"),
        class: "text-sm mb-2 text-gray-800"
      }, null, _parent));
      _push(`<!--[-->`);
      ssrRenderList(props.brands, (brand) => {
        _push(`<label class="text-sm mb-2 text-gray-800 flex items-center gap-2">`);
        _push(ssrRenderComponent(_sfc_main$3, {
          value: brand.id,
          checked: localForm.value.brands,
          "onUpdate:checked": ($event) => localForm.value.brands = $event
        }, null, _parent));
        _push(`<span class="text-sm">${ssrInterpolate(brand.title)} (${ssrInterpolate(brand.count)})</span></label>`);
      });
      _push(`<!--]--></div></div>`);
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
