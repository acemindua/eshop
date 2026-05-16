import { ref, watch, mergeProps, unref, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import Swal from "sweetalert2";
import { l as link_default } from "../ssr.js";
import { IconSettings, IconSearch, IconEdit, IconTrash } from "@tabler/icons-vue";
import { _ as _sfc_main$1 } from "./Checkbox-86GmRX3v.js";
import { P as Pagination } from "./Pagination-FQ4yDsyZ.js";
const _sfc_main = {
  __name: "DataTable",
  __ssrInlineRender: true,
  props: {
    items: { type: Array, default: () => [] },
    selectedItems: { type: Array, default: () => [] },
    meta: Object,
    model: String,
    sortField: String,
    sortDirection: String
  },
  emits: ["update:selectedItems", "delete"],
  setup(__props, { emit: __emit }) {
    const props = __props;
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
    const confirmDelete = (item) => {
      Swal.fire({
        title: "Delete record?",
        text: "This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#000000",
        // Black for a minimal look
        cancelButtonColor: "#ffffff",
        // White
        customClass: {
          confirmButton: "order-2",
          // Modern alignment
          cancelButton: "order-1 text-gray-500"
        },
        buttonsStyling: true,
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          emit("delete", item);
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "overflow-x-auto border bg-white rounded-lg" }, _attrs))}><table class="w-full text-sm min-w-[500px]"><thead><tr class="text-xs uppercase text-thin divide-x bg-gray-50"><th class="p-2 w-12">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        class: "mx-auto",
        checked: toggleAll.value,
        "onUpdate:checked": ($event) => toggleAll.value = $event
      }, null, _parent));
      _push(`</th>`);
      ssrRenderSlot(_ctx.$slots, "headers", {}, null, _push, _parent);
      _push(`<th class="p-2 w-48">`);
      _push(ssrRenderComponent(unref(IconSettings), {
        stroke: 2,
        size: "18",
        class: "mx-auto"
      }, null, _parent));
      _push(`</th><th class="p-2">#id</th></tr></thead><tbody><!--[-->`);
      ssrRenderList(__props.items, (item) => {
        _push(`<tr class="hover:bg-slate-50 border-t divide-x border-slate-200 dark:border-slate-700 dark:hover:bg-slate-950/25 odd:bg-white dark:odd:bg-slate-900 even:bg-slate-50 dark:even:bg-slate-800"><td class="p-2 text-center">`);
        _push(ssrRenderComponent(_sfc_main$1, {
          class: "mx-auto",
          checked: __props.selectedItems.includes(item.id),
          "onUpdate:checked": () => toggleItem(item.id)
        }, null, _parent));
        _push(`</td>`);
        ssrRenderSlot(_ctx.$slots, "item-data", { item }, null, _push, _parent);
        _push(`<td class="p-2"><div class="flex justify-center items-center space-x-3">`);
        _push(ssrRenderComponent(unref(link_default), {
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
        _push(ssrRenderComponent(unref(link_default), {
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
          onClick: ($event) => confirmDelete(item)
        }, null, _parent));
        _push(`</div></td><td class="p-2 text-center text-gray-500">${ssrInterpolate(item.id)}</td></tr>`);
      });
      _push(`<!--]--></tbody>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/DataTable.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
