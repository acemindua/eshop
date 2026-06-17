import { computed, mergeProps, useSSRContext, ref, watch, onUnmounted, unref, withCtx, createVNode, toDisplayString, openBlock, createBlock, Fragment } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import "../ssr.js";
import debounce from "lodash.debounce";
import { _ as _sfc_main$2 } from "./DashboardAdminLayout-Bu9xuVNu.js";
import { B as ButtonsGroup } from "./ButtonsGroup-sb8icSMB.js";
import { _ as _sfc_main$3 } from "./InputSearch-CL2slP12.js";
import { _ as _sfc_main$4 } from "./DataTable-ECUTb2Ru.js";
import { IconUsers, IconShieldFilled, IconSortAscending, IconSortDescending, IconArrowsSort } from "@tabler/icons-vue";
import { I as ImageDataView } from "./ImageDataView-yaU4wWw9.js";
import { router } from "@inertiajs/core";
import "@unhead/vue/server";
import "@vue/shared";
import "@vue/compiler-ssr";
import "node:stream";
import "lodash-es";
import "laravel-precognition";
import "@inertiajs/core/server";
import "pinia";
import "@floating-ui/dom";
import "./AdminLayout-rVzSZY36.js";
import "./Breadcrumbs-DKsddhuk.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./ApplicationLogo-CSNe_4RD.js";
import "./VarDump-DqvrPBoK.js";
import "sweetalert2";
import "./Checkbox-86GmRX3v.js";
import "./Pagination-FQ4yDsyZ.js";
function useFormatter() {
  const formatPhone = (phone) => {
    if (!phone) return "—";
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.startsWith("380") && cleaned.length === 12) {
      const part = cleaned.substring(2);
      return `${part.substring(0, 3)} ${part.substring(3, 6)} ${part.substring(6)}`;
    }
    return phone;
  };
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("uk-UA", { style: "currency", currency: "UAH" }).format(value);
  };
  return { formatPhone, formatCurrency };
}
const _sfc_main$1 = {
  __name: "UserStatus",
  __ssrInlineRender: true,
  props: {
    // Об'єкт користувача з даними з БД
    user: {
      type: Object,
      required: true
    },
    // Додано підтримку 'xs'
    size: {
      type: String,
      default: "sm",
      validator: (value) => ["xs", "sm", "md"].includes(value)
    },
    description: {
      type: Boolean,
      default: true
    }
  },
  setup(__props) {
    const props = __props;
    const isOnline = computed(() => props.user.is_online);
    const lastActivity = computed(() => props.user.last_activity);
    const activityStatus = computed(() => {
      if (isOnline.value) return "online";
      if (lastActivity.value) return "offline";
      return "never";
    });
    const statusColor = computed(() => {
      switch (activityStatus.value) {
        case "online":
          return "bg-green-500";
        case "offline":
          return "bg-yellow-500";
        case "never":
          return "bg-gray-400";
        default:
          return "bg-gray-400";
      }
    });
    const statusTextColor = computed(() => {
      switch (activityStatus.value) {
        case "online":
          return "text-green-600 font-medium";
        case "offline":
          return "text-yellow-600";
        case "never":
          return "text-gray-500 italic";
        default:
          return "text-gray-500";
      }
    });
    const statusText = computed(() => {
      switch (activityStatus.value) {
        case "online":
          return "Онлайн";
        case "offline":
          return `Був: ${lastActivity.value}`;
        case "never":
          return "Не заходив";
        default:
          return "Невідомо";
      }
    });
    const sizeClasses = {
      xs: "text-[10px] leading-tight",
      sm: "text-xs",
      md: "text-sm"
    };
    const dotSizeClasses = {
      xs: "w-1.5 h-1.5",
      sm: "w-2 h-2",
      md: "w-2.5 h-2.5"
    };
    const statusRing = computed(() => {
      return activityStatus.value === "online" ? "ring-2 ring-green-200" : "";
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["flex items-center space-x-1.5", sizeClasses[__props.size]]
      }, _attrs))}><div class="${ssrRenderClass([
        dotSizeClasses[__props.size],
        "rounded-full transition-colors duration-300",
        statusColor.value,
        statusRing.value
      ])}"></div>`);
      if (__props.description) {
        _push(`<span class="${ssrRenderClass(statusTextColor.value)}">${ssrInterpolate(statusText.value)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/UserStatus.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: _sfc_main$2 }, {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    data: { type: Object, default: () => ({ items: { data: [], meta: {} } }) },
    filters: {
      type: Object,
      default: () => ({ search: "", field: "id", direction: "desc" })
    },
    routePrefix: { type: String, required: true }
  },
  setup(__props) {
    const props = __props;
    const routePrefix = props.routePrefix;
    const items = computed(() => props.data?.items?.data || []);
    const metaItems = computed(() => props.data?.items?.meta || []);
    const searchText = ref(props.filters?.search || "");
    const selectedItems = ref([]);
    const { formatPhone } = useFormatter();
    const sortField = ref(props.filters?.field || "id");
    const sortDirection = ref(props.filters?.direction || "desc");
    const handleImport = () => console.log("Importing...");
    const handleCreate = () => router.visit(route(`${routePrefix}.create`));
    const handleDelete = (item) => {
      if (!confirm(
        route().params.locale === "uk" ? "Ви впевнені, що хочете видалити цього користувача?" : "Are you sure you want to delete this user?"
      ))
        return;
      router.delete(route(`${routePrefix}.destroy`, item.id), {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => {
          selectedItems.value = [];
        }
      });
    };
    const handleSort = (field) => {
      if (sortField.value === field) {
        sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
      } else {
        sortField.value = field;
        sortDirection.value = "asc";
      }
    };
    const actionButtons = [
      {
        label: "import",
        disabled: true,
        action: handleImport,
        type: "secondary",
        icon: "IconCloudUpload"
      },
      {
        label: "create",
        action: handleCreate,
        type: "primary",
        icon: "IconCirclePlus"
      }
    ];
    const roleStyles = {
      "super-user": "bg-red-50 text-red-700 border border-red-100 dark:bg-red-950/30 dark:text-red-400 dark:border-red-900/50",
      administrator: "bg-purple-50 text-purple-700 border border-purple-100 dark:bg-purple-950/30 dark:text-purple-400 dark:border-purple-900/50",
      moder: "bg-blue-50 text-blue-700 border border-blue-100 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-900/50",
      auth: "bg-green-50 text-green-700 border border-green-100 dark:bg-green-950/30 dark:text-green-400 dark:border-green-900/50",
      default: "bg-slate-50 text-slate-600 border border-slate-200 dark:bg-slate-800/50 dark:text-slate-400 dark:border-slate-700"
    };
    const getRoleClass = (roleName) => {
      return roleStyles[roleName] || roleStyles["default"];
    };
    const dbRequest = debounce((searchVal, field, direction) => {
      router.get(
        route(`${routePrefix}.index`),
        { search: searchVal, field, direction },
        {
          preserveState: true,
          replace: true,
          preserveScroll: true
        }
      );
    }, 400);
    watch(
      [searchText, sortField, sortDirection],
      ([searchVal, field, direction]) => {
        dbRequest(searchVal, field, direction);
      }
    );
    onUnmounted(() => {
      dbRequest.cancel();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col space-y-4" }, _attrs))}><div class="flex items-center justify-between bg-gray-50 dark:bg-slate-900/50 border dark:border-slate-800 rounded-xl p-4 shadow-xs"><div class="flex items-center space-x-3"><div class="p-2 bg-brand text-white rounded-xl shadow-sm">`);
      _push(ssrRenderComponent(unref(IconUsers), { size: "20" }, null, _parent));
      _push(`</div><div><h1 class="text-base font-semibold tracking-tight dark:text-slate-200">${ssrInterpolate(_ctx.$t("Users"))}</h1><p class="text-xs text-slate-400 font-medium">${ssrInterpolate(_ctx.$t("Manage user accounts, roles, and permissions"))}</p></div></div>`);
      _push(ssrRenderComponent(ButtonsGroup, { buttons: actionButtons }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        modelValue: searchText.value,
        "onUpdate:modelValue": ($event) => searchText.value = $event,
        class: "w-64"
      }, null, _parent));
      _push(`<section>`);
      _push(ssrRenderComponent(_sfc_main$4, {
        "route-prefix": unref(routePrefix),
        items: items.value,
        meta: metaItems.value,
        "selected-items": selectedItems.value,
        "onUpdate:selectedItems": ($event) => selectedItems.value = $event,
        onDelete: handleDelete,
        "sort-field": sortField.value,
        "sort-direction": sortDirection.value,
        onSort: handleSort
      }, {
        headers: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<th class="py-2 text-center w-16 text-slate-500 dark:text-slate-400 font-semibold text-xs uppercase tracking-wider"${_scopeId}>${ssrInterpolate(_ctx.$t("ava"))}</th><th class="p-2 text-left cursor-pointer select-none text-slate-500 dark:text-slate-400 font-semibold text-xs uppercase tracking-wider"${_scopeId}><div class="flex items-center space-x-1"${_scopeId}><span${_scopeId}>${ssrInterpolate(_ctx.$t("User Info"))}</span>`);
            if (sortField.value === "full_name") {
              _push2(`<!--[-->`);
              if (sortDirection.value === "asc") {
                _push2(ssrRenderComponent(unref(IconSortAscending), { size: "14" }, null, _parent2, _scopeId));
              } else {
                _push2(ssrRenderComponent(unref(IconSortDescending), { size: "14" }, null, _parent2, _scopeId));
              }
              _push2(`<!--]-->`);
            } else {
              _push2(ssrRenderComponent(unref(IconArrowsSort), {
                size: "14",
                class: "text-gray-300 dark:text-slate-600"
              }, null, _parent2, _scopeId));
            }
            _push2(`</div></th><th class="p-2 text-left text-slate-500 dark:text-slate-400 font-semibold text-xs uppercase tracking-wider"${_scopeId}>${ssrInterpolate(_ctx.$t("Role"))}</th><th class="p-2 text-left text-slate-500 dark:text-slate-400 font-semibold text-xs uppercase tracking-wider"${_scopeId}>${ssrInterpolate(_ctx.$t("Contacts"))}</th>`);
          } else {
            return [
              createVNode("th", { class: "py-2 text-center w-16 text-slate-500 dark:text-slate-400 font-semibold text-xs uppercase tracking-wider" }, toDisplayString(_ctx.$t("ava")), 1),
              createVNode("th", {
                class: "p-2 text-left cursor-pointer select-none text-slate-500 dark:text-slate-400 font-semibold text-xs uppercase tracking-wider",
                onClick: ($event) => handleSort("full_name")
              }, [
                createVNode("div", { class: "flex items-center space-x-1" }, [
                  createVNode("span", null, toDisplayString(_ctx.$t("User Info")), 1),
                  sortField.value === "full_name" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                    sortDirection.value === "asc" ? (openBlock(), createBlock(unref(IconSortAscending), {
                      key: 0,
                      size: "14"
                    })) : (openBlock(), createBlock(unref(IconSortDescending), {
                      key: 1,
                      size: "14"
                    }))
                  ], 64)) : (openBlock(), createBlock(unref(IconArrowsSort), {
                    key: 1,
                    size: "14",
                    class: "text-gray-300 dark:text-slate-600"
                  }))
                ])
              ], 8, ["onClick"]),
              createVNode("th", { class: "p-2 text-left text-slate-500 dark:text-slate-400 font-semibold text-xs uppercase tracking-wider" }, toDisplayString(_ctx.$t("Role")), 1),
              createVNode("th", { class: "p-2 text-left text-slate-500 dark:text-slate-400 font-semibold text-xs uppercase tracking-wider" }, toDisplayString(_ctx.$t("Contacts")), 1)
            ];
          }
        }),
        "item-data": withCtx(({ item }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<td class="p-2 text-center align-middle"${_scopeId}><div class="relative inline-flex"${_scopeId}>`);
            _push2(ssrRenderComponent(ImageDataView, {
              src: item?.avatar,
              configs: { width: "32px", height: "32px" },
              class: "rounded-full shadow-sm object-cover"
            }, null, _parent2, _scopeId));
            _push2(`</div></td><td class="p-2 align-middle"${_scopeId}><div class="flex flex-col leading-tight"${_scopeId}><span class="font-medium text-slate-900 dark:text-slate-100"${_scopeId}>${ssrInterpolate(item.full_name)}</span>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              user: {
                is_online: item.online,
                last_activity: item.last_activity_raw
              }
            }, null, _parent2, _scopeId));
            _push2(`</div></td><td class="p-2 align-middle"${_scopeId}><div class="${ssrRenderClass([getRoleClass(item.role), "inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-medium tracking-wide"])}"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(IconShieldFilled), {
              size: "12",
              class: "opacity-80 text-orange-400 dark:text-orange-500"
            }, null, _parent2, _scopeId));
            _push2(`<span${_scopeId}>${ssrInterpolate(item.role ? _ctx.$t(item.role) : "—")}</span></div></td><td class="p-2 align-middle"${_scopeId}><div class="flex flex-col text-xs space-y-0.5"${_scopeId}><span class="text-slate-700 dark:text-slate-300 font-medium"${_scopeId}>${ssrInterpolate(unref(formatPhone)(item.phone) || "—")}</span><span class="text-slate-400 dark:text-slate-500 italic text-[10px]"${_scopeId}>${ssrInterpolate(item.email)}</span></div></td>`);
          } else {
            return [
              createVNode("td", { class: "p-2 text-center align-middle" }, [
                createVNode("div", { class: "relative inline-flex" }, [
                  createVNode(ImageDataView, {
                    src: item?.avatar,
                    configs: { width: "32px", height: "32px" },
                    class: "rounded-full shadow-sm object-cover"
                  }, null, 8, ["src"])
                ])
              ]),
              createVNode("td", { class: "p-2 align-middle" }, [
                createVNode("div", { class: "flex flex-col leading-tight" }, [
                  createVNode("span", { class: "font-medium text-slate-900 dark:text-slate-100" }, toDisplayString(item.full_name), 1),
                  createVNode(_sfc_main$1, {
                    user: {
                      is_online: item.online,
                      last_activity: item.last_activity_raw
                    }
                  }, null, 8, ["user"])
                ])
              ]),
              createVNode("td", { class: "p-2 align-middle" }, [
                createVNode("div", {
                  class: ["inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-medium tracking-wide", getRoleClass(item.role)]
                }, [
                  createVNode(unref(IconShieldFilled), {
                    size: "12",
                    class: "opacity-80 text-orange-400 dark:text-orange-500"
                  }),
                  createVNode("span", null, toDisplayString(item.role ? _ctx.$t(item.role) : "—"), 1)
                ], 2)
              ]),
              createVNode("td", { class: "p-2 align-middle" }, [
                createVNode("div", { class: "flex flex-col text-xs space-y-0.5" }, [
                  createVNode("span", { class: "text-slate-700 dark:text-slate-300 font-medium" }, toDisplayString(unref(formatPhone)(item.phone) || "—"), 1),
                  createVNode("span", { class: "text-slate-400 dark:text-slate-500 italic text-[10px]" }, toDisplayString(item.email), 1)
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Core/Users/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
