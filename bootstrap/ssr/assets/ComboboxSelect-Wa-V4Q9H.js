import { ref, computed, watch, unref, mergeProps, withCtx, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode, Fragment, renderList, Transition, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { Combobox, ComboboxInput, ComboboxButton, ComboboxOptions, ComboboxOption } from "@headlessui/vue";
import { IconSelector, IconCheck } from "@tabler/icons-vue";
const _sfc_main = {
  __name: "ComboboxSelect",
  __ssrInlineRender: true,
  props: {
    modelValue: [Number, Object],
    // modelValue може бути як id, так і об'єктом
    items: { type: [Object, Array] }
    // Масив категорій [{ id, title }]
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const selected = ref(
      typeof props.modelValue === "object" ? props.modelValue : props.items.find((item) => item.id === props.modelValue) || null
    );
    const query = ref("");
    const filteredItems = computed(() => {
      return query.value === "" ? props.items : props.items.filter(
        (item) => item.title.toLowerCase().includes(query.value.toLowerCase())
      );
    });
    watch(selected, (newValue) => {
      emit("update:modelValue", newValue?.id || null);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Combobox), mergeProps({
        modelValue: selected.value,
        "onUpdate:modelValue": ($event) => selected.value = $event
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="relative mt-1"${_scopeId}><div class="relative w-full cursor-default overflow-hidden border rounded-md border-gray-300 shadow-sm"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(ComboboxInput), {
              onChange: ($event) => query.value = $event.target.value,
              displayValue: (item) => item?.title ?? "",
              autocomplete: "off",
              class: "w-full border-none py-3 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0",
              placeholder: "Select ..."
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(ComboboxButton), { class: "absolute inset-y-0 right-0 flex items-center pr-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(IconSelector), {
                    stroke: "{2}",
                    class: "h-5 w-5 text-gray-400",
                    "aria-hidden": "true"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(IconSelector), {
                      stroke: "{2}",
                      class: "h-5 w-5 text-gray-400",
                      "aria-hidden": "true"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(unref(ComboboxOptions), { class: "absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (filteredItems.value.length === 0 && query.value !== "") {
                    _push3(`<div class="relative cursor-default select-none px-4 py-2 text-gray-700"${_scopeId2}> Nothing found. </div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(ssrRenderComponent(unref(ComboboxOption), {
                    value: null,
                    as: "template"
                  }, {
                    default: withCtx(({ active }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<li class="${ssrRenderClass([{
                          "bg-purple-500 text-white": active,
                          "text-gray-900": !active
                        }, "relative cursor-default select-none py-2 pl-10 pr-4 text-slate-400 hover:text-white"])}"${_scopeId3}><span class="block truncate font-normal text-xs"${_scopeId3}>Empty...</span></li>`);
                      } else {
                        return [
                          createVNode("li", {
                            class: ["relative cursor-default select-none py-2 pl-10 pr-4 text-slate-400 hover:text-white", {
                              "bg-purple-500 text-white": active,
                              "text-gray-900": !active
                            }]
                          }, [
                            createVNode("span", { class: "block truncate font-normal text-xs" }, "Empty...")
                          ], 2)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<!--[-->`);
                  ssrRenderList(filteredItems.value, (item) => {
                    _push3(ssrRenderComponent(unref(ComboboxOption), {
                      key: item.id,
                      value: item,
                      as: "template"
                    }, {
                      default: withCtx(({ selected: selected2, active }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<li class="${ssrRenderClass([{
                            "bg-purple-500 text-white": active,
                            "text-gray-900": !active
                          }, "relative cursor-default select-none py-2 pl-10 pr-4 text-xs"])}"${_scopeId3}><span class="${ssrRenderClass([{
                            "font-medium": selected2,
                            "font-normal": !selected2
                          }, "block truncate"])}"${_scopeId3}>${ssrInterpolate(item.title)}</span>`);
                          if (selected2) {
                            _push4(`<span class="${ssrRenderClass([{
                              "text-white": active,
                              "text-purple-500": !active
                            }, "absolute inset-y-0 left-0 flex items-center pl-3"])}"${_scopeId3}>`);
                            _push4(ssrRenderComponent(unref(IconCheck), {
                              stroke: "{2}",
                              class: "h-5 w-5",
                              "aria-hidden": "true"
                            }, null, _parent4, _scopeId3));
                            _push4(`</span>`);
                          } else {
                            _push4(`<!---->`);
                          }
                          _push4(`</li>`);
                        } else {
                          return [
                            createVNode("li", {
                              class: ["relative cursor-default select-none py-2 pl-10 pr-4 text-xs", {
                                "bg-purple-500 text-white": active,
                                "text-gray-900": !active
                              }]
                            }, [
                              createVNode("span", {
                                class: ["block truncate", {
                                  "font-medium": selected2,
                                  "font-normal": !selected2
                                }]
                              }, toDisplayString(item.title), 3),
                              selected2 ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: ["absolute inset-y-0 left-0 flex items-center pl-3", {
                                  "text-white": active,
                                  "text-purple-500": !active
                                }]
                              }, [
                                createVNode(unref(IconCheck), {
                                  stroke: "{2}",
                                  class: "h-5 w-5",
                                  "aria-hidden": "true"
                                })
                              ], 2)) : createCommentVNode("", true)
                            ], 2)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    filteredItems.value.length === 0 && query.value !== "" ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "relative cursor-default select-none px-4 py-2 text-gray-700"
                    }, " Nothing found. ")) : createCommentVNode("", true),
                    createVNode(unref(ComboboxOption), {
                      value: null,
                      as: "template"
                    }, {
                      default: withCtx(({ active }) => [
                        createVNode("li", {
                          class: ["relative cursor-default select-none py-2 pl-10 pr-4 text-slate-400 hover:text-white", {
                            "bg-purple-500 text-white": active,
                            "text-gray-900": !active
                          }]
                        }, [
                          createVNode("span", { class: "block truncate font-normal text-xs" }, "Empty...")
                        ], 2)
                      ]),
                      _: 1
                    }),
                    (openBlock(true), createBlock(Fragment, null, renderList(filteredItems.value, (item) => {
                      return openBlock(), createBlock(unref(ComboboxOption), {
                        key: item.id,
                        value: item,
                        as: "template"
                      }, {
                        default: withCtx(({ selected: selected2, active }) => [
                          createVNode("li", {
                            class: ["relative cursor-default select-none py-2 pl-10 pr-4 text-xs", {
                              "bg-purple-500 text-white": active,
                              "text-gray-900": !active
                            }]
                          }, [
                            createVNode("span", {
                              class: ["block truncate", {
                                "font-medium": selected2,
                                "font-normal": !selected2
                              }]
                            }, toDisplayString(item.title), 3),
                            selected2 ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: ["absolute inset-y-0 left-0 flex items-center pl-3", {
                                "text-white": active,
                                "text-purple-500": !active
                              }]
                            }, [
                              createVNode(unref(IconCheck), {
                                stroke: "{2}",
                                class: "h-5 w-5",
                                "aria-hidden": "true"
                              })
                            ], 2)) : createCommentVNode("", true)
                          ], 2)
                        ]),
                        _: 2
                      }, 1032, ["value"]);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "relative mt-1" }, [
                createVNode("div", { class: "relative w-full cursor-default overflow-hidden border rounded-md border-gray-300 shadow-sm" }, [
                  createVNode(unref(ComboboxInput), {
                    onChange: ($event) => query.value = $event.target.value,
                    displayValue: (item) => item?.title ?? "",
                    autocomplete: "off",
                    class: "w-full border-none py-3 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0",
                    placeholder: "Select ..."
                  }, null, 8, ["onChange", "displayValue"]),
                  createVNode(unref(ComboboxButton), { class: "absolute inset-y-0 right-0 flex items-center pr-2" }, {
                    default: withCtx(() => [
                      createVNode(unref(IconSelector), {
                        stroke: "{2}",
                        class: "h-5 w-5 text-gray-400",
                        "aria-hidden": "true"
                      })
                    ]),
                    _: 1
                  })
                ]),
                createVNode(Transition, {
                  "enter-active-class": "transition duration-100 ease-out",
                  "enter-from-class": "transform scale-95 opacity-0",
                  "enter-to-class": "transform scale-100 opacity-100",
                  "leave-active-class": "transition duration-75 ease-out",
                  "leave-from-class": "transform scale-100 opacity-100",
                  "leave-to-class": "transform scale-95 opacity-0"
                }, {
                  default: withCtx(() => [
                    createVNode(unref(ComboboxOptions), { class: "absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm" }, {
                      default: withCtx(() => [
                        filteredItems.value.length === 0 && query.value !== "" ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "relative cursor-default select-none px-4 py-2 text-gray-700"
                        }, " Nothing found. ")) : createCommentVNode("", true),
                        createVNode(unref(ComboboxOption), {
                          value: null,
                          as: "template"
                        }, {
                          default: withCtx(({ active }) => [
                            createVNode("li", {
                              class: ["relative cursor-default select-none py-2 pl-10 pr-4 text-slate-400 hover:text-white", {
                                "bg-purple-500 text-white": active,
                                "text-gray-900": !active
                              }]
                            }, [
                              createVNode("span", { class: "block truncate font-normal text-xs" }, "Empty...")
                            ], 2)
                          ]),
                          _: 1
                        }),
                        (openBlock(true), createBlock(Fragment, null, renderList(filteredItems.value, (item) => {
                          return openBlock(), createBlock(unref(ComboboxOption), {
                            key: item.id,
                            value: item,
                            as: "template"
                          }, {
                            default: withCtx(({ selected: selected2, active }) => [
                              createVNode("li", {
                                class: ["relative cursor-default select-none py-2 pl-10 pr-4 text-xs", {
                                  "bg-purple-500 text-white": active,
                                  "text-gray-900": !active
                                }]
                              }, [
                                createVNode("span", {
                                  class: ["block truncate", {
                                    "font-medium": selected2,
                                    "font-normal": !selected2
                                  }]
                                }, toDisplayString(item.title), 3),
                                selected2 ? (openBlock(), createBlock("span", {
                                  key: 0,
                                  class: ["absolute inset-y-0 left-0 flex items-center pl-3", {
                                    "text-white": active,
                                    "text-purple-500": !active
                                  }]
                                }, [
                                  createVNode(unref(IconCheck), {
                                    stroke: "{2}",
                                    class: "h-5 w-5",
                                    "aria-hidden": "true"
                                  })
                                ], 2)) : createCommentVNode("", true)
                              ], 2)
                            ]),
                            _: 2
                          }, 1032, ["value"]);
                        }), 128))
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/UI/ComboboxSelect.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
