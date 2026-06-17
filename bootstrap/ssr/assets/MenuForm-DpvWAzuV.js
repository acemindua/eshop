import { computed, ref, onMounted, defineComponent, nextTick, h, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { u as useForm } from "../ssr.js";
import Sortable from "sortablejs";
import { _ as _sfc_main$1 } from "./StickyActions-DFSqE-gR.js";
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
import "./ButtonsGroup-sb8icSMB.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "@tabler/icons-vue";
const _sfc_main = {
  __name: "MenuForm",
  __ssrInlineRender: true,
  props: {
    data: { type: Object, default: () => ({}) },
    routePrefix: { type: String, default: () => "admin.menus" },
    isEditing: { type: Boolean, default: false },
    errors: { type: Object, default: () => ({}) }
  },
  setup(__props) {
    const props = __props;
    const menu = computed(() => props.data?.menu?.data || props.data?.menu || {});
    const pages = computed(() => props.data.pages?.data || props.data.pages || []);
    const categories = computed(
      () => props.data.categories?.data || props.data.categories || []
    );
    const pageSearch = ref("");
    const categorySearch = ref("");
    const form = useForm({
      title: "",
      slug: "",
      items: []
    });
    onMounted(() => {
      if (props.isEditing && menu.value) {
        form.title = menu.value.title || "";
        form.slug = menu.value.slug || "";
        form.items = menu.value.tree || [];
      }
    });
    const filteredPages = computed(() => {
      if (!pageSearch.value.trim()) return pages.value;
      return pages.value.filter(
        (page) => page.title.toLowerCase().includes(pageSearch.value.toLowerCase())
      );
    });
    const filteredCategories = computed(() => {
      if (!categorySearch.value.trim()) return categories.value;
      return categories.value.filter(
        (cat) => cat.title.toLowerCase().includes(categorySearch.value.toLowerCase())
      );
    });
    const customLink = ref({ title: "", url: "" });
    const removeItemById = (id, list = form.items) => {
      const index = list.findIndex((item) => item.id === id);
      if (index !== -1) {
        list.splice(index, 1);
        return true;
      }
      for (let item of list) {
        if (item.children && item.children.length > 0) {
          if (removeItemById(id, item.children)) return true;
        }
      }
      return false;
    };
    const handleSave = () => {
      const url = props.isEditing ? route(`${props.routePrefix}.update`, menu.value.id) : route(`${props.routePrefix}.store`);
      router.post(
        url,
        { ...form.data(), _method: props.isEditing ? "PUT" : "POST" },
        {
          forceFormData: false,
          preserveState: true
        }
      );
    };
    const actionButtons = computed(() => [
      {
        label: "cancel",
        action: () => router.visit(route(`${props.routePrefix}.index`)),
        type: "secondary",
        icon: "IconCancel",
        loading: form.processing
      },
      {
        label: "save",
        loadingLabel: "Saving...",
        action: handleSave,
        type: "primary",
        icon: "IconDeviceFloppy",
        loading: form.processing
      }
    ]);
    const updateTreeBindings = (el, list) => {
      const order = Array.from(el.children).map(
        (child) => child.getAttribute("data-id")
      );
      const newOrderedList = order.map((id) => list.find((item) => String(item.id) === String(id))).filter(Boolean);
      list.length = 0;
      list.push(...newOrderedList);
    };
    const NestedTree = defineComponent({
      name: "NestedTree",
      props: {
        list: { type: Array, required: true }
      },
      emits: ["remove"],
      setup(props2, { emit }) {
        const treeRef = ref(null);
        onMounted(() => {
          nextTick(() => {
            if (!treeRef.value) return;
            Sortable.create(treeRef.value, {
              animation: 200,
              group: "nested-menu",
              fallbackOnBody: true,
              swapThreshold: 0.65,
              handle: ".drag-handle",
              onEnd: () => {
                updateTreeBindings(treeRef.value, props2.list);
              },
              onAdd: () => {
                updateTreeBindings(treeRef.value, props2.list);
              }
            });
          });
        });
        return () => h(
          "div",
          {
            ref: treeRef,
            class: "space-y-2 min-h-[30px] rounded-lg p-1 bg-gray-50/20 border border-dashed border-transparent"
          },
          props2.list.map(
            (element) => h(
              "div",
              {
                class: "flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm",
                "data-id": element.id
              },
              [
                // Node Header Area
                h(
                  "div",
                  {
                    class: "flex items-center justify-between p-3 bg-gray-50/50 rounded-t-lg"
                  },
                  [
                    h(
                      "div",
                      {
                        class: "flex items-center space-x-3"
                      },
                      [
                        h(
                          "span",
                          {
                            class: "drag-handle cursor-move text-gray-400 hover:text-gray-600 px-1 text-base select-none"
                          },
                          "☰"
                        ),
                        h(
                          "span",
                          {
                            class: [
                              "font-medium text-sm text-gray-700",
                              element.label === "home" ? "italic text-indigo-600 font-semibold" : ""
                            ]
                          },
                          element.label === "home" ? "home (Translation Key)" : element.label
                        ),
                        h(
                          "span",
                          {
                            class: "text-xs text-gray-400 bg-gray-200/70 px-1.5 py-0.5 rounded"
                          },
                          element.model_type ? element.model_type.split("\\").pop() : "Custom URL"
                        )
                      ]
                    ),
                    h(
                      "button",
                      {
                        type: "button",
                        class: "text-red-500 hover:text-red-700 text-xs font-medium transition",
                        onClick: () => emit("remove", element.id)
                      },
                      "Delete"
                    )
                  ]
                ),
                // Subnode container logic mapping children tiers recursively
                h(
                  "div",
                  {
                    class: "pl-8 pr-3 pb-3 pt-2 bg-gray-100/30 border-t border-dashed border-gray-100 rounded-b-lg"
                  },
                  [
                    h(NestedTree, {
                      list: element.children || (element.children = []),
                      onRemove: (id) => emit("remove", id)
                    })
                  ]
                )
              ]
            )
          )
        );
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col space-y-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        buttons: actionButtons.value,
        routePrefix: props.routePrefix,
        title: props.isEditing ? "Edit Menu" : "New Menu Group",
        description: "Manage the navigation structure of the website."
      }, null, _parent));
      _push(`<div class="bg-white p-6 rounded-lg shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4"><div><label class="block text-sm font-medium text-gray-700 mb-1">Menu Title</label><input${ssrRenderAttr("value", unref(form).title)} type="text" class="block w-full rounded-md border-gray-300 shadow-sm text-sm" placeholder="e.g., Header Menu, Footer Navigation"></div><div><label class="block text-sm font-medium text-gray-700 mb-1">Slug</label><input${ssrRenderAttr("value", unref(form).slug)} type="text"${ssrIncludeBooleanAttr(props.isEditing) ? " disabled" : ""} class="block w-full rounded-md border-gray-300 shadow-sm text-sm disabled:bg-gray-100 disabled:text-gray-500" placeholder="main-menu"></div></div><div class="grid grid-cols-1 lg:grid-cols-3 gap-6"><div class="lg:col-span-1 space-y-4"><h3 class="text-md font-semibold text-gray-900 px-1"> Add Menu Items </h3><div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100"><button type="button" class="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"> + Add Homepage (/) </button></div><div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100 space-y-3"><h4 class="text-sm font-medium text-gray-700 border-b pb-1"> Custom Link </h4><div><input${ssrRenderAttr("value", customLink.value.title)} type="text" placeholder="Link text or key (e.g., blog or Our Blog)" class="w-full text-xs rounded-md border-gray-300"></div><div><input${ssrRenderAttr("value", customLink.value.url)} type="text" placeholder="URL (e.g., /blog or https://...)" class="w-full text-xs rounded-md border-gray-300"></div><button type="button" class="w-full text-center text-xs bg-gray-800 text-white py-1.5 rounded hover:bg-gray-900 transition"> Add Custom Link </button></div><div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100 space-y-2"><h4 class="text-sm font-medium text-gray-700 border-b pb-2 mb-1"> Static Pages </h4><div class="relative"><input${ssrRenderAttr("value", pageSearch.value)} type="text" placeholder="Search pages..." class="w-full text-xs rounded-md border-gray-300 bg-gray-50/50 focus:bg-white"></div><div class="max-h-48 overflow-y-auto space-y-1 pr-1"><!--[-->`);
      ssrRenderList(filteredPages.value, (page) => {
        _push(`<div class="flex justify-between items-center p-1.5 hover:bg-gray-50 rounded text-xs"><span class="truncate text-gray-600 max-w-[180px]">${ssrInterpolate(page.title)}</span><button type="button" class="text-indigo-600 hover:text-indigo-900 font-medium"> + Add </button></div>`);
      });
      _push(`<!--]-->`);
      if (filteredPages.value.length === 0) {
        _push(`<div class="text-center py-4 text-xs text-gray-400"> No pages found </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100 space-y-2"><h4 class="text-sm font-medium text-gray-700 border-b pb-2 mb-1"> Product Categories </h4><div class="relative"><input${ssrRenderAttr("value", categorySearch.value)} type="text" placeholder="Search categories..." class="w-full text-xs rounded-md border-gray-300 bg-gray-50/50 focus:bg-white"></div><div class="max-h-48 overflow-y-auto space-y-1 pr-1"><!--[-->`);
      ssrRenderList(filteredCategories.value, (cat) => {
        _push(`<div class="flex justify-between items-center p-1.5 hover:bg-gray-50 rounded text-xs"><span class="truncate text-gray-600 max-w-[180px]">${ssrInterpolate(cat.title)}</span><button type="button" class="text-indigo-600 hover:text-indigo-900 font-medium"> + Add </button></div>`);
      });
      _push(`<!--]-->`);
      if (filteredCategories.value.length === 0) {
        _push(`<div class="text-center py-4 text-xs text-gray-400"> No categories found </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div><div class="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm min-h-[350px]"><h3 class="text-md font-semibold text-gray-900 mb-4 border-b pb-2"> Menu Structure </h3>`);
      if (unref(form).items.length === 0) {
        _push(`<div class="text-center py-12 text-sm text-gray-400 border-2 border-dashed border-gray-200 rounded-lg"> Menu is empty. Add items from the left panel and drag them to configure nested submenus. </div>`);
      } else {
        _push(`<div class="space-y-2">`);
        _push(ssrRenderComponent(unref(NestedTree), {
          list: unref(form).items,
          onRemove: removeItemById
        }, null, _parent));
        _push(`</div>`);
      }
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Core/Menus/Components/MenuForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
