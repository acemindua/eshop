import { useModel, mergeProps, mergeModels, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$1, b as _sfc_main$2, a as _sfc_main$3 } from "./TextInput-C-4bWHj0.js";
import { _ as _sfc_main$4 } from "./TextareaInput-DKTcDXJH.js";
const _sfc_main = {
  __name: "TranslationSEOContent",
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
    const appendComma = () => {
      if (!model.value.meta_keywords) return;
      const trimmed = model.value.meta_keywords.toLowerCase().trim().replace(/\s*,\s*$/, "");
      if (trimmed) {
        model.value.meta_keywords = trimmed + ", ";
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      if ("meta_title" in model.value) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "md:flex gap-6 w-full border rounded-lg p-2 md:p-6 lg:p-12 bg-gray-50" }, _attrs))}><div class="w-full md:w-1/5 pb-4"><h2 class="uppercase font-semibold">Meta tags</h2><span class="py-2 text-sm text-gray-600">SEO content</span></div><div class="flex md:w-3/4 w-full flex-col space-y-4 bg-gray-50">`);
        if ("slug" in model.value) {
          _push(`<div class="mb-3"><div class="flex items-center space-x-1"><span class="text-red-500">*</span>`);
          _push(ssrRenderComponent(_sfc_main$1, {
            for: `${__props.code}.slug`,
            value: `Slug (${__props.code})`,
            class: "flex leading-6 items-center font-semibold"
          }, null, _parent));
          _push(`</div><div class="w-full sm:col-span-3"><div class="relative w-full">`);
          _push(ssrRenderComponent(_sfc_main$2, {
            id: `${__props.code}.slug`,
            type: "text",
            modelValue: model.value.slug,
            "onUpdate:modelValue": ($event) => model.value.slug = $event,
            class: ["block w-full", {
              "border-red-500": __props.errors[`${__props.code}.slug`]
            }],
            placeholder: `slug`
          }, null, _parent));
          _push(`</div>`);
          _push(ssrRenderComponent(_sfc_main$3, {
            class: "mt-2",
            message: __props.errors[`${__props.code}.slug`]
          }, null, _parent));
          _push(`</div></div>`);
        } else {
          _push(`<!---->`);
        }
        if ("meta_title" in model.value) {
          _push(`<div class="mb-3"><div class="flex items-center space-x-1">`);
          _push(ssrRenderComponent(_sfc_main$1, {
            for: `${__props.code}.meta_title`,
            value: `Meta title (${__props.code})`,
            class: "flex leading-6 items-center font-semibold"
          }, null, _parent));
          _push(`</div><div class="w-full sm:col-span-3">`);
          _push(ssrRenderComponent(_sfc_main$2, {
            id: `${__props.code}.meta_title`,
            type: "text",
            modelValue: model.value.meta_title,
            "onUpdate:modelValue": ($event) => model.value.meta_title = $event,
            class: ["block w-full", {
              "border-red-500": __props.errors[`${__props.code}.meta_title`]
            }],
            placeholder: `meta_title (${__props.code})`
          }, null, _parent));
          _push(`<p class="mt-1 text-xs text-gray-500"> SEO meta title, shown in browser tabs and search results. </p>`);
          _push(ssrRenderComponent(_sfc_main$3, {
            class: "mt-2",
            message: __props.errors[`${__props.code}.meta_title`]
          }, null, _parent));
          _push(`</div></div>`);
        } else {
          _push(`<!---->`);
        }
        if ("meta_description" in model.value) {
          _push(`<div class="mb-3">`);
          _push(ssrRenderComponent(_sfc_main$1, {
            for: `${__props.code}.meta_description`,
            value: `Meta description (${__props.code})`,
            class: "flex leading-6 items-center font-semibold"
          }, null, _parent));
          _push(`<div class="w-full sm:col-span-3">`);
          _push(ssrRenderComponent(_sfc_main$4, {
            id: `${__props.code}.meta_description`,
            modelValue: model.value.meta_description,
            "onUpdate:modelValue": ($event) => model.value.meta_description = $event,
            class: "block w-full"
          }, null, _parent));
          _push(`<p class="mt-1 text-xs text-gray-500"> SEO meta description, helps improve search engine snippets. </p>`);
          _push(ssrRenderComponent(_sfc_main$3, {
            class: "mt-2",
            message: __props.errors[`${__props.code}.meta_description`]
          }, null, _parent));
          _push(`</div></div>`);
        } else {
          _push(`<!---->`);
        }
        if ("meta_keywords" in model.value) {
          _push(`<div class="mb-3"><div class="flex items-center space-x-1">`);
          _push(ssrRenderComponent(_sfc_main$1, {
            for: `${__props.code}.meta_keywords`,
            value: `Meta keywords (${__props.code})`,
            class: "flex leading-6 items-center font-semibold"
          }, null, _parent));
          _push(`</div><div class="w-full sm:col-span-3">`);
          _push(ssrRenderComponent(_sfc_main$2, {
            id: `${__props.code}.meta_keywords`,
            type: "text",
            modelValue: model.value.meta_keywords,
            "onUpdate:modelValue": ($event) => model.value.meta_keywords = $event,
            class: ["block w-full", {
              "border-red-500": __props.errors[`${__props.code}.meta_keywords`]
            }],
            placeholder: `meta_keywords (${__props.code})`,
            onKeydown: [appendComma, appendComma]
          }, null, _parent));
          _push(`<p class="mt-2 text-xs text-gray-500"> Enter keywords separated automatically by commas as you type. Press space or enter to add a comma. </p>`);
          _push(ssrRenderComponent(_sfc_main$3, {
            class: "mt-2",
            message: __props.errors[`${__props.code}.meta_keywords`]
          }, null, _parent));
          _push(`</div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
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
