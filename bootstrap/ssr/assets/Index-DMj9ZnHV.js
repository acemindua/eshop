import { ref, watch, mergeProps, unref, withCtx, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode, withModifiers, Fragment, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import "../ssr.js";
import debounce from "lodash.debounce";
import { _ as _sfc_main$1 } from "./SettingsAdminLayout-DbXCnn_e.js";
import { B as ButtonsGroup } from "./ButtonsGroup-sb8icSMB.js";
import { _ as _sfc_main$2 } from "./InputSearch-CL2slP12.js";
import { _ as _sfc_main$3 } from "./DataTable-ECUTb2Ru.js";
import { _ as _sfc_main$4 } from "./BadgeStatus-BqNBhYGl.js";
import { IconBuildingWarehouse, IconSortAscending, IconSortDescending, IconArrowsSort } from "@tabler/icons-vue";
import { I as ImageDataView } from "./ImageDataView-yaU4wWw9.js";
import { router } from "@inertiajs/core";
import "@vue/shared";
import "@vue/compiler-ssr";
import "node:stream";
import "lodash-es";
import "laravel-precognition";
import "@inertiajs/core/server";
import "pinia";
import "@floating-ui/dom";
import "./AdminLayout-RqDMSvDq.js";
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
    const sortField = ref(props.filters?.field || "sort_order");
    const sortDirection = ref(props.filters?.direction || "asc");
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
    const handleToggleActive = (item) => {
      router.patch(
        route(`${props.routePrefix}.toggle`, item.id),
        {},
        {
          preserveScroll: true,
          preserveState: true
        }
      );
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
      _push(ssrRenderComponent(unref(IconBuildingWarehouse), { size: "20" }, null, _parent));
      _push(`</div><div><h1 class="text-base font-semibold tracking-tight dark:text-slate-200">${ssrInterpolate(_ctx.$t("Warehouses"))}</h1><p class="text-xs text-slate-400 font-medium">${ssrInterpolate(_ctx.$t("Manage warehous content and structure"))}</p></div></div>`);
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
        items: props.data?.warehouses?.data || [],
        meta: props.data?.warehouses?.meta || {},
        "selected-items": selectedItems.value,
        "onUpdate:selectedItems": ($event) => selectedItems.value = $event,
        onDelete: handleDelete,
        "sort-field": sortField.value,
        "sort-direction": sortDirection.value,
        onSort: handleSort
      }, {
        headers: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<th class="w-12 py-1.5 text-center"${_scopeId}>${ssrInterpolate(_ctx.$t("Img"))}</th><th class="p-1.5 text-start cursor-pointer"${_scopeId}><div class="flex items-center space-x-1"${_scopeId}><span class="text-xs font-semibold uppercase tracking-wider text-gray-500"${_scopeId}>${ssrInterpolate(_ctx.$t("Warehouse / Address"))}</span>`);
            if (sortField.value === "title") {
              _push2(`<!--[-->`);
              if (sortDirection.value === "asc") {
                _push2(ssrRenderComponent(unref(IconSortAscending), { size: "12" }, null, _parent2, _scopeId));
              } else {
                _push2(ssrRenderComponent(unref(IconSortDescending), { size: "12" }, null, _parent2, _scopeId));
              }
              _push2(`<!--]-->`);
            } else {
              _push2(ssrRenderComponent(unref(IconArrowsSort), {
                size: "12",
                class: "text-gray-300"
              }, null, _parent2, _scopeId));
            }
            _push2(`</div></th><th class="w-40 p-1.5 text-start text-xs font-semibold uppercase tracking-wider text-gray-500 hidden sm:table-cell"${_scopeId}>${ssrInterpolate(_ctx.$t("Contacts"))}</th><th class="w-44 p-1.5 text-start text-xs font-semibold uppercase tracking-wider text-gray-500 hidden md:table-cell"${_scopeId}>${ssrInterpolate(_ctx.$t("Schedule"))}</th><th class="w-24 p-1.5 text-center cursor-pointer"${_scopeId}><div class="flex items-center justify-center space-x-1"${_scopeId}><span class="text-xs font-semibold uppercase tracking-wider text-gray-500"${_scopeId}>${ssrInterpolate(_ctx.$t("Order"))}</span>`);
            if (sortField.value === "sort_order") {
              _push2(`<!--[-->`);
              if (sortDirection.value === "asc") {
                _push2(ssrRenderComponent(unref(IconSortAscending), { size: "12" }, null, _parent2, _scopeId));
              } else {
                _push2(ssrRenderComponent(unref(IconSortDescending), { size: "12" }, null, _parent2, _scopeId));
              }
              _push2(`<!--]-->`);
            } else {
              _push2(ssrRenderComponent(unref(IconArrowsSort), {
                size: "12",
                class: "text-gray-300"
              }, null, _parent2, _scopeId));
            }
            _push2(`</div></th><th class="w-20 p-1.5 text-center text-xs font-semibold uppercase tracking-wider text-gray-500"${_scopeId}>${ssrInterpolate(_ctx.$t("Status"))}</th>`);
          } else {
            return [
              createVNode("th", { class: "w-12 py-1.5 text-center" }, toDisplayString(_ctx.$t("Img")), 1),
              createVNode("th", {
                class: "p-1.5 text-start cursor-pointer",
                onClick: ($event) => handleSort("title")
              }, [
                createVNode("div", { class: "flex items-center space-x-1" }, [
                  createVNode("span", { class: "text-xs font-semibold uppercase tracking-wider text-gray-500" }, toDisplayString(_ctx.$t("Warehouse / Address")), 1),
                  sortField.value === "title" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                    sortDirection.value === "asc" ? (openBlock(), createBlock(unref(IconSortAscending), {
                      key: 0,
                      size: "12"
                    })) : (openBlock(), createBlock(unref(IconSortDescending), {
                      key: 1,
                      size: "12"
                    }))
                  ], 64)) : (openBlock(), createBlock(unref(IconArrowsSort), {
                    key: 1,
                    size: "12",
                    class: "text-gray-300"
                  }))
                ])
              ], 8, ["onClick"]),
              createVNode("th", { class: "w-40 p-1.5 text-start text-xs font-semibold uppercase tracking-wider text-gray-500 hidden sm:table-cell" }, toDisplayString(_ctx.$t("Contacts")), 1),
              createVNode("th", { class: "w-44 p-1.5 text-start text-xs font-semibold uppercase tracking-wider text-gray-500 hidden md:table-cell" }, toDisplayString(_ctx.$t("Schedule")), 1),
              createVNode("th", {
                class: "w-24 p-1.5 text-center cursor-pointer",
                onClick: ($event) => handleSort("sort_order")
              }, [
                createVNode("div", { class: "flex items-center justify-center space-x-1" }, [
                  createVNode("span", { class: "text-xs font-semibold uppercase tracking-wider text-gray-500" }, toDisplayString(_ctx.$t("Order")), 1),
                  sortField.value === "sort_order" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                    sortDirection.value === "asc" ? (openBlock(), createBlock(unref(IconSortAscending), {
                      key: 0,
                      size: "12"
                    })) : (openBlock(), createBlock(unref(IconSortDescending), {
                      key: 1,
                      size: "12"
                    }))
                  ], 64)) : (openBlock(), createBlock(unref(IconArrowsSort), {
                    key: 1,
                    size: "12",
                    class: "text-gray-300"
                  }))
                ])
              ], 8, ["onClick"]),
              createVNode("th", { class: "w-20 p-1.5 text-center text-xs font-semibold uppercase tracking-wider text-gray-500" }, toDisplayString(_ctx.$t("Status")), 1)
            ];
          }
        }),
        "item-data": withCtx(({ item }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<td class="p-1.5 text-center align-middle"${_scopeId}>`);
            _push2(ssrRenderComponent(ImageDataView, {
              src: item?.image,
              configs: { width: "28px", height: "28px" },
              class: "inline-block object-cover border border-gray-100 rounded-md shadow-sm"
            }, null, _parent2, _scopeId));
            _push2(`</td><td class="p-1.5 align-middle"${_scopeId}><div class="flex flex-col leading-tight"${_scopeId}><div class="flex flex-wrap items-center space-x-1.5"${_scopeId}><span class="font-semibold text-gray-900 text-[13px]"${_scopeId}>${ssrInterpolate(item.title)}</span>`);
            if (item.city) {
              _push2(`<span class="text-[10px] font-bold uppercase px-1 bg-slate-100 text-slate-600 rounded"${_scopeId}>${ssrInterpolate(item.city)}</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (item.address) {
              _push2(`<div class="text-xs text-gray-500 flex items-center space-x-1 mt-0.5"${_scopeId}><span class="truncate max-w-[250px]"${ssrRenderAttr("title", item.address)}${_scopeId}>${ssrInterpolate(item.address)}</span>`);
              if (item.map_link) {
                _push2(`<a${ssrRenderAttr("href", item.map_link)} target="_blank" class="p-0.5 text-blue-500 hover:text-blue-700 rounded hover:bg-blue-50 transition" title="Google Maps"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"${_scopeId}></path></svg></a>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></td><td class="p-1.5 align-middle text-xs text-gray-600 hidden sm:table-cell"${_scopeId}>`);
            if (item.phone) {
              _push2(`<div class="flex items-center space-x-1 text-gray-500"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"${_scopeId}></path></svg><span class="font-mono text-[11px]"${_scopeId}>${ssrInterpolate(item.phone)}</span></div>`);
            } else {
              _push2(`<span class="text-gray-300"${_scopeId}>—</span>`);
            }
            _push2(`</td><td class="p-1.5 align-middle text-[11px] text-gray-500 hidden md:table-cell truncate max-w-[160px]"${ssrRenderAttr("title", item.working_hours)}${_scopeId}>${ssrInterpolate(item.working_hours || "—")}</td><td class="p-1.5 text-center text-xs font-medium text-gray-600 align-middle"${_scopeId}><span class="px-1.5 py-0.5 bg-gray-50 rounded border border-gray-100"${_scopeId}>${ssrInterpolate(item.sort_order)}</span></td><td class="p-1.5 align-middle"${_scopeId}><div class="flex justify-center"${_scopeId}><button class="transition duration-100 transform hover:scale-105 active:scale-95 cursor-pointer transform-gpu"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              active: item.is_active,
              class: "scale-90 origin-center"
            }, null, _parent2, _scopeId));
            _push2(`</button></div></td>`);
          } else {
            return [
              createVNode("td", { class: "p-1.5 text-center align-middle" }, [
                createVNode(ImageDataView, {
                  src: item?.image,
                  configs: { width: "28px", height: "28px" },
                  class: "inline-block object-cover border border-gray-100 rounded-md shadow-sm"
                }, null, 8, ["src"])
              ]),
              createVNode("td", { class: "p-1.5 align-middle" }, [
                createVNode("div", { class: "flex flex-col leading-tight" }, [
                  createVNode("div", { class: "flex flex-wrap items-center space-x-1.5" }, [
                    createVNode("span", { class: "font-semibold text-gray-900 text-[13px]" }, toDisplayString(item.title), 1),
                    item.city ? (openBlock(), createBlock("span", {
                      key: 0,
                      class: "text-[10px] font-bold uppercase px-1 bg-slate-100 text-slate-600 rounded"
                    }, toDisplayString(item.city), 1)) : createCommentVNode("", true)
                  ]),
                  item.address ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "text-xs text-gray-500 flex items-center space-x-1 mt-0.5"
                  }, [
                    createVNode("span", {
                      class: "truncate max-w-[250px]",
                      title: item.address
                    }, toDisplayString(item.address), 9, ["title"]),
                    item.map_link ? (openBlock(), createBlock("a", {
                      key: 0,
                      href: item.map_link,
                      target: "_blank",
                      class: "p-0.5 text-blue-500 hover:text-blue-700 rounded hover:bg-blue-50 transition",
                      title: "Google Maps"
                    }, [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        class: "h-3 w-3",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        }),
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        })
                      ]))
                    ], 8, ["href"])) : createCommentVNode("", true)
                  ])) : createCommentVNode("", true)
                ])
              ]),
              createVNode("td", { class: "p-1.5 align-middle text-xs text-gray-600 hidden sm:table-cell" }, [
                item.phone ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "flex items-center space-x-1 text-gray-500"
                }, [
                  (openBlock(), createBlock("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    class: "h-3 w-3 text-gray-400 shrink-0",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    })
                  ])),
                  createVNode("span", { class: "font-mono text-[11px]" }, toDisplayString(item.phone), 1)
                ])) : (openBlock(), createBlock("span", {
                  key: 1,
                  class: "text-gray-300"
                }, "—"))
              ]),
              createVNode("td", {
                class: "p-1.5 align-middle text-[11px] text-gray-500 hidden md:table-cell truncate max-w-[160px]",
                title: item.working_hours
              }, toDisplayString(item.working_hours || "—"), 9, ["title"]),
              createVNode("td", { class: "p-1.5 text-center text-xs font-medium text-gray-600 align-middle" }, [
                createVNode("span", { class: "px-1.5 py-0.5 bg-gray-50 rounded border border-gray-100" }, toDisplayString(item.sort_order), 1)
              ]),
              createVNode("td", { class: "p-1.5 align-middle" }, [
                createVNode("div", { class: "flex justify-center" }, [
                  createVNode("button", {
                    onClick: withModifiers(($event) => handleToggleActive(item), ["stop"]),
                    class: "transition duration-100 transform hover:scale-105 active:scale-95 cursor-pointer transform-gpu"
                  }, [
                    createVNode(_sfc_main$4, {
                      active: item.is_active,
                      class: "scale-90 origin-center"
                    }, null, 8, ["active"])
                  ], 8, ["onClick"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Commerce/Settings/Warehouses/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
