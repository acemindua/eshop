import { resolveComponent, mergeProps, unref, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import draggable from "vuedraggable";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "MenuItem",
  __ssrInlineRender: true,
  props: {
    item: Object,
    index: Number,
    list: Array
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MenuItem = resolveComponent("MenuItem", true);
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "menu-item-group mt-1.5" }, _attrs))} data-v-550392ab><div class="flex justify-between items-center px-3 py-2 bg-white border border-slate-200 rounded-md shadow-sm hover:border-slate-400 transition-all group" data-v-550392ab><div class="flex items-center gap-3" data-v-550392ab><div class="cursor-move text-slate-300 hover:text-slate-600" data-v-550392ab><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-550392ab><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16" data-v-550392ab></path></svg></div><div class="flex flex-col leading-tight" data-v-550392ab><span class="text-[12px] font-bold text-slate-700 tracking-tight" data-v-550392ab>${ssrInterpolate(__props.item.label?.uk || __props.item.original_item?.title || __props.item.model?.title || "Без назви")}</span>`);
      if (__props.item.model_type || __props.item.url) {
        _push(`<span class="text-[9px] font-mono text-slate-400 uppercase tracking-tighter" data-v-550392ab>${ssrInterpolate(__props.item.model_type ? __props.item.model_type.split("\\").pop() : __props.item.url)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><button class="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-all opacity-0 group-hover:opacity-100" data-v-550392ab><svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-550392ab><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-550392ab></path></svg></button></div>`);
      if (__props.item.children) {
        _push(`<div class="ml-6 mt-1.5 pl-3 border-l border-slate-200 border-dashed" data-v-550392ab>`);
        _push(ssrRenderComponent(unref(draggable), {
          modelValue: __props.item.children,
          "onUpdate:modelValue": ($event) => __props.item.children = $event,
          "item-key": "id",
          group: "menuItems",
          animation: 150,
          "ghost-class": "ghost-item",
          class: "min-h-[5px]"
        }, {
          item: withCtx(({ element, index: childIndex }, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_MenuItem, {
                item: element,
                index: childIndex,
                list: __props.item.children
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_MenuItem, {
                  item: element,
                  index: childIndex,
                  list: __props.item.children
                }, null, 8, ["item", "index", "list"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Dashboard/Menus/Partials/MenuItem.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const MenuItem = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-550392ab"]]);
export {
  MenuItem as default
};
