import { useModel, mergeProps, mergeModels, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderClass } from "vue/server-renderer";
import { _ as _sfc_main$3 } from "./InputError-Cp3nFeNd.js";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./TextInput-Dmmb8A31.js";
import { _ as _sfc_main$5 } from "./TextEditor-sUHg17QC.js";
import { _ as _sfc_main$4 } from "./TextareaInput-DKTcDXJH.js";
const _sfc_main = {
  __name: "TranslationContent",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    errors: Object,
    code: {
      type: String
    },
    isEditing: {
      type: Boolean,
      default: false
    }
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "md:flex gap-8 py-6" }, _attrs))}><div class="md:w-1/4 mb-6 md:mb-0"><h2 class="text-lg font-bold text-slate-800 flex items-center gap-2"> General Information </h2><p class="mt-2 text-sm text-slate-500 leading-relaxed"> Management of primary content for the <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-indigo-100 text-indigo-700 uppercase tracking-wider">${ssrInterpolate(__props.code)}</span> version. Ensure all mandatory fields are completed to maintain data integrity. </p></div><div class="w-full md:w-3/4 space-y-8 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">`);
      if ("title" in model.value) {
        _push(`<div class="space-y-2"><div class="flex justify-between items-center"><div class="flex items-center gap-1.5">`);
        _push(ssrRenderComponent(_sfc_main$1, {
          for: `${__props.code}.title`,
          value: "Page Title",
          class: "font-bold uppercase"
        }, null, _parent));
        _push(`<span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-indigo-100 text-indigo-700 uppercase tracking-wider">${ssrInterpolate(__props.code)}</span><span class="text-red-500 font-black text-lg leading-none" title="Required field">*</span></div>`);
        if (__props.errors[`${__props.code}.title`]) {
          _push(`<span class="text-[10px] bg-red-50 text-red-600 px-2 py-0.5 rounded font-bold uppercase tracking-tighter"> Required </span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        _push(ssrRenderComponent(_sfc_main$2, {
          id: `${__props.code}.title`,
          modelValue: model.value.title,
          "onUpdate:modelValue": ($event) => model.value.title = $event,
          type: "text",
          class: ["block w-full", {
            "border-red-500 focus:ring-red-100": __props.errors[`${__props.code}.title`]
          }],
          placeholder: `Enter a catchy title for ${__props.code} edition...`
        }, null, _parent));
        _push(`<p class="text-[11px] text-slate-400 leading-tight italic"> The title is the most critical SEO element. Aim for 50-60 characters for optimal search engine display. </p>`);
        _push(ssrRenderComponent(_sfc_main$3, {
          message: __props.errors[`${__props.code}.title`]
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if ("description" in model.value) {
        _push(`<div class="space-y-2"><div class="flex items-center gap-1.5">`);
        _push(ssrRenderComponent(_sfc_main$1, {
          for: `${__props.code}.description`,
          value: "Meta Description",
          class: "font-bold uppercase"
        }, null, _parent));
        _push(`<span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-indigo-100 text-indigo-700 uppercase tracking-wider">${ssrInterpolate(__props.code)}</span></div>`);
        _push(ssrRenderComponent(_sfc_main$4, {
          id: `${__props.code}.description`,
          modelValue: model.value.description,
          "onUpdate:modelValue": ($event) => model.value.description = $event,
          rows: "3",
          class: ["block w-full", { "border-red-500": __props.errors[`${__props.code}.description`] }],
          placeholder: `Summarize the page content for ${__props.code} users...`
        }, null, _parent));
        _push(`<div class="flex justify-between items-start"><p class="text-[11px] text-slate-400 max-w-[80%] italic"> This summary appears in search results. A well-written description can significantly improve your click-through rate (CTR). </p><span class="${ssrRenderClass([{
          "text-red-500": model.value.description?.length > 255
        }, "text-[10px] font-mono text-slate-400"])}">${ssrInterpolate(model.value.description?.length || 0)}/255 </span></div>`);
        _push(ssrRenderComponent(_sfc_main$3, {
          message: __props.errors[`${__props.code}.description`]
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if ("content" in model.value) {
        _push(`<div class="space-y-2"><div class="flex items-center gap-1.5">`);
        _push(ssrRenderComponent(_sfc_main$1, {
          value: "Main Content Body",
          class: "font-bold uppercase"
        }, null, _parent));
        _push(`<span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-indigo-100 text-indigo-700 uppercase tracking-wider">${ssrInterpolate(__props.code)}</span></div><div class="${ssrRenderClass([
          __props.errors[`${__props.code}.content`] ? "border-red-500 ring-2 ring-red-50" : "border-slate-200",
          "overflow-hidden transition-all"
        ])}">`);
        _push(ssrRenderComponent(_sfc_main$5, {
          modelValue: model.value.content,
          "onUpdate:modelValue": ($event) => model.value.content = $event
        }, null, _parent));
        _push(`</div><p class="text-[11px] text-slate-400 italic"> Use headers (H2, H3) and bullet points to make your content readable. Quality content is king for both users and Google. </p>`);
        _push(ssrRenderComponent(_sfc_main$3, {
          message: __props.errors[`${__props.code}.content`]
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/TranslationContent.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
