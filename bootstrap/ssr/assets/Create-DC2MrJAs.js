import { ref, onBeforeMount, unref, withCtx, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, Fragment, renderList, Transition, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { h as head_default } from "../ssr.js";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import { _ as _sfc_main$1 } from "./SettingsAdminLayout-mzHE5KVK.js";
import { _ as _sfc_main$2 } from "./ButtonsGroup-D8p51V8y.js";
import { _ as _sfc_main$3 } from "./ButtonTabGroup-DbwGHxsz.js";
import { _ as _sfc_main$5 } from "./VarDump-0gz6Mom3.js";
import _sfc_main$4 from "./GeneralForm-DpTTDQIi.js";
import DataForm from "./DataForm-zShkiiJw.js";
import { u as useTranslatableForm } from "./useTranslatableForm-DmbNuGu1.js";
import { router } from "@inertiajs/core";
import "@vue/shared";
import "@vue/compiler-ssr";
import "node:stream";
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
import "./LanguagesTabs-CXAeyLbK.js";
import "./TranslationContent-Wl77zc-R.js";
import "./InputError-Cp3nFeNd.js";
import "./TextInput-Dmmb8A31.js";
import "./TextareaInput-DKTcDXJH.js";
import "./TextEditor-DBvoj_v9.js";
import "@ckeditor/ckeditor5-vue";
import "ckeditor5";
import "@wiris/mathtype-ckeditor5/dist/index.js";
import "./CheckBoxSwitcher-DfwzQzd4.js";
import "./useLocales-V6QHCGCa.js";
const _sfc_main = /* @__PURE__ */ Object.assign({
  layout: _sfc_main$1
}, {
  __name: "Create",
  __ssrInlineRender: true,
  props: {
    data: {
      type: Object,
      default: () => ({})
      // Повертаємо порожній об'єкт замість undefined
    },
    errors: Object
  },
  setup(__props) {
    const props = __props;
    const activeTab = ref(0);
    const isEditing = ref(false);
    const loading = ref(false);
    const tabs = ref([
      { key: "general", label: "General Content" },
      { key: "data", label: "Technical Data" }
    ]);
    const translatedAttributes = ["title", "description", "payment_details"];
    const { form, initForm } = useTranslatableForm(translatedAttributes);
    function changeTab(index) {
      activeTab.value = index;
    }
    onBeforeMount(() => {
      initForm(props.data);
      const defaultTechnicalFields = {
        code: "",
        driver: "manual",
        sort_order: 0,
        is_active: 1,
        commission_percent: 0,
        commission_fixed: 0
      };
      Object.assign(form, { ...defaultTechnicalFields, ...props.data });
    });
    const handleCancel = () => {
      router.visit(route("admin.settings.payment-methods.index"));
    };
    const handleSave = () => {
      router.post(route("admin.settings.payment-methods.store"), form, {
        preserveState: true,
        onStart: () => loading.value = true,
        onFinish: () => loading.value = false
      });
    };
    const actionButtons = [
      {
        label: "cancel",
        action: handleCancel,
        type: "secondary",
        icon: "IconCancel"
      },
      {
        label: "save",
        loadingLabel: "Saving...",
        action: handleSave,
        type: "primary",
        icon: "IconDeviceFloppy"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(head_default), {
        title: _ctx.$t("Create Payment Method")
      }, null, _parent));
      _push(`<div class="flex flex-col space-y-2"><section class="flex items-center justify-between pt-4"><span></span>`);
      _push(ssrRenderComponent(_sfc_main$2, { buttons: actionButtons }, null, _parent));
      _push(`</section><section>`);
      _push(ssrRenderComponent(unref(TabGroup), {
        selectedIndex: activeTab.value,
        onChange: changeTab
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(TabList), { class: "flex items-center w-full border-b border-gray-300" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(tabs.value, (tab) => {
                    _push3(ssrRenderComponent(unref(Tab), {
                      key: tab.key,
                      as: "template"
                    }, {
                      default: withCtx(({ selected }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_sfc_main$3, { selected }, {
                            default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(_ctx.$t(tab.label))}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(_ctx.$t(tab.label)), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_sfc_main$3, { selected }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(_ctx.$t(tab.label)), 1)
                              ]),
                              _: 2
                            }, 1032, ["selected"])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(tabs.value, (tab) => {
                      return openBlock(), createBlock(unref(Tab), {
                        key: tab.key,
                        as: "template"
                      }, {
                        default: withCtx(({ selected }) => [
                          createVNode(_sfc_main$3, { selected }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(_ctx.$t(tab.label)), 1)
                            ]),
                            _: 2
                          }, 1032, ["selected"])
                        ]),
                        _: 2
                      }, 1024);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(TabPanels), { class: "mt-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<template>`);
                  _push3(ssrRenderComponent(unref(TabPanel), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_sfc_main$4, {
                          form: unref(form),
                          errors: __props.errors,
                          "is-editing": isEditing.value
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_sfc_main$4, {
                            form: unref(form),
                            errors: __props.errors,
                            "is-editing": isEditing.value
                          }, null, 8, ["form", "errors", "is-editing"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</template><template>`);
                  _push3(ssrRenderComponent(unref(TabPanel), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(DataForm, {
                          form: unref(form),
                          data: __props.data,
                          errors: __props.errors,
                          "is-editing": isEditing.value
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(DataForm, {
                            form: unref(form),
                            data: __props.data,
                            errors: __props.errors,
                            "is-editing": isEditing.value
                          }, null, 8, ["form", "data", "errors", "is-editing"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</template>`);
                } else {
                  return [
                    createVNode(Transition, {
                      name: "slot-fade",
                      mode: "out-in",
                      appear: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(TabPanel), null, {
                          default: withCtx(() => [
                            createVNode(_sfc_main$4, {
                              form: unref(form),
                              errors: __props.errors,
                              "is-editing": isEditing.value
                            }, null, 8, ["form", "errors", "is-editing"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(Transition, {
                      name: "slot-fade",
                      mode: "out-in",
                      appear: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(TabPanel), null, {
                          default: withCtx(() => [
                            createVNode(DataForm, {
                              form: unref(form),
                              data: __props.data,
                              errors: __props.errors,
                              "is-editing": isEditing.value
                            }, null, 8, ["form", "data", "errors", "is-editing"])
                          ]),
                          _: 1
                        })
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
              createVNode(unref(TabList), { class: "flex items-center w-full border-b border-gray-300" }, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(tabs.value, (tab) => {
                    return openBlock(), createBlock(unref(Tab), {
                      key: tab.key,
                      as: "template"
                    }, {
                      default: withCtx(({ selected }) => [
                        createVNode(_sfc_main$3, { selected }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(_ctx.$t(tab.label)), 1)
                          ]),
                          _: 2
                        }, 1032, ["selected"])
                      ]),
                      _: 2
                    }, 1024);
                  }), 128))
                ]),
                _: 1
              }),
              createVNode(unref(TabPanels), { class: "mt-2" }, {
                default: withCtx(() => [
                  createVNode(Transition, {
                    name: "slot-fade",
                    mode: "out-in",
                    appear: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(TabPanel), null, {
                        default: withCtx(() => [
                          createVNode(_sfc_main$4, {
                            form: unref(form),
                            errors: __props.errors,
                            "is-editing": isEditing.value
                          }, null, 8, ["form", "errors", "is-editing"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(Transition, {
                    name: "slot-fade",
                    mode: "out-in",
                    appear: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(TabPanel), null, {
                        default: withCtx(() => [
                          createVNode(DataForm, {
                            form: unref(form),
                            data: __props.data,
                            errors: __props.errors,
                            "is-editing": isEditing.value
                          }, null, 8, ["form", "data", "errors", "is-editing"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section>`);
      if (_ctx.$page.props.app.mode === "local") {
        _push(`<section>`);
        _push(ssrRenderComponent(_sfc_main$5, {
          data: { form: unref(form), data: __props.data }
        }, null, _parent));
        _push(`</section>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Settings/PaymentMethods/Create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
