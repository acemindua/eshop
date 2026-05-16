import { ref, mergeProps, withCtx, openBlock, createBlock, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { L as LanguagesTabs } from "./LanguagesTabs-cLOUJkB8.js";
import { _ as _sfc_main$1 } from "./TranslationContent-b8__8l34.js";
import { u as usePage } from "../ssr.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./InputError-Cp3nFeNd.js";
import "./TextInput-Dmmb8A31.js";
import "./TextEditor-sUHg17QC.js";
import "@ckeditor/ckeditor5-vue";
import "ckeditor5";
import "@wiris/mathtype-ckeditor5/dist/index.js";
import "./TextareaInput-DKTcDXJH.js";
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
    data: {
      type: Object,
      default: () => ({})
    },
    form: { type: Object },
    errors: { type: Object },
    isEditing: {
      type: Boolean,
      default: false
      // Якщо не передано — вважається "створення"
    }
  },
  setup(__props) {
    const selectedLocale = ref(usePage().props.config.locale);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(LanguagesTabs, mergeProps({
        modelValue: selectedLocale.value,
        "onUpdate:modelValue": ($event) => selectedLocale.value = $event,
        errors: __props.errors,
        fields: ["title", "description", "content"]
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.form[selectedLocale.value] && typeof __props.form[selectedLocale.value] === "object") {
              _push2(ssrRenderComponent(_sfc_main$1, {
                code: selectedLocale.value,
                modelValue: __props.form[selectedLocale.value],
                "onUpdate:modelValue": ($event) => __props.form[selectedLocale.value] = $event,
                errors: __props.errors,
                "is-editing": __props.isEditing
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              __props.form[selectedLocale.value] && typeof __props.form[selectedLocale.value] === "object" ? (openBlock(), createBlock(_sfc_main$1, {
                key: 0,
                code: selectedLocale.value,
                modelValue: __props.form[selectedLocale.value],
                "onUpdate:modelValue": ($event) => __props.form[selectedLocale.value] = $event,
                errors: __props.errors,
                "is-editing": __props.isEditing
              }, null, 8, ["code", "modelValue", "onUpdate:modelValue", "errors", "is-editing"])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Dashboard/Pages/Partials/GeneralForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
