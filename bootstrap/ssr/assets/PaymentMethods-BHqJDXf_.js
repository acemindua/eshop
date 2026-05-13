import { useModel, watch, onMounted, mergeProps, mergeModels, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./InputError-Cp3nFeNd.js";
const _sfc_main = {
  __name: "PaymentMethods",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    methods: {
      type: Array,
      required: true,
      default: () => []
    },
    errors: {
      type: Object,
      default: () => ({})
    }
  }, {
    "modelValue": {},
    "modelModifiers": {}
  }),
  emits: ["update:modelValue"],
  setup(__props) {
    const props = __props;
    const modelValue = useModel(__props, "modelValue");
    const selectFirstIfNone = () => {
      if (props.methods.length > 0 && !modelValue.value) {
        modelValue.value = props.methods[0].code;
      }
    };
    watch(
      () => props.methods,
      (newMethods) => {
        if (newMethods && newMethods.length > 0) {
          selectFirstIfNone();
        }
      },
      { immediate: true, deep: true }
    );
    onMounted(() => {
      selectFirstIfNone();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-3" }, _attrs))}><!--[-->`);
      ssrRenderList(__props.methods, (method) => {
        _push(`<div class="${ssrRenderClass([[
          modelValue.value === method.code ? "border-black bg-gray-50 ring-1 ring-black" : "border-gray-200 hover:border-gray-400"
        ], "group relative flex cursor-pointer border p-4 transition-all duration-200"])}"><div class="flex h-5 items-center"><div class="${ssrRenderClass([
          modelValue.value === method.code ? "border-black" : "border-gray-300",
          "flex h-4 w-4 items-center justify-center rounded-full border"
        ])}">`);
        if (modelValue.value === method.code) {
          _push(`<div class="h-2 w-2 rounded-full bg-black"></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="ml-4 flex flex-col"><span class="${ssrRenderClass([
          modelValue.value === method.code ? "text-black" : "text-gray-500",
          "text-xs font-bold uppercase tracking-wider"
        ])}">${ssrInterpolate(method.label)}</span>`);
        if (method.description) {
          _push(`<span class="mt-1 text-[11px] text-gray-400 leading-relaxed">${ssrInterpolate(method.description)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      });
      _push(`<!--]-->`);
      if (__props.errors?.payment_method) {
        _push(ssrRenderComponent(_sfc_main$1, {
          message: __props.errors.payment_method
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/Commerce/Partials/PaymentMethods.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
