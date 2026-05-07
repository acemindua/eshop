import { resolveComponent, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./DashboardAdminLayout-B-5lGPVL.js";
import "./AdminLayout-Dz4Fusn0.js";
import "@inertiajs/vue3";
import "@tabler/icons-vue";
import "./ApplicationLogo-DsJOFw9w.js";
import "./ImageDataView-C9GsQUU8.js";
import "./UserStatus-DfjMQc-4.js";
import "./Breadcrumbs-Be9A5eey.js";
import "pinia";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./useLocales-Cm2D8rND.js";
const _sfc_main = /* @__PURE__ */ Object.assign({
  layout: _sfc_main$1
}, {
  __name: "Dashboard",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Head = resolveComponent("Head");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_Head, { title: `Dashboard` }, null, _parent));
      _push(`<section><div class="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4"><div class="bg-white border rounded-lg p-4"><div class="uppercase text-gray-500 text-xs">Total users</div></div><div class="bg-white border rounded-lg p-4"><div class="uppercase text-gray-500 text-xs">Total items</div></div></div></section><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
