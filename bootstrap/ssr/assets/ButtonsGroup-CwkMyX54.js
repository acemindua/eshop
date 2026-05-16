import { computed, createVNode, resolveDynamicComponent, unref, mergeProps, withCtx, openBlock, createBlock, renderSlot, createCommentVNode, useSSRContext, createSlots, toDisplayString } from "vue";
import { ssrRenderVNode, ssrRenderSlot, ssrRenderAttrs, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { l as link_default } from "../ssr.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import { IconCloudUpload, IconCirclePlus, IconFileImport, IconPlus, IconDeviceFloppy, IconCancel } from "@tabler/icons-vue";
const _sfc_main$2 = {
  __name: "SecondaryButton",
  __ssrInlineRender: true,
  props: {
    as: {
      type: String,
      default: "button"
    },
    action: {
      type: String
      // 'import', 'cancel', 'add'
    }
  },
  setup(__props) {
    const props = __props;
    const actionClasses = computed(() => {
      switch (props.action) {
        case "import":
          return "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900 hover:border-slate-300 shadow-sm";
        case "cancel":
          return "bg-white text-gray-500 border-gray-200 hover:bg-gray-50 hover:text-gray-700";
        case "add":
          return "bg-emerald-50/50 text-emerald-700 border-emerald-100 hover:bg-emerald-50 hover:border-emerald-200";
        default:
          return "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-800 shadow-sm";
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(__props.as === "Link" ? unref(link_default) : "button"), mergeProps(_ctx.$attrs, {
        class: [actionClasses.value, "group inline-flex items-center justify-center gap-2 rounded-lg border px-3.5 py-2 text-[11px] font-bold uppercase tracking-tight transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-100 focus:ring-offset-1 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.97]"]
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (_ctx.$slots.icon) {
              _push2(`<div class="shrink-0 opacity-60 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-[-1px]"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "icon", {}, null, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<span class="leading-none"${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            _push2(`</span>`);
          } else {
            return [
              _ctx.$slots.icon ? (openBlock(), createBlock("div", {
                key: 0,
                class: "shrink-0 opacity-60 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-[-1px]"
              }, [
                renderSlot(_ctx.$slots, "icon")
              ])) : createCommentVNode("", true),
              createVNode("span", { class: "leading-none" }, [
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
    },
    action: {
      type: String
    }
  },
  setup(__props) {
    const props = __props;
    const actionClasses = computed(() => {
      switch (props.action) {
        case "add":
          return "bg-green-50 text-green-700 border-green-200 hover:bg-green-600 hover:text-white hover:border-green-600";
        case "save":
          return "bg-blue-50 text-blue-700 border-blue-200 hover:bg-indigo-600 hover:text-white hover:border-indigo-600";
        case "delete":
          return "bg-red-50 text-red-700 border-red-200 hover:bg-red-600 hover:text-white hover:border-red-600";
        case "cancel":
          return "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100 hover:text-gray-800";
        default:
          return "bg-white text-gray-700 border-gray-300 hover:bg-gray-50";
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(__props.as === "Link" ? unref(link_default) : "button"), mergeProps(_ctx.$attrs, {
        class: [actionClasses.value, "inline-flex items-center justify-center gap-1.5 rounded-lg border px-3 py-1.5 text-[11px] font-bold uppercase tracking-tight shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed"]
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (_ctx.$slots.icon) {
              _push2(`<div class="shrink-0 opacity-90 transition-transform group-hover:scale-110" data-v-571401f7${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "icon", {}, null, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<span class="leading-none" data-v-571401f7${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            _push2(`</span>`);
          } else {
            return [
              _ctx.$slots.icon ? (openBlock(), createBlock("div", {
                key: 0,
                class: "shrink-0 opacity-90 transition-transform group-hover:scale-110"
              }, [
                renderSlot(_ctx.$slots, "icon", {}, void 0, true)
              ])) : createCommentVNode("", true),
              createVNode("span", { class: "leading-none" }, [
                renderSlot(_ctx.$slots, "default", {}, void 0, true)
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
const PrimaryButton = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-571401f7"]]);
const _sfc_main = {
  __name: "ButtonsGroup",
  __ssrInlineRender: true,
  props: {
    loading: { type: Boolean, default: false },
    buttons: {
      type: Array,
      required: true
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center gap-1.5 relative z-20" }, _attrs))} data-v-ad52ec78><!--[-->`);
      ssrRenderList(__props.buttons, (btn, index) => {
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(btn.type === "primary" ? PrimaryButton : _sfc_main$2), mergeProps({ ref_for: true }, btn.extraProps, {
          disabled: __props.loading || btn.disabled,
          action: btn.actionName || (btn.type === "primary" ? "save" : "cancel"),
          class: "!px-3 !py-1.5 sm:!px-4 sm:!py-2 transition-all duration-200 group relative overflow-hidden active:scale-95 shadow-sm hover:shadow-md",
          onClick: ($event) => !__props.loading && !btn.disabled && btn.action()
        }), createSlots({
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="text-[12px] sm:text-sm font-bold tracking-tight whitespace-nowrap" data-v-ad52ec78${_scopeId}>${ssrInterpolate(__props.loading && btn.loadingLabel ? _ctx.$t(btn.loadingLabel) : _ctx.$t(btn.label))}</span>`);
              if (btn.type === "primary") {
                _push2(`<div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] pointer-events-none" data-v-ad52ec78${_scopeId}></div>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                createVNode("span", { class: "text-[12px] sm:text-sm font-bold tracking-tight whitespace-nowrap" }, toDisplayString(__props.loading && btn.loadingLabel ? _ctx.$t(btn.loadingLabel) : _ctx.$t(btn.label)), 1),
                btn.type === "primary" ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] pointer-events-none"
                })) : createCommentVNode("", true)
              ];
            }
          }),
          _: 2
        }, [
          btn.icon && iconMap[btn.icon] ? {
            name: "icon",
            fn: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(iconMap[btn.icon]), {
                  size: 16,
                  stroke: 2.5,
                  class: ["shrink-0 transition-transform group-hover:rotate-12", {
                    "animate-spin": __props.loading && btn.type === "primary" && !btn.loadingLabel
                  }]
                }, null), _parent2, _scopeId);
              } else {
                return [
                  (openBlock(), createBlock(resolveDynamicComponent(iconMap[btn.icon]), {
                    size: 16,
                    stroke: 2.5,
                    class: ["shrink-0 transition-transform group-hover:rotate-12", {
                      "animate-spin": __props.loading && btn.type === "primary" && !btn.loadingLabel
                    }]
                  }, null, 8, ["class"]))
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
const ButtonsGroup = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ad52ec78"]]);
export {
  ButtonsGroup as B
};
