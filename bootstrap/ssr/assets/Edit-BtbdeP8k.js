import { unref, withCtx, createTextVNode, createVNode, withModifiers, openBlock, createBlock, createCommentVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { a as useForm, h as head_default, l as link_default } from "../ssr.js";
import { _ as _sfc_main$1 } from "./SettingsAdminLayout-mzHE5KVK.js";
import { _ as _sfc_main$4 } from "./InputError-Cp3nFeNd.js";
import { _ as _sfc_main$2, a as _sfc_main$3 } from "./TextInput-Dmmb8A31.js";
import { P as PrimaryButton } from "./PrimaryButton-CwWODTiG.js";
import { _ as _sfc_main$5 } from "./Checkbox-BYIkH8i_.js";
import { _ as _sfc_main$6 } from "./VarDump-0gz6Mom3.js";
import "@vue/shared";
import "@vue/compiler-ssr";
import "node:stream";
import "@inertiajs/core";
import "lodash-es";
import "laravel-precognition";
import "@inertiajs/core/server";
import "pinia";
import "@floating-ui/dom";
import "./AdminLayout-DtLa9qLf.js";
import "@tabler/icons-vue";
import "./ApplicationLogo-DsJOFw9w.js";
import "./ImageDataView-C9GsQUU8.js";
import "./UserStatus-DfjMQc-4.js";
import "./Breadcrumbs-DA__G0nP.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const warehouse = props.data?.warehouse?.data || {};
    const form = useForm({
      _method: "PUT",
      // Необхідно для Laravel при завантаженні файлів через POST запит
      title: warehouse.title,
      city: warehouse.city,
      address: warehouse.address,
      phone: warehouse.phone,
      working_hours: warehouse.working_hours,
      map_link: warehouse.map_link,
      sort_order: warehouse.sort_order,
      is_active: warehouse.is_active,
      image: null
    });
    const submit = () => {
      form.post(route("admin.settings.warehouses.update", warehouse.id), {
        forceFormData: true,
        onSuccess: () => {
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(head_default), {
        title: `Редагувати: ${unref(warehouse).title}`
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center justify-between"${_scopeId}><h2 class="font-semibold text-xl text-gray-800 leading-tight"${_scopeId}> Редагування складу: <span class="text-indigo-600"${_scopeId}>${ssrInterpolate(unref(warehouse).title)}</span></h2>`);
            _push2(ssrRenderComponent(unref(link_default), {
              href: _ctx.route("admin.settings.warehouses.index"),
              class: "text-sm text-gray-600 hover:text-gray-900 flex items-center"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"${_scopeId2}></path></svg> Назад до списку `);
                } else {
                  return [
                    (openBlock(), createBlock("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      class: "h-4 w-4 mr-1",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      stroke: "currentColor"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M10 19l-7-7m0 0l7-7m-7 7h18"
                      })
                    ])),
                    createTextVNode(" Назад до списку ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center justify-between" }, [
                createVNode("h2", { class: "font-semibold text-xl text-gray-800 leading-tight" }, [
                  createTextVNode(" Редагування складу: "),
                  createVNode("span", { class: "text-indigo-600" }, toDisplayString(unref(warehouse).title), 1)
                ]),
                createVNode(unref(link_default), {
                  href: _ctx.route("admin.settings.warehouses.index"),
                  class: "text-sm text-gray-600 hover:text-gray-900 flex items-center"
                }, {
                  default: withCtx(() => [
                    (openBlock(), createBlock("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      class: "h-4 w-4 mr-1",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      stroke: "currentColor"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M10 19l-7-7m0 0l7-7m-7 7h18"
                      })
                    ])),
                    createTextVNode(" Назад до списку ")
                  ]),
                  _: 1
                }, 8, ["href"])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="max-w-7xl mx-auto sm:px-6 lg:px-8"${_scopeId}><form class="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 space-y-6"${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 gap-6"${_scopeId}><div class="space-y-4"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "title",
              value: "Назва складу"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "title",
              modelValue: unref(form).title,
              "onUpdate:modelValue": ($event) => unref(form).title = $event,
              type: "text",
              class: "mt-1 block w-full",
              required: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              message: unref(form).errors.title,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "city",
              value: "Місто"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "city",
              modelValue: unref(form).city,
              "onUpdate:modelValue": ($event) => unref(form).city = $event,
              type: "text",
              class: "mt-1 block w-full",
              required: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              message: unref(form).errors.city,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "address",
              value: "Адреса"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "address",
              modelValue: unref(form).address,
              "onUpdate:modelValue": ($event) => unref(form).address = $event,
              type: "text",
              class: "mt-1 block w-full",
              required: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              message: unref(form).errors.address,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="space-y-4"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "phone",
              value: "Телефон"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "phone",
              modelValue: unref(form).phone,
              "onUpdate:modelValue": ($event) => unref(form).phone = $event,
              type: "text",
              class: "mt-1 block w-full"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              message: unref(form).errors.phone,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "working_hours",
              value: "Графік роботи"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "working_hours",
              modelValue: unref(form).working_hours,
              "onUpdate:modelValue": ($event) => unref(form).working_hours = $event,
              type: "text",
              class: "mt-1 block w-full"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              message: unref(form).errors.working_hours,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "map_link",
              value: "Посилання на Google Maps"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "map_link",
              modelValue: unref(form).map_link,
              "onUpdate:modelValue": ($event) => unref(form).map_link = $event,
              type: "url",
              class: "mt-1 block w-full"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              message: unref(form).errors.map_link,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div><hr class="my-6 border-gray-200"${_scopeId}><div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-start"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              value: "Поточне фото",
              class: "mb-2"
            }, null, _parent2, _scopeId));
            if (unref(warehouse).image) {
              _push2(`<div class="mb-4"${_scopeId}><img${ssrRenderAttr("src", unref(warehouse).image)} class="h-32 w-48 object-cover rounded shadow" alt="Warehouse image"${_scopeId}></div>`);
            } else {
              _push2(`<div class="mb-4 h-32 w-48 bg-gray-100 flex items-center justify-center rounded border border-dashed border-gray-300 text-gray-400 text-sm"${_scopeId}> Немає фото </div>`);
            }
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "image",
              value: "Замінити фото"
            }, null, _parent2, _scopeId));
            _push2(`<input id="image" type="file" class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              message: unref(form).errors.image,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "sort_order",
              value: "Порядок сортування"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "sort_order",
              modelValue: unref(form).sort_order,
              "onUpdate:modelValue": ($event) => unref(form).sort_order = $event,
              type: "number",
              class: "mt-1 block w-full"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              message: unref(form).errors.sort_order,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex items-center h-full pt-6 md:pt-12"${_scopeId}><label class="flex items-center cursor-pointer"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$5, {
              checked: unref(form).is_active,
              "onUpdate:checked": ($event) => unref(form).is_active = $event
            }, null, _parent2, _scopeId));
            _push2(`<span class="ml-2 text-sm text-gray-600 font-medium"${_scopeId}>Склад активний</span></label>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              message: unref(form).errors.is_active,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex items-center justify-end mt-8 gap-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(link_default), {
              href: _ctx.route("admin.settings.warehouses.index"),
              class: "text-sm text-gray-600 hover:underline"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Скасувати зміни `);
                } else {
                  return [
                    createTextVNode(" Скасувати зміни ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(PrimaryButton, {
              class: { "opacity-25": unref(form).processing },
              disabled: unref(form).processing
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Зберегти зміни `);
                } else {
                  return [
                    createTextVNode(" Зберегти зміни ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form></div>`);
            if (_ctx.$page.props.app.mode === "local") {
              _push2(`<section${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$6, { data: __props.data }, null, _parent2, _scopeId));
              _push2(`</section>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "max-w-7xl mx-auto sm:px-6 lg:px-8" }, [
                  createVNode("form", {
                    onSubmit: withModifiers(submit, ["prevent"]),
                    class: "bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 space-y-6"
                  }, [
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                      createVNode("div", { class: "space-y-4" }, [
                        createVNode("div", null, [
                          createVNode(_sfc_main$2, {
                            for: "title",
                            value: "Назва складу"
                          }),
                          createVNode(_sfc_main$3, {
                            id: "title",
                            modelValue: unref(form).title,
                            "onUpdate:modelValue": ($event) => unref(form).title = $event,
                            type: "text",
                            class: "mt-1 block w-full",
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_sfc_main$4, {
                            message: unref(form).errors.title,
                            class: "mt-2"
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", null, [
                          createVNode(_sfc_main$2, {
                            for: "city",
                            value: "Місто"
                          }),
                          createVNode(_sfc_main$3, {
                            id: "city",
                            modelValue: unref(form).city,
                            "onUpdate:modelValue": ($event) => unref(form).city = $event,
                            type: "text",
                            class: "mt-1 block w-full",
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_sfc_main$4, {
                            message: unref(form).errors.city,
                            class: "mt-2"
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", null, [
                          createVNode(_sfc_main$2, {
                            for: "address",
                            value: "Адреса"
                          }),
                          createVNode(_sfc_main$3, {
                            id: "address",
                            modelValue: unref(form).address,
                            "onUpdate:modelValue": ($event) => unref(form).address = $event,
                            type: "text",
                            class: "mt-1 block w-full",
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_sfc_main$4, {
                            message: unref(form).errors.address,
                            class: "mt-2"
                          }, null, 8, ["message"])
                        ])
                      ]),
                      createVNode("div", { class: "space-y-4" }, [
                        createVNode("div", null, [
                          createVNode(_sfc_main$2, {
                            for: "phone",
                            value: "Телефон"
                          }),
                          createVNode(_sfc_main$3, {
                            id: "phone",
                            modelValue: unref(form).phone,
                            "onUpdate:modelValue": ($event) => unref(form).phone = $event,
                            type: "text",
                            class: "mt-1 block w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_sfc_main$4, {
                            message: unref(form).errors.phone,
                            class: "mt-2"
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", null, [
                          createVNode(_sfc_main$2, {
                            for: "working_hours",
                            value: "Графік роботи"
                          }),
                          createVNode(_sfc_main$3, {
                            id: "working_hours",
                            modelValue: unref(form).working_hours,
                            "onUpdate:modelValue": ($event) => unref(form).working_hours = $event,
                            type: "text",
                            class: "mt-1 block w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_sfc_main$4, {
                            message: unref(form).errors.working_hours,
                            class: "mt-2"
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", null, [
                          createVNode(_sfc_main$2, {
                            for: "map_link",
                            value: "Посилання на Google Maps"
                          }),
                          createVNode(_sfc_main$3, {
                            id: "map_link",
                            modelValue: unref(form).map_link,
                            "onUpdate:modelValue": ($event) => unref(form).map_link = $event,
                            type: "url",
                            class: "mt-1 block w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_sfc_main$4, {
                            message: unref(form).errors.map_link,
                            class: "mt-2"
                          }, null, 8, ["message"])
                        ])
                      ])
                    ]),
                    createVNode("hr", { class: "my-6 border-gray-200" }),
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-6 items-start" }, [
                      createVNode("div", null, [
                        createVNode(_sfc_main$2, {
                          value: "Поточне фото",
                          class: "mb-2"
                        }),
                        unref(warehouse).image ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mb-4"
                        }, [
                          createVNode("img", {
                            src: unref(warehouse).image,
                            class: "h-32 w-48 object-cover rounded shadow",
                            alt: "Warehouse image"
                          }, null, 8, ["src"])
                        ])) : (openBlock(), createBlock("div", {
                          key: 1,
                          class: "mb-4 h-32 w-48 bg-gray-100 flex items-center justify-center rounded border border-dashed border-gray-300 text-gray-400 text-sm"
                        }, " Немає фото ")),
                        createVNode(_sfc_main$2, {
                          for: "image",
                          value: "Замінити фото"
                        }),
                        createVNode("input", {
                          id: "image",
                          type: "file",
                          class: "mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100",
                          onInput: ($event) => unref(form).image = $event.target.files[0]
                        }, null, 40, ["onInput"]),
                        createVNode(_sfc_main$4, {
                          message: unref(form).errors.image,
                          class: "mt-2"
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", null, [
                        createVNode(_sfc_main$2, {
                          for: "sort_order",
                          value: "Порядок сортування"
                        }),
                        createVNode(_sfc_main$3, {
                          id: "sort_order",
                          modelValue: unref(form).sort_order,
                          "onUpdate:modelValue": ($event) => unref(form).sort_order = $event,
                          type: "number",
                          class: "mt-1 block w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_sfc_main$4, {
                          message: unref(form).errors.sort_order,
                          class: "mt-2"
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", { class: "flex items-center h-full pt-6 md:pt-12" }, [
                        createVNode("label", { class: "flex items-center cursor-pointer" }, [
                          createVNode(_sfc_main$5, {
                            checked: unref(form).is_active,
                            "onUpdate:checked": ($event) => unref(form).is_active = $event
                          }, null, 8, ["checked", "onUpdate:checked"]),
                          createVNode("span", { class: "ml-2 text-sm text-gray-600 font-medium" }, "Склад активний")
                        ]),
                        createVNode(_sfc_main$4, {
                          message: unref(form).errors.is_active,
                          class: "mt-2"
                        }, null, 8, ["message"])
                      ])
                    ]),
                    createVNode("div", { class: "flex items-center justify-end mt-8 gap-4" }, [
                      createVNode(unref(link_default), {
                        href: _ctx.route("admin.settings.warehouses.index"),
                        class: "text-sm text-gray-600 hover:underline"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Скасувати зміни ")
                        ]),
                        _: 1
                      }, 8, ["href"]),
                      createVNode(PrimaryButton, {
                        class: { "opacity-25": unref(form).processing },
                        disabled: unref(form).processing
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Зберегти зміни ")
                        ]),
                        _: 1
                      }, 8, ["class", "disabled"])
                    ])
                  ], 32)
                ]),
                _ctx.$page.props.app.mode === "local" ? (openBlock(), createBlock("section", { key: 0 }, [
                  createVNode(_sfc_main$6, { data: __props.data }, null, 8, ["data"])
                ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Settings/Warehouses/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
