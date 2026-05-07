import { computed, unref, mergeProps, withCtx, createVNode, toDisplayString, withModifiers, openBlock, createBlock, Fragment, renderList, Transition, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { loadLanguageAsync } from "laravel-vue-i18n";
import { u as useLocales } from "./useLocales-Cm2D8rND.js";
import { usePage, router } from "@inertiajs/vue3";
import { IconChevronDown } from "@tabler/icons-vue";
const _sfc_main = {
  __name: "LangSwitcher",
  __ssrInlineRender: true,
  setup(__props) {
    const currentLocale = computed(() => {
      return usePage().props?.config?.currentLocale || "en";
    });
    const { hasMultipleLocales, currentMappedLocale, localeKeysMapped } = useLocales(currentLocale);
    const switchLanguage = async (locale) => {
      router.visit(route("locale.switcher", locale));
      try {
        await loadLanguageAsync(locale);
      } catch (error) {
        console.error(`Error loading language ${code}:`, error);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(hasMultipleLocales)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative inline-block text-left text-sm" }, _attrs))}>`);
        _push(ssrRenderComponent(unref(Menu), null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(MenuButton), { class: "py-2 pl-3 uppercase inline-flex items-center rounded-lg" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<span${_scopeId2}>${ssrInterpolate(unref(currentMappedLocale))}</span>`);
                    _push3(ssrRenderComponent(unref(IconChevronDown), { stroke: "{2}" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode("span", null, toDisplayString(unref(currentMappedLocale)), 1),
                      createVNode(unref(IconChevronDown), { stroke: "{2}" })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(``);
              _push2(ssrRenderComponent(unref(MenuItems), { class: "absolute right-0 mt-2 bg-white rounded-md shadow-lg z-[1000]" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<!--[-->`);
                    ssrRenderList(unref(localeKeysMapped), (code2, locale) => {
                      _push3(ssrRenderComponent(unref(MenuItem), {
                        key: code2,
                        as: "div"
                      }, {
                        default: withCtx(({ close }, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<button class="inline-flex items-center px-4 py-2 uppercase hover:text-blue-500 transition-colors duration-100"${_scopeId3}><span${_scopeId3}>${ssrInterpolate(code2)}</span></button>`);
                          } else {
                            return [
                              createVNode("button", {
                                ref_for: true,
                                ref: "switcher",
                                onClick: [
                                  withModifiers(($event) => switchLanguage(locale), ["prevent"]),
                                  close
                                ],
                                class: "inline-flex items-center px-4 py-2 uppercase hover:text-blue-500 transition-colors duration-100"
                              }, [
                                createVNode("span", null, toDisplayString(code2), 1)
                              ], 8, ["onClick"])
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    });
                    _push3(`<!--]-->`);
                  } else {
                    return [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(localeKeysMapped), (code2, locale) => {
                        return openBlock(), createBlock(unref(MenuItem), {
                          key: code2,
                          as: "div"
                        }, {
                          default: withCtx(({ close }) => [
                            createVNode("button", {
                              ref_for: true,
                              ref: "switcher",
                              onClick: [
                                withModifiers(($event) => switchLanguage(locale), ["prevent"]),
                                close
                              ],
                              class: "inline-flex items-center px-4 py-2 uppercase hover:text-blue-500 transition-colors duration-100"
                            }, [
                              createVNode("span", null, toDisplayString(code2), 1)
                            ], 8, ["onClick"])
                          ]),
                          _: 2
                        }, 1024);
                      }), 128))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(MenuButton), { class: "py-2 pl-3 uppercase inline-flex items-center rounded-lg" }, {
                  default: withCtx(() => [
                    createVNode("span", null, toDisplayString(unref(currentMappedLocale)), 1),
                    createVNode(unref(IconChevronDown), { stroke: "{2}" })
                  ]),
                  _: 1
                }),
                createVNode(Transition, {
                  "enter-active-class": "transition duration-100 ease-out",
                  "enter-from-class": "transform scale-95 opacity-0",
                  "enter-to-class": "transform scale-100 opacity-100",
                  "leave-active-class": "transition duration-75 ease-out",
                  "leave-from-class": "transform scale-100 opacity-100",
                  "leave-to-class": "transform scale-95 opacity-0"
                }, {
                  default: withCtx(() => [
                    createVNode(unref(MenuItems), { class: "absolute right-0 mt-2 bg-white rounded-md shadow-lg z-[1000]" }, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(localeKeysMapped), (code2, locale) => {
                          return openBlock(), createBlock(unref(MenuItem), {
                            key: code2,
                            as: "div"
                          }, {
                            default: withCtx(({ close }) => [
                              createVNode("button", {
                                ref_for: true,
                                ref: "switcher",
                                onClick: [
                                  withModifiers(($event) => switchLanguage(locale), ["prevent"]),
                                  close
                                ],
                                class: "inline-flex items-center px-4 py-2 uppercase hover:text-blue-500 transition-colors duration-100"
                              }, [
                                createVNode("span", null, toDisplayString(code2), 1)
                              ], 8, ["onClick"])
                            ]),
                            _: 2
                          }, 1024);
                        }), 128))
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
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Public/LangSwitcher.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
