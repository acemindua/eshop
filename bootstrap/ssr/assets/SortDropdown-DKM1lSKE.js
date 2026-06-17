import { computed, unref, mergeProps, withCtx, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, createCommentVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from "@headlessui/vue";
import { IconArrowsDownUp, IconCheck } from "@tabler/icons-vue";
const _sfc_main = {
  __name: "SortDropdown",
  __ssrInlineRender: true,
  props: {
    modelValue: String,
    options: Array
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const currentLabel = computed(
      () => props.options.find((o) => o.value === props.modelValue)?.label || "Sort"
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Listbox), mergeProps({
        "model-value": __props.modelValue,
        "onUpdate:modelValue": (val) => emit("update:modelValue", val)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="relative group"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(ListboxButton), { class: "flex items-center gap-2 p-1 rounded-full text-sm w-48 text-left border" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="block bg-gray-50 rounded-full p-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(IconArrowsDownUp), {
                    stroke: 2,
                    class: "w-4 h-4 text-brand"
                  }, null, _parent3, _scopeId2));
                  _push3(`</span> ${ssrInterpolate(_ctx.$t(currentLabel.value))}`);
                } else {
                  return [
                    createVNode("span", { class: "block bg-gray-50 rounded-full p-2" }, [
                      createVNode(unref(IconArrowsDownUp), {
                        stroke: 2,
                        class: "w-4 h-4 text-brand"
                      })
                    ]),
                    createTextVNode(" " + toDisplayString(_ctx.$t(currentLabel.value)), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(ListboxOptions), { class: "absolute mt-1 w-48 bg-white rounded-xl shadow-lg z-30 text-sm p-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(__props.options, (option) => {
                    _push3(ssrRenderComponent(unref(ListboxOption), {
                      key: option.value,
                      value: option.value
                    }, {
                      default: withCtx(({ active, selected }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<li class="${ssrRenderClass([[
                            active ? "bg-gray-100" : "",
                            selected ? "font-semibold text-brand" : ""
                          ], "flex items-center justify-start cursor-pointer p-1 rounded-full gap-1 transition duration-150"])}"${_scopeId3}><div class="w-6 h-6 flex items-center justify-center"${_scopeId3}>`);
                          if (selected) {
                            _push4(ssrRenderComponent(unref(IconCheck), {
                              stroke: 2,
                              class: "w-4 h-4"
                            }, null, _parent4, _scopeId3));
                          } else {
                            _push4(`<!---->`);
                          }
                          _push4(`</div><span class="flex-1"${_scopeId3}>${ssrInterpolate(_ctx.$t(option.label))}</span></li>`);
                        } else {
                          return [
                            createVNode("li", {
                              class: ["flex items-center justify-start cursor-pointer p-1 rounded-full gap-1 transition duration-150", [
                                active ? "bg-gray-100" : "",
                                selected ? "font-semibold text-brand" : ""
                              ]]
                            }, [
                              createVNode("div", { class: "w-6 h-6 flex items-center justify-center" }, [
                                selected ? (openBlock(), createBlock(unref(IconCheck), {
                                  key: 0,
                                  stroke: 2,
                                  class: "w-4 h-4"
                                })) : createCommentVNode("", true)
                              ]),
                              createVNode("span", { class: "flex-1" }, toDisplayString(_ctx.$t(option.label)), 1)
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
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.options, (option) => {
                      return openBlock(), createBlock(unref(ListboxOption), {
                        key: option.value,
                        value: option.value
                      }, {
                        default: withCtx(({ active, selected }) => [
                          createVNode("li", {
                            class: ["flex items-center justify-start cursor-pointer p-1 rounded-full gap-1 transition duration-150", [
                              active ? "bg-gray-100" : "",
                              selected ? "font-semibold text-brand" : ""
                            ]]
                          }, [
                            createVNode("div", { class: "w-6 h-6 flex items-center justify-center" }, [
                              selected ? (openBlock(), createBlock(unref(IconCheck), {
                                key: 0,
                                stroke: 2,
                                class: "w-4 h-4"
                              })) : createCommentVNode("", true)
                            ]),
                            createVNode("span", { class: "flex-1" }, toDisplayString(_ctx.$t(option.label)), 1)
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
              createVNode("div", { class: "relative group" }, [
                createVNode(unref(ListboxButton), { class: "flex items-center gap-2 p-1 rounded-full text-sm w-48 text-left border" }, {
                  default: withCtx(() => [
                    createVNode("span", { class: "block bg-gray-50 rounded-full p-2" }, [
                      createVNode(unref(IconArrowsDownUp), {
                        stroke: 2,
                        class: "w-4 h-4 text-brand"
                      })
                    ]),
                    createTextVNode(" " + toDisplayString(_ctx.$t(currentLabel.value)), 1)
                  ]),
                  _: 1
                }),
                createVNode(unref(ListboxOptions), { class: "absolute mt-1 w-48 bg-white rounded-xl shadow-lg z-30 text-sm p-2" }, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.options, (option) => {
                      return openBlock(), createBlock(unref(ListboxOption), {
                        key: option.value,
                        value: option.value
                      }, {
                        default: withCtx(({ active, selected }) => [
                          createVNode("li", {
                            class: ["flex items-center justify-start cursor-pointer p-1 rounded-full gap-1 transition duration-150", [
                              active ? "bg-gray-100" : "",
                              selected ? "font-semibold text-brand" : ""
                            ]]
                          }, [
                            createVNode("div", { class: "w-6 h-6 flex items-center justify-center" }, [
                              selected ? (openBlock(), createBlock(unref(IconCheck), {
                                key: 0,
                                stroke: 2,
                                class: "w-4 h-4"
                              })) : createCommentVNode("", true)
                            ]),
                            createVNode("span", { class: "flex-1" }, toDisplayString(_ctx.$t(option.label)), 1)
                          ], 2)
                        ]),
                        _: 2
                      }, 1032, ["value"]);
                    }), 128))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/Commerce/Components/SortDropdown.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
