import { computed, resolveComponent, unref, withCtx, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import "./ImageDataView-C9GsQUU8.js";
import { _ as _sfc_main$1 } from "./IndexLayout-CRgSoFyy.js";
import { IconUserScan, IconLogout } from "@tabler/icons-vue";
import "./VarDump-0gz6Mom3.js";
import "@inertiajs/vue3";
import "./Breadcrumbs-Be9A5eey.js";
import "./ApplicationLogo-DsJOFw9w.js";
import "pinia";
import "./useApiResourceService-BibiLDfj.js";
import "axios";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./UserLoginRegisterForm-tpsqiF-p.js";
import "./TextInput-C-4bWHj0.js";
const _sfc_main = /* @__PURE__ */ Object.assign({
  layout: _sfc_main$1
}, {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    data: Object,
    filters: Object
  },
  setup(__props) {
    const props = __props;
    const user = computed(() => props.data?.user || {});
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      _push(`<section${ssrRenderAttrs(_attrs)}><div class="bg-white flex flex-col divide-y rounded"><div class="flex gap-4 items-center p-4 md:p-6"><div class="bg-gray-200 rounded-full w-[100px] h-[100px] p-1 flex items-center justify-center shadow-md">`);
      if (user.value?.avatar) {
        _push(`<div class="bg-brand w-full h-full rounded-full flex items-center justify-center text-white" style="${ssrRenderStyle({
          backgroundImage: `url('${user.value?.avatar}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        })}"></div>`);
      } else {
        _push(`<div class="bg-brand w-full h-full rounded-full flex items-center justify-center text-white">`);
        _push(ssrRenderComponent(unref(IconUserScan), {
          stroke: 1,
          size: 40
        }, null, _parent));
        _push(`</div>`);
      }
      _push(`</div><div class="p-4 text-sm"><div class="pb-4"><span class="font-semibold text-xl">${ssrInterpolate(user.value.name)}</span></div>`);
      if (user.value.phone) {
        _push(`<div><small class="text-gray-500 text-xs">${ssrInterpolate(_ctx.$t("phone number"))}</small><p>${ssrInterpolate(user.value.phone)}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      if (user.value.email) {
        _push(`<div><small class="text-gray-500 text-xs">${ssrInterpolate(_ctx.$t("Email"))}</small><p>${ssrInterpolate(user.value.email)}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="p-4 md:p-6"><ul class="flex flex-col divide-y"><li class="flex">`);
      _push(ssrRenderComponent(_component_Link, {
        href: "/logout",
        method: "post",
        as: "button",
        class: "flex items-center justify-end gap-2 w-full"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(IconLogout), { stroke: 2 }, null, _parent2, _scopeId));
            _push2(`<span${_scopeId}>${ssrInterpolate(_ctx.$t("Logout"))}</span>`);
          } else {
            return [
              createVNode(unref(IconLogout), { stroke: 2 }),
              createVNode("span", null, toDisplayString(_ctx.$t("Logout")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul></div></div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/Account/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
