import { computed, ref, watch, mergeProps, withCtx, createVNode, toDisplayString, unref, openBlock, createBlock, Fragment, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import "../ssr.js";
import debounce from "lodash.debounce";
import { _ as _sfc_main$1 } from "./DashboardAdminLayout-syA0R-Os.js";
import { B as ButtonsGroup } from "./ButtonsGroup-CwkMyX54.js";
import { _ as _sfc_main$2 } from "./InputSearch-CL2slP12.js";
import { V as VarDump } from "./VarDump-DqvrPBoK.js";
import { _ as _sfc_main$3 } from "./DataTable-BtgUMaEK.js";
import { _ as _sfc_main$4 } from "./BadgeStatus-BqNBhYGl.js";
import { IconSortAscending, IconSortDescending, IconArrowsSort } from "@tabler/icons-vue";
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
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./ApplicationLogo-DsJOFw9w.js";
import "./useLocales-V6QHCGCa.js";
import "sweetalert2";
import "./Checkbox-86GmRX3v.js";
import "./Pagination-FQ4yDsyZ.js";
const model = "pages";
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: _sfc_main$1 }, {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    data: { type: Object },
    filters: { type: Object }
  },
  setup(__props) {
    const props = __props;
    const items = computed(() => props.data?.pages?.data || []);
    const metaItems = computed(() => props.data?.pages?.meta || []);
    const searchText = ref(props.filters?.search || "");
    const selectedItems = ref([]);
    const sortField = ref(props.filters?.field || "id");
    const sortDirection = ref(props.filters?.direction || "desc");
    const handleImport = () => console.log("Importing...");
    const handleCreate = () => router.visit(route(`admin.${model}.create`));
    const handleDelete = (item) => {
      router.delete(route(`admin.${model}.destroy`, item.id), {
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
          route("admin.pages.index"),
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col space-y-4" }, _attrs))}><section class="flex flex-wrap items-center justify-between gap-4"><div class="flex items-center gap-3">`);
      _push(ssrRenderComponent(_sfc_main$2, {
        modelValue: searchText.value,
        "onUpdate:modelValue": ($event) => searchText.value = $event,
        class: "w-64"
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(ButtonsGroup, { buttons: actionButtons }, null, _parent));
      _push(`</section><section>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        model,
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
            _push2(`<th class="p-2 text-start cursor-pointer"${_scopeId}><div class="flex items-center space-x-1"${_scopeId}><span${_scopeId}>${ssrInterpolate(_ctx.$t("Title"))}</span>`);
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
            _push2(`<td class="p-2"${_scopeId}><p${_scopeId}>${ssrInterpolate(item.title)}</p><p class="text-xs text-gray-500 hover:text-indigo-400 duration-150 transition"${_scopeId}> url: ${ssrInterpolate(`/${item.slug}`)}</p></td><td class="p-2"${_scopeId}><div class="flex justify-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              active: item.public
            }, null, _parent2, _scopeId));
            _push2(`</div></td>`);
          } else {
            return [
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
      _push(`</section><div class="mt-4">`);
      _push(ssrRenderComponent(VarDump, { data: __props.data }, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Dashboard/Pages/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
