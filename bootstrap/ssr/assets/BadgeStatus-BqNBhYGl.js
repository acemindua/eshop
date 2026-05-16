import { computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
const _sfc_main = {
  __name: "BadgeStatus",
  __ssrInlineRender: true,
  props: {
    active: [Number, Boolean]
  },
  setup(__props) {
    const props = __props;
    const classes = computed(
      () => props.active ? "bg-green-50 border-green-200 text-green-600" : "bg-slate-50 border-slate-200 text-slate-600"
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["inline-block px-4 border rounded-lg text-center text-xs py-1", classes.value]
      }, _attrs))}>`);
      if (__props.active) {
        _push(`<span> Active </span>`);
      } else {
        _push(`<span> Disabled </span>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/UI/Badge/BadgeStatus.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
