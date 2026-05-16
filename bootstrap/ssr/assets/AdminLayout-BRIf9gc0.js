import { useSlots, computed, mergeProps, unref, withCtx, createVNode, renderSlot, Transition, openBlock, createBlock, createCommentVNode, useSSRContext, ref, watch, resolveDirective, resolveDynamicComponent, useModel, resolveComponent } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrRenderSlot, ssrInterpolate, ssrGetDirectiveProps, ssrRenderVNode, ssrRenderStyle } from "vue/server-renderer";
import { l as link_default, u as usePage } from "../ssr.js";
import { _ as _sfc_main$6 } from "./Breadcrumbs-DA__G0nP.js";
import { IconX, IconLayoutDashboardFilled, IconLayoutDashboard, IconShoppingCartFilled, IconShoppingCart, IconMessageCircle, IconSettings, IconChevronLeft, IconLogout } from "@tabler/icons-vue";
import { defineStore } from "pinia";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import { _ as _sfc_main$5 } from "./ApplicationLogo-DsJOFw9w.js";
const _sfc_main$4 = {
  __name: "AdminNavLink",
  __ssrInlineRender: true,
  props: {
    href: { type: String, required: true },
    active: { type: Boolean, default: false },
    showText: { type: Boolean, default: true },
    title: { type: String, default: "" },
    class: { type: String, default: "" },
    // Класи для li
    iconClass: { type: String, default: "" },
    textClass: { type: String, default: "" }
  },
  setup(__props) {
    const props = __props;
    const slots = useSlots();
    const liClasses = computed(() => [
      "group list-none transition-all duration-200 ease-in-out cursor-pointer text-sm px-4",
      props.active ? "bg-gray-100" : "",
      props.class
    ]);
    const iconWrapperClasses = computed(() => [
      "py-2",
      props.active ? "text-brand" : "text-gray-500 group-hover:text-brand transition duration-300 ease-out",
      props.iconClass
    ]);
    const tooltipText = computed(() => {
      if (props.title) return props.title;
      return slots.default ? slots.default()[0]?.children : "";
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<li${ssrRenderAttrs(mergeProps({
        class: liClasses.value,
        title: !__props.showText ? tooltipText.value : ""
      }, _attrs))}>`);
      _push(ssrRenderComponent(unref(link_default), {
        href: __props.href,
        class: "flex items-center space-x-2 w-full outline-none",
        "aria-current": __props.active ? "page" : void 0
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="${ssrRenderClass(iconWrapperClasses.value)}"${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "icon", {}, null, _push2, _parent2, _scopeId);
            _push2(`</span>`);
            if (__props.showText) {
              _push2(`<span class="${ssrRenderClass([[
                __props.active ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200",
                __props.textClass
              ], "flex items-center font-medium text-sm whitespace-nowrap overflow-hidden text-ellipsis transition-colors duration-200"])}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
              _push2(`</span>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("span", { class: iconWrapperClasses.value }, [
                renderSlot(_ctx.$slots, "icon")
              ], 2),
              createVNode(Transition, {
                "enter-active-class": "transition duration-300 ease-out",
                "enter-from-class": "opacity-0 -translate-x-2",
                "enter-to-class": "opacity-100 translate-x-0",
                "leave-active-class": "transition duration-100 ease-in",
                "leave-from-class": "opacity-100",
                "leave-to-class": "opacity-0"
              }, {
                default: withCtx(() => [
                  __props.showText ? (openBlock(), createBlock("span", {
                    key: 0,
                    class: ["flex items-center font-medium text-sm whitespace-nowrap overflow-hidden text-ellipsis transition-colors duration-200", [
                      __props.active ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200",
                      __props.textClass
                    ]]
                  }, [
                    renderSlot(_ctx.$slots, "default")
                  ], 2)) : createCommentVNode("", true)
                ]),
                _: 3
              })
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(`</li>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/AdminNavLink.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const useAlertStore = defineStore("alert", {
  state: () => ({
    localAlert: null,
    // Змінна для зберігання ідентифікатора таймера
    timer: null
  }),
  actions: {
    setAlert(type, message) {
      this.localAlert = { type, message };
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        this.clearAlert();
      }, 5e3);
    },
    clearAlert() {
      this.localAlert = null;
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
    }
  }
});
const _sfc_main$3 = {
  __name: "AlertMessage",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const alertStore = useAlertStore();
    const isVisible = ref(false);
    const displayAlert = ref(null);
    const currentSourceAlert = computed(() => {
      return page.props.alert || alertStore.localAlert;
    });
    watch(
      currentSourceAlert,
      (newAlert) => {
        if (newAlert) {
          displayAlert.value = newAlert;
          isVisible.value = true;
        } else {
          isVisible.value = false;
        }
      },
      { immediate: true }
    );
    watch(
      () => page.props.errors,
      (errors) => {
        if (Object.keys(errors).length > 0) {
          displayAlert.value = {
            type: "error",
            message: "Перевірте правильність заповнення полів на всіх мовах."
          };
          isVisible.value = true;
        }
      },
      { deep: true }
    );
    const alertClasses = computed(() => {
      if (!displayAlert.value) return {};
      switch (displayAlert.value.type) {
        case "success":
          return {
            "bg-green-100": true,
            "border-green-400": true,
            "text-green-700": true
          };
        case "error":
          return {
            "bg-red-100": true,
            "border-red-400": true,
            "text-red-700": true
          };
        case "info":
        case "warning":
          return {
            "bg-yellow-100": true,
            "border-yellow-400": true,
            "text-yellow-700": true
          };
        default:
          return {};
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (isVisible.value && displayAlert.value) {
        _push(`<div${ssrRenderAttrs(mergeProps({
          class: [alertClasses.value, "fixed text-sm px-2 py-2 flex items-center justify-between top-4 right-4 z-50 rounded-lg shadow-lg border-l-4 transition duration-300 ease-in-out"],
          role: "alert"
        }, _attrs))} data-v-864354b0><div class="flex items-center" data-v-864354b0>`);
        if (displayAlert.value.type === "success") {
          _push(`<svg class="w-4 h-4 mr-2 fill-current text-green-500" viewBox="0 0 20 20" data-v-864354b0><path d="M0 11l2-2 5 5L18 3l2 2L7 18z" data-v-864354b0></path></svg>`);
        } else {
          _push(`<!---->`);
        }
        if (displayAlert.value.type === "error") {
          _push(`<svg class="w-4 h-4 mr-2 fill-current text-red-500" viewBox="0 0 20 20" data-v-864354b0><path d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 9H6v2h2v-2zm3 0h-2v2h2v-2zm3 0h-2v2h2v-2zM4 10a6 6 0 1112 0 6 6 0 01-12 0z" data-v-864354b0></path></svg>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<p class="font-bold" data-v-864354b0>${ssrInterpolate(displayAlert.value.type.charAt(0).toUpperCase() + displayAlert.value.type.slice(1))} ! </p><p class="ml-2" data-v-864354b0>${ssrInterpolate(displayAlert.value.message)}</p></div><button class="p-2 text-red-500" data-v-864354b0>`);
        _push(ssrRenderComponent(unref(IconX), {
          size: 18,
          stroke: "2"
        }, null, _parent));
        _push(`</button></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/AlertMessage.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const AlertMessage = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-864354b0"]]);
const _sfc_main$2 = {
  __name: "AdminNavButton",
  __ssrInlineRender: true,
  props: {
    href: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(link_default), mergeProps({
        href: __props.href,
        class: [
          "inline-block p-2 rounded-lg transition-all duration-200",
          __props.active ? "text-brand bg-gray-100 dark:bg-slate-800 shadow-inner" : "text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800/50"
        ]
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/UI/Buttons/Admin/AdminNavButton.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "AdminSidebar",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_tooltip = resolveDirective("tooltip");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col w-full h-full" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(link_default), {
        href: _ctx.route("admin.dashboard"),
        class: "flex justify-center items-center border-b h-14 w-14 p-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$5, { class: "w-full h-full bg-brand" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$5, { class: "w-full h-full bg-brand" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<nav class="flex flex-col items-center flex-grow py-6 space-y-2">`);
      _push(ssrRenderComponent(_sfc_main$2, mergeProps({
        href: _ctx.route("admin.dashboard"),
        active: _ctx.$page.component === "Admin/Dashboard/Index" || _ctx.$page.url.startsWith("/users") || _ctx.$page.url.startsWith("/pages") || _ctx.$page.url.startsWith("/menus")
      }, ssrGetDirectiveProps(_ctx, _directive_tooltip, {
        content: _ctx.$t("Dashboard"),
        placement: "right"
      })), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(
              _ctx.$page.component === "Admin/Dashboard/Index" || _ctx.$page.url.startsWith("/users") || _ctx.$page.url.startsWith("/pages") || _ctx.$page.url.startsWith("/menus") ? unref(IconLayoutDashboardFilled) : unref(IconLayoutDashboard)
            ), {
              stroke: 1,
              class: "w-6 h-6"
            }, null), _parent2, _scopeId);
          } else {
            return [
              (openBlock(), createBlock(resolveDynamicComponent(
                _ctx.$page.component === "Admin/Dashboard/Index" || _ctx.$page.url.startsWith("/users") || _ctx.$page.url.startsWith("/pages") || _ctx.$page.url.startsWith("/menus") ? unref(IconLayoutDashboardFilled) : unref(IconLayoutDashboard)
              ), {
                stroke: 1,
                class: "w-6 h-6"
              }))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$2, mergeProps({
        href: _ctx.route("admin.commerce.orders.index"),
        active: _ctx.$page.url.startsWith("/commerce")
      }, ssrGetDirectiveProps(_ctx, _directive_tooltip, {
        content: _ctx.$t("Commerce"),
        placement: "right"
      })), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(
              _ctx.$page.url.startsWith("/commerce") ? unref(IconShoppingCartFilled) : unref(IconShoppingCart)
            ), {
              stroke: 1,
              class: "w-6 h-6"
            }, null), _parent2, _scopeId);
          } else {
            return [
              (openBlock(), createBlock(resolveDynamicComponent(
                _ctx.$page.url.startsWith("/commerce") ? unref(IconShoppingCartFilled) : unref(IconShoppingCart)
              ), {
                stroke: 1,
                class: "w-6 h-6"
              }))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$2, mergeProps({
        href: _ctx.route("admin.dashboard"),
        active: false
      }, ssrGetDirectiveProps(_ctx, _directive_tooltip, {
        content: _ctx.$t("Messages"),
        placement: "right"
      })), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(IconMessageCircle), {
              stroke: 1,
              class: "w-6 h-6"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(IconMessageCircle), {
                stroke: 1,
                class: "w-6 h-6"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</nav><div class="flex flex-col items-center space-y-4 py-2">`);
      _push(ssrRenderComponent(_sfc_main$2, mergeProps({
        href: _ctx.route("admin.settings.index"),
        active: _ctx.$page.url.startsWith("/settings")
      }, ssrGetDirectiveProps(_ctx, _directive_tooltip, {
        content: _ctx.$t("Settings"),
        placement: "right"
      })), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(IconSettings), {
              stroke: 1,
              class: "w-6 h-6"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(IconSettings), {
                stroke: 1,
                class: "w-6 h-6"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Shared/AdminSidebar.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "AdminLayout",
  __ssrInlineRender: true,
  props: {
    "isSidebarVisible": { default: true },
    "isSidebarVisibleModifiers": {}
  },
  emits: ["update:isSidebarVisible"],
  setup(__props) {
    const isSidebarVisible = useModel(__props, "isSidebarVisible");
    const isSecondarySidebarVisible = ref(true);
    const page = usePage();
    const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
    const title = computed(() => {
      const breadcrumbs = page.props.breadcrumbs;
      return breadcrumbs?.length ? breadcrumbs[breadcrumbs.length - 1]?.title ?? "Dashboard" : "Dashboard";
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      const _directive_tooltip = resolveDirective("tooltip");
      _push(`<!--[-->`);
      if (!isSidebarVisible.value) {
        _push(`<div class="fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity duration-300" data-v-61b0585e></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-slate-200 w-full min-h-screen" data-v-61b0585e><div class="flex w-full h-full relative" data-v-61b0585e><aside class="${ssrRenderClass([[
        isSidebarVisible.value ? "hidden md:flex relative" : "flex absolute h-full"
      ], "border-r dark:border-slate-800 dark:shadow-2xl"])}" data-v-61b0585e><div class="bg-gray-50 dark:bg-slate-900 flex flex-col z-[60]" data-v-61b0585e>`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`</div><button class="bg-white dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 transition-all duration-150 absolute z-[60] top-11 -right-3 w-6 h-6 border dark:border-slate-600 rounded-full flex items-center justify-center" data-v-61b0585e>`);
      _push(ssrRenderComponent(unref(IconChevronLeft), {
        size: 16,
        stroke: 1.5,
        class: [isSecondarySidebarVisible.value ? "" : "rotate-180"]
      }, null, _parent));
      _push(`</button>`);
      if (_ctx.$slots.sidenav) {
        _push(`<div class="w-[200px] border-l dark:border-slate-800 bg-white dark:bg-slate-900 z-50 relative" style="${ssrRenderStyle(isSecondarySidebarVisible.value ? null : { display: "none" })}" data-v-61b0585e>`);
        ssrRenderSlot(_ctx.$slots, "sidenav", {}, null, _push, _parent);
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</aside><div class="flex flex-col w-full h-screen overflow-y-auto" data-v-61b0585e><header class="w-full h-14 border-b text-xs text-gray-600 dark:text-slate-300 dark:border-slate-700" data-v-61b0585e><div class="px-2 md:px-4 lg:px-8 h-full" data-v-61b0585e><div class="flex justify-between items-center h-full space-x-2 border-l border-r" data-v-61b0585e><div class="flex items-center" data-v-61b0585e><button class="group inline-flex md:hidden p-2 text-slate-800 dark:text-slate-200 items-center justify-center rounded transition" data-v-61b0585e><svg class="w-6 h-6 fill-current" viewBox="0 0 16 16" data-v-61b0585e><rect class="origin-center" y="3" width="16" height="2" rx="1" data-v-61b0585e></rect><rect class="origin-center" y="7" width="16" height="2" rx="1" data-v-61b0585e></rect><rect class="origin-center" y="11" width="16" height="2" rx="1" data-v-61b0585e></rect></svg></button><div class="p-2 ml-2" data-v-61b0585e><h1 class="font-semibold text-gray-800 dark:text-slate-300 text-base" data-v-61b0585e>${ssrInterpolate(title.value)}</h1>`);
      _push(ssrRenderComponent(_sfc_main$6, null, null, _parent));
      _push(`</div></div>`);
      _push(ssrRenderComponent(_component_Link, mergeProps({
        method: "post",
        href: "/logout",
        class: "px-4 hover:text-gray-800 duration-150"
      }, ssrGetDirectiveProps(_ctx, _directive_tooltip, {
        content: _ctx.$t("Log out"),
        placement: "bottom"
      })), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(IconLogout), { stroke: "{2}" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(IconLogout), { stroke: "{2}" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></header><main class="flex-grow" data-v-61b0585e>`);
      _push(ssrRenderComponent(AlertMessage, null, null, _parent));
      _push(`<div class="px-2 md:px-4 lg:px-8 w-full h-full" data-v-61b0585e><template><div class="border-l border-r h-full p-4" data-v-61b0585e>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></template></div></main><footer class="text-xs text-gray-600 dark:text-slate-400 border-t dark:border-slate-700" data-v-61b0585e><div class="px-2 md:px-4 lg:px-8" data-v-61b0585e><p class="text-center md:text-end border-l border-r h-full p-4" data-v-61b0585e> © ${ssrInterpolate(unref(currentYear))} ${ssrInterpolate(_ctx.$page.props.app.name)}. Version ${ssrInterpolate(_ctx.$page.props.app.version)}</p></div></footer></div></div></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/Admin/AdminLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const AdminLayout = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-61b0585e"]]);
export {
  AdminLayout as A,
  _sfc_main$4 as _
};
