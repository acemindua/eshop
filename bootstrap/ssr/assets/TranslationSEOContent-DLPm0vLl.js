import { useModel, mergeProps, mergeModels, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderClass } from "vue/server-renderer";
import { _ as _sfc_main$3 } from "./InputError-Cp3nFeNd.js";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./TextInput-Dmmb8A31.js";
import { _ as _sfc_main$4 } from "./TextareaInput-DKTcDXJH.js";
const _sfc_main = {
  __name: "TranslationSEOContent",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    errors: { type: Object, default: () => ({}) },
    code: { type: String },
    isEditing: { type: Boolean, default: false }
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
    const handleKeywordInput = (e) => {
      let value = e.target.value || "";
      let formatted = value.replace(/\s+/g, ", ").replace(/,+/g, ",").replace(/,\s*/g, ", ").replace(/^\s*,\s*/, "");
      model.value.meta_keywords = formatted;
      e.target.value = formatted;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "md:flex gap-8 py-6" }, _attrs))}><div class="md:w-1/4 mb-6 md:mb-0"><h2 class="text-lg font-bold text-slate-800 flex items-center gap-2"> SEO Optimization </h2><p class="mt-2 text-sm text-slate-500 leading-relaxed"> Configure meta tags and indexing settings for the <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-indigo-100 text-indigo-700 uppercase tracking-wider">${ssrInterpolate(__props.code)}</span> version. </p></div><div class="w-full md:w-3/4 space-y-8 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">`);
      if ("slug" in model.value) {
        _push(`<div class="space-y-2 pb-6 border-b border-slate-100">`);
        _push(ssrRenderComponent(_sfc_main$1, {
          for: `${__props.code}.slug`,
          value: "URL Slug",
          class: "font-bold uppercase"
        }, null, _parent));
        _push(`<div class="flex"><span class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-slate-300 bg-slate-50 text-slate-500 text-xs font-mono"> /${ssrInterpolate(__props.code)}/ </span>`);
        _push(ssrRenderComponent(_sfc_main$2, {
          id: `${__props.code}.slug`,
          modelValue: model.value.slug,
          "onUpdate:modelValue": ($event) => model.value.slug = $event,
          type: "text",
          class: ["block w-full rounded-l-none", { "border-red-500": __props.errors[`${__props.code}.slug`] }],
          placeholder: "example-page-url"
        }, null, _parent));
        _push(`</div>`);
        _push(ssrRenderComponent(_sfc_main$3, {
          message: __props.errors[`${__props.code}.slug`]
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if ("meta_title" in model.value) {
        _push(`<div class="space-y-2"><div class="flex justify-between items-center">`);
        _push(ssrRenderComponent(_sfc_main$1, {
          for: `${__props.code}.meta_title`,
          value: "Meta Title",
          class: "font-bold uppercase"
        }, null, _parent));
        _push(`<span class="${ssrRenderClass([{
          "text-red-500": model.value.meta_title?.length > 60
        }, "text-[10px] font-mono text-slate-400"])}">${ssrInterpolate(model.value.meta_title?.length || 0)}/60 </span></div>`);
        _push(ssrRenderComponent(_sfc_main$2, {
          id: `${__props.code}.meta_title`,
          modelValue: model.value.meta_title,
          "onUpdate:modelValue": ($event) => model.value.meta_title = $event,
          type: "text",
          class: ["block w-full", { "border-red-500": __props.errors[`${__props.code}.meta_title`] }]
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$3, {
          message: __props.errors[`${__props.code}.meta_title`]
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if ("meta_description" in model.value) {
        _push(`<div class="space-y-2"><div class="flex justify-between items-center">`);
        _push(ssrRenderComponent(_sfc_main$1, {
          for: `${__props.code}.meta_description`,
          value: "Meta Description",
          class: "font-bold uppercase"
        }, null, _parent));
        _push(`<span class="${ssrRenderClass([{
          "text-red-500": model.value.meta_description?.length > 160
        }, "text-[10px] font-mono text-slate-400"])}">${ssrInterpolate(model.value.meta_description?.length || 0)}/160 </span></div>`);
        _push(ssrRenderComponent(_sfc_main$4, {
          id: `${__props.code}.meta_description`,
          modelValue: model.value.meta_description,
          "onUpdate:modelValue": ($event) => model.value.meta_description = $event,
          rows: "3",
          class: ["block w-full", {
            "border-red-500": __props.errors[`${__props.code}.meta_description`]
          }]
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$3, {
          message: __props.errors[`${__props.code}.meta_description`]
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if ("meta_keywords" in model.value) {
        _push(`<div class="space-y-2 pt-2">`);
        _push(ssrRenderComponent(_sfc_main$1, {
          for: `${__props.code}.meta_keywords`,
          value: "Meta Keywords",
          class: "font-bold uppercase"
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$2, {
          id: `${__props.code}.meta_keywords`,
          "model-value": model.value.meta_keywords || "",
          onInput: handleKeywordInput,
          type: "text",
          class: "block w-full text-sm font-mono",
          placeholder: "property, rent, kyiv"
        }, null, _parent));
        _push(`<div class="flex items-start gap-2 bg-slate-50 p-3 rounded-lg border border-slate-100"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-indigo-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><p class="text-[11px] text-slate-500 leading-tight"><strong>Smart Formatting:</strong> Spaces are automatically converted to commas. </p></div>`);
        _push(ssrRenderComponent(_sfc_main$3, {
          message: __props.errors[`${__props.code}.meta_keywords`]
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/TranslationSEOContent.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
