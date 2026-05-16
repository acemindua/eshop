import { ref, watch, resolveComponent, mergeProps, unref, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { P as Pagination } from "./Pagination-FQ4yDsyZ.js";
import { _ as _sfc_main$2 } from "./BadgeStatus-BqNBhYGl.js";
import { _ as _sfc_main$1 } from "./Checkbox-86GmRX3v.js";
import { I as ImageDataView } from "./ImageDataView-BKXTMjoO.js";
import { IconSettings, IconSearch, IconEdit, IconTrash } from "@tabler/icons-vue";
import Swal from "sweetalert2";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "DataTable",
  __ssrInlineRender: true,
  props: {
    items: Array,
    selectedItems: Array,
    meta: Object,
    model: String
  },
  emits: ["update:selectedItems", "edit", "delete"],
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
    const confirmDelete = async (item) => {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This item will be permanently deleted!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!"
      });
      if (result.isConfirmed) {
        emit("delete", item);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "overflow-x-auto border bg-white rounded-lg" }, _attrs))}><table class="w-full text-sm"><thead><tr class="text-xs uppercase text-slate-600 text-thin divide-x"><th class="p-3 w-12">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        class: "mx-auto",
        checked: toggleAll.value,
        "onUpdate:checked": ($event) => toggleAll.value = $event
      }, null, _parent));
      _push(`</th><th class="p-3 text-center w-24">#</th><th class="py-3 text-center w-24">${ssrInterpolate(_ctx.$t("Media"))}</th><th class="p-3 text-start">${ssrInterpolate(_ctx.$t("Title"))}</th><th class="p-3 text-start">${ssrInterpolate(_ctx.$t("Category"))}</th><th class="p-3 text-center">${ssrInterpolate(_ctx.$t("Price"))}</th><th class="p-3 text-center w-48">${ssrInterpolate(_ctx.$t("Status"))}</th><th class="p-3 w-48">`);
      _push(ssrRenderComponent(unref(IconSettings), {
        stroke: 2,
        size: "18",
        class: "mx-auto"
      }, null, _parent));
      _push(`</th><th class="p-3 text-center w-24">${ssrInterpolate(_ctx.$t("#ID"))}</th></tr></thead><tbody>`);
      if (__props.items.length > 0) {
        _push(`<!--[-->`);
        ssrRenderList(__props.items, (item, key) => {
          _push(`<tr class="hover:bg-slate-50 border-t border-slate-200 dark:border-slate-700 dark:hover:bg-slate-950/25 odd:bg-white dark:odd:bg-slate-900 even:bg-slate-50 dark:even:bg-slate-800"><td class="p-2 text-center">`);
          _push(ssrRenderComponent(_sfc_main$1, {
            class: "mx-auto",
            checked: __props.selectedItems.includes(item.id),
            "onUpdate:checked": () => toggleItem(item.id)
          }, null, _parent));
          _push(`</td><td class="p-2 text-center text-gray-500">${ssrInterpolate(_ctx.$formatSerial(count.value + key))}</td><td class="p-1">`);
          _push(ssrRenderComponent(ImageDataView, {
            src: item.images?.[0]?.preview
          }, null, _parent));
          _push(`</td><td class="p-2"><p class="font-semibold">${ssrInterpolate(item.title)}</p><p class="text-xs text-gray-500 hover:text-indigo-400 duration-150 transition">${ssrInterpolate(`/${item.slug}`)}</p></td><td class="p-2 text-xs text-gray-500">${ssrInterpolate(item.category?.title)}</td><td class="p-2 text-end text-red-500">${ssrInterpolate(item.price)}</td><td class="p-2"><div class="flex justify-center">`);
          _push(ssrRenderComponent(_sfc_main$2, {
            active: item.public
          }, null, _parent));
          _push(`</div></td><td class="p-2"><div class="flex justify-center items-center space-x-3">`);
          _push(ssrRenderComponent(_component_Link, {
            href: _ctx.route(`admin.${__props.model}.show`, item.id),
            class: "hover:text-green-500 transition-colors duration-150"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(IconSearch), {
                  stroke: 1,
                  size: "18"
                }, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(IconSearch), {
                    stroke: 1,
                    size: "18"
                  })
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(ssrRenderComponent(_component_Link, {
            href: _ctx.route(`admin.${__props.model}.edit`, item.id),
            class: "hover:text-indigo-500 transition-colors duration-150"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(IconEdit), {
                  stroke: 1,
                  size: "18"
                }, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(IconEdit), {
                    stroke: 1,
                    size: "18"
                  })
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(ssrRenderComponent(unref(IconTrash), {
            stroke: 1,
            size: "18",
            class: "hover:text-red-500 cursor-pointer transition-colors duration-150",
            "preserve-scroll": "",
            "preserve-state": "",
            onClick: ($event) => confirmDelete(item)
          }, null, _parent));
          _push(`</div></td><td class="p-2 text-center">${ssrInterpolate(item.id)}</td></tr>`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</tbody>`);
      if (__props.meta.links && __props.meta.links.length > 3) {
        _push(`<tfoot><tr><td colspan="100%" class="border-t px-4">`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Commerce/Orders/Partials/DataTable.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
