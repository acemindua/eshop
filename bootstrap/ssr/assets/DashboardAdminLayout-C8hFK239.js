import { withCtx, createVNode, renderSlot, toDisplayString, unref, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderSlot, ssrInterpolate } from "vue/server-renderer";
import { L as Layout, _ as _sfc_main$1 } from "./AdminLayout-Cwc9qJKB.js";
import { IconUsers, IconBook } from "@tabler/icons-vue";
const _sfc_main = {
  __name: "DashboardAdminLayout",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(Layout, _attrs, {
        sidenav: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h4 class="uppercase text-xs font-semibold py-2 text-gray-600"${_scopeId}> Dashboard </h4><ul class="mt-4 w-full"${_scopeId}><li class=""${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              href: _ctx.route("admin.users.index"),
              active: _ctx.$page.url.startsWith("/users")
            }, {
              icon: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(IconUsers), { stroke: "{2}" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(IconUsers), { stroke: "{2}" })
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span${_scopeId2}>${ssrInterpolate(_ctx.$t("Users"))}</span>`);
                } else {
                  return [
                    createVNode("span", null, toDisplayString(_ctx.$t("Users")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</li><li${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              href: _ctx.route("admin.pages.index"),
              active: _ctx.$page.url.startsWith("/pages")
            }, {
              icon: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(IconBook), { stroke: "{2}" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(IconBook), { stroke: "{2}" })
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span${_scopeId2}>${ssrInterpolate(_ctx.$t("Pages"))}</span>`);
                } else {
                  return [
                    createVNode("span", null, toDisplayString(_ctx.$t("Pages")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</li></ul>`);
          } else {
            return [
              createVNode("h4", { class: "uppercase text-xs font-semibold py-2 text-gray-600" }, " Dashboard "),
              createVNode("ul", { class: "mt-4 w-full" }, [
                createVNode("li", { class: "" }, [
                  createVNode(_sfc_main$1, {
                    href: _ctx.route("admin.users.index"),
                    active: _ctx.$page.url.startsWith("/users")
                  }, {
                    icon: withCtx(() => [
                      createVNode(unref(IconUsers), { stroke: "{2}" })
                    ]),
                    default: withCtx(() => [
                      createVNode("span", null, toDisplayString(_ctx.$t("Users")), 1)
                    ]),
                    _: 1
                  }, 8, ["href", "active"])
                ]),
                createVNode("li", null, [
                  createVNode(_sfc_main$1, {
                    href: _ctx.route("admin.pages.index"),
                    active: _ctx.$page.url.startsWith("/pages")
                  }, {
                    icon: withCtx(() => [
                      createVNode(unref(IconBook), { stroke: "{2}" })
                    ]),
                    default: withCtx(() => [
                      createVNode("span", null, toDisplayString(_ctx.$t("Pages")), 1)
                    ]),
                    _: 1
                  }, 8, ["href", "active"])
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
