import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./SettingsAdminLayout-i57CBaNN.js";
import _sfc_main$2 from "./WarehouseForm-D5xMjxyY.js";
import { useSSRContext } from "vue";
import "./AdminLayout-BfL4O4kV.js";
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
import "./ApplicationLogo-DsJOFw9w.js";
import "./VarDump-DqvrPBoK.js";
import "./StickyActions-DpLo9yCg.js";
import "./ButtonsGroup-sb8icSMB.js";
import "./TextInput-D87biKav.js";
import "./InputError-Cp3nFeNd.js";
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: _sfc_main$1 }, {
  __name: "Create",
  __ssrInlineRender: true,
  props: { data: { type: Object } },
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
