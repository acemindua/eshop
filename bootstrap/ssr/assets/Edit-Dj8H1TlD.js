import { ref, onMounted, onUnmounted, onBeforeMount, mergeProps, unref, withCtx, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, Fragment, renderList, Transition, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$2 } from "./ButtonsGroup-D8p51V8y.js";
import { _ as _sfc_main$3 } from "./ButtonTabGroup-DbwGHxsz.js";
import { u as useTranslatableForm } from "./useTranslatableForm-DmbNuGu1.js";
import { _ as _sfc_main$1 } from "./CommerceAdminLayout-CESh8-0C.js";
import { _ as _sfc_main$8 } from "./VarDump-0gz6Mom3.js";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import _sfc_main$6 from "./DataForm-D8EvEaas.js";
import _sfc_main$5 from "./SEOForm-C8KDGKSi.js";
import _sfc_main$4 from "./GeneralForm-CquQd9g7.js";
import "../ssr.js";
import _sfc_main$7 from "./MediaForm-Qqh1aNzJ.js";
import { router } from "@inertiajs/core";
import "@tabler/icons-vue";
import "./useLocales-V6QHCGCa.js";
import "./AdminLayout-DtLa9qLf.js";
import "./ApplicationLogo-DsJOFw9w.js";
import "./ImageDataView-C9GsQUU8.js";
import "./UserStatus-DfjMQc-4.js";
import "./Breadcrumbs-DA__G0nP.js";
import "pinia";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./CheckBoxSwitcher-DfwzQzd4.js";
import "./ComboboxSelect-Wa-V4Q9H.js";
import "./CountrySelect-CzfB0WgS.js";
import "./InputError-Cp3nFeNd.js";
import "./TextInput-Dmmb8A31.js";
import "./LanguagesTabs-CXAeyLbK.js";
import "./TranslationSEOContent-OujxBBMR.js";
import "./TextareaInput-DKTcDXJH.js";
import "./TranslationContent-DZvv5b0k.js";
import "./TextEditor-DBvoj_v9.js";
import "@ckeditor/ckeditor5-vue";
import "ckeditor5";
import "@wiris/mathtype-ckeditor5/dist/index.js";
import "@vue/shared";
import "@vue/compiler-ssr";
import "node:stream";
import "lodash-es";
import "laravel-precognition";
import "@inertiajs/core/server";
import "@floating-ui/dom";
import "axios";
import "sortablejs";
const _sfc_main = /* @__PURE__ */ Object.assign({
  layout: _sfc_main$1
}, {
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    data: Object,
    errors: Object
  },
  setup(__props) {
    const props = __props;
    const isScrolled = ref(false);
    const scrollAnchor = ref(null);
    let observer = null;
    onMounted(() => {
      const scrollContainer = document.querySelector(
        ".flex-grow.overflow-y-auto"
      );
      observer = new IntersectionObserver(
        ([entry]) => {
          isScrolled.value = !entry.isIntersecting;
        },
        {
          root: scrollContainer,
          // Створюємо "відступ" знизу від верхньої межі.
          // -100px означає, що подія спрацює, коли ви прокрутите 100px вниз.
          rootMargin: "0px 0px 0px 0px",
          threshold: 0
        }
      );
      if (scrollAnchor.value) {
        observer.observe(scrollAnchor.value);
      }
    });
    onUnmounted(() => {
      if (observer) observer.disconnect();
    });
    const activeTab = ref(0);
    const tabs = ref([
      { key: "general", label: "General" },
      { key: "seo", label: "SEO" },
      { key: "data", label: "Data" },
      { key: "media", label: "Media" }
    ]);
    const isEditing = ref(true);
    const loading = ref(false);
    const recentlySuccessful = ref(false);
    const translatedAttributes = [
      "title",
      "slug",
      "description",
      "content",
      "meta_title",
      "meta_description",
      "meta_keywords"
    ];
    const { form, fillForm } = useTranslatableForm(translatedAttributes);
    function changeTab(index) {
      activeTab.value = index;
    }
    onBeforeMount(() => {
      if (props.data?.item) {
        fillForm(props.data?.item);
      }
    });
    const handleCancel = () => {
      router.visit(route("admin.items.index"));
    };
    const handleSave = () => {
      router.post(route("admin.items.update", props.data.item.id), form, {
        forceFormData: true,
        preserveState: true,
        onStart: () => loading.value = true,
        onSuccess: () => {
          recentlySuccessful.value = true;
          setTimeout(() => recentlySuccessful.value = false, 3e3);
        },
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col space-y-2" }, _attrs))}><section class="flex items-center justify-between pt-4"><span></span>`);
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
                        _push4(ssrRenderComponent(_sfc_main$5, {
                          form: unref(form),
                          errors: __props.errors,
                          "is-editing": isEditing.value
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_sfc_main$5, {
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
                        _push4(ssrRenderComponent(_sfc_main$6, {
                          form: unref(form),
                          data: __props.data,
                          errors: __props.errors,
                          "is-editing": isEditing.value
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_sfc_main$6, {
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
                  _push3(`</template><template>`);
                  _push3(ssrRenderComponent(unref(TabPanel), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_sfc_main$7, {
                          form: unref(form),
                          "model-id": unref(form).id,
                          "model-type": "Item",
                          collection: "images",
                          errors: __props.errors,
                          "is-editing": isEditing.value
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_sfc_main$7, {
                            form: unref(form),
                            "model-id": unref(form).id,
                            "model-type": "Item",
                            collection: "images",
                            errors: __props.errors,
                            "is-editing": isEditing.value
                          }, null, 8, ["form", "model-id", "errors", "is-editing"])
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
                            createVNode(_sfc_main$5, {
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
                            createVNode(_sfc_main$6, {
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
                    }),
                    createVNode(Transition, {
                      name: "slot-fade",
                      mode: "out-in",
                      appear: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(TabPanel), null, {
                          default: withCtx(() => [
                            createVNode(_sfc_main$7, {
                              form: unref(form),
                              "model-id": unref(form).id,
                              "model-type": "Item",
                              collection: "images",
                              errors: __props.errors,
                              "is-editing": isEditing.value
                            }, null, 8, ["form", "model-id", "errors", "is-editing"])
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
                          createVNode(_sfc_main$5, {
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
                          createVNode(_sfc_main$6, {
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
                  }),
                  createVNode(Transition, {
                    name: "slot-fade",
                    mode: "out-in",
                    appear: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(TabPanel), null, {
                        default: withCtx(() => [
                          createVNode(_sfc_main$7, {
                            form: unref(form),
                            "model-id": unref(form).id,
                            "model-type": "Item",
                            collection: "images",
                            errors: __props.errors,
                            "is-editing": isEditing.value
                          }, null, 8, ["form", "model-id", "errors", "is-editing"])
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
        _push(ssrRenderComponent(_sfc_main$8, { data: __props.data }, null, _parent));
        _push(`</section>`);
      } else {
        _push(`<!---->`);
      }
      if (isScrolled.value) {
        _push(`<div class="fixed bottom-6 right-[30%] md:rigth-[50%]">`);
        _push(ssrRenderComponent(_sfc_main$2, { buttons: actionButtons }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Commerce/Items/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
