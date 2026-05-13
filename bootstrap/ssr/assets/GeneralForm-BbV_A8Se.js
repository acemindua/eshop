import { ref, computed, resolveDirective, mergeProps, createVNode, resolveDynamicComponent, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrRenderVNode, ssrGetDirectiveProps } from "vue/server-renderer";
import { IconX, IconPlus } from "@tabler/icons-vue";
import { _ as _sfc_main$1 } from "./ImageDataView-C9GsQUU8.js";
import { _ as _sfc_main$4 } from "./InputError-Cp3nFeNd.js";
import { _ as _sfc_main$2, a as _sfc_main$3 } from "./TextInput-Dmmb8A31.js";
import { _ as _sfc_main$5 } from "./TextareaInput-DKTcDXJH.js";
const _sfc_main = {
  __name: "GeneralForm",
  __ssrInlineRender: true,
  props: {
    // Об'єкт форми (має бути об'єктом useForm)
    form: {
      type: Object,
      required: true
    },
    // Початковий URL зображення (існуючий аватар)
    initialImage: {
      type: [String, null],
      default: null
    },
    errors: Object
  },
  emits: ["uploaded"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    ref(null);
    const preview = ref(props.initialImage || null);
    const newFileObject = ref(null);
    const showClearButton = computed(() => !!newFileObject.value);
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_mask = resolveDirective("mask");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "md:flex gap-12 w-full py-4" }, _attrs))}><div class=""><p class="font-semibold dark:text-white">GENERAL INFO</p><p class="text-sm text-slate-500"> Edit your account&#39;s general information </p></div><div class="flex flex-col md:max-w-3xl spacep-y-4 divide-y flex-grow p-4 md:px-8 border rounded-lg bg-gray-50"><div class="flex gap-12 py-4 w-full justify-between items-center"><div class="text-sm"><p class="font-semibold dark:text-white">Profile picture</p><p class="text-sm text-slate-400"> Others deserve to know you more </p></div><div class="relative"><input type="file" hidden accept="image/*">`);
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
      _push(`</button></div></div><div class="py-4 flex flex-col space-y-4"><div class="text-sm"><p class="font-semibold dark:text-white">Profile Info</p><p class="text-sm text-slate-400"> This is how others will recognize you </p></div><div class="grid grid-cols-2 gap-4 py-6"><div>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        for: "name",
        value: _ctx.$t("Name")
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        id: "name",
        type: "text",
        class: ["mt-1 block w-full", { "border-red-500": __props.errors?.name }],
        modelValue: __props.form.name,
        "onUpdate:modelValue": ($event) => __props.form.name = $event,
        required: "",
        autofocus: "",
        placeholder: "І'мя"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$4, {
        class: "mt-2",
        message: __props.errors?.name
      }, null, _parent));
      _push(`</div><div>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        for: "last_name",
        value: _ctx.$t("Last name")
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        id: "last_name",
        type: "text",
        class: ["mt-1 block w-full", {
          "border-red-500": __props.errors?.last_name
        }],
        modelValue: __props.form.last_name,
        "onUpdate:modelValue": ($event) => __props.form.last_name = $event,
        placeholder: "Прізвище"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$4, {
        class: "mt-2",
        message: __props.errors?.last_name
      }, null, _parent));
      _push(`</div></div><div>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        for: "email",
        value: "Email address"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        id: "email",
        type: "email",
        class: ["mt-1 block w-full", { "border-red-500": __props.errors?.email }],
        modelValue: __props.form.email,
        "onUpdate:modelValue": ($event) => __props.form.email = $event,
        required: "",
        placeholder: "email@example.com"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$4, {
        class: "mt-2",
        message: __props.errors?.email
      }, null, _parent));
      _push(`</div><div>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        for: "phone",
        value: _ctx.$t("Phone")
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, mergeProps({
        id: "phone",
        type: "tel",
        masked: "true",
        placeholder: "+38 0",
        class: "mt-1 block w-full",
        modelValue: __props.form.phone,
        "onUpdate:modelValue": ($event) => __props.form.phone = $event
      }, ssrGetDirectiveProps(_ctx, _directive_mask, "+38 0## ### ####")), null, _parent));
      _push(ssrRenderComponent(_sfc_main$4, {
        class: "mt-2",
        message: __props.errors?.phone
      }, null, _parent));
      _push(`</div><div>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        for: "description",
        value: _ctx.$t("About you")
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$5, {
        id: "description",
        modelValue: __props.form.description,
        "onUpdate:modelValue": ($event) => __props.form.description = $event,
        class: "mt-1 block w-full",
        placeholder: "About you..."
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$4, {
        class: "mt-2",
        message: __props.errors?.description
      }, null, _parent));
      _push(`</div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Users/Partials/GeneralForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
