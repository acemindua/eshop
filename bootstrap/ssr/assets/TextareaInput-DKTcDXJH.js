import { ref, watch, onMounted, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate } from "vue/server-renderer";
const _sfc_main = {
  __name: "TextareaInput",
  __ssrInlineRender: true,
  props: {
    modelValue: {
      type: [String, Number, null],
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const input = ref(null);
    const internalValue = ref(props.modelValue);
    watch(
      () => props.modelValue,
      (newVal) => {
        internalValue.value = newVal;
      }
    );
    watch(internalValue, (newVal) => {
      emit("update:modelValue", newVal);
    });
    onMounted(() => {
      if (input.value?.hasAttribute("autofocus") && !props.disabled) {
        input.value.focus();
      }
    });
    __expose({
      focus: () => {
        if (!props.disabled) input.value?.focus();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<textarea${ssrRenderAttrs(mergeProps({
        class: "rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500",
        ref_key: "input",
        ref: input,
        disabled: __props.disabled
      }, _attrs), "textarea")}>${ssrInterpolate(internalValue.value)}</textarea>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/UI/TextareaInput.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
