import { unref, withCtx, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode, Fragment, renderList, useSSRContext, ref, watch, computed, onMounted, onBeforeUnmount, mergeProps } from "vue";
import { ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrRenderAttrs } from "vue/server-renderer";
import axios from "axios";
import debounce from "lodash.debounce";
import { Combobox, ComboboxButton, ComboboxInput, TransitionRoot, ComboboxOptions, ComboboxOption } from "@headlessui/vue";
const _sfc_main$1 = {
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/UI/BaseSelect.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "ShippingInfo",
  __ssrInlineRender: true,
  props: {
    city_ref: String,
    city_name: String,
    warehouse_ref: String,
    warehouse_name: String,
    errors: Object
  },
  emits: [
    "update:city_ref",
    "update:city_name",
    "update:warehouse_ref",
    "update:warehouse_name"
  ],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const selectedCity = ref(null);
    const queryCity = ref("");
    const cities = ref([]);
    const isCityLoading = ref(false);
    const selectedWarehouse = ref(null);
    const queryWarehouse = ref("");
    const warehouses = ref([]);
    const isWarehouseLoading = ref(false);
    const cleanSearch = (val) => val.replace(/^(місто|м\.|село|с\.|смт)\s+/gi, "").trim();
    const fetchCities = async (query) => {
      isCityLoading.value = true;
      try {
        const { data } = await axios.get(route("api.np.cities"), {
          params: { q: cleanSearch(query) }
        });
        cities.value = data;
      } catch (e) {
        console.error("City loading error:", e);
      } finally {
        isCityLoading.value = false;
      }
    };
    const fetchWarehouses = async (cityRef) => {
      if (!cityRef) {
        warehouses.value = [];
        return;
      }
      isWarehouseLoading.value = true;
      try {
        const { data } = await axios.get(route("api.np.warehouses"), {
          params: { city_ref: cityRef }
        });
        warehouses.value = data;
      } catch (e) {
        console.error("Warehouse loading error:", e);
      } finally {
        isWarehouseLoading.value = false;
      }
    };
    const debouncedFetchCities = debounce((val) => {
      if (!val || val.length < 3) {
        cities.value = [];
        return;
      }
      fetchCities(val);
    }, 400);
    watch(queryCity, (val) => {
      debouncedFetchCities(val);
    });
    watch(selectedCity, async (city) => {
      emit("update:city_ref", city?.ref || "");
      emit("update:city_name", city?.present || "");
      selectedWarehouse.value = null;
      queryWarehouse.value = "";
      warehouses.value = [];
      if (city?.ref) {
        await fetchWarehouses(city.ref);
      }
    });
    watch(selectedWarehouse, (w) => {
      emit("update:warehouse_ref", w?.ref || "");
      emit("update:warehouse_name", w?.name || "");
    });
    const filteredWarehouses = computed(() => {
      if (!queryWarehouse.value) return warehouses.value;
      const q = queryWarehouse.value.toLowerCase();
      return warehouses.value.filter((w) => w.name?.toLowerCase().includes(q));
    });
    onMounted(async () => {
      if (props.city_ref) {
        selectedCity.value = {
          ref: props.city_ref,
          present: props.city_name
        };
        queryCity.value = props.city_name || "";
        if (props.warehouse_ref) {
          await fetchWarehouses(props.city_ref);
          selectedWarehouse.value = {
            ref: props.warehouse_ref,
            name: props.warehouse_name
          };
        }
      }
    });
    onBeforeUnmount(() => {
      debouncedFetchCities.cancel();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white p-6 border border-gray-200 shadow-sm space-y-8" }, _attrs))}><h2 class="text-sm font-bold uppercase tracking-[0.2em] text-black"> 2. Доставка (Нова Пошта) </h2><div class="grid grid-cols-1 md:grid-cols-2 gap-8">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        label: "Місто",
        placeholder: "Львів...",
        "display-key": "present",
        modelValue: selectedCity.value,
        "onUpdate:modelValue": ($event) => selectedCity.value = $event,
        options: cities.value,
        loading: isCityLoading.value,
        error: __props.errors?.city_ref,
        onQueryChange: (v) => queryCity.value = v
      }, null, _parent));
      if (selectedCity.value) {
        _push(ssrRenderComponent(_sfc_main$1, {
          label: "Відділення",
          placeholder: "Оберіть номер...",
          modelValue: selectedWarehouse.value,
          "onUpdate:modelValue": ($event) => selectedWarehouse.value = $event,
          options: filteredWarehouses.value,
          loading: isWarehouseLoading.value,
          error: __props.errors?.warehouse_ref,
          "is-static": true,
          "show-check": "",
          onQueryChange: (v) => queryWarehouse.value = v
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/Commerce/Partials/ShippingInfo.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
