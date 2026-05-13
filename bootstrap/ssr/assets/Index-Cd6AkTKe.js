import { unref, withCtx, createVNode, resolveDynamicComponent, createTextVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrRenderVNode } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./SettingsAdminLayout-k6lIRcNx.js";
import { Head, Link, router } from "@inertiajs/vue3";
import { IconTruck, IconCircleCheck, IconCircleX, IconSettings } from "@tabler/icons-vue";
import "./AdminLayout-Dz4Fusn0.js";
import "./ApplicationLogo-DsJOFw9w.js";
import "./ImageDataView-C9GsQUU8.js";
import "./UserStatus-DfjMQc-4.js";
import "./Breadcrumbs-Be9A5eey.js";
import "pinia";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    shippings: Object
    // Це результат нашого ShippingResource::collection
  },
  setup(__props) {
    const toggleStatus = (id) => {
      router.patch(
        route("admin.settings.shippings.toggle", id),
        {},
        {
          preserveScroll: true
        }
      );
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Методи доставки" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-6"${_scopeId}><div class="flex justify-between items-center mb-6"${_scopeId}><h1 class="text-2xl font-bold text-gray-900 flex items-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(IconTruck), { class: "w-7 h-7 text-gray-600" }, null, _parent2, _scopeId));
            _push2(` Методи доставки </h1></div><div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"${_scopeId}><table class="w-full text-left border-collapse"${_scopeId}><thead class="bg-gray-50 border-b border-gray-100 text-gray-600 uppercase text-xs font-semibold"${_scopeId}><tr${_scopeId}><th class="px-6 py-4"${_scopeId}>Назва</th><th class="px-6 py-4 text-center"${_scopeId}>Статус</th><th class="px-6 py-4 text-center"${_scopeId}>Порядок</th><th class="px-6 py-4 text-right"${_scopeId}>Дії</th></tr></thead><tbody class="divide-y divide-gray-100"${_scopeId}><!--[-->`);
            ssrRenderList(__props.shippings.data, (shipping) => {
              _push2(`<tr class="hover:bg-gray-50/50 transition"${_scopeId}><td class="px-6 py-4"${_scopeId}><div class="font-medium text-gray-900"${_scopeId}>${ssrInterpolate(shipping.name)}</div><div class="text-xs text-gray-400 font-mono"${_scopeId}>${ssrInterpolate(shipping.alias)}</div></td><td class="px-6 py-4 text-center"${_scopeId}><button class="${ssrRenderClass([
                shipping.is_active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500",
                "inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition"
              ])}"${_scopeId}>`);
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(
                shipping.is_active ? unref(IconCircleCheck) : unref(IconCircleX)
              ), { class: "w-4 h-4" }, null), _parent2, _scopeId);
              _push2(` ${ssrInterpolate(shipping.is_active ? "Активно" : "Вимкнено")}</button></td><td class="px-6 py-4 text-center text-sm text-gray-600"${_scopeId}>${ssrInterpolate(shipping.sort_order)}</td><td class="px-6 py-4 text-right"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route(
                  "admin.settings.shippings.edit",
                  shipping.id
                ),
                class: "inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium transition"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(IconSettings), { class: "w-4 h-4" }, null, _parent3, _scopeId2));
                    _push3(` Налаштувати `);
                  } else {
                    return [
                      createVNode(unref(IconSettings), { class: "w-4 h-4" }),
                      createTextVNode(" Налаштувати ")
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div></div>`);
          } else {
            return [
              createVNode("div", { class: "p-6" }, [
                createVNode("div", { class: "flex justify-between items-center mb-6" }, [
                  createVNode("h1", { class: "text-2xl font-bold text-gray-900 flex items-center gap-2" }, [
                    createVNode(unref(IconTruck), { class: "w-7 h-7 text-gray-600" }),
                    createTextVNode(" Методи доставки ")
                  ])
                ]),
                createVNode("div", { class: "bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden" }, [
                  createVNode("table", { class: "w-full text-left border-collapse" }, [
                    createVNode("thead", { class: "bg-gray-50 border-b border-gray-100 text-gray-600 uppercase text-xs font-semibold" }, [
                      createVNode("tr", null, [
                        createVNode("th", { class: "px-6 py-4" }, "Назва"),
                        createVNode("th", { class: "px-6 py-4 text-center" }, "Статус"),
                        createVNode("th", { class: "px-6 py-4 text-center" }, "Порядок"),
                        createVNode("th", { class: "px-6 py-4 text-right" }, "Дії")
                      ])
                    ]),
                    createVNode("tbody", { class: "divide-y divide-gray-100" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.shippings.data, (shipping) => {
                        return openBlock(), createBlock("tr", {
                          key: shipping.id,
                          class: "hover:bg-gray-50/50 transition"
                        }, [
                          createVNode("td", { class: "px-6 py-4" }, [
                            createVNode("div", { class: "font-medium text-gray-900" }, toDisplayString(shipping.name), 1),
                            createVNode("div", { class: "text-xs text-gray-400 font-mono" }, toDisplayString(shipping.alias), 1)
                          ]),
                          createVNode("td", { class: "px-6 py-4 text-center" }, [
                            createVNode("button", {
                              onClick: ($event) => toggleStatus(shipping.id),
                              class: [
                                "inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition",
                                shipping.is_active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                              ]
                            }, [
                              (openBlock(), createBlock(resolveDynamicComponent(
                                shipping.is_active ? unref(IconCircleCheck) : unref(IconCircleX)
                              ), { class: "w-4 h-4" })),
                              createTextVNode(" " + toDisplayString(shipping.is_active ? "Активно" : "Вимкнено"), 1)
                            ], 10, ["onClick"])
                          ]),
                          createVNode("td", { class: "px-6 py-4 text-center text-sm text-gray-600" }, toDisplayString(shipping.sort_order), 1),
                          createVNode("td", { class: "px-6 py-4 text-right" }, [
                            createVNode(unref(Link), {
                              href: _ctx.route(
                                "admin.settings.shippings.edit",
                                shipping.id
                              ),
                              class: "inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium transition"
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(IconSettings), { class: "w-4 h-4" }),
                                createTextVNode(" Налаштувати ")
                              ]),
                              _: 1
                            }, 8, ["href"])
                          ])
                        ]);
                      }), 128))
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Shipping/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
