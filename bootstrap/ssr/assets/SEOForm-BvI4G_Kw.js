import { useModel, mergeProps, mergeModels, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$1, b as _sfc_main$2, a as _sfc_main$3 } from "./TextInput-C-4bWHj0.js";
const _sfc_main = {
  __name: "SEOForm",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    errors: Object,
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "md:flex gap-6 w-full border rounded-lg p-2 md:p-6 lg:p-12 bg-gray-50" }, _attrs))}><div class="w-full md:w-1/5 pb-4"><h2 class="uppercase font-semibold">Meta tags</h2><span class="py-2 text-sm text-gray-600">SEO content</span></div><div class="flex md:w-3/4 w-full flex-col space-y-4 bg-gray-50"><div class="mb-3"><div class="flex items-center space-x-1"><span class="text-red-500">*</span>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        for: "slug",
        value: `Slug`,
        class: "flex leading-6 items-center font-semibold"
      }, null, _parent));
      _push(`</div><div class="w-full sm:col-span-3"><div class="relative w-full">`);
      _push(ssrRenderComponent(_sfc_main$2, {
        id: "slug",
        type: "text",
        modelValue: model.value.slug,
        "onUpdate:modelValue": ($event) => model.value.slug = $event,
        class: ["block w-full", {
          "border-red-500": __props.errors[`slug`]
        }],
        placeholder: `slug`
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        class: "mt-2",
        message: __props.errors[`slug`]
      }, null, _parent));
      _push(`</div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Commerce/Manufacturers/Partials/SEOForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
