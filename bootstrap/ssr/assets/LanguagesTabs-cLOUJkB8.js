import { useModel, computed, onMounted, resolveComponent, mergeProps, mergeModels, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrRenderComponent, ssrInterpolate, ssrRenderSlot } from "vue/server-renderer";
import { u as usePage } from "../ssr.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "LanguagesTabs",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    errors: { type: Object, default: () => ({}) },
    // Додаємо новий пропс для масиву полів поточного таба
    fields: { type: Array, default: () => [] }
  }, {
    "modelValue": { type: String },
    "modelModifiers": {}
  }),
  emits: ["update:modelValue"],
  setup(__props) {
    const props = __props;
    const selected = useModel(__props, "modelValue");
    const page = usePage();
    const locales = computed(() => page.props.config.supportedLocales || {});
    const countLanguages = computed(() => Object.keys(locales.value).length);
    onMounted(() => {
      if (!selected.value && countLanguages.value > 0) {
        selected.value = Object.keys(locales.value)[0];
      }
    });
    const hasError = (code) => {
      const errorKeys = Object.keys(props.errors || {});
      if (props.fields.length === 0) {
        return errorKeys.some((k) => k.startsWith(`${code}.`));
      }
      return errorKeys.some((k) => {
        return props.fields.some((field) => k === `${code}.${field}`);
      });
    };
    const getCountryCode = (r) => r && r.includes("_") ? r.split("_")[1].toLowerCase() : "uk";
    return (_ctx, _push, _parent, _attrs) => {
      const _component_flag = resolveComponent("flag");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col" }, _attrs))} data-v-fa71db21>`);
      if (countLanguages.value > 1) {
        _push(`<div class="mb-3 overflow-x-auto no-scrollbar" data-v-fa71db21><ul class="flex flex-nowrap gap-2 pb-1" data-v-fa71db21><!--[-->`);
        ssrRenderList(locales.value, (locale, code) => {
          _push(`<li class="relative" data-v-fa71db21><button type="button" class="${ssrRenderClass([[
            selected.value === code ? "bg-white border-indigo-200 text-indigo-700 ring-4 ring-indigo-50 shadow-sm" : "bg-gray-50 border-gray-100 text-gray-500 hover:bg-gray-100 hover:text-gray-700",
            hasError(code) ? "border-red-200 bg-red-50/50" : ""
          ], "px-3 py-2 rounded-lg border transition-all duration-200 inline-flex items-center gap-2 group"])}" data-v-fa71db21>`);
          if (locale.regional) {
            _push(ssrRenderComponent(_component_flag, {
              iso: getCountryCode(locale.regional),
              class: "rounded-sm text-[14px] shrink-0 shadow-sm opacity-90 group-hover:opacity-100"
            }, null, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`<span class="font-bold text-[11px] uppercase tracking-wider md:hidden" data-v-fa71db21>${ssrInterpolate(code)}</span><span class="capitalize text-[12px] hidden md:block font-medium opacity-80 group-hover:opacity-100 transition-opacity" data-v-fa71db21>${ssrInterpolate(locale.native)}</span></button>`);
          if (hasError(code)) {
            _push(`<span class="absolute top-1 right-1 flex h-3 w-3 z-50" data-v-fa71db21><span class="animate-ping absolute h-full w-full rounded-full bg-red-400 opacity-75" data-v-fa71db21></span><span class="h-3 w-3 rounded-full bg-red-500 border-2 border-white shadow-sm" data-v-fa71db21></span></span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</li>`);
        });
        _push(`<!--]--></ul></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="transition-all duration-300 overflow-hidden" data-v-fa71db21>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/LanguagesTabs.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const LanguagesTabs = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-fa71db21"]]);
export {
  LanguagesTabs as L
};
