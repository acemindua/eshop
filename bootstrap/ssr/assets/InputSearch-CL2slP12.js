import { ref, onMounted, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr } from "vue/server-renderer";
const _sfc_main = {
  __name: "InputSearch",
  __ssrInlineRender: true,
  props: {
    modelValue: {
      type: String
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { expose: __expose }) {
    const input = ref(null);
    onMounted(() => {
      if (input.value.hasAttribute("autofocus")) {
        input.value.focus();
      }
    });
    __expose({ focus: () => input.value.focus() });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "group relative duration-300" }, _attrs))}><svg width="20" height="20" fill="currentColor" class="absolute left-3 top-1/2 -mt-2.5 text-gray-400 pointer-events-none group-focus-within:text-indigo-300" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"></path></svg><input type="search" name="search"${ssrRenderAttr("value", __props.modelValue)} class="dark:bg-slate-900 focus:ring-2 focus:ring-indigo-400 focus:outline-none appearance-none w-full text-sm leading-6 text-gray-600 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-gray-200 dark:ring-slate-600 shadow-sm border-0 dark:text-slate-200" aria-label="Filter projects" placeholder="Filter ..."></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/UI/InputSearch.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
