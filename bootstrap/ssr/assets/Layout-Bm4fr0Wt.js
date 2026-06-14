import { ref, onMounted, onUnmounted, resolveComponent, mergeProps, withCtx, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderSlot, ssrRenderTeleport } from "vue/server-renderer";
import { A as ApplicationLogo } from "./ApplicationLogo-CSNe_4RD.js";
import { _ as _sfc_main$4 } from "./Breadcrumbs-DKsddhuk.js";
import { C as CartButton } from "./CartButton-i1aDL68u.js";
import { _ as _sfc_main$3 } from "./LangSwitcher-BpdYRBp1.js";
import { _ as _sfc_main$1, S as SerchContainer } from "./SearchInput-DwQ5a4PI.js";
import { _ as _sfc_main$2 } from "./UserLoginRegisterForm-DImQWDi_.js";
import "../ssr.js";
import { router } from "@inertiajs/core";
const _sfc_main = {
  __name: "Layout",
  __ssrInlineRender: true,
  setup(__props) {
    const catalogMenu = ref(false);
    ref(false);
    const inputFocus = ref(false);
    const hadleFocus = () => {
      inputFocus.value = true;
      catalogMenu.value = false;
    };
    const closeAll = () => {
      catalogMenu.value = false;
      inputFocus.value = false;
    };
    const handleEsc = (e) => {
      if (e.key === "Escape") closeAll();
    };
    onMounted(() => window.addEventListener("keydown", handleEsc));
    onUnmounted(() => window.removeEventListener("keydown", handleEsc));
    const goSearch = (e) => {
      closeAll();
      router.get(
        route("search"),
        { q: e },
        // Передаємо чистий рядок
        {
          preserveState: true
        }
      );
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col w-full min-h-screen bg-gray-200 text-sm gap-2" }, _attrs))}><div></div><header class="bg-white p-4"><div class="w-full mx-auto"><nav class="inline-flex gap-4 justify-between items-center w-full px-4">`);
      _push(ssrRenderComponent(_component_Link, {
        href: "/",
        class: "flex items-center gap-2 shrink-0 group md:pr-12",
        onClick: closeAll
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class=""${_scopeId}>`);
            _push2(ssrRenderComponent(ApplicationLogo, { class: "w-10 h-10 bg-brand fill-current" }, null, _parent2, _scopeId));
            _push2(`</div><span class="font-semibold hidden md:block"${_scopeId}>${ssrInterpolate(_ctx.$page.props?.app?.name)}</span>`);
          } else {
            return [
              createVNode("div", { class: "" }, [
                createVNode(ApplicationLogo, { class: "w-10 h-10 bg-brand fill-current" })
              ]),
              createVNode("span", { class: "font-semibold hidden md:block" }, toDisplayString(_ctx.$page.props?.app?.name), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="md:relative z-[60] flex flex-col flex-grow max-w-xl">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        onFocus: hadleFocus,
        onSearch: ($event) => goSearch($event)
      }, null, _parent));
      if (inputFocus.value) {
        _push(`<div>`);
        _push(ssrRenderComponent(SerchContainer, {
          locale: _ctx.locale,
          onClose: closeAll
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="hidden md:flex items-center gap-4">`);
      _push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
      _push(ssrRenderComponent(CartButton, null, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, null, null, _parent));
      _push(`</div></nav></div></header><div class="bg-white p-4">`);
      _push(ssrRenderComponent(_sfc_main$4, null, null, _parent));
      _push(`</div><main class="flex-grow px-2"><div class="w-full mx-auto">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></main><footer class="bg-white p-4"><div class="w-full mx-auto">#footer (Copyright/Info)</div></footer>`);
      ssrRenderTeleport(_push, (_push2) => {
        if (catalogMenu.value || inputFocus.value) {
          _push2(`<div class="fixed inset-0 bg-black/10 z-[10]"></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/Public/Landing/Layout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
