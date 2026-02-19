import { mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { IconPhotoScan } from "@tabler/icons-vue";
const _sfc_main = {
  __name: "ImageDataView",
  __ssrInlineRender: true,
  props: {
    src: {
      type: String
    },
    configs: {
      type: Object,
      default: {
        width: "50px",
        height: "50px"
      }
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.src) {
        _push(`<div${ssrRenderAttrs(mergeProps({
          class: "rounded-lg mx-auto bg-gray-200 shadow overflow-hidden",
          style: {
            width: __props.configs.width,
            height: __props.configs.height,
            backgroundImage: `url('${__props.src}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
          }
        }, _attrs))}></div>`);
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({
          class: "flex items-center justify-center rounded-lg mx-auto text-gray-400 bg-white shadow",
          style: { width: __props.configs.width, height: __props.configs.height }
        }, _attrs))}>`);
        _push(ssrRenderComponent(unref(IconPhotoScan), { stroke: "{2}" }, null, _parent));
        _push(`</div>`);
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/UI/ImageDataView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
