import { ref, mergeProps, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { L as LanguagesTabs } from "./LanguagesTabs-Sf2huWnr.js";
import _sfc_main$1 from "./TranslationContent-DPs0kTDb.js";
import { b as usePage } from "../ssr.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./InputError-Cp3nFeNd.js";
import "./InputLabel-BSWPuOQO.js";
import "./TextareaInput-DKTcDXJH.js";
import "./TextEditor-u-xvDZoq.js";
import "ckeditor5";
import "@ckeditor/ckeditor5-vue";
import "./TextInput-5OXx1Hvj.js";
import "@unhead/vue/server";
import "@vue/shared";
import "@vue/compiler-ssr";
import "node:stream";
import "@inertiajs/core";
import "lodash-es";
import "laravel-precognition";
import "@inertiajs/core/server";
import "pinia";
import "@floating-ui/dom";
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-4" }, _attrs))}>`);
      _push(ssrRenderComponent(LanguagesTabs, {
        modelValue: selectedLocale.value,
        "onUpdate:modelValue": ($event) => selectedLocale.value = $event,
        errors: __props.errors
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1, {
              code: selectedLocale.value,
              modelValue: __props.form[selectedLocale.value],
              "onUpdate:modelValue": ($event) => __props.form[selectedLocale.value] = $event,
              errors: __props.errors,
              "is-editing": __props.isEditing,
              "entity-type": "payment-methods"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$1, {
                code: selectedLocale.value,
                modelValue: __props.form[selectedLocale.value],
                "onUpdate:modelValue": ($event) => __props.form[selectedLocale.value] = $event,
                errors: __props.errors,
                "is-editing": __props.isEditing,
                "entity-type": "payment-methods"
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
