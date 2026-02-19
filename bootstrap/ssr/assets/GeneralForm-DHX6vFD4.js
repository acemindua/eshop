import { computed, ref, mergeProps, createVNode, resolveDynamicComponent, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrRenderVNode, ssrInterpolate } from "vue/server-renderer";
import { IconX, IconPlus } from "@tabler/icons-vue";
import { _ as _sfc_main$1 } from "./ImageDataView-C9GsQUU8.js";
import { _ as _sfc_main$2, b as _sfc_main$3, a as _sfc_main$4 } from "./TextInput-C-4bWHj0.js";
import { _ as _sfc_main$6 } from "./CheckBoxSwitcher-DfwzQzd4.js";
import "./ComboboxSelect-Wa-V4Q9H.js";
import { _ as _sfc_main$5 } from "./CountrySelect-CzfB0WgS.js";
import "@headlessui/vue";
const ImageCompany = "/build/assets/company-CqdAYqge.svg";
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
      _push(ssrRenderComponent(_sfc_main$1, {
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
      _push(ssrRenderComponent(_sfc_main$2, {
        for: `title`,
        value: `Name`,
        class: "flex leading-6 items-center font-semibold"
      }, null, _parent));
      _push(`</div><div class="w-full sm:col-span-3">`);
      _push(ssrRenderComponent(_sfc_main$3, {
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
      _push(ssrRenderComponent(_sfc_main$4, {
        class: "mt-2",
        message: __props.errors[`title`]
      }, null, _parent));
      _push(`</div></div><div>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        for: "country",
        value: _ctx.$t("Country"),
        class: "flex items-center leading-6 font-semibold"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$5, {
        id: "country",
        modelValue: __props.form.country,
        "onUpdate:modelValue": ($event) => __props.form.country = $event,
        items: __props.data?.countries || [],
        class: { "border-red-500": __props.errors.country }
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$4, {
        class: "mt-2",
        message: __props.errors.country
      }, null, _parent));
      _push(`</div><div>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        for: "order",
        value: _ctx.$t("Sort order"),
        class: "flex items-center leading-6 font-semibold"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        id: "order",
        type: "number",
        modelValue: __props.form.order,
        "onUpdate:modelValue": ($event) => __props.form.order = $event,
        class: ["block w-full pr-4 text-start", { "border-red-500": __props.errors.order }]
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$4, {
        class: "mt-2",
        message: __props.errors.order
      }, null, _parent));
      _push(`</div><div>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        for: "public-switcher",
        value: _ctx.$t("Status"),
        class: "flex items-center leading-6 font-semibold mb-2"
      }, null, _parent));
      _push(`<div class="flex items-center space-x-4">`);
      _push(ssrRenderComponent(_sfc_main$6, {
        modelValue: booleanPublic.value,
        "onUpdate:modelValue": ($event) => booleanPublic.value = $event,
        id: "public-switcher"
      }, null, _parent));
      _push(`<span class="${ssrRenderClass([
        "text-sm font-medium",
        booleanPublic.value ? "text-green-600" : "text-red-600"
      ])}">${ssrInterpolate(booleanPublic.value ? _ctx.$t("Public (Visible)") : _ctx.$t("Private (Hidden)"))}</span></div>`);
      _push(ssrRenderComponent(_sfc_main$4, {
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
