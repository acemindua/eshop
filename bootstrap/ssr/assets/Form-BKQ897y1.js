import { ref, onBeforeMount, computed, mergeProps, withCtx, unref, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, createCommentVNode, Fragment, renderList, resolveDynamicComponent, Transition, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderVNode } from "vue/server-renderer";
import "../ssr.js";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import { _ as _sfc_main$1 } from "./DashboardAdminLayout-syA0R-Os.js";
import { _ as _sfc_main$5 } from "./StickyActions-VokjrCI0.js";
import { _ as _sfc_main$6 } from "./ButtonTabGroup-DbwGHxsz.js";
import { V as VarDump } from "./VarDump-DqvrPBoK.js";
import _sfc_main$2 from "./GeneralForm-GXaO3uRS.js";
import _sfc_main$3 from "./SeoForm-C3dSPWvd.js";
import _sfc_main$4 from "./DataForm-weu3pX9I.js";
import { u as useTranslatableForm } from "./useTranslatableForm-CkxPCqve.js";
import { router } from "@inertiajs/core";
import "@vue/shared";
import "@vue/compiler-ssr";
import "node:stream";
import "lodash-es";
import "laravel-precognition";
import "@inertiajs/core/server";
import "pinia";
import "@floating-ui/dom";
import "./AdminLayout-BRIf9gc0.js";
import "./Breadcrumbs-DA__G0nP.js";
import "@tabler/icons-vue";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./ApplicationLogo-DsJOFw9w.js";
import "./useLocales-V6QHCGCa.js";
import "./ButtonsGroup-CwkMyX54.js";
import "./LanguagesTabs-cLOUJkB8.js";
import "./TranslationContent-b8__8l34.js";
import "./InputError-Cp3nFeNd.js";
import "./TextInput-Dmmb8A31.js";
import "./TextEditor-sUHg17QC.js";
import "@ckeditor/ckeditor5-vue";
import "ckeditor5";
import "@wiris/mathtype-ckeditor5/dist/index.js";
import "./TextareaInput-DKTcDXJH.js";
import "./TranslationSEOContent-DLPm0vLl.js";
import "./CheckBoxSwitcher-DfwzQzd4.js";
const model = "pages";
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: _sfc_main$1 }, {
  __name: "Form",
  __ssrInlineRender: true,
  props: {
    data: { type: Object, default: () => ({}) },
    errors: { type: Object, default: () => ({}) }
  },
  setup(__props) {
    const props = __props;
    const modelId = props.data?.page?.id || null;
    const isEditing = ref(!!modelId);
    const activeTab = ref(0);
    const tabs = [
      {
        key: "general",
        label: "General",
        component: _sfc_main$2,
        fields: ["title", "description", "content"]
      },
      {
        key: "seo",
        label: "SEO",
        component: _sfc_main$3,
        fields: ["slug", "meta_title", "meta_description", "meta_keywords"]
      },
      {
        key: "data",
        label: "Data",
        component: _sfc_main$4,
        fields: ["public", "order"]
        // Системні поля
      }
    ];
    const { form, fillForm, initForm } = useTranslatableForm(
      tabs.flatMap((t) => t.fields).filter((f) => !["public", "order"].includes(f))
    );
    onBeforeMount(() => {
      if (isEditing.value) {
        fillForm(props.data?.page);
      } else initForm(props.data);
    });
    const hasTabErrors = (tab) => {
      const errorKeys = Object.keys(props.errors);
      if (errorKeys.length === 0) return false;
      return errorKeys.some((errorKey) => {
        return tab.fields.some((field) => {
          return errorKey === field || errorKey.endsWith(`.${field}`);
        });
      });
    };
    const handleSave = () => {
      const url = isEditing.value ? route(`admin.${model}.update`, modelId) : route(`admin.${model}.store`);
      router.post(
        url,
        { ...form, _method: isEditing.value ? "PUT" : "POST" },
        {
          forceFormData: true,
          preserveState: true
        }
      );
    };
    const actionButtons = computed(() => [
      {
        label: "cancel",
        action: () => router.visit(route(`admin.${model}.index`)),
        type: "secondary",
        icon: "IconCancel",
        loading: form.processing
      },
      {
        label: "save",
        loadingLabel: "Saving...",
        action: handleSave,
        type: "primary",
        icon: "IconDeviceFloppy",
        loading: form.processing
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$5, { buttons: actionButtons.value }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(TabGroup), {
              selectedIndex: activeTab.value,
              onChange: (index) => activeTab.value = index
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(TabList), { class: "flex items-center w-full border-b border-gray-300" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(tabs, (tab) => {
                          _push4(ssrRenderComponent(unref(Tab), {
                            key: tab.key,
                            as: "template"
                          }, {
                            default: withCtx(({ selected }, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_sfc_main$6, { selected }, {
                                  default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<div class="flex items-center gap-2"${_scopeId5}>${ssrInterpolate(_ctx.$t(tab.label))} `);
                                      if (hasTabErrors(tab)) {
                                        _push6(`<span class="w-2 h-2 bg-red-500 rounded-full animate-pulse"${_scopeId5}></span>`);
                                      } else {
                                        _push6(`<!---->`);
                                      }
                                      _push6(`</div>`);
                                    } else {
                                      return [
                                        createVNode("div", { class: "flex items-center gap-2" }, [
                                          createTextVNode(toDisplayString(_ctx.$t(tab.label)) + " ", 1),
                                          hasTabErrors(tab) ? (openBlock(), createBlock("span", {
                                            key: 0,
                                            class: "w-2 h-2 bg-red-500 rounded-full animate-pulse"
                                          })) : createCommentVNode("", true)
                                        ])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_sfc_main$6, { selected }, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "flex items-center gap-2" }, [
                                        createTextVNode(toDisplayString(_ctx.$t(tab.label)) + " ", 1),
                                        hasTabErrors(tab) ? (openBlock(), createBlock("span", {
                                          key: 0,
                                          class: "w-2 h-2 bg-red-500 rounded-full animate-pulse"
                                        })) : createCommentVNode("", true)
                                      ])
                                    ]),
                                    _: 2
                                  }, 1032, ["selected"])
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(), createBlock(Fragment, null, renderList(tabs, (tab) => {
                            return createVNode(unref(Tab), {
                              key: tab.key,
                              as: "template"
                            }, {
                              default: withCtx(({ selected }) => [
                                createVNode(_sfc_main$6, { selected }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "flex items-center gap-2" }, [
                                      createTextVNode(toDisplayString(_ctx.$t(tab.label)) + " ", 1),
                                      hasTabErrors(tab) ? (openBlock(), createBlock("span", {
                                        key: 0,
                                        class: "w-2 h-2 bg-red-500 rounded-full animate-pulse"
                                      })) : createCommentVNode("", true)
                                    ])
                                  ]),
                                  _: 2
                                }, 1032, ["selected"])
                              ]),
                              _: 2
                            }, 1024);
                          }), 64))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(TabPanels), { class: "mt-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(tabs, (tab) => {
                          _push4(ssrRenderComponent(unref(TabPanel), {
                            key: tab.key
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<template>`);
                                ssrRenderVNode(_push5, createVNode(resolveDynamicComponent(tab.component), {
                                  form: unref(form),
                                  errors: __props.errors,
                                  data: __props.data,
                                  "is-editing": isEditing.value,
                                  fields: tab.fields
                                }, null), _parent5, _scopeId4);
                                _push5(`</template>`);
                              } else {
                                return [
                                  createVNode(Transition, {
                                    name: "slot-fade",
                                    mode: "out-in",
                                    appear: ""
                                  }, {
                                    default: withCtx(() => [
                                      (openBlock(), createBlock(resolveDynamicComponent(tab.component), {
                                        form: unref(form),
                                        errors: __props.errors,
                                        data: __props.data,
                                        "is-editing": isEditing.value,
                                        fields: tab.fields
                                      }, null, 8, ["form", "errors", "data", "is-editing", "fields"]))
                                    ]),
                                    _: 2
                                  }, 1024)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(), createBlock(Fragment, null, renderList(tabs, (tab) => {
                            return createVNode(unref(TabPanel), {
                              key: tab.key
                            }, {
                              default: withCtx(() => [
                                createVNode(Transition, {
                                  name: "slot-fade",
                                  mode: "out-in",
                                  appear: ""
                                }, {
                                  default: withCtx(() => [
                                    (openBlock(), createBlock(resolveDynamicComponent(tab.component), {
                                      form: unref(form),
                                      errors: __props.errors,
                                      data: __props.data,
                                      "is-editing": isEditing.value,
                                      fields: tab.fields
                                    }, null, 8, ["form", "errors", "data", "is-editing", "fields"]))
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1024);
                          }), 64))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(TabList), { class: "flex items-center w-full border-b border-gray-300" }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(Fragment, null, renderList(tabs, (tab) => {
                          return createVNode(unref(Tab), {
                            key: tab.key,
                            as: "template"
                          }, {
                            default: withCtx(({ selected }) => [
                              createVNode(_sfc_main$6, { selected }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "flex items-center gap-2" }, [
                                    createTextVNode(toDisplayString(_ctx.$t(tab.label)) + " ", 1),
                                    hasTabErrors(tab) ? (openBlock(), createBlock("span", {
                                      key: 0,
                                      class: "w-2 h-2 bg-red-500 rounded-full animate-pulse"
                                    })) : createCommentVNode("", true)
                                  ])
                                ]),
                                _: 2
                              }, 1032, ["selected"])
                            ]),
                            _: 2
                          }, 1024);
                        }), 64))
                      ]),
                      _: 1
                    }),
                    createVNode(unref(TabPanels), { class: "mt-2" }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(Fragment, null, renderList(tabs, (tab) => {
                          return createVNode(unref(TabPanel), {
                            key: tab.key
                          }, {
                            default: withCtx(() => [
                              createVNode(Transition, {
                                name: "slot-fade",
                                mode: "out-in",
                                appear: ""
                              }, {
                                default: withCtx(() => [
                                  (openBlock(), createBlock(resolveDynamicComponent(tab.component), {
                                    form: unref(form),
                                    errors: __props.errors,
                                    data: __props.data,
                                    "is-editing": isEditing.value,
                                    fields: tab.fields
                                  }, null, 8, ["form", "errors", "data", "is-editing", "fields"]))
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            _: 2
                          }, 1024);
                        }), 64))
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(TabGroup), {
                selectedIndex: activeTab.value,
                onChange: (index) => activeTab.value = index
              }, {
                default: withCtx(() => [
                  createVNode(unref(TabList), { class: "flex items-center w-full border-b border-gray-300" }, {
                    default: withCtx(() => [
                      (openBlock(), createBlock(Fragment, null, renderList(tabs, (tab) => {
                        return createVNode(unref(Tab), {
                          key: tab.key,
                          as: "template"
                        }, {
                          default: withCtx(({ selected }) => [
                            createVNode(_sfc_main$6, { selected }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "flex items-center gap-2" }, [
                                  createTextVNode(toDisplayString(_ctx.$t(tab.label)) + " ", 1),
                                  hasTabErrors(tab) ? (openBlock(), createBlock("span", {
                                    key: 0,
                                    class: "w-2 h-2 bg-red-500 rounded-full animate-pulse"
                                  })) : createCommentVNode("", true)
                                ])
                              ]),
                              _: 2
                            }, 1032, ["selected"])
                          ]),
                          _: 2
                        }, 1024);
                      }), 64))
                    ]),
                    _: 1
                  }),
                  createVNode(unref(TabPanels), { class: "mt-2" }, {
                    default: withCtx(() => [
                      (openBlock(), createBlock(Fragment, null, renderList(tabs, (tab) => {
                        return createVNode(unref(TabPanel), {
                          key: tab.key
                        }, {
                          default: withCtx(() => [
                            createVNode(Transition, {
                              name: "slot-fade",
                              mode: "out-in",
                              appear: ""
                            }, {
                              default: withCtx(() => [
                                (openBlock(), createBlock(resolveDynamicComponent(tab.component), {
                                  form: unref(form),
                                  errors: __props.errors,
                                  data: __props.data,
                                  "is-editing": isEditing.value,
                                  fields: tab.fields
                                }, null, 8, ["form", "errors", "data", "is-editing", "fields"]))
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1024);
                      }), 64))
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["selectedIndex", "onChange"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="mt-4">`);
      _push(ssrRenderComponent(VarDump, { data: unref(form) }, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Dashboard/Pages/Form.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
