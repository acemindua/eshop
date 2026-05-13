import { computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import { _ as _sfc_main$2 } from "./ImageDataView-C9GsQUU8.js";
import { _ as _sfc_main$1 } from "./DashboardAdminLayout-CELgektc.js";
import { _ as _sfc_main$3 } from "./VarDump-0gz6Mom3.js";
import "@tabler/icons-vue";
import "./AdminLayout-DtLa9qLf.js";
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
import "./ApplicationLogo-DsJOFw9w.js";
import "./UserStatus-DfjMQc-4.js";
import "./Breadcrumbs-DA__G0nP.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./useLocales-V6QHCGCa.js";
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
    const props = __props;
    const user = computed(() => props.data.user || {});
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col space-y-2 w-full py-4" }, _attrs))}><section class="flex flex-col items-center justify-center">`);
      _push(ssrRenderComponent(_sfc_main$2, {
        src: user.value?.avatar,
        configs: { width: "100px", height: "100px" }
      }, null, _parent));
      _push(`<p class="font-semibold text-xl mt-6">${ssrInterpolate(user.value.name)}</p><p><a${ssrRenderAttr("href", `mailto:${user.value.email}`)} class="text-gray-500 text-sm">${ssrInterpolate(user.value.email)}</a></p></section><section>`);
      _push(ssrRenderComponent(_sfc_main$3, { data: __props.data }, null, _parent));
      _push(`</section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Users/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
