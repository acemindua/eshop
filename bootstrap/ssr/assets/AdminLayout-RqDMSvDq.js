import { useSlots, computed, mergeProps, unref, withCtx, createVNode, renderSlot, Transition, openBlock, createBlock, createCommentVNode, useSSRContext, ref, watch, resolveDirective, resolveDynamicComponent, useModel, resolveComponent } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrRenderSlot, ssrInterpolate, ssrGetDirectiveProps, ssrRenderVNode, ssrRenderStyle } from "vue/server-renderer";
import { l as link_default, b as usePage, h as head_default } from "../ssr.js";
import { _ as _sfc_main$5 } from "./Breadcrumbs-DKsddhuk.js";
import { IconCheck, IconAlertCircle, IconInfoCircle, IconX, IconLayoutDashboardFilled, IconLayoutDashboard, IconShoppingCartFilled, IconShoppingCart, IconSettingsFilled, IconSettings, IconChevronLeft, IconLogout } from "@tabler/icons-vue";
import { defineStore } from "pinia";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import { A as ApplicationLogo } from "./ApplicationLogo-CSNe_4RD.js";
import { V as VarDump } from "./VarDump-DqvrPBoK.js";
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
    const manuallyClosed = ref(false);
    const currentSourceAlert = computed(() => {
      return page.props.alert || alertStore.localAlert;
    });
    watch(
      currentSourceAlert,
      (newAlert) => {
        if (newAlert) {
          manuallyClosed.value = false;
          displayAlert.value = newAlert;
          isVisible.value = true;
        } else if (!page.props.errors || Object.keys(page.props.errors).length === 0) {
          isVisible.value = false;
        }
      },
      { immediate: true, deep: true }
    );
    watch(
      () => page.props.errors,
      (errors) => {
        if (errors && Object.keys(errors).length > 0) {
          manuallyClosed.value = false;
          const errorKeys = Object.keys(errors);
          const firstErrorField = errorKeys[0];
          const firstErrorMessage = errors[firstErrorField];
          displayAlert.value = {
            type: "error",
            // If there's one error — show it. If multiple — append the remaining count.
            message: errorKeys.length > 1 ? `${firstErrorMessage} (And ${errorKeys.length - 1} more errors)` : firstErrorMessage
          };
          isVisible.value = true;
        }
      },
      { deep: true, immediate: true }
    );
    watch(isVisible, (visible) => {
      if (visible && displayAlert.value?.type === "success") {
        setTimeout(() => {
          if (!manuallyClosed.value) {
            closeAlert();
          }
        }, 5e3);
      }
    });
    const closeAlert = () => {
      isVisible.value = false;
      manuallyClosed.value = true;
      if (alertStore.localAlert) {
        alertStore.clearAlert();
      }
      if (page.props.alert) {
        page.props.alert = null;
      }
    };
    const alertClasses = computed(() => {
      if (!displayAlert.value) return {};
      switch (displayAlert.value.type) {
        case "success":
          return "bg-green-50 border-green-400 text-green-800 dark:bg-gray-800 dark:text-green-400 dark:border-green-800";
        case "error":
          return "bg-red-50 border-red-400 text-red-800 dark:bg-gray-800 dark:text-red-400 dark:border-red-800";
        case "info":
          return "bg-blue-50 border-blue-400 text-blue-800 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800";
        case "warning":
          return "bg-yellow-50 border-yellow-400 text-yellow-800 dark:bg-gray-800 dark:text-yellow-400 dark:border-yellow-800";
        default:
          return "bg-white border-slate-300 text-slate-800";
      }
    });
    const closeButtonClasses = computed(() => {
      if (!displayAlert.value) return "";
      switch (displayAlert.value.type) {
        case "success":
          return "text-green-500 hover:bg-green-100 dark:hover:bg-gray-700";
        case "error":
          return "text-red-500 hover:bg-red-100 dark:hover:bg-gray-700";
        case "info":
          return "text-blue-500 hover:bg-blue-100 dark:hover:bg-gray-700";
        case "warning":
          return "text-yellow-600 hover:bg-yellow-100 dark:hover:bg-gray-700";
        default:
          return "text-slate-500 hover:bg-slate-100";
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (isVisible.value && displayAlert.value) {
        _push(`<div${ssrRenderAttrs(mergeProps({
          class: [alertClasses.value, "fixed text-sm p-3 flex items-center justify-between top-4 right-4 z-50 rounded-lg shadow-xl border-l-4 min-w-[320px] max-w-md transition duration-300 ease-in-out"],
          role: "alert"
        }, _attrs))} data-v-1a267129><div class="flex items-center gap-2.5 mr-4" data-v-1a267129>`);
        if (displayAlert.value.type === "success") {
          _push(ssrRenderComponent(unref(IconCheck), {
            size: 20,
            class: "shrink-0 text-green-500"
          }, null, _parent));
        } else if (displayAlert.value.type === "error") {
          _push(ssrRenderComponent(unref(IconAlertCircle), {
            size: 20,
            class: "shrink-0 text-red-500"
          }, null, _parent));
        } else if (displayAlert.value.type === "warning") {
          _push(ssrRenderComponent(unref(IconAlertCircle), {
            size: 20,
            class: "shrink-0 text-yellow-500"
          }, null, _parent));
        } else {
          _push(ssrRenderComponent(unref(IconInfoCircle), {
            size: 20,
            class: "shrink-0 text-blue-500"
          }, null, _parent));
        }
        _push(`<div data-v-1a267129><span class="font-bold uppercase text-[10px] tracking-wider block opacity-75 leading-none" data-v-1a267129>${ssrInterpolate(displayAlert.value.type)}</span><p class="mt-1 leading-tight font-medium text-slate-900 dark:text-slate-100" data-v-1a267129>${ssrInterpolate(displayAlert.value.message)}</p></div></div><button class="${ssrRenderClass([closeButtonClasses.value, "p-1.5 rounded-md transition-colors duration-200 shrink-0"])}" data-v-1a267129>`);
        _push(ssrRenderComponent(unref(IconX), {
          size: 16,
          stroke: "2.5"
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
const AlertMessage = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-1a267129"]]);
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
          __props.active ? "text-brand bg-gray-200 dark:bg-slate-800 shadow-inner" : "text-gray-600 dark:text-slate-400 hover:bg-gray-100 hover:text-brand dark:hover:bg-slate-800/50"
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
    const page = usePage();
    const isDashboardActive = computed(() => {
      return page.component === "Admin/Dashboard" || page.url.startsWith("/users") || page.url.startsWith("/pages") || page.url.startsWith("/menus");
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_tooltip = resolveDirective("tooltip");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col w-full h-full" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(link_default), {
        href: _ctx.route("admin.dashboard"),
        class: "flex justify-center items-center border-b h-14 w-14 p-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(ApplicationLogo, { class: "w-full h-full bg-brand" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(ApplicationLogo, { class: "w-full h-full bg-brand" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<nav class="flex flex-col items-center justify-center flex-grow py-6 space-y-2">`);
      _push(ssrRenderComponent(_sfc_main$2, mergeProps({
        href: _ctx.route("admin.dashboard"),
        active: isDashboardActive.value
      }, ssrGetDirectiveProps(_ctx, _directive_tooltip, {
        content: _ctx.$t("Dashboard"),
        placement: "right"
      })), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(
              isDashboardActive.value ? unref(IconLayoutDashboardFilled) : unref(IconLayoutDashboard)
            ), {
              stroke: 1,
              class: "w-6 h-6"
            }, null), _parent2, _scopeId);
          } else {
            return [
              (openBlock(), createBlock(resolveDynamicComponent(
                isDashboardActive.value ? unref(IconLayoutDashboardFilled) : unref(IconLayoutDashboard)
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
        href: _ctx.route("admin.commerce.items.index"),
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
      _push(`</nav><div class="flex flex-col items-center space-y-4 py-2">`);
      _push(ssrRenderComponent(_sfc_main$2, mergeProps({
        href: _ctx.route("admin.settings.options"),
        active: _ctx.$page.url.startsWith("/settings")
      }, ssrGetDirectiveProps(_ctx, _directive_tooltip, {
        content: _ctx.$t("System"),
        placement: "right"
      })), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(
              _ctx.$page.url.startsWith("/settings") ? unref(IconSettingsFilled) : unref(IconSettings)
            ), {
              stroke: 1,
              class: "w-6 h-6"
            }, null), _parent2, _scopeId);
          } else {
            return [
              (openBlock(), createBlock(resolveDynamicComponent(
                _ctx.$page.url.startsWith("/settings") ? unref(IconSettingsFilled) : unref(IconSettings)
              ), {
                stroke: 1,
                class: "w-6 h-6"
              }))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/Admin/AdminSidebar.vue");
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
      _push(ssrRenderComponent(unref(head_default), {
        title: `${title.value} - ${unref(page).props.app?.name}` ?? "App"
      }, null, _parent));
      if (!isSidebarVisible.value) {
        _push(`<div class="fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity duration-300" data-v-b99346af></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-slate-200 w-full min-h-screen" data-v-b99346af><div class="flex w-full h-full relative" data-v-b99346af><aside class="${ssrRenderClass([[
        isSidebarVisible.value ? "hidden md:flex relative" : "flex absolute h-full"
      ], "border-r dark:border-slate-800 dark:shadow-2xl"])}" data-v-b99346af><div class="bg-gray-50 flex flex-col z-[60]" data-v-b99346af>`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`</div><button class="${ssrRenderClass([
        isSecondarySidebarVisible.value ? "bg-white dark:bg-slate-700 dark:border-slate-600 hover:bg-brand hover:text-white dark:hover:bg-slate-600 " : "hover:bg-brand  hover:bg-brand-dark ",
        "transition-all duration-150 border absolute z-[60] top-11 -right-3 w-6 h-6 rounded-full flex items-center justify-center"
      ])}" data-v-b99346af>`);
      _push(ssrRenderComponent(unref(IconChevronLeft), {
        size: 16,
        stroke: 1.5,
        class: [
          isSecondarySidebarVisible.value ? "" : "rotate-180 "
        ]
      }, null, _parent));
      _push(`</button>`);
      if (_ctx.$slots.sidenav) {
        _push(`<div class="w-[200px] md:w-[280px] border-l dark:border-slate-800 bg-white dark:bg-slate-900 z-50 relative" style="${ssrRenderStyle(isSecondarySidebarVisible.value ? null : { display: "none" })}" data-v-b99346af>`);
        ssrRenderSlot(_ctx.$slots, "sidenav", {}, null, _push, _parent);
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</aside><div class="flex flex-col w-full h-screen overflow-y-auto" data-v-b99346af><header class="w-full h-14 border-b text-xs text-gray-600 dark:text-slate-300 dark:border-slate-700" data-v-b99346af><div class="px-2 md:px-4 lg:px-8 h-full container mx-auto" data-v-b99346af><div class="flex justify-between items-center h-full space-x-2 border-l border-r" data-v-b99346af><div class="flex items-center" data-v-b99346af><button class="group inline-flex md:hidden p-2 text-slate-800 dark:text-slate-200 items-center justify-center rounded transition" data-v-b99346af><svg class="w-6 h-6 fill-current" viewBox="0 0 16 16" data-v-b99346af><rect class="origin-center" y="3" width="16" height="2" rx="1" data-v-b99346af></rect><rect class="origin-center" y="7" width="16" height="2" rx="1" data-v-b99346af></rect><rect class="origin-center" y="11" width="16" height="2" rx="1" data-v-b99346af></rect></svg></button><div class="p-2 ml-2" data-v-b99346af><h1 class="font-semibold text-gray-800 dark:text-slate-300 text-base" data-v-b99346af>${ssrInterpolate(title.value)}</h1>`);
      _push(ssrRenderComponent(_sfc_main$5, null, null, _parent));
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
      _push(`</div></div></header><main class="flex-grow" data-v-b99346af>`);
      _push(ssrRenderComponent(AlertMessage, null, null, _parent));
      _push(`<div class="px-2 md:px-4 lg:px-8 w-full h-full container mx-auto" data-v-b99346af><template><div class="border-l border-r h-full p-4" data-v-b99346af>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`<div class="mt-4" data-v-b99346af>`);
      _push(ssrRenderComponent(VarDump, { data: _ctx.$page }, null, _parent));
      _push(`</div></div></template></div></main><footer class="text-xs text-gray-600 dark:text-slate-400 border-t dark:border-slate-700" data-v-b99346af><div class="px-2 md:px-4 lg:px-8 container mx-auto" data-v-b99346af><p class="text-center md:text-end border-l border-r h-full p-4" data-v-b99346af> © ${ssrInterpolate(unref(currentYear))} ${ssrInterpolate(_ctx.$page.props.app.name)}. Version ${ssrInterpolate(_ctx.$page.props.app.version)}</p></div></footer></div></div></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/Admin/AdminLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const AdminLayout = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b99346af"]]);
export {
  AdminLayout as A,
  _sfc_main$4 as _
};
