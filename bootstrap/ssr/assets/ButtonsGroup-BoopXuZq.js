import { mergeProps, createVNode, resolveDynamicComponent, createSlots, withCtx, toDisplayString, openBlock, createBlock, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderVNode, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./PrimaryButton-qPOvUO75.js";
import { IconCloudUpload, IconCirclePlus, IconFileImport, IconPlus, IconDeviceFloppy, IconCancel } from "@tabler/icons-vue";
const _sfc_main = {
  __name: "ButtonsGroup",
  __ssrInlineRender: true,
  props: {
    loading: { type: Boolean, default: false },
    // Масив конфігурації кнопок
    buttons: {
      type: Array,
      required: true
      // Приклад структури: [{ label: 'Save', action: func, type: 'primary', icon: IconComponent }]
    }
  },
  setup(__props) {
    const iconMap = {
      IconCancel,
      IconDeviceFloppy,
      IconPlus,
      IconFileImport,
      IconCirclePlus,
      IconCloudUpload
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex space-x-4 relative z-20" }, _attrs))}><!--[-->`);
      ssrRenderList(__props.buttons, (btn) => {
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(btn.type === "primary" ? _sfc_main$1 : _sfc_main$2), {
          onClick: btn.action,
          disabled: __props.loading,
          class: { "opacity-50": __props.loading }
        }, createSlots({
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span${_scopeId}>${ssrInterpolate(__props.loading && btn.loadingLabel ? _ctx.$t(btn.loadingLabel) : _ctx.$t(btn.label))}</span>`);
            } else {
              return [
                createVNode("span", null, toDisplayString(__props.loading && btn.loadingLabel ? _ctx.$t(btn.loadingLabel) : _ctx.$t(btn.label)), 1)
              ];
            }
          }),
          _: 2
        }, [
          btn.icon ? {
            name: "icon",
            fn: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(iconMap[btn.icon]), { stroke: 2 }, null), _parent2, _scopeId);
              } else {
                return [
                  (openBlock(), createBlock(resolveDynamicComponent(iconMap[btn.icon]), { stroke: 2 }))
                ];
              }
            }),
            key: "0"
          } : void 0
        ])), _parent);
      });
      _push(`<!--]--></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/UI/Buttons/Admin/ButtonsGroup.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
