import { computed, ref, mergeProps, createVNode, resolveDynamicComponent, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrRenderVNode, ssrInterpolate } from "vue/server-renderer";
import { IconX, IconPlus } from "@tabler/icons-vue";
import { I as ImageDataView } from "./ImageDataView-yaU4wWw9.js";
import { _ as _sfc_main$3 } from "./InputError-Cp3nFeNd.js";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./TextInput-D87biKav.js";
import { _ as _sfc_main$5 } from "./CheckBoxSwitcher-DfwzQzd4.js";
import "./ComboboxSelect-Wa-V4Q9H.js";
import { _ as _sfc_main$4 } from "./CountrySelect-CzfB0WgS.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "@headlessui/vue";
const ImageCompany = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20350%20350'%3e%3cpath%20d='M236.32,263.44a3.61,3.61,0,0,0,0-7.21H113.68a3.61,3.61,0,0,0,0,7.21Z'%20fill='%2358595b'/%3e%3cpath%20d='M259.83,241.12H237V194.79a3.59,3.59,0,0,0-2-3.21l-37-18.79V90.17A3.6,3.6,0,0,0,192.83,87L153.9,106.74a3.61,3.61,0,0,0-2,3.22v35.33l-37,18.79a3.59,3.59,0,0,0-2,3.21v73.83H90.17a3.61,3.61,0,1,0,0,7.22H259.83a3.61,3.61,0,1,0,0-7.22Zm-107.9,0H120.2V169.5l31.73-16.12ZM190.86,175h0v66.12H159.14V112.17L190.86,96Zm38.94,66.13H198.07V180.88L229.8,197Z'%20fill='%2358595b'/%3e%3cpath%20d='M207.89,236.09a2.7,2.7,0,0,0,2.71-2.7v-39.3a2.71,2.71,0,1,0-5.41,0v39.3A2.7,2.7,0,0,0,207.89,236.09Z'%20fill='%2358595b'/%3e%3cpath%20d='M220,236.09a2.71,2.71,0,0,0,2.71-2.7V205.51a2.71,2.71,0,1,0-5.41,0v27.88A2.7,2.7,0,0,0,220,236.09Z'%20fill='%2358595b'/%3e%3cpath%20d='M142.11,236.09a2.7,2.7,0,0,0,2.7-2.7V167.45a2.71,2.71,0,0,0-5.41,0v65.94A2.71,2.71,0,0,0,142.11,236.09Z'%20fill='%2358595b'/%3e%3cpath%20d='M130,236.09a2.71,2.71,0,0,0,2.71-2.7V178.87a2.71,2.71,0,0,0-5.41,0v54.52A2.7,2.7,0,0,0,130,236.09Z'%20fill='%2358595b'/%3e%3cpath%20d='M181.54,236.09a2.7,2.7,0,0,0,2.7-2.7V111a2.71,2.71,0,1,0-5.41,0V233.39A2.7,2.7,0,0,0,181.54,236.09Z'%20fill='%2358595b'/%3e%3cpath%20d='M168.46,236.09a2.7,2.7,0,0,0,2.71-2.7V123a2.71,2.71,0,0,0-5.41,0V233.39A2.7,2.7,0,0,0,168.46,236.09Z'%20fill='%2358595b'/%3e%3c/svg%3e";
const _sfc_main = {
  __name: "GeneralForm",
  __ssrInlineRender: true,
  props: {
    data: Object,
    form: { type: Object },
    errors: { type: Object },
    isEditing: {
      type: Boolean,
      default: false
      // Якщо не передано — вважається "створення"
    }
  },
  setup(__props) {
    const props = __props;
    const booleanPublic = computed({
      // Отримуємо значення, перетворюючи його на чистий boolean (!!0 -> false, !!1 -> true)
      get: () => !!props.form.public,
      // При записі встановлюємо значення (CheckBoxSwitcher повертає true/false)
      set: (val) => props.form.public = val
    });
    ref(null);
    const preview = ref(props.data?.manufacturer?.image || ImageCompany);
    const newFileObject = ref(null);
    const showClearButton = computed(() => !!newFileObject.value);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col space-y-4 mx-auto w-full md:max-w-3xl p-2" }, _attrs))}><div><div class="w-full md:w-1/5 pb-4"><h2 class="uppercase font-semibold">General</h2><span class="py-2 text-sm text-gray-600">Manage general info</span></div><div class="flex items-center justify-center"><input type="file" hidden accept="image/*"><div class="relative">`);
      _push(ssrRenderComponent(ImageDataView, {
        src: preview.value,
        configs: {
          width: "120px",
          height: "120px"
        }
      }, null, _parent));
      _push(`<button class="${ssrRenderClass([{
        "hover:bg-red-100 text-red-500": showClearButton.value,
        "hover:bg-blue-100 text-blue-500": !showClearButton.value
      }, "absolute right-0 bottom-0 bg-white dark:bg-slate-700 dark:text-white rounded-full flex items-center justify-center w-8 h-8 shadow-xl transition"])}">`);
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(showClearButton.value ? unref(IconX) : unref(IconPlus)), {
        size: 18,
        stroke: "2"
      }, null), _parent);
      _push(`</button></div></div><div class="mb-3"><div class="flex items-center space-x-1"><span class="text-red-500">*</span>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        for: `title`,
        value: `Name`,
        class: "flex leading-6 items-center font-semibold"
      }, null, _parent));
      _push(`</div><div class="w-full sm:col-span-3">`);
      _push(ssrRenderComponent(_sfc_main$2, {
        id: `title`,
        type: "text",
        modelValue: __props.form.title,
        "onUpdate:modelValue": ($event) => __props.form.title = $event,
        class: ["block w-full", {
          "border-red-500": __props.errors[`title`]
        }],
        placeholder: `Name company`
      }, null, _parent));
      _push(`<p class="mt-1 text-xs text-gray-500"> Enter the name company. This will appear in search engine results. </p>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        class: "mt-2",
        message: __props.errors[`title`]
      }, null, _parent));
      _push(`</div></div><div>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        for: "country",
        value: _ctx.$t("Country"),
        class: "flex items-center leading-6 font-semibold"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$4, {
        id: "country",
        modelValue: __props.form.country,
        "onUpdate:modelValue": ($event) => __props.form.country = $event,
        items: __props.data?.countries || [],
        class: { "border-red-500": __props.errors.country }
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        class: "mt-2",
        message: __props.errors.country
      }, null, _parent));
      _push(`</div><div>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        for: "order",
        value: _ctx.$t("Sort order"),
        class: "flex items-center leading-6 font-semibold"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        id: "order",
        type: "number",
        modelValue: __props.form.order,
        "onUpdate:modelValue": ($event) => __props.form.order = $event,
        class: ["block w-full pr-4 text-start", { "border-red-500": __props.errors.order }]
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        class: "mt-2",
        message: __props.errors.order
      }, null, _parent));
      _push(`</div><div>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        for: "public-switcher",
        value: _ctx.$t("Status"),
        class: "flex items-center leading-6 font-semibold mb-2"
      }, null, _parent));
      _push(`<div class="flex items-center space-x-4">`);
      _push(ssrRenderComponent(_sfc_main$5, {
        modelValue: booleanPublic.value,
        "onUpdate:modelValue": ($event) => booleanPublic.value = $event,
        id: "public-switcher"
      }, null, _parent));
      _push(`<span class="${ssrRenderClass([
        "text-sm font-medium",
        booleanPublic.value ? "text-green-600" : "text-red-600"
      ])}">${ssrInterpolate(booleanPublic.value ? _ctx.$t("Public (Visible)") : _ctx.$t("Private (Hidden)"))}</span></div>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        class: "mt-2",
        message: __props.errors.public
      }, null, _parent));
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Commerce/Manufacturers/Partials/GeneralForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
