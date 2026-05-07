import { withCtx, createVNode, renderSlot, toDisplayString, unref, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderSlot, ssrInterpolate } from "vue/server-renderer";
import { A as AdminLayout, _ as _sfc_main$1 } from "./AdminLayout-DoxjtInQ.js";
import { IconShoppingBag, IconPlant2, IconCategory, IconBuildingFactory2 } from "@tabler/icons-vue";
const _sfc_main = {
  __name: "CommerceAdminLayout",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminLayout, _attrs, {
        sidenav: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="w-full h-14 border-b flex items-center p-4"${_scopeId}><h4 class="uppercase text-[12px] tracking-widest font-bold text-gray-500"${_scopeId}><span${_scopeId}>${ssrInterpolate(_ctx.$t("Commerce"))}</span></h4></div><ul class="flex flex-col w-full px-3 py-4"${_scopeId}><li${_scopeId}></li><li${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              href: _ctx.route("admin.commerce.orders.index"),
              active: _ctx.$page.url.startsWith("/admin/commerce/orders")
            }, {
              icon: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(IconShoppingBag), { stroke: "2" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(IconShoppingBag), { stroke: "2" })
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span${_scopeId2}>${ssrInterpolate(_ctx.$t("Orders"))}</span>`);
                } else {
                  return [
                    createVNode("span", null, toDisplayString(_ctx.$t("Orders")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</li><li${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              href: _ctx.route("admin.commerce.items.index"),
              active: _ctx.$page.url.startsWith("/admin/commerce/items")
            }, {
              icon: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(IconPlant2), { stroke: "2" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(IconPlant2), { stroke: "2" })
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span${_scopeId2}>${ssrInterpolate(_ctx.$t("Items"))}</span>`);
                } else {
                  return [
                    createVNode("span", null, toDisplayString(_ctx.$t("Items")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</li><li${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              href: _ctx.route("admin.commerce.categories.index"),
              active: _ctx.$page.url.startsWith("/admin/commerce/categories")
            }, {
              icon: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(IconCategory), { stroke: "2" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(IconCategory), { stroke: "2" })
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span${_scopeId2}>${ssrInterpolate(_ctx.$t("Categories"))}</span>`);
                } else {
                  return [
                    createVNode("span", null, toDisplayString(_ctx.$t("Categories")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</li><li${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              href: _ctx.route("admin.commerce.manufacturers.index"),
              active: _ctx.$page.url.startsWith(
                "/admin/commerce/manufacturers"
              )
            }, {
              icon: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(IconBuildingFactory2), { stroke: "2" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(IconBuildingFactory2), { stroke: "2" })
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span${_scopeId2}>${ssrInterpolate(_ctx.$t("Manufacturers"))}</span>`);
                } else {
                  return [
                    createVNode("span", null, toDisplayString(_ctx.$t("Manufacturers")), 1)
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
                  createVNode("span", null, toDisplayString(_ctx.$t("Commerce")), 1)
                ])
              ]),
              createVNode("ul", { class: "flex flex-col w-full px-3 py-4" }, [
                createVNode("li"),
                createVNode("li", null, [
                  createVNode(_sfc_main$1, {
                    href: _ctx.route("admin.commerce.orders.index"),
                    active: _ctx.$page.url.startsWith("/admin/commerce/orders")
                  }, {
                    icon: withCtx(() => [
                      createVNode(unref(IconShoppingBag), { stroke: "2" })
                    ]),
                    default: withCtx(() => [
                      createVNode("span", null, toDisplayString(_ctx.$t("Orders")), 1)
                    ]),
                    _: 1
                  }, 8, ["href", "active"])
                ]),
                createVNode("li", null, [
                  createVNode(_sfc_main$1, {
                    href: _ctx.route("admin.commerce.items.index"),
                    active: _ctx.$page.url.startsWith("/admin/commerce/items")
                  }, {
                    icon: withCtx(() => [
                      createVNode(unref(IconPlant2), { stroke: "2" })
                    ]),
                    default: withCtx(() => [
                      createVNode("span", null, toDisplayString(_ctx.$t("Items")), 1)
                    ]),
                    _: 1
                  }, 8, ["href", "active"])
                ]),
                createVNode("li", null, [
                  createVNode(_sfc_main$1, {
                    href: _ctx.route("admin.commerce.categories.index"),
                    active: _ctx.$page.url.startsWith("/admin/commerce/categories")
                  }, {
                    icon: withCtx(() => [
                      createVNode(unref(IconCategory), { stroke: "2" })
                    ]),
                    default: withCtx(() => [
                      createVNode("span", null, toDisplayString(_ctx.$t("Categories")), 1)
                    ]),
                    _: 1
                  }, 8, ["href", "active"])
                ]),
                createVNode("li", null, [
                  createVNode(_sfc_main$1, {
                    href: _ctx.route("admin.commerce.manufacturers.index"),
                    active: _ctx.$page.url.startsWith(
                      "/admin/commerce/manufacturers"
                    )
                  }, {
                    icon: withCtx(() => [
                      createVNode(unref(IconBuildingFactory2), { stroke: "2" })
                    ]),
                    default: withCtx(() => [
                      createVNode("span", null, toDisplayString(_ctx.$t("Manufacturers")), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/Admin/CommerceAdminLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
