import { ref, computed, unref, useSSRContext } from "vue";
import { ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrRenderAttr } from "vue/server-renderer";
import { u as useForm } from "../ssr.js";
import { _ as _sfc_main$1 } from "./StickyActions-DFSqE-gR.js";
import { _ as _sfc_main$2, a as _sfc_main$3 } from "./TextInput-D87biKav.js";
import { _ as _sfc_main$4 } from "./InputError-Cp3nFeNd.js";
import { router } from "@inertiajs/core";
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
  __name: "WarehouseForm",
  __ssrInlineRender: true,
  props: {
    data: { type: Object, default: () => ({}) },
    routePrefix: { type: String, required: true },
    isEditing: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const imagePreview = ref(props.data?.image || null);
    const getInitialState = () => ({
      title: props.data?.title || "",
      city: props.data?.city || "",
      address: props.data?.address || "",
      map_link: props.data?.map_link || "",
      working_hours: props.data?.working_hours || "",
      phone: props.data?.phone || "",
      sort_order: props.data?.sort_order ?? 1,
      // За замовчуванням 1, якщо створюється новий (Laravel перестрахує через makeWithDefaults)
      is_active: props.data?.is_active ?? true,
      // За замовчуванням активний
      image: null
    });
    const form = useForm(getInitialState());
    const handleSave = () => {
      const url = props.isEditing ? route(`${props.routePrefix}.update`, props.data?.id) : route(`${props.routePrefix}.store`);
      if (props.isEditing) {
        form.transform((data) => ({
          ...data,
          _method: "PUT"
          // Фейковий PUT для завантаження файлів у Laravel
        })).post(url, {
          forceFormData: true,
          preserveState: true
        });
      } else {
        form.post(url, {
          preserveState: true
        });
      }
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
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_sfc_main$1, { buttons: actionButtons.value }, null, _parent));
      _push(`<form class="border p-6 my-4 bg-white rounded-lg shadow-sm mx-auto"><div class="grid grid-cols-1 md:grid-cols-3 gap-6 p-4"><div class="md:col-span-2 space-y-5"><div><div class="flex items-center gap-1 mb-1">`);
      _push(ssrRenderComponent(_sfc_main$2, {
        for: "title",
        value: "Warehouse Title",
        class: "font-bold text-xs uppercase tracking-wider text-slate-700"
      }, null, _parent));
      _push(`<span class="text-red-500 font-black text-sm leading-none" title="Required field">*</span></div>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        id: "title",
        modelValue: unref(form).title,
        "onUpdate:modelValue": ($event) => unref(form).title = $event,
        type: "text",
        class: ["block w-full", {
          "border-red-500 focus:ring-red-100": unref(form).errors.title
        }],
        placeholder: "e.g., Central Fertilizer Warehouse"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$4, {
        message: unref(form).errors.title,
        class: "mt-1"
      }, null, _parent));
      _push(`</div><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><div>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        for: "city",
        value: "City",
        class: "font-bold text-xs uppercase tracking-wider text-slate-700 mb-1"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        id: "city",
        modelValue: unref(form).city,
        "onUpdate:modelValue": ($event) => unref(form).city = $event,
        type: "text",
        class: ["block w-full", {
          "border-red-500 focus:ring-red-100": unref(form).errors.city
        }],
        placeholder: "e.g., Lviv"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$4, {
        message: unref(form).errors.city,
        class: "mt-1"
      }, null, _parent));
      _push(`</div><div>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        for: "address",
        value: "Address",
        class: "font-bold text-xs uppercase tracking-wider text-slate-700 mb-1"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        id: "address",
        modelValue: unref(form).address,
        "onUpdate:modelValue": ($event) => unref(form).address = $event,
        type: "text",
        class: ["block w-full", {
          "border-red-500 focus:ring-red-100": unref(form).errors.address
        }],
        placeholder: "e.g., 12 Horodotska St"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$4, {
        message: unref(form).errors.address,
        class: "mt-1"
      }, null, _parent));
      _push(`</div></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><div>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        for: "phone",
        value: "Phone Number",
        class: "font-bold text-xs uppercase tracking-wider text-slate-700 mb-1"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        id: "phone",
        modelValue: unref(form).phone,
        "onUpdate:modelValue": ($event) => unref(form).phone = $event,
        type: "text",
        class: ["block w-full", {
          "border-red-500 focus:ring-red-100": unref(form).errors.phone
        }],
        placeholder: "e.g., +380 67 000 00 00"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$4, {
        message: unref(form).errors.phone,
        class: "mt-1"
      }, null, _parent));
      _push(`</div><div>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        for: "working_hours",
        value: "Working Hours",
        class: "font-bold text-xs uppercase tracking-wider text-slate-700 mb-1"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        id: "working_hours",
        modelValue: unref(form).working_hours,
        "onUpdate:modelValue": ($event) => unref(form).working_hours = $event,
        type: "text",
        class: ["block w-full", {
          "border-red-500 focus:ring-red-100": unref(form).errors.working_hours
        }],
        placeholder: "e.g., Mon-Fri: 09:00 - 18:00"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$4, {
        message: unref(form).errors.working_hours,
        class: "mt-1"
      }, null, _parent));
      _push(`</div></div><div>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        for: "map_link",
        value: "Google Maps Link",
        class: "font-bold text-xs uppercase tracking-wider text-slate-700 mb-1"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        id: "map_link",
        modelValue: unref(form).map_link,
        "onUpdate:modelValue": ($event) => unref(form).map_link = $event,
        type: "url",
        class: ["block w-full", {
          "border-red-500 focus:ring-red-100": unref(form).errors.map_link
        }],
        placeholder: "https://maps.google.com/..."
      }, null, _parent));
      _push(`<p class="text-[11px] text-slate-400 mt-1 italic"> Paste the full link or iframe source for the warehouse location marker. </p>`);
      _push(ssrRenderComponent(_sfc_main$4, {
        message: unref(form).errors.map_link,
        class: "mt-1"
      }, null, _parent));
      _push(`</div></div><div class="space-y-6 bg-slate-50 p-4 rounded-xl border border-slate-100"><div class="space-y-4"><div class="flex items-center"><input id="is_active"${ssrIncludeBooleanAttr(Array.isArray(unref(form).is_active) ? ssrLooseContain(unref(form).is_active, null) : unref(form).is_active) ? " checked" : ""} type="checkbox" class="w-4 h-4 text-black border-slate-300 rounded focus:ring-black">`);
      _push(ssrRenderComponent(_sfc_main$2, {
        for: "is_active",
        value: "Active Status",
        class: "ml-2 font-bold text-xs uppercase tracking-wider text-slate-700 select-none cursor-pointer"
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_sfc_main$4, {
        message: unref(form).errors.is_active,
        class: "mt-1"
      }, null, _parent));
      _push(`<div>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        for: "sort_order",
        value: "Sorting Sequence",
        class: "font-bold text-xs uppercase tracking-wider text-slate-700 mb-1"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        id: "sort_order",
        modelValue: unref(form).sort_order,
        "onUpdate:modelValue": ($event) => unref(form).sort_order = $event,
        modelModifiers: { number: true },
        type: "number",
        min: "0",
        class: ["block w-full", {
          "border-red-500 focus:ring-red-100": unref(form).errors.sort_order
        }]
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$4, {
        message: unref(form).errors.sort_order,
        class: "mt-1"
      }, null, _parent));
      _push(`</div></div><hr class="border-slate-200"><div>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        value: "Warehouse Image",
        class: "font-bold text-xs uppercase tracking-wider text-slate-700 mb-2"
      }, null, _parent));
      _push(`<div class="mb-3 relative group border border-dashed border-slate-300 rounded-lg overflow-hidden bg-white aspect-video flex items-center justify-center">`);
      if (imagePreview.value) {
        _push(`<img${ssrRenderAttr("src", imagePreview.value)} alt="Preview" class="w-full h-full object-cover">`);
      } else {
        _push(`<div class="text-center p-4"><span class="text-xs text-slate-400 block">No image selected</span></div>`);
      }
      _push(`</div><label class="block"><span class="sr-only">Choose File</span><input type="file" accept="image/jpeg,image/png,image/webp" class="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-slate-900 file:text-white file:cursor-pointer hover:file:bg-slate-800"></label>`);
      _push(ssrRenderComponent(_sfc_main$4, {
        message: unref(form).errors.image,
        class: "mt-1"
      }, null, _parent));
      _push(`</div></div></div></form><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Commerce/Settings/Warehouses/Components/WarehouseForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
