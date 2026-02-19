import { mergeProps, useSSRContext, computed, reactive, ref, unref, withCtx, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, Fragment, renderList, Transition } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import { _ as _sfc_main$2 } from "./DashboardAdminLayout-C8hFK239.js";
import { _ as _sfc_main$5 } from "./VarDump-0gz6Mom3.js";
import { router } from "@inertiajs/vue3";
import { _ as _sfc_main$3 } from "./ButtonTabGroup-DbwGHxsz.js";
import _sfc_main$4 from "./GeneralForm-ClKKxoZl.js";
import "./PrimaryButton-qPOvUO75.js";
import "@tabler/icons-vue";
import "./AdminLayout-Cwc9qJKB.js";
import "./ApplicationLogo-DsJOFw9w.js";
import "./ImageDataView-C9GsQUU8.js";
import "./UserStatus-DfjMQc-4.js";
import "./Breadcrumbs-Be9A5eey.js";
import "pinia";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./TextInput-C-4bWHj0.js";
import "./TextareaInput-DKTcDXJH.js";
const _sfc_main$1 = {
  __name: "ActionButtons",
  __ssrInlineRender: true,
  props: {
    loading: Boolean,
    buttons: {
      type: Array,
      required: true,
      default: ["import", "create"]
    },
    // Ми отримуємо функції як пропси, які викликаються при натисканні
    cancelAction: {
      type: Function,
      required: true
    },
    submitAction: {
      type: Function,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex space-x-4 relative z-20" }, _attrs))}><!--[-->`);
      ssrRenderList(props.buttons, (button) => {
        _push(`<ul><li><button type="button">${ssrInterpolate(button)}</button></li></ul>`);
      });
      _push(`<!--]--></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/UI/Buttons/Admin/ActionButtons.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: _sfc_main$2 }, {
  __name: "Edit",
  __ssrInlineRender: true,
  props: { data: Object, errors: Object },
  setup(__props) {
    const props = __props;
    const user = computed(() => props.data?.user || {});
    const form = reactive({
      _method: "put",
      id: user.value.id || "",
      name: user.value.name || "",
      email: user.value.email || "",
      last_name: user.value.last_name || "",
      phone: user.value.phone || "",
      description: user.value.description || "",
      avatar: null
    });
    const image = ref(user.value.avatar || null);
    const handleUpload = (file) => {
      form.avatar = file;
    };
    const loading = ref(false);
    const recentlySuccessful = ref(false);
    const submit = () => {
      router.post(route("admin.users.update", user.value.id), form, {
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
    const cancel = () => {
      router.visit(route("admin.users.index"));
    };
    const activeTab = ref(0);
    const tabs = ref([{ key: "general", label: "Profile" }]);
    function changeTab(index) {
      activeTab.value = index;
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col space-y-2 w-full" }, _attrs))}><section class="flex items-center justify-between pt-4"><span></span>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        loading: loading.value,
        "cancel-action": cancel,
        "submit-action": submit
      }, null, _parent));
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
                          form,
                          "initial-image": image.value,
                          errors: __props.errors,
                          onUploaded: handleUpload
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_sfc_main$4, {
                            form,
                            "initial-image": image.value,
                            errors: __props.errors,
                            onUploaded: handleUpload
                          }, null, 8, ["form", "initial-image", "errors"])
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
                              form,
                              "initial-image": image.value,
                              errors: __props.errors,
                              onUploaded: handleUpload
                            }, null, 8, ["form", "initial-image", "errors"])
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
                            form,
                            "initial-image": image.value,
                            errors: __props.errors,
                            onUploaded: handleUpload
                          }, null, 8, ["form", "initial-image", "errors"])
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
      _push(`</section><section>`);
      _push(ssrRenderComponent(_sfc_main$5, { data: form }, null, _parent));
      _push(`</section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Users/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
