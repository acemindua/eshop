import { ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./DashboardAdminLayout-Cj3mKmf9.js";
import _sfc_main$2 from "./MenuForm-DbEwyjzP.js";
import { useSSRContext } from "vue";
import "./AdminLayout-BnllGgH-.js";
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
import "./Breadcrumbs-BaC6CclY.js";
import "@tabler/icons-vue";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./ApplicationLogo-ClfPV3Yy.js";
import "./VarDump-DqvrPBoK.js";
import "./StickyActions-DFSqE-gR.js";
import "./ButtonsGroup-sb8icSMB.js";
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: _sfc_main$1 }, {
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    data: { type: Object },
    routePrefix: { type: String, default: () => null },
    isEditing: { type: Boolean, default: false },
    errors: { type: Object, default: () => ({}) }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><pre>        ${ssrInterpolate(props.data)}
    </pre>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        data: props.data || {},
        "route-prefix": props.routePrefix,
        "is-editing": props.isEditing,
        errors: props.errors
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Core/Menus/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
