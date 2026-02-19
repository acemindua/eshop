import { withCtx, createVNode, renderSlot, toDisplayString, unref, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderSlot, ssrInterpolate } from "vue/server-renderer";
import { L as Layout, _ as _sfc_main$1 } from "./AdminLayout-Cwc9qJKB.js";
import { IconPlant2, IconCategory, IconBrandApple } from "@tabler/icons-vue";
const _sfc_main = {
  __name: "CommerceAdminLayout",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(Layout, _attrs, {
        sidenav: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h4 class="uppercase text-xs font-semibold py-2 text-gray-600"${_scopeId}> Commerce </h4><ul class="mt-4"${_scopeId}><li${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              href: _ctx.route("admin.items.index"),
              active: _ctx.$page.url.startsWith("/commerce/items")
            }, {
              icon: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(IconPlant2), { stroke: "{2}" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(IconPlant2), { stroke: "{2}" })
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
              href: _ctx.route("admin.categories.index"),
              active: _ctx.$page.url.startsWith("/commerce/categories")
            }, {
              icon: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(IconCategory), { stroke: "{2}" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(IconCategory), { stroke: "{2}" })
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
              href: _ctx.route("admin.manufacturers.index"),
              active: _ctx.$page.url.startsWith("/commerce/manufacturers")
            }, {
              icon: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(IconBrandApple), { stroke: "{2}" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(IconBrandApple), { stroke: "{2}" })
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
              createVNode("h4", { class: "uppercase text-xs font-semibold py-2 text-gray-600" }, " Commerce "),
              createVNode("ul", { class: "mt-4" }, [
                createVNode("li", null, [
                  createVNode(_sfc_main$1, {
                    href: _ctx.route("admin.items.index"),
                    active: _ctx.$page.url.startsWith("/commerce/items")
                  }, {
                    icon: withCtx(() => [
                      createVNode(unref(IconPlant2), { stroke: "{2}" })
                    ]),
                    default: withCtx(() => [
                      createVNode("span", null, toDisplayString(_ctx.$t("Items")), 1)
                    ]),
                    _: 1
                  }, 8, ["href", "active"])
                ]),
                createVNode("li", null, [
                  createVNode(_sfc_main$1, {
                    href: _ctx.route("admin.categories.index"),
                    active: _ctx.$page.url.startsWith("/commerce/categories")
                  }, {
                    icon: withCtx(() => [
                      createVNode(unref(IconCategory), { stroke: "{2}" })
                    ]),
                    default: withCtx(() => [
                      createVNode("span", null, toDisplayString(_ctx.$t("Categories")), 1)
                    ]),
                    _: 1
                  }, 8, ["href", "active"])
                ]),
                createVNode("li", null, [
                  createVNode(_sfc_main$1, {
                    href: _ctx.route("admin.manufacturers.index"),
                    active: _ctx.$page.url.startsWith("/commerce/manufacturers")
                  }, {
                    icon: withCtx(() => [
                      createVNode(unref(IconBrandApple), { stroke: "{2}" })
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
