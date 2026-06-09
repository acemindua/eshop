import { computed, unref, withCtx, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderSlot } from "vue/server-renderer";
import { c as usePage, h as head_default, l as link_default } from "../ssr.js";
import { _ as _sfc_main$2 } from "./LangSwitcher-Dqdc_lAc.js";
import { A as ApplicationLogo } from "./ApplicationLogo-CSNe_4RD.js";
import { _ as _sfc_main$1 } from "./CartButton-DpDFDzWc.js";
import { V as VarDump } from "./VarDump-DqvrPBoK.js";
import "./PopularProducts-CbbjliLD.js";
const _sfc_main = {
  __name: "DefaultLayout",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const title = computed(() => {
      const breadcrumbs = page.props.breadcrumbs;
      return breadcrumbs?.length ? breadcrumbs[breadcrumbs.length - 1]?.title ?? "Home" : "Home";
    });
    const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(head_default), {
        title: unref(page).props.app?.name ? `${title.value} - ${unref(page).props.app.name}` : title.value
      }, null, _parent));
      _push(`<div class="bg-white w-full min-h-screen flex flex-col justify-between"><div><header class="py-2 border-b border-gray-100"><div class="container mx-auto px-4"><div class="flex items-center justify-between">`);
      _push(ssrRenderComponent(unref(link_default), {
        href: "/",
        class: "flex items-center gap-2 group"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(ApplicationLogo, { class: "w-10 h-10 bg-brand fill-current transition-transform" }, null, _parent2, _scopeId));
            _push2(`<span class="text-lg font-bold uppercase text-gray-800"${_scopeId}>${ssrInterpolate(unref(page).props.app?.name)}</span>`);
          } else {
            return [
              createVNode(ApplicationLogo, { class: "w-10 h-10 bg-brand fill-current transition-transform" }),
              createVNode("span", { class: "text-lg font-bold uppercase text-gray-800" }, toDisplayString(unref(page).props.app?.name), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex items-center gap-3">`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
      _push(`</div></div></div></header><main class="container mx-auto px-4 py-6"><div>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></main></div>`);
      if (unref(page).props.app?.mode === "local") {
        _push(`<div class="container mx-auto px-4 my-4 opacity-70">`);
        _push(ssrRenderComponent(VarDump, { data: _ctx.$page }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<footer class="py-6 border-t border-gray-200 bg-gray-50 mt-auto"><div class="container mx-auto px-4"><div class="flex flex-col sm:flex-row items-center justify-between gap-4">`);
      _push(ssrRenderComponent(unref(link_default), {
        href: "/",
        class: "flex items-center gap-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(ApplicationLogo, { class: "w-8 h-8 bg-brand fill-current" }, null, _parent2, _scopeId));
            _push2(`<span class="text-lg font-bold uppercase text-gray-750"${_scopeId}>${ssrInterpolate(unref(page).props.app?.name)}</span>`);
          } else {
            return [
              createVNode(ApplicationLogo, { class: "w-8 h-8 bg-brand fill-current" }),
              createVNode("span", { class: "text-lg font-bold uppercase text-gray-750" }, toDisplayString(unref(page).props.app?.name), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="text-sm text-gray-500"> © ${ssrInterpolate(unref(currentYear))} ${ssrInterpolate(unref(page).props.app?.name)}. All rights reserved. </div></div></div></footer></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/Public/DefaultLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
