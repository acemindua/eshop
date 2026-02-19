import { computed, resolveComponent, mergeProps, withCtx, createVNode, renderSlot, useSSRContext, resolveDirective, unref, ref, watch } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrRenderSlot, ssrGetDirectiveProps, ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderStyle } from "vue/server-renderer";
import { IconShoppingBag, IconSettings, IconX, IconChevronLeft } from "@tabler/icons-vue";
import { _ as _sfc_main$6 } from "./ApplicationLogo-DsJOFw9w.js";
import { _ as _sfc_main$7 } from "./ImageDataView-C9GsQUU8.js";
import "./UserStatus-DfjMQc-4.js";
import { _ as _sfc_main$8 } from "./Breadcrumbs-Be9A5eey.js";
import { usePage } from "@inertiajs/vue3";
import { defineStore } from "pinia";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const baseClasses = "inline-flex space-x-2 w-full items-center p-2 rounded-lg text-sm leading-5 text-slate-600 transition duration-150 ease-in-out hover:bg-slate-100";
const activeClasses = "";
const _sfc_main$5 = {
  __name: "AdminNavLink",
  __ssrInlineRender: true,
  props: {
    href: { type: String, required: true },
    active: { type: Boolean, default: false },
    class: { type: String, default: "" },
    // додаткові класи ззовні
    iconClass: { type: String, default: "" },
    // додаткові класи для іконки
    textClass: { type: String, default: "" }
    // додаткові класи для тексту
  },
  setup(__props) {
    const props = __props;
    const classes = computed(
      () => `${baseClasses} ${props.active ? activeClasses : ""} ${props.class}`
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      _push(ssrRenderComponent(_component_Link, mergeProps({
        href: __props.href,
        class: classes.value
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="${ssrRenderClass([[__props.active ? "text-brand " : "", __props.iconClass], "flex items-center justify-center rounded-lg transition duration-150 ease-in-out"])}"${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "icon", {}, null, _push2, _parent2, _scopeId);
            _push2(`</span><span class="${ssrRenderClass([__props.textClass, "flex items-center text-slate-600"])}"${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            _push2(`</span>`);
          } else {
            return [
              createVNode("span", {
                class: ["flex items-center justify-center rounded-lg transition duration-150 ease-in-out", [__props.active ? "text-brand " : "", __props.iconClass]]
              }, [
                renderSlot(_ctx.$slots, "icon")
              ], 2),
              createVNode("span", {
                class: ["flex items-center text-slate-600", __props.textClass]
              }, [
                renderSlot(_ctx.$slots, "default")
              ], 2)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/AdminNavLink.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = {
  __name: "AdminNavButton",
  __ssrInlineRender: true,
  props: {
    href: {
      type: String,
      required: true
      // Href should typically be required for a Link
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      _push(ssrRenderComponent(_component_Link, mergeProps({
        href: __props.href,
        class: [
          "inline-block text-gray-600 dark:text-slate-400 rounded-lg p-2",
          __props.active ? "text-white dark:text-slate-50 bg-brand rounded-lg shadow-inner" : ""
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
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/UI/Buttons/Admin/AdminNavButton.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = {
  __name: "AdminSidebar",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      const _directive_tooltip = resolveDirective("tooltip");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_Link, {
        href: _ctx.route("admin.dashboard"),
        class: "flex justify-center items-center"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$6, { class: "w-10 h-10 bg-brand" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$6, { class: "w-10 h-10 bg-brand" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<nav class="flex flex-col items-center flex-grow py-6 space-y-2">`);
      _push(ssrRenderComponent(_sfc_main$4, mergeProps({
        href: _ctx.route("admin.items.index"),
        active: _ctx.$page.url.startsWith("/commerce")
      }, ssrGetDirectiveProps(_ctx, _directive_tooltip, {
        content: _ctx.$t("Commerce"),
        placement: "right"
      })), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(IconShoppingBag), {
              stroke: 1,
              class: "w-6 h-6"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(IconShoppingBag), {
                stroke: 1,
                class: "w-6 h-6"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</nav><div class="flex flex-col items-center space-y-4">`);
      _push(ssrRenderComponent(_sfc_main$4, mergeProps({
        href: _ctx.route("admin.settings"),
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
      _push(`</div><!--]-->`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/AdminSidebar.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {
  __name: "UserSmallCard",
  __ssrInlineRender: true,
  props: {
    data: {
      type: Object
    }
  },
  setup(__props) {
    const props = __props;
    const user = computed(() => props.data?.data || {});
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex space-x-2 items-center px-2 text-xs" }, _attrs))}><div class="relative">`);
      _push(ssrRenderComponent(_sfc_main$7, {
        src: user.value?.avatar,
        configs: { width: "36px", height: "36px" }
      }, null, _parent));
      _push(`</div><div class="hidden md:flex flex-col"><p class="font-semibold text-sm">${ssrInterpolate(user.value.name)}</p><p><a${ssrRenderAttr("href", `mailto:${user.value.email}`)} class="text-gray-500">${ssrInterpolate(user.value.email)}</a></p></div></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/UserSmallCard.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
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
const _sfc_main$1 = {
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/AlertMessage.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const AlertMessage = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-864354b0"]]);
const _sfc_main = {
  __name: "AdminLayout",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
    const title = computed(() => {
      const breadcrumbs = page.props.breadcrumbs;
      return breadcrumbs?.length ? breadcrumbs[breadcrumbs.length - 1]?.title ?? "Dashboard" : "Dashboard";
    });
    const isSidebarVisible = ref(true);
    const isSecondarySidebarVisible = ref(true);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Head = resolveComponent("Head");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_Head, { title: title.value }, null, _parent));
      if (!isSidebarVisible.value) {
        _push(`<div class="fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity duration-300" data-v-55517926></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-slate-200 w-full min-h-screen" data-v-55517926><div class="flex w-full h-full relative" data-v-55517926><aside class="${ssrRenderClass([[
        isSidebarVisible.value ? "hidden md:flex" : "flex absolute h-full"
      ], "border-r dark:border-slate-800 dark:shadow-2xl"])}" data-v-55517926><div class="bg-gray-50 dark:bg-slate-900 p-2 flex flex-col z-[60]" data-v-55517926>`);
      _push(ssrRenderComponent(_sfc_main$3, null, null, _parent));
      _push(`</div>`);
      if (_ctx.$slots.sidenav) {
        _push(`<div class="w-60 border-l dark:border-slate-800 bg-white dark:bg-slate-900 z-50 p-4" style="${ssrRenderStyle(isSecondarySidebarVisible.value ? null : { display: "none" })}" data-v-55517926>`);
        ssrRenderSlot(_ctx.$slots, "sidenav", {}, null, _push, _parent);
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</aside><div class="flex flex-col w-full h-screen overflow-y-auto" data-v-55517926><header class="text-xs text-gray-600 dark:text-slate-300 dark:border-slate-700 border-b" data-v-55517926><div class="px-2 md:px-4 lg:px-8" data-v-55517926><div class="flex justify-between items-center space-x-2" data-v-55517926><div class="flex items-center" data-v-55517926><button class="group inline-flex md:hidden p-2 text-slate-800 items-center justify-center rounded transition" data-v-55517926><span class="sr-only" data-v-55517926>Menu</span><svg class="w-6 h-6 fill-current pointer-events-none" viewBox="0 0 16 16" data-v-55517926><rect class="origin-center -translate-y-[5px] translate-x-[7px] transition-all duration-300 group-[aria-pressed=true]:translate-x-0 group-[aria-pressed=true]:translate-y-0 group-[aria-pressed=true]:rotate-[315deg]" y="7" width="9" height="2" rx="1" data-v-55517926></rect><rect class="origin-center transition-all duration-300 group-[aria-pressed=true]:rotate-45" y="7" width="16" height="2" rx="1" data-v-55517926></rect><rect class="origin-center translate-y-[5px] transition-all duration-300 group-[aria-pressed=true]:translate-y-0 group-[aria-pressed=true]:rotate-[135deg]" y="7" width="9" height="2" rx="1" data-v-55517926></rect></svg></button><button class="hidden md:flex border dark:border-gray-800 transition hover:bg-gray-200 dark:hover:bg-slate-900 rounded-lg p-2" data-v-55517926>`);
      _push(ssrRenderComponent(unref(IconChevronLeft), {
        stroke: 2,
        class: [
          isSecondarySidebarVisible.value ? "" : "rotate-180"
        ]
      }, null, _parent));
      _push(`</button><div class="p-2" data-v-55517926><h1 class="font-semibold text-gray-800 dark:text-slate-300 text-base" data-v-55517926>${ssrInterpolate(title.value)}</h1>`);
      _push(ssrRenderComponent(_sfc_main$8, null, null, _parent));
      _push(`</div></div>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        data: _ctx.$page.props.auth.user
      }, null, _parent));
      _push(`</div></div></header><main class="flex-grow py-4" data-v-55517926>`);
      _push(ssrRenderComponent(AlertMessage, null, null, _parent));
      _push(`<div class="px-2 md:px-4 lg:px-8" data-v-55517926><template><div data-v-55517926>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></template></div></main><footer class="text-xs text-gray-600 dark:text-slate-400 border-t dark:border-slate-700 py-4" data-v-55517926><div class="px-2 md:px-4 lg:px-8" data-v-55517926><p class="text-center md:text-end" data-v-55517926>${`© ${unref(currentYear)} ${_ctx.$page.props.app.name}. Version ${_ctx.$page.props.app.version}` ?? ""}</p></div></footer></div></div></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/Admin/AdminLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Layout = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-55517926"]]);
export {
  Layout as L,
  _sfc_main$5 as _
};
