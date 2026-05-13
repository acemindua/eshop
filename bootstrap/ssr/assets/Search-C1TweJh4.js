import { resolveComponent, withCtx, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./IndexLayout-BP-mB4oQ.js";
import "./VarDump-0gz6Mom3.js";
import "@inertiajs/vue3";
import "./Breadcrumbs-Be9A5eey.js";
import "@tabler/icons-vue";
import "./ApplicationLogo-DsJOFw9w.js";
import "pinia";
import "./useApiResourceService-BibiLDfj.js";
import "axios";
import "./UserLoginRegisterForm-Du26CjDe.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./AuthModal-BWQinqw9.js";
import "./TextInput-Dmmb8A31.js";
import "./InputError-Cp3nFeNd.js";
const _sfc_main = /* @__PURE__ */ Object.assign({
  layout: _sfc_main$1
}, {
  __name: "Search",
  __ssrInlineRender: true,
  props: {
    filters: Object
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Head = resolveComponent("Head");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_Head, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>Результати пошуку для: ${ssrInterpolate(__props.filters.q)}</title>`);
          } else {
            return [
              createVNode("title", null, "Результати пошуку для: " + toDisplayString(__props.filters.q), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<h2 class="font-semibold text-xl">По запиту «${ssrInterpolate(__props.filters.q)}» знайшлося</h2><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/Search.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
