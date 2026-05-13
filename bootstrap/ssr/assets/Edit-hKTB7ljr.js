import { unref, withCtx, createVNode, toDisplayString, withModifiers, withDirectives, vModelText, openBlock, createBlock, createCommentVNode, vModelCheckbox, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./SettingsAdminLayout-k6lIRcNx.js";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { IconArrowLeft, IconDeviceFloppy } from "@tabler/icons-vue";
import "./AdminLayout-Dz4Fusn0.js";
import "./ApplicationLogo-DsJOFw9w.js";
import "./ImageDataView-C9GsQUU8.js";
import "./UserStatus-DfjMQc-4.js";
import "./Breadcrumbs-Be9A5eey.js";
import "pinia";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    shipping: Object
    // Дані з нашого ShippingResource
  },
  setup(__props) {
    const props = __props;
    const form = useForm({
      name: props.shipping.data.name,
      is_active: props.shipping.data.is_active,
      sort_order: props.shipping.data.sort_order,
      settings: props.shipping.data.settings || {}
    });
    const submit = () => {
      form.put(route("admin.shippings.update", props.shipping.data.id), {
        preserveScroll: true
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: `Редагування: ${__props.shipping.data.name}`
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="max-w-4xl p-6 mx-auto"${_scopeId}><div class="flex items-center justify-between mb-8"${_scopeId}><div class="flex items-center gap-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin.shippings.index"),
              class: "p-2 transition bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(IconArrowLeft), { class: "w-5 h-5 text-gray-600" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(IconArrowLeft), { class: "w-5 h-5 text-gray-600" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div${_scopeId}><h1 class="text-2xl font-bold text-gray-900"${_scopeId}>${ssrInterpolate(__props.shipping.data.name)}</h1><p class="text-sm text-gray-500 uppercase font-mono"${_scopeId}>${ssrInterpolate(__props.shipping.data.alias)}</p></div></div></div><form class="space-y-6"${_scopeId}><div class="p-6 bg-white border border-gray-100 shadow-sm rounded-xl"${_scopeId}><h2 class="mb-4 text-lg font-semibold text-gray-800 border-b pb-2"${_scopeId}> Основні налаштування </h2><div class="grid grid-cols-1 md:grid-cols-2 gap-6"${_scopeId}><div class="flex flex-col gap-2"${_scopeId}><label class="text-sm font-medium text-gray-700"${_scopeId}>Назва для клієнта</label><input${ssrRenderAttr("value", unref(form).name)} type="text" class="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"${_scopeId}>`);
            if (unref(form).errors.name) {
              _push2(`<div class="text-xs text-red-500"${_scopeId}>${ssrInterpolate(unref(form).errors.name)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="flex flex-col gap-2"${_scopeId}><label class="text-sm font-medium text-gray-700"${_scopeId}>Порядок сортування</label><input${ssrRenderAttr("value", unref(form).sort_order)} type="number" class="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"${_scopeId}></div><div class="flex items-center gap-3 md:col-span-2"${_scopeId}><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).is_active) ? ssrLooseContain(unref(form).is_active, null) : unref(form).is_active) ? " checked" : ""} type="checkbox" id="is_active" class="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"${_scopeId}><label for="is_active" class="text-sm font-medium text-gray-700"${_scopeId}>Служба активна (відображати при оформленні)</label></div></div></div><div class="p-6 bg-white border border-gray-100 shadow-sm rounded-xl"${_scopeId}><h2 class="mb-4 text-lg font-semibold text-gray-800 border-b pb-2"${_scopeId}> Специфічні налаштування </h2><div class="space-y-6"${_scopeId}>`);
            if ([
              "nova_poshta",
              "delivery",
              "ukr_poshta"
            ].includes(__props.shipping.data.alias)) {
              _push2(`<div class="flex flex-col gap-2"${_scopeId}><label class="text-sm font-medium text-gray-700"${_scopeId}>API Ключ</label><input${ssrRenderAttr("value", unref(form).settings.api_key)} type="password" class="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"${_scopeId}><p class="text-xs text-gray-400"${_scopeId}> Введіть ключ, отриманий в особистому кабінеті перевізника. </p>`);
              if (unref(form).errors["settings.api_key"]) {
                _push2(`<div class="text-xs text-red-500"${_scopeId}>${ssrInterpolate(unref(form).errors["settings.api_key"])}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.shipping.data.alias === "pickup") {
              _push2(`<div class="space-y-4"${_scopeId}><div class="flex flex-col gap-2"${_scopeId}><label class="text-sm font-medium text-gray-700"${_scopeId}>Адреса складу</label><textarea rows="3" class="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"${_scopeId}>${ssrInterpolate(unref(form).settings.address)}</textarea></div><div class="flex flex-col gap-2"${_scopeId}><label class="text-sm font-medium text-gray-700"${_scopeId}>Графік роботи</label><input${ssrRenderAttr("value", unref(form).settings.work_hours)} type="text" class="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"${_scopeId}></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.shipping.data.alias === "delivery") {
              _push2(`<div class="flex flex-col gap-2"${_scopeId}><label class="text-sm font-medium text-gray-700"${_scopeId}>Мінімальна вага вантажу (кг)</label><input${ssrRenderAttr("value", unref(form).settings.min_weight)} type="number" class="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"${_scopeId}></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="flex justify-end"${_scopeId}><button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="flex items-center gap-2 px-6 py-2 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(IconDeviceFloppy), { class: "w-5 h-5" }, null, _parent2, _scopeId));
            _push2(` ${ssrInterpolate(unref(form).processing ? "Збереження..." : "Зберегти зміни")}</button></div></form></div>`);
          } else {
            return [
              createVNode("div", { class: "max-w-4xl p-6 mx-auto" }, [
                createVNode("div", { class: "flex items-center justify-between mb-8" }, [
                  createVNode("div", { class: "flex items-center gap-4" }, [
                    createVNode(unref(Link), {
                      href: _ctx.route("admin.shippings.index"),
                      class: "p-2 transition bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(IconArrowLeft), { class: "w-5 h-5 text-gray-600" })
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    createVNode("div", null, [
                      createVNode("h1", { class: "text-2xl font-bold text-gray-900" }, toDisplayString(__props.shipping.data.name), 1),
                      createVNode("p", { class: "text-sm text-gray-500 uppercase font-mono" }, toDisplayString(__props.shipping.data.alias), 1)
                    ])
                  ])
                ]),
                createVNode("form", {
                  onSubmit: withModifiers(submit, ["prevent"]),
                  class: "space-y-6"
                }, [
                  createVNode("div", { class: "p-6 bg-white border border-gray-100 shadow-sm rounded-xl" }, [
                    createVNode("h2", { class: "mb-4 text-lg font-semibold text-gray-800 border-b pb-2" }, " Основні налаштування "),
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                      createVNode("div", { class: "flex flex-col gap-2" }, [
                        createVNode("label", { class: "text-sm font-medium text-gray-700" }, "Назва для клієнта"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).name = $event,
                          type: "text",
                          class: "px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).name]
                        ]),
                        unref(form).errors.name ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-xs text-red-500"
                        }, toDisplayString(unref(form).errors.name), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "flex flex-col gap-2" }, [
                        createVNode("label", { class: "text-sm font-medium text-gray-700" }, "Порядок сортування"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).sort_order = $event,
                          type: "number",
                          class: "px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).sort_order]
                        ])
                      ]),
                      createVNode("div", { class: "flex items-center gap-3 md:col-span-2" }, [
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).is_active = $event,
                          type: "checkbox",
                          id: "is_active",
                          class: "w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelCheckbox, unref(form).is_active]
                        ]),
                        createVNode("label", {
                          for: "is_active",
                          class: "text-sm font-medium text-gray-700"
                        }, "Служба активна (відображати при оформленні)")
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "p-6 bg-white border border-gray-100 shadow-sm rounded-xl" }, [
                    createVNode("h2", { class: "mb-4 text-lg font-semibold text-gray-800 border-b pb-2" }, " Специфічні налаштування "),
                    createVNode("div", { class: "space-y-6" }, [
                      [
                        "nova_poshta",
                        "delivery",
                        "ukr_poshta"
                      ].includes(__props.shipping.data.alias) ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "flex flex-col gap-2"
                      }, [
                        createVNode("label", { class: "text-sm font-medium text-gray-700" }, "API Ключ"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).settings.api_key = $event,
                          type: "password",
                          class: "px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).settings.api_key]
                        ]),
                        createVNode("p", { class: "text-xs text-gray-400" }, " Введіть ключ, отриманий в особистому кабінеті перевізника. "),
                        unref(form).errors["settings.api_key"] ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-xs text-red-500"
                        }, toDisplayString(unref(form).errors["settings.api_key"]), 1)) : createCommentVNode("", true)
                      ])) : createCommentVNode("", true),
                      __props.shipping.data.alias === "pickup" ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "space-y-4"
                      }, [
                        createVNode("div", { class: "flex flex-col gap-2" }, [
                          createVNode("label", { class: "text-sm font-medium text-gray-700" }, "Адреса складу"),
                          withDirectives(createVNode("textarea", {
                            "onUpdate:modelValue": ($event) => unref(form).settings.address = $event,
                            rows: "3",
                            class: "px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).settings.address]
                          ])
                        ]),
                        createVNode("div", { class: "flex flex-col gap-2" }, [
                          createVNode("label", { class: "text-sm font-medium text-gray-700" }, "Графік роботи"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).settings.work_hours = $event,
                            type: "text",
                            class: "px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).settings.work_hours]
                          ])
                        ])
                      ])) : createCommentVNode("", true),
                      __props.shipping.data.alias === "delivery" ? (openBlock(), createBlock("div", {
                        key: 2,
                        class: "flex flex-col gap-2"
                      }, [
                        createVNode("label", { class: "text-sm font-medium text-gray-700" }, "Мінімальна вага вантажу (кг)"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).settings.min_weight = $event,
                          type: "number",
                          class: "px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).settings.min_weight]
                        ])
                      ])) : createCommentVNode("", true)
                    ])
                  ]),
                  createVNode("div", { class: "flex justify-end" }, [
                    createVNode("button", {
                      type: "submit",
                      disabled: unref(form).processing,
                      class: "flex items-center gap-2 px-6 py-2 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    }, [
                      createVNode(unref(IconDeviceFloppy), { class: "w-5 h-5" }),
                      createTextVNode(" " + toDisplayString(unref(form).processing ? "Збереження..." : "Зберегти зміни"), 1)
                    ], 8, ["disabled"])
                  ])
                ], 32)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Shipping/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
