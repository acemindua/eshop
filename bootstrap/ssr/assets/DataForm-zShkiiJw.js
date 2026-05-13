import { computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import { _ as _sfc_main$4 } from "./CheckBoxSwitcher-DfwzQzd4.js";
import { _ as _sfc_main$3 } from "./InputError-Cp3nFeNd.js";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./TextInput-Dmmb8A31.js";
import { IconSettings } from "@tabler/icons-vue";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "@headlessui/vue";
const _sfc_main = {
  __name: "DataForm",
  __ssrInlineRender: true,
  props: {
    form: { type: Object, required: true },
    data: { type: [Object, Array], required: true },
    errors: { type: Object, default: () => ({}) }
  },
  setup(__props) {
    const props = __props;
    const isActive = computed({
      get: () => !!props.form.is_active,
      set: (val) => props.form.is_active = val
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "md:flex gap-6 w-full border rounded-none p-2 md:p-6 lg:p-12 bg-gray-50 dark:bg-slate-900/50 dark:border-slate-800" }, _attrs))} data-v-384db7f1><div class="w-full md:w-1/4 pb-4" data-v-384db7f1><div class="flex items-center space-x-2 mb-2 text-brand" data-v-384db7f1>`);
      _push(ssrRenderComponent(unref(IconSettings), { size: "20" }, null, _parent));
      _push(`<h2 class="uppercase font-bold tracking-tight text-sm" data-v-384db7f1>${ssrInterpolate(_ctx.$t("Technical Configuration"))}</h2></div><p class="py-2 text-xs text-gray-500 leading-relaxed" data-v-384db7f1>${ssrInterpolate(_ctx.$t(
        "Set up internal system codes, processing fees, and payment availability."
      ))}</p></div><div class="flex md:w-3/4 w-full flex-col space-y-6" data-v-384db7f1><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-384db7f1><div data-v-384db7f1>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        for: "code",
        value: _ctx.$t("System Code"),
        class: "font-bold text-[10px] uppercase text-gray-400 mb-1"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        id: "code",
        type: "text",
        modelValue: __props.form.code,
        "onUpdate:modelValue": ($event) => __props.form.code = $event,
        class: ["block w-full font-mono text-sm border-gray-200", { "border-red-500": __props.errors.code }],
        placeholder: "e.g., stripe_card"
      }, null, _parent));
      _push(`<p class="text-[10px] text-gray-400 mt-1 uppercase tracking-tighter" data-v-384db7f1>${ssrInterpolate(_ctx.$t(
        "Used by the core system to identify the gateway"
      ))}</p>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        class: "mt-2",
        message: __props.errors.code
      }, null, _parent));
      _push(`</div><div data-v-384db7f1>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        for: "sort_order",
        value: _ctx.$t("Display Order"),
        class: "font-bold text-[10px] uppercase text-gray-400 mb-1"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        id: "sort_order",
        type: "number",
        modelValue: __props.form.sort_order,
        "onUpdate:modelValue": ($event) => __props.form.sort_order = $event,
        class: ["block w-full border-gray-200", { "border-red-500": __props.errors.sort_order }]
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        class: "mt-2",
        message: __props.errors.sort_order
      }, null, _parent));
      _push(`</div></div><hr class="border-gray-200 dark:border-slate-800" data-v-384db7f1><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-384db7f1><div data-v-384db7f1>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        for: "commission_percent",
        value: _ctx.$t("Commission Percent (%)"),
        class: "font-bold text-[10px] uppercase text-gray-400 mb-1"
      }, null, _parent));
      _push(`<div class="relative" data-v-384db7f1>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        id: "commission_percent",
        type: "number",
        step: "0.01",
        modelValue: __props.form.commission_percent,
        "onUpdate:modelValue": ($event) => __props.form.commission_percent = $event,
        class: "block w-full pr-8 border-gray-200"
      }, null, _parent));
      _push(`<span class="absolute right-3 top-2 text-gray-400 text-sm" data-v-384db7f1>%</span></div>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        class: "mt-2",
        message: __props.errors.commission_percent
      }, null, _parent));
      _push(`</div><div data-v-384db7f1>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        for: "commission_fixed",
        value: _ctx.$t("Fixed Fee (Amount)"),
        class: "font-bold text-[10px] uppercase text-gray-400 mb-1"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        id: "commission_fixed",
        type: "number",
        step: "0.01",
        modelValue: __props.form.commission_fixed,
        "onUpdate:modelValue": ($event) => __props.form.commission_fixed = $event,
        class: "block w-full border-gray-200"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        class: "mt-2",
        message: __props.errors.commission_fixed
      }, null, _parent));
      _push(`</div></div><hr class="border-gray-200 dark:border-slate-800" data-v-384db7f1><div class="bg-white dark:bg-slate-800 p-4 border border-dashed border-gray-200 dark:border-slate-700" data-v-384db7f1>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        for: "status-switcher",
        value: _ctx.$t("Method Status"),
        class: "font-bold text-[10px] uppercase text-gray-400 mb-3"
      }, null, _parent));
      _push(`<div class="flex items-center space-x-4" data-v-384db7f1>`);
      _push(ssrRenderComponent(_sfc_main$4, {
        modelValue: isActive.value,
        "onUpdate:modelValue": ($event) => isActive.value = $event,
        id: "status-switcher"
      }, null, _parent));
      _push(`<div class="flex flex-col" data-v-384db7f1><span class="${ssrRenderClass([
        "text-sm font-bold uppercase tracking-tight",
        isActive.value ? "text-green-600" : "text-red-500"
      ])}" data-v-384db7f1>${ssrInterpolate(isActive.value ? _ctx.$t("Active") : _ctx.$t("Disabled"))}</span><span class="text-[10px] text-gray-400 uppercase" data-v-384db7f1>${ssrInterpolate(isActive.value ? _ctx.$t(
        "Customers can use this method at checkout"
      ) : _ctx.$t("Method is hidden from storefront"))}</span></div></div>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        class: "mt-2",
        message: __props.errors.is_active
      }, null, _parent));
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Settings/PaymentMethods/Partials/DataForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const DataForm = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-384db7f1"]]);
export {
  DataForm as default
};
