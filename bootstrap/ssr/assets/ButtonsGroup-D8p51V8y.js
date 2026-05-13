import { computed, createVNode, resolveDynamicComponent, unref, mergeProps, withCtx, renderSlot, useSSRContext, createSlots, toDisplayString, openBlock, createBlock } from "vue";
import { ssrRenderVNode, ssrRenderSlot, ssrRenderAttrs, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { l as link_default } from "../ssr.js";
import { IconCloudUpload, IconCirclePlus, IconFileImport, IconPlus, IconDeviceFloppy, IconCancel } from "@tabler/icons-vue";
const _sfc_main$2 = {
  __name: "SecondaryButton",
  __ssrInlineRender: true,
  props: {
    as: {
      type: String,
      default: "button"
      // можна 'button' або 'Link'
    },
    action: {
      type: String
    }
  },
  setup(__props) {
    const props = __props;
    const classes = computed(() => {
      switch (props.action) {
        default:
          return "bg-white border";
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(__props.as === "Link" ? unref(link_default) : "button"), mergeProps(_ctx.$attrs, {
        class: [classes.value, "inline-flex items-center gap-2 rounded-md px-4 py-1 text-xs font-semibold uppercase tracking-widest text-gray-700 shadow-sm transition duration-150 ease-in-out"]
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "icon", {}, null, _push2, _parent2, _scopeId);
            _push2(`</span><span${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            _push2(`</span>`);
          } else {
            return [
              createVNode("span", null, [
                renderSlot(_ctx.$slots, "icon")
              ]),
              createVNode("span", null, [
                renderSlot(_ctx.$slots, "default")
              ])
            ];
          }
        }),
        _: 3
      }), _parent);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/UI/Buttons/Admin/SecondaryButton.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "PrimaryButton",
  __ssrInlineRender: true,
  props: {
    as: {
      type: String,
      default: "button"
      // можна 'button' або 'Link'
    },
    action: {
      type: String
    }
  },
  setup(__props) {
    const props = __props;
    const classes = computed(() => {
      switch (props.action) {
        case "add":
          return "bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700";
        case "save":
          return "bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700";
        case "delete":
          return "bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700";
        default:
          return "bg-slate-700 text-white";
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(__props.as === "Link" ? unref(link_default) : "button"), mergeProps(_ctx.$attrs, {
        class: [classes.value, "inline-flex items-center gap-2 rounded-md px-4 py-1 text-xs font-semibold uppercase tracking-widest text-gray-700 shadow-sm transition duration-150 ease-in-out"]
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "icon", {}, null, _push2, _parent2, _scopeId);
            _push2(`</span><span${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            _push2(`</span>`);
          } else {
            return [
              createVNode("span", null, [
                renderSlot(_ctx.$slots, "icon")
              ]),
              createVNode("span", null, [
                renderSlot(_ctx.$slots, "default")
              ])
            ];
          }
        }),
        _: 3
      }), _parent);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/UI/Buttons/Admin/PrimaryButton.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex space-x-2 relative z-20" }, _attrs))}><!--[-->`);
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
