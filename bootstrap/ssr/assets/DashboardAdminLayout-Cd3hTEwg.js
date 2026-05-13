import { ref, computed, resolveComponent, mergeProps, withCtx, createVNode, renderSlot, createTextVNode, toDisplayString, resolveDynamicComponent, unref, openBlock, createBlock, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderSlot, ssrRenderAttr, ssrInterpolate, ssrRenderVNode } from "vue/server-renderer";
import { A as AdminLayout, _ as _sfc_main$1 } from "./AdminLayout-CSqVhC-F.js";
import { IconUserFilled, IconUser, IconClipboardFilled, IconClipboard } from "@tabler/icons-vue";
import { usePage } from "@inertiajs/vue3";
import { u as useLocales } from "./useLocales-Cm2D8rND.js";
const _sfc_main = {
  __name: "DashboardAdminLayout",
  __ssrInlineRender: true,
  setup(__props) {
    const isSidebarVisible = ref(true);
    const { state } = useLocales();
    const page = usePage();
    const auth_user = computed(() => page.props?.auth?.user?.data || []);
    const userFlag = computed(() => {
      if (!auth_user.value) return "gb";
      const userLocale = auth_user.value.locale;
      if (state.mapping[userLocale]) {
        return state.mapping[userLocale];
      }
      const supported = state.locales[userLocale];
      if (supported && supported.regional) {
        return supported.regional.split("_")[1].toLowerCase();
      }
      return userLocale;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_flag = resolveComponent("flag");
      _push(ssrRenderComponent(AdminLayout, mergeProps({
        isSidebarVisible: isSidebarVisible.value,
        "onUpdate:isSidebarVisible": ($event) => isSidebarVisible.value = $event
      }, _attrs), {
        sidenav: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="w-full h-14 border-b flex items-center p-4"${_scopeId}><h4 class="uppercase text-[12px] tracking-widest font-bold text-gray-500"${_scopeId}><span${_scopeId}>Dashboard</span></h4></div><ul class="flex flex-col w-full border-b divide-y"${_scopeId}>`);
            if (auth_user.value) {
              _push2(`<li class="mb-2"${_scopeId}><div class="m-4 flex flex-col gap-2 items-center justify-center text-xs"${_scopeId}><div class="relative flex items-center justify-center"${_scopeId}><img${ssrRenderAttr(
                "src",
                auth_user.value.avatar || "/images/default-avatar.png"
              )}${ssrRenderAttr("alt", auth_user.value.full_name)} class="rounded-xl w-14 h-14 object-cover border border-gray-100 shadow-sm"${_scopeId}><div class="absolute -top-1 -right-1 border-0 rounded-full w-5 h-5 flex items-center justify-center bg-white"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_flag, {
                iso: userFlag.value,
                title: auth_user.value.locale,
                class: "rounded-full"
              }, null, _parent2, _scopeId));
              _push2(`</div></div><p class="font-semibold"${_scopeId}>${ssrInterpolate(auth_user.value.full_name)}</p><p class="flex items-center justify-center bg-gray-600 rounded-full h-5 px-2 relative"${_scopeId}><span class="text-xs text-gray-50 -top-[2px] relative"${_scopeId}>${ssrInterpolate(auth_user.value.role)}</span></p><p class="text-gray-400 truncate w-full text-center"${_scopeId}>${ssrInterpolate(auth_user.value.email)}</p></div></li>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_sfc_main$1, {
              href: _ctx.route("admin.users.index"),
              active: _ctx.$page.url.startsWith("/users"),
              "show-text": isSidebarVisible.value
            }, {
              icon: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  ssrRenderVNode(_push3, createVNode(resolveDynamicComponent(
                    _ctx.$page.url.startsWith("/users") ? unref(IconUserFilled) : unref(IconUser)
                  ), {
                    stroke: "1",
                    class: "w-5 h-5"
                  }, null), _parent3, _scopeId2);
                } else {
                  return [
                    (openBlock(), createBlock(resolveDynamicComponent(
                      _ctx.$page.url.startsWith("/users") ? unref(IconUserFilled) : unref(IconUser)
                    ), {
                      stroke: "1",
                      class: "w-5 h-5"
                    }))
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` ${ssrInterpolate(_ctx.$t("Users"))}`);
                } else {
                  return [
                    createTextVNode(" " + toDisplayString(_ctx.$t("Users")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1, {
              href: _ctx.route("admin.pages.index"),
              active: _ctx.$page.url.startsWith("/pages"),
              "show-text": isSidebarVisible.value
            }, {
              icon: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  ssrRenderVNode(_push3, createVNode(resolveDynamicComponent(
                    _ctx.$page.url.startsWith("/pages") ? unref(IconClipboardFilled) : unref(IconClipboard)
                  ), {
                    stroke: "1",
                    class: "w-5 h-5"
                  }, null), _parent3, _scopeId2);
                } else {
                  return [
                    (openBlock(), createBlock(resolveDynamicComponent(
                      _ctx.$page.url.startsWith("/pages") ? unref(IconClipboardFilled) : unref(IconClipboard)
                    ), {
                      stroke: "1",
                      class: "w-5 h-5"
                    }))
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` ${ssrInterpolate(_ctx.$t("Pages"))}`);
                } else {
                  return [
                    createTextVNode(" " + toDisplayString(_ctx.$t("Pages")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</ul>`);
          } else {
            return [
              createVNode("div", { class: "w-full h-14 border-b flex items-center p-4" }, [
                createVNode("h4", { class: "uppercase text-[12px] tracking-widest font-bold text-gray-500" }, [
                  createVNode("span", null, "Dashboard")
                ])
              ]),
              createVNode("ul", { class: "flex flex-col w-full border-b divide-y" }, [
                auth_user.value ? (openBlock(), createBlock("li", {
                  key: 0,
                  class: "mb-2"
                }, [
                  createVNode("div", { class: "m-4 flex flex-col gap-2 items-center justify-center text-xs" }, [
                    createVNode("div", { class: "relative flex items-center justify-center" }, [
                      createVNode("img", {
                        src: auth_user.value.avatar || "/images/default-avatar.png",
                        alt: auth_user.value.full_name,
                        class: "rounded-xl w-14 h-14 object-cover border border-gray-100 shadow-sm"
                      }, null, 8, ["src", "alt"]),
                      createVNode("div", { class: "absolute -top-1 -right-1 border-0 rounded-full w-5 h-5 flex items-center justify-center bg-white" }, [
                        createVNode(_component_flag, {
                          iso: userFlag.value,
                          title: auth_user.value.locale,
                          class: "rounded-full"
                        }, null, 8, ["iso", "title"])
                      ])
                    ]),
                    createVNode("p", { class: "font-semibold" }, toDisplayString(auth_user.value.full_name), 1),
                    createVNode("p", { class: "flex items-center justify-center bg-gray-600 rounded-full h-5 px-2 relative" }, [
                      createVNode("span", { class: "text-xs text-gray-50 -top-[2px] relative" }, toDisplayString(auth_user.value.role), 1)
                    ]),
                    createVNode("p", { class: "text-gray-400 truncate w-full text-center" }, toDisplayString(auth_user.value.email), 1)
                  ])
                ])) : createCommentVNode("", true),
                createVNode(_sfc_main$1, {
                  href: _ctx.route("admin.users.index"),
                  active: _ctx.$page.url.startsWith("/users"),
                  "show-text": isSidebarVisible.value
                }, {
                  icon: withCtx(() => [
                    (openBlock(), createBlock(resolveDynamicComponent(
                      _ctx.$page.url.startsWith("/users") ? unref(IconUserFilled) : unref(IconUser)
                    ), {
                      stroke: "1",
                      class: "w-5 h-5"
                    }))
                  ]),
                  default: withCtx(() => [
                    createTextVNode(" " + toDisplayString(_ctx.$t("Users")), 1)
                  ]),
                  _: 1
                }, 8, ["href", "active", "show-text"]),
                createVNode(_sfc_main$1, {
                  href: _ctx.route("admin.pages.index"),
                  active: _ctx.$page.url.startsWith("/pages"),
                  "show-text": isSidebarVisible.value
                }, {
                  icon: withCtx(() => [
                    (openBlock(), createBlock(resolveDynamicComponent(
                      _ctx.$page.url.startsWith("/pages") ? unref(IconClipboardFilled) : unref(IconClipboard)
                    ), {
                      stroke: "1",
                      class: "w-5 h-5"
                    }))
                  ]),
                  default: withCtx(() => [
                    createTextVNode(" " + toDisplayString(_ctx.$t("Pages")), 1)
                  ]),
                  _: 1
                }, 8, ["href", "active", "show-text"])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", null, [
                renderSlot(_ctx.$slots, "default")
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/Admin/DashboardAdminLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
