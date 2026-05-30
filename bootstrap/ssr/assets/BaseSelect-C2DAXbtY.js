import { useModel, mergeProps, unref, withCtx, openBlock, createBlock, renderSlot, createCommentVNode, createVNode, toDisplayString, Fragment, renderList, mergeModels, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrRenderList, ssrRenderClass, ssrInterpolate } from "vue/server-renderer";
import { Combobox, ComboboxButton, ComboboxInput, TransitionRoot, ComboboxOptions, ComboboxOption } from "@headlessui/vue";
const _sfc_main = {
  __name: "BaseSelect",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    options: {
      type: Array,
      default: () => []
    },
    label: String,
    placeholder: String,
    loading: Boolean,
    displayKey: { type: String, default: "name" },
    showCheck: { type: Boolean, default: true },
    isStatic: Boolean,
    error: Boolean
  }, {
    "modelValue": { type: [Object, null], required: true },
    "modelModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["query-change"], ["update:modelValue"]),
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const model = useModel(__props, "modelValue");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative w-full" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(Combobox), {
        modelValue: model.value,
        "onUpdate:modelValue": ($event) => model.value = $event,
        nullable: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="relative"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(ComboboxButton), {
              as: "div",
              class: "w-full"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (_ctx.$slots.leading) {
                    _push3(`<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400 dark:text-slate-500"${_scopeId2}>`);
                    ssrRenderSlot(_ctx.$slots, "leading", {}, null, _push3, _parent3, _scopeId2);
                    _push3(`</div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(ssrRenderComponent(unref(ComboboxInput), {
                    class: ["w-full rounded-lg border py-2.5 text-sm shadow-sm transition-colors duration-200 outline-none focus:ring-4", [
                      "bg-white text-slate-900 placeholder-slate-400 dark:bg-slate-900 dark:text-slate-100 dark:placeholder-slate-500",
                      __props.error ? "border-red-500 focus:border-red-500 focus:ring-red-500/10 dark:border-red-500/80" : "border-slate-200 hover:border-slate-300 focus:border-indigo-500 focus:ring-indigo-500/10 dark:border-slate-700 dark:hover:border-slate-600 dark:focus:border-indigo-500",
                      // Динамічний відступ зліва, якщо є іконка
                      _ctx.$slots.leading ? "pl-10 pr-10" : "px-3",
                      { "cursor-pointer": __props.isStatic }
                    ]],
                    placeholder: __props.placeholder,
                    displayValue: (v) => v ? v[__props.displayKey] : "",
                    autocomplete: "off",
                    onChange: ($event) => emit("query-change", $event.target.value)
                  }, null, _parent3, _scopeId2));
                  _push3(`<div class="absolute inset-y-0 right-0 flex items-center pr-2.5 pointer-events-none text-slate-400 dark:text-slate-500"${_scopeId2}><svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"${_scopeId2}></path></svg></div>`);
                } else {
                  return [
                    _ctx.$slots.leading ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400 dark:text-slate-500"
                    }, [
                      renderSlot(_ctx.$slots, "leading")
                    ])) : createCommentVNode("", true),
                    createVNode(unref(ComboboxInput), {
                      class: ["w-full rounded-lg border py-2.5 text-sm shadow-sm transition-colors duration-200 outline-none focus:ring-4", [
                        "bg-white text-slate-900 placeholder-slate-400 dark:bg-slate-900 dark:text-slate-100 dark:placeholder-slate-500",
                        __props.error ? "border-red-500 focus:border-red-500 focus:ring-red-500/10 dark:border-red-500/80" : "border-slate-200 hover:border-slate-300 focus:border-indigo-500 focus:ring-indigo-500/10 dark:border-slate-700 dark:hover:border-slate-600 dark:focus:border-indigo-500",
                        // Динамічний відступ зліва, якщо є іконка
                        _ctx.$slots.leading ? "pl-10 pr-10" : "px-3",
                        { "cursor-pointer": __props.isStatic }
                      ]],
                      placeholder: __props.placeholder,
                      displayValue: (v) => v ? v[__props.displayKey] : "",
                      autocomplete: "off",
                      onChange: ($event) => emit("query-change", $event.target.value)
                    }, null, 8, ["class", "placeholder", "displayValue", "onChange"]),
                    createVNode("div", { class: "absolute inset-y-0 right-0 flex items-center pr-2.5 pointer-events-none text-slate-400 dark:text-slate-500" }, [
                      (openBlock(), createBlock("svg", {
                        class: "h-4 w-4",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M19 9l-7 7-7-7"
                        })
                      ]))
                    ])
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(TransitionRoot), {
              leave: "transition ease-in duration-100",
              leaveTo: "opacity-0"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ComboboxOptions), { class: "absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-slate-200 bg-white p-1 text-sm shadow-lg dark:border-slate-700 dark:bg-slate-800" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(__props.options, (item) => {
                          _push4(ssrRenderComponent(unref(ComboboxOption), {
                            key: item.ref || item.id || item[__props.displayKey],
                            value: item
                          }, {
                            default: withCtx(({ active, selected }, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<li class="${ssrRenderClass([[
                                  active ? "bg-indigo-600 text-white dark:bg-indigo-500" : selected ? "bg-slate-100 dark:bg-slate-700/50" : ""
                                ], "relative flex items-center justify-between cursor-pointer select-none rounded-md px-3 py-2 text-slate-900 transition-colors dark:text-slate-100"])}"${_scopeId4}><div class="flex items-center gap-2.5"${_scopeId4}>`);
                                ssrRenderSlot(_ctx.$slots, "option", {
                                  item,
                                  selected,
                                  active
                                }, () => {
                                  _push5(`<span class="${ssrRenderClass({
                                    "font-semibold": selected
                                  })}"${_scopeId4}>${ssrInterpolate(item[__props.displayKey])}</span>`);
                                }, _push5, _parent5, _scopeId4);
                                _push5(`</div>`);
                                if (selected && __props.showCheck) {
                                  _push5(`<span class="${ssrRenderClass(
                                    active ? "text-white" : "text-indigo-600 dark:text-indigo-400"
                                  )}"${_scopeId4}><svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"${_scopeId4}><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd"${_scopeId4}></path></svg></span>`);
                                } else {
                                  _push5(`<!---->`);
                                }
                                _push5(`</li>`);
                              } else {
                                return [
                                  createVNode("li", {
                                    class: ["relative flex items-center justify-between cursor-pointer select-none rounded-md px-3 py-2 text-slate-900 transition-colors dark:text-slate-100", [
                                      active ? "bg-indigo-600 text-white dark:bg-indigo-500" : selected ? "bg-slate-100 dark:bg-slate-700/50" : ""
                                    ]]
                                  }, [
                                    createVNode("div", { class: "flex items-center gap-2.5" }, [
                                      renderSlot(_ctx.$slots, "option", {
                                        item,
                                        selected,
                                        active
                                      }, () => [
                                        createVNode("span", {
                                          class: {
                                            "font-semibold": selected
                                          }
                                        }, toDisplayString(item[__props.displayKey]), 3)
                                      ])
                                    ]),
                                    selected && __props.showCheck ? (openBlock(), createBlock("span", {
                                      key: 0,
                                      class: active ? "text-white" : "text-indigo-600 dark:text-indigo-400"
                                    }, [
                                      (openBlock(), createBlock("svg", {
                                        class: "h-4 w-4",
                                        viewBox: "0 0 20 20",
                                        fill: "currentColor"
                                      }, [
                                        createVNode("path", {
                                          "fill-rule": "evenodd",
                                          d: "M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z",
                                          "clip-rule": "evenodd"
                                        })
                                      ]))
                                    ], 2)) : createCommentVNode("", true)
                                  ], 2)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.options, (item) => {
                            return openBlock(), createBlock(unref(ComboboxOption), {
                              key: item.ref || item.id || item[__props.displayKey],
                              value: item
                            }, {
                              default: withCtx(({ active, selected }) => [
                                createVNode("li", {
                                  class: ["relative flex items-center justify-between cursor-pointer select-none rounded-md px-3 py-2 text-slate-900 transition-colors dark:text-slate-100", [
                                    active ? "bg-indigo-600 text-white dark:bg-indigo-500" : selected ? "bg-slate-100 dark:bg-slate-700/50" : ""
                                  ]]
                                }, [
                                  createVNode("div", { class: "flex items-center gap-2.5" }, [
                                    renderSlot(_ctx.$slots, "option", {
                                      item,
                                      selected,
                                      active
                                    }, () => [
                                      createVNode("span", {
                                        class: {
                                          "font-semibold": selected
                                        }
                                      }, toDisplayString(item[__props.displayKey]), 3)
                                    ])
                                  ]),
                                  selected && __props.showCheck ? (openBlock(), createBlock("span", {
                                    key: 0,
                                    class: active ? "text-white" : "text-indigo-600 dark:text-indigo-400"
                                  }, [
                                    (openBlock(), createBlock("svg", {
                                      class: "h-4 w-4",
                                      viewBox: "0 0 20 20",
                                      fill: "currentColor"
                                    }, [
                                      createVNode("path", {
                                        "fill-rule": "evenodd",
                                        d: "M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z",
                                        "clip-rule": "evenodd"
                                      })
                                    ]))
                                  ], 2)) : createCommentVNode("", true)
                                ], 2)
                              ]),
                              _: 2
                            }, 1032, ["value"]);
                          }), 128))
                        ];
                      }
                    }),
                    _: 3
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(ComboboxOptions), { class: "absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-slate-200 bg-white p-1 text-sm shadow-lg dark:border-slate-700 dark:bg-slate-800" }, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.options, (item) => {
                          return openBlock(), createBlock(unref(ComboboxOption), {
                            key: item.ref || item.id || item[__props.displayKey],
                            value: item
                          }, {
                            default: withCtx(({ active, selected }) => [
                              createVNode("li", {
                                class: ["relative flex items-center justify-between cursor-pointer select-none rounded-md px-3 py-2 text-slate-900 transition-colors dark:text-slate-100", [
                                  active ? "bg-indigo-600 text-white dark:bg-indigo-500" : selected ? "bg-slate-100 dark:bg-slate-700/50" : ""
                                ]]
                              }, [
                                createVNode("div", { class: "flex items-center gap-2.5" }, [
                                  renderSlot(_ctx.$slots, "option", {
                                    item,
                                    selected,
                                    active
                                  }, () => [
                                    createVNode("span", {
                                      class: {
                                        "font-semibold": selected
                                      }
                                    }, toDisplayString(item[__props.displayKey]), 3)
                                  ])
                                ]),
                                selected && __props.showCheck ? (openBlock(), createBlock("span", {
                                  key: 0,
                                  class: active ? "text-white" : "text-indigo-600 dark:text-indigo-400"
                                }, [
                                  (openBlock(), createBlock("svg", {
                                    class: "h-4 w-4",
                                    viewBox: "0 0 20 20",
                                    fill: "currentColor"
                                  }, [
                                    createVNode("path", {
                                      "fill-rule": "evenodd",
                                      d: "M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z",
                                      "clip-rule": "evenodd"
                                    })
                                  ]))
                                ], 2)) : createCommentVNode("", true)
                              ], 2)
                            ]),
                            _: 2
                          }, 1032, ["value"]);
                        }), 128))
                      ]),
                      _: 3
                    })
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "relative" }, [
                createVNode(unref(ComboboxButton), {
                  as: "div",
                  class: "w-full"
                }, {
                  default: withCtx(() => [
                    _ctx.$slots.leading ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400 dark:text-slate-500"
                    }, [
                      renderSlot(_ctx.$slots, "leading")
                    ])) : createCommentVNode("", true),
                    createVNode(unref(ComboboxInput), {
                      class: ["w-full rounded-lg border py-2.5 text-sm shadow-sm transition-colors duration-200 outline-none focus:ring-4", [
                        "bg-white text-slate-900 placeholder-slate-400 dark:bg-slate-900 dark:text-slate-100 dark:placeholder-slate-500",
                        __props.error ? "border-red-500 focus:border-red-500 focus:ring-red-500/10 dark:border-red-500/80" : "border-slate-200 hover:border-slate-300 focus:border-indigo-500 focus:ring-indigo-500/10 dark:border-slate-700 dark:hover:border-slate-600 dark:focus:border-indigo-500",
                        // Динамічний відступ зліва, якщо є іконка
                        _ctx.$slots.leading ? "pl-10 pr-10" : "px-3",
                        { "cursor-pointer": __props.isStatic }
                      ]],
                      placeholder: __props.placeholder,
                      displayValue: (v) => v ? v[__props.displayKey] : "",
                      autocomplete: "off",
                      onChange: ($event) => emit("query-change", $event.target.value)
                    }, null, 8, ["class", "placeholder", "displayValue", "onChange"]),
                    createVNode("div", { class: "absolute inset-y-0 right-0 flex items-center pr-2.5 pointer-events-none text-slate-400 dark:text-slate-500" }, [
                      (openBlock(), createBlock("svg", {
                        class: "h-4 w-4",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M19 9l-7 7-7-7"
                        })
                      ]))
                    ])
                  ]),
                  _: 3
                }),
                createVNode(unref(TransitionRoot), {
                  leave: "transition ease-in duration-100",
                  leaveTo: "opacity-0"
                }, {
                  default: withCtx(() => [
                    createVNode(unref(ComboboxOptions), { class: "absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-slate-200 bg-white p-1 text-sm shadow-lg dark:border-slate-700 dark:bg-slate-800" }, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.options, (item) => {
                          return openBlock(), createBlock(unref(ComboboxOption), {
                            key: item.ref || item.id || item[__props.displayKey],
                            value: item
                          }, {
                            default: withCtx(({ active, selected }) => [
                              createVNode("li", {
                                class: ["relative flex items-center justify-between cursor-pointer select-none rounded-md px-3 py-2 text-slate-900 transition-colors dark:text-slate-100", [
                                  active ? "bg-indigo-600 text-white dark:bg-indigo-500" : selected ? "bg-slate-100 dark:bg-slate-700/50" : ""
                                ]]
                              }, [
                                createVNode("div", { class: "flex items-center gap-2.5" }, [
                                  renderSlot(_ctx.$slots, "option", {
                                    item,
                                    selected,
                                    active
                                  }, () => [
                                    createVNode("span", {
                                      class: {
                                        "font-semibold": selected
                                      }
                                    }, toDisplayString(item[__props.displayKey]), 3)
                                  ])
                                ]),
                                selected && __props.showCheck ? (openBlock(), createBlock("span", {
                                  key: 0,
                                  class: active ? "text-white" : "text-indigo-600 dark:text-indigo-400"
                                }, [
                                  (openBlock(), createBlock("svg", {
                                    class: "h-4 w-4",
                                    viewBox: "0 0 20 20",
                                    fill: "currentColor"
                                  }, [
                                    createVNode("path", {
                                      "fill-rule": "evenodd",
                                      d: "M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z",
                                      "clip-rule": "evenodd"
                                    })
                                  ]))
                                ], 2)) : createCommentVNode("", true)
                              ], 2)
                            ]),
                            _: 2
                          }, 1032, ["value"]);
                        }), 128))
                      ]),
                      _: 3
                    })
                  ]),
                  _: 3
                })
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/UI/BaseSelect.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
