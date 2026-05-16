import { computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import { I as ImageDataView } from "./ImageDataView-BKXTMjoO.js";
import { _ as _sfc_main$1 } from "./DashboardAdminLayout-syA0R-Os.js";
import { V as VarDump } from "./VarDump-DqvrPBoK.js";
import "@tabler/icons-vue";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
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
import "./ApplicationLogo-DsJOFw9w.js";
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
      _push(ssrRenderComponent(ImageDataView, {
        src: user.value?.avatar,
        configs: { width: "100px", height: "100px" }
      }, null, _parent));
      _push(`<p class="font-semibold text-xl mt-6">${ssrInterpolate(user.value.name)}</p><p><a${ssrRenderAttr("href", `mailto:${user.value.email}`)} class="text-gray-500 text-sm">${ssrInterpolate(user.value.email)}</a></p></section><section>`);
      _push(ssrRenderComponent(VarDump, { data: __props.data }, null, _parent));
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
