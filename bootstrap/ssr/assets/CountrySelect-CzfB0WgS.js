import { ref, computed, resolveComponent, unref, mergeProps, withCtx, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, createCommentVNode, Fragment, renderList, Transition, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate } from "vue/server-renderer";
import { Combobox, ComboboxInput, ComboboxButton, ComboboxOptions, ComboboxOption } from "@headlessui/vue";
import { IconSelector, IconCheck } from "@tabler/icons-vue";
const _sfc_main = {
  __name: "CountrySelect",
  __ssrInlineRender: true,
  props: {
    modelValue: [String, Number, Object],
    items: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const query = ref("");
    const selected = computed({
      get() {
        if (!props.modelValue) return null;
        if (typeof props.modelValue === "object") return props.modelValue;
        return props.items.find((i) => i.id === props.modelValue) || null;
      },
      set(value) {
        emit("update:modelValue", value?.id || null);
      }
    });
    const filteredItems = computed(() => {
      const s = query.value.toLowerCase().trim();
      return s === "" ? props.items : props.items.filter((item) => {
        return item.title.toLowerCase().includes(s) || item.id.toLowerCase().includes(s);
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_flag = resolveComponent("flag");
      _push(ssrRenderComponent(unref(Combobox), mergeProps({
        modelValue: selected.value,
        "onUpdate:modelValue": ($event) => selected.value = $event,
        as: "div"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="relative mt-1"${_scopeId}><div class="relative w-full cursor-default overflow-hidden border rounded-md border-gray-300 shadow-sm bg-white flex items-center focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-purple-500"${_scopeId}>`);
            if (selected.value) {
              _push2(`<div class="pl-3 flex items-center"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_flag, {
                iso: selected.value.id,
                class: "rounded-sm shadow-sm scale-110"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(unref(ComboboxInput), {
              class: "w-full border-none py-2.5 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0",
              onChange: ($event) => query.value = $event.target.value,
              displayValue: (item) => item?.title ?? "",
              autocomplete: "off",
              placeholder: "Search country..."
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(ComboboxButton), { class: "absolute inset-y-0 right-0 flex items-center pr-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(IconSelector), {
                    class: "h-5 w-5 text-gray-400",
                    "aria-hidden": "true"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(IconSelector), {
                      class: "h-5 w-5 text-gray-400",
                      "aria-hidden": "true"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(unref(ComboboxOptions), { class: "absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (filteredItems.value.length === 0 && query.value !== "") {
                    _push3(`<div class="relative cursor-default select-none px-4 py-2 text-gray-700"${_scopeId2}> Nothing found. </div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<!--[-->`);
                  ssrRenderList(filteredItems.value, (country) => {
                    _push3(ssrRenderComponent(unref(ComboboxOption), {
                      key: country.id,
                      value: country,
                      as: "template"
                    }, {
                      default: withCtx(({ selected: selected2, active }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<li class="${ssrRenderClass([{
                            "bg-purple-600 text-white": active,
                            "text-gray-900": !active
                          }, "relative cursor-default select-none py-2 pl-10 pr-4 flex items-center gap-3 transition-colors"])}"${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_flag, {
                            iso: country.id,
                            class: ["rounded-sm flex-shrink-0", { "ring-1 ring-white/30": active }]
                          }, null, _parent4, _scopeId3));
                          _push4(`<span class="${ssrRenderClass([{
                            "font-semibold": selected2,
                            "font-normal": !selected2
                          }, "block truncate"])}"${_scopeId3}>${ssrInterpolate(country.title)} <span class="ml-1 opacity-50 text-[10px] uppercase"${_scopeId3}>(${ssrInterpolate(country.id)})</span></span>`);
                          if (selected2) {
                            _push4(`<span class="${ssrRenderClass([{
                              "text-white": active,
                              "text-purple-600": !active
                            }, "absolute inset-y-0 left-0 flex items-center pl-3"])}"${_scopeId3}>`);
                            _push4(ssrRenderComponent(unref(IconCheck), {
                              class: "h-4 w-4",
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
                              class: ["relative cursor-default select-none py-2 pl-10 pr-4 flex items-center gap-3 transition-colors", {
                                "bg-purple-600 text-white": active,
                                "text-gray-900": !active
                              }]
                            }, [
                              createVNode(_component_flag, {
                                iso: country.id,
                                class: ["rounded-sm flex-shrink-0", { "ring-1 ring-white/30": active }]
                              }, null, 8, ["iso", "class"]),
                              createVNode("span", {
                                class: ["block truncate", {
                                  "font-semibold": selected2,
                                  "font-normal": !selected2
                                }]
                              }, [
                                createTextVNode(toDisplayString(country.title) + " ", 1),
                                createVNode("span", { class: "ml-1 opacity-50 text-[10px] uppercase" }, "(" + toDisplayString(country.id) + ")", 1)
                              ], 2),
                              selected2 ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: ["absolute inset-y-0 left-0 flex items-center pl-3", {
                                  "text-white": active,
                                  "text-purple-600": !active
                                }]
                              }, [
                                createVNode(unref(IconCheck), {
                                  class: "h-4 w-4",
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
                    (openBlock(true), createBlock(Fragment, null, renderList(filteredItems.value, (country) => {
                      return openBlock(), createBlock(unref(ComboboxOption), {
                        key: country.id,
                        value: country,
                        as: "template"
                      }, {
                        default: withCtx(({ selected: selected2, active }) => [
                          createVNode("li", {
                            class: ["relative cursor-default select-none py-2 pl-10 pr-4 flex items-center gap-3 transition-colors", {
                              "bg-purple-600 text-white": active,
                              "text-gray-900": !active
                            }]
                          }, [
                            createVNode(_component_flag, {
                              iso: country.id,
                              class: ["rounded-sm flex-shrink-0", { "ring-1 ring-white/30": active }]
                            }, null, 8, ["iso", "class"]),
                            createVNode("span", {
                              class: ["block truncate", {
                                "font-semibold": selected2,
                                "font-normal": !selected2
                              }]
                            }, [
                              createTextVNode(toDisplayString(country.title) + " ", 1),
                              createVNode("span", { class: "ml-1 opacity-50 text-[10px] uppercase" }, "(" + toDisplayString(country.id) + ")", 1)
                            ], 2),
                            selected2 ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: ["absolute inset-y-0 left-0 flex items-center pl-3", {
                                "text-white": active,
                                "text-purple-600": !active
                              }]
                            }, [
                              createVNode(unref(IconCheck), {
                                class: "h-4 w-4",
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
                createVNode("div", { class: "relative w-full cursor-default overflow-hidden border rounded-md border-gray-300 shadow-sm bg-white flex items-center focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-purple-500" }, [
                  selected.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "pl-3 flex items-center"
                  }, [
                    createVNode(_component_flag, {
                      iso: selected.value.id,
                      class: "rounded-sm shadow-sm scale-110"
                    }, null, 8, ["iso"])
                  ])) : createCommentVNode("", true),
                  createVNode(unref(ComboboxInput), {
                    class: "w-full border-none py-2.5 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0",
                    onChange: ($event) => query.value = $event.target.value,
                    displayValue: (item) => item?.title ?? "",
                    autocomplete: "off",
                    placeholder: "Search country..."
                  }, null, 8, ["onChange", "displayValue"]),
                  createVNode(unref(ComboboxButton), { class: "absolute inset-y-0 right-0 flex items-center pr-2" }, {
                    default: withCtx(() => [
                      createVNode(unref(IconSelector), {
                        class: "h-5 w-5 text-gray-400",
                        "aria-hidden": "true"
                      })
                    ]),
                    _: 1
                  })
                ]),
                createVNode(Transition, {
                  "leave-active-class": "transition duration-100 ease-in",
                  "leave-from-class": "opacity-100",
                  "leave-to-class": "opacity-0",
                  onAfterLeave: ($event) => query.value = ""
                }, {
                  default: withCtx(() => [
                    createVNode(unref(ComboboxOptions), { class: "absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm" }, {
                      default: withCtx(() => [
                        filteredItems.value.length === 0 && query.value !== "" ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "relative cursor-default select-none px-4 py-2 text-gray-700"
                        }, " Nothing found. ")) : createCommentVNode("", true),
                        (openBlock(true), createBlock(Fragment, null, renderList(filteredItems.value, (country) => {
                          return openBlock(), createBlock(unref(ComboboxOption), {
                            key: country.id,
                            value: country,
                            as: "template"
                          }, {
                            default: withCtx(({ selected: selected2, active }) => [
                              createVNode("li", {
                                class: ["relative cursor-default select-none py-2 pl-10 pr-4 flex items-center gap-3 transition-colors", {
                                  "bg-purple-600 text-white": active,
                                  "text-gray-900": !active
                                }]
                              }, [
                                createVNode(_component_flag, {
                                  iso: country.id,
                                  class: ["rounded-sm flex-shrink-0", { "ring-1 ring-white/30": active }]
                                }, null, 8, ["iso", "class"]),
                                createVNode("span", {
                                  class: ["block truncate", {
                                    "font-semibold": selected2,
                                    "font-normal": !selected2
                                  }]
                                }, [
                                  createTextVNode(toDisplayString(country.title) + " ", 1),
                                  createVNode("span", { class: "ml-1 opacity-50 text-[10px] uppercase" }, "(" + toDisplayString(country.id) + ")", 1)
                                ], 2),
                                selected2 ? (openBlock(), createBlock("span", {
                                  key: 0,
                                  class: ["absolute inset-y-0 left-0 flex items-center pl-3", {
                                    "text-white": active,
                                    "text-purple-600": !active
                                  }]
                                }, [
                                  createVNode(unref(IconCheck), {
                                    class: "h-4 w-4",
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
                }, 8, ["onAfterLeave"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/UI/CountrySelect.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
