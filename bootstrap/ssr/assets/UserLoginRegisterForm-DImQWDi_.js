import { computed, ref, unref, withCtx, openBlock, createBlock, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { b as usePage, l as link_default } from "../ssr.js";
import { IconUserFilled, IconUser } from "@tabler/icons-vue";
import { A as AuthModal } from "./AuthModal-BV8YJLyF.js";
const _sfc_main = {
  __name: "UserLoginRegisterForm",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const user = computed(() => page.props.auth.user);
    const isModalOpen = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="flex items-center gap-3">`);
      if (user.value) {
        _push(ssrRenderComponent(unref(link_default), {
          href: _ctx.route("account"),
          class: ["flex items-center duration-150 rounded-lg gap-2", {
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
              _push2(`<span class="text-sm font-semibold tracking-tight group-hover:underline"${_scopeId}>${ssrInterpolate(_ctx.$t("Кабінет"))}</span>`);
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
                createVNode("span", { class: "text-sm font-semibold tracking-tight group-hover:underline" }, toDisplayString(_ctx.$t("Кабінет")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<button class="flex items-center gap-2 duration-150 group">`);
        _push(ssrRenderComponent(unref(IconUser), {
          size: 24,
          stroke: 2
        }, null, _parent));
        _push(`<span class="text-sm font-semibold tracking-tight group-hover:underline">${ssrInterpolate(_ctx.$t("Login"))}</span></button>`);
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
  _sfc_main as _
};
