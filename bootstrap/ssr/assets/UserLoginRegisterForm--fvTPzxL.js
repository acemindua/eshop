import { mergeProps, useSSRContext, ref, unref, computed, resolveComponent, withCtx, openBlock, createBlock, createVNode, toDisplayString } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import { IconSearch, IconUserFilled, IconUser } from "@tabler/icons-vue";
import { u as usePage } from "../ssr.js";
import { A as AuthModal } from "./AuthModal-yb31sphO.js";
const _sfc_main$2 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "absolute left-0 top-full w-full p-2 md:px-0" }, _attrs))}><div class="bg-white p-5 shadow rounded-lg"></div></div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Public/SerchContainer.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const SerchContainer = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$1 = {
  __name: "SearchInput",
  __ssrInlineRender: true,
  emits: ["search", "focus"],
  setup(__props, { emit: __emit }) {
    const query = ref(usePage().props?.filters?.q || "");
    const focusInput = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<form${ssrRenderAttrs(mergeProps({ class: "group relative flex w-full items-stretch rounded-lg border-2 border-brand transition-colors focus-within:border-brand-dark overflow-hidden" }, _attrs))}><div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">`);
      _push(ssrRenderComponent(unref(IconSearch), {
        stroke: 1.5,
        size: "20",
        class: ["transition-colors", focusInput.value ? "text-brand" : "text-gray-400"]
      }, null, _parent));
      _push(`</div><input${ssrRenderAttr("value", query.value)} type="search" name="search" autocomplete="off" class="block w-full pl-10 pr-3 py-2 border-0 focus:ring-0 placeholder:text-gray-400 text-sm" aria-label="Search"${ssrRenderAttr("placeholder", `${_ctx.$t("Search")} ...`)}><button type="submit" class="bg-brand hover:bg-brand-dark transition-colors duration-150 text-white px-6 flex items-center justify-center"><span class="hidden md:inline font-semibold text-sm">${ssrInterpolate(_ctx.$t("Знайти"))}</span>`);
      _push(ssrRenderComponent(unref(IconSearch), {
        size: 18,
        class: "md:hidden"
      }, null, _parent));
      _push(`</button></form>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Public/UI/SearchInput.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "UserLoginRegisterForm",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const user = computed(() => page.props.auth.user);
    const isModalOpen = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      _push(`<!--[--><div class="flex items-center gap-3">`);
      if (user.value) {
        _push(ssrRenderComponent(_component_Link, {
          href: _ctx.route("account"),
          class: ["flex flex-col items-center hover:text-brand duration-150 rounded-lg", {
            "text-brand md:text-gray-800": _ctx.$page.url.startsWith("/account")
          }]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (_ctx.$page.url.startsWith("/account")) {
                _push2(ssrRenderComponent(unref(IconUserFilled), {
                  size: 24,
                  stroke: 2
                }, null, _parent2, _scopeId));
              } else {
                _push2(ssrRenderComponent(unref(IconUser), {
                  size: 24,
                  stroke: 2
                }, null, _parent2, _scopeId));
              }
              _push2(`<span class="text-xs font-semibold md:font-normal tracking-tight"${_scopeId}>${ssrInterpolate(_ctx.$t("Кабінет"))}</span>`);
            } else {
              return [
                _ctx.$page.url.startsWith("/account") ? (openBlock(), createBlock(unref(IconUserFilled), {
                  key: 0,
                  size: 24,
                  stroke: 2
                })) : (openBlock(), createBlock(unref(IconUser), {
                  key: 1,
                  size: 24,
                  stroke: 2
                })),
                createVNode("span", { class: "text-xs font-semibold md:font-normal tracking-tight" }, toDisplayString(_ctx.$t("Кабінет")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<button class="flex flex-col items-center hover:text-brand duration-150">`);
        _push(ssrRenderComponent(unref(IconUser), {
          size: 24,
          stroke: 2
        }, null, _parent));
        _push(`<span class="text-xs font-semibold md:font-normal tracking-tight">${ssrInterpolate(_ctx.$t("Увійти"))}</span></button>`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(AuthModal, {
        isOpen: isModalOpen.value,
        onClose: ($event) => isModalOpen.value = false
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Public/UserLoginRegisterForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  SerchContainer as S,
  _sfc_main$1 as _,
  _sfc_main as a
};
