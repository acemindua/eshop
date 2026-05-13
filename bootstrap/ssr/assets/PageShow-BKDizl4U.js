import { computed, resolveComponent, withCtx, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./IndexLayout-Coe3rUqT.js";
import { _ as _sfc_main$2 } from "./VarDump-0gz6Mom3.js";
import "../ssr.js";
import "@vue/shared";
import "@vue/compiler-ssr";
import "node:stream";
import "@inertiajs/core";
import "lodash-es";
import "laravel-precognition";
import "@inertiajs/core/server";
import "pinia";
import "@floating-ui/dom";
import "./Breadcrumbs-DA__G0nP.js";
import "@tabler/icons-vue";
import "./ApplicationLogo-DsJOFw9w.js";
import "./useApiResourceService-BibiLDfj.js";
import "axios";
import "./UserLoginRegisterForm--fvTPzxL.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./AuthModal-yb31sphO.js";
import "./TextInput-Dmmb8A31.js";
import "./InputError-Cp3nFeNd.js";
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: _sfc_main$1 }, {
  __name: "PageShow",
  __ssrInlineRender: true,
  props: {
    data: { type: Object }
  },
  setup(__props) {
    const props = __props;
    const page = computed(() => props.data?.page?.data || {});
    const displayTitle = computed(() => page.value.title || "Сторінка");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Head = resolveComponent("Head");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_Head, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>${ssrInterpolate(displayTitle.value)}</title>`);
          } else {
            return [
              createVNode("title", null, toDisplayString(displayTitle.value), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex flex-col space-y-2"><h1 class="text-xl text-gray-800 font-semibold">${ssrInterpolate(displayTitle.value)}</h1><section>`);
      _push(ssrRenderComponent(_sfc_main$2, { data: __props.data }, null, _parent));
      _push(`</section></div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/PageShow.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
