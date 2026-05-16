import { useModel, mergeProps, mergeModels, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$3 } from "./InputError-Cp3nFeNd.js";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./TextInput-Dmmb8A31.js";
import { _ as _sfc_main$4 } from "./TextareaInput-DKTcDXJH.js";
import { _ as _sfc_main$5 } from "./TextEditor-sUHg17QC.js";
import "@ckeditor/ckeditor5-vue";
import "ckeditor5";
import "@wiris/mathtype-ckeditor5/dist/index.js";
const _sfc_main = {
  __name: "TranslationContent",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    code: {
      type: String,
      required: true
    },
    errors: Object,
    isEditing: {
      type: Boolean,
      default: false
    },
    entityType: String
  }, {
    "modelValue": {
      type: Object,
      required: true
    },
    "modelModifiers": {}
  }),
  emits: ["update:modelValue"],
  setup(__props) {
    const model = useModel(__props, "modelValue");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "md:flex gap-6 w-full border rounded-lg p-2 md:p-6 lg:p-12 bg-gray-50" }, _attrs))}><div class="w-full md:w-1/5 pb-4"><h2 class="uppercase font-semibold">General</h2><span class="py-2 text-sm text-gray-600">Manage general info</span></div><div class="flex md:w-3/4 w-full flex-col space-y-4 bg-gray-50">`);
      {
        _push(`<div class="mb-3"><div class="flex items-center space-x-1"><span class="text-red-500">*</span>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          for: `${__props.code}.title`,
          value: `Title (${__props.code})`,
          class: "flex leading-6 items-center font-semibold"
        }, null, _parent));
        _push(`</div><div class="w-full sm:col-span-3">`);
        _push(ssrRenderComponent(_sfc_main$2, {
          id: `${__props.code}.title`,
          type: "text",
          modelValue: model.value.title,
          "onUpdate:modelValue": ($event) => model.value.title = $event,
          class: ["block w-full", {
            "border-red-500": __props.errors[`${__props.code}.title`]
          }],
          placeholder: `Title (${__props.code})`
        }, null, _parent));
        _push(`<p class="mt-1 text-xs text-gray-500"> Enter the page title. This will appear in search engine results. </p>`);
        _push(ssrRenderComponent(_sfc_main$3, {
          class: "mt-2",
          message: __props.errors[`${__props.code}.title`]
        }, null, _parent));
        _push(`</div></div>`);
      }
      {
        _push(`<div class="mb-3">`);
        _push(ssrRenderComponent(_sfc_main$1, {
          for: `${__props.code}.description`,
          value: `Description (${__props.code})`,
          class: "flex leading-6 items-center font-semibold"
        }, null, _parent));
        _push(`<div class="w-full sm:col-span-3">`);
        _push(ssrRenderComponent(_sfc_main$4, {
          id: `${__props.code}.description`,
          modelValue: model.value.description,
          "onUpdate:modelValue": ($event) => model.value.description = $event,
          class: "block w-full"
        }, null, _parent));
        _push(`<p class="mt-1 text-xs text-gray-500"> Provide a brief description of the page content for SEO purposes. </p>`);
        _push(ssrRenderComponent(_sfc_main$3, {
          class: "mt-2",
          message: __props.errors[`${__props.code}.description`]
        }, null, _parent));
        _push(`</div></div>`);
      }
      {
        _push(`<div class="mb-3">`);
        _push(ssrRenderComponent(_sfc_main$1, {
          value: `Payment Details / Bank Requisites (${__props.code})`,
          class: "flex leading-6 items-center font-semibold"
        }, null, _parent));
        _push(`<div class="w-full sm:col-span-3">`);
        _push(ssrRenderComponent(_sfc_main$5, {
          modelValue: model.value.payment_details,
          "onUpdate:modelValue": ($event) => model.value.payment_details = $event,
          placeholder: `Отримувач: ФОП Кондюх Роман Євгенович
ЄДРПОУ: 12345678
IBAN: UA00...`
        }, null, _parent));
        _push(`<p class="mt-1 text-xs text-gray-500"> Enter official bank details. These will be shown to customers choosing non-cash payment. </p>`);
        _push(ssrRenderComponent(_sfc_main$3, {
          class: "mt-2",
          message: __props.errors[`${__props.code}.payment_details`]
        }, null, _parent));
        _push(`</div></div>`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Settings/PaymentMethods/Partials/TranslationContent.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
