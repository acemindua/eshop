import { ref, mergeProps, withCtx, createVNode, renderSlot, toDisplayString, unref, resolveDynamicComponent, openBlock, createBlock, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderSlot, ssrInterpolate, ssrRenderVNode } from "vue/server-renderer";
import { A as AdminLayout, _ as _sfc_main$1 } from "./AdminLayout-Dz4Fusn0.js";
import { IconSettings, IconLanguageHiragana, IconTruckDelivery, IconCreditCardFilled, IconCreditCard, IconDirectionsFilled, IconDirections } from "@tabler/icons-vue";
const _sfc_main = {
  __name: "SettingsAdminLayout",
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
            _push2(`<div class="w-full h-14 border-b flex items-center p-4"${_scopeId}><h4 class="uppercase text-[12px] tracking-widest font-bold text-gray-500"${_scopeId}><span${_scopeId}>${ssrInterpolate(_ctx.$t("Settings"))}</span></h4></div><ul class="flex flex-col w-full px-3 py-4"${_scopeId}><li${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              href: _ctx.route("admin.settings.index"),
              active: _ctx.$page.url === "/admin/settings"
            }, {
              icon: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(IconSettings), { stroke: "2" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(IconSettings), { stroke: "2" })
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span${_scopeId2}>${ssrInterpolate(_ctx.$t("General"))}</span>`);
                } else {
                  return [
                    createVNode("span", null, toDisplayString(_ctx.$t("General")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</li><li${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              href: _ctx.route("admin.settings.translations.index"),
              active: _ctx.$page.url.startsWith("/admin/settings/translations")
            }, {
              icon: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(IconLanguageHiragana), { stroke: "2" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(IconLanguageHiragana), { stroke: "2" })
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span${_scopeId2}>${ssrInterpolate(_ctx.$t("Translations"))}</span>`);
                } else {
                  return [
                    createVNode("span", null, toDisplayString(_ctx.$t("Translations")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</li><li${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              href: _ctx.route("admin.settings.shippings.index"),
              active: _ctx.$page.url.startsWith("/admin/settings/shippings")
            }, {
              icon: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(IconTruckDelivery), { stroke: "2" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(IconTruckDelivery), { stroke: "2" })
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span${_scopeId2}>${ssrInterpolate(_ctx.$t("Shippings"))}</span>`);
                } else {
                  return [
                    createVNode("span", null, toDisplayString(_ctx.$t("Shippings")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</li><li${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              href: _ctx.route("admin.settings.payment-methods.index"),
              active: _ctx.$page.url.startsWith(
                "/admin/settings/payment-methods"
              ),
              "show-text": isSidebarVisible.value
            }, {
              icon: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  ssrRenderVNode(_push3, createVNode(resolveDynamicComponent(
                    _ctx.$page.url.startsWith(
                      "/settings/payment-methods"
                    ) ? unref(IconCreditCardFilled) : unref(IconCreditCard)
                  ), {
                    stroke: "1",
                    class: "w-5 h-5"
                  }, null), _parent3, _scopeId2);
                } else {
                  return [
                    (openBlock(), createBlock(resolveDynamicComponent(
                      _ctx.$page.url.startsWith(
                        "/settings/payment-methods"
                      ) ? unref(IconCreditCardFilled) : unref(IconCreditCard)
                    ), {
                      stroke: "1",
                      class: "w-5 h-5"
                    }))
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span${_scopeId2}>${ssrInterpolate(_ctx.$t("Payment Methods"))}</span>`);
                } else {
                  return [
                    createVNode("span", null, toDisplayString(_ctx.$t("Payment Methods")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</li><li${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              href: _ctx.route("admin.settings.versions.index"),
              active: _ctx.$page.url.startsWith("/admin/settings/versions")
            }, {
              icon: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  ssrRenderVNode(_push3, createVNode(resolveDynamicComponent(
                    _ctx.$page.url.startsWith("/settings/versions") ? unref(IconDirectionsFilled) : unref(IconDirections)
                  ), {
                    stroke: "1",
                    class: "w-5 h-5"
                  }, null), _parent3, _scopeId2);
                } else {
                  return [
                    (openBlock(), createBlock(resolveDynamicComponent(
                      _ctx.$page.url.startsWith("/settings/versions") ? unref(IconDirectionsFilled) : unref(IconDirections)
                    ), {
                      stroke: "1",
                      class: "w-5 h-5"
                    }))
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span${_scopeId2}>${ssrInterpolate(_ctx.$t("Roadmap & versions"))}</span>`);
                } else {
                  return [
                    createVNode("span", null, toDisplayString(_ctx.$t("Roadmap & versions")), 1)
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
                  createVNode("span", null, toDisplayString(_ctx.$t("Settings")), 1)
                ])
              ]),
              createVNode("ul", { class: "flex flex-col w-full px-3 py-4" }, [
                createVNode("li", null, [
                  createVNode(_sfc_main$1, {
                    href: _ctx.route("admin.settings.index"),
                    active: _ctx.$page.url === "/admin/settings"
                  }, {
                    icon: withCtx(() => [
                      createVNode(unref(IconSettings), { stroke: "2" })
                    ]),
                    default: withCtx(() => [
                      createVNode("span", null, toDisplayString(_ctx.$t("General")), 1)
                    ]),
                    _: 1
                  }, 8, ["href", "active"])
                ]),
                createVNode("li", null, [
                  createVNode(_sfc_main$1, {
                    href: _ctx.route("admin.settings.translations.index"),
                    active: _ctx.$page.url.startsWith("/admin/settings/translations")
                  }, {
                    icon: withCtx(() => [
                      createVNode(unref(IconLanguageHiragana), { stroke: "2" })
                    ]),
                    default: withCtx(() => [
                      createVNode("span", null, toDisplayString(_ctx.$t("Translations")), 1)
                    ]),
                    _: 1
                  }, 8, ["href", "active"])
                ]),
                createVNode("li", null, [
                  createVNode(_sfc_main$1, {
                    href: _ctx.route("admin.settings.shippings.index"),
                    active: _ctx.$page.url.startsWith("/admin/settings/shippings")
                  }, {
                    icon: withCtx(() => [
                      createVNode(unref(IconTruckDelivery), { stroke: "2" })
                    ]),
                    default: withCtx(() => [
                      createVNode("span", null, toDisplayString(_ctx.$t("Shippings")), 1)
                    ]),
                    _: 1
                  }, 8, ["href", "active"])
                ]),
                createVNode("li", null, [
                  createVNode(_sfc_main$1, {
                    href: _ctx.route("admin.settings.payment-methods.index"),
                    active: _ctx.$page.url.startsWith(
                      "/admin/settings/payment-methods"
                    ),
                    "show-text": isSidebarVisible.value
                  }, {
                    icon: withCtx(() => [
                      (openBlock(), createBlock(resolveDynamicComponent(
                        _ctx.$page.url.startsWith(
                          "/settings/payment-methods"
                        ) ? unref(IconCreditCardFilled) : unref(IconCreditCard)
                      ), {
                        stroke: "1",
                        class: "w-5 h-5"
                      }))
                    ]),
                    default: withCtx(() => [
                      createVNode("span", null, toDisplayString(_ctx.$t("Payment Methods")), 1)
                    ]),
                    _: 1
                  }, 8, ["href", "active", "show-text"])
                ]),
                createVNode("li", null, [
                  createVNode(_sfc_main$1, {
                    href: _ctx.route("admin.settings.versions.index"),
                    active: _ctx.$page.url.startsWith("/admin/settings/versions")
                  }, {
                    icon: withCtx(() => [
                      (openBlock(), createBlock(resolveDynamicComponent(
                        _ctx.$page.url.startsWith("/settings/versions") ? unref(IconDirectionsFilled) : unref(IconDirections)
                      ), {
                        stroke: "1",
                        class: "w-5 h-5"
                      }))
                    ]),
                    default: withCtx(() => [
                      createVNode("span", null, toDisplayString(_ctx.$t("Roadmap & versions")), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/Admin/SettingsAdminLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
