import { mergeProps, useSSRContext, useModel, useTemplateRef, onMounted, mergeModels } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderSlot, ssrGetDynamicModelProps } from "vue/server-renderer";
const _sfc_main$1 = {
  __name: "InputLabel",
  __ssrInlineRender: true,
  props: {
    value: {
      type: String
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<label${ssrRenderAttrs(mergeProps({ class: "block text-xs font-semibold text-gray-600 mb-1.5" }, _attrs))}>`);
      if (__props.value) {
        _push(`<span>${ssrInterpolate(__props.value)}</span>`);
      } else {
        _push(`<span>`);
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
        _push(`</span>`);
      }
      if (__props.required) {
        _push(`<span class="text-red-500 font-bold ml-0.5" title="Required field">*</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</label>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/UI/InputLabel.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "TextInput",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    disabled: {
      type: Boolean,
      default: false
    },
    // Додаємо пропс для відстеження помилки валідації
    error: {
      type: [String, Boolean],
      default: false
    }
  }, {
    "modelValue": { type: [String, Number, null], required: true },
    "modelModifiers": {}
  }),
  emits: ["update:modelValue"],
  setup(__props, { expose: __expose }) {
    const props = __props;
    const model = useModel(__props, "modelValue");
    const inputRef = useTemplateRef("input");
    onMounted(() => {
      if (inputRef.value?.hasAttribute("autofocus") && !props.disabled) {
        inputRef.value.focus();
      }
    });
    __expose({
      focus: () => {
        if (!props.disabled) inputRef.value?.focus();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      let _temp0;
      _push(`<input${ssrRenderAttrs((_temp0 = mergeProps({
        ref: "input",
        value: model.value,
        disabled: __props.disabled,
        type: "text",
        class: ["block w-full rounded-lg border px-3 py-2 text-sm shadow-sm transition-colors duration-200 outline-none focus:ring-4 disabled:cursor-not-allowed disabled:opacity-60", [
          // Базові стилі тексту та фону (світла + темна тема)
          "bg-white text-slate-900 placeholder-slate-400 dark:bg-slate-900 dark:text-slate-100 dark:placeholder-slate-500",
          // Динамічні стилі залежно від наявності помилки
          __props.error ? "border-red-500 focus:border-red-500 focus:ring-red-500/10 dark:border-red-500/80 dark:focus:border-red-500" : "border-slate-200 hover:border-slate-300 focus:border-indigo-500 focus:ring-indigo-500/10 dark:border-slate-700 dark:hover:border-slate-600 dark:focus:border-indigo-500"
        ]]
      }, _attrs), mergeProps(_temp0, ssrGetDynamicModelProps(_temp0, model.value))))}>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/UI/TextInput.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main$1 as _,
  _sfc_main as a
};
