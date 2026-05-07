import { ref, mergeProps, unref, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./LanguagesTabs-CxNNucbp.js";
import { _ as _sfc_main$2 } from "./TranslationContent-B_lGk9eD.js";
import { IconLanguage } from "@tabler/icons-vue";
import { usePage } from "@inertiajs/vue3";
import "./TextInput-C-4bWHj0.js";
import "./TextareaInput-DKTcDXJH.js";
import "@ckeditor/ckeditor5-vue";
import "ckeditor5";
import "@wiris/mathtype-ckeditor5/dist/index.js";
const _sfc_main = {
  __name: "GeneralForm",
  __ssrInlineRender: true,
  props: {
    form: { type: Object },
    errors: { type: Object },
    isEditing: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const selectedLocale = ref(usePage().props.config.locale);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-4" }, _attrs))}><div class="flex items-center space-x-2 text-slate-400 mb-4">`);
      _push(ssrRenderComponent(unref(IconLanguage), {
        size: "18",
        stroke: "1.5"
      }, null, _parent));
      _push(`<span class="text-[10px] uppercase font-bold tracking-widest">${ssrInterpolate(_ctx.$t("Localized Content"))}</span></div>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        modelValue: selectedLocale.value,
        "onUpdate:modelValue": ($event) => selectedLocale.value = $event,
        errors: __props.errors
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, {
              code: selectedLocale.value,
              modelValue: __props.form[selectedLocale.value],
              "onUpdate:modelValue": ($event) => __props.form[selectedLocale.value] = $event,
              errors: __props.errors,
              "is-editing": __props.isEditing,
              model: "payment-methods"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2, {
                code: selectedLocale.value,
                modelValue: __props.form[selectedLocale.value],
                "onUpdate:modelValue": ($event) => __props.form[selectedLocale.value] = $event,
                errors: __props.errors,
                "is-editing": __props.isEditing,
                model: "payment-methods"
              }, null, 8, ["code", "modelValue", "onUpdate:modelValue", "errors", "is-editing"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Settings/PaymentMethods/Partials/GeneralForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
