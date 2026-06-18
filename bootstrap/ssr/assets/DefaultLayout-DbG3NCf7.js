import { computed, unref, withCtx, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderSlot } from "vue/server-renderer";
import { b as usePage, h as head_default, l as link_default } from "../ssr.js";
import { _ as _sfc_main$1 } from "./LangSwitcher-e9tQy0N1.js";
import { A as ApplicationLogo } from "./ApplicationLogo-CSNe_4RD.js";
import { C as CartButton } from "./CartButton-CHDIERBZ.js";
import { V as VarDump } from "./VarDump-DqvrPBoK.js";
import { _ as _sfc_main$2 } from "./UserLoginRegisterForm-CQ1J7Gli.js";
import { _ as _sfc_main$3 } from "./Breadcrumbs-DKsddhuk.js";
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
    const isHomePage = computed(() => {
      const url = page.url;
      return /^\/(?:[a-z]{2}\/?)?$/.test(url);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(head_default), {
        title: unref(page).props.app?.name ? `${title.value} - ${unref(page).props.app.name}` : title.value
      }, null, _parent));
      _push(`<div class="flex flex-col min-h-screen bg-white"><div class="bg-white border-b border-gray-100"><nav class="container mx-auto px-4 border-x py-2" aria-label="Utility navigation">`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`</nav></div><header class="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm"><div class="container mx-auto px-4 border-x"><div class="flex items-center justify-between py-3"><div class="flex items-center gap-2">`);
      _push(ssrRenderComponent(unref(link_default), {
        href: "/",
        class: "flex items-center gap-2 group outline-none"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(ApplicationLogo, { class: "w-10 h-10 bg-brand fill-current transition-transform group-hover:scale-105" }, null, _parent2, _scopeId));
            _push2(`<span class="hidden md:block text-lg font-bold text-gray-800"${_scopeId}>${ssrInterpolate(unref(page).props.app?.name)}</span>`);
          } else {
            return [
              createVNode(ApplicationLogo, { class: "w-10 h-10 bg-brand fill-current transition-transform group-hover:scale-105" }),
              createVNode("span", { class: "hidden md:block text-lg font-bold text-gray-800" }, toDisplayString(unref(page).props.app?.name), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex items-center gap-4">`);
      _push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
      _push(ssrRenderComponent(CartButton, null, null, _parent));
      _push(`</div></div></div></header><main class="flex-grow container mx-auto px-4 border-x bg-white"><div class="flex flex-col pb-8">`);
      if (!isHomePage.value && unref(page).props?.breadcrumbs?.length) {
        _push(`<nav class="py-4" aria-label="Breadcrumb">`);
        _push(ssrRenderComponent(_sfc_main$3, null, null, _parent));
        _push(`</nav>`);
      } else {
        _push(`<!---->`);
      }
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></main>`);
      if (unref(page).props.app?.mode === "local") {
        _push(`<section class="container mx-auto px-4 py-8 border-x bg-gray-50">`);
        _push(ssrRenderComponent(VarDump, { data: _ctx.$page }, null, _parent));
        _push(`</section>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<footer class="py-8 border-t border-gray-200 bg-gray-50"><div class="container mx-auto px-4"><div class="flex flex-col sm:flex-row items-center justify-between gap-4">`);
      _push(ssrRenderComponent(unref(link_default), {
        href: "/",
        class: "outline-none"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(ApplicationLogo, { class: "w-8 h-8 bg-brand fill-current" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(ApplicationLogo, { class: "w-8 h-8 bg-brand fill-current" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<p class="text-sm text-gray-500"> © ${ssrInterpolate(unref(currentYear))} ${ssrInterpolate(unref(page).props.app?.name)}. ${ssrInterpolate(_ctx.$t("All rights reserved."))}</p></div></div></footer></div><!--]-->`);
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
