import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./DashboardAdminLayout-syA0R-Os.js";
import { V as VarDump } from "./VarDump-DqvrPBoK.js";
import "./AdminLayout-BRIf9gc0.js";
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
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./ApplicationLogo-DsJOFw9w.js";
import "./useLocales-V6QHCGCa.js";
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: _sfc_main$1 }, {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    data: { type: Object }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col space-y-4" }, _attrs))}><div class="mt-4">`);
      _push(ssrRenderComponent(VarDump, { data: __props.data }, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Dashboard/Pages/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
