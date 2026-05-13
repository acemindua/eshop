import { unref, withCtx, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { Combobox, ComboboxButton, ComboboxInput, TransitionRoot, ComboboxOptions, ComboboxOption } from "@headlessui/vue";
const _sfc_main = {
  __name: "BaseSelect",
  __ssrInlineRender: true,
  props: {
    modelValue: [Object, null],
    options: Array,
    label: String,
    placeholder: String,
    loading: Boolean,
    error: String,
    displayKey: { type: String, default: "name" },
    // ключ для відображення (напр. 'present' або 'name')
    showCheck: Boolean,
    // чи показувати галочку
    isStatic: Boolean
    // якщо true — список відкривається відразу (як для відділень)
  },
  emits: ["update:modelValue", "query-change"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="relative">`);
      if (__props.label) {
        _push(`<label class="text-[10px] uppercase font-bold text-gray-400 mb-1.5 block tracking-widest">${ssrInterpolate(__props.label)}</label>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(unref(Combobox), {
        modelValue: __props.modelValue,
        "onUpdate:modelValue": (val) => emit("update:modelValue", val),
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
                  _push3(ssrRenderComponent(unref(ComboboxInput), {
                    class: ["w-full border-gray-300 focus:border-black focus:ring-0 py-2.5 px-3 transition-all text-sm", {
                      "border-red-500": __props.error,
                      "cursor-pointer": __props.isStatic
                    }],
                    placeholder: __props.placeholder,
                    displayValue: (v) => v ? v[__props.displayKey] : "",
                    autocomplete: "off",
                    autocorrect: "off",
                    spellcheck: "false",
                    onChange: ($event) => emit("query-change", $event.target.value),
                    onFocus: ($event) => __props.isStatic && !__props.modelValue && emit("query-change", "")
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(ComboboxInput), {
                      class: ["w-full border-gray-300 focus:border-black focus:ring-0 py-2.5 px-3 transition-all text-sm", {
                        "border-red-500": __props.error,
                        "cursor-pointer": __props.isStatic
                      }],
                      placeholder: __props.placeholder,
                      displayValue: (v) => v ? v[__props.displayKey] : "",
                      autocomplete: "off",
                      autocorrect: "off",
                      spellcheck: "false",
                      onChange: ($event) => emit("query-change", $event.target.value),
                      onFocus: ($event) => __props.isStatic && !__props.modelValue && emit("query-change", "")
                    }, null, 8, ["class", "placeholder", "displayValue", "onChange", "onFocus"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(TransitionRoot), {
              leave: "transition duration-100",
              leaveTo: "opacity-0"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ComboboxOptions), { class: "absolute z-50 w-full bg-white border border-black mt-[-1px] max-h-60 overflow-auto shadow-xl" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (__props.loading) {
                          _push4(`<div class="p-3 text-xs text-gray-400 italic"${_scopeId3}> Завантаження... </div>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`<!--[-->`);
                        ssrRenderList(__props.options, (item) => {
                          _push4(ssrRenderComponent(unref(ComboboxOption), {
                            key: item.ref,
                            value: item
                          }, {
                            default: withCtx(({ active, selected }, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<li class="${ssrRenderClass([
                                  active ? "bg-black text-white" : selected ? "bg-gray-100" : "",
                                  "px-3 py-2 cursor-pointer border-b border-gray-50 last:border-none text-sm flex justify-between items-center transition-colors"
                                ])}"${_scopeId4}><span${_scopeId4}>${ssrInterpolate(item[__props.displayKey])}</span>`);
                                if (selected && __props.showCheck) {
                                  _push5(`<span${_scopeId4}>✓</span>`);
                                } else {
                                  _push5(`<!---->`);
                                }
                                _push5(`</li>`);
                              } else {
                                return [
                                  createVNode("li", {
                                    class: [
                                      "px-3 py-2 cursor-pointer border-b border-gray-50 last:border-none text-sm flex justify-between items-center transition-colors",
                                      active ? "bg-black text-white" : selected ? "bg-gray-100" : ""
                                    ]
                                  }, [
                                    createVNode("span", null, toDisplayString(item[__props.displayKey]), 1),
                                    selected && __props.showCheck ? (openBlock(), createBlock("span", { key: 0 }, "✓")) : createCommentVNode("", true)
                                  ], 2)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                        if (!__props.options.length && !__props.loading) {
                          _push4(`<div class="p-3 text-xs text-gray-400"${_scopeId3}> Нічого не знайдено </div>`);
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          __props.loading ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "p-3 text-xs text-gray-400 italic"
                          }, " Завантаження... ")) : createCommentVNode("", true),
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.options, (item) => {
                            return openBlock(), createBlock(unref(ComboboxOption), {
                              key: item.ref,
                              value: item
                            }, {
                              default: withCtx(({ active, selected }) => [
                                createVNode("li", {
                                  class: [
                                    "px-3 py-2 cursor-pointer border-b border-gray-50 last:border-none text-sm flex justify-between items-center transition-colors",
                                    active ? "bg-black text-white" : selected ? "bg-gray-100" : ""
                                  ]
                                }, [
                                  createVNode("span", null, toDisplayString(item[__props.displayKey]), 1),
                                  selected && __props.showCheck ? (openBlock(), createBlock("span", { key: 0 }, "✓")) : createCommentVNode("", true)
                                ], 2)
                              ]),
                              _: 2
                            }, 1032, ["value"]);
                          }), 128)),
                          !__props.options.length && !__props.loading ? (openBlock(), createBlock("div", {
                            key: 1,
                            class: "p-3 text-xs text-gray-400"
                          }, " Нічого не знайдено ")) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(ComboboxOptions), { class: "absolute z-50 w-full bg-white border border-black mt-[-1px] max-h-60 overflow-auto shadow-xl" }, {
                      default: withCtx(() => [
                        __props.loading ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "p-3 text-xs text-gray-400 italic"
                        }, " Завантаження... ")) : createCommentVNode("", true),
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.options, (item) => {
                          return openBlock(), createBlock(unref(ComboboxOption), {
                            key: item.ref,
                            value: item
                          }, {
                            default: withCtx(({ active, selected }) => [
                              createVNode("li", {
                                class: [
                                  "px-3 py-2 cursor-pointer border-b border-gray-50 last:border-none text-sm flex justify-between items-center transition-colors",
                                  active ? "bg-black text-white" : selected ? "bg-gray-100" : ""
                                ]
                              }, [
                                createVNode("span", null, toDisplayString(item[__props.displayKey]), 1),
                                selected && __props.showCheck ? (openBlock(), createBlock("span", { key: 0 }, "✓")) : createCommentVNode("", true)
                              ], 2)
                            ]),
                            _: 2
                          }, 1032, ["value"]);
                        }), 128)),
                        !__props.options.length && !__props.loading ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "p-3 text-xs text-gray-400"
                        }, " Нічого не знайдено ")) : createCommentVNode("", true)
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
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
                    createVNode(unref(ComboboxInput), {
                      class: ["w-full border-gray-300 focus:border-black focus:ring-0 py-2.5 px-3 transition-all text-sm", {
                        "border-red-500": __props.error,
                        "cursor-pointer": __props.isStatic
                      }],
                      placeholder: __props.placeholder,
                      displayValue: (v) => v ? v[__props.displayKey] : "",
                      autocomplete: "off",
                      autocorrect: "off",
                      spellcheck: "false",
                      onChange: ($event) => emit("query-change", $event.target.value),
                      onFocus: ($event) => __props.isStatic && !__props.modelValue && emit("query-change", "")
                    }, null, 8, ["class", "placeholder", "displayValue", "onChange", "onFocus"])
                  ]),
                  _: 1
                }),
                createVNode(unref(TransitionRoot), {
                  leave: "transition duration-100",
                  leaveTo: "opacity-0"
                }, {
                  default: withCtx(() => [
                    createVNode(unref(ComboboxOptions), { class: "absolute z-50 w-full bg-white border border-black mt-[-1px] max-h-60 overflow-auto shadow-xl" }, {
                      default: withCtx(() => [
                        __props.loading ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "p-3 text-xs text-gray-400 italic"
                        }, " Завантаження... ")) : createCommentVNode("", true),
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.options, (item) => {
                          return openBlock(), createBlock(unref(ComboboxOption), {
                            key: item.ref,
                            value: item
                          }, {
                            default: withCtx(({ active, selected }) => [
                              createVNode("li", {
                                class: [
                                  "px-3 py-2 cursor-pointer border-b border-gray-50 last:border-none text-sm flex justify-between items-center transition-colors",
                                  active ? "bg-black text-white" : selected ? "bg-gray-100" : ""
                                ]
                              }, [
                                createVNode("span", null, toDisplayString(item[__props.displayKey]), 1),
                                selected && __props.showCheck ? (openBlock(), createBlock("span", { key: 0 }, "✓")) : createCommentVNode("", true)
                              ], 2)
                            ]),
                            _: 2
                          }, 1032, ["value"]);
                        }), 128)),
                        !__props.options.length && !__props.loading ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "p-3 text-xs text-gray-400"
                        }, " Нічого не знайдено ")) : createCommentVNode("", true)
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
      _push(`</div>`);
      if (__props.error) {
        _push(`<p class="text-red-500 text-[10px] mt-1">${ssrInterpolate(__props.error)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
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
