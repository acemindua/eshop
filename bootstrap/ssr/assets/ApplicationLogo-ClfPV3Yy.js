import { mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
const Logo = "data:image/svg+xml,%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%201.1//EN'%20'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Transformed%20by:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20fill='%23000000'%20width='800px'%20height='800px'%20viewBox='0%200%20512%20512'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20id='SVGRepo_bgCarrier'%20stroke-width='0'/%3e%3cg%20id='SVGRepo_tracerCarrier'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cg%20id='SVGRepo_iconCarrier'%3e%3ctitle%3eionicons-v5_logos%3c/title%3e%3cpath%20d='M256,153.9A102.1,102.1,0,1,0,358.1,256,102.23,102.23,0,0,0,256,153.9Z'/%3e%3ccircle%20cx='402.59'%20cy='116.45'%20r='46.52'/%3e%3cpath%20d='M459.86,163.2l-1.95-4.28-3.11,3.52a70,70,0,0,1-28.06,19.32l-3,1.1,1.22,2.93A181.43,181.43,0,0,1,439,256c0,100.92-82.1,183-183,183S73,356.92,73,256,155.08,73,256,73a180.94,180.94,0,0,1,78.43,17.7L337.3,92l1.25-2.92A70.19,70.19,0,0,1,359.21,62l3.67-2.93L358.71,57A221.61,221.61,0,0,0,256,32C132.49,32,32,132.49,32,256S132.49,480,256,480,480,379.51,480,256A222.19,222.19,0,0,0,459.86,163.2Z'/%3e%3c/g%3e%3c/svg%3e";
const _sfc_main = {
  __name: "ApplicationLogo",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "w-10 h-10 transition-colors bg-blue-500",
        style: {
          maskImage: `url(${unref(Logo)})`,
          maskRepeat: "no-repeat",
          maskSize: "contain",
          maskMode: "luminance",
          webkitMaskImage: `url(${unref(Logo)})`,
          webkitMaskRepeat: "no-repeat",
          webkitMaskSize: "contain",
          webkitMaskMode: "luminance"
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
