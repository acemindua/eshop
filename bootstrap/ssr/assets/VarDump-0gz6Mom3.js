import { computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate } from "vue/server-renderer";
const _sfc_main = {
  __name: "VarDump",
  __ssrInlineRender: true,
  props: {
    data: {
      type: [Object, Array, String, Number, null],
      default: () => ({})
    }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const formattedData = computed(() => {
      if (props.data === null || props.data === void 0) {
        return "null";
      }
      if (typeof props.data === "object") {
        try {
          return JSON.stringify(props.data, null, 2);
        } catch (e) {
          return `[Помилка: Неможливо серіалізувати дані в JSON]`;
        }
      }
      return String(props.data);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-slate-200 dark:bg-slate-800 rounded-lg" }, _attrs))}><div class="relative overflow-auto max-h-[80vh]"><pre class="p-8 border dark:border-slate-700 rounded-lg border-slate-200 text-left font-mono text-xs leading-relaxed text-slate-600 dark:text-slate-500 whitespace-pre-wrap">${ssrInterpolate(formattedData.value)}
                </pre></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Shared/VarDump.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
