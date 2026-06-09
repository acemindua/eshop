import { ref, onMounted, watch, defineComponent, h, mergeProps, unref, useSSRContext, onUnmounted, resolveComponent, withCtx, createVNode, toDisplayString } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderSlot, ssrRenderTeleport } from "vue/server-renderer";
import { A as ApplicationLogo } from "./ApplicationLogo-CSNe_4RD.js";
import { _ as _sfc_main$5 } from "./Breadcrumbs-BaC6CclY.js";
import { C as CartButton } from "./CartButton-CBNnYGs8.js";
import { _ as _sfc_main$4 } from "./LangSwitcher-BIfY0gKc.js";
import { _ as _sfc_main$2, S as SerchContainer, a as _sfc_main$3 } from "./UserLoginRegisterForm-CE0XGaOj.js";
import { l as link_default } from "../ssr.js";
import { u as useApiResourceService } from "./useApiResourceService-D0zlI-JQ.js";
import { router } from "@inertiajs/core";
const _sfc_main$1 = {
  __name: "AppNavigations",
  __ssrInlineRender: true,
  props: {
    slug: {
      type: String,
      default: () => "header"
    },
    locale: {
      type: String,
      default: () => "en"
    }
  },
  setup(__props) {
    const props = __props;
    const { fetchData, loading } = useApiResourceService();
    const menuItems = ref([]);
    const loadData = async () => {
      try {
        const url = route("api.get.menu", {
          locale: props.locale,
          slug: props.slug
        });
        const res = await fetchData(url);
        if (res && res.data && res.data.items && Array.isArray(res.data.items.tree)) {
          menuItems.value = res.data.items.tree;
        } else {
          menuItems.value = [];
          console.error(
            "API returned invalid structure or empty tree array.",
            res
          );
        }
      } catch (e) {
        menuItems.value = [];
        console.error("Failed to fetch menu:", e);
      }
    };
    onMounted(() => {
      loadData();
    });
    watch(
      () => props.locale,
      () => {
        loadData();
      }
    );
    const NavigationTree = defineComponent({
      name: "NavigationTree",
      props: {
        list: { type: Array, required: true },
        isSubmenu: { type: Boolean, default: false }
      },
      setup(nestedProps) {
        return () => h(
          "ul",
          {
            class: nestedProps.isSubmenu ? "absolute left-0 mt-2 w-48 bg-white border border-gray-100 rounded-md shadow-lg p-2 hidden group-hover:block z-50 flex flex-col space-y-1" : "flex flex-row flex-wrap items-center gap-6"
          },
          nestedProps.list.map((item) => {
            let itemUrl = "/";
            if (item.url) {
              itemUrl = item.url;
            } else if (item.slug) {
              itemUrl = item.slug.startsWith("/") ? item.slug : `/${item.slug}`;
            }
            const itemTitle = item.title || item.name || item.label || "No Title";
            const hasChildren = item.children && item.children.length > 0;
            return h("li", { class: "relative group py-2" }, [
              h(
                link_default,
                {
                  href: itemUrl,
                  class: nestedProps.isSubmenu ? "block px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 hover:text-indigo-600 rounded transition" : "text-sm font-medium text-gray-700 hover:text-indigo-600 transition"
                },
                () => itemTitle
              ),
              // Рекурсивний рендер підменю (якщо children існує)
              hasChildren ? h(NavigationTree, {
                list: item.children,
                isSubmenu: true
              }) : null
            ]);
          })
        );
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full" }, _attrs))}>`);
      if (unref(loading) && menuItems.value.length === 0) {
        _push(`<div class="py-2 text-gray-400 italic text-xs"> Loading navigation... </div>`);
      } else if (menuItems.value.length > 0) {
        _push(`<div class="mx-auto container">`);
        _push(ssrRenderComponent(unref(NavigationTree), { list: menuItems.value }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<div class="text-xs text-gray-400 italic py-2"> Navigation &quot;${ssrInterpolate(props.slug)}&quot; is empty. </div>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/AppNavigations.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "Layout",
  __ssrInlineRender: true,
  setup(__props) {
    const catalogMenu = ref(false);
    ref(false);
    const inputFocus = ref(false);
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col w-full min-h-screen bg-gray-200 text-sm gap-2" }, _attrs))}><div>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        slug: `header`,
        locale: _ctx.$page.props?.config?.currentLocale || "en"
      }, null, _parent));
      _push(`</div><header class="bg-white p-4"><div class="w-full mx-auto"><nav class="inline-flex gap-4 justify-between items-center w-full px-4">`);
      _push(ssrRenderComponent(_component_Link, {
        href: "/",
        class: "flex items-center gap-2 shrink-0 group md:pr-12",
        onClick: closeAll
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class=""${_scopeId}>`);
            _push2(ssrRenderComponent(ApplicationLogo, { class: "w-10 h-10 bg-brand fill-current" }, null, _parent2, _scopeId));
            _push2(`</div><span class="font-semibold hidden md:block"${_scopeId}>${ssrInterpolate(_ctx.$page.props?.app?.name)}</span>`);
          } else {
            return [
              createVNode("div", { class: "" }, [
                createVNode(ApplicationLogo, { class: "w-10 h-10 bg-brand fill-current" })
              ]),
              createVNode("span", { class: "font-semibold hidden md:block" }, toDisplayString(_ctx.$page.props?.app?.name), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="md:relative z-[60] flex flex-col flex-grow max-w-xl">`);
      _push(ssrRenderComponent(_sfc_main$2, {
        onFocus: hadleFocus,
        onSearch: ($event) => goSearch($event)
      }, null, _parent));
      if (inputFocus.value) {
        _push(`<div>`);
        _push(ssrRenderComponent(SerchContainer, {
          locale: _ctx.locale,
          onClose: closeAll
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="hidden md:flex items-center gap-4">`);
      _push(ssrRenderComponent(_sfc_main$3, null, null, _parent));
      _push(ssrRenderComponent(CartButton, null, null, _parent));
      _push(ssrRenderComponent(_sfc_main$4, null, null, _parent));
      _push(`</div></nav></div></header><div class="bg-white p-4">`);
      _push(ssrRenderComponent(_sfc_main$5, null, null, _parent));
      _push(`</div><main class="flex-grow px-2"><div class="w-full mx-auto">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></main><footer class="bg-white p-4"><div class="w-full mx-auto">#footer (Copyright/Info)</div></footer>`);
      ssrRenderTeleport(_push, (_push2) => {
        if (catalogMenu.value || inputFocus.value) {
          _push2(`<div class="fixed inset-0 bg-black/10 z-[10]"></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/Public/Landing/Layout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
