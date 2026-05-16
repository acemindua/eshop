import { computed, mergeProps, useSSRContext, ref, watch, withCtx, unref, createVNode, toDisplayString } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import "../ssr.js";
import debounce from "lodash.debounce";
import { _ as _sfc_main$2 } from "./DashboardAdminLayout-syA0R-Os.js";
import { B as ButtonsGroup } from "./ButtonsGroup-CwkMyX54.js";
import { _ as _sfc_main$3 } from "./InputSearch-CL2slP12.js";
import { V as VarDump } from "./VarDump-DqvrPBoK.js";
import { _ as _sfc_main$4 } from "./DataTable-BtgUMaEK.js";
import { I as ImageDataView } from "./ImageDataView-BKXTMjoO.js";
import { router } from "@inertiajs/core";
import "@vue/shared";
import "@vue/compiler-ssr";
import "node:stream";
import "lodash-es";
import "laravel-precognition";
import "@inertiajs/core/server";
import "pinia";
import "@floating-ui/dom";
import "./AdminLayout-BRIf9gc0.js";
import "./Breadcrumbs-DA__G0nP.js";
import "@tabler/icons-vue";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./ApplicationLogo-DsJOFw9w.js";
import "./useLocales-V6QHCGCa.js";
import "sweetalert2";
import "./Checkbox-86GmRX3v.js";
import "./Pagination-FQ4yDsyZ.js";
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
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: _sfc_main$2 }, {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    data: { type: Object },
    filters: { type: Object }
  },
  setup(__props) {
    const props = __props;
    const searchText = ref(props.filters?.search || "");
    const onlineFilter = ref(props.filters?.online || "");
    const selectedItems = ref([]);
    const { formatPhone } = useFormatter();
    const handleImport = () => console.log("Importing...");
    const handleCreate = () => router.visit(route("admin.users.create"));
    const handleDelete = (item) => router.delete(route("admin.users.destroy", item.id));
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
    watch(
      [searchText, onlineFilter],
      debounce(([searchVal, onlineVal]) => {
        router.get(
          route("admin.users.index"),
          {
            search: searchVal,
            online: onlineVal
          },
          {
            preserveState: true,
            replace: true,
            preserveScroll: true
          }
        );
      }, 500)
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col space-y-4" }, _attrs))}><section class="flex flex-wrap items-center justify-between gap-4"><div class="flex items-center gap-3">`);
      _push(ssrRenderComponent(_sfc_main$3, {
        modelValue: searchText.value,
        "onUpdate:modelValue": ($event) => searchText.value = $event,
        class: "w-64"
      }, null, _parent));
      _push(`<select class="h-10 px-3 py-2 text-xs border rounded-md bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 focus:ring-brand focus:border-brand"><option value=""${ssrIncludeBooleanAttr(Array.isArray(onlineFilter.value) ? ssrLooseContain(onlineFilter.value, "") : ssrLooseEqual(onlineFilter.value, "")) ? " selected" : ""}>${ssrInterpolate(_ctx.$t("All Statuses"))}</option><option value="1"${ssrIncludeBooleanAttr(Array.isArray(onlineFilter.value) ? ssrLooseContain(onlineFilter.value, "1") : ssrLooseEqual(onlineFilter.value, "1")) ? " selected" : ""}>${ssrInterpolate(_ctx.$t("Online"))}</option><option value="0"${ssrIncludeBooleanAttr(Array.isArray(onlineFilter.value) ? ssrLooseContain(onlineFilter.value, "0") : ssrLooseEqual(onlineFilter.value, "0")) ? " selected" : ""}>${ssrInterpolate(_ctx.$t("Offline"))}</option></select></div>`);
      _push(ssrRenderComponent(ButtonsGroup, { buttons: actionButtons }, null, _parent));
      _push(`</section><section>`);
      _push(ssrRenderComponent(_sfc_main$4, {
        items: props.data?.users?.data || [],
        meta: props.data?.users?.meta,
        model: "users",
        "selected-items": selectedItems.value,
        "onUpdate:selectedItems": ($event) => selectedItems.value = $event,
        onDelete: handleDelete
      }, {
        headers: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<th class="py-2 text-center w-16"${_scopeId}>${ssrInterpolate(_ctx.$t("ava"))}</th><th class="p-2 text-left"${_scopeId}>${ssrInterpolate(_ctx.$t("User Info"))}</th><th class="p-2 text-left"${_scopeId}>${ssrInterpolate(_ctx.$t("Contacts"))}</th><th class="p-2 text-center"${_scopeId}>${ssrInterpolate(_ctx.$t("Loyalty"))}</th>`);
          } else {
            return [
              createVNode("th", { class: "py-2 text-center w-16" }, toDisplayString(_ctx.$t("ava")), 1),
              createVNode("th", { class: "p-2 text-left" }, toDisplayString(_ctx.$t("User Info")), 1),
              createVNode("th", { class: "p-2 text-left" }, toDisplayString(_ctx.$t("Contacts")), 1),
              createVNode("th", { class: "p-2 text-center" }, toDisplayString(_ctx.$t("Loyalty")), 1)
            ];
          }
        }),
        "item-data": withCtx(({ item }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<td class="p-2 text-center"${_scopeId}><div class="relative inline-flex"${_scopeId}>`);
            _push2(ssrRenderComponent(ImageDataView, {
              src: item?.avatar,
              configs: { width: "32px", height: "32px" },
              class: "rounded-full shadow-sm"
            }, null, _parent2, _scopeId));
            _push2(`</div></td><td class="p-2"${_scopeId}><div class="flex flex-col leading-tight"${_scopeId}><span class="dark:text-slate-100"${_scopeId}>${ssrInterpolate(item.full_name)}</span>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              user: {
                is_online: item.online,
                last_activity: item.last_activity_raw
              },
              size: "xs"
            }, null, _parent2, _scopeId));
            _push2(`</div></td><td class="p-2"${_scopeId}><div class="flex flex-col text-xs space-y-0.5"${_scopeId}><span class="text-slate-700 font-medium"${_scopeId}>${ssrInterpolate(unref(formatPhone)(item.phone) || "—")}</span><span class="text-slate-400 italic text-[10px]"${_scopeId}>${ssrInterpolate(item.email)}</span></div></td><td class="p-2 text-center font-mono text-xs"${_scopeId}><span class="${ssrRenderClass(
              item.bonus_balance > 0 ? "text-brand font-bold" : "text-slate-400"
            )}"${_scopeId}>${ssrInterpolate(item.bonus_balance)} ₴ </span></td>`);
          } else {
            return [
              createVNode("td", { class: "p-2 text-center" }, [
                createVNode("div", { class: "relative inline-flex" }, [
                  createVNode(ImageDataView, {
                    src: item?.avatar,
                    configs: { width: "32px", height: "32px" },
                    class: "rounded-full shadow-sm"
                  }, null, 8, ["src"])
                ])
              ]),
              createVNode("td", { class: "p-2" }, [
                createVNode("div", { class: "flex flex-col leading-tight" }, [
                  createVNode("span", { class: "dark:text-slate-100" }, toDisplayString(item.full_name), 1),
                  createVNode(_sfc_main$1, {
                    user: {
                      is_online: item.online,
                      last_activity: item.last_activity_raw
                    },
                    size: "xs"
                  }, null, 8, ["user"])
                ])
              ]),
              createVNode("td", { class: "p-2" }, [
                createVNode("div", { class: "flex flex-col text-xs space-y-0.5" }, [
                  createVNode("span", { class: "text-slate-700 font-medium" }, toDisplayString(unref(formatPhone)(item.phone) || "—"), 1),
                  createVNode("span", { class: "text-slate-400 italic text-[10px]" }, toDisplayString(item.email), 1)
                ])
              ]),
              createVNode("td", { class: "p-2 text-center font-mono text-xs" }, [
                createVNode("span", {
                  class: item.bonus_balance > 0 ? "text-brand font-bold" : "text-slate-400"
                }, toDisplayString(item.bonus_balance) + " ₴ ", 3)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section><section>`);
      _push(ssrRenderComponent(VarDump, { data: __props.data }, null, _parent));
      _push(`</section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Dashboard/Users/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
