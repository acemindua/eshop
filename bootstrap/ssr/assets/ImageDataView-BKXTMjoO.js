import { mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { IconPhotoScan } from "@tabler/icons-vue";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "ImageDataView",
  __ssrInlineRender: true,
  props: {
    src: {
      type: String,
      default: null
    },
    configs: {
      type: Object,
      default: () => ({
        width: "50px",
        height: "50px"
      })
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.src) {
        _push(`<div${ssrRenderAttrs(mergeProps({
          class: "rounded-lg mx-auto bg-slate-200 dark:bg-slate-800 shadow-sm overflow-hidden",
          style: {
            width: __props.configs.width,
            height: __props.configs.height,
            backgroundImage: `url('${__props.src}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
          }
        }, _attrs))} data-v-461533a3></div>`);
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({
          class: "flex items-center justify-center rounded-lg mx-auto text-slate-400 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm",
          style: { width: __props.configs.width, height: __props.configs.height }
        }, _attrs))} data-v-461533a3>`);
        _push(ssrRenderComponent(unref(IconPhotoScan), {
          stroke: 1.5,
          size: "20"
        }, null, _parent));
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
const ImageDataView = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-461533a3"]]);
export {
  ImageDataView as I
};
