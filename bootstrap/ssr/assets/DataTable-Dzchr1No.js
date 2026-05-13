import { computed, mergeProps, unref, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { l as link_default } from "../ssr.js";
import { _ as _sfc_main$2, P as Pagination } from "./BadgeStatus-CuMJsa-m.js";
import { _ as _sfc_main$1 } from "./Checkbox-BYIkH8i_.js";
import { IconSettings, IconEdit, IconTrash } from "@tabler/icons-vue";
import "sweetalert2";
import "@vue/shared";
import "@vue/compiler-ssr";
import "node:stream";
import "@inertiajs/core";
import "lodash-es";
import "laravel-precognition";
import "@inertiajs/core/server";
import "pinia";
import "@floating-ui/dom";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "DataTable",
  __ssrInlineRender: true,
  props: {
    items: { type: Array, default: () => [] },
    selectedItems: { type: Array, default: () => [] },
    meta: { type: Object, default: () => ({}) },
    model: { type: String, default: "shippings" }
  },
  emits: ["update:selectedItems", "delete", "toggle-status"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const startCount = computed(() => props.meta?.from || 1);
    const toggleAll = computed({
      get: () => props.items.length > 0 && props.selectedItems.length === props.items.length,
      set: (val) => emit("update:selectedItems", val ? props.items.map((i) => i.id) : [])
    });
    const toggleItem = (id) => {
      const updated = props.selectedItems.includes(id) ? props.selectedItems.filter((itemId) => itemId !== id) : [...props.selectedItems, id];
      emit("update:selectedItems", updated);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "overflow-x-auto border bg-white rounded-lg shadow-sm" }, _attrs))}><table class="w-full text-sm text-left"><thead><tr class="text-xs uppercase text-slate-600 bg-slate-50 divide-x divide-slate-200 border-b"><th class="p-3 w-12 text-center">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        class: "mx-auto",
        checked: toggleAll.value,
        "onUpdate:checked": ($event) => toggleAll.value = $event
      }, null, _parent));
      _push(`</th><th class="p-3 text-center w-20">#</th><th class="p-3 text-start">${ssrInterpolate(_ctx.$t("Назва"))}</th><th class="p-3 text-center w-40">${ssrInterpolate(_ctx.$t("Статус"))}</th><th class="p-3 w-32 text-center">`);
      _push(ssrRenderComponent(unref(IconSettings), {
        stroke: 2,
        size: "18",
        class: "mx-auto"
      }, null, _parent));
      _push(`</th></tr></thead><tbody class="divide-y divide-slate-200"><!--[-->`);
      ssrRenderList(__props.items, (item, key) => {
        _push(`<tr class="hover:bg-slate-50 transition-colors odd:bg-white even:bg-slate-50/30"><td class="p-2 text-center">`);
        _push(ssrRenderComponent(_sfc_main$1, {
          class: "mx-auto",
          checked: __props.selectedItems.includes(item.id),
          "onUpdate:checked": () => toggleItem(item.id)
        }, null, _parent));
        _push(`</td><td class="p-2 text-center text-gray-500 font-mono">${ssrInterpolate(startCount.value + key)}</td><td class="p-2"><div class="flex flex-col"><span class="font-semibold text-slate-700">${ssrInterpolate(item.title)}</span><span class="text-xs text-slate-400 font-mono">${ssrInterpolate(item.alias)}</span></div></td><td class="p-2"><div class="flex justify-center"><button type="button" class="cursor-pointer active:scale-95 transition-transform">`);
        _push(ssrRenderComponent(_sfc_main$2, {
          active: Boolean(item.is_active)
        }, null, _parent));
        _push(`</button></div></td><td class="p-2"><div class="flex justify-center items-center space-x-3">`);
        _push(ssrRenderComponent(unref(link_default), {
          href: _ctx.route(`admin.${__props.model}.edit`, item.id),
          class: "text-slate-400 hover:text-indigo-600 transition-colors"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(IconEdit), {
                stroke: 1.5,
                size: "20"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(IconEdit), {
                  stroke: 1.5,
                  size: "20"
                })
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`<button type="button" class="text-slate-400 hover:text-red-600 transition-colors">`);
        _push(ssrRenderComponent(unref(IconTrash), {
          stroke: 1.5,
          size: "20"
        }, null, _parent));
        _push(`</button></div></td></tr>`);
      });
      _push(`<!--]-->`);
      if (__props.items.length === 0) {
        _push(`<tr><td colspan="5" class="p-12 text-center text-gray-400">${ssrInterpolate(_ctx.$t("Методів доставки не знайдено"))}</td></tr>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</tbody>`);
      if (__props.meta?.links && __props.meta.links.length > 3) {
        _push(`<tfoot><tr><td colspan="5" class="border-t">`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Settings/Shippings/Partials/DataTable.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
