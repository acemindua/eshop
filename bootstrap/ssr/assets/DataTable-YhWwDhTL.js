import { ref, computed, watch, mergeProps, unref, withCtx, createTextVNode, toDisplayString, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { P as Pagination } from "./Pagination-FQ4yDsyZ.js";
import { _ as _sfc_main$2 } from "./BadgeStatus-BqNBhYGl.js";
import { _ as _sfc_main$1 } from "./Checkbox-86GmRX3v.js";
import { I as ImageDataView } from "./ImageDataView-BKXTMjoO.js";
import { IconSettings, IconLink, IconSearch, IconEdit, IconTrash } from "@tabler/icons-vue";
import "sweetalert2";
import { l as link_default } from "../ssr.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "@vue/shared";
import "@vue/compiler-ssr";
import "node:stream";
import "@inertiajs/core";
import "lodash-es";
import "laravel-precognition";
import "@inertiajs/core/server";
import "pinia";
import "@floating-ui/dom";
const _sfc_main = {
  __name: "DataTable",
  __ssrInlineRender: true,
  props: {
    items: Array,
    selectedItems: Array,
    meta: Object,
    model: String
    // 'items', 'payment-methods', 'pages'
  },
  emits: ["update:selectedItems", "edit", "delete"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const count = ref(props?.meta?.from || 0);
    const emit = __emit;
    const toggleAll = ref(false);
    const modelPath = computed(() => {
      const paths = {
        "payment-methods": "settings.payment-methods",
        shippings: "settings.shippings",
        items: "commerce.items",
        categories: "commerce.categories"
      };
      return paths[props.model] || props.model;
    });
    watch(toggleAll, (val) => {
      emit("update:selectedItems", val ? props.items.map((i) => i.id) : []);
    });
    const toggleItem = (id) => {
      const updated = props.selectedItems.includes(id) ? props.selectedItems.filter((itemId) => itemId !== id) : [...props.selectedItems, id];
      emit("update:selectedItems", updated);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "overflow-x-auto border bg-white rounded-none shadow-sm" }, _attrs))} data-v-ee081e2d><table class="w-full text-sm" data-v-ee081e2d><thead data-v-ee081e2d><tr class="text-[10px] uppercase text-slate-500 font-bold bg-slate-50 divide-x border-b" data-v-ee081e2d><th class="p-3 w-12 text-center" data-v-ee081e2d>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        class: "mx-auto",
        checked: toggleAll.value,
        "onUpdate:checked": ($event) => toggleAll.value = $event
      }, null, _parent));
      _push(`</th><th class="p-3 text-center w-16" data-v-ee081e2d>#</th>`);
      if (__props.model === "items") {
        _push(`<th class="py-3 text-center w-20" data-v-ee081e2d>${ssrInterpolate(_ctx.$t("Media"))}</th>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<th class="p-3 text-start" data-v-ee081e2d>${ssrInterpolate(_ctx.$t("Title"))}</th>`);
      if (__props.model === "items") {
        _push(`<!--[--><th class="p-3 text-start" data-v-ee081e2d>${ssrInterpolate(_ctx.$t("Category"))}</th><th class="p-3 text-center w-24" data-v-ee081e2d>${ssrInterpolate(_ctx.$t("Price"))}</th><!--]-->`);
      } else {
        _push(`<!---->`);
      }
      if (__props.model === "payment-methods") {
        _push(`<!--[--><th class="p-3 text-start w-32" data-v-ee081e2d>${ssrInterpolate(_ctx.$t("Code"))}</th><th class="p-3 text-center w-24" data-v-ee081e2d>${ssrInterpolate(_ctx.$t("Fee"))}</th><!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`<th class="p-3 text-center w-32" data-v-ee081e2d>${ssrInterpolate(_ctx.$t("Status"))}</th><th class="p-3 w-32 text-center" data-v-ee081e2d>`);
      _push(ssrRenderComponent(unref(IconSettings), {
        stroke: 2,
        size: "16",
        class: "mx-auto"
      }, null, _parent));
      _push(`</th><th class="p-3 text-center w-20" data-v-ee081e2d>${ssrInterpolate(_ctx.$t("ID"))}</th></tr></thead><tbody data-v-ee081e2d>`);
      if (__props.items?.length > 0) {
        _push(`<!--[-->`);
        ssrRenderList(__props.items, (item, key) => {
          _push(`<tr class="group hover:bg-slate-50 border-t border-slate-100 transition-colors" data-v-ee081e2d><td class="p-2 text-center" data-v-ee081e2d>`);
          _push(ssrRenderComponent(_sfc_main$1, {
            class: "mx-auto",
            checked: __props.selectedItems.includes(item.id),
            "onUpdate:checked": () => toggleItem(item.id)
          }, null, _parent));
          _push(`</td><td class="p-2 text-center text-gray-400 font-mono text-xs" data-v-ee081e2d>${ssrInterpolate(_ctx.$formatSerial(count.value + key))}</td>`);
          if (__props.model === "items") {
            _push(`<td class="p-1 text-center" data-v-ee081e2d>`);
            _push(ssrRenderComponent(ImageDataView, {
              src: item.images?.[0]?.preview
            }, null, _parent));
            _push(`</td>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<td class="p-2" data-v-ee081e2d><div class="flex flex-col" data-v-ee081e2d>`);
          _push(ssrRenderComponent(unref(link_default), {
            href: _ctx.route(`admin.${modelPath.value}.edit`, item.id),
            class: "font-semibold text-gray-900 hover:text-brand transition"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(item.title)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(item.title), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          if (item.slug) {
            _push(`<a${ssrRenderAttr("href", `${_ctx.$page.props.app.url}/${item.slug}`)} target="_blank" class="text-[10px] text-gray-400 hover:text-indigo-500 inline-flex items-center space-x-1" data-v-ee081e2d>`);
            _push(ssrRenderComponent(unref(IconLink), { size: "12" }, null, _parent));
            _push(`<span data-v-ee081e2d>/${ssrInterpolate(item.slug)}</span></a>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></td>`);
          if (__props.model === "items") {
            _push(`<!--[--><td class="p-2 text-xs text-gray-500 italic" data-v-ee081e2d>${ssrInterpolate(item.category?.title)}</td><td class="p-2 text-center font-bold text-red-500" data-v-ee081e2d>${ssrInterpolate(item.price)}</td><!--]-->`);
          } else {
            _push(`<!---->`);
          }
          if (__props.model === "payment-methods") {
            _push(`<!--[--><td class="p-2 font-mono text-xs text-blue-600" data-v-ee081e2d>${ssrInterpolate(item.code)}</td><td class="p-2 text-center text-gray-600" data-v-ee081e2d>${ssrInterpolate(item.commission_percent)}% </td><!--]-->`);
          } else {
            _push(`<!---->`);
          }
          _push(`<td class="p-2" data-v-ee081e2d><div class="flex justify-center" data-v-ee081e2d>`);
          _push(ssrRenderComponent(_sfc_main$2, {
            active: item.public ?? item.is_active
          }, null, _parent));
          _push(`</div></td><td class="p-2" data-v-ee081e2d><div class="flex justify-center items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity" data-v-ee081e2d>`);
          _push(ssrRenderComponent(unref(link_default), {
            href: _ctx.route(`admin.${modelPath.value}.show`, item.id),
            class: "p-1 hover:text-brand"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(IconSearch), {
                  stroke: 1.5,
                  size: "18"
                }, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(IconSearch), {
                    stroke: 1.5,
                    size: "18"
                  })
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(ssrRenderComponent(unref(link_default), {
            href: _ctx.route(`admin.${modelPath.value}.edit`, item.id),
            class: "p-1 hover:text-indigo-500"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(IconEdit), {
                  stroke: 1.5,
                  size: "18"
                }, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(IconEdit), {
                    stroke: 1.5,
                    size: "18"
                  })
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`<button class="p-1 hover:text-red-500" data-v-ee081e2d>`);
          _push(ssrRenderComponent(unref(IconTrash), {
            stroke: 1.5,
            size: "18"
          }, null, _parent));
          _push(`</button></div></td><td class="p-2 text-center text-gray-400 text-xs italic" data-v-ee081e2d>${ssrInterpolate(item.id)}</td></tr>`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<tr data-v-ee081e2d><td colspan="100%" class="p-10 text-center text-gray-400 italic" data-v-ee081e2d>${ssrInterpolate(_ctx.$t("No items found"))}</td></tr>`);
      }
      _push(`</tbody>`);
      if (__props.meta.links && __props.meta.links.length > 3) {
        _push(`<tfoot data-v-ee081e2d><tr data-v-ee081e2d><td colspan="100%" class="border-t p-2" data-v-ee081e2d>`);
        _push(ssrRenderComponent(Pagination, {
          links: __props.meta.links,
          total: __props.meta.total,
          from: __props.meta.from,
          to: __props.meta.to
        }, null, _parent));
        _push(`</td></tr></tfoot>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</table></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Settings/PaymentMethods/Partials/DataTable.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const DataTable = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ee081e2d"]]);
export {
  DataTable as default
};
