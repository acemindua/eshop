import { ref, watch, mergeProps, unref, withCtx, createVNode, toDisplayString, openBlock, createBlock, Fragment, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import "../ssr.js";
import debounce from "lodash.debounce";
import { _ as _sfc_main$1 } from "./CommerceAdminLayout-DbuFsKGa.js";
import { B as ButtonsGroup } from "./ButtonsGroup-sb8icSMB.js";
import { _ as _sfc_main$2 } from "./InputSearch-CL2slP12.js";
import { _ as _sfc_main$3 } from "./DataTable-ECUTb2Ru.js";
import { _ as _sfc_main$4 } from "./BadgeStatus-BqNBhYGl.js";
import { IconArticle, IconSortAscending, IconSortDescending, IconArrowsSort } from "@tabler/icons-vue";
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
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: _sfc_main$1 }, {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    data: { type: Object },
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
    watch(
      [searchText, sortField, sortDirection],
      debounce(([searchVal, field, direction]) => {
        router.get(
          route(`${props.routePrefix}.index`),
          { search: searchVal, field, direction },
          {
            preserveState: false,
            replace: true,
            preserveScroll: true
          }
        );
      }, 500)
    );
    const handleSort = (field) => {
      if (sortField.value === field) {
        sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
      } else {
        sortField.value = field;
        sortDirection.value = "asc";
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col space-y-4" }, _attrs))}><div class="flex items-center justify-between bg-gray-50 dark:bg-slate-900/50 border dark:border-slate-800 rounded-xl p-4 shadow-xs"><div class="flex items-center space-x-3"><div class="p-2 bg-brand text-white rounded-xl shadow-sm">`);
      _push(ssrRenderComponent(unref(IconArticle), { size: "20" }, null, _parent));
      _push(`</div><div><h1 class="text-base font-semibold tracking-tight dark:text-slate-200">${ssrInterpolate(_ctx.$t("Brands"))}</h1><p class="text-xs text-slate-400 font-medium">${ssrInterpolate(_ctx.$t("Manage brand content and structure"))}</p></div></div>`);
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
        items: props.data?.brands?.data || [],
        meta: props.data?.brands?.meta || {},
        "selected-items": selectedItems.value,
        "onUpdate:selectedItems": ($event) => selectedItems.value = $event,
        onDelete: handleDelete,
        "sort-field": sortField.value,
        "sort-direction": sortDirection.value,
        onSort: handleSort
      }, {
        headers: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<th class="p-2 text-center uppercase w-12"${_scopeId}>${ssrInterpolate(_ctx.$t("img"))}</th><th class="p-2 text-start cursor-pointer"${_scopeId}><div class="flex items-center space-x-1"${_scopeId}><span${_scopeId}>${ssrInterpolate(_ctx.$t("Title"))}</span>`);
            if (sortField.value === "title") {
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
                class: "text-gray-300"
              }, null, _parent2, _scopeId));
            }
            _push2(`</div></th><th class="p-2 text-center w-48"${_scopeId}>${ssrInterpolate(_ctx.$t("Status"))}</th>`);
          } else {
            return [
              createVNode("th", { class: "p-2 text-center uppercase w-12" }, toDisplayString(_ctx.$t("img")), 1),
              createVNode("th", {
                class: "p-2 text-start cursor-pointer",
                onClick: ($event) => handleSort("title")
              }, [
                createVNode("div", { class: "flex items-center space-x-1" }, [
                  createVNode("span", null, toDisplayString(_ctx.$t("Title")), 1),
                  sortField.value === "title" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
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
                    class: "text-gray-300"
                  }))
                ])
              ], 8, ["onClick"]),
              createVNode("th", { class: "p-2 text-center w-48" }, toDisplayString(_ctx.$t("Status")), 1)
            ];
          }
        }),
        "item-data": withCtx(({ item }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<td${_scopeId}>`);
            _push2(ssrRenderComponent(ImageDataView, {
              src: item?.image || item?.images?.[0]?.preview,
              configs: { width: "32px", height: "32px" },
              class: "rounded-full shadow-sm object-cover"
            }, null, _parent2, _scopeId));
            _push2(`</td><td class="p-2"${_scopeId}><p${_scopeId}>${ssrInterpolate(item.title)}</p><p class="text-xs text-gray-500 hover:text-indigo-400 duration-150 transition"${_scopeId}> url: ${ssrInterpolate(`/${item.slug}`)}</p></td><td class="p-2"${_scopeId}><div class="flex justify-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              active: item.public
            }, null, _parent2, _scopeId));
            _push2(`</div></td>`);
          } else {
            return [
              createVNode("td", null, [
                createVNode(ImageDataView, {
                  src: item?.image || item?.images?.[0]?.preview,
                  configs: { width: "32px", height: "32px" },
                  class: "rounded-full shadow-sm object-cover"
                }, null, 8, ["src"])
              ]),
              createVNode("td", { class: "p-2" }, [
                createVNode("p", null, toDisplayString(item.title), 1),
                createVNode("p", { class: "text-xs text-gray-500 hover:text-indigo-400 duration-150 transition" }, " url: " + toDisplayString(`/${item.slug}`), 1)
              ]),
              createVNode("td", { class: "p-2" }, [
                createVNode("div", { class: "flex justify-center" }, [
                  createVNode(_sfc_main$4, {
                    active: item.public
                  }, null, 8, ["active"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Commerce/Brands/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
