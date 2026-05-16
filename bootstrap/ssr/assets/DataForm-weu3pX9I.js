import { computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderClass } from "vue/server-renderer";
import { _ as _sfc_main$4 } from "./CheckBoxSwitcher-DfwzQzd4.js";
import { _ as _sfc_main$3 } from "./InputError-Cp3nFeNd.js";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./TextInput-Dmmb8A31.js";
import "@headlessui/vue";
const _sfc_main = {
  __name: "DataForm",
  __ssrInlineRender: true,
  props: {
    form: { type: Object, required: true },
    data: { type: [Object, Array], default: () => ({}) },
    errors: { type: Object, default: () => ({}) },
    isEditing: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const booleanPublic = computed({
      get: () => !!props.form.public,
      set: (val) => props.form.public = val ? 1 : 0
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="md:flex gap-8 py-6 border-b border-slate-100"><div class="md:w-1/4 mb-4 md:mb-0"><h2 class="text-lg font-bold text-slate-800 tracking-tight">${ssrInterpolate(_ctx.$t("General Data"))}</h2><p class="mt-2 text-sm text-slate-500 leading-relaxed">${ssrInterpolate(_ctx.$t("Manage general product info and public status."))}</p></div><div class="w-full md:w-3/4 space-y-8 bg-white p-6 rounded-xl border border-slate-200 shadow-sm"><div class="space-y-2">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        for: "order",
        value: _ctx.$t("Order"),
        class: "font-bold uppercase text-xs text-slate-700"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        id: "order",
        modelValue: __props.form.order,
        "onUpdate:modelValue": ($event) => __props.form.order = $event,
        type: "number",
        class: ["block w-full", {
          "border-red-500 focus:ring-red-500": __props.errors.order
        }],
        placeholder: "0"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        message: __props.errors.order
      }, null, _parent));
      _push(`</div><div class="space-y-3 pt-4 border-t border-slate-50">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        value: _ctx.$t("Status"),
        class: "font-bold uppercase text-xs text-slate-700"
      }, null, _parent));
      _push(`<div class="flex items-center gap-4 p-4 rounded-lg bg-slate-50 border border-slate-100 transition-all">`);
      _push(ssrRenderComponent(_sfc_main$4, {
        modelValue: booleanPublic.value,
        "onUpdate:modelValue": ($event) => booleanPublic.value = $event,
        id: "public-switcher"
      }, null, _parent));
      _push(`<div class="flex flex-col"><span class="${ssrRenderClass([
        "text-sm font-bold tracking-wide uppercase",
        booleanPublic.value ? "text-emerald-600" : "text-rose-600"
      ])}">${ssrInterpolate(booleanPublic.value ? _ctx.$t("Public (Visible)") : _ctx.$t("Private (Hidden)"))}</span><span class="text-[11px] text-slate-400 italic">${ssrInterpolate(booleanPublic.value ? _ctx.$t(
        "This item will be displayed on the website."
      ) : _ctx.$t(
        "This item is hidden from the public view."
      ))}</span></div></div>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        message: __props.errors.public
      }, null, _parent));
      _push(`</div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Dashboard/Pages/Partials/DataForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
