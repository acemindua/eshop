import { mergeProps, createVNode, resolveDynamicComponent, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderVNode } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "PaymentMethods",
  __ssrInlineRender: true,
  props: {
    modelValue: String,
    // Значення вибраного методу (напр. 'card', 'cash')
    methods: Array,
    // Масив доступних методів з бекенду
    errors: Object
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white border border-gray-200 p-6" }, _attrs))} data-v-65747f1f><div class="grid grid-cols-1 gap-3" data-v-65747f1f><!--[-->`);
      ssrRenderList(__props.methods, (method) => {
        _push(`<div class="${ssrRenderClass([
          "relative flex items-center p-4 cursor-pointer transition-all border",
          __props.modelValue === method.code ? "border-black bg-gray-50" : "border-gray-200 hover:border-gray-400"
        ])}" data-v-65747f1f><div class="mr-4 flex items-center justify-center" data-v-65747f1f><div class="${ssrRenderClass([
          __props.modelValue === method.code ? "bg-black" : "bg-white",
          "w-4 h-4 border border-black flex items-center justify-center"
        ])}" data-v-65747f1f>`);
        if (__props.modelValue === method.code) {
          _push(`<div class="w-1.5 h-1.5 bg-white" data-v-65747f1f></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="flex-grow" data-v-65747f1f><p class="text-sm font-bold uppercase tracking-tight" data-v-65747f1f>${ssrInterpolate(method.label)}</p>`);
        if (method.description) {
          _push(`<p class="text-xs text-gray-500 mt-1" data-v-65747f1f>${ssrInterpolate(method.description)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (method.icon) {
          _push(`<div class="ml-auto opacity-60" data-v-65747f1f>`);
          ssrRenderVNode(_push, createVNode(resolveDynamicComponent(method.icon), { class: "w-6 h-6" }, null), _parent);
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div>`);
      if (__props.errors?.payment_method) {
        _push(`<p class="text-red-500 text-xs mt-3" data-v-65747f1f>${ssrInterpolate(__props.errors.payment_method)}</p>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/Commerce/Partials/PaymentMethods.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const PaymentMethods = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-65747f1f"]]);
export {
  PaymentMethods as default
};
