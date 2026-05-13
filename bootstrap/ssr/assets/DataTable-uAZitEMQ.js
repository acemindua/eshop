import { ref, watch, mergeProps, unref, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { _ as _sfc_main$2, P as Pagination } from "./BadgeStatus-CuMJsa-m.js";
import { _ as _sfc_main$1 } from "./Checkbox-BYIkH8i_.js";
import { l as link_default } from "../ssr.js";
import { IconSettings, IconMapPin, IconPhone, IconEdit, IconTrash } from "@tabler/icons-vue";
import "sweetalert2";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
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
    model: {
      type: String,
      default: "settings.warehouses"
      // Шлях для роутів: admin.settings.warehouses...
    }
  },
  emits: ["update:selectedItems", "delete"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const count = ref(props?.meta?.from || 0);
    const emit = __emit;
    const toggleAll = ref(false);
    watch(toggleAll, (val) => {
      if (val) {
        emit(
          "update:selectedItems",
          props.items.map((i) => i.id)
        );
      } else {
        emit("update:selectedItems", []);
      }
    });
    const toggleItem = (id) => {
      const updated = props.selectedItems.includes(id) ? props.selectedItems.filter((itemId) => itemId !== id) : [...props.selectedItems, id];
      emit("update:selectedItems", updated);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "overflow-x-auto border bg-white rounded-lg shadow-sm" }, _attrs))}><table class="w-full text-sm"><thead><tr class="text-xs uppercase text-slate-600 bg-slate-50 divide-x border-b"><th class="p-3 w-12">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        class: "mx-auto",
        checked: toggleAll.value,
        "onUpdate:checked": ($event) => toggleAll.value = $event
      }, null, _parent));
      _push(`</th><th class="p-3 text-center w-16">#</th><th class="p-3 text-start">${ssrInterpolate(_ctx.$t("Склад / Локація"))}</th><th class="p-3 text-start w-48">${ssrInterpolate(_ctx.$t("Контакти"))}</th><th class="p-3 text-center w-32">${ssrInterpolate(_ctx.$t("Статус"))}</th><th class="p-3 w-32">`);
      _push(ssrRenderComponent(unref(IconSettings), {
        stroke: 2,
        size: "18",
        class: "mx-auto"
      }, null, _parent));
      _push(`</th></tr></thead><tbody class="divide-y divide-slate-200"><!--[-->`);
      ssrRenderList(__props.items, (item, key) => {
        _push(`<tr class="hover:bg-slate-50 transition-colors odd:bg-white even:bg-slate-50/50"><td class="p-3 text-center">`);
        _push(ssrRenderComponent(_sfc_main$1, {
          class: "mx-auto",
          checked: __props.selectedItems.includes(item.id),
          "onUpdate:checked": () => toggleItem(item.id)
        }, null, _parent));
        _push(`</td><td class="p-3 text-center text-gray-400 font-mono text-xs">${ssrInterpolate(count.value + key)}</td><td class="p-3"><div class="flex flex-col"><span class="font-bold text-slate-900 leading-tight">${ssrInterpolate(item.title)}</span><div class="flex items-center text-xs text-slate-500 mt-1">`);
        _push(ssrRenderComponent(unref(IconMapPin), {
          size: "12",
          class: "mr-1 inline text-slate-400"
        }, null, _parent));
        _push(`<span>${ssrInterpolate(item.city)}, ${ssrInterpolate(item.address)}</span></div></div></td><td class="p-3"><div class="text-xs space-y-1">`);
        if (item.phone) {
          _push(`<p class="flex items-center text-slate-600">`);
          _push(ssrRenderComponent(unref(IconPhone), {
            size: "12",
            class: "mr-1 text-slate-400"
          }, null, _parent));
          _push(` ${ssrInterpolate(item.phone)}</p>`);
        } else {
          _push(`<!---->`);
        }
        if (item.area) {
          _push(`<p class="text-slate-400 italic">${ssrInterpolate(item.area)} обл. </p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></td><td class="p-3"><div class="flex justify-center"><button class="focus:outline-none">`);
        _push(ssrRenderComponent(_sfc_main$2, {
          active: item.is_active
        }, null, _parent));
        _push(`</button></div></td><td class="p-3"><div class="flex justify-center items-center space-x-3 text-slate-400">`);
        _push(ssrRenderComponent(unref(link_default), {
          href: _ctx.route(`admin.${__props.model}.edit`, item.id),
          class: "hover:text-indigo-600 transition-colors",
          title: "Редагувати"
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
        _push(`<button class="hover:text-red-600 transition-colors" title="Видалити">`);
        _push(ssrRenderComponent(unref(IconTrash), {
          stroke: 1.5,
          size: "20"
        }, null, _parent));
        _push(`</button></div></td></tr>`);
      });
      _push(`<!--]-->`);
      if (__props.items.length === 0) {
        _push(`<tr><td colspan="100%" class="p-8 text-center text-slate-400 italic"> Складів поки не додано... </td></tr>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</tbody>`);
      if (__props.meta.links && __props.meta.links.length > 3) {
        _push(`<tfoot><tr><td colspan="100%" class="border-t bg-slate-50/50">`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Settings/Warehouses/Partials/DataTable.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
