import { ref, mergeProps, withCtx, createVNode, renderSlot, createTextVNode, toDisplayString, resolveDynamicComponent, unref, openBlock, createBlock, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderSlot, ssrInterpolate, ssrRenderVNode } from "vue/server-renderer";
import { A as AdminLayout, _ as _sfc_main$1 } from "./AdminLayout-DoxjtInQ.js";
import { IconUserFilled, IconUser, IconClipboardFilled, IconClipboard } from "@tabler/icons-vue";
const _sfc_main = {
  __name: "DashboardAdminLayout",
  __ssrInlineRender: true,
  setup(__props) {
    const isSidebarVisible = ref(true);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminLayout, mergeProps({
        isSidebarVisible: isSidebarVisible.value,
        "onUpdate:isSidebarVisible": ($event) => isSidebarVisible.value = $event
      }, _attrs), {
        sidenav: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="w-full h-14 border-b flex items-center p-4"${_scopeId}><h4 class="uppercase text-[12px] tracking-widest font-bold text-gray-500"${_scopeId}><span${_scopeId}>Dashboard</span></h4></div><ul class="flex flex-col w-full px-3 py-4"${_scopeId}><li${_scopeId}>`);
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
            _push2(`</li><li${_scopeId}>`);
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
            _push2(`</li></ul>`);
          } else {
            return [
              createVNode("div", { class: "w-full h-14 border-b flex items-center p-4" }, [
                createVNode("h4", { class: "uppercase text-[12px] tracking-widest font-bold text-gray-500" }, [
                  createVNode("span", null, "Dashboard")
                ])
              ]),
              createVNode("ul", { class: "flex flex-col w-full px-3 py-4" }, [
                createVNode("li", null, [
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
                  }, 8, ["href", "active", "show-text"])
                ]),
                createVNode("li", null, [
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
