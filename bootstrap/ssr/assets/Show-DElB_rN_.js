import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$2 } from "./ButtonsGroup-3TWHBcQj.js";
import { _ as _sfc_main$1 } from "./CommerceAdminLayout-DZpOlOrD.js";
import { _ as _sfc_main$3 } from "./VarDump-0gz6Mom3.js";
import "@inertiajs/vue3";
import "@tabler/icons-vue";
import "./AdminLayout-Dz4Fusn0.js";
import "./ApplicationLogo-DsJOFw9w.js";
import "./ImageDataView-C9GsQUU8.js";
import "./UserStatus-DfjMQc-4.js";
import "./Breadcrumbs-Be9A5eey.js";
import "pinia";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ Object.assign({
  layout: _sfc_main$1
}, {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    data: {
      type: Object
    }
  },
  setup(__props) {
    const actionButtons = [];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col space-y-2" }, _attrs))}><section class="flex items-center justify-between pt-4"><span></span>`);
      _push(ssrRenderComponent(_sfc_main$2, { buttons: actionButtons }, null, _parent));
      _push(`</section><section></section>`);
      if (_ctx.$page.props.app.mode === "local") {
        _push(`<section>`);
        _push(ssrRenderComponent(_sfc_main$3, { data: __props.data }, null, _parent));
        _push(`</section>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Commerce/Categories/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
