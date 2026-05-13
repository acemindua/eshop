import { computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderClass } from "vue/server-renderer";
import { _ as _sfc_main$4 } from "./CheckBoxSwitcher-DfwzQzd4.js";
import { _ as _sfc_main$3 } from "./InputError-Cp3nFeNd.js";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./TextInput-Dmmb8A31.js";
import "@headlessui/vue";
const _sfc_main = {
  __name: "DataForm",
  __ssrInlineRender: true,
  props: {
    // Форма Inertia, що містить поля для редагування
    form: { type: Object, required: true },
    // data пропс не використовується в цьому компоненті, можна прибрати або залишити, якщо він потрібен для майбутніх полів
    data: { type: [Object, Array], required: true },
    // Об'єкт помилок
    errors: { type: Object, default: () => ({}) }
  },
  setup(__props) {
    const props = __props;
    const booleanPublic = computed({
      // Отримуємо значення, перетворюючи його на чистий boolean (!!0 -> false, !!1 -> true)
      get: () => !!props.form.public,
      // При записі встановлюємо значення (CheckBoxSwitcher повертає true/false)
      set: (val) => props.form.public = val
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "md:flex gap-6 w-full border rounded-lg p-2 md:p-6 lg:p-12 bg-gray-50" }, _attrs))}><div class="w-full md:w-1/5 pb-4"><h2 class="uppercase font-semibold">${ssrInterpolate(_ctx.$t("General Data"))}</h2><span class="py-2 text-sm text-gray-600">${ssrInterpolate(_ctx.$t("Manage general product info and public status."))}</span></div><div class="flex md:w-2/4 w-full flex-col space-y-4 bg-gray-50"><div>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        for: "order",
        value: _ctx.$t("Order"),
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
      _push(ssrRenderComponent(_sfc_main$4, {
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Pages/Partials/DataForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
