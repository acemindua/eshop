import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./SettingsAdminLayout-DbXCnn_e.js";
import _sfc_main$2 from "./WarehouseForm-DtqIL-vL.js";
import { useSSRContext } from "vue";
import "./AdminLayout-RqDMSvDq.js";
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
import "./Breadcrumbs-DKsddhuk.js";
import "@tabler/icons-vue";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./ApplicationLogo-CSNe_4RD.js";
import "./VarDump-DqvrPBoK.js";
import "./StickyActions-DFSqE-gR.js";
import "./ButtonsGroup-sb8icSMB.js";
import "./TextInput-D87biKav.js";
import "./InputError-Cp3nFeNd.js";
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: _sfc_main$1 }, {
  __name: "Create",
  __ssrInlineRender: true,
  props: {
    data: { type: Object },
    routePrefix: { type: String, default: () => null },
    isEditing: { type: Boolean, default: false },
    errors: { type: Object, default: () => ({}) }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        "is-editing": false,
        data: __props.data.warehouse?.data || __props.data.warehouse || {},
        "route-prefix": "admin.settings.commerce.warehouses"
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Commerce/Settings/Warehouses/Create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
