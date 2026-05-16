import { ref, computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrIncludeBooleanAttr, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "VarDump",
  __ssrInlineRender: true,
  props: {
    data: {
      type: [Object, Array, String, Number, null],
      default: null
    }
  },
  setup(__props) {
    const props = __props;
    const isCopied = ref(false);
    const highlightedData = computed(() => {
      if (props.data === null)
        return '<span class="text-slate-400 italic">null</span>';
      if (props.data === void 0)
        return '<span class="text-slate-400 italic">undefined</span>';
      let jsonString = "";
      try {
        jsonString = JSON.stringify(props.data, null, 2);
      } catch (e) {
        return `<span class="text-red-500 font-bold">[Error: Circular structure]</span>`;
      }
      jsonString = jsonString.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      const regex = /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g;
      return jsonString.replace(regex, (match) => {
        let className = "text-blue-500 dark:text-blue-400";
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            className = "text-indigo-600 dark:text-indigo-300 font-semibold";
          } else {
            className = "text-emerald-600 dark:text-emerald-400";
          }
        } else if (/true|false/.test(match)) {
          className = "text-amber-500";
        } else if (/null/.test(match)) {
          className = "text-slate-400";
        }
        return `<span class="${className}">${match}</span>`;
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "group relative bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden font-sans" }, _attrs))} data-v-20bcd923><div class="flex items-center justify-between px-4 py-2 border-b border-slate-200 dark:border-slate-700 bg-slate-100/50 dark:bg-slate-800/50" data-v-20bcd923><span class="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400" data-v-20bcd923> Data Inspector </span><button${ssrIncludeBooleanAttr(!__props.data) ? " disabled" : ""} class="min-w-[80px] text-xs px-2.5 py-1.5 rounded-md bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 active:scale-95 transition-all text-slate-600 dark:text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed" data-v-20bcd923>${ssrInterpolate(isCopied.value ? "Copied!" : "Copy JSON")}</button></div><div class="relative overflow-auto max-h-[60vh] custom-scrollbar bg-white dark:bg-slate-950" data-v-20bcd923><pre class="p-4 font-mono text-[13px] leading-relaxed whitespace-pre-wrap break-all selection:bg-indigo-100 dark:selection:bg-indigo-900" data-v-20bcd923>${highlightedData.value ?? ""}</pre></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Shared/VarDump.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const VarDump = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-20bcd923"]]);
export {
  VarDump as V
};
