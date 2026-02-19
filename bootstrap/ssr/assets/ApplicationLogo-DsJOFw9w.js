import { mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
const Logo = "/build/assets/logo-79MZKzeq.svg";
const _sfc_main = {
  __name: "ApplicationLogo",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "w-10 h-10 transition-colors",
        style: {
          maskImage: `url(${unref(Logo)})`,
          maskRepeat: "no-repeat",
          maskSize: "contain",
          webkitMaskImage: `url(${unref(Logo)})`,
          webkitMaskRepeat: "no-repeat",
          webkitMaskSize: "contain"
        }
      }, _attrs))}></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ApplicationLogo.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
