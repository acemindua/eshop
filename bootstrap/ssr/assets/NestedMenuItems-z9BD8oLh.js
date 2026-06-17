import { computed, resolveComponent, unref, mergeProps, withCtx, createVNode, openBlock, createBlock, toDisplayString, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import draggable from "vuedraggable";
import { b as usePage } from "../ssr.js";
import { IconGripVertical, IconLink, IconFileText, IconFolder, IconEdit, IconPlus, IconTrash } from "@tabler/icons-vue";
import "@unhead/vue/server";
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
  __name: "NestedMenuItems",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: Array, required: true },
    depth: { type: Number, default: 1 }
  },
  emits: ["update:modelValue", "addChild", "editItem"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const pageProps = usePage().props;
    const currentLocale = computed(() => pageProps.config?.currentLocale || "uk");
    const onDragChange = (sortedList) => {
      const updated = sortedList.map((item, index) => ({
        ...item,
        order: index
      }));
      emit("update:modelValue", updated);
    };
    const removeItem = (index) => {
      const copy = [...props.modelValue];
      copy.splice(index, 1);
      const updated = copy.map((item, index2) => ({ ...item, order: index2 }));
      emit("update:modelValue", updated);
    };
    const getLinkTypeBadge = (item) => {
      if (item.link_type === "custom")
        return {
          text: "URL",
          bg: "bg-amber-50 text-amber-700 border-amber-200"
        };
      if (item.model_type?.includes("Page"))
        return {
          text: "Сторінка",
          bg: "bg-teal-50 text-teal-700 border-teal-200"
        };
      if (item.model_type?.includes("Category"))
        return {
          text: "Категорія",
          bg: "bg-blue-50 text-blue-700 border-blue-200"
        };
      return {
        text: "Не вказано",
        bg: "bg-gray-50 text-gray-500 border-gray-200"
      };
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NestedMenuItems = resolveComponent("NestedMenuItems", true);
      _push(ssrRenderComponent(unref(draggable), mergeProps({
        list: props.modelValue,
        "item-key": "id",
        handle: ".drag-handle",
        group: "menu-items",
        "ghost-class": "opacity-30 border-indigo-400 bg-indigo-50/30",
        onChange: ($event) => onDragChange(props.modelValue),
        class: "space-y-2.5"
      }, _attrs), {
        item: withCtx(({ element, index }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="group/item transition-all duration-200"${_scopeId}><div class="flex items-center justify-between border border-gray-200 rounded-xl bg-white p-3.5 hover:border-gray-300 hover:shadow-xs"${_scopeId}><div class="flex items-center space-x-3 flex-1 min-w-0"${_scopeId}><div class="drag-handle cursor-grab active:cursor-grabbing p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(IconGripVertical), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            _push2(`</div><div class="p-2 rounded-lg bg-gray-50 border border-gray-100 text-gray-500"${_scopeId}>`);
            if (element.link_type === "custom") {
              _push2(ssrRenderComponent(unref(IconLink), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            } else if (element.model_type?.includes("Page")) {
              _push2(ssrRenderComponent(unref(IconFileText), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(unref(IconFolder), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            }
            _push2(`</div><div class="flex flex-col min-w-0"${_scopeId}><span class="text-sm font-medium text-gray-900 truncate"${_scopeId}>${ssrInterpolate(element.label[currentLocale.value] || element.label["uk"] || "Без назви")}</span><span class="text-xs text-gray-400 font-normal truncate mt-0.5"${_scopeId}>${ssrInterpolate(element.link_type === "custom" ? element.url || "Маршрут не вказано" : "Динамічна сутність ID: " + (element.model_id || "—"))}</span></div><span class="${ssrRenderClass([
              "text-[10px] px-2 py-0.5 font-medium rounded-md border",
              getLinkTypeBadge(element).bg
            ])}"${_scopeId}>${ssrInterpolate(getLinkTypeBadge(element).text)}</span></div><div class="flex items-center space-x-1 pl-4"${_scopeId}><button type="button" class="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(IconEdit), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            _push2(`</button>`);
            if (__props.depth < 3) {
              _push2(`<button type="button" class="p-2 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(IconPlus), { class: "w-4 h-4" }, null, _parent2, _scopeId));
              _push2(`</button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<button type="button" class="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(IconTrash), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            _push2(`</button></div></div>`);
            if (element.children && element.children.length > 0) {
              _push2(`<div class="mt-2.5 ml-8 pl-4 border-l-2 border-gray-100 space-y-2.5"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_NestedMenuItems, {
                modelValue: element.children,
                "onUpdate:modelValue": ($event) => element.children = $event,
                depth: __props.depth + 1,
                onAddChild: (target) => emit("addChild", target),
                onEditItem: (target) => emit("editItem", target)
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "group/item transition-all duration-200" }, [
                createVNode("div", { class: "flex items-center justify-between border border-gray-200 rounded-xl bg-white p-3.5 hover:border-gray-300 hover:shadow-xs" }, [
                  createVNode("div", { class: "flex items-center space-x-3 flex-1 min-w-0" }, [
                    createVNode("div", { class: "drag-handle cursor-grab active:cursor-grabbing p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50" }, [
                      createVNode(unref(IconGripVertical), { class: "w-4 h-4" })
                    ]),
                    createVNode("div", { class: "p-2 rounded-lg bg-gray-50 border border-gray-100 text-gray-500" }, [
                      element.link_type === "custom" ? (openBlock(), createBlock(unref(IconLink), {
                        key: 0,
                        class: "w-4 h-4"
                      })) : element.model_type?.includes("Page") ? (openBlock(), createBlock(unref(IconFileText), {
                        key: 1,
                        class: "w-4 h-4"
                      })) : (openBlock(), createBlock(unref(IconFolder), {
                        key: 2,
                        class: "w-4 h-4"
                      }))
                    ]),
                    createVNode("div", { class: "flex flex-col min-w-0" }, [
                      createVNode("span", { class: "text-sm font-medium text-gray-900 truncate" }, toDisplayString(element.label[currentLocale.value] || element.label["uk"] || "Без назви"), 1),
                      createVNode("span", { class: "text-xs text-gray-400 font-normal truncate mt-0.5" }, toDisplayString(element.link_type === "custom" ? element.url || "Маршрут не вказано" : "Динамічна сутність ID: " + (element.model_id || "—")), 1)
                    ]),
                    createVNode("span", {
                      class: [
                        "text-[10px] px-2 py-0.5 font-medium rounded-md border",
                        getLinkTypeBadge(element).bg
                      ]
                    }, toDisplayString(getLinkTypeBadge(element).text), 3)
                  ]),
                  createVNode("div", { class: "flex items-center space-x-1 pl-4" }, [
                    createVNode("button", {
                      type: "button",
                      onClick: ($event) => emit("editItem", element),
                      class: "p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    }, [
                      createVNode(unref(IconEdit), { class: "w-4 h-4" })
                    ], 8, ["onClick"]),
                    __props.depth < 3 ? (openBlock(), createBlock("button", {
                      key: 0,
                      type: "button",
                      onClick: ($event) => emit("addChild", element),
                      class: "p-2 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                    }, [
                      createVNode(unref(IconPlus), { class: "w-4 h-4" })
                    ], 8, ["onClick"])) : createCommentVNode("", true),
                    createVNode("button", {
                      type: "button",
                      onClick: ($event) => removeItem(index),
                      class: "p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    }, [
                      createVNode(unref(IconTrash), { class: "w-4 h-4" })
                    ], 8, ["onClick"])
                  ])
                ]),
                element.children && element.children.length > 0 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "mt-2.5 ml-8 pl-4 border-l-2 border-gray-100 space-y-2.5"
                }, [
                  createVNode(_component_NestedMenuItems, {
                    modelValue: element.children,
                    "onUpdate:modelValue": ($event) => element.children = $event,
                    depth: __props.depth + 1,
                    onAddChild: (target) => emit("addChild", target),
                    onEditItem: (target) => emit("editItem", target)
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "depth", "onAddChild", "onEditItem"])
                ])) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Core/Menus/Components/NestedMenuItems.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
