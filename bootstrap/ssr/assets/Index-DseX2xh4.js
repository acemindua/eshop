import { ref, mergeProps, unref, withCtx, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import "../ssr.js";
import "lodash.debounce";
import "./BadgeStatus-BqNBhYGl.js";
import { B as ButtonsGroup } from "./ButtonsGroup-sb8icSMB.js";
import { _ as _sfc_main$2 } from "./InputSearch-CL2slP12.js";
import { _ as _sfc_main$1 } from "./DashboardAdminLayout-Bu9xuVNu.js";
import { IconMenu2 } from "@tabler/icons-vue";
import { _ as _sfc_main$3 } from "./DataTable-ECUTb2Ru.js";
import { router } from "@inertiajs/core";
import "@vue/shared";
import "@vue/compiler-ssr";
import "node:stream";
import "lodash-es";
import "laravel-precognition";
import "@inertiajs/core/server";
import "pinia";
import "@floating-ui/dom";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./AdminLayout-rVzSZY36.js";
import "./Breadcrumbs-DKsddhuk.js";
import "./ApplicationLogo-CSNe_4RD.js";
import "./VarDump-DqvrPBoK.js";
import "sweetalert2";
import "./Checkbox-86GmRX3v.js";
import "./Pagination-FQ4yDsyZ.js";
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: _sfc_main$1 }, {
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
    const searchText = ref(props.filters?.search || "");
    const selectedItems = ref([]);
    const sortField = ref(props.filters?.field || "id");
    const sortDirection = ref(props.filters?.direction || "desc");
    const handleImport = () => console.log("Importing...");
    const handleCreate = () => router.visit(route(`${props.routePrefix}.create`));
    const handleDelete = (item) => {
      router.delete(route(`${props.routePrefix}.destroy`, item.id), {
        preserveScroll: true,
        preserveState: false,
        onSuccess: () => {
          selectedItems.value = [];
        }
      });
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
    const handleSort = (field) => {
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col space-y-4" }, _attrs))}><div class="flex items-center justify-between bg-gray-50 dark:bg-slate-900/50 border dark:border-slate-800 rounded-xl p-4 shadow-xs"><div class="flex items-center space-x-3"><div class="p-2 bg-brand text-white rounded-xl shadow-sm">`);
      _push(ssrRenderComponent(unref(IconMenu2), { size: "20" }, null, _parent));
      _push(`</div><div><h1 class="text-base font-semibold tracking-tight dark:text-slate-200">${ssrInterpolate(_ctx.$t("Navigations & Menus"))}</h1><p class="text-xs text-slate-400 font-medium">${ssrInterpolate(_ctx.$t("Manage menu content and structure"))}</p></div></div>`);
      _push(ssrRenderComponent(ButtonsGroup, { buttons: actionButtons }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        modelValue: searchText.value,
        "onUpdate:modelValue": ($event) => searchText.value = $event,
        class: "w-64"
      }, null, _parent));
      _push(`<section>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        "route-prefix": props.routePrefix,
        items: props.data?.items?.data || [],
        meta: props.data?.items?.meta || {},
        "selected-items": selectedItems.value,
        "onUpdate:selectedItems": ($event) => selectedItems.value = $event,
        onDelete: handleDelete,
        "sort-field": sortField.value,
        "sort-direction": sortDirection.value,
        onSort: handleSort
      }, {
        headers: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<th class="p-2 text-start cursor-pointer"${_scopeId}><div class="flex items-center space-x-1"${_scopeId}><span${_scopeId}>${ssrInterpolate(_ctx.$t("Title"))}</span></div></th>`);
          } else {
            return [
              createVNode("th", { class: "p-2 text-start cursor-pointer" }, [
                createVNode("div", { class: "flex items-center space-x-1" }, [
                  createVNode("span", null, toDisplayString(_ctx.$t("Title")), 1)
                ])
              ])
            ];
          }
        }),
        "item-data": withCtx(({ item }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<td class="p-2"${_scopeId}><p${_scopeId}>${ssrInterpolate(item.title)}</p><p class="text-xs text-gray-500 hover:text-indigo-400 duration-150 transition"${_scopeId}>${ssrInterpolate(item.slug)}</p></td>`);
          } else {
            return [
              createVNode("td", { class: "p-2" }, [
                createVNode("p", null, toDisplayString(item.title), 1),
                createVNode("p", { class: "text-xs text-gray-500 hover:text-indigo-400 duration-150 transition" }, toDisplayString(item.slug), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Core/Menus/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
