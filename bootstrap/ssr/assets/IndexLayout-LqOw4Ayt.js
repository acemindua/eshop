import { resolveComponent, mergeProps, withCtx, createVNode, toDisplayString, useSSRContext, unref, ref, computed, watch, createTextVNode, onMounted, onUnmounted, openBlock, createBlock } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderTeleport, ssrRenderClass, ssrRenderSlot } from "vue/server-renderer";
import { _ as _sfc_main$a } from "./VarDump-0gz6Mom3.js";
import { usePage, router, Head } from "@inertiajs/vue3";
import { _ as _sfc_main$9 } from "./Breadcrumbs-Be9A5eey.js";
import { IconCategory, IconX, IconHomeFilled, IconHome, IconCategoryFilled } from "@tabler/icons-vue";
import { _ as _sfc_main$6 } from "./ApplicationLogo-DsJOFw9w.js";
import { defineStore } from "pinia";
import { u as useApiResourceService } from "./useApiResourceService-BibiLDfj.js";
import { _ as _sfc_main$7, S as SerchContainer, a as _sfc_main$8 } from "./UserLoginRegisterForm-CzuFF-4H.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main$5 = {
  __name: "FooterComponent",
  __ssrInlineRender: true,
  props: {
    locale: String
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "py-8 text-sm" }, _attrs))}><p class="text-center md:text-left"> ©${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} `);
      _push(ssrRenderComponent(_component_Link, {
        href: "/",
        class: "hover:underline duration-150 transition"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="font-play font-semibold"${_scopeId}>${ssrInterpolate(_ctx.$page.props?.app?.name)}</span>`);
          } else {
            return [
              createVNode("span", { class: "font-play font-semibold" }, toDisplayString(_ctx.$page.props?.app?.name), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`. ${ssrInterpolate(_ctx.$t("All rights reserved"))}. </p></div>`);
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Public/FooterComponent.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = {
  __name: "ButtonCatalog",
  __ssrInlineRender: true,
  props: {
    open: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><button class="flex w-full items-center justify-center bg-brand text-white h-full p-2 px-6 font-semibold rounded-lg"><div class="flex gap-2 items-center">`);
      if (!__props.open) {
        _push(ssrRenderComponent(unref(IconCategory), { size: 20 }, null, _parent));
      } else {
        _push(ssrRenderComponent(unref(IconX), { size: 20 }, null, _parent));
      }
      _push(`<span>${ssrInterpolate(_ctx.$t("Catalog"))}</span></div></button></div>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Public/UI/Buttons/ButtonCatalog.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const useCategoryStore = defineStore("category", () => {
  const categories = ref({});
  const isLoading = ref(false);
  const loadingPromises = {};
  const { fetchData } = useApiResourceService();
  async function fetchCategories(locale) {
    if (categories.value[locale]?.length > 0) {
      return;
    }
    if (loadingPromises[locale]) {
      return loadingPromises[locale];
    }
    isLoading.value = true;
    loadingPromises[locale] = (async () => {
      try {
        const url = route("api.get.categories", { locale });
        const res = await fetchData(url);
        if (res?.data?.items) {
          categories.value[locale] = res.data.items;
        }
      } catch (e) {
        console.error("Pinia Category Error:", e);
      } finally {
        isLoading.value = false;
        delete loadingPromises[locale];
      }
    })();
    return loadingPromises[locale];
  }
  return { categories, isLoading, fetchCategories };
});
const _sfc_main$3 = {
  __name: "MegaMenu",
  __ssrInlineRender: true,
  props: {
    locale: { type: String, default: "en" }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const categoryStore = useCategoryStore();
    const items = computed(() => categoryStore.categories[props.locale] || []);
    const loadData = () => {
      categoryStore.fetchCategories(props.locale);
    };
    watch(
      () => props.locale,
      (newLocale) => {
        loadData();
      },
      { immediate: true }
      // Спрацює при ініціалізації компонента
    );
    const onClose = () => emit("close");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white absolute left-0 top-full w-full" }, _attrs))}><div class="container mx-auto">`);
      if (unref(categoryStore).isLoading && items.value.length === 0) {
        _push(`<div class="p-10 text-center text-gray-400"> Loading... </div>`);
      } else {
        _push(`<div class="border my-4 mx-2"><ul class="grid grid-cols-4 divide-x gap-4 md:gap-6"><!--[-->`);
        ssrRenderList(items.value, (item) => {
          _push(`<li class="p-4">`);
          _push(ssrRenderComponent(_component_Link, {
            href: `/category__${item.slug}`,
            onClick: onClose,
            class: "font-semibold border-b block pb-2 hover:underline"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(item.title)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(item.title), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          if (item.childs?.length) {
            _push(`<ul class="mt-2"><!--[-->`);
            ssrRenderList(item.childs, (child) => {
              _push(`<li class="py-1">`);
              _push(ssrRenderComponent(_component_Link, {
                href: `/category__${child.slug}`,
                class: "hover:underline",
                onClick: onClose
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`${ssrInterpolate(child.title)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(child.title), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent));
              _push(`</li>`);
            });
            _push(`<!--]--></ul>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</li>`);
        });
        _push(`<!--]--></ul></div>`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Public/MegaMenu.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed top-0 left-0 bg-gray-100 w-full h-screen overflow-hidden overflow-y-auto z-[60]" }, _attrs))}></div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Public/MobileMegaMenu.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const MobileMegaMenu = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$1 = {
  __name: "NavComponent",
  __ssrInlineRender: true,
  props: {
    locale: {
      type: String,
      default: "en"
    }
  },
  setup(__props) {
    const page = usePage();
    const isHomePage = computed(() => {
      const url = page.url;
      return /^\/(?:[a-z]{2}\/?)?$/.test(url);
    });
    const catalogMenu = ref(false);
    const mobileCatalogMenu = ref(false);
    const inputFocus = ref(false);
    const toggleCatalogMenu = () => {
      catalogMenu.value = !catalogMenu.value;
      inputFocus.value = false;
    };
    const hadleFocus = () => {
      inputFocus.value = true;
      catalogMenu.value = false;
    };
    const closeAll = () => {
      catalogMenu.value = false;
      inputFocus.value = false;
    };
    const handleEsc = (e) => {
      if (e.key === "Escape") closeAll();
    };
    onMounted(() => window.addEventListener("keydown", handleEsc));
    onUnmounted(() => window.removeEventListener("keydown", handleEsc));
    const goSearch = (e) => {
      closeAll();
      router.get(
        route("search"),
        { q: e },
        // Передаємо чистий рядок
        {
          preserveState: true
        }
      );
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      _push(`<!--[--><div data-v-96b1adff><div class="container mx-auto px-2" data-v-96b1adff><nav class="flex gap-4 md:gap-6 py-3" data-v-96b1adff>`);
      _push(ssrRenderComponent(_component_Link, {
        href: "/",
        class: "flex items-center gap-2 shrink-0 group md:pr-12",
        onClick: closeAll
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="" data-v-96b1adff${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$6, { class: "w-10 h-10 bg-brand fill-current" }, null, _parent2, _scopeId));
            _push2(`</div><span class="font-semibold hidden md:block" data-v-96b1adff${_scopeId}>${ssrInterpolate(_ctx.$page.props?.app?.name)}</span>`);
          } else {
            return [
              createVNode("div", { class: "" }, [
                createVNode(_sfc_main$6, { class: "w-10 h-10 bg-brand fill-current" })
              ]),
              createVNode("span", { class: "font-semibold hidden md:block" }, toDisplayString(_ctx.$page.props?.app?.name), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$4, {
        class: "hidden md:block",
        open: catalogMenu.value,
        onClick: toggleCatalogMenu
      }, null, _parent));
      _push(`<div class="md:relative z-[60] flex flex-col flex-grow" data-v-96b1adff>`);
      _push(ssrRenderComponent(_sfc_main$7, {
        onFocus: hadleFocus,
        onSearch: ($event) => goSearch($event)
      }, null, _parent));
      if (inputFocus.value) {
        _push(`<div data-v-96b1adff>`);
        _push(ssrRenderComponent(SerchContainer, {
          locale: __props.locale,
          onClose: closeAll
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="hidden md:flex items-center gap-4" data-v-96b1adff>`);
      _push(ssrRenderComponent(_sfc_main$8, null, null, _parent));
      _push(`</div></nav>`);
      if (catalogMenu.value) {
        _push(`<div data-v-96b1adff>`);
        _push(ssrRenderComponent(_sfc_main$3, {
          locale: __props.locale,
          onClose: closeAll
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (mobileCatalogMenu.value) {
        _push(`<div data-v-96b1adff>`);
        _push(ssrRenderComponent(MobileMegaMenu, {
          locale: __props.locale,
          onClose: closeAll
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      ssrRenderTeleport(_push, (_push2) => {
        _push2(`<div class="md:hidden fixed bottom-0 left-0 w-full p-2" data-v-96b1adff><div class="flex gap-6 items-center justify-center bg-white p-2 shadow-lg rounded-full" data-v-96b1adff>`);
        _push2(ssrRenderComponent(_component_Link, {
          href: `/`,
          class: ["flex flex-col items-center", { "text-brand": isHomePage.value && !mobileCatalogMenu.value }]
        }, {
          default: withCtx((_, _push3, _parent2, _scopeId) => {
            if (_push3) {
              if (isHomePage.value) {
                _push3(ssrRenderComponent(unref(IconHomeFilled), {
                  size: 24,
                  stroke: 2
                }, null, _parent2, _scopeId));
              } else {
                _push3(ssrRenderComponent(unref(IconHome), {
                  size: 24,
                  stroke: 2
                }, null, _parent2, _scopeId));
              }
              _push3(`<span class="text-xs font-semibold tracking-tight" data-v-96b1adff${_scopeId}>${ssrInterpolate(_ctx.$t("Home"))}</span>`);
            } else {
              return [
                isHomePage.value ? (openBlock(), createBlock(unref(IconHomeFilled), {
                  key: 0,
                  size: 24,
                  stroke: 2
                })) : (openBlock(), createBlock(unref(IconHome), {
                  key: 1,
                  size: 24,
                  stroke: 2
                })),
                createVNode("span", { class: "text-xs font-semibold tracking-tight" }, toDisplayString(_ctx.$t("Home")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push2(`<button class="${ssrRenderClass([{ "text-brand": mobileCatalogMenu.value }, "flex flex-col items-center"])}" data-v-96b1adff>`);
        if (!mobileCatalogMenu.value) {
          _push2(ssrRenderComponent(unref(IconCategory), {
            size: 24,
            stroke: 2
          }, null, _parent));
        } else {
          _push2(ssrRenderComponent(unref(IconCategoryFilled), {
            size: 24,
            stroke: 2
          }, null, _parent));
        }
        _push2(`<span class="text-xs font-semibold tracking-tight" data-v-96b1adff>${ssrInterpolate(_ctx.$t("Catalog"))}</span></button>`);
        _push2(ssrRenderComponent(_sfc_main$8, null, null, _parent));
        _push2(`</div></div>`);
        if (catalogMenu.value || inputFocus.value) {
          _push2(`<div class="fixed inset-0 bg-black/10 z-[10]" data-v-96b1adff></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Public/NavComponent.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const NavComponent = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-96b1adff"]]);
const _sfc_main = {
  __name: "IndexLayout",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const currentLocale = computed(() => {
      return page.props?.config?.currentLocale || "en";
    });
    const settings = computed(() => {
      return page.props?.settings || {};
    });
    const isHomePage = computed(() => {
      const url = page.url;
      return /^\/(?:[a-z]{2}\/?)?$/.test(url);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>${ssrInterpolate(settings.value ? settings.value?.site_tagline : "")}</title>`);
          } else {
            return [
              createVNode("title", null, toDisplayString(settings.value ? settings.value?.site_tagline : ""), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="w-full min-h-screen flex flex-col"><header class="sticky top-0 z-50 bg-white"><div class="mx-auto container">`);
      _push(ssrRenderComponent(NavComponent, { locale: currentLocale.value }, null, _parent));
      _push(`</div></header><main class="flex-grow"><div class="mx-auto container">`);
      if (!isHomePage.value && _ctx.$page.props?.breadcrumbs?.length) {
        _push(`<div class="pt-4 px-2">`);
        _push(ssrRenderComponent(_sfc_main$9, null, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="py-4 px-2">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div></main><div class="h-screen"></div><footer><div class="mx-auto container">`);
      _push(ssrRenderComponent(_sfc_main$5, { locale: currentLocale.value }, null, _parent));
      _push(`</div></footer>`);
      _push(ssrRenderComponent(_sfc_main$a, {
        data: _ctx.$page.props || {}
      }, null, _parent));
      _push(`</div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/Public/Default/IndexLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
