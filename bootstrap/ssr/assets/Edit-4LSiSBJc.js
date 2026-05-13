import { ref, computed, unref, withCtx, createVNode, toDisplayString, createTextVNode, withModifiers, withDirectives, vModelText, openBlock, createBlock, createCommentVNode, vModelCheckbox, vModelDynamic, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrRenderDynamicModel } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./SettingsAdminLayout-mzHE5KVK.js";
import { _ as _sfc_main$2 } from "./VarDump-0gz6Mom3.js";
import { a as useForm, h as head_default, l as link_default } from "../ssr.js";
import { IconArrowLeft, IconTruck, IconEye, IconEyeOff, IconDeviceFloppy } from "@tabler/icons-vue";
import "./AdminLayout-DtLa9qLf.js";
import "./ApplicationLogo-DsJOFw9w.js";
import "./ImageDataView-C9GsQUU8.js";
import "./UserStatus-DfjMQc-4.js";
import "./Breadcrumbs-DA__G0nP.js";
import "pinia";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "@vue/shared";
import "@vue/compiler-ssr";
import "node:stream";
import "@inertiajs/core";
import "lodash-es";
import "laravel-precognition";
import "@inertiajs/core/server";
import "@floating-ui/dom";
const _sfc_main = {
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    shipping: Object
    // Дані з ShippingResource { data: {...} }
  },
  setup(__props) {
    const props = __props;
    const showApiKey = ref(false);
    const shippingData = computed(() => props.shipping.data);
    const form = useForm({
      title: shippingData.value.title ?? "",
      is_active: Boolean(shippingData.value.is_active),
      sort_order: shippingData.value.sort_order ?? 0,
      settings: {
        api_key: shippingData.value.settings?.api_key ?? "",
        address: shippingData.value.settings?.address ?? "",
        work_hours: shippingData.value.settings?.work_hours ?? "",
        min_weight: shippingData.value.settings?.min_weight ?? 0
      }
    });
    const submit = () => {
      form.put(route("admin.settings.shippings.update", shippingData.value.id), {
        preserveScroll: true
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(head_default), {
        title: `Редагування: ${shippingData.value.name}`
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="max-w-4xl p-6 mx-auto"${_scopeId}><div class="flex items-center justify-between mb-8"${_scopeId}><div class="flex items-center gap-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(link_default), {
              href: _ctx.route("admin.settings.shippings.index"),
              class: "p-2 transition bg-white border border-gray-200 rounded-lg hover:bg-gray-50 shadow-sm text-gray-600"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(IconArrowLeft), { class: "w-5 h-5" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(IconArrowLeft), { class: "w-5 h-5" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div${_scopeId}><h1 class="text-2xl font-bold text-gray-900 leading-tight"${_scopeId}>${ssrInterpolate(shippingData.value.title)}</h1><div class="flex items-center gap-2 mt-1 font-mono text-xs text-gray-500 uppercase tracking-wider"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(IconTruck), { size: "14" }, null, _parent2, _scopeId));
            _push2(` ${ssrInterpolate(shippingData.value.alias)}</div></div></div></div><form class="space-y-6"${_scopeId}><div class="p-6 bg-white border border-gray-100 shadow-sm rounded-xl"${_scopeId}><h2 class="mb-5 text-lg font-semibold text-gray-800 border-b pb-3 flex items-center gap-2"${_scopeId}><span class="w-1.5 h-5 bg-blue-500 rounded-full"${_scopeId}></span> Основні налаштування </h2><div class="grid grid-cols-1 md:grid-cols-2 gap-6"${_scopeId}><div class="flex flex-col gap-2"${_scopeId}><label class="text-sm font-medium text-gray-700"${_scopeId}>Назва для клієнта</label><input${ssrRenderAttr("value", unref(form).title)} type="text" class="${ssrRenderClass([{ "border-red-500": unref(form).errors.title }, "px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"])}"${_scopeId}>`);
            if (unref(form).errors.name) {
              _push2(`<p class="text-xs text-red-500"${_scopeId}>${ssrInterpolate(unref(form).errors.title)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="flex flex-col gap-2"${_scopeId}><label class="text-sm font-medium text-gray-700"${_scopeId}>Порядок сортування</label><input${ssrRenderAttr("value", unref(form).sort_order)} type="number" class="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"${_scopeId}></div><div class="flex items-center gap-3 md:col-span-2 mt-2"${_scopeId}><label class="relative inline-flex items-center cursor-pointer"${_scopeId}><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(unref(form).is_active) ? ssrLooseContain(unref(form).is_active, null) : unref(form).is_active) ? " checked" : ""} class="sr-only peer"${_scopeId}><div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[&#39;&#39;] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"${_scopeId}></div><span class="ml-3 text-sm font-medium text-gray-700"${_scopeId}>Служба активна</span></label></div></div></div><div class="p-6 bg-white border border-gray-100 shadow-sm rounded-xl"${_scopeId}><h2 class="mb-5 text-lg font-semibold text-gray-800 border-b pb-3 flex items-center gap-2"${_scopeId}><span class="w-1.5 h-5 bg-indigo-500 rounded-full"${_scopeId}></span> Специфічні налаштування </h2><div class="space-y-6"${_scopeId}>`);
            if (["nova_poshta", "delivery", "ukr_poshta"].includes(shippingData.value.alias)) {
              _push2(`<div class="flex flex-col gap-2"${_scopeId}><label class="text-sm font-medium text-gray-700"${_scopeId}>API Ключ</label><div class="relative"${_scopeId}><input${ssrRenderDynamicModel(showApiKey.value ? "text" : "password", unref(form).settings.api_key, null)}${ssrRenderAttr("type", showApiKey.value ? "text" : "password")} class="w-full px-4 py-2 pr-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"${_scopeId}><button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"${_scopeId}>`);
              if (!showApiKey.value) {
                _push2(ssrRenderComponent(unref(IconEye), { size: "18" }, null, _parent2, _scopeId));
              } else {
                _push2(ssrRenderComponent(unref(IconEyeOff), { size: "18" }, null, _parent2, _scopeId));
              }
              _push2(`</button></div>`);
              if (unref(form).errors["settings.api_key"]) {
                _push2(`<p class="text-xs text-red-500"${_scopeId}>${ssrInterpolate(unref(form).errors["settings.api_key"])}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (shippingData.value.alias === "pickup") {
              _push2(`<div class="grid gap-6"${_scopeId}><div class="flex flex-col gap-2"${_scopeId}><label class="text-sm font-medium text-gray-700"${_scopeId}>Адреса складу</label><textarea rows="3" class="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"${_scopeId}>${ssrInterpolate(unref(form).settings.address)}</textarea></div><div class="flex flex-col gap-2"${_scopeId}><label class="text-sm font-medium text-gray-700"${_scopeId}>Графік роботи</label><input${ssrRenderAttr("value", unref(form).settings.work_hours)} type="text" class="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"${_scopeId}></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (shippingData.value.alias === "delivery") {
              _push2(`<div class="flex flex-col gap-2"${_scopeId}><label class="text-sm font-medium text-gray-700"${_scopeId}>Мінімальна вага вантажу (кг)</label><input${ssrRenderAttr("value", unref(form).settings.min_weight)} type="number" step="0.1" class="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"${_scopeId}></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="flex justify-end pt-4"${_scopeId}><button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="flex items-center gap-2 px-8 py-3 text-white font-medium transition bg-blue-600 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-100 disabled:opacity-50"${_scopeId}>`);
            if (!unref(form).processing) {
              _push2(ssrRenderComponent(unref(IconDeviceFloppy), { class: "w-5 h-5" }, null, _parent2, _scopeId));
            } else {
              _push2(`<span class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"${_scopeId}></span>`);
            }
            _push2(` ${ssrInterpolate(unref(form).processing ? "Збереження..." : "Зберегти налаштування")}</button></div></form></div>`);
            if (_ctx.$page.props.app.mode === "local") {
              _push2(`<section${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$2, { data: __props.shipping }, null, _parent2, _scopeId));
              _push2(`</section>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", { class: "max-w-4xl p-6 mx-auto" }, [
                createVNode("div", { class: "flex items-center justify-between mb-8" }, [
                  createVNode("div", { class: "flex items-center gap-4" }, [
                    createVNode(unref(link_default), {
                      href: _ctx.route("admin.settings.shippings.index"),
                      class: "p-2 transition bg-white border border-gray-200 rounded-lg hover:bg-gray-50 shadow-sm text-gray-600"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(IconArrowLeft), { class: "w-5 h-5" })
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    createVNode("div", null, [
                      createVNode("h1", { class: "text-2xl font-bold text-gray-900 leading-tight" }, toDisplayString(shippingData.value.title), 1),
                      createVNode("div", { class: "flex items-center gap-2 mt-1 font-mono text-xs text-gray-500 uppercase tracking-wider" }, [
                        createVNode(unref(IconTruck), { size: "14" }),
                        createTextVNode(" " + toDisplayString(shippingData.value.alias), 1)
                      ])
                    ])
                  ])
                ]),
                createVNode("form", {
                  onSubmit: withModifiers(submit, ["prevent"]),
                  class: "space-y-6"
                }, [
                  createVNode("div", { class: "p-6 bg-white border border-gray-100 shadow-sm rounded-xl" }, [
                    createVNode("h2", { class: "mb-5 text-lg font-semibold text-gray-800 border-b pb-3 flex items-center gap-2" }, [
                      createVNode("span", { class: "w-1.5 h-5 bg-blue-500 rounded-full" }),
                      createTextVNode(" Основні налаштування ")
                    ]),
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                      createVNode("div", { class: "flex flex-col gap-2" }, [
                        createVNode("label", { class: "text-sm font-medium text-gray-700" }, "Назва для клієнта"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).title = $event,
                          type: "text",
                          class: ["px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition", { "border-red-500": unref(form).errors.title }]
                        }, null, 10, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).title]
                        ]),
                        unref(form).errors.name ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-xs text-red-500"
                        }, toDisplayString(unref(form).errors.title), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "flex flex-col gap-2" }, [
                        createVNode("label", { class: "text-sm font-medium text-gray-700" }, "Порядок сортування"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).sort_order = $event,
                          type: "number",
                          class: "px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).sort_order]
                        ])
                      ]),
                      createVNode("div", { class: "flex items-center gap-3 md:col-span-2 mt-2" }, [
                        createVNode("label", { class: "relative inline-flex items-center cursor-pointer" }, [
                          withDirectives(createVNode("input", {
                            type: "checkbox",
                            "onUpdate:modelValue": ($event) => unref(form).is_active = $event,
                            class: "sr-only peer"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelCheckbox, unref(form).is_active]
                          ]),
                          createVNode("div", { class: "w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" }),
                          createVNode("span", { class: "ml-3 text-sm font-medium text-gray-700" }, "Служба активна")
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "p-6 bg-white border border-gray-100 shadow-sm rounded-xl" }, [
                    createVNode("h2", { class: "mb-5 text-lg font-semibold text-gray-800 border-b pb-3 flex items-center gap-2" }, [
                      createVNode("span", { class: "w-1.5 h-5 bg-indigo-500 rounded-full" }),
                      createTextVNode(" Специфічні налаштування ")
                    ]),
                    createVNode("div", { class: "space-y-6" }, [
                      ["nova_poshta", "delivery", "ukr_poshta"].includes(shippingData.value.alias) ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "flex flex-col gap-2"
                      }, [
                        createVNode("label", { class: "text-sm font-medium text-gray-700" }, "API Ключ"),
                        createVNode("div", { class: "relative" }, [
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).settings.api_key = $event,
                            type: showApiKey.value ? "text" : "password",
                            class: "w-full px-4 py-2 pr-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                          }, null, 8, ["onUpdate:modelValue", "type"]), [
                            [vModelDynamic, unref(form).settings.api_key]
                          ]),
                          createVNode("button", {
                            type: "button",
                            onClick: ($event) => showApiKey.value = !showApiKey.value,
                            class: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          }, [
                            !showApiKey.value ? (openBlock(), createBlock(unref(IconEye), {
                              key: 0,
                              size: "18"
                            })) : (openBlock(), createBlock(unref(IconEyeOff), {
                              key: 1,
                              size: "18"
                            }))
                          ], 8, ["onClick"])
                        ]),
                        unref(form).errors["settings.api_key"] ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-xs text-red-500"
                        }, toDisplayString(unref(form).errors["settings.api_key"]), 1)) : createCommentVNode("", true)
                      ])) : createCommentVNode("", true),
                      shippingData.value.alias === "pickup" ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "grid gap-6"
                      }, [
                        createVNode("div", { class: "flex flex-col gap-2" }, [
                          createVNode("label", { class: "text-sm font-medium text-gray-700" }, "Адреса складу"),
                          withDirectives(createVNode("textarea", {
                            "onUpdate:modelValue": ($event) => unref(form).settings.address = $event,
                            rows: "3",
                            class: "px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).settings.address]
                          ])
                        ]),
                        createVNode("div", { class: "flex flex-col gap-2" }, [
                          createVNode("label", { class: "text-sm font-medium text-gray-700" }, "Графік роботи"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).settings.work_hours = $event,
                            type: "text",
                            class: "px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).settings.work_hours]
                          ])
                        ])
                      ])) : createCommentVNode("", true),
                      shippingData.value.alias === "delivery" ? (openBlock(), createBlock("div", {
                        key: 2,
                        class: "flex flex-col gap-2"
                      }, [
                        createVNode("label", { class: "text-sm font-medium text-gray-700" }, "Мінімальна вага вантажу (кг)"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).settings.min_weight = $event,
                          type: "number",
                          step: "0.1",
                          class: "px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).settings.min_weight]
                        ])
                      ])) : createCommentVNode("", true)
                    ])
                  ]),
                  createVNode("div", { class: "flex justify-end pt-4" }, [
                    createVNode("button", {
                      type: "submit",
                      disabled: unref(form).processing,
                      class: "flex items-center gap-2 px-8 py-3 text-white font-medium transition bg-blue-600 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-100 disabled:opacity-50"
                    }, [
                      !unref(form).processing ? (openBlock(), createBlock(unref(IconDeviceFloppy), {
                        key: 0,
                        class: "w-5 h-5"
                      })) : (openBlock(), createBlock("span", {
                        key: 1,
                        class: "w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
                      })),
                      createTextVNode(" " + toDisplayString(unref(form).processing ? "Збереження..." : "Зберегти налаштування"), 1)
                    ], 8, ["disabled"])
                  ])
                ], 32)
              ]),
              _ctx.$page.props.app.mode === "local" ? (openBlock(), createBlock("section", { key: 0 }, [
                createVNode(_sfc_main$2, { data: __props.shipping }, null, 8, ["data"])
              ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Settings/Shippings/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
