import { ref, computed, watch, resolveComponent, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrRenderComponent, ssrInterpolate, ssrRenderSlot } from "vue/server-renderer";
import { u as usePage } from "../ssr.js";
const _sfc_main = {
  __name: "LanguagesTabs",
  __ssrInlineRender: true,
  props: {
    modelValue: String,
    errors: Object,
    locale: {
      type: String,
      default: "uk"
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const page = usePage();
    const locales = ref(page.props.config.supportedLocales);
    const countLanguages = computed(() => {
      return Object.keys(locales).length > 1 ? true : false;
    });
    const selected = ref(props.modelValue || props.locale);
    function splitRegion($region) {
      return $region.split("_")[1].toLowerCase();
    }
    watch(selected, (newValue) => {
      emit("update:modelValue", newValue);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_flag = resolveComponent("flag");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col py-4" }, _attrs))}>`);
      if (countLanguages.value) {
        _push(`<div><ul class="flex space-x-2 mb-2"><!--[-->`);
        ssrRenderList(locales.value, (locale, code) => {
          _push(`<li class="relative"><button class="${ssrRenderClass([{
            "bg-indigo-50 shadow-inner text-indigo-500": code === selected.value,
            "bg-red-300": __props.errors[`${code}.title`]
          }, "px-3 py-2 bg-gray-50 shadow rounded-lg hover:bg-indigo-100 transition-colors duration-200 inline-flex items-center space-x-2 tracking-wide line-clamp-3"])}">`);
          _push(ssrRenderComponent(_component_flag, {
            iso: splitRegion(locale.regional),
            title: locale.name,
            class: "rounded-full text-xl shadow-lg"
          }, null, _parent));
          _push(`<span class="hidden md:block capitalize text-xs">${ssrInterpolate(locale.name)}</span></button>`);
          if (__props.errors[`${code}.title`]) {
            _push(`<div class="absolute bottom-2 right-2 flex h-2 w-2"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span><span class="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</li>`);
        });
        _push(`<!--]--></ul></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div>`);
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
export {
  _sfc_main as _
};
